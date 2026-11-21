import React, { useState, useEffect } from 'react';
import { 
  Heart, MessageCircle, Repeat2, Send, Bookmark, MoreHorizontal, 
  Copy, Check, Edit3, Save, X, RefreshCw, Eye, ThumbsUp, 
  Sparkles, Image, Globe, Upload, Loader2, Music, CheckSquare 
} from 'lucide-react';
import { PostTone } from '../types';
import { AppLanguage, translations } from '../locales';

interface PlatformPreviewProps {
  drafts: {
    linkedin: { content: string; imageUrl?: string; imagePrompt: string };
    twitter: { content: string; imageUrl?: string; imagePrompt: string };
    instagram: { content: string; imageUrl?: string; imagePrompt: string };
    facebook: { content: string; imageUrl?: string; imagePrompt: string };
    tiktok: { content: string; imageUrl?: string; imagePrompt: string };
  };
  idea: string;
  tone: PostTone;
  currentLang: AppLanguage;
  customApiKey?: string;
  scheduledTimes?: { 
    linkedin?: string; 
    twitter?: string; 
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  isImageLoading: { 
    linkedin: boolean; 
    twitter: boolean; 
    instagram: boolean;
    facebook: boolean;
    tiktok: boolean;
  };
  onRegenerateImage: (platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok', prompt: string, aspectRatio: string) => void;
  onUpdateContent: (platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok', newContent: string) => void;
  onUpdateSchedule?: (platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok', datetimeString: string) => void;
  onUpdateImage?: (platform: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok', imageUrl: string) => void;
}

const TRANSLATION_LANGUAGES = [
  { code: 'English', label: 'English', flag: '🇺🇸' },
  { code: 'Spanish', label: 'Spanish / Español', flag: '🇪🇸' },
  { code: 'French', label: 'French / Français', flag: '🇫🇷' },
  { code: 'German', label: 'German / Deutsch', flag: '🇩🇪' },
  { code: 'Portuguese', label: 'Portuguese / Português', flag: '🇵🇹' },
  { code: 'Italian', label: 'Italian / Italiano', flag: '🇮🇹' },
  { code: 'Japanese', label: 'Japanese / 日本語', flag: '🇯🇵' },
  { code: 'Chinese', label: 'Chinese / 中文', flag: '🇨🇳' },
];

export default function PlatformPreview({
  drafts,
  idea,
  tone,
  currentLang,
  customApiKey,
  scheduledTimes,
  isImageLoading,
  onRegenerateImage,
  onUpdateContent,
  onUpdateSchedule,
  onUpdateImage
}: PlatformPreviewProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok'>('all');
  const t = translations[currentLang];

  const platformsList: {
    id: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok';
    name: string;
    badge: string;
    color: string;
    desc: string;
    aspectRatio: string;
    style: string;
    maxLength: number;
    actionsMock: string;
  }[] = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      badge: 'in',
      color: 'bg-[#0077b5] text-white',
      desc: 'B2B Professional • Aspect 4:3',
      aspectRatio: '4:3',
      style: 'aspect-[4/3]',
      maxLength: 3000,
      actionsMock: '👍 🏅 💡 42 • 16 shares'
    },
    {
      id: 'twitter',
      name: 'Twitter / X',
      badge: '𝕏',
      color: 'bg-black text-white border border-slate-800',
      desc: 'Punchy Newsfeed • Aspect 16:9',
      aspectRatio: '16:9',
      style: 'aspect-video',
      maxLength: 280,
      actionsMock: '💬 12 • 🔁 8 • ❤️ 84 • 👁️ 1.9k'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      badge: '📸',
      color: 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900',
      desc: 'Grid Showcase • Aspect 1:1',
      aspectRatio: '1:1',
      style: 'aspect-square',
      maxLength: 2200,
      actionsMock: '❤️ 112 likes • 18 comments'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      badge: 'Fb',
      color: 'bg-[#1877f2] text-white',
      desc: 'Friendly Group • Aspect 4:3',
      aspectRatio: '4:3',
      style: 'aspect-[4/3]',
      maxLength: 5000,
      actionsMock: '👍 85 reactions • 3 shares'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      badge: '🎵',
      color: 'bg-black text-white border border-slate-800',
      desc: 'Smart Audio & Scripts • Aspect 9:16',
      aspectRatio: '9:16',
      style: 'aspect-[9/16] max-h-[480px] mx-auto',
      maxLength: 2200,
      actionsMock: '❤️ 1.4k likes • 48 shares'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Tab Controls */}
      <div className="bg-slate-100 dark:bg-slate-850 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-1 shadow-inner select-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
 activeTab === 'all'
 ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
 : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
 }`}
        >
          🌎 {t.allFeeds}
        </button>
        {platformsList.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setActiveTab(platform.id)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
 activeTab === platform.id
 ? 'bg-white dark:bg-slate-950 text-slate-900 dark:text-white shadow-xs'
 : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
 }`}
          >
            <span>{platform.name}</span>
          </button>
        ))}
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {platformsList
          .filter((plat) => activeTab === 'all' || activeTab === plat.id)
          .map((plat) => {
            const draft = drafts[plat.id] || { content: '', imageUrl: '', imagePrompt: '' };
            const isPlatLoading = isImageLoading[plat.id];
            const platformScheduledTime = scheduledTimes?.[plat.id] || '';

            return (
              <PlatformCard
                key={plat.id}
                pId={plat.id}
                name={plat.name}
                badge={plat.badge}
                color={plat.color}
                desc={plat.desc}
                aspectRatio={plat.aspectRatio}
                imgStyle={plat.style}
                maxLength={plat.maxLength}
                actionsMock={plat.actionsMock}
                draft={draft}
                t={t}
                customApiKey={customApiKey}
                isPlatLoading={isPlatLoading}
                platformScheduledTime={platformScheduledTime}
                onRegenerateImage={onRegenerateImage}
                onUpdateContent={onUpdateContent}
                onUpdateSchedule={onUpdateSchedule}
                onUpdateImage={onUpdateImage}
              />
            );
          })}
      </div>
    </div>
  );
}

