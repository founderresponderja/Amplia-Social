import React, { useState } from 'react';
import { Sun, Moon, Shield, LogOut, Layout, Globe, ChevronDown } from 'lucide-react';
import { AppLanguage, translations } from '../locales';
import { RessoaSymbol } from './RessoaLogo';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  currentLang: AppLanguage;
  onSelectLang: (lang: AppLanguage) => void;
  userEmail: string | null;
  currentView: 'dashboard' | 'profile';
  onNavigate: (view: 'dashboard' | 'profile') => void;
  onLogout: () => void;
}

export default function Header({
  isDark,
  onToggleTheme,
  currentLang,
  onSelectLang,
  userEmail,
  currentView,
  onNavigate,
  onLogout,
}: HeaderProps) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[currentLang];

  const languages: { code: AppLanguage; label: string; flag: string }[] = [
    { code: 'pt-PT', label: 'Português (EU)', flag: 'PT' },
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'es', label: 'Español', flag: 'ES' },
  ];

  const currentLanguageObj = languages.find((lang) => lang.code === currentLang) || languages[1];

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-40 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div
          onClick={() => { if (userEmail) onNavigate('dashboard'); }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <RessoaSymbol className="w-9 h-9 text-slate-900 dark:text-slate-100" />
          <div>
            <span className="block text-lg leading-tight text-slate-900 dark:text-white">{t.appName}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">by amplia</span>
          </div>
        </div>

        {/* Global Action Tools */}
        <div className="flex items-center space-x-2">
          
          {userEmail && (
            <>
              {/* Dashboard vs Profile navigation toggles */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl items-center border border-slate-200/50 dark:border-slate-700/50">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
 currentView === 'dashboard'
 ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
 : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-slate-250'
 }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.dashboardButton}</span>
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
 currentView === 'profile'
 ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
 : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-slate-250'
 }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.profileButton}</span>
                </button>
              </div>

              {/* Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-xs cursor-pointer flex items-center gap-1 text-xs"
                >
                  <span className="text-xs select-none">{currentLanguageObj.flag}</span>
                  <span className="hidden md:inline">{currentLanguageObj.label}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {langDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setLangDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl z-40 py-1.5 outline-none">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onSelectLang(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
 currentLang === lang.code 
 ? 'text-amber-600 dark:text-amber-400 bg-amber-500/5'
 : 'text-slate-700 dark:text-slate-300'
 }`}
                        >
                          <span className="text-xs w-5 select-none">{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {/* Theme Toggle Mode Button */}
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-xs cursor-pointer flex items-center justify-center"
            title={t.themeToggle}
            aria-label="Theme Toggle Indicator"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-600 fill-amber-600/10" />
            ) : (
              <Moon className="w-4 h-4 text-slate-750" />
            )}
          </button>

          {userEmail && (
            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 transition-all shadow-xs cursor-pointer flex items-center justify-center"
              title={t.logoutButton}
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}

        </div>
        
      </div>
    </header>
  );
}
