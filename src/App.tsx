import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ComposerPanel from './components/ComposerPanel';
import PlatformPreview from './components/PlatformPreview';
import HistorySidebar from './components/HistorySidebar';
import LoginPanel from './components/LoginPanel';
import ProfilePanel from './components/ProfilePanel';
import { SavedDraft, PostTone } from './types';
import { translations, AppLanguage } from './locales';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DRAFTS_STORAGE_KEY = 'nano_banana_content_bundles_v3';
const THEME_STORAGE_KEY = 'nano_banana_theme_dark';
const LANG_STORAGE_KEY = 'nano_banana_ui_language';
const AUTH_STORAGE_KEY = 'nano_banana_user_authenticated';
const EMAIL_STORAGE_KEY = 'nano_banana_user_email';
const SECRETS_STORAGE_KEY = 'nano_banana_profiles_secrets';

export default function App() {
  const [drafts, setDrafts] = useState<SavedDraft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);

  // 1. Language State
  const [currentLang, setCurrentLang] = useState<AppLanguage>(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === 'pt-PT' || stored === 'en' || stored === 'es') {
        return stored;
      }
    } catch {}
    return 'en';
  });

  // Save language to storage
  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    } catch {}
  }, [currentLang]);

  const t = translations[currentLang];

  // 2. Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem(EMAIL_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  // 3. Profiles and API Secrets Config State
  const [credentials, setCredentials] = useState<Record<string, any>>(() => {
    try {
      const stored = localStorage.getItem(SECRETS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // 4. View routing
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');

  // 5. Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored === 'true';
    } catch {
      return false;
    }
  });

  // Apply dark class to document element
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, String(isDark));
      document.documentElement.classList.toggle('dark', isDark);
    } catch (e) {
      console.error("Theme storage fail:", e);
    }
  }, [isDark]);

  // Loading & error trackers
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImages, setIsGeneratingImages] = useState({
    linkedin: false,
    twitter: false,
    instagram: false,
    facebook: false,
    tiktok: false
  });
  
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initialize/retrieve history from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFTS_STORAGE_KEY);
      if (stored) {
        const parsed: SavedDraft[] = JSON.parse(stored);
        setDrafts(parsed);
        if (parsed.length > 0) {
          setActiveDraftId(parsed[0].id);
        }
      }
    } catch (err) {
      console.error("Local storage read error in History:", err);
    }
  }, []);

  // Update lists and save
  const saveDraftsList = (updatedList: SavedDraft[]) => {
    setDrafts(updatedList);
    try {
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(updatedList));
    } catch (err) {
      console.error("Local drafts storage save error:", err);
    }
  };

  const activeDraft = drafts.find((d) => d.id === activeDraftId) || null;

  // Handles Login trigger
  const handleLoginSuccess = (email: string) => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
      localStorage.setItem(EMAIL_STORAGE_KEY, email);
    } catch {}
    setIsAuthenticated(true);
    setUserEmail(email);
    setSuccessMessage(t.loginSuccess);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Handles Logout
  const handleLogout = () => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(EMAIL_STORAGE_KEY);
    } catch {}
    setIsAuthenticated(false);
    setUserEmail(null);
    setCurrentView('dashboard');
  };

  // Handles Profile settings submit
  const handleSaveCredentials = (savedCreds: Record<string, any>) => {
    setCredentials(savedCreds);
    try {
      localStorage.setItem(SECRETS_STORAGE_KEY, JSON.stringify(savedCreds));
    } catch (e) {
      console.error("Failed storing profile keys", e);
    }
  };

  // Single-channel Visual Creator Helper (Backend proxy calls with client custom API keys)
  const generatePlatformVisual = async (
    draftId: string,
    platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok',
    prompt: string,
    aspectRatio: string
  ) => {
    setIsGeneratingImages((prev) => ({ ...prev, [platform]: true }));
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          aspectRatio, 
          customApiKey: credentials.geminiApiKey 
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Generation limit met or invalid API key.");
      }

      const data = await response.json();
      
      // Update image url for this active draft
      setDrafts((prevList) => {
        const updated = prevList.map((d) => {
          if (d.id === draftId) {
            return {
              ...d,
              posts: {
                ...d.posts,
                [platform]: {
                  ...(d.posts[platform] || { content: '', imagePrompt: '' }),
                  imageUrl: data.imageUrl
                }
              }
            };
          }
          return d;
        });
        
        try {
          localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    } catch (err: any) {
      console.error(`Error generating visual for ${platform}:`, err);
      setGlobalError(`Image failure for ${platform}: ${err.message || "Gemini endpoint error."}`);
      setTimeout(() => setGlobalError(null), 7000);
    } finally {
      setIsGeneratingImages((prev) => ({ ...prev, [platform]: false }));
    }
  };

  // Generate complete bundle handler (incorporating potential customer-supplied secrets)
  const handleGenerateBundle = async (idea: string, tone: PostTone, language: string) => {
    setGlobalError(null);
    setSuccessMessage(null);
    setIsGeneratingText(true);

    try {
      const response = await fetch('/api/generate-drafts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          idea, 
          tone, 
          language, 
          customApiKey: credentials.geminiApiKey 
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Server error compiling draft copies.");
      }

      const result = await response.json();

      // Create new saved bundle item with immediate texts
      const newDraftId = Date.now().toString();
      const newBundle: SavedDraft = {
        id: newDraftId,
        idea,
        tone,
        language,
        createdAt: new Date().toISOString(),
        scheduledTimes: {
          linkedin: '',
          twitter: '',
          instagram: '',
          facebook: '',
          tiktok: ''
        },
        posts: {
          linkedin: {
            content: result.linkedin.content,
            imagePrompt: result.linkedin.imagePrompt
          },
          twitter: {
            content: result.twitter.content,
            imagePrompt: result.twitter.imagePrompt
          },
          instagram: {
            content: result.instagram.content,
            imagePrompt: result.instagram.imagePrompt
          },
          facebook: {
            content: result.facebook?.content || result.facebook || '',
            imagePrompt: result.facebook?.imagePrompt || ''
          },
          tiktok: {
            content: result.tiktok?.content || result.tiktok || '',
            imagePrompt: result.tiktok?.imagePrompt || ''
          }
        }
      };

      const revisedList = [newBundle, ...drafts];
      saveDraftsList(revisedList);
      setActiveDraftId(newDraftId);
      setSuccessMessage(`Kit drafted! Generating visuals tailored for aspects...`);

      // Fire independent image operations instantly in parallel
      generatePlatformVisual(newDraftId, 'linkedin', result.linkedin.imagePrompt, '4:3');
      generatePlatformVisual(newDraftId, 'twitter', result.twitter.imagePrompt, '16:9');
      generatePlatformVisual(newDraftId, 'instagram', result.instagram.imagePrompt, '1:1');
      generatePlatformVisual(newDraftId, 'facebook', result.facebook?.imagePrompt || '', '4:3');
      generatePlatformVisual(newDraftId, 'tiktok', result.tiktok?.imagePrompt || '', '9:16');

      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      console.error("Bundle compilation error:", err);
      setGlobalError(err.message || "Failed. Try checking API configurations.");
    } finally {
      setIsGeneratingText(false);
    }
  };

  // Regeneration of single platform visual
  const handleRegenerateImage = async (
    platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok',
    customPrompt: string,
    aspectRatio: string
  ) => {
    if (!activeDraftId) return;
    
    // Update target draft prompts details first
    setDrafts((prevList) => {
      const updated = prevList.map((d) => {
        if (d.id === activeDraftId) {
          return {
            ...d,
            posts: {
              ...d.posts,
              [platform]: {
                ...(d.posts[platform] || { content: '', imagePrompt: '' }),
                imagePrompt: customPrompt
              }
            }
          };
        }
        return d;
      });
      localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    setGlobalError(null);
    await generatePlatformVisual(activeDraftId, platform, customPrompt, aspectRatio);
  };

  const handleUpdateContent = (
    platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok',
    newContent: string
  ) => {
    if (!activeDraftId) return;

    const revised = drafts.map((d) => {
      if (d.id === activeDraftId) {
        return {
          ...d,
          posts: {
            ...d.posts,
            [platform]: {
              ...(d.posts[platform] || { content: '', imagePrompt: '' }),
              content: newContent
            }
          }
        };
      }
      return d;
    });
    saveDraftsList(revised);
  };

  const handleUpdateImage = (
    platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok',
    imageUrl: string
  ) => {
    if (!activeDraftId) return;

    const revised = drafts.map((d) => {
      if (d.id === activeDraftId) {
        return {
          ...d,
          posts: {
            ...d.posts,
            [platform]: {
              ...(d.posts[platform] || { content: '', imagePrompt: '' }),
              imageUrl: imageUrl
            }
          }
        };
      }
      return d;
    });
    saveDraftsList(revised);
  };

  const handleUpdateSchedule = (
    platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok',
    datetimeString: string
  ) => {
    if (!activeDraftId) return;

    const revised = drafts.map((d) => {
      if (d.id === activeDraftId) {
        return {
          ...d,
          scheduledTimes: {
            ...(d.scheduledTimes || { linkedin: '', twitter: '', instagram: '', facebook: '', tiktok: '' }),
            [platform]: datetimeString
          }
        };
      }
      return d;
    });
    saveDraftsList(revised);
  };

  const handleDeleteDraft = (id: string) => {
    const revised = drafts.filter((d) => d.id !== id);
    saveDraftsList(revised);
    
    if (activeDraftId === id) {
      setActiveDraftId(revised.length > 0 ? revised[0].id : null);
    }
  };

  const handleClearAll = () => {
    saveDraftsList([]);
    setActiveDraftId(null);
  };

  const safeActiveDraftPosts = activeDraft ? {
    linkedin: activeDraft.posts.linkedin || { content: '', imagePrompt: '' },
    twitter: activeDraft.posts.twitter || { content: '', imagePrompt: '' },
    instagram: activeDraft.posts.instagram || { content: '', imagePrompt: '' },
    facebook: activeDraft.posts.facebook || { content: '', imagePrompt: '' },
    tiktok: activeDraft.posts.tiktok || { content: '', imagePrompt: '' }
  } : null;

  const safeActiveDraftScheduled = activeDraft ? {
    linkedin: activeDraft.scheduledTimes?.linkedin || '',
    twitter: activeDraft.scheduledTimes?.twitter || '',
    instagram: activeDraft.scheduledTimes?.instagram || '',
    facebook: activeDraft.scheduledTimes?.facebook || '',
    tiktok: activeDraft.scheduledTimes?.tiktok || ''
  } : undefined;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-250 ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50/40 text-slate-900'}`}>
      
      {/* 1. Header controls (Language dropdown + Theme toggle + Navigation + Logouts) */}
      <Header 
        isDark={isDark} 
        onToggleTheme={() => setIsDark(!isDark)} 
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        userEmail={userEmail}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-6">
        
        {/* Alerts & Notifications */}
        <AnimatePresence>
          {globalError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-250 p-4 rounded-xl flex items-start gap-3 shadow-xs"
            >
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-450 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs uppercase tracking-wider">{t.systemUpdate}</span>
                <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5">{globalError}</p>
              </div>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-250 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-205 p-4 rounded-xl flex items-start gap-3 shadow-xs"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-xs uppercase tracking-wider">{t.successTitle}</span>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">{successMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. Authentication Gate: If not authenticated, render Login Workspace */}
        {!isAuthenticated ? (
          <LoginPanel 
            t={t} 
            onLoginSuccess={handleLoginSuccess} 
          />
        ) : (
          /* 3. Render Dashboard View or Profile Credentials view */
          currentView === 'profile' ? (
            <ProfilePanel 
              t={t}
              credentials={credentials}
              onSave={handleSaveCredentials}
              onNavigate={setCurrentView}
            />
          ) : (
            /* Main compose interface */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Sidebar: Bundle history */}
              <div className="lg:col-span-1">
                <HistorySidebar
                  drafts={drafts}
                  activeId={activeDraftId}
                  onSelect={setActiveDraftId}
                  onDelete={handleDeleteDraft}
                  onClearAll={handleClearAll}
                  currentLang={currentLang}
                />
              </div>

              {/* Central draft space */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                
                {/* Composer Panel */}
                <ComposerPanel
                  onGenerate={handleGenerateBundle}
                  isLoading={isGeneratingText}
                  currentLang={currentLang}
                />

                {/* Previews feed section */}
                {activeDraft && safeActiveDraftPosts ? (
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col gap-4">
                    <div>
                      <h3 className="text-sm font-display font-black text-slate-850 dark:text-slate-100 uppercase tracking-wider">
                        📂 {t.previewTitle}
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 max-w-2xl truncate font-semibold">
                        {t.basedOnIdea} "{activeDraft.idea}"
                      </p>
                    </div>

                    <PlatformPreview
                      drafts={safeActiveDraftPosts}
                      idea={activeDraft.idea}
                      tone={activeDraft.tone}
                      currentLang={currentLang}
                      customApiKey={credentials.geminiApiKey}
                      scheduledTimes={safeActiveDraftScheduled}
                      isImageLoading={isGeneratingImages}
                      onRegenerateImage={handleRegenerateImage}
                      onUpdateContent={handleUpdateContent}
                      onUpdateSchedule={handleUpdateSchedule}
                      onUpdateImage={handleUpdateImage}
                    />
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 py-16 px-6 text-center shadow-xs flex flex-col items-center">
                    <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-full text-slate-400 mb-4 border border-slate-100 dark:border-slate-800">
                      <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
                    </div>
                    <h3 className="font-display font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wider">
                      {currentLang === 'pt-PT' ? 'Pronto para criar?' : currentLang === 'es' ? '¿Listo para crear?' : 'Ready to compile?'}
                    </h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 max-w-sm leading-relaxed font-medium">
                      {currentLang === 'pt-PT' 
                        ? 'Escreva um conceito central ou tema acima para rascunhar instantaneamente publicações e imagens em múltiplos canais!'
                        : currentLang === 'es'
                        ? '¡Introduzca un tema o idea breve en el editor superior para componer contenido gráfico automático en 5 canales!'
                        : 'Enter any brief concept on the Composer above to draft beautiful promotional copies and aspect-ratio visual art across 5 networks!'}
                    </p>
                  </div>
                )}

              </div>

            </div>
          )
        )}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-850 bg-white dark:bg-slate-900 py-6 mt-12 select-none transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-xs text-slate-400 dark:text-slate-505 font-medium flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Social Content Generator • Swiss Multi-Channel Social Suite</p>
          <p className="lowercase">{t.appName} // portugal • english • españa</p>
        </div>
      </footer>
    </div>
  );
}
