import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { RequestOtpSchema, VerifyOtpSchema } from 'shared';
import jwt from 'jsonwebtoken';
import { AuthRequest, requireAuth } from '../middleware/auth';

const router = Router();

router.post('/send-otp', async (req, res) => {
  try {
    const data = RequestOtpSchema.parse(req.body);
    
    // In dev, OTP is always 123456. In prod, generate random and send via SMS.
    const codeHash = '123456'; // Hashed in a real app
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await prisma.otp.create({
      data: {
        phone: data.phone,
        codeHash,
        expiresAt,
      }
    });

    res.json({ success: true, message: 'OTP sent' });
  } catch (e: any) {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: e.message } });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const data = VerifyOtpSchema.parse(req.body);
    
    const otpRecord = await prisma.otp.findFirst({
      where: { phone: data.phone },
      orderBy: { createdAt: 'desc' }
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ error: { code: 'INVALID_OTP', message: 'OTP expired or not found' } });
    }

    if (otpRecord.codeHash !== data.code) { // Compare hashes in prod
      await prisma.otp.update({
        where: { id: otpRecord.id },
        data: { attempts: { increment: 1 } }
      });
      return res.status(400).json({ error: { code: 'INVALID_OTP', message: 'Incorrect OTP' } });
    }

    // Find or create merchant
    let merchant = await prisma.merchant.findUnique({ where: { phone: data.phone } });
    if (!merchant) {
      merchant = await prisma.merchant.create({
        data: { phone: data.phone }
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { merchantId: merchant.id }, 
      process.env.JWT_SECRET || 'supersecretjwtkey_for_dev_only', 
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ success: true, user: merchant });
  } catch (e: any) {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: e.message } });
  }
});

router.post('/logout', requireAuth, (req, res) => {
  res.clearCookie('auth_token');
  res.json({ success: true });
});

router.get('/me', requireAuth, async (req: AuthRequest, res) => {
  const merchant = await prisma.merchant.findUnique({ where: { id: req.merchantId } });
  res.json(merchant);
});

export const authRouter = router;
