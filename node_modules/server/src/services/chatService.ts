import { prisma } from '../utils/prisma';
import { aiService } from './aiService';
import { analyticsService } from './analyticsService';
import { Response } from 'express';

export class ChatService {
  async handleStream(merchantId: string, message: string, res: Response) {
    // 1. Save user message
    await prisma.chatMessage.create({
      data: { merchantId, role: 'user', content: message }
    });

    // 2. Fetch context (KPIs for today)
    const kpis = await analyticsService.getKPIs(merchantId, 'today');
    
    // 3. Setup SSE headers (done in controller, but we stream here)
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const prompt = `You are the Paytm AI Business Partner assistant for a merchant. 
User says: "${message}"
Context today: Sales ₹${kpis.sales.value.toFixed(2)}, Transactions: ${kpis.transactions.value}.
Answer concisely in a friendly tone (English + Hinglish). Don't invent fake numbers if not in context.`;

    try {
      // For demo purposes with Anthropic API, we don't have streaming fully set up in our simplified aiService.
      // So we will fetch the full response and simulate streaming chunk by chunk.
      const fullResponse = await aiService.generate(prompt, kpis);
      
      const words = fullResponse.split(' ');
      
      for (const word of words) {
        res.write(`data: ${JSON.stringify({ text: word + ' ' })}\n\n`);
        await new Promise(r => setTimeout(r, 50)); // simulate typing
      }
      
      // Save assistant message
      await prisma.chatMessage.create({
        data: { merchantId, role: 'assistant', content: fullResponse }
      });

      res.write(`data: [DONE]\n\n`);
      res.end();
    } catch (e) {
      console.error(e);
      res.write(`data: {"error": "Failed to generate response"}\n\n`);
      res.end();
    }
  }

  async getHistory(merchantId: string) {
    return prisma.chatMessage.findMany({
      where: { merchantId },
      orderBy: { createdAt: 'asc' },
      take: 50
    });
  }
}

export const chatService = new ChatService();
