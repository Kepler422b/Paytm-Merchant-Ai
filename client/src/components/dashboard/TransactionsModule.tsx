import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileText, ArrowLeft, ArrowRight, Package } from 'lucide-react';

export default function TransactionsModule() {
  const [page, setPage] = useState(1);
  
  const { data, isLoading } = useQuery({
    queryKey: ['transactions', page],
    queryFn: async () => {
      const res = await fetch(`/api/v1/dashboard/transactions?page=${page}&limit=15`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    }
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-paytm-navy mb-1">Transactions</h1>
        <p className="text-sm text-slate-500">View and manage your recent sales.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 animate-pulse rounded w-24"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 animate-pulse rounded w-32"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 animate-pulse rounded w-40"></div></td>
                    <td className="px-6 py-4"><div className="h-4 bg-slate-100 animate-pulse rounded w-16 ml-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-6 bg-slate-100 animate-pulse rounded-full w-16 mx-auto"></div></td>
                  </tr>
                ))
              ) : data?.items?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p>No transactions found.</p>
                  </td>
                </tr>
              ) : (
                data?.items?.map((tx: any) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">#{tx.id.substring(0, 8)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(tx.createdAt).toLocaleString('en-IN', {
                        day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700 font-medium flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-blue-50 text-paytm-blue flex items-center justify-center">
                        <Package className="w-4 h-4" />
                      </div>
                      {tx.product?.name || 'Unknown Item'}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-paytm-navy text-right">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                        Success
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {data?.total > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-slate-500 font-medium">
              Showing <strong className="text-slate-700">{(page - 1) * 15 + 1}</strong> to <strong className="text-slate-700">{Math.min(page * 15, data.total)}</strong> of <strong className="text-slate-700">{data.total}</strong> results
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPage(p => p + 1)}
                disabled={page * 15 >= data.total}
                className="p-2 border border-slate-200 rounded-lg bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
