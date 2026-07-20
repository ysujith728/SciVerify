import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { SciVerifyHeroLogo } from './SciVerifyHeroLogo';

interface AuthPageProps {
  initialTab?: 'login' | 'signup';
  onAuthSuccess: (user: { name: string; email: string; institution: string }) => void;
  onCancel: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialTab = 'login',
  onAuthSuccess,
  onCancel,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
    setPassword('');
    setConfirmPassword('');
  };

  const validateForm = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid academic or professional email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return false;
    }
    if (activeTab === 'signup') {
      if (!fullName) {
        setError('Please enter your full name.');
        return false;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);

    // Simulate authentication timing delay
    setTimeout(() => {
      setLoading(false);
      if (activeTab === 'login') {
        const loggedUser = {
          name: fullName || email.split('@')[0].toUpperCase(),
          email,
          institution: 'Independent Research Facility',
        };
        setSuccess('Authentication successful. Redirecting to workspace...');
        setTimeout(() => {
          onAuthSuccess(loggedUser);
        }, 1000);
      } else {
        const newUser = {
          name: fullName,
          email,
          institution: 'Academic Registry Affiliate',
        };
        setSuccess('Registration complete. Authorizing profile...');
        setTimeout(() => {
          onAuthSuccess(newUser);
        }, 1200);
      }
    }, 1200);
  };

  const handleSocialLogin = (provider: 'Google' | 'GitHub') => {
    setError('');
    setSuccess('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const socialUser = {
        name: provider === 'Google' ? 'DR. COOPER' : 'RESEARCHER_X',
        email: `auth.${provider.toLowerCase()}@sciverify.edu`,
        institution: `${provider} Federated SSO`,
      };
      setSuccess(`Federated SSO via ${provider} verified. Redirecting...`);
      setTimeout(() => {
        onAuthSuccess(socialUser);
      }, 1000);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-paper transition-colors duration-300 relative overflow-hidden select-none">
      
      {/* Background decoration elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Main Centered Auth Card */}
      <motion.div
        className="w-full max-w-md instrument-card p-6 md:p-8 bg-console/40 border border-slate-200 dark:border-white/10 shadow-2xl relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Top Header Logo monogram */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="flex items-center text-cobalt justify-center select-none">
            <SciVerifyHeroLogo variant="navbar" layoutId="auth-logo-container" className="text-cobalt" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-ink">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest text-center">
            Verify Smarter. Trust Science.
          </p>
        </div>

        {/* Form controls */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Full Name (Sign Up only) */}
          {activeTab === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dr. Sarah Chen"
                  disabled={loading}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-none py-2.5 pl-10 pr-4 text-xs text-ink placeholder-slate-405 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cobalt focus:border-cobalt transition-all font-mono"
                />
              </div>
            </div>
          )}

          {/* Email address entry */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.edu"
                disabled={loading}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-none py-2.5 pl-10 pr-4 text-xs text-ink placeholder-slate-405 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cobalt focus:border-cobalt transition-all font-mono"
              />
            </div>
          </div>

          {/* Password entry */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                Password
              </label>
              {activeTab === 'login' && (
                <button
                  type="button"
                  onClick={() => alert('Mock password reset instructions dispatched.')}
                  className="text-[9px] font-mono uppercase tracking-widest text-cobalt hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-none py-2.5 pl-10 pr-10 text-xs text-ink placeholder-slate-405 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cobalt focus:border-cobalt transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Sign Up only) */}
          {activeTab === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-none py-2.5 pl-10 pr-10 text-xs text-ink placeholder-slate-405 dark:placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cobalt focus:border-cobalt transition-all font-mono"
                />
              </div>
            </div>
          )}

          {/* Remember me (Login only) */}
          {activeTab === 'login' && (
            <div className="flex items-center gap-2 mt-1 select-none font-mono text-[10px]">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3 w-3 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/10 rounded focus:ring-cobalt text-cobalt"
              />
              <label htmlFor="remember" className="text-slate-500 cursor-pointer">
                Keep terminal active (Remember Me)
              </label>
            </div>
          )}

          {/* Error Feedbacks */}
          {error && (
            <div className="flex items-start gap-2 border border-red-500/25 bg-red-500/5 p-3 text-[10px] font-mono text-red-500 mt-1">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Feedbacks */}
          {success && (
            <div className="flex items-start gap-2 border border-emerald-500/25 bg-emerald-500/5 p-3 text-[10px] font-mono text-emerald-500 mt-1 success-glow">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {/* Submit Actions */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 mt-2 text-xs font-mono uppercase tracking-widest text-white transition-all focus:outline-none focus:ring-1 focus:ring-cobalt rounded-none ${
              loading
                ? 'bg-cobalt/40 border border-cobalt/20 cursor-wait'
                : 'bg-cobalt border border-blue-600 hover:bg-blue-600 cursor-pointer active:translate-y-0.5'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>Resolving Node...</span>
              </span>
            ) : activeTab === 'login' ? (
              'Log In'
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Separator */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-white/10" />
          </div>
          <span className="relative px-3 bg-[#0c101a] text-[9px] font-mono uppercase tracking-widest text-slate-500">
            or
          </span>
        </div>

        {/* Social SSO Options */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleSocialLogin('Google')}
            disabled={loading}
            className="flex-1 flex items-center justify-center border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 py-2 text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-ink shadow-sm hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer rounded-none"
          >
            <svg className="h-3.5 w-3.5 mr-2 text-red-500" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.055 2.222 15.343 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.74-.08-1.3-.176-1.859H12.24z"/>
            </svg>
            Google
          </button>
          <button
            onClick={() => handleSocialLogin('GitHub')}
            disabled={loading}
            className="flex-1 flex items-center justify-center border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 py-2 text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-ink shadow-sm hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all cursor-pointer rounded-none"
          >
            <svg className="h-3.5 w-3.5 mr-2 text-ink" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            GitHub
          </button>
        </div>

        {/* Tab switcher link footer */}
        <div className="mt-8 text-center text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="hover:text-slate-900 dark:hover:text-ink cursor-pointer focus:outline-none transition-colors"
          >
            ← Cancel
          </button>
          
          {activeTab === 'login' ? (
            <p>
              New here?{' '}
              <button
                type="button"
                onClick={() => handleTabChange('signup')}
                className="text-cobalt hover:text-blue-600 font-bold focus:outline-none cursor-pointer"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Registered?{' '}
              <button
                type="button"
                onClick={() => handleTabChange('login')}
                className="text-cobalt hover:text-blue-600 font-bold focus:outline-none cursor-pointer"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};
