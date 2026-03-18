'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Temporary logger to confirm navigation visually
  if (typeof window !== 'undefined') {
    console.log("Forgot Password page successfully loaded!");
  }

  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    console.log("TRIGGERING API CALL: /api/auth/forgot-password for email:", email);
    
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg({ type: 'success', text: 'OTP requested successfully! Redirecting...' });
        setTimeout(() => {
          router.push(`/admin/reset-password?email=${encodeURIComponent(email)}`);
        }, 1500);
      } else {
        setMsg({ type: 'error', text: data.message || 'Failed to request OTP' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        
        {/* Added distinct visual header */}
        <div className="text-center mb-10 pb-6 border-b border-gray-100">
          <div className="mx-auto w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-brand-green mb-3">Forgot Password</h2>
          <p className="text-gray-600 text-lg">Enter your admin email to receive a 6-digit OTP</p>
        </div>
        
        {msg.text && (
          <div className={`mb-4 p-3 rounded-lg text-sm border ${msg.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
            {msg.text}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleRequestOtp}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          
          <button
            type="button"
            onClick={handleRequestOtp}
            disabled={loading}
            className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 px-4 rounded-lg shadow transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending Request...' : 'Get OTP'}
          </button>
          
          <div className="text-center mt-4">
            <Link href="/admin/login" className="text-sm text-gray-600 hover:text-brand-green font-medium">
              &larr; Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
