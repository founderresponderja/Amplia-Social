import React, { useState } from 'react';
import { Sparkles, Zap, Loader2, Globe, FileText } from 'lucide-react';
import { PostTone } from '../types';
import { AppLanguage, translations } from '../locales';

interface ComposerPanelProps {
  onGenerate: (idea: string, tone: PostTone, language: string) => void;
  isLoading: boolean;
  currentLang: AppLanguage;
}

const SAMPLE_TEMPLATES = {
  'pt-PT': [
    {
      label: "🚀 Lançamento de Produto",
      text: "Apresentamos a Helium: uma garrafa térmica inteligente que higieniza o conteúdo usando luz UV-C e comunica as metas de hidratação ao seu relógio inteligente."
    },
    {
      label: "💡 Reflexão Profissional",
      text: "A partilhar os motivos pelos quais as exigências tradicionais de escritórios estão a mudar e como o foco assíncrono melhora a produtividade em 45%."
    },
    {
      label: "🏆 Conquistas da Equipa",
      text: "Extremamente orgulhosos porque a nossa equipa de sucesso ao cliente superou o marco de 500 parceiros locais automatizados este mês!"
    }
  ],
  'en': [
    {
      label: "🚀 Product Launch",
      text: "Announcing Helium: A smart vacuum flask that sanitizes contents using UV-C light and reports hydration targets to your smartwatch."
    },
    {
      label: "💡 Professional Insight",
      text: "Sharing why traditional office arrangements are changing and how async workflows improve focused productivity by 45%."
    },
    {
      label: "🏆 Milestones Reached",
      text: "Unbelievably proud that our customer success crew surpassed the automated milestone of 500 local active partners this month!"
    }
  ],
  'es': [
    {
      label: "🚀 Lanzamiento Fuerte",
      text: "Presentamos Helium: una botella térmica inteligente que higieniza el agua con luces UV-C y sincroniza metas de hidratación con su reloj."
    },
    {
      label: "💡 Reflexión Laboral",
      text: "Compartiendo por qué las estructuras de oficina tradicionales están cambiando y cómo el enfoque síncrono/asíncrono eleva eficiencia 45%."
    },
    {
      label: "🏆 Logro Superado",
      text: "¡Extremadamente orgullosos de que nuestro equipo superó la meta de 500 socios locales automatizados este mes!"
    }
  ]
};

const OUTPUT_LANGUAGES = [
  { code: 'English', label: 'English', flag: '🇺🇸' },
  { code: 'Spanish', label: 'Spanish / Español', flag: '🇪🇸' },
  { code: 'French', label: 'French / Français', flag: '🇫🇷' },
  { code: 'German', label: 'German / Deutsch', flag: '🇩🇪' },
  { code: 'Portuguese', label: 'Portuguese / Português', flag: '🇵🇹' },
  { code: 'Italian', label: 'Italian / Italiano', flag: '🇮🇹' },
  { code: 'Japanese', label: 'Japanese / 日本語', flag: '🇯🇵' },
  { code: 'Chinese', label: 'Chinese / 中文', flag: '🇨🇳' },
];

