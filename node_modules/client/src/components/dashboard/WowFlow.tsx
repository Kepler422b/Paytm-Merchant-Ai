import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, Zap, ArrowRight, Gift, PartyPopper, Sparkles, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

export default function WowFlow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [insight, setInsight] = useState<any>(null);
  const [campaign, setCampaign] = useState<any>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(0);
  const queryClient = useQueryClient();

  // Steps:
  // 0: Loading / Analyzing
  // 1: Insight Revealed
  // 2: Recommendation Drawer (within modal)
  // 3: Generating Campaign
  // 4: Campaign Draft Ready
  // 5: Launched (Confetti)

  useEffect(() => {
    // Start backend anomaly generation
    const startDemo = async () => {
      try {
        const res = await fetch('/api/v1/demo/start', { method: 'POST' });
        const data = await res.json();
        setInsight(data.insight);
        
        // After 2 seconds of "Analyzing", move to Step 1
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['kpis'] });
          queryClient.invalidateQueries({ queryKey: ['sales-overview'] });
          queryClient.invalidateQueries({ queryKey: ['insights'] });
          setStep(1);
        }, 2500);
      } catch (e) {
        console.error(e);
      }
    };
    startDemo();
  }, [queryClient]);

  const handleGenerateCampaign = async () => {
    setStep(3);
    try {
      const res = await fetch('/api/v1/campaigns/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recommendationId: insight.recommendation.id })
      });
      const data = await res.json();
      setCampaign(data);
      setTimeout(() => setStep(4), 1500); // Fake delay for animation
    } catch (e) {
      console.error(e);
    }
  };

  const handleLaunch = async () => {
    try {
      await fetch(`/api/v1/campaigns/${campaign.id}/launch`, { method: 'POST' });
      setShowConfetti(true);
      setStep(5);
      
      // Refresh background dashboard
      queryClient.invalidateQueries({ queryKey: ['insights'] });
      queryClient.invalidateQueries({ queryKey: ['growth-score'] });
      
      setTimeout(() => {
        onComplete();
      }, 4000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-paytm-navy/40 backdrop-blur-sm p-4">
      <AnimatePresence mode="wait">
        
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-sm w-full relative"
          >
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <Loader2 className="w-8 h-8 text-paytm-blue animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-paytm-navy mb-2">Analyzing Data</h3>
            <div className="space-y-3 w-full">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" /> Fetching latest transactions...
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500" /> Comparing historical baselines...
              </div>
              <div className="flex items-center gap-3 text-sm text-paytm-blue font-medium">
                <Loader2 className="w-4 h-4 animate-spin" /> Detecting anomalies...
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && insight && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -100 }}
            className="bg-white p-6 rounded-3xl shadow-2xl max-w-md w-full border border-red-100 relative"
          >
            <button onClick={onComplete} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-red-500 text-sm font-bold mb-4 pr-8">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Critical Insight Detected
            </div>
            <h3 className="text-xl font-bold text-paytm-navy mb-2">{insight.title}</h3>
            <p className="text-slate-600 mb-6">{insight.cause}</p>
            <button 
              onClick={() => setStep(2)}
              className="w-full btn-primary"
            >
              View Recommendations
            </button>
          </motion.div>
        )}

        {step === 2 && insight && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-3xl shadow-2xl max-w-md w-full relative"
          >
            <button onClick={onComplete} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-green-600 text-sm font-bold mb-4 pr-8">
              <Zap className="w-4 h-4 fill-current" />
              AI Recommendations
            </div>
            <h3 className="text-xl font-bold text-paytm-navy mb-4">Select an Offer Strategy</h3>
            
            <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {[
                { id: 0, title: "Flat Discount (Optimal)", desc: insight.recommendation.description, est: insight.recommendation.estUpliftRupees, conf: insight.recommendation.confidence * 100 },
                { id: 1, title: "Combo Bundle", desc: "Offer 15% off when buying a main item + beverage.", est: Math.round(insight.recommendation.estUpliftRupees * 0.75), conf: 75 },
                { id: 2, title: "Happy Hour Points", desc: "Double loyalty points between 2 PM - 5 PM.", est: Math.round(insight.recommendation.estUpliftRupees * 0.6), conf: 68 }
              ].map((offer, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedOffer(idx)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedOffer === idx ? 'border-paytm-blue bg-blue-50/50' : 'border-slate-100 hover:border-blue-200'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-paytm-navy text-sm">{offer.title}</div>
                    {selectedOffer === idx && <CheckCircle className="w-4 h-4 text-paytm-blue" />}
                  </div>
                  <div className="text-sm text-slate-600 mb-3">{offer.desc}</div>
                  <div className="flex gap-4 text-xs font-medium">
                    <span className="text-green-600">+₹{offer.est} Revenue</span>
                    <span className="text-paytm-blue">{offer.conf}% Match</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleGenerateCampaign}
              className="w-full btn-primary bg-paytm-cyan hover:bg-cyan-500 text-paytm-navy py-3"
            >
              Generate Campaign <Sparkles className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {step === 3 && (
           <motion.div 
           key="step3"
           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
           className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full"
         >
           <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
             <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
           </div>
           <h3 className="text-xl font-bold text-paytm-navy mb-2">Drafting Campaign</h3>
           <p className="text-sm text-slate-500 text-center">AI is writing engaging WhatsApp & SMS copy tailored to your customers...</p>
         </motion.div>
        )}

        {step === 4 && campaign && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="bg-white p-6 rounded-2xl shadow-2xl max-w-lg w-full"
          >
            <div className="flex items-center gap-2 text-paytm-blue text-sm font-bold mb-4">
              <Gift className="w-4 h-4" />
              Campaign Draft Ready
            </div>
            
            <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
              <div className="bg-slate-50 p-4 border-b border-slate-200">
                <h4 className="font-bold text-paytm-navy">{campaign.name}</h4>
                <div className="text-sm text-slate-500">Audience: {campaign.audience}</div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-1">WHATSAPP MESSAGE</div>
                  <div className="bg-[#E7FFDB] p-3 rounded-lg text-sm text-slate-800 shadow-sm inline-block rounded-tl-none">
                    {JSON.parse(campaign.messageCopy || '{}').whatsapp}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={onComplete} className="flex-1 btn-secondary">Cancel</button>
              <button onClick={handleLaunch} className="flex-1 btn-primary">
                Launch Now
              </button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div 
            key="step5"
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full text-center relative overflow-hidden"
          >
            {showConfetti && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <PartyPopper className="w-32 h-32 text-paytm-cyan opacity-20" />
               </div>
            )}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 relative z-10">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-paytm-navy mb-2 relative z-10">Campaign Live!</h3>
            <p className="text-slate-600 mb-6 relative z-10">Your messages are being sent. Growth Score increased by 6 points!</p>
            <div className="text-sm font-bold text-paytm-blue animate-pulse relative z-10">
              Returning to dashboard...
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
