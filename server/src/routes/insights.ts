import { Router } from 'express';
import { AuthRequest, requireAuth } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { insightService } from '../services/insightService';

const router = Router();
router.use(requireAuth);

router.get('/', async (req: AuthRequest, res) => {
  const insights = await prisma.insight.findMany({
    where: { merchantId: req.merchantId! },
    orderBy: { createdAt: 'desc' },
    include: { recommendation: true }
  });
  res.json(insights);
});

router.post('/generate', async (req: AuthRequest, res) => {
  const insight = await insightService.generateInsights(req.merchantId!);
  res.json({ success: true, insight });
});

router.patch('/:id/status', async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await prisma.insight.updateMany({
    where: { id, merchantId: req.merchantId! },
    data: { status }
  });
  res.json({ success: updated.count > 0 });
});

export const insightsRouter = router;
