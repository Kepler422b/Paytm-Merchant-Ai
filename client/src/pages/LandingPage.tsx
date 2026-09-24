import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, PlayCircle, BarChart3, Lightbulb, TrendingUp, Wallet, Target, Megaphone, MessageSquare, Award, CheckCircle2, X } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import DashboardPreview from '../components/landing/DashboardPreview';

export default function LandingPage() {
  const [selectedFeature, setSelectedFeature] = useState<{title: string, desc: string, icon: React.ReactNode, longDesc: string} | null>(null);
  return (
    <div className="min-h-screen bg-[#F0F8FF] font-sans overflow-x-hidden relative">
      {/* Heavy Liquid Glass Background for Hero */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden bg-white">
        {/* Top/Nav Waves */}
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[40vw] min-w-[800px] min-h-[400px] bg-[#00BAF2]/15 blur-[100px] rounded-[100%] rotate-12 mix-blend-multiply" />
        <div className="absolute top-[-10%] right-[-10%] w-[70vw] h-[30vw] min-w-[900px] min-h-[300px] bg-[#0066FF]/10 blur-[100px] rounded-[100%] -rotate-6 mix-blend-multiply" />
        
        {/* Mid/Hero Heavy Liquid Waves */}
        <div className="absolute top-[20%] right-[-15%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-[#0066FF]/30 to-[#00BAF2]/30 blur-[80px] rounded-[100%] mix-blend-multiply" />
        <div className="absolute top-[40%] left-[-20%] w-[70vw] h-[40vw] bg-[#0066FF]/20 blur-[120px] rounded-[100%] mix-blend-multiply rotate-12" />
        
        {/* Bottom Features Waves */}
        <div className="absolute bottom-[0%] left-[-10%] w-[50vw] h-[30vw] bg-[#00BAF2]/20 blur-[100px] rounded-[100%] mix-blend-multiply -rotate-12" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[40vw] bg-[#0066FF]/15 blur-[120px] rounded-[100%] mix-blend-multiply" />
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto z-10 flex flex-col lg:flex-row items-center gap-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-[45%] pl-4 lg:pl-10 relative z-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-paytm-blue text-sm font-bold mb-6">
            <SparklesIcon /> AI for Every Paytm Merchant
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-black text-[#002E6E] leading-[1.1] tracking-tight mb-6">
            Your AI Business<br/>
            Partner, <span className="text-[#0066FF]">Now on Paytm</span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#4B5563] mb-10 max-w-lg leading-relaxed font-medium">
            Understand your business. Predict your growth. Get actionable recommendations — all in one place.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <button className="bg-gradient-to-b from-[#0066FF] to-[#004ADD] hover:from-[#0055DD] hover:to-[#003BCC] text-white font-bold py-4 px-8 rounded-full transition-all shadow-[0_8px_20px_rgba(0,102,255,0.4),inset_0_2px_5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 text-lg border border-[#0055FF]">
              Get Started Free <ArrowRight className="w-5 h-5 opacity-80" />
            </button>
            <button className="bg-white hover:bg-slate-50 text-[#002E6E] font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2 text-lg shadow-[0_4px_15px_rgba(0,0,0,0.05)] border border-slate-200">
              <PlayCircle className="w-5 h-5 text-paytm-blue" /> Watch Demo
            </button>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#4B5563] font-bold">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-paytm-blue fill-blue-100" /> Easy setup with your Paytm account</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-paytm-blue fill-blue-100" /> Built for Indian merchants</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-paytm-blue fill-blue-100" /> 100% Secure & Private</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="lg:w-[55%] relative w-full mt-10 lg:mt-0"
        >

          <div className="w-full relative z-20">
            <DashboardPreview />
          </div>
        </motion.div>
      </section>

      {/* Trust Strip */}
      <div className="relative z-20 bg-white/90 backdrop-blur-md border-y border-slate-200 py-6">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col text-sm">
            <span className="font-medium text-slate-500">Trusted by <strong className="text-[#002E6E] text-base">30+ Million</strong></span>
            <span className="font-medium text-slate-500">Paytm Merchants Across India</span>
          </div>
          
          <div className="flex-1 flex flex-wrap justify-around items-center gap-4 text-[#4B5563] font-bold text-sm opacity-80">
            <span className="flex items-center gap-2">🏪 Kirana Stores</span>
            <span className="flex items-center gap-2">🍽️ Restaurants</span>
            <span className="flex items-center gap-2">💊 Pharmacies</span>
            <span className="flex items-center gap-2">👕 Fashion Stores</span>
            <span className="flex items-center gap-2">📱 Electronics</span>
            <span className="flex items-center gap-2">💇 Salons</span>
            <span className="flex items-center gap-2">🛒 Groceries</span>
            <span className="flex items-center gap-2">⌘ And Many More</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="relative z-10 pt-24 pb-12 px-4 max-w-[1400px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100/60 text-paytm-blue text-sm font-bold mb-6 backdrop-blur-sm border border-blue-200">
          <ArrowRight className="w-4 h-4" /> Powerful Features
        </div>
        <h2 className="text-4xl md:text-[2.75rem] font-black text-[#002E6E] tracking-tight mb-4">Everything You Need to Grow</h2>
        <p className="text-lg text-[#4B5563] mb-16 font-medium">AI-powered insights and tools, built specially for Paytm merchants.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 text-left">
          <FeatureCard 
            icon={<BarChart3 />} title="Business Dashboard" desc="Track sales, transactions and average bill value in real time." 
            onClick={() => setSelectedFeature({ title: 'Business Dashboard', icon: <BarChart3 className="w-8 h-8"/>, desc: 'Track sales, transactions and average bill value in real time.', longDesc: 'The Business Dashboard provides a comprehensive, real-time view of your entire operation. Monitor daily transaction volumes, spot revenue trends, and track your average bill value to understand customer spending habits instantly without digging through complex ledgers.' })}
          />
          <FeatureCard 
            icon={<Lightbulb />} title="AI Insights" desc="Get instant explanations behind your business trends." 
            onClick={() => setSelectedFeature({ title: 'AI Insights', icon: <Lightbulb className="w-8 h-8"/>, desc: 'Get instant explanations behind your business trends.', longDesc: 'Our AI engine runs 24/7 in the background, analyzing thousands of data points. When it detects an anomaly (like a sudden drop in afternoon sales or a spike in a specific category), it proactively alerts you with plain-English explanations so you are never caught off guard.' })}
          />
          <FeatureCard 
            icon={<TrendingUp />} title="Sales Prediction" desc="Know your next-day and next-week expected sales." 
            onClick={() => setSelectedFeature({ title: 'Sales Prediction', icon: <TrendingUp className="w-8 h-8"/>, desc: 'Know your next-day and next-week expected sales.', longDesc: 'Using advanced machine learning trained on your historical data, seasonality, and local events, we predict your upcoming sales volume with up to 85% accuracy. Plan your inventory and staffing with confidence.' })}
          />
          <FeatureCard 
            icon={<Wallet />} title="Cash-Flow Forecast" desc="See expected income, expenses and balance ahead of time." 
            onClick={() => setSelectedFeature({ title: 'Cash-Flow Forecast', icon: <Wallet className="w-8 h-8"/>, desc: 'See expected income, expenses and balance ahead of time.', longDesc: 'Cash flow is the lifeblood of any business. This module predicts your upcoming inflows and outflows, warning you of potential cash crunches days before they happen so you can secure credit or adjust expenses.' })}
          />
          <FeatureCard 
            icon={<Target />} title="Growth Opportunities" desc="Identify weak time slots, underperforming products and hidden opportunities." 
            onClick={() => setSelectedFeature({ title: 'Growth Opportunities', icon: <Target className="w-8 h-8"/>, desc: 'Identify weak time slots, underperforming products and hidden opportunities.', longDesc: 'Stop guessing where to grow. We pinpoint exact areas of opportunity—whether it is pushing a specific combo during lunch hours or running a weekend promotion for returning customers to maximize your yield.' })}
          />
          <FeatureCard 
            icon={<Megaphone />} title="Smart Campaigns" desc="AI suggests the best offers for your customers." 
            onClick={() => setSelectedFeature({ title: 'Smart Campaigns', icon: <Megaphone className="w-8 h-8"/>, desc: 'AI suggests the best offers for your customers.', longDesc: 'Generate highly converting WhatsApp and SMS marketing campaigns in seconds. The AI writes the copy, determines the optimal discount to preserve margins, and selects the perfect audience segment automatically.' })}
          />
          <FeatureCard 
            icon={<MessageSquare />} title="Ask My Business" desc="Ask questions in normal language and get instant answers." 
            onClick={() => setSelectedFeature({ title: 'Ask My Business', icon: <MessageSquare className="w-8 h-8"/>, desc: 'Ask questions in normal language and get instant answers.', longDesc: 'Treat your data like a conversation. Just type "What was my highest selling item last month?" or "How are my evening sales doing compared to last week?" and get instant, accurate answers and charts.' })}
          />
          <FeatureCard 
            icon={<Award />} title="Merchant Growth Score" desc="A simple score to track your overall business health." 
            onClick={() => setSelectedFeature({ title: 'Merchant Growth Score', icon: <Award className="w-8 h-8"/>, desc: 'A simple score to track your overall business health.', longDesc: 'Your business health distilled into a single, easy-to-understand score out of 100. It factors in revenue growth, customer retention, operational efficiency, and campaign success to keep you on track.' })}
          />
        </div>

        <div className="mt-20 flex flex-col items-center relative">
          <h3 className="text-2xl font-black text-[#002E6E] mb-6">More Insights. More Customers. A Stronger Tomorrow.</h3>
          <button className="bg-gradient-to-b from-[#0066FF] to-[#004ADD] text-white font-bold py-3.5 px-8 rounded-full shadow-lg border border-[#0055FF] flex items-center gap-2 hover:shadow-xl transition-shadow">
            Start Growing with Paytm <ArrowRight className="w-4 h-4 opacity-80" />
          </button>
          
          <div className="absolute right-[10%] top-[-20%] transform -rotate-12">
            <div className="font-['Caveat',cursive] text-2xl text-[#0066FF] font-bold leading-tight">
              India<br/>Badh Raha Hai<br/>Aapke Saath
            </div>
          </div>
        </div>
      </section>

      {/* Feature Modal Popup */}
      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="absolute inset-0 bg-[#002E6E]/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full relative z-10 shadow-[0_20px_60px_-15px_rgba(0,46,110,0.3)] border border-slate-100"
            >
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 rounded-2xl bg-[#F0F8FF] text-[#0066FF] flex items-center justify-center mb-6">
                {selectedFeature.icon}
              </div>
              <h3 className="text-2xl font-black text-[#002E6E] mb-3">{selectedFeature.title}</h3>
              <p className="text-paytm-blue font-bold text-sm mb-4 leading-relaxed">{selectedFeature.desc}</p>
              <div className="w-full h-px bg-slate-100 mb-4" />
              <p className="text-slate-600 leading-relaxed font-medium">
                {selectedFeature.longDesc}
              </p>
              
              <button 
                onClick={() => setSelectedFeature(null)}
                className="mt-8 w-full py-3.5 bg-slate-50 hover:bg-slate-100 text-[#002E6E] font-bold rounded-xl transition-colors border border-slate-200"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function FeatureCard({ icon, title, desc, onClick }: { icon: React.ReactNode, title: string, desc: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col group hover:-translate-y-1 transition-transform h-full cursor-pointer hover:shadow-[0_15px_40px_rgb(0,102,255,0.1)]"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#F0F8FF] text-[#0066FF] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-[15px] font-bold text-[#002E6E] mb-2 leading-tight">{title}</h3>
      <p className="text-[13px] text-[#6B7280] font-medium leading-relaxed mb-6 flex-1">{desc}</p>
      <div className="w-8 h-8 rounded-full bg-[#F0F8FF] flex items-center justify-center text-[#0066FF] self-end mt-auto">
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  )
}

function SparklesIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
  )
}
