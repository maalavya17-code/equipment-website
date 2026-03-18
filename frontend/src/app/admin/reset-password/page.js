'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryEmail = searchParams.get('email');
    if (queryEmail) {
      setEmail(queryEmail);
    }
  }, [searchParams]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: '', text: '' });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg({ type: 'success', text: 'Password reset successful! You can now log in.' });
        setTimeout(() => {
          router.push('/admin/login');
        }, 2000);
      } else {
        setMsg({ type: 'error', text: data.message || 'Failed to reset password' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Network error. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="text-center mb-8">
         <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
         <p className="text-gray-500">Enter the 6-digit OTP sent to your email</p>
      </div>
      
      {msg.text && (
        <div className={`mb-4 p-3 rounded-lg text-sm border ${msg.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
          {msg.text}
        </div>
      )}
      
      <form onSubmit={handleResetPassword} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            readOnly={!!searchParams.get('email')}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none ${searchParams.get('email') ? 'bg-gray-100 text-gray-500' : ''}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">6-Digit OTP</label>
          <input
            type="text"
            required
            maxLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none tracking-widest text-center text-lg font-bold"
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            required
            minLength={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-green outline-none"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-green hover:bg-brand-green-light text-white font-bold py-3 px-4 rounded-lg shadow transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : 'Reset Password'}
        </button>

        <div className="text-center mt-4">
          <Link href="/admin/login" className="text-sm text-gray-600 hover:text-brand-green font-medium">
            &larr; Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
