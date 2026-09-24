import { useQuery } from '@tanstack/react-query';
import { Megaphone, CheckCircle2, Copy } from 'lucide-react';

export default function CampaignsModule() {
  const { data, isLoading } = useQuery({
    queryKey: ['campaigns-all'],
    queryFn: async () => {
      const res = await fetch('/api/v1/campaigns');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-paytm-navy mb-1">Smart Campaigns</h1>
          <p className="text-sm text-slate-500">AI-generated marketing messages for your customers.</p>
        </div>
        <button className="bg-paytm-navy text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-paytm-darkBlue transition-colors flex items-center gap-2">
          <Megaphone className="w-4 h-4" /> Create New
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse h-48" />
          ))
        ) : data?.length === 0 ? (
          <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
            <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-700 mb-2">No campaigns yet</p>
            <p className="max-w-md mx-auto">Trigger an AI insight from the home page to automatically generate your first campaign.</p>
          </div>
        ) : (
          data?.map((campaign: any) => {
            const copy = JSON.parse(campaign.messageCopy || '{}');
            const isDraft = campaign.status === 'draft';
            
            return (
              <div key={campaign.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                <div className="p-6 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      isDraft ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-700'
                    }`}>
                      {isDraft ? <span className="w-2 h-2 rounded-full bg-slate-400" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {campaign.status.toUpperCase()}
                    </div>
                    <div className="text-xs font-medium text-slate-400">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-paytm-navy mb-1">{campaign.name}</h3>
                  <p className="text-xs font-medium text-slate-500 mb-6">Target: {campaign.audience}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center justify-between">
                        WHATSAPP 
                        <button className="text-paytm-blue hover:underline flex items-center gap-1"><Copy className="w-3 h-3"/> Copy</button>
                      </div>
                      <div className="bg-[#E7FFDB] p-3 rounded-lg text-sm text-slate-800 shadow-sm inline-block rounded-tl-none border border-[#d2f4c2]">
                        {copy.whatsapp || 'No message generated'}
                      </div>
                    </div>
                    {copy.sms && (
                      <div>
                        <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center justify-between">
                          SMS 
                          <button className="text-paytm-blue hover:underline flex items-center gap-1"><Copy className="w-3 h-3"/> Copy</button>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-lg text-sm text-slate-700">
                          {copy.sms}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {isDraft && (
                  <div className="border-t border-slate-100 p-4 bg-slate-50/50 flex gap-3">
                    <button className="flex-1 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 py-2 bg-paytm-navy text-white rounded-lg text-sm font-bold hover:bg-paytm-darkBlue transition-colors">
                      Launch Now
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
