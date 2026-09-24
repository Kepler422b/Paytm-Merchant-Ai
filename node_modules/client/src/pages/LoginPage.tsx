import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (!res.ok) throw new Error('Invalid phone number');
      setStep(2);
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otp })
      });
      if (!res.ok) throw new Error('Invalid OTP');
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-paytm-lightBlue flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card bg-white p-8 max-w-md w-full shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-paytm-navy mb-2">Welcome Back</h2>
          <p className="text-slate-500">Login to your AI Business Partner</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <div className="flex">
                <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-slate-500">
                  +91
                </span>
                <input 
                  type="text" 
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0,10))}
                  placeholder="9999999999"
                  className="flex-1 block w-full rounded-none rounded-r-xl border border-slate-200 px-4 py-3 focus:border-paytm-blue focus:ring-1 focus:ring-paytm-blue outline-none transition-all"
                  required
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">Demo: Use 9999999999</p>
            </div>
            <button type="submit" className="w-full btn-primary py-3">
              Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Enter OTP</label>
              <input 
                type="text" 
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
                placeholder="123456"
                className="block w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-paytm-blue focus:ring-1 focus:ring-paytm-blue outline-none transition-all text-center tracking-[1em] font-bold text-lg"
                required
              />
              <p className="text-xs text-slate-400 mt-2 text-center">Demo: Use 123456</p>
            </div>
            <button type="submit" className="w-full btn-primary py-3">
              Verify & Login
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-paytm-blue text-sm font-medium hover:underline">
              Change phone number
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}
