import { prisma } from '../utils/prisma';
import { anomalyService } from './anomalyService';
import { recommendationService } from './recommendationService';

export class InsightService {
  async generateInsights(merchantId: string) {
    const anomaly = await anomalyService.detectAnomalies(merchantId);
    
    if (!anomaly) return null;

    // Check if an insight for this type already exists recently (last 12 hours) to prevent spam
    const recentInsight = await prisma.insight.findFirst({
      where: {
        merchantId,
        type: anomaly.type,
        createdAt: { gte: new Date(Date.now() - 12 * 60 * 60 * 1000) }
      }
    });

    if (recentInsight) return null; // Already notified recently

    let title = '';
    let cause = '';

    if (anomaly.type === 'SALES_DROP') {
      const deltaStr = Math.abs(anomaly.metricDelta).toFixed(0);
      title = `Sales are down ${deltaStr}%`;
      cause = `${anomaly.details.windowName} transactions dropped ${deltaStr}% vs your usual average.`;
    }

    // Save insight
    const insight = await prisma.insight.create({
      data: {
        merchantId,
        type: anomaly.type,
        severity: anomaly.severity,
        title,
        cause,
        metricDelta: anomaly.metricDelta,
        confidence: 0.85, // Estimated confidence
        status: 'NEW',
      }
    });

    // Automatically generate a recommendation for this insight
    await recommendationService.generateForInsight(insight);

    return insight;
  }
}

export const insightService = new InsightService();
