import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      {/* Floating Glass Pill */}
      <nav className="bg-white/40 backdrop-blur-2xl border-[1.5px] border-white/70 shadow-[0_8px_32px_0_rgba(30,107,255,0.15),inset_0_2px_10px_rgba(255,255,255,0.8)] rounded-full px-6 py-3 flex items-center justify-between w-full max-w-[1100px]">
        
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link to="/" className="flex items-center ml-2">
            <span className="text-[#002E6E] font-black text-3xl tracking-tighter">
              pay<span className="text-[#00BAF2]">tm</span>
            </span>
          </Link>
          
          {/* Links */}
          <div className="hidden md:flex items-center gap-2 text-sm font-bold text-[#4B5563]">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-5 py-2.5 bg-white/60 text-paytm-blue rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-white/50">For Merchants</button>
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2.5 hover:bg-white/30 rounded-full transition-colors">Features</button>
            <button onClick={() => {
              alert("The How It Works section will be available in the next release!");
            }} className="px-5 py-2.5 hover:bg-white/30 rounded-full transition-colors">How it Works</button>
            <button onClick={() => {
              alert("Pricing plans will be available shortly.");
            }} className="px-5 py-2.5 hover:bg-white/30 rounded-full transition-colors">Pricing</button>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:flex items-center text-sm font-bold text-paytm-blue px-7 py-2.5 bg-white/60 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-white/50 hover:bg-white/80 transition-colors">
            Login
          </Link>
          <Link to="/login" className="bg-gradient-to-b from-[#0066FF] to-[#004ADD] text-white text-sm font-bold py-2.5 px-7 rounded-full transition-all shadow-[0_8px_20px_rgba(0,102,255,0.4),inset_0_2px_5px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_25px_rgba(0,102,255,0.5)] border border-[#0055FF] flex items-center gap-1">
            Get Started <span className="text-white/80 ml-1">→</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
