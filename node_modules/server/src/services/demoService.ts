import { prisma } from '../utils/prisma';
import { insightService } from './insightService';

export class DemoService {
  async startDemoFlow(merchantId: string) {
    const now = new Date();
    
    // 1. Delete recent transactions for today (afternoon)
    // We are simulating an anomaly where afternoon sales dropped.
    const startHour = Math.max(0, now.getHours() - 3);
    const endHour = now.getHours();

    const todayStart = new Date(now);
    todayStart.setHours(startHour, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(endHour, 59, 59, 999);

    // Get all transactions in this window
    const windowTxns = await prisma.transaction.findMany({
      where: {
        merchantId,
        createdAt: { gte: todayStart, lte: todayEnd }
      }
    });

    // Delete 60% of them to create a huge drop
    const toDelete = windowTxns.slice(0, Math.floor(windowTxns.length * 0.6));
    const idsToDelete = toDelete.map(t => t.id);

    await prisma.transaction.deleteMany({
      where: { id: { in: idsToDelete } }
    });

    // 2. Generate insights based on this new data
    const insight = await insightService.generateInsights(merchantId);

    return insight;
  }

  async resetDemoFlow(merchantId: string) {
    // Delete all insights, recommendations, and campaigns generated today
    const today = new Date();
    today.setHours(0,0,0,0);

    await prisma.campaign.deleteMany({
      where: { merchantId, createdAt: { gte: today } }
    });

    await prisma.insight.deleteMany({
      where: { merchantId, createdAt: { gte: today } }
    });

    // In a real app we'd restore the deleted transactions, but for demo we can just let seed script be re-run
    // or just leave the DB as is (it's slightly lower sales today).
    return { success: true };
  }
}

export const demoService = new DemoService();
