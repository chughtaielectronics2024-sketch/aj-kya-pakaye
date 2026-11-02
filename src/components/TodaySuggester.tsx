import React, { useState, useMemo, useRef } from 'react';
import { Recipe, FamilyMember, MealHistoryEntry, Season, MealSlot, Language } from '../types';
import { translations } from '../data/translations';
import { getSmartRecommendations } from '../services/recommendationEngine';
import { getLocalizedRecipe } from '../services/recipeLocalization';
import { PastMealsModal } from './PastMealsModal';
import { AiKitchenModal } from './AiKitchenModal';
import { AiKitchenSuggestionCard } from './AiKitchenSuggestionCard';
import { generateAiMenuCombos, findDishLastCooked } from '../services/aiKitchenService';
import { GoogleAdBanner } from './GoogleAdBanner';
import { 
  Sparkles, RotateCw, CheckCircle2, Eye, Heart, Clock, Utensils, 
  ShieldAlert, ShieldCheck, Flame, Scale, Shuffle, Check, ChevronRight,
  ChevronDown, Search, X, ChefHat, BookOpen, Layers
} from 'lucide-react';

interface Props {
  recipes: Recipe[];
  familyMembers: FamilyMember[];
  history: MealHistoryEntry[];
  season: Season;
  lang: Language;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onMarkCooked: (recipe: Recipe, slot: MealSlot) => void;
  onUpdateHistory?: (history: MealHistoryEntry[]) => void;
}

