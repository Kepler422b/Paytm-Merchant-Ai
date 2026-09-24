import { Router } from 'express';
import { AuthRequest, requireAuth } from '../middleware/auth';
import { demoService } from '../services/demoService';
import { prisma } from '../utils/prisma';

const router = Router();

// Public endpoint for landing page
router.get('/preview', async (req, res) => {
  // Return some dummy but realistic data for the landing page
  res.json({
    kpis: {
      sales: { value: 12480, change: 12 },
      transactions: { value: 248, change: 8 },
      avgBill: { value: 50, change: 5 }
    },
    insight: {
      title: 'Sales are 18% lower than usual because afternoon purchases dropped.'
    }
  });
});

// Protected endpoints for Wow Flow
router.use(requireAuth);

router.post('/start', async (req: AuthRequest, res) => {
  try {
    const rawInsight = await demoService.startDemoFlow(req.merchantId!);
    
    let insight;
    if (rawInsight) {
      insight = await prisma.insight.findUnique({
        where: { id: rawInsight.id },
        include: { recommendation: true }
      });
    } else {
      // If returning null due to throttle, fetch the latest one
      insight = await prisma.insight.findFirst({
        where: { merchantId: req.merchantId! },
        orderBy: { createdAt: 'desc' },
        include: { recommendation: true }
      });
    }
    
    res.json({ success: true, insight });
  } catch (e: any) {
    res.status(500).json({ error: { message: e.message }});
  }
});

router.post('/reset', async (req: AuthRequest, res) => {
  try {
    await demoService.resetDemoFlow(req.merchantId!);
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: { message: e.message }});
  }
});

export const demoRouter = router;
