import React, { useState, useMemo } from 'react';
import { MealHistoryEntry, Recipe, Language, MealSlot } from '../types';
import { translations } from '../data/translations';
import { getLocalizedRecipe } from '../services/recipeLocalization';
import { addPastMealHistoryEntry, deleteMealHistoryEntry, getDefaultPastMeals, saveStoredHistory } from '../services/storage';
import { 
  History, Calendar, X, Trash2, Plus, Clock, ChefHat, 
  Sparkles, CheckCircle2, ChevronRight, AlertCircle, RotateCcw
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  history: MealHistoryEntry[];
  recipes: Recipe[];
  lang: Language;
  onOpenRecipe: (recipe: Recipe) => void;
  onUpdateHistory: (history: MealHistoryEntry[]) => void;
}

export const PastMealsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  history,
  recipes,
  lang,
  onOpenRecipe,
  onUpdateHistory
}) => {
  const t = translations[lang] || translations.ur;

  const [activeFilter, setActiveFilter] = useState<'all' | 'yesterday_parson' | 'last_week' | 'slot'>('all');
  const [selectedSlotFilter, setSelectedSlotFilter] = useState<MealSlot | 'all'>('all');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // New past meal entry form state
  const [newDateType, setNewDateType] = useState<'yesterday' | 'parson' | '3days' | 'custom'>('yesterday');
  const [customDate, setCustomDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  });
  const [newSlot, setNewSlot] = useState<MealSlot>('raat');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>(recipes[0]?.id || '');
  const [customRecipeName, setCustomRecipeName] = useState<string>('');

  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const getDaysDiff = (dateStr: string): number => {
    const today = new Date(todayStr);
    const target = new Date(dateStr);
    const diffTime = today.getTime() - target.getTime();
    return Math.round(diffTime / (1000 * 3600 * 24));
  };

  const getRelativeDayBadge = (dateStr: string) => {
    const diff = getDaysDiff(dateStr);
    const dayLabels: Record<Language, { today: string; todayCooked: string; yesterday: string; yesterdayCooked: string; parson: string; parsonCooked: string; daysAgo: (d: number) => string; lastWeek: string; olderLog: string }> = {
      ur: { today: 'آج', todayCooked: 'آج پکا', yesterday: 'کل', yesterdayCooked: 'کل کا کھانا', parson: 'پرسوں', parsonCooked: 'پرسوں کا کھانا', daysAgo: (d) => `${d} دن پہلے`, lastWeek: 'پچھلا ہفتہ', olderLog: 'ماضی کا ریکارڈ' },
      pa: { today: 'اج', todayCooked: 'اج پکیا', yesterday: 'کل', yesterdayCooked: 'کل دا کھانا', parson: 'پرسوں', parsonCooked: 'پرسوں دا کھانا', daysAgo: (d) => `${d} دن پہلاں`, lastWeek: 'پچھلا ہفتہ', olderLog: 'پرانا ریکارڈ' },
      ps: { today: 'نن', todayCooked: 'نن پخه شوې', yesterday: 'پرون', yesterdayCooked: 'د پرون ډوډۍ', parson: 'وړمه ورځ', parsonCooked: 'د وړمې ورځې ډوډۍ', daysAgo: (d) => `${d} ورځې مخکې`, lastWeek: 'تېره اونۍ', olderLog: 'پخوانی ریکارډ' },
      ar: { today: 'اليوم', todayCooked: 'وجبة اليوم', yesterday: 'أمس', yesterdayCooked: 'وجبة أمس', parson: 'أول أمس', parsonCooked: 'وجبة أول أمس', daysAgo: (d) => `منذ ${d} أيام`, lastWeek: 'الأسبوع الماضي', olderLog: 'سجل أقدم' },
      fa: { today: 'امروز', todayCooked: 'امروز پخته شد', yesterday: 'دیروز', yesterdayCooked: 'غذای دیروز', parson: 'پریروز', parsonCooked: 'غذای پریروز', daysAgo: (d) => `${d} روز پیش`, lastWeek: 'هفته گذشته', olderLog: 'ثبت قدیمی‌تر' },
      es: { today: 'Hoy', todayCooked: 'Cocinada hoy', yesterday: 'Ayer', yesterdayCooked: 'Cocinada ayer', parson: 'Anteayer', parsonCooked: 'Cocinada anteayer', daysAgo: (d) => `Hace ${d} días`, lastWeek: 'Semana pasada', olderLog: 'Registro anterior' },
      en: { today: 'Today', todayCooked: 'Cooked Today', yesterday: 'Yesterday', yesterdayCooked: 'Cooked Yesterday', parson: '2 Days Ago', parsonCooked: 'Day Before Yesterday', daysAgo: (d) => `${d} Days Ago`, lastWeek: 'Last Week', olderLog: 'Older Log' },
    };
    const l = dayLabels[lang] || dayLabels.ur;

    if (diff === 0) {
      return {
        label: l.today,
        sub: l.todayCooked,
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200'
      };
    }
    if (diff === 1) {
      return {
        label: l.yesterday,
        sub: l.yesterdayCooked,
        color: 'bg-amber-100 text-amber-900 border-amber-300'
      };
    }
    if (diff === 2) {
      return {
        label: l.parson,
        sub: l.parsonCooked,
        color: 'bg-orange-100 text-orange-900 border-orange-200'
      };
    }
    if (diff <= 7) {
      return {
        label: l.daysAgo(diff),
        sub: l.lastWeek,
        color: 'bg-stone-100 text-stone-700 border-stone-200'
      };
    }
    return {
      label: dateStr,
      sub: l.olderLog,
      color: 'bg-stone-100 text-stone-600 border-stone-200'
    };
  };

  const getSlotDetails = (slot: MealSlot) => {
    switch (slot) {
      case 'nashta':
        return { label: t.slotBreakfast, emoji: '🍳', color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'dopahar':
        return { label: t.slotLunch, emoji: '☀️', color: 'text-orange-700 bg-orange-50 border-orange-200' };
      case 'raat':
      default:
        return { label: t.slotDinner, emoji: '🌙', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
    }
  };

  // Filter history entries
  const filteredHistory = history.filter((entry) => {
    const diff = getDaysDiff(entry.date);
    if (activeFilter === 'yesterday_parson') {
      return diff === 1 || diff === 2;
    }
    if (activeFilter === 'last_week') {
      return diff >= 1 && diff <= 7;
    }
    if (activeFilter === 'slot' && selectedSlotFilter !== 'all') {
      return entry.slot === selectedSlotFilter;
    }
    return true;
  });

  // Group filtered history by date
  const groupedByDate: Record<string, MealHistoryEntry[]> = {};
  filteredHistory.forEach((entry) => {
    if (!groupedByDate[entry.date]) {
      groupedByDate[entry.date] = [];
    }
    groupedByDate[entry.date].push(entry);
  });

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

  // Compute 7-day stats
  const pastWeekMeals = history.filter((e) => {
    const diff = getDaysDiff(e.date);
    return diff >= 0 && diff <= 7;
  });

  const meatCount = pastWeekMeals.filter((e) => {
    const rec = recipes.find((r) => r.id === e.recipeId);
    return rec?.category === 'chicken' || rec?.category === 'mutton' || rec?.category === 'beef';
  }).length;

  const vegDaalCount = pastWeekMeals.filter((e) => {
    const rec = recipes.find((r) => r.id === e.recipeId);
    return rec?.category === 'sabzi' || rec?.category === 'daal';
  }).length;

  const handleDelete = (id: string) => {
    const updated = deleteMealHistoryEntry(id);
    onUpdateHistory(updated);
  };

  const handleClearAll = () => {
    const confirmClearMsg: Record<Language, string> = {
      ur: 'کیا آپ تمام پچھلی ہسٹری صاف کرنا چاہتے ہیں؟',
      pa: 'کی تسیں ساری پرانی ہسٹری صاف کرنا چاہندے او؟',
      ps: 'ایا غواړئ ټول پخوانی تاریخ پاک کړئ؟',
      ar: 'هل تريد مسح كل السجل السابق؟',
      fa: 'آیا می‌خواهید همه تاریخچه قبلی را پاک کنید؟',
      es: '¿Desea borrar todo el historial?',
      en: 'Clear all meal history?'
    };
    if (window.confirm(confirmClearMsg[lang] || confirmClearMsg.ur)) {
      saveStoredHistory([]);
      onUpdateHistory([]);
    }
  };

  const handleResetDefaults = () => {
    const def = getDefaultPastMeals();
    saveStoredHistory(def);
    onUpdateHistory(def);
  };

  const handleSavePastMeal = (e: React.FormEvent) => {
    e.preventDefault();
    let targetDate = customDate;
    if (newDateType === 'yesterday') {
      const d = new Date();
      d.setDate(d.getDate() - 1);
      targetDate = d.toISOString().split('T')[0];
    } else if (newDateType === 'parson') {
      const d = new Date();
      d.setDate(d.getDate() - 2);
      targetDate = d.toISOString().split('T')[0];
    } else if (newDateType === '3days') {
      const d = new Date();
      d.setDate(d.getDate() - 3);
      targetDate = d.toISOString().split('T')[0];
    }

    const selectedRecipe = recipes.find((r) => r.id === selectedRecipeId);
    const recipeName = customRecipeName.trim() || (selectedRecipe ? getLocalizedRecipe(selectedRecipe, lang).displayTitle : 'پکوان');

    const updated = addPastMealHistoryEntry(
      targetDate,
      selectedRecipe?.id || 'custom-past',
      recipeName,
      newSlot
    );

    onUpdateHistory(updated);
    setIsAddFormOpen(false);
    setCustomRecipeName('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md text-lg shrink-0">
              📜
            </div>
            <div className="text-start">
              <h2 className="font-black text-base sm:text-lg text-stone-900 leading-[1.7]">
                {t.pastMealsHistoryTitle}
              </h2>
              <p className="text-[11px] text-stone-600 leading-[1.6]">
                {t.pastMealsHistoryDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Quick Insights Cards */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-stone-50 p-2.5 rounded-2xl border border-stone-200">
              <span className="text-[10px] text-stone-500 block font-semibold">
                {t.last7Days}
              </span>
              <span className="text-base font-black text-stone-900 mt-0.5 block">
                {`${pastWeekMeals.length} ${t.mealsCount}`}
              </span>
            </div>
            <div className="bg-amber-50 p-2.5 rounded-2xl border border-amber-200">
              <span className="text-[10px] text-amber-800 block font-semibold">
                🍗 {t.meatDishes}
              </span>
              <span className="text-base font-black text-amber-900 mt-0.5 block">
                {`${meatCount} ${t.timesCount}`}
              </span>
            </div>
            <div className="bg-emerald-50 p-2.5 rounded-2xl border border-emerald-200">
              <span className="text-[10px] text-emerald-800 block font-semibold">
                🥬 {t.daalVegDishes}
              </span>
              <span className="text-base font-black text-emerald-900 mt-0.5 block">
                {`${vegDaalCount} ${t.timesCount}`}
              </span>
            </div>
          </div>

          {/* Quick Action Bar: Add Past Meal or Filter */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            {/* Filter Tabs */}
            <div className="inline-flex p-1 bg-stone-100 rounded-2xl border border-stone-200 text-[11px] font-bold">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  activeFilter === 'all' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t.all}
              </button>
              <button
                onClick={() => setActiveFilter('yesterday_parson')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  activeFilter === 'yesterday_parson' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t.yesterdayAndParson}
              </button>
              <button
                onClick={() => setActiveFilter('last_week')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  activeFilter === 'last_week' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t.lastWeek}
              </button>
            </div>

            {/* Add Past Meal Button */}
            <button
              onClick={() => setIsAddFormOpen(!isAddFormOpen)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow-xs transition active:scale-95 text-[11px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.logPastMeal}</span>
            </button>
          </div>

          {/* Add Past Meal Dropdown Form */}
          {isAddFormOpen && (
            <form onSubmit={handleSavePastMeal} className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-emerald-950 flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-emerald-700" />
                  {t.logPastMeal}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Day selection */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  {t.whenWasCooked}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'yesterday', label: t.yesterdayAndParson.split(' ')[0] },
                    { id: 'parson', label: t.yesterdayAndParson.split(' ').slice(-1)[0] },
                    { id: '3days', label: lang === 'en' ? '3 Days Ago' : lang === 'es' ? 'Hace 3 días' : lang === 'ps' ? '۳ ورځې مخکې' : lang === 'ar' ? 'منذ 3 أيام' : lang === 'fa' ? '۳ روز پیش' : '3 دن پہلے' },
                    { id: 'custom', label: lang === 'en' ? 'Pick Date' : lang === 'es' ? 'Elegir Fecha' : lang === 'ar' ? 'تحديد التاريخ' : lang === 'fa' ? 'انتخاب تاریخ' : lang === 'ps' ? 'نېټه وټاکئ' : 'تاریخ منتخب کریں' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setNewDateType(d.id as any)}
                      className={`py-1.5 px-2 rounded-xl text-center font-bold text-[11px] transition ${
                        newDateType === d.id ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white border border-stone-200 text-stone-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                {newDateType === 'custom' && (
                  <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full mt-2 p-2 rounded-xl bg-white border border-stone-300 text-xs font-bold"
                  />
                )}
              </div>

              {/* Slot selection */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  {t.mealSlot}: 
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['nashta', 'dopahar', 'raat'] as MealSlot[]).map((slot) => {
                    const sd = getSlotDetails(slot);
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setNewSlot(slot)}
                        className={`py-1.5 px-2 rounded-xl font-bold flex items-center justify-center gap-1 transition ${
                          newSlot === slot ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white border border-stone-200 text-stone-700'
                        }`}
                      >
                        <span>{sd.emoji}</span>
                        <span>{sd.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dish Selection */}
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  {t.selectOrTypeDish}
                </label>
                <select
                  value={selectedRecipeId}
                  onChange={(e) => setSelectedRecipeId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-stone-300 text-xs font-bold outline-none"
                >
                  {recipes.map((r) => {
                    const loc = getLocalizedRecipe(r, lang);
                    return (
                      <option key={r.id} value={r.id}>
                        {loc.displayTitle} ({r.category})
                      </option>
                    );
                  })}
                </select>
                <input
                  type="text"
                  placeholder={t.customDishPlaceholder}
                  value={customRecipeName}
                  onChange={(e) => setCustomRecipeName(e.target.value)}
                  className="w-full mt-2 p-2 rounded-xl bg-white border border-stone-300 text-xs outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition active:scale-95"
                >
                  {t.saveEntry}
                </button>
              </div>
            </form>
          )}

          {/* Grouped Timeline of Past Meals */}
          {sortedDates.length === 0 ? (
            <div className="bg-stone-50 rounded-3xl border border-stone-200 p-8 text-center space-y-3">
              <History className="w-10 h-10 text-stone-300 mx-auto" />
              <p className="font-bold text-stone-700 text-sm">
                {t.noMatchingDishes}
              </p>
              <p className="text-[11px] text-stone-500 max-w-xs mx-auto">
                {
                  lang === 'en' ? 'Past cooked meals will appear here to help you keep track of your family menu.' :
                  lang === 'es' ? 'Las comidas cocinadas aparecerán aquí para ayudarle a dar seguimiento al menú familiar.' :
                  lang === 'pa' ? 'جدوں تسیں کھانا درج کرو گے یا "اج پکا لیا" دباؤ گے تاں اوہ ایتھے نظر آئے گا۔' :
                  lang === 'ps' ? 'کله چې تاسو پخه شوې خواړه ثبت کړئ، نو دلته به وښودل شي.' :
                  lang === 'ar' ? 'ستظهر الوجبات المطهوة هنا لمساعدتك في تتبع قائمة طعام عائلتك.' :
                  lang === 'fa' ? 'غذاهای پخته شده در اینجا ظاهر می‌شوند تا منوی خانواده را پیگیری کنید.' :
                  'جب آپ "یہ ڈش آج پک گئی ہے" دبائیں گے یا اوپر "کل یا پرسوں کا کھانا درج کریں" دبائیں گے تو وہ یہاں نظر آئے گا۔'
                }
              </p>
              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-xs transition active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.loadSampleHistory}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedDates.map((date) => {
                const dayEntries = groupedByDate[date];
                const badge = getRelativeDayBadge(date);

                return (
                  <div key={date} className="bg-stone-50/80 rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs">
                    {/* Date Section Header */}
                    <div className="p-3 bg-stone-100/90 border-b border-stone-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-lg border ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-600">
                          {date} ({badge.sub})
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-500 font-bold">
                        {`${dayEntries.length} ${t.mealsCount}`}
                      </span>
                    </div>

                    {/* Meal items for this date */}
                    <div className="divide-y divide-stone-100 bg-white">
                      {dayEntries.map((entry) => {
                        const slotInfo = getSlotDetails(entry.slot);
                        const matchedRecipe = recipes.find((r) => r.id === entry.recipeId);
                        const displayTitle = matchedRecipe ? getLocalizedRecipe(matchedRecipe, lang).displayTitle : entry.recipeName;

                        return (
                          <div
                            key={entry.id}
                            className="p-3 sm:p-3.5 flex items-center justify-between gap-3 hover:bg-amber-50/30 transition"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border flex items-center gap-1 shrink-0 ${slotInfo.color}`}>
                                <span>{slotInfo.emoji}</span>
                                <span>{slotInfo.label}</span>
                              </span>
                              <div className="min-w-0">
                                <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm truncate">
                                  {displayTitle}
                                </h4>
                                {matchedRecipe && (
                                  <span className="text-[10px] text-stone-500 block truncate">
                                    {matchedRecipe.imageEmoji} {matchedRecipe.category} • {matchedRecipe.cookTimeMins} {t.minutes}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              {matchedRecipe && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onClose();
                                    onOpenRecipe(matchedRecipe);
                                  }}
                                  className="text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-xl border border-emerald-200 transition active:scale-95 flex items-center gap-1"
                                >
                                  <span>{t.viewRecipe}</span>
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDelete(entry.id)}
                                className="text-stone-300 hover:text-rose-600 p-1.5 rounded-lg hover:bg-stone-100 transition"
                                title={t.deleteMember || 'Delete'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-[11px] text-stone-500 hover:text-stone-800 font-semibold flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{t.resetDefaultHistory}</span>
            </button>
            <span className="text-stone-300">•</span>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 hover:underline"
            >
              <Trash2 className="w-3 h-3" />
              <span>{t.clearAllHistory}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
