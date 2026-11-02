import React, { useState } from 'react';
import { Recipe, WeeklyPlan, MealSlot, Language, Season, MealHistoryEntry } from '../types';
import { translations } from '../data/translations';
import { getLocalizedRecipe } from '../services/recipeLocalization';
import { PastMealsModal } from './PastMealsModal';
import { 
  Calendar as CalendarIcon, Wand2, Trash2, ShoppingBag, Plus, 
  ChevronRight, ChevronLeft, Check, Sparkles, History 
} from 'lucide-react';

interface Props {
  recipes: Recipe[];
  weeklyPlan: WeeklyPlan;
  onUpdateWeeklyPlan: (newPlan: WeeklyPlan) => void;
  lang: Language;
  season?: Season;
  onOpenRecipe: (recipe: Recipe) => void;
  onSyncToGrocery: () => void;
  history?: MealHistoryEntry[];
  onUpdateHistory?: (history: MealHistoryEntry[]) => void;
}

export const WeeklyCalendar: React.FC<Props> = ({
  recipes,
  weeklyPlan,
  onUpdateWeeklyPlan,
  lang,
  season = 'all',
  onOpenRecipe,
  onSyncToGrocery,
  history = [],
  onUpdateHistory
}) => {
  const t = translations[lang] || translations.ur;
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [slotPickerModal, setSlotPickerModal] = useState<{ day: number; slot: MealSlot } | null>(null);
  const [pickerSeasonFilter, setPickerSeasonFilter] = useState<'all' | 'winter' | 'summer'>('all');
  const [dinnerCategoryFilter, setDinnerCategoryFilter] = useState<'all' | 'daal' | 'rice' | 'fastfood' | 'sabzi'>('all');
  const [isPastMealsOpen, setIsPastMealsOpen] = useState(false);

  const getDayName = (idx: number) => {
    switch (idx) {
      case 0: return t.monday;
      case 1: return t.tuesday;
      case 2: return t.wednesday;
      case 3: return t.thursday;
      case 4: return t.friday;
      case 5: return t.saturday;
      case 6: return t.sunday;
      default: return '';
    }
  };

  const getRecipeById = (id?: string) => {
    if (!id) return null;
    const raw = recipes.find((r) => r.id === id);
    if (!raw) return null;
    return getLocalizedRecipe(raw, lang);
  };

  const handleAutoFillWeek = () => {
    const nashtaRecipes = recipes.filter(r => r.category === 'nashta');
    const sabziRecipes = recipes.filter(r => r.category === 'sabzi');
    const daalRecipes = recipes.filter(r => r.category === 'daal');
    const meatRecipes = recipes.filter(r => r.category === 'chicken' || r.category === 'mutton' || r.category === 'beef');
    const riceRecipes = recipes.filter(r => r.category === 'rice' || r.id.includes('daal-chawal') || r.id.includes('biryani') || r.id.includes('pulao'));

    const newPlan: WeeklyPlan = {};

    // Culturally authentic weekly meal schedule for Pakistani households:
    const nashtaIds = [
      'anda-paratha-omelette',
      'anda-paratha-halffry',
      'naan-chanay',
      'anda-paratha-boiled',
      'chai-paratha',
      'siri-paaye',
      'halwa-puri'
    ];

    const winterDopaharIds = [
      'sarson-saag-roti',
      'gajar-matar-aloo-roti',
      'gobhi-matar-aloo-roti',
      'shaljam-bhujia-roti',
      'methi-aloo-roti',
      'palak-aloo-roti',
      'mooli-bhujia-roti'
    ];

    const summerDopaharIds = [
      'bhindi-masala-roti',
      'karelay-pyaz-roti',
      'tori-bhujia-roti',
      'kaddu-lauki-roti',
      'tinda-masala-roti',
      'aloo-baingan-roti',
      'arvi-masala-roti'
    ];

    const mixedDopaharIds = [
      'gajar-matar-aloo-roti',
      'bhindi-masala-roti',
      'sarson-saag-roti',
      'tori-bhujia-roti',
      'palak-aloo-roti',
      'karelay-pyaz-roti',
      'gobhi-matar-aloo-roti'
    ];

    const dopaharIds = season === 'summer' 
      ? summerDopaharIds 
      : season === 'winter' 
      ? winterDopaharIds 
      : mixedDopaharIds;

    const raatIds = [
      'white-rice-moong-masoor',
      'chicken-biryani',
      'white-rice-daal-chana',
      'chicken-pulao',
      'white-rice-sabut-masoor',
      'crispy-zinger-burger',
      'chicken-tikka-pizza'
    ];

    for (let day = 0; day < 7; day++) {
      const nashta = recipes.find(r => r.id === nashtaIds[day]) || nashtaRecipes[day % nashtaRecipes.length] || recipes[0];
      const dopahar = recipes.find(r => r.id === dopaharIds[day]) || sabziRecipes[day % sabziRecipes.length] || recipes[1];
      const raat = recipes.find(r => r.id === raatIds[day]) || meatRecipes[day % meatRecipes.length] || recipes[2];

      newPlan[day] = {
        nashta: nashta?.id,
        dopahar: dopahar?.id,
        raat: raat?.id
      };
    }

    onUpdateWeeklyPlan(newPlan);
  };

  const handleClearWeek = () => {
    onUpdateWeeklyPlan({});
  };

  const handleSelectSlotRecipe = (recipeId: string) => {
    if (!slotPickerModal) return;
    const { day, slot } = slotPickerModal;
    const currentDayPlan = weeklyPlan[day] || {};
    const updatedPlan: WeeklyPlan = {
      ...weeklyPlan,
      [day]: {
        ...currentDayPlan,
        [slot]: recipeId
      }
    };
    onUpdateWeeklyPlan(updatedPlan);
    setSlotPickerModal(null);
  };

  let totalWeekCost = 0;
  Object.values(weeklyPlan).forEach(dp => {
    if (dp.nashta) {
      const r = getRecipeById(dp.nashta);
      if (r) totalWeekCost += r.estimatedCostPkr;
    }
    if (dp.dopahar) {
      const r = getRecipeById(dp.dopahar);
      if (r) totalWeekCost += r.estimatedCostPkr;
    }
    if (dp.raat) {
      const r = getRecipeById(dp.raat);
      if (r) totalWeekCost += r.estimatedCostPkr;
    }
  });

  return (
    <div className="space-y-4">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="text-start">
          <div className="flex items-center gap-2 mb-1">
            <CalendarIcon className="w-5 h-5 text-emerald-700 shrink-0" />
            <h2 className="text-xl font-extrabold text-stone-900 leading-tight sm:leading-snug rtl:leading-[1.7]">
              {t.weeklyCalendar}
            </h2>
          </div>
          <p className="text-xs text-stone-500 leading-normal rtl:leading-[1.6]">
            {t.weeklyCalendarDesc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPastMealsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition active:scale-95"
            title={t.pastCookedMeals}
          >
            <History className="w-3.5 h-3.5" />
            <span>{t.pastCookedMeals}</span>
          </button>

          <button
            onClick={handleAutoFillWeek}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition active:scale-95"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>{t.autoFillWeek}</span>
          </button>

          <button
            onClick={onSyncToGrocery}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.syncPlanToGrocery}</span>
          </button>

          <button
            onClick={handleClearWeek}
            className="p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition"
            title={t.clearWeek}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Week Day Pills Navigator */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none snap-x">
        {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
          const isSelected = selectedDay === dayIdx;
          const dayPlan = weeklyPlan[dayIdx];
          const hasMeals = dayPlan && (dayPlan.nashta || dayPlan.dopahar || dayPlan.raat);

          return (
            <button
              key={dayIdx}
              onClick={() => setSelectedDay(dayIdx)}
              className={`flex-1 min-w-[85px] py-2 px-2.5 rounded-2xl text-center text-xs font-bold transition border snap-start ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/20'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-emerald-50/50'
              }`}
            >
              <span className="block text-[11px] truncate">{getDayName(dayIdx)}</span>
              <span className={`text-[10px] mt-0.5 inline-block ${isSelected ? 'text-emerald-100' : 'text-stone-400'}`}>
                {hasMeals ? t.menuPlanned : t.emptySlot.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Day's Detail Cards */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-4 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-stone-100 pb-3">
          <div className="text-start">
            <h3 className="text-base sm:text-lg font-black text-stone-900 leading-[1.7]">
              {getDayName(selectedDay)} {t.dayMenuTitle}
            </h3>
            <span className="text-xs text-stone-500 leading-normal">
              {t.clickToChange}
            </span>
          </div>

          <div className="text-end">
            <span className="text-[11px] text-stone-500 block">{t.totalEstimatedBudget}:</span>
            <span className="text-sm font-extrabold text-emerald-800">
              {totalWeekCost} {t.pkrCurrency}
            </span>
          </div>
        </div>

        {/* 3 Slots: Nashta, Dopahar, Raat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* 1. Nashta Slot */}
          {(() => {
            const recipe = getRecipeById(weeklyPlan[selectedDay]?.nashta);
            return (
              <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-3.5 sm:p-4 flex flex-col justify-between hover:border-emerald-300 transition">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    <span>{t.slotBreakfast}</span>
                    <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                      {t.slotBreakfast}
                    </span>
                  </div>

                  {recipe ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl shrink-0">{recipe.imageEmoji}</span>
                        <h4 className="font-extrabold text-stone-900 text-sm leading-snug line-clamp-1">{recipe.displayTitle}</h4>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1">{recipe.displaySubTitle}</p>
                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-white p-2 rounded-xl border border-stone-200">
                        <span>{recipe.prepTimeMins + recipe.cookTimeMins} {t.minutes}</span>
                        <span className="font-bold text-emerald-800">~{recipe.estimatedCostPkr} {t.pkrCurrency}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-stone-400">
                      {t.emptySlot}
                    </div>
                  )}
                </div>

                <div className="mt-3.5 pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSlotPickerModal({ day: selectedDay, slot: 'nashta' })}
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-xs font-bold text-stone-700 transition"
                  >
                    {t.changeDish}
                  </button>
                  {recipe && (
                    <button
                      onClick={() => onOpenRecipe(recipe)}
                      className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition active:scale-95"
                    >
                      {t.recipeDetail}
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          {/* 2. Dopahar Slot */}
          {(() => {
            const recipe = getRecipeById(weeklyPlan[selectedDay]?.dopahar);
            return (
              <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-3.5 sm:p-4 flex flex-col justify-between hover:border-emerald-300 transition">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    <span>{t.slotLunch}</span>
                    <span className="text-[10px] text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full font-bold">
                      {t.slotLunch}
                    </span>
                  </div>

                  {recipe ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl shrink-0">{recipe.imageEmoji}</span>
                        <h4 className="font-extrabold text-stone-900 text-sm leading-snug line-clamp-1">{recipe.displayTitle}</h4>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1">{recipe.displaySubTitle}</p>
                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-white p-2 rounded-xl border border-stone-200">
                        <span>{recipe.nutrition.calories} kcal</span>
                        <span className="font-bold text-emerald-800">~{recipe.estimatedCostPkr} {t.pkrCurrency}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-stone-400">
                      {t.emptySlot}
                    </div>
                  )}
                </div>

                <div className="mt-3.5 pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSlotPickerModal({ day: selectedDay, slot: 'dopahar' })}
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-xs font-bold text-stone-700 transition"
                  >
                    {t.changeDish}
                  </button>
                  {recipe && (
                    <button
                      onClick={() => onOpenRecipe(recipe)}
                      className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition active:scale-95"
                    >
                      {t.recipeDetail}
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          {/* 3. Raat Slot */}
          {(() => {
            const recipe = getRecipeById(weeklyPlan[selectedDay]?.raat);
            return (
              <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-3.5 sm:p-4 flex flex-col justify-between hover:border-emerald-300 transition">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    <span>{t.slotDinner}</span>
                    <span className="text-[10px] text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full font-bold">
                      {t.slotDinner}
                    </span>
                  </div>

                  {recipe ? (
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl shrink-0">{recipe.imageEmoji}</span>
                        <h4 className="font-extrabold text-stone-900 text-sm leading-snug line-clamp-1">{recipe.displayTitle}</h4>
                      </div>
                      <p className="text-xs text-stone-500 line-clamp-1">{recipe.displaySubTitle}</p>
                      <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600 bg-white p-2 rounded-xl border border-stone-200">
                        <span>{recipe.nutrition.proteinG}g {t.protein}</span>
                        <span className="font-bold text-emerald-800">~{recipe.estimatedCostPkr} {t.pkrCurrency}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-stone-400">
                      {t.emptySlot}
                    </div>
                  )}
                </div>

                <div className="mt-3.5 pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSlotPickerModal({ day: selectedDay, slot: 'raat' })}
                    className="flex-1 py-1.5 px-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 text-xs font-bold text-stone-700 transition"
                  >
                    {t.changeDish}
                  </button>
                  {recipe && (
                    <button
                      onClick={() => onOpenRecipe(recipe)}
                      className="py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition active:scale-95"
                    >
                      {t.recipeDetail}
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Recipe Slot Selection Modal */}
      {slotPickerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border border-emerald-100 max-h-[85vh] flex flex-col text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
              <div>
                <h3 className="font-extrabold text-base text-stone-900">
                  {t.selectDishModalTitle} {getDayName(slotPickerModal.day)}
                </h3>
                <span className="text-xs text-stone-500">
                  {slotPickerModal.slot === 'nashta' ? t.slotBreakfast : slotPickerModal.slot === 'dopahar' ? t.slotLunch : t.slotDinner}
                </span>
              </div>
              <button
                onClick={() => setSlotPickerModal(null)}
                className="p-1.5 rounded-full text-stone-400 hover:bg-stone-100"
              >
                ✕
              </button>
            </div>

            {/* Seasonal Filter Bar for Dopahar (Lunch Sabzi) */}
            {slotPickerModal.slot === 'dopahar' && (
              <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-2xl mb-3">
                <button
                  type="button"
                  onClick={() => setPickerSeasonFilter('all')}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition ${
                    pickerSeasonFilter === 'all'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.all}
                </button>
                <button
                  type="button"
                  onClick={() => setPickerSeasonFilter('winter')}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                    pickerSeasonFilter === 'winter'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-blue-700'
                  }`}
                >
                  <span>❄️</span>
                  <span>{t.seasonWinter}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPickerSeasonFilter('summer')}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition flex items-center justify-center gap-1 ${
                    pickerSeasonFilter === 'summer'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-amber-700'
                  }`}
                >
                  <span>☀️</span>
                  <span>{t.seasonSummer}</span>
                </button>
              </div>
            )}

            {/* Dinner Category Filter Bar for Raat */}
            {slotPickerModal.slot === 'raat' && (
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-2xl mb-3 overflow-x-auto text-[11px]">
                <button
                  type="button"
                  onClick={() => setDinnerCategoryFilter('all')}
                  className={`py-1.5 px-2.5 rounded-xl font-bold whitespace-nowrap transition ${
                    dinnerCategoryFilter === 'all'
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t.all}
                </button>
                <button
                  type="button"
                  onClick={() => setDinnerCategoryFilter('daal')}
                  className={`py-1.5 px-2.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1 ${
                    dinnerCategoryFilter === 'daal'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>🍚</span>
                  <span>{lang === 'en' ? 'White Rice & Daal' : 'دال چاول'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDinnerCategoryFilter('rice')}
                  className={`py-1.5 px-2.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1 ${
                    dinnerCategoryFilter === 'rice'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>🍗</span>
                  <span>{lang === 'en' ? 'Biryani & Pulao' : 'بریانی و پلاؤ'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDinnerCategoryFilter('fastfood')}
                  className={`py-1.5 px-2.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1 ${
                    dinnerCategoryFilter === 'fastfood'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>🍔</span>
                  <span>{lang === 'en' ? 'Fast Food' : 'فاسٹ فوڈ'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDinnerCategoryFilter('sabzi')}
                  className={`py-1.5 px-2.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1 ${
                    dinnerCategoryFilter === 'sabzi'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <span>🥗</span>
                  <span>{lang === 'en' ? 'Seasonal Sabzi & Roti' : 'موسمی سبزی و روٹی'}</span>
                </button>
              </div>
            )}

            <div className="overflow-y-auto space-y-2 py-2 pr-1">
              {recipes
                .filter((r) => {
                  if (slotPickerModal.slot === 'nashta') {
                    return r.category === 'nashta';
                  }
                  if (slotPickerModal.slot === 'dopahar') {
                    if (r.category !== 'sabzi') return false;
                    if (pickerSeasonFilter !== 'all' && r.season !== pickerSeasonFilter && r.season !== 'all') {
                      return false;
                    }
                    return true;
                  }
                  if (slotPickerModal.slot === 'raat') {
                    if (r.category === 'nashta') return false;
                    if (dinnerCategoryFilter === 'daal') {
                      return r.category === 'daal' || r.id.includes('daal');
                    }
                    if (dinnerCategoryFilter === 'rice') {
                      return r.id.includes('biryani') || r.id.includes('pulao');
                    }
                    if (dinnerCategoryFilter === 'fastfood') {
                      return r.id.includes('burger') || r.id.includes('pizza');
                    }
                    if (dinnerCategoryFilter === 'sabzi') {
                      if (r.category !== 'sabzi') return false;
                      if (season !== 'all' && r.season !== season && r.season !== 'all') return false;
                      return true;
                    }
                    // In 'all', if it's sabzi, filter out opposite season if a season is selected
                    if (r.category === 'sabzi') {
                      if (season !== 'all' && r.season !== season && r.season !== 'all') return false;
                    }
                    return true;
                  }
                  return true;
                })
                .map((r) => {
                const loc = getLocalizedRecipe(r, lang);
                return (
                  <button
                    key={r.id}
                    onClick={() => handleSelectSlotRecipe(r.id)}
                    className="w-full flex items-center justify-between p-3 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-start transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{r.imageEmoji}</span>
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-bold text-xs text-stone-900">{loc.displayTitle}</h4>
                          {r.category === 'sabzi' && r.season === 'winter' && (
                            <span className="text-[9px] bg-blue-100 text-blue-800 font-extrabold px-1.5 py-0.5 rounded-md">
                              ❄️ {t.seasonWinter}
                            </span>
                          )}
                          {r.category === 'sabzi' && r.season === 'summer' && (
                            <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-md">
                              ☀️ {t.seasonSummer}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500">{loc.displayCategory} • {r.nutrition.calories} kcal</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl shrink-0">
                      ~{r.estimatedCostPkr} {t.pkrCurrency}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Past Meals Modal */}
      <PastMealsModal
        isOpen={isPastMealsOpen}
        onClose={() => setIsPastMealsOpen(false)}
        history={history}
        recipes={recipes}
        lang={lang}
        onOpenRecipe={onOpenRecipe}
        onUpdateHistory={onUpdateHistory || (() => {})}
      />
    </div>
  );
};
