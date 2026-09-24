import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, LineChart, Lightbulb, TrendingUp, Megaphone, 
  Package, FileText, Settings, Bell, Search, User, Menu,
  Sparkles, X
} from 'lucide-react';
import BusinessDashboard from '../components/dashboard/BusinessDashboard';
import AiAssistantPanel from '../components/dashboard/AiAssistantPanel';
import TransactionsModule from '../components/dashboard/TransactionsModule';
import InsightsModule from '../components/dashboard/InsightsModule';
import ForecastsModule from '../components/dashboard/ForecastsModule';
import CampaignsModule from '../components/dashboard/CampaignsModule';

function Placeholder({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center max-w-sm mx-auto">
      {icon}
      <h2 className="text-xl font-bold text-paytm-navy mb-2">{title}</h2>
      <p className="text-slate-500">This module is part of the Paytm AI Business Partner suite. Full functionality will be available in the upcoming release.</p>
    </div>
  )
}

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isAiPanelOpen, setAiPanelOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/dashboard/transactions', label: 'Transactions', icon: <LineChart className="w-5 h-5" /> },
    { path: '/dashboard/insights', label: 'AI Insights', icon: <Lightbulb className="w-5 h-5" /> },
    { path: '/dashboard/forecasts', label: 'Forecasts', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/dashboard/campaigns', label: 'Campaigns', icon: <Megaphone className="w-5 h-5" /> },
    { path: '/dashboard/products', label: 'Products', icon: <Package className="w-5 h-5" /> },
    { path: '/dashboard/reports', label: 'Reports', icon: <FileText className="w-5 h-5" /> },
    { path: '/dashboard/settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`bg-paytm-navy text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col hidden md:flex`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {isSidebarOpen && <span className="font-black text-xl tracking-tighter">paytm</span>}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg">
            <Menu className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive ? 'bg-paytm-blue text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.icon}
                {isSidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Ask anything about your business..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm w-80 focus:bg-white focus:border-paytm-blue focus:ring-1 focus:ring-paytm-blue transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-paytm-blue border border-blue-200">
              <User className="w-4 h-4" />
            </div>
            
            <div className="w-px h-6 bg-slate-200 mx-1 hidden md:block" />
            
            <button 
              onClick={() => {
                fetch('/api/v1/auth/logout', { method: 'POST' })
                  .finally(() => window.location.href = '/');
              }}
              className="hidden md:flex items-center text-sm font-bold text-paytm-blue px-6 py-2 bg-slate-50 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<BusinessDashboard />} />
            <Route path="/transactions" element={<TransactionsModule />} />
            <Route path="/insights" element={<InsightsModule />} />
            <Route path="/forecasts" element={<ForecastsModule />} />
            <Route path="/campaigns" element={<CampaignsModule />} />
            <Route path="/products" element={<Placeholder title="Products" icon={<Package className="w-12 h-12 text-slate-300 mx-auto mb-4"/>} />} />
            <Route path="/reports" element={<Placeholder title="Reports" icon={<FileText className="w-12 h-12 text-slate-300 mx-auto mb-4"/>} />} />
            <Route path="/settings" element={<Placeholder title="Settings" icon={<Settings className="w-12 h-12 text-slate-300 mx-auto mb-4"/>} />} />
            <Route path="*" element={<Placeholder title="Module not found" icon={<Search className="w-12 h-12 text-slate-300 mx-auto mb-4"/>} />} />
          </Routes>
        </div>

        {/* Floating AI Button (Mobile) */}
        {!isAiPanelOpen && (
          <button 
            onClick={() => setAiPanelOpen(true)}
            className="md:hidden absolute bottom-6 right-6 p-4 bg-paytm-blue text-white rounded-full shadow-xl"
          >
            <Sparkles className="w-6 h-6" />
          </button>
        )}
      </main>

      {/* Right AI Assistant Panel */}
      <aside className={`bg-white border-l border-slate-200 transition-all duration-300 flex flex-col z-40
        ${isAiPanelOpen ? 'w-full md:w-96 absolute md:relative inset-y-0 right-0' : 'w-0 overflow-hidden'}`}>
        <AiAssistantPanel onClose={() => setAiPanelOpen(false)} />
      </aside>

      {/* Desktop AI Toggle */}
      {!isAiPanelOpen && (
        <button 
          onClick={() => setAiPanelOpen(true)}
          className="hidden md:flex absolute bottom-8 right-8 bg-white border border-blue-100 shadow-xl p-3 rounded-full text-paytm-blue hover:scale-105 transition-transform group items-center gap-2"
        >
          <Sparkles className="w-6 h-6 text-paytm-cyan" />
          <span className="font-semibold px-2">Ask My Business</span>
        </button>
      )}
    </div>
  )
}