export const TodaySuggester: React.FC<Props> = ({
  recipes,
  familyMembers,
  history,
  season,
  lang,
  favorites,
  onToggleFavorite,
  onOpenRecipe,
  onMarkCooked,
  onUpdateHistory
}) => {
  const t = translations[lang] || translations.ur;
  
  // State for big button, slot selection, full menu, and AI Kitchen modal
  const [isSlotPickerOpen, setIsSlotPickerOpen] = useState<boolean>(false);
  const [selectedSlot, setSelectedSlot] = useState<MealSlot | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuViewMode, setMenuViewMode] = useState<'all' | 'spotlight'>('all');
  const [menuSearchQuery, setMenuSearchQuery] = useState<string>('');
  const [isAiKitchenOpen, setIsAiKitchenOpen] = useState<boolean>(false);

  // Dynamic AI Kitchen menu suggestions state (cycles every time AI Kitchen button is clicked)
  const [isAiSuggestionActive, setIsAiSuggestionActive] = useState<boolean>(false);
  const [aiSuggestionIndex, setAiSuggestionIndex] = useState<number>(0);

  const aiCombos = useMemo(() => {
    return generateAiMenuCombos(recipes, familyMembers, history, season, lang);
  }, [recipes, familyMembers, history, season, lang]);

  const currentAiCombo = aiCombos[aiSuggestionIndex % (aiCombos.length || 1)];

  const handleAiKitchenButtonClick = () => {
    if (!isAiSuggestionActive) {
      setIsAiSuggestionActive(true);
    } else {
      // User clicked again: Rotate to the next menu suggestion!
      setAiSuggestionIndex(prev => prev + 1);
    }
  };
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [justMarked, setJustMarked] = useState<string | null>(null);
  const [isPastMealsOpen, setIsPastMealsOpen] = useState(false);
  const menuSectionRef = useRef<HTMLDivElement>(null);

  // Group recipes by slot
  const nashtaRecipes = useMemo(() => recipes.filter(r => r.category === 'nashta'), [recipes]);
  const dopaharRecipes = useMemo(() => recipes.filter(r => r.category === 'sabzi' || r.category === 'daal'), [recipes]);
  const raatRecipes = useMemo(() => recipes.filter(r => r.category !== 'nashta'), [recipes]);

  // Current slot recipe list (Only the selected slot's recipes are returned; others remain completely hidden)
  const currentSlotRecipes = useMemo(() => {
    if (!selectedSlot) return [];
    let list: Recipe[] = [];
    if (selectedSlot === 'nashta') list = nashtaRecipes;
    else if (selectedSlot === 'dopahar') list = dopaharRecipes;
    else if (selectedSlot === 'raat') list = raatRecipes;

    if (!menuSearchQuery.trim()) return list;
    const q = menuSearchQuery.toLowerCase().trim();
    return list.filter(r => {
      const loc = getLocalizedRecipe(r, lang);
      return (
        loc.displayTitle.toLowerCase().includes(q) ||
        loc.displaySubTitle.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        (r.nativeName && r.nativeName.toLowerCase().includes(q)) ||
        r.category.toLowerCase().includes(q)
      );
    });
  }, [selectedSlot, nashtaRecipes, dopaharRecipes, raatRecipes, menuSearchQuery, lang]);

  // Calculate smart recommendations based on history, family, and season in current language
  const recommendations = useMemo(() => {
    return getSmartRecommendations(recipes, familyMembers, history, season, selectedSlot || 'dopahar', lang);
  }, [recipes, familyMembers, history, season, selectedSlot, lang]);

  const currentResult = recommendations[currentIndex % (recommendations.length || 1)];
  const rawRecipe = currentResult ? currentResult.recipe : recipes[0];
  const currentRecipe = rawRecipe ? getLocalizedRecipe(rawRecipe, lang) : null;
  const isFav = currentRecipe ? favorites.includes(currentRecipe.id) : false;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const handleMarkCooked = (targetRecipe?: Recipe) => {
    const rToMark = targetRecipe ? getLocalizedRecipe(targetRecipe, lang) : currentRecipe;
    if (!rToMark) return;
    onMarkCooked(rToMark, selectedSlot || 'dopahar');
    setJustMarked(rToMark.id);
    setTimeout(() => {
      setJustMarked(null);
    }, 1500);
  };

  const handleHideOnlyMenu = () => {
    setIsMenuOpen(false);
    setSelectedSlot(null);
    // Upper slot picker buttons (Breakfast, Lunch, Dinner) STAY VISIBLE
    setMenuSearchQuery('');
  };

  const handleCloseAllMenu = () => {
    setIsMenuOpen(false);
    setSelectedSlot(null);
    setIsSlotPickerOpen(false);
    setMenuSearchQuery('');
  };

  const handleToggleSlotPicker = () => {
    if (isSlotPickerOpen) {
      handleCloseAllMenu();
    } else {
      setIsSlotPickerOpen(true);
    }
  };

  const handleSelectSlot = (slot: MealSlot) => {
    if (selectedSlot === slot && isMenuOpen) {
      // Toggle off only the recipe menu list, keeping the upper buttons visible
      handleHideOnlyMenu();
    } else {
      // Open only this selected menu, hiding the other two menus
      setSelectedSlot(slot);
      setCurrentIndex(0);
      setIsMenuOpen(true);
      setMenuSearchQuery('');
      setTimeout(() => {
        menuSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner with BIG BOLD INTERACTIVE BUTTON & AI KITCHEN */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-stone-900 rounded-3xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden select-none">
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-[11px] font-bold border border-white/10 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>{t.askQuestionPrompt}</span>
          </div>

          {/* MAIN BIG & BOLD CARD FOR 'WHAT TO COOK TODAY' WITH AI KITCHEN & OPEN BUTTONS */}
          <div className="w-full bg-emerald-600/35 border-2 border-emerald-400/60 rounded-3xl p-4 sm:p-5 shadow-lg backdrop-blur-md">
            <div className="space-y-3.5">
              {/* Row 1: Title & Subtitle with full width - never overlapped by buttons */}
              <div 
                className="w-full cursor-pointer group text-start"
                onClick={handleToggleSlotPicker}
              >
                <div className="flex items-center rtl:items-start gap-2.5 rtl:gap-3">
                  <span className="text-2xl sm:text-3xl select-none shrink-0 rtl:mt-1">🍽️</span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight sm:leading-snug rtl:leading-[1.85] text-start group-hover:text-emerald-100 transition">
                    {t.whatToCookToday}
                  </h1>
                </div>
                <div className="mt-1 flex items-center rtl:items-start gap-2 text-start">
                  <Sparkles className="w-4 h-4 text-emerald-300 shrink-0 rtl:mt-1" />
                  <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-normal rtl:leading-[1.85] text-start">
                    {t.whatToCookSubtitle}
                  </p>
                </div>
              </div>

              {/* Row 2: Action Buttons (AI Kitchen + Open/Close) positioned cleanly below */}
              <div className="flex items-center gap-2.5 flex-wrap pt-1 border-t border-emerald-400/25">
                {/* AI Kitchen Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAiKitchenButtonClick();
                  }}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all duration-150 active:scale-95 cursor-pointer border ${
                    isAiSuggestionActive
                      ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-stone-950 border-amber-200 ring-2 ring-amber-300/60'
                      : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 border-amber-300'
                  }`}
                  title={t.aiKitchenClickHint}
                >
                  <Sparkles className="w-4 h-4 text-stone-950 shrink-0" />
                  <span className="leading-normal font-black">AI Kitchen</span>
                  {isAiSuggestionActive && (
                    <span className="text-[10px] bg-stone-950/15 text-stone-950 px-1.5 py-0.5 rounded-md font-bold">
                      🔄
                    </span>
                  )}
                </button>

                {/* Open / Close Button */}
                <button
                  type="button"
                  onClick={handleToggleSlotPicker}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs sm:text-sm border border-white/25 shadow-xs transition-all duration-150 active:scale-95 cursor-pointer"
                >
                  <span className="leading-normal">{isSlotPickerOpen ? t.closeOptions : t.openOptions}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isSlotPickerOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* SUB-BUTTONS: BREAKFAST, LUNCH, DINNER */}
          {isSlotPickerOpen && (
            <div className="pt-1.5 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-200 px-1">
                <span className="flex items-center gap-1">
                  <span>👇</span>
                  <span>{t.selectMealTime}</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-normal">
                  {t.chooseOne}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {/* 1. Breakfast (ناشتہ) */}
                <button
                  type="button"
                  onClick={() => handleSelectSlot('nashta')}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl border transition active:scale-95 text-center shadow-md cursor-pointer ${
                    selectedSlot === 'nashta' && isMenuOpen
                      ? 'bg-amber-500 border-amber-200 text-white ring-4 ring-amber-400/40 font-black scale-[1.02]'
                      : 'bg-white/15 hover:bg-white/25 border-white/20 text-white font-bold'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl mb-0.5">🍳</span>
                  <span className="text-xs sm:text-sm font-black leading-snug rtl:leading-[1.7]">{t.slotBreakfast}</span>
                  <span className={`text-[10px] sm:text-xs mt-1 px-2.5 py-1 rounded-full font-semibold inline-flex items-center justify-center leading-normal ${
                    selectedSlot === 'nashta' && isMenuOpen ? 'bg-amber-700 text-amber-100' : 'bg-black/25 opacity-90'
                  }`}>
                    {selectedSlot === 'nashta' && isMenuOpen ? t.openBadge : `${nashtaRecipes.length} ${t.dishesCountLabel}`}
                  </span>
                </button>

                {/* 2. Lunch (دوپہر کا کھانا) */}
                <button
                  type="button"
                  onClick={() => handleSelectSlot('dopahar')}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl border transition active:scale-95 text-center shadow-md cursor-pointer ${
                    selectedSlot === 'dopahar' && isMenuOpen
                      ? 'bg-emerald-500 border-emerald-200 text-white ring-4 ring-emerald-400/40 font-black scale-[1.02]'
                      : 'bg-white/15 hover:bg-white/25 border-white/20 text-white font-bold'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl mb-0.5">🍲</span>
                  <span className="text-xs sm:text-sm font-black leading-snug rtl:leading-[1.7]">{t.slotLunch}</span>
                  <span className={`text-[10px] sm:text-xs mt-1 px-2.5 py-1 rounded-full font-semibold inline-flex items-center justify-center leading-normal ${
                    selectedSlot === 'dopahar' && isMenuOpen ? 'bg-emerald-700 text-emerald-100' : 'bg-black/25 opacity-90'
                  }`}>
                    {selectedSlot === 'dopahar' && isMenuOpen ? t.openBadge : `${dopaharRecipes.length} ${t.dishesCountLabel}`}
                  </span>
                </button>

                {/* 3. Dinner (رات کا کھانا) */}
                <button
                  type="button"
                  onClick={() => handleSelectSlot('raat')}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-2xl border transition active:scale-95 text-center shadow-md cursor-pointer ${
                    selectedSlot === 'raat' && isMenuOpen
                      ? 'bg-indigo-600 border-indigo-200 text-white ring-4 ring-indigo-400/40 font-black scale-[1.02]'
                      : 'bg-white/15 hover:bg-white/25 border-white/20 text-white font-bold'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl mb-0.5">🌙</span>
                  <span className="text-xs sm:text-sm font-black leading-snug rtl:leading-[1.7]">{t.slotDinner}</span>
                  <span className={`text-[10px] sm:text-xs mt-1 px-2.5 py-1 rounded-full font-semibold inline-flex items-center justify-center leading-normal ${
                    selectedSlot === 'raat' && isMenuOpen ? 'bg-indigo-800 text-indigo-100' : 'bg-black/25 opacity-90'
                  }`}>
                    {selectedSlot === 'raat' && isMenuOpen ? t.openBadge : `${raatRecipes.length} ${t.dishesCountLabel}`}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* COMPLETE OPENED MEAL MENU SECTION (Rendered on top directly under slot buttons) */}
      {isMenuOpen && (
        <div ref={menuSectionRef} className="space-y-3.5 animate-in fade-in duration-300">
          {/* Menu Title Header & View Switcher */}
          <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl sm:text-3xl">
                  {selectedSlot === 'nashta' ? '🍳' : selectedSlot === 'dopahar' ? '🍲' : '🌙'}
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight">
                    {selectedSlot === 'nashta' && t.menuAllBreakfast}
                    {selectedSlot === 'dopahar' && t.menuAllLunch}
                    {selectedSlot === 'raat' && t.menuAllDinner}
                  </h2>
                  <p className="text-[11px] text-stone-500 font-medium">
                    {`${currentSlotRecipes.length} ${t.menuCountAvailable}`}
                  </p>
                </div>
              </div>

              {/* View Mode Toggle & Close Button */}
              <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                <div className="flex items-center bg-stone-100 p-1 rounded-2xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setMenuViewMode('all')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition active:scale-95 cursor-pointer ${
                      menuViewMode === 'all'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{t.allDishes}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuViewMode('spotlight')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition active:scale-95 cursor-pointer ${
                      menuViewMode === 'spotlight'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.spotlight}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleHideOnlyMenu}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition active:scale-95 cursor-pointer shadow-xs"
                  title={t.hideAllMenuDesc}
                >
                  <X className="w-3.5 h-3.5" />
                  <span>{t.hideAllMenu}</span>
                </button>
              </div>
            </div>

            {/* Search Filter Bar inside Slot Menu */}
            {menuViewMode === 'all' && (
              <div className="pt-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 rtl:right-3 rtl:left-auto top-3" />
                  <input
                    type="text"
                    value={menuSearchQuery}
                    onChange={(e) => setMenuSearchQuery(e.target.value)}
                    placeholder={t.searchInMenuPlaceholder}
                    className="w-full py-2.5 px-9 rounded-2xl bg-stone-50 border border-stone-200 focus:border-emerald-500 focus:bg-white text-xs text-stone-900 outline-none transition text-start leading-[1.7]"
                  />
                  {menuSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMenuSearchQuery('')}
                      className="absolute right-3 rtl:left-3 rtl:right-auto top-2.5 text-stone-400 hover:text-stone-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* VIEW MODE 1: ALL DISHES GRID / LIST */}
          {menuViewMode === 'all' && (
            <div className="space-y-3">
              {currentSlotRecipes.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center text-stone-500 text-xs">
                  <p className="font-bold text-sm text-stone-800 mb-1">
                    {t.noDishesFound}
                  </p>
                  <p>{t.trySearchingElse}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentSlotRecipes.map((recipe) => {
                    const loc = getLocalizedRecipe(recipe, lang);
                    const isRecipeFav = favorites.includes(recipe.id);
                    const isJustCooked = justMarked === recipe.id;
                    const lastCooked = findDishLastCooked(recipe, history, lang);

                    return (
                      <div
                        key={recipe.id}
                        className="bg-white rounded-3xl border border-stone-200/90 hover:border-emerald-200 p-4 shadow-xs transition hover:shadow-sm flex flex-col justify-between"
                      >
                        <div>
                          {/* Dish Header */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-3xl shrink-0 p-1.5 bg-emerald-50 rounded-2xl border border-emerald-100">
                                {recipe.imageEmoji}
                              </span>
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800">
                                    {loc.displayCategory}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-stone-100 text-stone-700">
                                    {recipe.prepTimeMins + recipe.cookTimeMins} {t.minutes}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-200">
                                    📅 {lastCooked.badgeText}
                                  </span>
                                </div>
                                <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug mt-0.5 truncate">
                                  {loc.displayTitle}
                                </h3>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => onToggleFavorite(recipe.id)}
                              className={`p-2 rounded-xl transition border active:scale-90 shrink-0 cursor-pointer ${
                                isRecipeFav
                                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                                  : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-rose-500'
                              }`}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isRecipeFav ? 'fill-current' : ''}`} />
                            </button>
                          </div>

                          <p className="text-[11px] text-stone-500 line-clamp-2 mb-3 leading-relaxed">
                            {loc.displaySubTitle}
                          </p>

                          {/* Quick Mini Specs */}
                          <div className="grid grid-cols-3 gap-1.5 bg-stone-50/80 p-2 rounded-2xl border border-stone-100 mb-3 text-center text-[10px]">
                            <div>
                              <span className="text-stone-400 block">{t.calories}</span>
                              <strong className="text-stone-800 font-bold">{recipe.nutrition.calories} kcal</strong>
                            </div>
                            <div>
                              <span className="text-stone-400 block">{t.estimatedCost}</span>
                              <strong className="text-emerald-700 font-bold">~{recipe.estimatedCostPkr} PKR</strong>
                            </div>
                            <div>
                              <span className="text-stone-400 block">{t.bestUtensil}</span>
                              <strong className="text-stone-800 font-bold truncate block">{recipe.utensil.type}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons: View Recipe & Cooked This */}
                        <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => onOpenRecipe(recipe)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold transition active:scale-95 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-stone-600" />
                            <span>{t.viewRecipe}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleMarkCooked(recipe)}
                            disabled={isJustCooked}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                              isJustCooked
                                ? 'bg-emerald-700 text-white'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                            }`}
                          >
                            {isJustCooked ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>{t.recordedSuccess}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{t.cookedThisToday}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: SPOTLIGHT RECOMMENDATION CARD */}
          {menuViewMode === 'spotlight' && currentRecipe && (
            <div className="bg-white rounded-3xl border border-emerald-100/90 shadow-md overflow-hidden transition-all duration-300">
              {/* Recommendation Reason Banner */}
              <div className="bg-emerald-50/80 border-b border-emerald-100 px-4 py-2.5 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-900 font-semibold min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="truncate">
                    {t.whyRecommended}: <strong className="text-stone-900 font-bold">{currentResult?.reason}</strong>
                  </span>
                </div>

                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full shrink-0">
                  {currentIndex + 1}/{recommendations.length}
                </span>
              </div>

              <div className="p-4 sm:p-5">
                {/* Dish Title & Badges */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                      <span className="text-2xl">{currentRecipe.imageEmoji}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {currentRecipe.displayCategory}
                      </span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full font-semibold bg-stone-100 text-stone-700">
                        {currentRecipe.season === 'all' ? t.seasonAll : currentRecipe.season === 'summer' ? t.seasonSummer : t.seasonWinter}
                      </span>
                      {currentResult?.seasonMatch && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full font-semibold bg-teal-100 text-teal-800 border border-teal-200 truncate">
                          {t.freshInBazaar}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight leading-snug">
                      {currentRecipe.displayTitle}
                    </h3>
                    <p className="text-[11px] text-stone-500 font-medium truncate mt-0.5">
                      {currentRecipe.displaySubTitle}
                    </p>
                  </div>

                  <button
                    onClick={() => onToggleFavorite(currentRecipe.id)}
                    className={`p-2.5 rounded-2xl transition border active:scale-90 shrink-0 ${
                      isFav
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : 'bg-stone-50 border-stone-200 text-stone-400 hover:text-rose-500'
                    }`}
                    title={isFav ? t.savedInFavorites : t.saveToFavorites}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Utensil Advice Card */}
                <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-3 mb-4 flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div className="text-[11px] leading-relaxed min-w-0">
                    <p className="font-bold text-stone-900 truncate">
                      {t.bestUtensil}: <span className="text-emerald-700">{currentRecipe.utensil.name}</span>
                    </p>
                    <p className="text-stone-600 mt-0.5 line-clamp-2">{currentRecipe.utensil.reason}</p>
                  </div>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-center">
                  <div className="p-2.5 bg-emerald-50/40 rounded-2xl border border-emerald-100/70">
                    <span className="text-[10px] text-stone-500 font-medium block">{t.prepTime} + {t.cookTime}</span>
                    <span className="text-xs font-black text-stone-800">
                      {currentRecipe.prepTimeMins + currentRecipe.cookTimeMins} {t.minutes}
                    </span>
                  </div>
                  <div className="p-2.5 bg-emerald-50/40 rounded-2xl border border-emerald-100/70">
                    <span className="text-[10px] text-stone-500 font-medium block">{t.calories}</span>
                    <span className="text-xs font-black text-stone-800">
                      {currentRecipe.nutrition.calories} kcal
                    </span>
                  </div>
                  <div className="p-2.5 bg-emerald-50/40 rounded-2xl border border-emerald-100/70">
                    <span className="text-[10px] text-stone-500 font-medium block">{t.protein} / {t.carbs}</span>
                    <span className="text-xs font-black text-stone-800">
                      {currentRecipe.nutrition.proteinG}g / {currentRecipe.nutrition.carbsG}g
                    </span>
                  </div>
                  <div className="p-2.5 bg-emerald-50/40 rounded-2xl border border-emerald-100/70">
                    <span className="text-[10px] text-stone-500 font-medium block">{t.estimatedCost}</span>
                    <span className="text-xs font-black text-emerald-800">
                      ~{currentRecipe.estimatedCostPkr} {t.pkrCurrency}
                    </span>
                  </div>
                </div>

                {/* Family Health Compliance Overview */}
                {currentResult && currentResult.parhezAudit.length > 0 && (
                  <div className="mb-4 bg-stone-50 border border-stone-200 rounded-2xl p-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 mb-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{t.parhezAlertTitle}:</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      {currentResult.parhezAudit
                        .filter((item, idx, arr) => arr.findIndex(x => x.member.id === item.member.id || x.member.name === item.member.name) === idx)
                        .slice(0, 2)
                        .map((item, idx) => (
                        <div 
                          key={idx} 
                          className={`p-2 rounded-xl flex items-start gap-1.5 ${
                            item.status === 'avoid'
                              ? 'bg-rose-50 text-rose-900 border border-rose-200'
                              : item.status === 'caution'
                              ? 'bg-amber-50 text-amber-900 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                          }`}
                        >
                          {item.status === 'avoid' ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          ) : (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <span className="font-bold">{item.member.name}: </span>
                            <span>{item.tip}</span>
                            {item.substitute && (
                              <span className="block font-semibold text-emerald-800 mt-0.5">
                                {t.substituteTip}: {item.substitute}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile Touch Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleMarkCooked()}
                    disabled={justMarked === currentRecipe.id}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-black text-xs shadow-md active:scale-96 transition ${
                      justMarked === currentRecipe.id
                        ? 'bg-emerald-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
                    }`}
                  >
                    {justMarked === currentRecipe.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{t.recordedSuccess}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t.cookedThisToday}</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl font-bold text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 active:scale-95 transition"
                    >
                      <Shuffle className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{t.suggestAnother}</span>
                    </button>

                    <button
                      onClick={() => onOpenRecipe(rawRecipe)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl font-bold text-xs border border-stone-300 hover:bg-stone-50 text-stone-800 active:scale-95 transition"
                    >
                      <Eye className="w-4 h-4 text-stone-600 shrink-0" />
                      <span>{t.viewRecipe}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Bottom Button to close opened menu list while keeping slot buttons visible */}
          <div className="pt-2 pb-1 flex justify-center">
            <button
              type="button"
              onClick={handleHideOnlyMenu}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white hover:bg-rose-50 text-rose-700 hover:text-rose-800 font-bold text-xs transition active:scale-95 border border-stone-200 hover:border-rose-200 cursor-pointer shadow-xs"
            >
              <X className="w-4 h-4 text-rose-600" />
              <span>{t.hideAllMenu}</span>
            </button>
          </div>
        </div>
      )}

      {/* DYNAMIC AI KITCHEN SUGGESTION CARD (Appears on click & changes every time user clicks AI Kitchen button) */}
      {isAiSuggestionActive && currentAiCombo && (
        <AiKitchenSuggestionCard
          combo={currentAiCombo}
          lang={lang}
          onNextCombo={() => setAiSuggestionIndex(prev => prev + 1)}
          onOpenRecipe={onOpenRecipe}
          onMarkCooked={onMarkCooked}
          onOpenFullModal={() => setIsAiKitchenOpen(true)}
          onClose={() => setIsAiSuggestionActive(false)}
        />
      )}

      {/* Responsive In-Content Google Ads Banner */}
      <GoogleAdBanner lang={lang} slotId="home-bottom-slot" />

      {/* Dedicated Past Cooked Meals History Modal */}
      <PastMealsModal
        isOpen={isPastMealsOpen}
        onClose={() => setIsPastMealsOpen(false)}
        history={history}
        recipes={recipes}
        lang={lang}
        onOpenRecipe={onOpenRecipe}
        onUpdateHistory={onUpdateHistory || (() => {})}
      />

      {/* Dedicated AI Kitchen Smart Suggestions Modal */}
      <AiKitchenModal
        isOpen={isAiKitchenOpen}
        onClose={() => setIsAiKitchenOpen(false)}
        recipes={recipes}
        familyMembers={familyMembers}
        history={history}
        season={season}
        lang={lang}
        onOpenRecipe={onOpenRecipe}
        onMarkCooked={onMarkCooked}
      />
    </div>
  );
};
