import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowUpRight, ArrowDownRight, RefreshCw, Zap, Lightbulb } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import WowFlow from './WowFlow';

export default function BusinessDashboard() {
  const [showWowFlow, setShowWowFlow] = useState(false);

  const { data: kpis, isLoading: kpisLoading } = useQuery({
    queryKey: ['kpis', 'today'],
    queryFn: async () => {
      const res = await fetch('/api/v1/dashboard/kpis?range=today');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    }
  });

  const { data: overview, isLoading: overviewLoading } = useQuery({
    queryKey: ['sales-overview', 'today'],
    queryFn: async () => {
      const res = await fetch('/api/v1/dashboard/sales-overview?range=today');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    }
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {showWowFlow && <WowFlow onComplete={() => setShowWowFlow(false)} />}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-paytm-navy mb-1 flex items-center gap-3">
            Sharma Kirana Store 
            <span className="text-slate-300 font-light">|</span>
            <span className="text-slate-500 font-medium text-xl">Business Dashboard</span>
          </h1>
          <p className="text-sm text-slate-500">Here's what's happening today.</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50">
          <RefreshCw className="w-4 h-4" /> Today
        </button>
      </div>

      {/* Demo Wow Flow Trigger */}
      <div className="bg-gradient-to-r from-paytm-blue/10 to-paytm-cyan/10 border border-paytm-blue/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-paytm-blue font-bold mb-2">
            <Zap className="w-5 h-5 fill-current" /> Demo Flow
          </div>
          <p className="text-sm text-slate-600 font-medium">Click "Start Demo" to inject an afternoon sales drop anomaly and trigger AI Insights.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => fetch('/api/v1/demo/reset', { method: 'POST' }).then(() => window.location.reload())}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg shadow-sm"
          >
            Reset Demo
          </button>
          <button 
            onClick={() => setShowWowFlow(true)}
            className="px-6 py-2 text-sm font-semibold text-white bg-paytm-navy rounded-lg shadow-md hover:bg-paytm-darkBlue transition-colors"
          >
            Start Demo
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <KpiCard 
          title="Today's Sales" 
          value={kpis?.sales.value ? `₹${kpis.sales.value.toLocaleString('en-IN')}` : '₹0'} 
          change={kpis?.sales.change} 
          loading={kpisLoading} 
        />
        <KpiCard 
          title="Total Transactions" 
          value={kpis?.transactions.value?.toString() || '0'} 
          change={kpis?.transactions.change} 
          loading={kpisLoading} 
        />
        <KpiCard 
          title="Average Bill Value" 
          value={kpis?.avgBill.value ? `₹${Math.round(kpis.avgBill.value)}` : '₹0'} 
          change={kpis?.avgBill.change} 
          loading={kpisLoading} 
        />
      </div>

      {/* Charts Area */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Sales Overview Chart */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-paytm-navy mb-6">Sales Overview</h2>
          <div className="h-72">
            {overviewLoading ? (
              <div className="w-full h-full animate-pulse bg-slate-50 rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overview} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E6BFF" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1E6BFF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(val: number) => [`₹${val}`, 'Sales']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#1E6BFF" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col relative overflow-hidden h-full">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Lightbulb className="w-24 h-24 text-paytm-blue" />
          </div>
          <div className="flex items-center gap-2 text-paytm-blue text-sm font-bold mb-4 shrink-0 relative z-10">
            <span className="w-2 h-2 rounded-full bg-paytm-blue" />
            AI Insight
          </div>
          <div className="relative z-10 flex-1 flex flex-col min-h-0">
            <InsightDisplay />
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ title, value, change, loading }: { title: string, value: string, change?: number, loading: boolean }) {
  const isPositive = change !== undefined && change >= 0;
  
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="text-sm font-medium text-slate-500 mb-2">{title}</div>
      {loading ? (
        <div className="h-8 w-24 bg-slate-100 animate-pulse rounded" />
      ) : (
        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-paytm-navy">{value}</div>
          {change !== undefined && (
            <div className={`flex items-center text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              {Math.abs(change).toFixed(1)}% vs yesterday
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function InsightDisplay() {
  const { data, isLoading } = useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      const res = await fetch('/api/v1/insights');
      return res.json();
    }
  });

  if (isLoading) return <div className="animate-pulse space-y-3"><div className="h-4 bg-blue-100/50 rounded w-full"/><div className="h-4 bg-blue-100/50 rounded w-3/4"/></div>;
  
  const insight = data?.[0]; // Get most recent insight

  if (!insight) {
    return (
      <div className="flex-1 flex flex-col justify-center text-slate-600 font-medium text-sm">
        <p>Looking good! No immediate issues detected in your recent data.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="overflow-y-auto mb-4 pr-2">
        <p className="text-slate-700 font-medium text-sm leading-relaxed">
          <strong className="text-paytm-navy block mb-1">{insight.title}</strong>
          {insight.cause}
        </p>
      </div>
      <div className="mt-auto shrink-0 pt-2 bg-blue-50">
        <a 
          href="/dashboard/insights"
          className="w-full bg-white text-paytm-blue border border-paytm-blue text-sm font-bold py-2.5 rounded-xl hover:bg-paytm-blue hover:text-white transition-colors flex justify-center items-center"
        >
          View Recommendation
        </a>
      </div>
    </div>
  )
}
