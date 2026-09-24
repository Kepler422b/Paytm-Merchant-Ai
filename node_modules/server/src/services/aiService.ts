import Anthropic from '@anthropic-ai/sdk';

export class AiService {
  private anthropic: Anthropic | null = null;

  constructor() {
    if (process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  async generate(prompt: string, context: any): Promise<string> {
    if (this.anthropic) {
      try {
        const response = await this.anthropic.messages.create({
          model: 'claude-3-haiku-20240307',
          max_tokens: 1024,
          messages: [{ role: 'user', content: `${prompt}\n\nContext:\n${JSON.stringify(context, null, 2)}` }],
        });
        
        // Return string content
        const textBlock = response.content.find((block) => block.type === 'text');
        return textBlock && 'text' in textBlock ? textBlock.text : '';
      } catch (e) {
        console.error('LLM API failed, falling back to rules', e);
      }
    }

    return this.fallbackRuleEngine(prompt, context);
  }

  private fallbackRuleEngine(prompt: string, context: any): string {
    // Basic offline rule engine for when no API key is provided
    if (prompt.includes('WhatsApp')) {
      const discount = context.discountValue ? `₹${context.discountValue}` : 'special discount';
      return `Namaste! Aaj ka special offer: Get ${discount} off on orders above ₹${context.minOrderValue}! Valid only between 2 PM - 5 PM. Visit us today!`;
    }
    if (prompt.includes('chat')) {
      return `Based on your recent data, your sales are down slightly in the afternoon. I suggest launching a quick campaign to boost footfall.`;
    }
    
    return "I'm offline right now, but you can try running a campaign based on the dashboard recommendations.";
  }
}

export const aiService = new AiService();
