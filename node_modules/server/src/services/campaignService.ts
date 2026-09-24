import { prisma } from '../utils/prisma';
import { aiService } from './aiService';
import { growthScoreService } from './growthScoreService';

export class CampaignService {
  async generateDraft(merchantId: string, recommendationId: string) {
    const rec = await prisma.recommendation.findUnique({
      where: { id: recommendationId }
    });
    if (!rec) throw new Error('Recommendation not found');

    const payload = JSON.parse(rec.payload || '{}');

    // Generate WhatsApp/SMS copy using AI
    const prompt = `Write a short, engaging WhatsApp and SMS promotional message for an Indian retail store in a mix of English and Hinglish. It should mention the discount and time validity. Return ONLY a JSON object: {"whatsapp": "string", "sms": "string"}`;
    
    let copyJson = { whatsapp: "", sms: "" };
    try {
      const copyResponse = await aiService.generate(prompt, payload);
      // Clean possible markdown backticks
      const cleaned = copyResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      copyJson = JSON.parse(cleaned);
    } catch (e) {
      // Fallback
      copyJson = {
        whatsapp: `Namaste! Aaj ka special: ₹${payload.discountValue} OFF on orders above ₹${payload.minOrderValue} (Valid 2-5 PM).`,
        sms: `Special Offer: Get ₹${payload.discountValue} OFF on min order ₹${payload.minOrderValue}. Valid 2-5 PM today.`
      };
    }

    const campaign = await prisma.campaign.create({
      data: {
        merchantId,
        recommendationId,
        name: 'Afternoon Boost (Auto-draft)',
        offerText: `₹${payload.discountValue} OFF on ₹${payload.minOrderValue}`,
        discountValue: payload.discountValue,
        minOrderValue: payload.minOrderValue,
        startHour: payload.targetHours?.[0] || 14,
        endHour: (payload.targetHours?.[payload.targetHours.length - 1] || 16) + 1,
        audience: 'Past 30 Days Customers',
        status: 'DRAFT',
        messageCopy: JSON.stringify(copyJson)
      }
    });

    return campaign;
  }

  async launchCampaign(campaignId: string) {
    const campaign = await prisma.campaign.update({
      where: { id: campaignId },
      data: { 
        status: 'LIVE',
        startedAt: new Date()
      },
      include: { recommendation: { include: { insight: true } } }
    });

    if (campaign.recommendation?.insight) {
      await prisma.insight.update({
        where: { id: campaign.recommendation.insight.id },
        data: { status: 'ACTIONED' }
      });
    }

    // Boost growth score
    await growthScoreService.boostScore(campaign.merchantId, 6);

    return campaign;
  }
}

export const campaignService = new CampaignService();
