import { Router } from 'express';
import { AuthRequest, requireAuth } from '../middleware/auth';
import { chatService } from '../services/chatService';

const router = Router();
router.use(requireAuth);

router.get('/history', async (req: AuthRequest, res) => {
  const history = await chatService.getHistory(req.merchantId!);
  res.json(history);
});

router.post('/', async (req: AuthRequest, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: { message: 'Message is required' }});
  }
  // This will handle the SSE stream and not return JSON
  await chatService.handleStream(req.merchantId!, message, res);
});

export const chatRouter = router;
