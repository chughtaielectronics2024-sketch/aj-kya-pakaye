import React, { useState } from 'react';
import { Recipe, Language, MealSlot } from '../types';
import { translations } from '../data/translations';
import { getLocalizedRecipe } from '../services/recipeLocalization';
import { AiMenuCombo } from '../services/aiKitchenService';
import { 
  Sparkles, Eye, Check, Utensils, X,
  ChefHat, Heart, Calendar, ShieldCheck, Flame, ArrowRight, Clock
} from 'lucide-react';

interface Props {
  combo: AiMenuCombo;
  lang: Language;
  onNextCombo?: () => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onMarkCooked: (recipe: Recipe, slot: MealSlot) => void;
  onOpenFullModal?: () => void;
  onClose: () => void;
}

export const AiKitchenSuggestionCard: React.FC<Props> = ({
  combo,
  lang,
  onOpenRecipe,
  onMarkCooked,
  onClose
}) => {
  const t = translations[lang] || translations.ur;

  const [justMarked, setJustMarked] = useState<boolean>(false);

  const locMain = getLocalizedRecipe(combo.mainDish, lang);
  const locNashta = getLocalizedRecipe(combo.breakfastDish, lang);
  const locLunch = getLocalizedRecipe(combo.lunchDish, lang);
  const locDinner = getLocalizedRecipe(combo.dinnerDish, lang);

  const handleMark = () => {
    onMarkCooked(combo.mainDish, combo.slot);
    setJustMarked(true);
    setTimeout(() => {
      setJustMarked(false);
    }, 1800);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-emerald-50/70 border-2 border-amber-300/80 rounded-3xl p-4 sm:p-5 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden select-none">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER BAR */}
      <div className="flex items-center justify-between gap-2 border-b border-amber-200/60 pb-3 relative z-10">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-black shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Kitchen</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-[11px] font-black">
            {combo.badgeTitle}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 transition cursor-pointer"
            title={t.hide}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 1. MAIN DISH HIGHLIGHT (MENU LIST) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-xs border border-amber-200/80 rounded-2xl p-4 shadow-xs relative z-10">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-emerald-100 border border-amber-200 flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-xs">
            {combo.mainDish.imageEmoji}
          </div>
          <div className="min-w-0 space-y-1 text-start">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                {locMain.displayCategory}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                ⏱️ {combo.mainDish.prepTimeMins + combo.mainDish.cookTimeMins} {t.minutes}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                {combo.slot === 'dopahar' ? `${t.slotLunch} 🍲` : `${t.slotDinner} 🌙`}
              </span>
              {/* Last cooked badge on main dish */}
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-200/70 text-amber-950 border border-amber-300">
                📅 {combo.lastCookedInfo.mainDishLastCooked.badgeText}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight leading-snug">
              {locMain.displayTitle}
            </h3>
            <p className="text-xs text-stone-600 font-semibold leading-relaxed">
              💡 {combo.reason}
            </p>
          </div>
        </div>

        {/* Action buttons for main dish */}
        <div className="flex sm:flex-col gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onOpenRecipe(combo.mainDish)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-black text-xs transition active:scale-95 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.viewRecipe}</span>
          </button>
          <button
            type="button"
            onClick={handleMark}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition active:scale-95 shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
              justMarked
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {justMarked ? <Check className="w-3.5 h-3.5" /> : <Utensils className="w-3.5 h-3.5" />}
            <span>{justMarked ? t.recordedSuccess : t.cookedThisToday}</span>
          </button>
        </div>
      </div>

      {/* 2. FULL DAY 3-MEAL STRIP (MENU LIST) */}
      <div className="space-y-1.5 relative z-10 text-start">
        <span className="text-[11px] font-black text-stone-700 flex items-center gap-1">
          <span>🍽️</span>
          <span>{t.fullDayMenuStrip}</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Breakfast */}
          <div 
            onClick={() => onOpenRecipe(combo.breakfastDish)}
            className="bg-white/80 border border-stone-200/90 hover:border-amber-400 p-2.5 rounded-2xl flex flex-col justify-between cursor-pointer transition shadow-2xs hover:shadow-xs group text-start"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl p-1 bg-amber-50 rounded-xl shrink-0">{combo.breakfastDish.imageEmoji || '🍳'}</span>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-amber-700 uppercase block">{t.slotBreakfast}</span>
                <p className="text-xs font-extrabold text-stone-800 truncate group-hover:text-amber-700 transition">
                  {locNashta.displayTitle}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
              <span className="font-bold text-amber-900 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-200 truncate">
                🕒 {combo.lastCookedInfo.breakfastLastCooked.badgeText}
              </span>
            </div>
          </div>

          {/* Lunch */}
          <div 
            onClick={() => onOpenRecipe(combo.lunchDish)}
            className="bg-white/80 border border-stone-200/90 hover:border-emerald-400 p-2.5 rounded-2xl flex flex-col justify-between cursor-pointer transition shadow-2xs hover:shadow-xs group text-start"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl p-1 bg-emerald-50 rounded-xl shrink-0">{combo.lunchDish.imageEmoji || '🍲'}</span>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-emerald-700 uppercase block">{t.slotLunch}</span>
                <p className="text-xs font-extrabold text-stone-800 truncate group-hover:text-emerald-700 transition">
                  {locLunch.displayTitle}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
              <span className="font-bold text-emerald-900 bg-emerald-100/90 px-1.5 py-0.5 rounded border border-emerald-200 truncate">
                🕒 {combo.lastCookedInfo.lunchLastCooked.badgeText}
              </span>
            </div>
          </div>

          {/* Dinner */}
          <div 
            onClick={() => onOpenRecipe(combo.dinnerDish)}
            className="bg-white/80 border border-stone-200/90 hover:border-indigo-400 p-2.5 rounded-2xl flex flex-col justify-between cursor-pointer transition shadow-2xs hover:shadow-xs group text-start"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl p-1 bg-indigo-50 rounded-xl shrink-0">{combo.dinnerDish.imageEmoji || '🌙'}</span>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-indigo-700 uppercase block">{t.slotDinner}</span>
                <p className="text-xs font-extrabold text-stone-800 truncate group-hover:text-indigo-700 transition">
                  {locDinner.displayTitle}
                </p>
              </div>
            </div>
            <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px]">
              <span className="font-bold text-indigo-900 bg-indigo-100/90 px-1.5 py-0.5 rounded border border-indigo-200 truncate">
                🕒 {combo.lastCookedInfo.dinnerLastCooked.badgeText}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 📅 PROMINENT RED BOX: LAST COOKED RECORD */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-3xl p-0.5 shadow-lg text-white relative z-10 animate-in fade-in slide-in-from-top-1 duration-200">
        <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-rose-950/95 rounded-[22px] p-3.5 sm:p-4 space-y-2.5">
          {/* Header row */}
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-rose-500/30 pb-2">
            <div className="flex items-start gap-2.5">
              <span className="text-xl mt-0.5 shrink-0">📅</span>
              <div className="text-start">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-sm sm:text-base font-black text-rose-300 leading-snug rtl:leading-[1.7]">
                    {t.whenLastPrepared}
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/25 text-rose-200 border border-rose-400/30 font-bold leading-normal">
                    {t.frontRecord}
                  </span>
                </div>
                <span className="text-[11px] text-stone-300 leading-normal rtl:leading-[1.6] block mt-0.5">
                  {t.frontRecordSubtitle}
                </span>
              </div>
            </div>

            {/* Big prominent badge for the main dish */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-stone-950 text-xs font-black shadow-xs leading-normal">
              <Clock className="w-3.5 h-3.5 text-stone-900 shrink-0" />
              <span>{combo.lastCookedInfo.mainDishLastCooked.badgeText}</span>
            </div>
          </div>

          {/* Main dish last cooked detail */}
          <div className="bg-white/10 rounded-2xl p-2.5 sm:p-3 text-xs text-amber-100 flex items-start gap-2.5 border border-amber-400/20 text-start">
            <span className="text-2xl p-1 bg-amber-400/20 rounded-xl shrink-0">
              {combo.mainDish.imageEmoji || '🍲'}
            </span>
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1 flex-wrap">
                <span className="font-black text-amber-200 text-xs sm:text-sm">
                  {locMain.displayTitle}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-800 text-amber-300 border border-amber-400/20">
                  {combo.slot === 'dopahar' ? t.slotLunch : t.slotDinner}
                </span>
              </div>
              <p className="text-xs text-stone-200 font-semibold leading-relaxed">
                {combo.lastCookedInfo.mainDishLastCooked.detailSentence}
              </p>
            </div>
          </div>

          {/* Same Weekday of Last Week & Recent Days Glance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-start">
            {/* Same weekday last week */}
            <div className="bg-amber-500/15 border border-amber-400/25 rounded-2xl p-2.5 space-y-1 text-start">
              <div className="flex items-center gap-1.5 text-amber-300 font-black text-[11px]">
                <span>🔁</span>
                <span>{t.sameDayLastWeek}</span>
              </div>
              <p className="text-[11px] text-stone-200 leading-relaxed font-medium">
                {combo.lastCookedInfo.lastWeekSameDayText}
              </p>
            </div>

            {/* Yesterday & Day Before */}
            <div className="bg-emerald-500/15 border border-emerald-400/25 rounded-2xl p-2.5 space-y-1 text-start">
              <div className="flex items-center gap-1.5 text-emerald-300 font-black text-[11px]">
                <span>📜</span>
                <span>{t.yesterdayAndDayBefore}</span>
              </div>
              <p className="text-[11px] text-stone-200 leading-relaxed font-medium">
                {combo.lastCookedInfo.recentDaysSummary || t.historyLogged}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* WHY AI CHOSE THIS (YESTERDAY & LAST WEEK RELATION) */}
      <div className="bg-amber-100/70 border border-amber-300/80 rounded-2xl p-3 text-xs text-amber-950 font-semibold space-y-1 relative z-10">
        <div className="flex items-center gap-1.5 font-black text-amber-900">
          <span>🧠</span>
          <span>{t.aiSmartReasoning}</span>
        </div>
        <p className="text-[11px] text-amber-900 leading-relaxed">
          • {combo.yesterdayRelation}
        </p>
        <p className="text-[11px] text-amber-900 leading-relaxed">
          • {combo.lastWeekRelation}
        </p>
        <p className="text-[11px] text-emerald-900 font-bold leading-relaxed">
          • {combo.healthNote}
        </p>
      </div>

      {/* FOOTER BAR */}
      <div className="flex items-center justify-between gap-2.5 pt-2 border-t border-amber-200/60 relative z-10">
        <p className="text-[11px] text-stone-600 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>{t.changeAiMenuHint}</span>
        </p>
      </div>
    </div>
  );
};
