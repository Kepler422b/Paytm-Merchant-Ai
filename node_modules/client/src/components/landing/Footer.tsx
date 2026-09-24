export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8 text-sm text-slate-500">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="font-semibold text-slate-600 mb-8">Built for India's Merchants</p>
        <div className="flex flex-wrap justify-center gap-12 mb-12">
          <span className="flex items-center gap-2">🛡️ Secure & Private</span>
          <span className="flex items-center gap-2">⚡ Powered by Paytm</span>
          <span className="flex items-center gap-2">🏪 Made for Small Businesses</span>
        </div>
        <p>© {new Date().getFullYear()} Paytm AI Business Partner. Demo application.</p>
      </div>
    </footer>
  )
}
