import React, { useState } from 'react';
import { ShieldAlert, LogIn, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { TranslationSchema } from '../locales';
import { RessoaSymbol } from './RessoaLogo';

interface LoginPanelProps {
  t: TranslationSchema;
  onLoginSuccess: (email: string) => void;
}

export default function LoginPanel({ t, onLoginSuccess }: LoginPanelProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg(t.loginError);
      return;
    }

    // Standard demo credentials or any email/pass bypasses for smooth review
    if (password.length >= 4) {
      onLoginSuccess(email);
    } else {
      setErrorMsg(t.loginError + " (Requires password length >= 4)");
    }
  };

  const handleDemoBypass = () => {
    onLoginSuccess('demo@nanobanana.com');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 select-none">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-xs transition-all relative">
        
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <RessoaSymbol className="w-16 h-16 mb-4 text-slate-900 dark:text-slate-100" />
          <h1 className="text-3xl text-slate-900 dark:text-white">
            {t.appName}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.appSubtitle}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-200 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-slate-550 dark:text-slate-400 mb-1.5">
              {t.emailLabel}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 focus:bg-white text-xs border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-sans"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-550 dark:text-slate-400 mb-1.5">
              {t.passwordLabel}
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100/50 dark:hover:bg-slate-800/50 focus:bg-white text-xs border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all font-sans"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-950 text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            <span>{t.signInBtn}</span>
          </button>
        </form>

        <div className="relative flex py-3 items-center select-none mt-6">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="flex-shrink mx-3 text-xs text-slate-400">or</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Bypass Access Demo Button */}
        <button
          type="button"
          onClick={handleDemoBypass}
          className="w-full py-3 px-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-amber-500/20"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{t.demoAccessBtn}</span>
        </button>

        {/* Secure local note warning */}
        <div className="mt-6 flex items-start gap-2 text-xs text-slate-400 dark:text-slate-500 leading-normal">
          <HelpCircle className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <p>{t.guestWarning}</p>
        </div>

      </div>
    </div>
  );
}
