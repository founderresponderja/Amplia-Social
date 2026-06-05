import React, { useState } from 'react';
import { Sun, Moon, Shield, LogOut, Layout, Globe, ChevronDown } from 'lucide-react';
import { AppLanguage, translations } from '../locales';

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
    { code: 'pt-PT', label: 'Português (EU)', flag: '🇵🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguageObj = languages.find((lang) => lang.code === currentLang) || languages[1];

  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sticky top-0 z-40 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Humble, Crafted Nano Banana Logo */}
        <div 
          onClick={() => { if (userEmail) onNavigate('dashboard'); }} 
          className="flex items-center space-x-2.5 group cursor-pointer"
        >
          <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105">
            {/* Elegant premium minimalist banana logo */}
            <svg 
              className="w-5 h-5 text-slate-950 fill-slate-950" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M 5,16 C 8,20 15,20 19,14 C 21,11 21,8 20.5,5 C 20.5,4.5 19.8,4.5 19.5,5 C 18.2,7.2 16.2,9.2 13.2,10.2 C 10.2,11.2 7,10.8 4.5,8.5 C 4,8 3.5,8.5 3.7,9 C 4,11.5 4.3,14 5,16 Z" />
              <circle cx="21" cy="3.5" r="1.2" className="fill-slate-950" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-sm sm:text-base text-slate-905 dark:text-white tracking-tight">
                {t.appName}
              </span>
            </div>
            <p className="text-[10px] text-slate-450 dark:text-slate-500 font-medium tracking-normal mt-[-2px]">
              {t.appSubtitle}
            </p>
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
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'dashboard'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-slate-250'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{t.dashboardButton}</span>
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentView === 'profile'
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
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
                  className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-xs cursor-pointer flex items-center gap-1 text-xs font-medium"
                >
                  <span className="text-sm select-none">{currentLanguageObj.flag}</span>
                  <span className="hidden md:inline">{currentLanguageObj.label}</span>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {langDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setLangDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-40 py-1.5 outline-none">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onSelectLang(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                            currentLang === lang.code 
                              ? 'text-amber-600 dark:text-amber-400 font-bold bg-amber-500/5'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="text-sm select-none">{lang.flag}</span>
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
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/10" />
            ) : (
              <Moon className="w-4 h-4 text-slate-750" />
            )}
          </button>

          {userEmail && (
            <button
              onClick={onLogout}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-955 transition-all shadow-xs cursor-pointer flex items-center justify-center"
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
