import { prisma } from '../utils/prisma';
import { TransactionStatus } from 'shared';

export class AnalyticsService {
  /**
   * Calculate KPIs and compare with the previous period
   */
  async getKPIs(merchantId: string, range: 'today' | '7d' | '30d') {
    const now = new Date();
    let startDate = new Date();
    let previousStartDate = new Date();

    if (range === 'today') {
      startDate.setHours(0, 0, 0, 0);
      previousStartDate = new Date(startDate.getTime() - 24 * 60 * 60 * 1000);
    } else if (range === '7d') {
      startDate.setDate(now.getDate() - 7);
      previousStartDate = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else {
      startDate.setDate(now.getDate() - 30);
      previousStartDate = new Date(startDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const currentPeriodData = await this.getMetricsForPeriod(merchantId, startDate, now);
    const previousPeriodData = await this.getMetricsForPeriod(merchantId, previousStartDate, startDate);

    return {
      sales: {
        value: currentPeriodData.sales,
        change: this.calculatePercentageChange(previousPeriodData.sales, currentPeriodData.sales),
      },
      transactions: {
        value: currentPeriodData.transactions,
        change: this.calculatePercentageChange(previousPeriodData.transactions, currentPeriodData.transactions),
      },
      avgBill: {
        value: currentPeriodData.avgBill,
        change: this.calculatePercentageChange(previousPeriodData.avgBill, currentPeriodData.avgBill),
      },
    };
  }

  private async getMetricsForPeriod(merchantId: string, start: Date, end: Date) {
    const agg = await prisma.transaction.aggregate({
      _sum: { amount: true },
      _count: { id: true },
      where: {
        merchantId,
        status: TransactionStatus.SUCCESS,
        createdAt: { gte: start, lt: end },
      },
    });

    const sales = agg._sum.amount || 0;
    const transactions = agg._count.id || 0;
    const avgBill = transactions > 0 ? sales / transactions : 0;

    return { sales, transactions, avgBill };
  }

  private calculatePercentageChange(oldValue: number, newValue: number) {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return ((newValue - oldValue) / oldValue) * 100;
  }

  /**
   * Get sales overview chart data
   */
  async getSalesOverview(merchantId: string, range: 'today' | '7d' | '30d', granularity: 'hour' | 'day') {
    const now = new Date();
    let startDate = new Date();

    if (range === 'today') {
      startDate.setHours(0, 0, 0, 0);
    } else if (range === '7d') {
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
    } else {
      startDate.setDate(now.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        merchantId,
        status: TransactionStatus.SUCCESS,
        createdAt: { gte: startDate, lte: now },
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    const aggregated: Record<string, number> = {};

    transactions.forEach((tx) => {
      let key = '';
      if (granularity === 'hour') {
        const h = tx.createdAt.getHours();
        key = `${h.toString().padStart(2, '0')}:00`;
      } else {
        key = tx.createdAt.toISOString().split('T')[0];
      }

      aggregated[key] = (aggregated[key] || 0) + tx.amount;
    });

    return Object.entries(aggregated)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }
}

export const analyticsService = new AnalyticsService();