export default function ComposerPanel({ onGenerate, isLoading, currentLang }: ComposerPanelProps) {
  const [idea, setIdea] = useState('');
  const [tone, setTone] = useState<PostTone>('professional');
  const [language, setLanguage] = useState('English');

  const t = translations[currentLang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || isLoading) return;
    onGenerate(idea, tone, language);
  };

  const templatesList = SAMPLE_TEMPLATES[currentLang] || SAMPLE_TEMPLATES['en'];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col gap-6 transition-all">
      
      {/* Panel headers */}
      <div className="flex items-center space-x-2.5">
        <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-amber-400 rounded-xl">
          <Sparkles className="w-5 h-5 text-slate-800 dark:text-amber-400" />
        </div>
        <div>
          <h2 className="font-display font-bold text-sm tracking-tight text-slate-900 dark:text-slate-100 uppercase">
            {t.composerTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.composerSubtitle}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Concept input field */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400">
              ✍️ {t.conceptLabel}
            </label>
            <span className="text-[10px] text-amber-900 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-md">
              🌐 {t.conceptHelp}
            </span>
          </div>
          
          <div className="relative">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder={t.conceptPlaceholder}
              className="w-full min-h-[145px] px-4 py-3 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700/80 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-sans transition-all leading-relaxed"
              maxLength={400}
              disabled={isLoading}
            />
            <span className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-705">
              {idea.length}/400
            </span>
          </div>
          
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 dark:text-slate-450 font-bold flex items-center gap-1">
              <FileText className="w-3 h-3" /> {t.templatesLabel}
            </span>
            {templatesList.map((tpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setIdea(tpl.text)}
                disabled={isLoading}
                className="text-[10.5px] bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-650 dark:text-slate-300 px-2.5 py-1 rounded-md transition-all font-semibold cursor-pointer disabled:opacity-50"
              >
                {tpl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Output lang options */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 mb-2.5">
            🌐 {t.targetLangLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {OUTPUT_LANGUAGES.map((lang) => {
              const active = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setLanguage(lang.code)}
                  disabled={isLoading}
                  className={`px-3 py-2 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                    active
                      ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-amber-400 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <span className="text-sm select-none">{lang.flag}</span>
                  <span className="text-xs font-semibold">{lang.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone options */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-450 dark:text-slate-400 mb-2.5">
            📣 {t.toneLabel}
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {([
              'professional', 
              'witty', 
              'urgent', 
              'inspirational', 
              'educational', 
              'humorous', 
              'controversial'
            ] as PostTone[]).map((tCode) => {
              const active = tone === tCode;
              let label = "💼 Professional";
              let desc = "Polished & formal commercial look";
              
              if (currentLang === 'pt-PT') {
                if (tCode === 'professional') { label = "💼 Profissional"; desc = "Linguagem corporativa polida"; }
                if (tCode === 'witty') { label = "🎭 Perspicaz"; desc = "Humor inteligente e refinado"; }
                if (tCode === 'urgent') { label = "🚨 Urgente"; desc = "Focado em ações e escassez"; }
                if (tCode === 'inspirational') { label = "✨ Inspirador"; desc = "Mensagens motivacionais de visão"; }
                if (tCode === 'educational') { label = "📚 Educacional"; desc = "Dicas práticas e metodologias"; }
                if (tCode === 'humorous') { label = "🌟 Humorado"; desc = "Tom leve, divertido e descontraído"; }
                if (tCode === 'controversial') { label = "🔥 Provocador"; desc = "Desafia o status quo do setor"; }
              } else if (currentLang === 'es') {
                if (tCode === 'professional') { label = "💼 Profesional"; desc = "Corporativo y pulido"; }
                if (tCode === 'witty') { label = "🎭 Agudo"; desc = "Comentarios inteligentes e ingeniosos"; }
                if (tCode === 'urgent') { label = "🚨 Urgente"; desc = "Impulsa acciones inmediatas"; }
                if (tCode === 'inspirational') { label = "✨ Inspirador"; desc = "Lleno de energía y motivación"; }
                if (tCode === 'educational') { label = "📚 Educativo"; desc = "Lecciones y puntos prácticos"; }
                if (tCode === 'humorous') { label = "🌟 Humorístico"; desc = "Divertido y amigable"; }
                if (tCode === 'controversial') { label = "🔥 Polémico"; desc = "Discute mitos de la industria"; }
              } else {
                if (tCode === 'professional') { label = "💼 Professional"; desc = "Polished & formal look"; }
                if (tCode === 'witty') { label = "🎭 Witty"; desc = "Smart quick commentary"; }
                if (tCode === 'urgent') { label = "🚨 Urgent"; desc = "FOMO and high priority action"; }
                if (tCode === 'inspirational') { label = "✨ Inspiring"; desc = "Uplifting and dream-focused"; }
                if (tCode === 'educational') { label = "📚 Educational"; desc = "Key facts and step-by-step points"; }
                if (tCode === 'humorous') { label = "🌟 Humorous"; desc = "Relatable situations and jokes"; }
                if (tCode === 'controversial') { label = "🔥 Controversial"; desc = "Challenging industry rules professionally"; }
              }

              return (
                <button
                  key={tCode}
                  type="button"
                  onClick={() => setTone(tCode)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                    active
                      ? 'border-amber-500 bg-amber-500/10 text-slate-900 dark:text-amber-400 font-bold shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                  disabled={isLoading}
                >
                  <span className="text-xs font-bold leading-tight">{label}</span>
                  <span className="text-[9.5px] text-slate-400 dark:text-slate-500 font-normal leading-tight mt-1 max-w-[124px] overflow-hidden truncate">
                    {desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading || !idea.trim()}
          className={`w-full py-4 px-6 rounded-xl font-display font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
            isLoading || !idea.trim()
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 shadow-none border border-slate-200 dark:border-slate-750 cursor-not-allowed'
              : 'bg-slate-950 hover:bg-slate-850 dark:bg-slate-100 text-white dark:text-slate-950 dark:hover:bg-white active:scale-[0.99] cursor-pointer'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
              <span>{t.generatingBtn} {language}...</span>
            </>
          ) : (
            <>
              <Zap className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{t.generateBtn}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
