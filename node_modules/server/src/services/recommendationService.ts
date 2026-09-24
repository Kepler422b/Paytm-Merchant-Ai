import { prisma } from '../utils/prisma';

export class RecommendationService {
  async generateForInsight(insight: any) {
    if (insight.type === 'SALES_DROP') {
      const title = 'Boost Afternoon Sales';
      const description = 'Offer ₹20 off on orders above ₹199 during slow hours';
      
      // Compute estimated impact based on historical elasticity (simulated here)
      const estExtraOrders = 38;
      const estUpliftRupees = 2400;

      await prisma.recommendation.create({
        data: {
          insightId: insight.id,
          title,
          description,
          estUpliftRupees,
          estExtraOrders,
          confidence: 0.82,
          payload: JSON.stringify({
            discountValue: 20,
            minOrderValue: 199,
            targetHours: [14, 15, 16], // 2-5 PM
          })
        }
      });
    }
  }
}

export const recommendationService = new RecommendationService();