/* 
  Refactored PlatformCard Component for High Consistency, Premium Styling
*/
interface CardProps {
  key?: string;
  pId: 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'tiktok';
  name: string;
  badge: string;
  color: string;
  desc: string;
  aspectRatio: string;
  imgStyle: string;
  maxLength: number;
  actionsMock: string;
  draft: { content: string; imageUrl?: string; imagePrompt: string };
  t: any;
  customApiKey?: string;
  isPlatLoading: boolean;
  platformScheduledTime: string;
  onRegenerateImage: (p: any, pr: string, ar: string) => void;
  onUpdateContent: (p: any, c: string) => void;
  onUpdateSchedule?: (p: any, dt: string) => void;
  onUpdateImage?: (p: any, url: string) => void;
}

function PlatformCard({
  pId,
  name,
  badge,
  color,
  desc,
  aspectRatio,
  imgStyle,
  maxLength,
  actionsMock,
  draft,
  t,
  customApiKey,
  isPlatLoading,
  platformScheduledTime,
  onRegenerateImage,
  onUpdateContent,
  onUpdateSchedule,
  onUpdateImage
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  const [targetTransLang, setTargetTransLang] = useState('Spanish');
  const [isTranslating, setIsTranslating] = useState(false);
  const [artPrompt, setArtPrompt] = useState(draft.imagePrompt || '');

  useEffect(() => {
    setArtPrompt(draft.imagePrompt || '');
  }, [draft.imagePrompt]);

  const handleCopy = () => {
    navigator.clipboard.writeText(draft.content || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSaveEdit = () => {
    onUpdateContent(pId, editedText);
    setIsEditing(false);
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string' && onUpdateImage) {
        onUpdateImage(pId, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleTranslateClick = async () => {
    if (!draft.content) return;
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: draft.content, 
          targetLanguage: targetTransLang, 
          customApiKey: customApiKey 
        })
      });

      if (!response.ok) {
        throw new Error("Target translation api query met failure.");
      }

      const resData = await response.json();
      if (resData.translatedText) {
        onUpdateContent(pId, resData.translatedText);
      }
    } catch (err) {
      console.error("Trans err:", err);
      alert("AI translation did not respond. Check connection.");
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs flex flex-col justify-between transition-all select-none">
      
      {/* Core card banner header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-sm select-none shadow-xs`}>
            {badge}
          </div>
          <div>
            <h4 className="text-xs text-slate-800 dark:text-slate-200">{name}</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500">{desc}</p>
          </div>
        </div>
        <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Creative draft copy editing workspace */}
      <div className="px-4 pb-3 pt-4 flex-1 select-text">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <span className="text-xs text-slate-400">{t.editCopyTitle}</span>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full min-h-[140px] p-3 text-xs border border-slate-250 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-lg text-slate-800 dark:text-slate-100 leading-relaxed font-sans"
              maxLength={maxLength}
            />
            <div className="flex justify-between items-center text-xs px-1 text-slate-400">
              <span>{maxLength - editedText.length} characters left</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-2.5 py-1 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer"
                >
                  {t.cancelBtn}
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 rounded cursor-pointer"
                >
                  {t.saveBtn}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2 flex flex-col h-full justify-between">
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap select-text selection:bg-amber-100 dark:selection:bg-amber-950/40">
              {draft.content || `Drafting ${name} publication...`}
            </p>
            <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800 gap-1.5 mt-3">
              <button
                onClick={() => { setEditedText(draft.content); setIsEditing(true); }}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-all cursor-pointer"
                title={t.editCopyTitle}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopy}
                className="px-2.5 py-1 text-xs text-slate-600 dark:text-slate-350 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-150 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200/40 dark:border-slate-700/50 rounded-md transition-all cursor-pointer flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">{t.copiedBtn}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>{t.copyBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AI translation bar */}
      <div className="mx-4 mb-3.5 p-2 bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 rounded-xl flex items-center justify-between gap-1.5 select-none">
        <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
          <Globe className="w-3 h-3 text-amber-600" /> {t.aiTranslateLabel}
        </span>
        <div className="flex items-center gap-1.5">
          <select
            value={targetTransLang}
            onChange={(e) => setTargetTransLang(e.target.value)}
            className="px-2 py-0.5 text-xs bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded cursor-pointer"
          >
            {TRANSLATION_LANGUAGES.map((tl) => (
              <option key={tl.code} value={tl.code}>{tl.flag} {tl.label}</option>
            ))}
          </select>
          <button
            onClick={handleTranslateClick}
            disabled={isTranslating}
            className="px-2 py-0.5 text-xs bg-slate-950 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white text-white rounded transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            {isTranslating ? (
              <Loader2 className="w-2.5 h-2.5 animate-spin" />
            ) : t.aiTranslateBtn}
          </button>
        </div>
      </div>

      {/* Scheduling block */}
      <div className="mx-4 mb-4 p-3 bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col gap-2 select-none">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-450 dark:text-slate-400">
            📅 {t.schedulerTitle}
          </span>
          {platformScheduledTime ? (
            <span className="text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
              {t.scheduledBadge}
            </span>
          ) : (
            <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              {t.draftBadge}
            </span>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="datetime-local"
            value={platformScheduledTime}
            onChange={(e) => onUpdateSchedule?.(pId, e.target.value)}
            className="flex-1 px-2.5 py-1 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-lg text-slate-700 dark:text-slate-300 font-sans cursor-pointer"
          />
          {platformScheduledTime && (
            <button
              onClick={() => onUpdateSchedule?.(pId, '')}
              className="px-2 py-1 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/20 rounded transition-all cursor-pointer"
            >
              {t.clearTimeBtn}
            </button>
          )}
        </div>
      </div>

      {/* Unique tailoring canvas representation mapping accurate ratios */}
      <div className={`relative border-y border-slate-150 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 ${imgStyle} flex items-center justify-center overflow-hidden`}>
        {isPlatLoading ? (
          <div className="absolute inset-0 bg-slate-100/90 dark:bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center z-10">
            <div className="relative flex items-center justify-center mb-3">
              <div className="w-9 h-9 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-slate-900 dark:border-t-amber-400 animate-spin" />
              <Sparkles className="w-3.5 h-3.5 absolute text-amber-600" />
            </div>
            <span className="text-xs text-slate-700 dark:text-slate-350">{t.imageLoadingLabel}</span>
          </div>
        ) : draft.imageUrl ? (
          <>
            <img
              src={draft.imageUrl}
              alt={`${name} graphics`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover shadow-sm transition-transform duration-500"
            />
            {/* Overlay File Uploader */}
            <label className="absolute bottom-2.5 right-2.5 bg-slate-90o bg-slate-950/80 hover:bg-slate-950 text-white rounded-lg px-2.5 py-1.5 text-xs flex items-center gap-1 transition-all cursor-pointer border border-white/5">
              <Upload className="w-3 h-3" />
              <span>{t.uploadImageBtn}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLocalImageUpload}
                className="hidden"
              />
            </label>
          </>
        ) : (
          <div className="p-6 text-center flex flex-col items-center max-w-xs">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-slate-400 mb-2 border border-slate-200/50 dark:border-slate-700">
              <Image className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">{t.noImageYet}</p>
            
            <label className="mt-3 cursor-pointer inline-flex items-center gap-1.5 transition-all text-xs text-slate-800 dark:text-amber-400 bg-slate-200/50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
              <Upload className="w-3.5 h-3.5" />
              <span>{t.uploadPhotoBtn}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleLocalImageUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {/* Mock statistics footer */}
      <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-900/40 border-b border-slate-150 dark:border-slate-800 flex items-center text-xs text-slate-400 select-none">
        👍 ❤️ <span className="ml-1.5">{actionsMock}</span>
      </div>

      <div className="px-1 py-1 grid grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800 border-b border-slate-100 dark:border-slate-800 select-none">
        <button className="py-1 text-xs text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-md flex items-center justify-center gap-1 cursor-pointer">
          <ThumbsUp className="w-3 h-3" /> <span>Like</span>
        </button>
        <button className="py-1 text-xs text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-md flex items-center justify-center gap-1 cursor-pointer">
          <MessageCircle className="w-3 h-3" /> <span>{t.interactionsLikes}</span>
        </button>
        <button className="py-1 text-xs text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-md flex items-center justify-center gap-1 cursor-pointer">
          <Repeat2 className="w-3 h-3" /> <span>{t.interactionsComments}</span>
        </button>
        <button className="py-1 text-xs text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-md flex items-center justify-center gap-1 cursor-pointer">
          <Send className="w-3 h-3" /> <span>Send</span>
        </button>
      </div>

      {/* Visual art directive prompt tweaking */}
      <div className="p-4 bg-slate-50/40 dark:bg-slate-850/20 select-none">
        <label className="block text-xs text-slate-400 mb-1.5">
          🎨 {t.artPromptLabel}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={artPrompt}
            onChange={(e) => setArtPrompt(e.target.value)}
            className="flex-1 px-2.5 py-1.5 bg-white dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-lg text-slate-700 dark:text-slate-200"
            placeholder={t.artPromptPlaceholder}
          />
          <button
            onClick={() => onRegenerateImage(pId, artPrompt, aspectRatio)}
            disabled={isPlatLoading}
            className="p-1.5 bg-slate-900 hover:bg-slate-900 dark:bg-slate-100 hover:dark:bg-white text-white dark:text-slate-950 rounded-lg cursor-pointer flex items-center justify-center transition-colors disabled:opacity-50"
            title={t.regenerateImageBtn}
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
