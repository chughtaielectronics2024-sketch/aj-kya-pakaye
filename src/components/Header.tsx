import React from 'react';
import { Language, Season } from '../types';
import { translations } from '../data/translations';
import { PWAInstallButton } from './PWAInstallButton';
import { Cloud, Globe, Sun, Snowflake, CloudRain, Sparkles, UtensilsCrossed } from 'lucide-react';

interface Props {
  lang: Language;
  onLangChange: (newLang: Language) => void;
  season: Season;
  onSeasonChange: (newSeason: Season) => void;
  onOpenSync: () => void;
}

const languagesList: { code: Language; name: string; nativeName: string; dir: 'rtl' | 'ltr' }[] = [
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', dir: 'rtl' },
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'ps', name: 'Pashto', nativeName: 'پشتو', dir: 'rtl' },
  { code: 'pa', name: 'Punjabi', nativeName: 'پنجابی', dir: 'rtl' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'fa', name: 'Farsi', nativeName: 'فارسی', dir: 'rtl' }
];

export const Header: React.FC<Props> = ({
  lang,
  onLangChange,
  season,
  onSeasonChange,
  onOpenSync
}) => {
  const t = translations[lang] || translations.ur;

  const seasonIcons = {
    all: <Sparkles className="w-3.5 h-3.5 text-emerald-600" />,
    summer: <Sun className="w-3.5 h-3.5 text-amber-500" />,
    winter: <Snowflake className="w-3.5 h-3.5 text-sky-600" />,
    monsoon: <CloudRain className="w-3.5 h-3.5 text-teal-600" />
  };

  const nextSeason = () => {
    const list: Season[] = ['winter', 'summer', 'all', 'monsoon'];
    const idx = list.indexOf(season);
    const next = list[(idx + 1) % list.length];
    onSeasonChange(next);
  };

  const getSeasonLabel = () => {
    switch (season) {
      case 'summer': return t.seasonSummer.split(' ')[0];
      case 'winter': return t.seasonWinter.split(' ')[0];
      case 'monsoon': return t.seasonMonsoon.split(' ')[0];
      default: return t.seasonAll;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-emerald-100 shadow-2xs safe-top select-none">
      <div className="max-w-xl mx-auto px-3 py-2 flex items-center justify-between gap-2">
        {/* Mobile App Branding */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src="/pwa-192x192.png"
            alt="Aj kya pakaye logo"
            className="w-9 h-9 rounded-xl object-cover shadow-xs border border-emerald-300/50 shrink-0 active:scale-95 transition"
          />
          <div className="min-w-0 text-start">
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-sm text-stone-900 leading-tight sm:leading-snug rtl:leading-[1.7] truncate">
                {t.appName}
              </h1>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800 shrink-0 inline-flex items-center leading-normal">
                {t.tagPakistan}
              </span>
            </div>
            <p className="text-[10px] text-stone-500 truncate leading-normal rtl:leading-[1.6]">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Mobile Header Quick Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Season Toggle Pill */}
          <button
            onClick={nextSeason}
            className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 active:scale-92 transition"
            title={t.changeSeason}
          >
            {seasonIcons[season]}
            <span className="text-[10px] hidden xs:inline">{getSeasonLabel()}</span>
          </button>

          {/* Compact Mobile Language Switcher */}
          <div className="relative flex items-center bg-stone-100 border border-stone-200 rounded-xl px-1.5 py-1 text-stone-700">
            <Globe className="w-3 h-3 text-stone-500 mr-0.5 rtl:ml-0.5" />
            <select
              value={lang}
              onChange={(e) => onLangChange(e.target.value as Language)}
              aria-label="Select Language"
              className="bg-transparent text-[11px] font-bold cursor-pointer outline-none text-stone-800 uppercase"
            >
              {languagesList.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.code.toUpperCase()} - {item.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* Cloud Sync Icon */}
          <button
            onClick={onOpenSync}
            className="p-1.5 rounded-xl text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 active:scale-90 transition"
            title={t.cloudSyncTitle}
          >
            <Cloud className="w-4 h-4" />
          </button>

          {/* Mobile In-App Install Icon/Button */}
          <PWAInstallButton currentLang={lang} />
        </div>
      </div>
    </header>
  );
};
