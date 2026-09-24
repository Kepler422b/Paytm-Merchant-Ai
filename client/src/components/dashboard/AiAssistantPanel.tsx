import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export default function AiAssistantPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{role: 'user'|'assistant', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const { data: history } = useQuery({
    queryKey: ['chat-history'],
    queryFn: async () => {
      const res = await fetch('/api/v1/chat/history');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        return data;
      }
      return [];
    }
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);
    
    // Add empty assistant message that will be streamed into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      if (!response.body) throw new Error('No readable stream');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') break;
            
            try {
              const data = JSON.parse(dataStr);
              if (data.text) {
                assistantMsg += data.text;
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].content = assistantMsg;
                  return newMsgs;
                });
              }
            } catch (e) {
              // ignore parse errors for partial chunks
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = 'Sorry, I encountered an error.';
        return newMsgs;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const chips = [
    "Kal ki sales kaisi rahegi?",
    "Why are afternoon sales down?",
    "Suggest a campaign"
  ];

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="h-16 border-b border-slate-100 flex items-center justify-between px-4 shrink-0 bg-blue-50/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-paytm-blue flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-paytm-navy">Ask My Business</span>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400 hover:bg-white rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-paytm-blue" />
            </div>
            <h3 className="font-bold text-paytm-navy mb-2">Hello, Sharma Ji!</h3>
            <p className="text-sm text-slate-500 mb-6">Ask me anything about your sales, forecasts, or growth opportunities.</p>
            
            <div className="flex flex-col gap-2 px-4">
              {chips.map(chip => (
                <button 
                  key={chip}
                  onClick={() => setInput(chip)}
                  className="text-left text-sm text-paytm-blue bg-blue-50 hover:bg-paytm-blue hover:text-white border border-blue-100 py-2 px-4 rounded-xl transition-colors flex items-center justify-between group"
                >
                  {chip}
                  <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${msg.role === 'user' ? 'bg-slate-100 text-slate-500' : 'bg-paytm-blue text-white'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>
            <div className={`p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-paytm-navy text-white rounded-tr-sm' 
                : 'bg-slate-50 text-slate-700 border border-slate-100 rounded-tl-sm shadow-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%]">
             <div className="w-8 h-8 rounded-full bg-paytm-blue text-white flex shrink-0 items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 rounded-tl-sm flex gap-1 items-center">
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-100">
        <form onSubmit={handleSubmit} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your business..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:border-paytm-blue focus:ring-1 focus:ring-paytm-blue"
          />
          <button 
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-paytm-blue text-white rounded-full hover:bg-paytm-darkBlue disabled:opacity-50 disabled:hover:bg-paytm-blue transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
