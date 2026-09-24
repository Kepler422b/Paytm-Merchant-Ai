import { prisma } from '../utils/prisma';
import { TransactionStatus } from 'shared';

export class AnomalyService {
  /**
   * Detect anomalies by comparing today's performance to the 4-week average
   * for the same day of the week and same time window.
   */
  async detectAnomalies(merchantId: string) {
    const now = new Date();
    
    // We analyze the current 3-hour window.
    // e.g., if it's 16:30, we analyze 14:00 to 17:00
    const startHour = Math.max(0, now.getHours() - 3);
    const endHour = now.getHours();
    
    if (startHour === endHour) return null; // Not enough time has passed today

    const todayStart = new Date(now);
    todayStart.setHours(startHour, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(endHour, 59, 59, 999);

    // 1. Get today's sales for this window
    const todayAgg = await prisma.transaction.aggregate({
      _sum: { amount: true },
      _count: { id: true },
      where: {
        merchantId,
        status: TransactionStatus.SUCCESS,
        createdAt: { gte: todayStart, lte: todayEnd },
      },
    });
    
    const todaySales = todayAgg._sum.amount || 0;
    const todayTxns = todayAgg._count.id || 0;

    // 2. Get historical average for the same day of week, same time window over last 4 weeks
    let histSalesSum = 0;
    let histTxnsSum = 0;
    const weeksToAnalyze = 4;

    for (let i = 1; i <= weeksToAnalyze; i++) {
      const histStart = new Date(todayStart);
      histStart.setDate(histStart.getDate() - (i * 7));
      
      const histEnd = new Date(todayEnd);
      histEnd.setDate(histEnd.getDate() - (i * 7));

      const histAgg = await prisma.transaction.aggregate({
        _sum: { amount: true },
        _count: { id: true },
        where: {
          merchantId,
          status: TransactionStatus.SUCCESS,
          createdAt: { gte: histStart, lte: histEnd },
        },
      });

      histSalesSum += histAgg._sum.amount || 0;
      histTxnsSum += histAgg._count.id || 0;
    }

    const avgHistSales = histSalesSum / weeksToAnalyze;
    
    // If historically very low sales, don't flag as anomaly to avoid noise
    if (avgHistSales < 500) return null;

    // Calculate percentage deviation
    const percentageChange = ((todaySales - avgHistSales) / avgHistSales) * 100;

    // If drop is worse than 20%, flag it.
    if (percentageChange <= -20) {
      return {
        type: 'SALES_DROP',
        severity: percentageChange <= -40 ? 'HIGH' : 'MEDIUM',
        metricDelta: percentageChange,
        details: {
          windowName: this.getWindowName(startHour, endHour),
          startHour,
          endHour,
          todaySales,
          avgHistSales,
        }
      };
    }

    return null;
  }

  private getWindowName(start: number, end: number) {
    if (start >= 12 && end <= 17) return 'Afternoon (2-5 PM)';
    if (start >= 17 && end <= 22) return 'Evening Peak';
    if (start >= 6 && end <= 11) return 'Morning Peak';
    return `${start}:00 - ${end}:00`;
  }
}

export const anomalyService = new AnomalyService();
