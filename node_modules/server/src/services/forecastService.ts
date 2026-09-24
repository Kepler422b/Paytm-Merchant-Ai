import { prisma } from '../utils/prisma';
import { TransactionStatus } from 'shared';

export class ForecastService {
  async getSalesForecast(merchantId: string, horizon: '1d' | '7d') {
    // Simple naive forecast for demo: Moving average + some seasonality factor
    // A real app would use Prophet or Holt-Winters here.
    
    const now = new Date();
    const daysBack = 14; // look back 14 days
    const lookbackStart = new Date(now);
    lookbackStart.setDate(now.getDate() - daysBack);

    const history = await prisma.transaction.groupBy({
      by: ['createdAt'],
      _sum: { amount: true },
      where: {
        merchantId,
        status: TransactionStatus.SUCCESS,
        createdAt: { gte: lookbackStart }
      }
    });

    // Compute average daily
    let totalSales = 0;
    history.forEach(h => totalSales += h._sum.amount || 0);
    const avgDaily = totalSales / daysBack;

    const daysToForecast = horizon === '1d' ? 1 : 7;
    const forecast = [];
    
    // Check if there are active LIVE campaigns to add uplift
    const activeCampaigns = await prisma.campaign.findMany({
      where: { merchantId, status: 'LIVE' },
      include: { recommendation: true }
    });

    let extraUpliftPerDay = 0;
    activeCampaigns.forEach(c => {
      extraUpliftPerDay += c.recommendation?.estUpliftRupees || 0;
    });

    for (let i = 1; i <= daysToForecast; i++) {
      const fDate = new Date(now);
      fDate.setDate(now.getDate() + i);
      
      const isWeekend = fDate.getDay() === 0 || fDate.getDay() === 6;
      const seasonalMultiplier = isWeekend ? 1.2 : 0.95; // bump weekends
      
      const predictedValue = (avgDaily * seasonalMultiplier) + extraUpliftPerDay;
      
      forecast.push({
        date: fDate.toISOString().split('T')[0],
        predicted: predictedValue,
        lowerBound: predictedValue * 0.85,
        upperBound: predictedValue * 1.15,
        hasUplift: extraUpliftPerDay > 0
      });
    }

    return forecast;
  }
}

export const forecastService = new ForecastService();
