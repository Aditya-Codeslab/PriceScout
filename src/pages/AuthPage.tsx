import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { user, isConfigured, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      if (isSignUp) {
        const { error } = await signUpWithEmail(email, password);
        if (error) {
          setErrorMsg(error);
        } else {
          navigate('/saved');
        }
      } else {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          setErrorMsg(error);
        } else {
          navigate('/saved');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg(null);
    setSubmitting(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        setErrorMsg(error);
      } else {
        navigate('/saved');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Google authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs text-center">
          <div className="w-12 h-12 rounded-full bg-[#DDF0E8] text-[#0B5D52] flex items-center justify-center mx-auto">
            <User className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl font-bold text-[#14201D] font-heading">
              Signed in as {user.fullName || user.email}
            </h1>
            <p className="text-xs text-[#46544F]">
              Your price alerts, wishlist, and student status are active.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              to="/saved"
              className="min-h-[44px] px-4 py-2.5 bg-[#0B5D52] hover:bg-[#178F7A] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Saved Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/student"
              className="min-h-[44px] px-4 py-2.5 bg-[#F7F6F2] hover:bg-[#E1DFD6] text-[#14201D] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-[#E1DFD6]"
            >
              <span>Student Verification Status</span>
            </Link>

            <button
              type="button"
              onClick={signOut}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-16 space-y-4">
      <div className="bg-white border border-[#E1DFD6] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="w-10 h-10 rounded-xl bg-[#0B5D52] text-white flex items-center justify-center font-bold mx-auto text-lg">
            <span className="font-heading">P</span>
          </div>
          <h1 className="text-2xl font-bold text-[#14201D] font-heading">
            {isSignUp ? 'Create your PriceScout account' : 'Sign in to PriceScout'}
          </h1>
          <p className="text-xs text-[#46544F]">
            Sync price alerts, wishlist, and student verification across devices.
          </p>
        </div>

        {/* Supabase Status Banner */}
        <div className="p-2.5 bg-[#F7F6F2] rounded-xl border border-[#E1DFD6] text-[11px] text-[#46544F] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            <span>Supabase Auth: {isConfigured ? 'Connected (Live RLS)' : 'Local Session Mode'}</span>
          </span>
          <span className="font-mono text-[10px] text-[#0B5D52]">PostgreSQL</span>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Google OAuth Button */}
        <button
          type="button"
          disabled={submitting}
          onClick={handleGoogleAuth}
          className="w-full min-h-[46px] px-4 py-2.5 bg-white hover:bg-[#F7F6F2] text-[#14201D] border border-[#E1DFD6] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-colors shadow-2xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5D52]"
        >
          {/* Google Color G SVG */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#E1DFD6]" />
          <span className="text-[11px] text-[#46544F] uppercase font-semibold">Or with email</span>
          <div className="flex-1 h-px bg-[#E1DFD6]" />
        </div>

        {/* 2. Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#14201D] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#46544F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full min-h-[44px] pl-10 pr-4 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-sm text-[#14201D] focus:ring-2 focus:ring-[#0B5D52] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#14201D] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#46544F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full min-h-[44px] pl-10 pr-4 bg-[#F7F6F2] border border-[#E1DFD6] rounded-xl text-sm text-[#14201D] focus:ring-2 focus:ring-[#0B5D52] focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-[46px] py-2.5 px-4 bg-[#0B5D52] hover:bg-[#178F7A] text-white font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5D52]"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#46544F]">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMsg(null);
            }}
            className="text-[#0B5D52] font-semibold hover:underline cursor-pointer"
          >
            {isSignUp
              ? 'Already have an account? Sign In'
              : "Don't have an account? Create one"}
          </button>
        </div>

        <div className="pt-3 border-t border-[#E1DFD6] flex items-center justify-center gap-1.5 text-xs text-[#46544F]">
          <ShieldCheck className="w-4 h-4 text-[#0B5D52]" />
          <span>Secured with Supabase Row-Level Security (RLS)</span>
        </div>

      </div>
    </div>
  );
};
