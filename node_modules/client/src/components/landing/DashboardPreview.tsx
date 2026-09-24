import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Home, FileText, Lightbulb, TrendingUp, Megaphone, Package, BarChart2, Settings, Bell, Search, ArrowRight, Sparkles, ArrowUp, ShoppingCart, Users, CreditCard, PieChart, Crown } from 'lucide-react';

const sparklineData1 = [{v: 10}, {v: 12}, {v: 11}, {v: 14}, {v: 13}, {v: 16}, {v: 15}, {v: 20}];
const sparklineData2 = [{v: 20}, {v: 18}, {v: 22}, {v: 25}, {v: 24}, {v: 28}, {v: 25}, {v: 30}];
const sparklineData3 = [{v: 5}, {v: 7}, {v: 6}, {v: 9}, {v: 8}, {v: 12}, {v: 10}, {v: 15}];
const mainChartData = [
  { val: 5000 }, { val: 2000 }, { val: 7000 }, { val: 5000 }, { val: 11000 }, { val: 9000 }, { val: 14000 }, { val: 8000 }, { val: 10000 }, { val: 12000 }
];

export default function DashboardPreview() {
  return (
    <div className="relative w-full max-w-[1000px] mx-auto z-10 transition-transform hover:scale-[1.02] duration-500">
      
      {/* Outer Heavy Glass Bezel */}
      <div className="bg-white/40 backdrop-blur-[60px] rounded-[2.5rem] p-3 md:p-4 shadow-[0_20px_60px_rgba(0,102,255,0.15),inset_0_1px_4px_rgba(255,255,255,0.8)] border border-white/70 relative">
        
        {/* Inner App Screen */}
        <div className="bg-[#F6FAFE]/90 rounded-[2rem] overflow-hidden flex shadow-inner border border-white/60 h-auto md:h-[580px] relative">
          
          {/* Sidebar */}
          <div className="w-56 bg-transparent border-r border-white/50 p-6 flex flex-col h-full relative z-10 hidden md:flex">
            <div className="flex flex-col gap-1 mb-8">
              <span className="text-[#002E6E] font-black text-2xl tracking-tighter">pay<span className="text-[#00BAF2]">tm</span></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Merchant AI</span>
            </div>
            
            <div className="flex flex-col gap-1.5 mb-auto">
              <SidebarItem icon={<Home className="w-4 h-4"/>} label="Home" active />
              <SidebarItem icon={<FileText className="w-4 h-4"/>} label="Transactions" />
              <SidebarItem icon={<Lightbulb className="w-4 h-4"/>} label="AI Insights" />
              <SidebarItem icon={<TrendingUp className="w-4 h-4"/>} label="Forecasts" />
              <SidebarItem icon={<Megaphone className="w-4 h-4"/>} label="Campaigns" />
              <SidebarItem icon={<Package className="w-4 h-4"/>} label="Products" />
              <SidebarItem icon={<BarChart2 className="w-4 h-4"/>} label="Reports" />
              <SidebarItem icon={<Settings className="w-4 h-4"/>} label="Settings" />
            </div>

            {/* AI Promo Card */}
            <div className="bg-gradient-to-br from-blue-50 to-[#EBF5FF] p-4 rounded-2xl border border-white shadow-sm flex flex-col mt-4">
              <div className="flex gap-3 items-center mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-paytm-blue shadow-sm">
                  <Sparkles className="w-5 h-5 fill-current" />
                </div>
                <div className="text-xs font-bold text-[#002E6E] leading-tight">
                  Get AI-powered<br/>growth tips daily
                </div>
              </div>
              <button className="text-[10px] font-bold text-[#0066FF] bg-white rounded-full py-1.5 px-3 border border-blue-100 hover:bg-blue-50 transition-colors w-fit">
                Upgrade Plan →
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col bg-gradient-to-br from-white/40 to-white/10 relative z-10 min-w-0">
            {/* Topbar */}
            <div className="h-20 px-6 flex items-center justify-between gap-4 shrink-0">
              <div className="relative flex-1 max-w-sm hidden sm:block">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Ask anything about your business..." className="w-full bg-white/70 backdrop-blur-md border border-white rounded-full pl-10 pr-4 py-2.5 text-xs font-medium text-slate-600 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus:outline-none" disabled />
              </div>
              
              <div className="flex items-center gap-4 ml-auto">
                <div className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md shadow-sm border border-white flex items-center justify-center relative cursor-pointer">
                  <Bell className="w-4 h-4 text-slate-500" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                </div>
                <div className="flex items-center gap-3 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white shadow-sm cursor-pointer">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                    <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs hidden md:block">
                    <div className="font-bold text-[#002E6E]">Sharma Kirana Store</div>
                    <div className="text-slate-500">Mumbai</div>
                  </div>
                  <svg className="w-3 h-3 text-slate-400 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="px-6 pb-6 overflow-hidden flex-1 flex flex-col gap-4 min-h-0">
              
              {/* KPIs Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
                <KpiCard 
                  icon={<BarChart2 className="w-4 h-4"/>} 
                  title="Today's Sales" 
                  value="₹12,480" 
                  change="+ 12%" 
                  data={sparklineData1} 
                  color="#0066FF" 
                />
                <KpiCard 
                  icon={<CreditCard className="w-4 h-4"/>} 
                  title="Total Transactions" 
                  value="248" 
                  change="+ 8%" 
                  data={sparklineData2} 
                  color="#22C55E" 
                />
                <KpiCard 
                  icon={<PieChart className="w-4 h-4"/>} 
                  title="Average Bill Value" 
                  value="₹50" 
                  change="+ 5%" 
                  data={sparklineData3} 
                  color="#A855F7" 
                />
                
                {/* Growth Score Card */}
                <div className="bg-white/70 backdrop-blur-xl p-4 rounded-[1.25rem] border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center shrink-0">
                      <Crown className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-500 text-right leading-tight">Merchant<br/>Growth Score</div>
                  </div>
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <div className="text-2xl font-black text-[#002E6E] leading-none mb-1">82<span className="text-xs text-slate-400">/100</span></div>
                      <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-[10px] font-bold">Good</div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
                
                {/* Chart Area */}
                <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl p-5 rounded-[1.25rem] border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col">
                  <div className="flex justify-between items-center mb-4 shrink-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#002E6E]">
                      <BarChart2 className="w-5 h-5 text-[#0066FF]" /> Sales Overview
                    </div>
                    <div className="text-xs font-medium text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-100 flex items-center gap-1 shadow-sm cursor-pointer">
                      Today <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-2 shrink-0">
                    <div className="text-2xl font-black text-[#002E6E]">₹12,480</div>
                    <div className="text-[11px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded">+ 12% vs yesterday</div>
                  </div>

                  <div className="flex-1 w-full min-h-[120px] relative">
                    <div className="absolute right-[25%] top-[10%] bg-[#002E6E] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md z-10 flex flex-col items-center pointer-events-none">
                      ₹3,420 <span className="text-[9px] font-normal text-slate-300">2 PM - 3 PM</span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#002E6E] rotate-45" />
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mainChartData} margin={{ top: 30, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#0066FF" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" dot={{r: 4, fill: '#0066FF', stroke: 'white', strokeWidth: 2}} />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between text-[9px] font-medium text-slate-400 mt-2 px-2 border-t border-slate-100 pt-2">
                      <span>12 AM</span><span>6 AM</span><span>12 PM</span><span>6 PM</span><span>12 AM</span>
                    </div>
                  </div>

                  {/* Bottom Stats Row */}
                  <div className="flex justify-between items-center gap-2 mt-4 pt-4 shrink-0">
                    <StatChip icon={<Lightbulb className="w-3 h-3" />} label="Peak Hour" value="2 PM - 3 PM" color="blue" />
                    <StatChip icon={<TrendingUp className="w-3 h-3" />} label="Highest Sales" value="₹3,420" color="green" />
                    <StatChip icon={<ShoppingCart className="w-3 h-3" />} label="Total Orders" value="248" color="slate" />
                    <StatChip icon={<Users className="w-3 h-3" />} label="New Customers" value="32" color="blue" />
                  </div>
                </div>

                {/* AI Insight Giant Card */}
                <div className="lg:col-span-1 bg-white/70 backdrop-blur-xl p-5 rounded-[1.25rem] border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col">
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-[#002E6E] text-sm font-bold">
                      <Lightbulb className="w-5 h-5 text-[#0066FF]" /> AI Insight
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-bold text-[#0066FF] bg-blue-50 px-2 py-1 rounded-full">
                      <Sparkles className="w-2.5 h-2.5" /> Powered by AI
                    </div>
                  </div>
                  
                  <p className="text-[13px] text-[#4B5563] leading-relaxed mb-6 font-medium">
                    Sales <strong className="text-[#0066FF]">are 18% lower</strong> than usual because afternoon purchases dropped.
                  </p>

                  <div className="mt-auto bg-[#F6FAFE] rounded-xl p-4 border border-blue-50">
                    <div className="flex items-center gap-2 text-[#0066FF] text-xs font-bold mb-2">
                      <TrendingUp className="w-3 h-3" /> AI Recommendation
                    </div>
                    <p className="text-[11px] text-[#4B5563] mb-4 leading-relaxed font-medium">
                      Create a ₹20 cashback offer for afternoon shoppers to boost sales.
                    </p>
                    <button className="w-full bg-gradient-to-r from-[#0066FF] to-[#0055DD] text-white text-xs font-bold py-2.5 rounded-lg shadow-[0_4px_10px_rgba(0,102,255,0.3)] hover:shadow-[0_6px_15px_rgba(0,102,255,0.4)] transition-all flex justify-center items-center gap-2">
                      View Recommendation <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-colors ${active ? 'bg-[#EBF5FF] text-[#0066FF]' : 'text-[#64748B] hover:bg-white/50'}`}>
      {icon}
      {label}
    </div>
  )
}

function KpiCard({ icon, title, value, change, data, color }: { icon: React.ReactNode, title: string, value: string, change: string, data: any[], color: string }) {
  return (
    <div className="bg-white/70 backdrop-blur-xl p-4 rounded-[1.25rem] border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between relative overflow-hidden group">
      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-2 shrink-0" style={{ backgroundColor: `${color}15`, color: color }}>
        {icon}
      </div>
      <div className="text-xs font-bold text-slate-500 mb-2">{title}</div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-xl font-black text-[#002E6E] mb-1">{value}</div>
          <div className="text-[10px] font-bold text-green-500 flex items-center gap-0.5">
            <ArrowUp className="w-3 h-3" /> {change}
          </div>
        </div>
        <div className="w-16 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke={color} strokeWidth={2} fillOpacity={1} fill={`url(#grad-${color})`} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function StatChip({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: 'blue' | 'green' | 'slate' }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-500',
    green: 'bg-green-50 text-green-500',
    slate: 'bg-slate-50 text-slate-500'
  };
  return (
    <div className="flex items-center gap-2 bg-slate-50/50 p-2 rounded-xl flex-1 border border-slate-100/50">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colors[color]} shrink-0`}>
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] font-bold text-slate-400 leading-tight">{label}</span>
        <span className="text-[11px] font-black text-[#002E6E] leading-tight">{value}</span>
      </div>
    </div>
  )
}
