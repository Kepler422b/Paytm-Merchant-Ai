import { prisma } from '../utils/prisma';

export class GrowthScoreService {
  async getLatestScore(merchantId: string) {
    const score = await prisma.growthScore.findFirst({
      where: { merchantId },
      orderBy: { createdAt: 'desc' }
    });
    
    if (!score) return null;
    return {
      ...score,
      breakdown: JSON.parse(score.breakdown)
    };
  }

  async boostScore(merchantId: string, points: number) {
    const latest = await this.getLatestScore(merchantId);
    if (!latest) return null;

    const newScore = Math.min(100, latest.score + points);
    const breakdown = latest.breakdown;
    
    // Distribute points logically to breakdown
    breakdown.salesGrowth = Math.min(100, breakdown.salesGrowth + (points * 0.4));
    breakdown.retention = Math.min(100, breakdown.retention + (points * 0.6));

    const updated = await prisma.growthScore.create({
      data: {
        merchantId,
        score: newScore,
        breakdown: JSON.stringify(breakdown),
      }
    });

    return updated;
  }
}

export const growthScoreService = new GrowthScoreService();
