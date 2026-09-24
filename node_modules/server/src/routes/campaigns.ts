import { Router } from 'express';
import { AuthRequest, requireAuth } from '../middleware/auth';
import { prisma } from '../utils/prisma';
import { campaignService } from '../services/campaignService';

const router = Router();
router.use(requireAuth);

router.get('/', async (req: AuthRequest, res) => {
  const campaigns = await prisma.campaign.findMany({
    where: { merchantId: req.merchantId! },
    orderBy: { createdAt: 'desc' },
    include: { results: true }
  });
  res.json(campaigns);
});

router.post('/generate', async (req: AuthRequest, res) => {
  try {
    const { recommendationId } = req.body;
    if (!recommendationId) {
      return res.status(400).json({ error: { message: 'Recommendation ID is required' }});
    }
    const campaign = await campaignService.generateDraft(req.merchantId!, recommendationId);
    res.json(campaign);
  } catch(e: any) {
    res.status(500).json({ error: { message: e.message }});
  }
});

router.post('/:id/launch', async (req: AuthRequest, res) => {
  try {
    // Verify ownership
    const exists = await prisma.campaign.findFirst({
      where: { id: req.params.id, merchantId: req.merchantId! }
    });
    if (!exists) return res.status(404).json({ error: { message: 'Not found' }});

    const campaign = await campaignService.launchCampaign(req.params.id);
    res.json(campaign);
  } catch(e: any) {
    res.status(500).json({ error: { message: e.message }});
  }
});

export const campaignsRouter = router;
