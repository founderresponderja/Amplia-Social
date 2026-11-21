import React, { useState } from 'react';
import { 
  Shield, Key, Link2, Eye, EyeOff, Save, ArrowLeft, 
  Linkedin, Twitter, Instagram, Facebook, Video, AlertCircle 
} from 'lucide-react';
import { TranslationSchema } from '../locales';

interface ProfilePanelProps {
  t: TranslationSchema;
  credentials: Record<string, any>;
  onSave: (creds: Record<string, any>) => void;
  onNavigate: (view: 'dashboard' | 'profile') => void;
}

export default function ProfilePanel({ t, credentials, onSave, onNavigate }: ProfilePanelProps) {
  const [linkedinUser, setLinkedinUser] = useState(credentials.linkedinUser || '');
  const [linkedinPass, setLinkedinPass] = useState(credentials.linkedinPass || '');
  
  const [twitterUser, setTwitterUser] = useState(credentials.twitterUser || '');
  const [twitterPass, setTwitterPass] = useState(credentials.twitterPass || '');
  
  const [instagramUser, setInstagramUser] = useState(credentials.instagramUser || '');
  const [instagramPass, setInstagramPass] = useState(credentials.instagramPass || '');
  
  const [facebookUser, setFacebookUser] = useState(credentials.facebookUser || '');
  const [facebookPass, setFacebookPass] = useState(credentials.facebookPass || '');
  
  const [tiktokUser, setTiktokUser] = useState(credentials.tiktokUser || '');
  const [tiktokPass, setTiktokPass] = useState(credentials.tiktokPass || '');

  const [geminiApiKey, setGeminiApiKey] = useState(credentials.geminiApiKey || '');

  const [showPass, setShowPass] = useState<Record<string, boolean>>({});
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const toggleShowPass = (keys: string) => {
    setShowPass(prev => ({ ...prev, [keys]: !prev[keys] }));
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      linkedinUser,
      linkedinPass,
      twitterUser,
      twitterPass,
      instagramUser,
      instagramPass,
      facebookUser,
      facebookPass,
      tiktokUser,
      tiktokPass,
      geminiApiKey
    });
    setStatusMsg(t.saveSuccess);
    setTimeout(() => {
      setStatusMsg(null);
    }, 4000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-xs max-w-4xl mx-auto transition-all">
      
      {/* Back nav & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg text-slate-900 dark:text-slate-100">
              {t.profileTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.profileSubtitle}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('dashboard')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white bg-slate-100 dark:bg-slate-850 hover:bg-slate-150 rounded-lg transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.backToDashboard}</span>
        </button>
      </div>

      {statusMsg && (
        <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded-xl text-xs flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{statusMsg}</span>
        </div>
      )}

      <form onSubmit={handleSaveSubmit} className="space-y-8">
        
        {/* Section 1: Social Accounts and Local passwords */}
        <div>
          <h3 className="text-xs text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1">
            <Link2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{t.sectionAccounts}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-450 mb-4 leading-relaxed">
            {t.sectionAccountsDesc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* LinkedIn row */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded bg-[#0274b3] text-white flex items-center justify-center">
                  <Linkedin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs text-slate-800 dark:text-slate-200">LinkedIn</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                <input
                  type="text"
                  value={linkedinUser}
                  onChange={(e) => setLinkedinUser(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
                <div className="relative">
                  <input
                    type={showPass['linkedin'] ? 'text' : 'password'}
                    value={linkedinPass}
                    onChange={(e) => setLinkedinPass(e.target.value)}
                    placeholder={t.fieldChannelPassword}
                    className="w-full pl-3 pr-9 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPass('linkedin')}
                    className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPass['linkedin'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Twitter row */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center border border-slate-850">
                  <Twitter className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs text-slate-800 dark:text-slate-200">Twitter / X</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                <input
                  type="text"
                  value={twitterUser}
                  onChange={(e) => setTwitterUser(e.target.value)}
                  placeholder="@username"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
                <div className="relative">
                  <input
                    type={showPass['twitter'] ? 'text' : 'password'}
                    value={twitterPass}
                    onChange={(e) => setTwitterPass(e.target.value)}
                    placeholder={t.fieldChannelPassword}
                    className="w-full pl-3 pr-9 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPass('twitter')}
                    className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPass['twitter'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Instagram row */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs text-slate-800 dark:text-slate-200">Instagram</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                <input
                  type="text"
                  value={instagramUser}
                  onChange={(e) => setInstagramUser(e.target.value)}
                  placeholder="@insta_account"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
                <div className="relative">
                  <input
                    type={showPass['instagram'] ? 'text' : 'password'}
                    value={instagramPass}
                    onChange={(e) => setInstagramPass(e.target.value)}
                    placeholder={t.fieldChannelPassword}
                    className="w-full pl-3 pr-9 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPass('instagram')}
                    className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPass['instagram'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Facebook row */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded bg-[#3c5998] text-white flex items-center justify-center">
                  <Facebook className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs text-slate-800 dark:text-slate-200">Facebook</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                <input
                  type="text"
                  value={facebookUser}
                  onChange={(e) => setFacebookUser(e.target.value)}
                  placeholder="https://facebook.com/mybrand"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
                <div className="relative">
                  <input
                    type={showPass['facebook'] ? 'text' : 'password'}
                    value={facebookPass}
                    onChange={(e) => setFacebookPass(e.target.value)}
                    placeholder={t.fieldChannelPassword}
                    className="w-full pl-3 pr-9 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPass('facebook')}
                    className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPass['facebook'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* TikTok Row */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col gap-3 md:col-span-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded bg-[#010101] text-white flex items-center justify-center border border-slate-800">
                  <Video className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs text-slate-800 dark:text-slate-200">TikTok</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={tiktokUser}
                  onChange={(e) => setTiktokUser(e.target.value)}
                  placeholder="@tiktok_creator"
                  className="w-full px-3 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
                <div className="relative">
                  <input
                    type={showPass['tiktok'] ? 'text' : 'password'}
                    value={tiktokPass}
                    onChange={(e) => setTiktokPass(e.target.value)}
                    placeholder={t.fieldChannelPassword}
                    className="w-full pl-3 pr-9 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowPass('tiktok')}
                    className="absolute right-2.5 top-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPass['tiktok'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Platform API credentials (Gemini Option) */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs text-slate-400 dark:text-slate-500 mb-2.5 flex items-center gap-1">
            <Key className="w-3.5 h-3.5 text-slate-550" />
            <span>{t.sectionApiKeys}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-450 mb-4 leading-relaxed">
            {t.sectionApiKeysDesc}
          </p>

          <div className="p-4 bg-slate-50 dark:bg-slate-850/40 border border-slate-150 dark:border-slate-800 rounded-xl space-y-3">
            <div>
              <label className="block text-xs text-slate-700 dark:text-slate-300 mb-1.5">
                {t.geminiKeyLabel}
              </label>
              <div className="relative">
                <input
                  type={showPass['gemini'] ? 'text' : 'password'}
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  placeholder={t.geminiKeyPlaceholder}
                  className="w-full pl-3 pr-10 py-2 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200"
                />
                <button
                  type="button"
                  onClick={() => toggleShowPass('gemini')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPass['gemini'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-[10.5px] text-slate-400 dark:text-slate-500 leading-normal">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-500/80" />
              <span>{t.customGeminiDesc}</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="px-5 py-2.5 text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
          >
            {t.backToDashboard}
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5 text-slate-950" />
            <span>{t.saveProfileBtn}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
