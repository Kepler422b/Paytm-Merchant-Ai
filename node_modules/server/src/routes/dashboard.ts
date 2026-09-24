import { Router } from 'express';
import { AuthRequest, requireAuth } from '../middleware/auth';
import { analyticsService } from '../services/analyticsService';
import { forecastService } from '../services/forecastService';
import { growthScoreService } from '../services/growthScoreService';
import { prisma } from '../utils/prisma';

const router = Router();

router.use(requireAuth);

router.get('/kpis', async (req: AuthRequest, res) => {
  try {
    const range = (req.query.range as any) || 'today';
    const kpis = await analyticsService.getKPIs(req.merchantId!, range);
    res.json(kpis);
  } catch (e: any) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: e.message } });
  }
});

router.get('/sales-overview', async (req: AuthRequest, res) => {
  try {
    const range = (req.query.range as any) || 'today';
    const granularity = (req.query.granularity as any) || (range === 'today' ? 'hour' : 'day');
    const data = await analyticsService.getSalesOverview(req.merchantId!, range, granularity);
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: e.message } });
  }
});

router.get('/forecasts/sales', async (req: AuthRequest, res) => {
  try {
    const horizon = (req.query.horizon as any) || '7d';
    const data = await forecastService.getSalesForecast(req.merchantId!, horizon);
    res.json(data);
  } catch (e: any) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: e.message } });
  }
});

router.get('/growth-score', async (req: AuthRequest, res) => {
  try {
    const score = await growthScoreService.getLatestScore(req.merchantId!);
    res.json(score);
  } catch (e: any) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: e.message } });
  }
});

router.get('/transactions', async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.transaction.findMany({
        where: { merchantId: req.merchantId! },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
        include: { product: true }
      }),
      prisma.transaction.count({ where: { merchantId: req.merchantId! } })
    ]);

    res.json({ items, total, page, limit });
  } catch (e: any) {
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: e.message } });
  }
});

export const dashboardRouter = router;
