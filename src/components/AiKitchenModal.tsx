import React, { useState, useMemo } from 'react';
import { Recipe, FamilyMember, MealHistoryEntry, Season, Language, MealSlot } from '../types';
import { translations } from '../data/translations';
import { generateAiKitchenInsight, generateAiMenuCombos, AiKitchenInsight, AiMenuCombo } from '../services/aiKitchenService';
import { getLocalizedRecipe } from '../services/recipeLocalization';
import { getSmartCulinaryAnswer } from '../services/chefAiEngine';
import { 
  Sparkles, ChefHat, X, Calendar, Clock, RotateCw, CheckCircle2, 
  AlertTriangle, Heart, ShieldAlert, ArrowRight, Eye, Check, Utensils,
  History, Flame, MessageSquare, Send, ChevronRight, HelpCircle
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  recipes: Recipe[];
  familyMembers: FamilyMember[];
  history: MealHistoryEntry[];
  season: Season;
  lang: Language;
  onOpenRecipe: (recipe: Recipe) => void;
  onMarkCooked: (recipe: Recipe, slot: MealSlot) => void;
}

export const AiKitchenModal: React.FC<Props> = ({
  isOpen,
  onClose,
  recipes,
  familyMembers,
  history,
  season,
  lang,
  onOpenRecipe,
  onMarkCooked
}) => {
  const t = translations[lang] || translations.ur;
  const isRtl = ['ur', 'ps', 'pa', 'ar', 'fa'].includes(lang);

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [justMarkedId, setJustMarkedId] = useState<string | null>(null);

  // Live quick ask state
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [quickAskActions, setQuickAskActions] = useState<Array<{ label: string; slot: 'nashta' | 'dopahar' | 'raat'; promptText: string }> | null>(null);
  const [isAsking, setIsAsking] = useState<boolean>(false);

  // Generate current insight
  const insight: AiKitchenInsight = useMemo(() => {
    return generateAiKitchenInsight(recipes, familyMembers, history, season, lang);
  }, [recipes, familyMembers, history, season, lang, refreshKey]);

  // Generate menu combos for cycling
  const [modalComboIndex, setModalComboIndex] = useState<number>(0);
  const combos: AiMenuCombo[] = useMemo(() => {
    return generateAiMenuCombos(recipes, familyMembers, history, season, lang);
  }, [recipes, familyMembers, history, season, lang]);

  const activeCombo = combos[modalComboIndex % (combos.length || 1)];

  if (!isOpen) return null;

  const handleMarkMeal = (recipe: Recipe, slot: MealSlot) => {
    onMarkCooked(recipe, slot);
    setJustMarkedId(recipe.id);
    setTimeout(() => {
      setJustMarkedId(null);
    }, 1800);
  };

  const handleQuickAsk = (q?: string) => {
    const query = (q || customQuestion).trim();
    if (!query) return;
    setIsAsking(true);
    setAiAnswer(null);

    // Call smart culinary engine
    setTimeout(() => {
      const resp = getSmartCulinaryAnswer(query, recipes, familyMembers, history, lang);
      setAiAnswer(resp.reply);
      setQuickAskActions(resp.suggestedSlotActions || null);
      setIsAsking(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-stone-900 p-4 sm:p-5 text-white flex items-center justify-between gap-3 shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-emerald-400 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-emerald-950/80 rounded-[14px] flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-amber-300 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  <span>✨ AI Kitchen</span>
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-stone-900 shadow-xs">
                  {t.smartSuggestions}
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-semibold mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>
                  {`${t.todayDayLabel}: ${insight.currentDayName}`}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRefreshKey(prev => prev + 1)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title={t.changeDish || 'Refresh'}
            >
              <RotateCw className="w-4 h-4 text-emerald-300" />
              <span className="hidden sm:inline">{t.changeDish || 'Refresh'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL SCROLLABLE CONTENT */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 bg-stone-50/60 divide-y divide-stone-200/80">
          
          {/* SECTION 1: LAST WEEK SAME DAY MEAL (پچھلے ہفتے آج کے دن کیا پکا تھا) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-stone-900">
              <span className="text-xl">📅</span>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                {t.lastWeekWhatCooked}
              </h3>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-300 rounded-3xl p-4 shadow-xs space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                  🍲
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-amber-900">
                      {t.sameDayLastWeek}: 
                    </span>
                    {insight.lastWeekSameDay.dishesCooked.map((dish, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-200 text-amber-950 border border-amber-300">
                        {dish.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-amber-900 font-bold leading-relaxed">
                    💡 {insight.lastWeekSameDay.advice}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: RECENT DAYS HISTORY (کل، پرسوں، کچھ دن پہلے کیا پکا تھا) */}
          <div className="pt-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-stone-900">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <h3 className="text-sm sm:text-base font-black tracking-tight">
                  {t.pastMealsHistoryTitle}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-stone-500">
                {t.healthAndParhez}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {insight.recentHistory.map((item, idx) => (
                <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-3 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {item.dishes.length === 0 ? (
                      <span className="text-xs text-stone-400 italic">
                        {t.historyEmpty}
                      </span>
                    ) : (
                      item.dishes.map((d, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                          <span className="text-stone-400">•</span>
                          <span>{d.name}</span>
                          <span className="text-[10px] text-stone-500 font-normal">
                            
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Smart Balance Advice */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 font-semibold flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p>{insight.recentBalanceAdvice}</p>
            </div>
          </div>

          {/* SECTION 3: DISHES NOT COOKED FOR A LONG TIME (یہ کھانا کافی وقت سے نہیں بنا) */}
          <div className="pt-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-stone-900">
              <div className="flex items-center gap-2">
                <span className="text-xl">⏰</span>
                <h3 className="text-sm sm:text-base font-black tracking-tight">
                  {t.notCookedLongTime}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {t.whyRecommended}
              </span>
            </div>

            <p className="text-xs text-stone-600 font-medium">
              {t.changeAiMenuHint}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {insight.longTimeNotCooked.map((item, idx) => {
                const loc = getLocalizedRecipe(item.recipe, lang);
                const isJustMarked = justMarkedId === item.recipe.id;

                return (
                  <div key={idx} className="bg-white border-2 border-dashed border-amber-200 hover:border-amber-400 rounded-2xl p-3 shadow-xs space-y-2 transition flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-2xl p-1 bg-amber-50 rounded-xl border border-amber-100">
                          {item.recipe.imageEmoji}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-200">
                          {item.daysAgoText}
                        </span>
                      </div>
                      <h4 className="font-black text-stone-900 text-sm">
                        {loc.displayTitle}
                      </h4>
                      <p className="text-[11px] text-stone-500 font-medium line-clamp-2 mt-0.5">
                        {item.reason}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-2 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenRecipe(item.recipe);
                        }}
                        className="flex-1 py-1.5 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.viewRecipe}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMarkMeal(item.recipe, 'dopahar')}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1 cursor-pointer ${
                          isJustMarked
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                        }`}
                      >
                        {isJustMarked ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.recordedSuccess}</span>
                          </>
                        ) : (
                          <>
                            <Utensils className="w-3.5 h-3.5" />
                            <span>{t.cookedThisToday}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: TODAY'S RECOMMENDED 3-MEAL MENU (آج کیا پکایا جائے؟) */}
          <div className="pt-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-stone-900 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍽️</span>
                <h3 className="text-sm sm:text-base font-black tracking-tight">
                  {t.whatToCookToday}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                  {activeCombo ? activeCombo.badgeTitle : ''}
                </span>
                <button
                  type="button"
                  onClick={() => setModalComboIndex(prev => prev + 1)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-xs transition active:scale-95 shadow-xs cursor-pointer"
                  title={t.aiKitchenChange}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{t.aiKitchenChange}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {/* 1. Breakfast */}
              <div className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-3xl shrink-0 p-1.5 bg-amber-50 rounded-2xl border border-amber-100">
                    {activeCombo?.breakfastDish.imageEmoji || '🍳'}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        {t.slotBreakfast}
                      </span>
                      <span className="text-xs font-extrabold text-stone-900 truncate">
                        {activeCombo ? getLocalizedRecipe(activeCombo.breakfastDish, lang).displayTitle : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-medium mt-0.5 truncate">
                      {activeCombo?.reason}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (activeCombo) onOpenRecipe(activeCombo.breakfastDish);
                    }}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                    title={t.viewRecipe}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => activeCombo && handleMarkMeal(activeCombo.breakfastDish, 'nashta')}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs transition active:scale-95 shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>{t.chooseOne}</span>
                  </button>
                </div>
              </div>

              {/* 2. Lunch */}
              <div className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-3xl shrink-0 p-1.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                    {activeCombo?.lunchDish.imageEmoji || '🍲'}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {t.slotLunch}
                      </span>
                      <span className="text-xs font-extrabold text-stone-900 truncate">
                        {activeCombo ? getLocalizedRecipe(activeCombo.lunchDish, lang).displayTitle : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-medium mt-0.5 truncate">
                      {activeCombo?.yesterdayRelation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (activeCombo) onOpenRecipe(activeCombo.lunchDish);
                    }}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                    title={t.viewRecipe}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => activeCombo && handleMarkMeal(activeCombo.lunchDish, 'dopahar')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition active:scale-95 shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>{t.chooseOne}</span>
                  </button>
                </div>
              </div>

              {/* 3. Dinner */}
              <div className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-3xl shrink-0 p-1.5 bg-indigo-50 rounded-2xl border border-indigo-100">
                    {activeCombo?.dinnerDish.imageEmoji || '🌙'}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
                        {t.slotDinner}
                      </span>
                      <span className="text-xs font-extrabold text-stone-900 truncate">
                        {activeCombo ? getLocalizedRecipe(activeCombo.dinnerDish, lang).displayTitle : ''}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 font-medium mt-0.5 truncate">
                      {activeCombo?.lastWeekRelation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      if (activeCombo) onOpenRecipe(activeCombo.dinnerDish);
                    }}
                    className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition cursor-pointer"
                    title={t.viewRecipe}
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => activeCombo && handleMarkMeal(activeCombo.dinnerDish, 'raat')}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs transition active:scale-95 shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>{t.chooseOne}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: FAMILY HEALTH & DIETARY CARE (صحت اور پرہیز کا خیال) */}
          <div className="pt-4 space-y-2.5">
            <div className="flex items-center gap-2 text-stone-900">
              <span className="text-xl">🩺</span>
              <h3 className="text-sm sm:text-base font-black tracking-tight">
                {t.familyHealthCare}
              </h3>
            </div>

            <div className="space-y-1.5">
              {insight.healthAndFamilyNotes.map((note, nIdx) => (
                <div key={nIdx} className="bg-rose-50/70 border border-rose-200 rounded-2xl p-2.5 text-xs text-rose-950 font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 6: DIRECT QUESTION TO AI KITCHEN (لائیو شیف سے سوال پوچھیں) */}
          <div className="pt-4 space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-stone-900">
              <div className="flex items-center gap-2">
                <span className="text-xl">💬</span>
                <h3 className="text-sm sm:text-base font-black tracking-tight">
                  {t.askAiKitchenTitle}
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                lang === 'en' ? 'What to cook today? (Time & Day evaluated)' :
                lang === 'es' ? '¿Qué cocinamos hoy? (Evaluado por hora y día)' :
                lang === 'pa' ? 'اج کی پکائیے؟ (ویلے تے دن دے مطابق)' :
                lang === 'ps' ? 'نن څه پخ کړو؟ (د وخت او ورځې سره سم)' :
                lang === 'ar' ? 'ماذا نطبخ اليوم حسب الوقت واليوم؟' :
                lang === 'fa' ? 'امروز چی بپزیم؟ بر اساس زمان و روز' :
                'آج کیا پکائیں؟ (وقت اور دن کے لحاظ سے تجویز)',

                lang === 'en' ? 'I have potatoes and spinach in fridge, what to cook?' :
                lang === 'es' ? 'Tengo patatas y espinacas en el refrigerador, ¿qué cocino?' :
                lang === 'pa' ? 'فریج چ آلو تے پالک ہے، کیہڑی ڈش بناواں؟' :
                lang === 'ps' ? 'په فریج کې کچالو او پالک شته، څه پخ کړم؟' :
                lang === 'ar' ? 'لدي بطاطس وسبانخ في الثلاجة، ماذا أطبخ؟' :
                lang === 'fa' ? 'در یخچال سیب زمینی و اسفناج دارم، چی بپزم؟' :
                'فریج میں آلو، پالک اور میتھی ہے، کیا بناؤں؟',

                lang === 'en' ? 'Light dinner for diabetic and high BP?' :
                lang === 'es' ? '¿Cena ligera para hipertensión y diabetes?' :
                lang === 'pa' ? 'شوگر تے بلڈ پریشر دے مریض لئی ہلکا کھانا؟' :
                lang === 'ps' ? 'د شکرې او لوړ فشار ناروغانو لپاره سپکه ډوډۍ؟' :
                lang === 'ar' ? 'عشاء خفيف لمريض السكري وضغط الدم؟' :
                lang === 'fa' ? 'شام سبک برای دیابت و فشار خون؟' :
                'شوگر اور بلڈ پریشر مریض کیلئے رات کا ہلکا کھانا؟'
              ].map((p, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => {
                    setCustomQuestion(p);
                    handleQuickAsk(p);
                  }}
                  className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 transition cursor-pointer text-left"
                >
                  ⚡ {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuickAsk()}
                placeholder={t.askChefPlaceholder}
                className="flex-1 py-2.5 px-3.5 rounded-2xl bg-white border border-stone-200 focus:border-emerald-500 text-xs text-stone-900 outline-none"
              />
              <button
                type="button"
                onClick={() => handleQuickAsk()}
                disabled={isAsking || !customQuestion.trim()}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
              >
                {isAsking ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>{t.askButton}</span>
              </button>
            </div>

            {aiAnswer && (
              <div className="bg-emerald-900 text-white rounded-2xl p-3.5 shadow-md text-xs leading-relaxed space-y-2.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 text-emerald-300 font-extrabold text-[11px]">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>{t.aiChefReplyTitle}</span>
                </div>
                <p className="whitespace-pre-line text-emerald-50">{aiAnswer}</p>

                {quickAskActions && quickAskActions.length > 0 && (
                  <div className="pt-2 border-t border-emerald-700/80 space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-300 block">
                      {t.selectMealTime}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickAskActions.map((act, actIdx) => (
                        <button
                          key={actIdx}
                          type="button"
                          onClick={() => {
                            setCustomQuestion(act.promptText);
                            handleQuickAsk(act.promptText);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold border border-emerald-500 transition cursor-pointer"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-stone-500 font-medium">
            {t.appTagline}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
