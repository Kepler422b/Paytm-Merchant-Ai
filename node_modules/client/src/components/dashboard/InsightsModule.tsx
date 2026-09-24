import { useQuery } from '@tanstack/react-query';
import { Lightbulb, AlertCircle, ArrowRight } from 'lucide-react';

export default function InsightsModule() {
  const { data, isLoading } = useQuery({
    queryKey: ['insights-all'],
    queryFn: async () => {
      const res = await fetch('/api/v1/insights');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-paytm-navy mb-1">AI Insights</h1>
        <p className="text-sm text-slate-500">Intelligent observations about your business performance.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse h-48" />
          ))
        ) : data?.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <Lightbulb className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-700 mb-2">No new insights yet</p>
            <p className="max-w-md mx-auto">We are continuously analyzing your data. Check back soon or click "Start Demo" on the home page to see an example.</p>
          </div>
        ) : (
          data?.map((insight: any) => (
            <div key={insight.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    insight.type === 'anomaly' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-paytm-blue'
                  }`}>
                    {insight.type === 'anomaly' ? <AlertCircle className="w-3.5 h-3.5" /> : <Lightbulb className="w-3.5 h-3.5" />}
                    {insight.type.toUpperCase()}
                  </div>
                  <div className="text-xs font-medium text-slate-400">
                    {new Date(insight.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-paytm-navy mb-2">{insight.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {insight.cause}
                </p>

                {insight.recommendation && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="text-xs font-bold text-paytm-blue mb-1">RECOMMENDATION</div>
                    <div className="text-sm text-slate-700 font-medium mb-3">{insight.recommendation.title}</div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400">EST. IMPACT</span>
                        <span className="font-bold text-green-600">+₹{insight.recommendation.estUpliftRupees}</span>
                      </div>
                      <div className="w-px h-6 bg-slate-200" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400">CONFIDENCE</span>
                        <span className="font-bold text-slate-700">{insight.recommendation.confidence * 100}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {insight.recommendation && (
                <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                  <button className="w-full py-2.5 bg-white border border-paytm-blue text-paytm-blue rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-paytm-blue hover:text-white transition-colors">
                    Take Action <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
