import React from 'react';
import { Trash2, Calendar, Layout, ChevronRight, Bookmark } from 'lucide-react';
import { SavedDraft } from '../types';
import { AppLanguage, translations } from '../locales';

interface HistorySidebarProps {
  drafts: SavedDraft[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  currentLang: AppLanguage;
}

export default function HistorySidebar({
  drafts,
  activeId,
  onSelect,
  onDelete,
  onClearAll,
  currentLang
}: HistorySidebarProps) {
  const t = translations[currentLang];

  const handleClearClick = () => {
    if (confirm(t.confirmClearAll)) {
      onClearAll();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col h-full min-h-[400px] transition-all">
      
      {/* Sidebar header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-4 h-4 text-amber-600" />
          <h3 className="text-slate-850 dark:text-slate-100 text-xs">
            {t.sidebarTitle}
          </h3>
        </div>
        {drafts.length > 0 && (
          <button
            onClick={handleClearClick}
            className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 hover:bg-rose-100/60 dark:hover:bg-rose-900/40 px-2.5 py-1 rounded-md transition-all cursor-pointer"
          >
            {t.clearAllBtn}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-2.5 max-h-[500px] md:max-h-[600px]">
        {drafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-850 text-slate-400 dark:text-slate-550 rounded-full mb-3 border border-slate-100 dark:border-slate-800">
              <Layout className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-xs text-slate-800 dark:text-slate-300">{t.emptyHistory}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-[180px] leading-normal">
              {t.sidebarDesc}
            </p>
          </div>
        ) : (
          drafts.map((draft) => {
            const date = new Date(draft.createdAt);
            const formattedDate = date.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            const isActive = activeId === draft.id;

            return (
              <div
                key={draft.id}
                onClick={() => onSelect(draft.id)}
                className={`group p-3 rounded-xl border transition-all duration-150 flex items-start justify-between cursor-pointer ${
 isActive
 ? 'border-amber-500 bg-amber-500/5 shadow-xs'
 : 'border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-900 hover:border-slate-200 dark:hover:border-slate-750 hover:bg-slate-50/50 dark:hover:bg-slate-850/40'
 }`}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-1 mb-1.5">
                    <span className="text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-sans">
                      {draft.tone}
                    </span>
                    <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-850 px-1.5 py-0.5 rounded font-sans border border-slate-200/50 dark:border-slate-700/50">
                      🌐 {draft.language || 'English'}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 select-none">
                      <Calendar className="w-2.5 h-2.5" />
                      {formattedDate}
                    </span>
                  </div>
                  
                  <h4 className="text-xs text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed mb-1.5">
                    {draft.idea}
                  </h4>

                  {/* Calendar Badging for All 5 Platforms */}
                  {draft.scheduledTimes && (
                    draft.scheduledTimes.linkedin || 
                    draft.scheduledTimes.twitter || 
                    draft.scheduledTimes.instagram ||
                    draft.scheduledTimes.facebook ||
                    draft.scheduledTimes.tiktok
                  ) ? (
                    <div className="flex flex-wrap items-center gap-1 mt-1.5 bg-slate-50 dark:bg-slate-950/40 p-1 rounded-lg border border-slate-100 dark:border-slate-850">
                      <span className="inline-flex items-center gap-1 text-[8px] text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {t.scheduledBadge}
                      </span>
                      {draft.scheduledTimes.linkedin && (
                        <span className="text-[8px] px-1 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded border border-blue-100/50 dark:border-blue-900/50">Li</span>
                      )}
                      {draft.scheduledTimes.twitter && (
                        <span className="text-[8px] px-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 rounded border border-slate-200/30 dark:border-slate-700/30">𝕏</span>
                      )}
                      {draft.scheduledTimes.instagram && (
                        <span className="text-[8px] px-1 bg-pink-50 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400 rounded border border-pink-100/50 dark:border-pink-900/50">Ig</span>
                      )}
                      {draft.scheduledTimes.facebook && (
                        <span className="text-[8px] px-1 bg-indigo-50 dark:bg-indigo-950/50 text-slate-650 dark:text-indigo-400 rounded border border-indigo-100/50 dark:border-indigo-900/50">Fb</span>
                      )}
                      {draft.scheduledTimes.tiktok && (
                        <span className="text-[8px] px-1 bg-teal-50 dark:bg-teal-950/50 text-teal-650 dark:text-teal-400 rounded border border-teal-100/50 dark:border-teal-900/50">Tt</span>
                      )}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center space-x-1 self-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(draft.id);
                    }}
                    className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                    title="Delete saved kit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ChevronRight className={`w-4 h-4 text-slate-400 dark:text-slate-600 transition-transform ${isActive ? 'rotate-90 text-amber-600' : ''}`} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
