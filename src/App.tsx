/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Language, Season, Recipe, FamilyMember, MealHistoryEntry, 
  WeeklyPlan, GroceryItem, MarketRates, MealSlot 
} from './types';
import { 
  getStoredLanguage, saveStoredLanguage, getStoredSeason, saveStoredSeason,
  getStoredRecipes, saveStoredRecipes, getStoredFamily, saveStoredFamily,
  getStoredHistory, addMealHistoryEntry, getStoredWeeklyPlan, saveStoredWeeklyPlan,
  getStoredGrocery, saveStoredGrocery, getStoredRates, saveStoredRates,
  getStoredFavorites, toggleFavorite
} from './services/storage';
import { translations } from './data/translations';
import { getLocalizedRecipe } from './services/recipeLocalization';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { TodaySuggester } from './components/TodaySuggester';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { FamilyManager } from './components/FamilyManager';
import { GroceryBudget } from './components/GroceryBudget';
import { RecipeLibrary } from './components/RecipeLibrary';
import { AiChefChat } from './components/AiChefChat';
import { RecipeModal } from './components/RecipeModal';
import { CloudSyncModal } from './components/CloudSyncModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { TopBannerAd } from './components/TopBannerAd';

export default function App() {
  const [lang, setLang] = useState<Language>(getStoredLanguage());
  const [season, setSeason] = useState<Season>(getStoredSeason());
  const [recipes, setRecipes] = useState<Recipe[]>(getStoredRecipes());
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(getStoredFamily());
  const [history, setHistory] = useState<MealHistoryEntry[]>(getStoredHistory());
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>(getStoredWeeklyPlan());
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(getStoredGrocery());
  const [marketRates, setMarketRates] = useState<MarketRates>(getStoredRates());
  const [favorites, setFavorites] = useState<string[]>(getStoredFavorites());

  const [activeTab, setActiveTab] = useState<TabType>('suggest');
  const [modalRecipe, setModalRecipe] = useState<Recipe | null>(null);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const t = translations[lang] || translations.ur;

  // Sync RTL / LTR document attributes when language changes
  useEffect(() => {
    const isRtl = ['ur', 'ps', 'pa', 'ar', 'fa'].includes(lang);
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    saveStoredLanguage(newLang);
  };

  const handleSeasonChange = (newSeason: Season) => {
    setSeason(newSeason);
    saveStoredSeason(newSeason);
  };

  const handleSaveFamily = (updated: FamilyMember[]) => {
    setFamilyMembers(updated);
    saveStoredFamily(updated);
    showToast(t.toastFamilySaved);
  };

  const handleUpdateWeeklyPlan = (updated: WeeklyPlan) => {
    setWeeklyPlan(updated);
    saveStoredWeeklyPlan(updated);
  };

  const handleUpdateGrocery = (items: GroceryItem[]) => {
    setGroceryItems(items);
    saveStoredGrocery(items);
  };

  const handleUpdateRates = (rates: MarketRates) => {
    setMarketRates(rates);
    saveStoredRates(rates);
    showToast(t.toastRatesUpdated);
  };

  const handleToggleFav = (recipeId: string) => {
    const updated = toggleFavorite(recipeId);
    setFavorites(updated);
  };

  const handleMarkCooked = (recipe: Recipe, slot: MealSlot) => {
    const loc = getLocalizedRecipe(recipe, lang);
    addMealHistoryEntry(recipe.id, loc.displayTitle, slot);
    const updatedHistory = getStoredHistory();
    setHistory(updatedHistory);
    showToast(`"${loc.displayTitle}" ${t.toastCookedMarked}`);
  };

  const handleAddRecipeToGrocery = (recipe: Recipe) => {
    const loc = getLocalizedRecipe(recipe, lang);
    const newItems: GroceryItem[] = loc.ingredients.map((ing) => ({
      id: 'groc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      name: ing.name,
      nameUrdu: ing.name,
      category: ing.category,
      quantity: ing.quantity,
      approxPkr: ing.approxPkr,
      isBought: false,
      recipeId: recipe.id
    }));

    const combined = [...groceryItems, ...newItems];
    handleUpdateGrocery(combined);
    showToast(`"${loc.displayTitle}" ${t.toastRecipeAddedGrocery}`);
  };

  const handleSyncWeeklyPlanToGrocery = () => {
    const ingredientMap: Record<string, GroceryItem> = {};

    Object.values(weeklyPlan).forEach((dayPlan) => {
      const dayRecipeIds = [dayPlan.nashta, dayPlan.dopahar, dayPlan.raat].filter(Boolean) as string[];
      dayRecipeIds.forEach((rid) => {
        const recipe = recipes.find((r) => r.id === rid);
        if (recipe) {
          const loc = getLocalizedRecipe(recipe, lang);
          loc.ingredients.forEach((ing) => {
            const key = ing.name;
            if (!ingredientMap[key]) {
              ingredientMap[key] = {
                id: 'groc-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
                name: ing.name,
                nameUrdu: ing.name,
                category: ing.category,
                quantity: ing.quantity,
                approxPkr: ing.approxPkr,
                isBought: false
              };
            }
          });
        }
      });
    });

    const items = Object.values(ingredientMap);
    if (items.length === 0) {
      showToast(t.toastPlanEmptyAlert);
      return;
    }

    handleUpdateGrocery(items);
    setActiveTab('grocery');
    showToast(`${t.toastWeekSyncedGrocery} (${items.length})`);
  };

  const handleRefreshAllData = () => {
    setRecipes(getStoredRecipes());
    setFamilyMembers(getStoredFamily());
    setHistory(getStoredHistory());
    setWeeklyPlan(getStoredWeeklyPlan());
    setGroceryItems(getStoredGrocery());
    setMarketRates(getStoredRates());
    setFavorites(getStoredFavorites());
    setLang(getStoredLanguage());
    setSeason(getStoredSeason());
  };

  const isNastaliqLang = ['ur', 'pa', 'ps', 'ar', 'fa'].includes(lang);

  return (
    <div className={`min-h-screen bg-stone-200/50 flex flex-col ${isNastaliqLang ? 'font-nastaliq' : 'font-sans'} selection:bg-emerald-200 antialiased`}>
      {/* Responsive Mobile Container */}
      <div className="w-full max-w-xl md:max-w-2xl mx-auto min-h-screen bg-stone-50/80 sm:shadow-2xl sm:border-x sm:border-stone-200/80 flex flex-col relative pb-24 overflow-x-hidden">
        {/* Top Google Ads / Sponsor Banner */}
        <TopBannerAd lang={lang} />

        {/* Top Application Header */}
        <Header
          lang={lang}
          onLangChange={handleLangChange}
          season={season}
          onSeasonChange={handleSeasonChange}
          onOpenSync={() => setIsSyncModalOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 w-full px-3 py-3 sm:px-4 sm:py-4">
          {activeTab === 'suggest' && (
            <TodaySuggester
              recipes={recipes}
              familyMembers={familyMembers}
              history={history}
              season={season}
              lang={lang}
              favorites={favorites}
              onToggleFavorite={handleToggleFav}
              onOpenRecipe={(r) => setModalRecipe(r)}
              onMarkCooked={handleMarkCooked}
              onUpdateHistory={(updated) => setHistory(updated)}
            />
          )}

          {activeTab === 'calendar' && (
            <WeeklyCalendar
              recipes={recipes}
              weeklyPlan={weeklyPlan}
              onUpdateWeeklyPlan={handleUpdateWeeklyPlan}
              lang={lang}
              season={season}
              onOpenRecipe={(r) => setModalRecipe(r)}
              onSyncToGrocery={handleSyncWeeklyPlanToGrocery}
              history={history}
              onUpdateHistory={(updated) => setHistory(updated)}
            />
          )}

          {activeTab === 'grocery' && (
            <GroceryBudget
              groceryItems={groceryItems}
              onUpdateGrocery={handleUpdateGrocery}
              marketRates={marketRates}
              onUpdateRates={handleUpdateRates}
              lang={lang}
            />
          )}

          {activeTab === 'family' && (
            <FamilyManager
              members={familyMembers}
              onSaveMembers={handleSaveFamily}
              lang={lang}
            />
          )}

          {activeTab === 'recipes' && (
            <RecipeLibrary
              recipes={recipes}
              favorites={favorites}
              onToggleFavorite={handleToggleFav}
              onOpenRecipe={(r) => setModalRecipe(r)}
              lang={lang}
            />
          )}

          {activeTab === 'aichef' && (
            <AiChefChat
              familyMembers={familyMembers}
              history={history}
              season={season}
              lang={lang}
              recipes={recipes}
              onOpenRecipeById={(id) => {
                const r = recipes.find((x) => x.id === id);
                if (r) setModalRecipe(r);
              }}
            />
          )}
        </main>

        {/* Persistent Bottom Mobile Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          lang={lang}
          groceryCount={groceryItems.filter((i) => !i.isBought).length}
        />

        {/* Recipe Full Detail Modal - Mobile Bottom Sheet */}
        <RecipeModal
          recipe={modalRecipe}
          isOpen={Boolean(modalRecipe)}
          onClose={() => setModalRecipe(null)}
          lang={lang}
          familyMembers={familyMembers}
          isFavorite={modalRecipe ? favorites.includes(modalRecipe.id) : false}
          onToggleFavorite={handleToggleFav}
          onMarkCookedToday={(r) => handleMarkCooked(r, 'dopahar')}
          onAddToGrocery={handleAddRecipeToGrocery}
        />

        {/* Cloud Sync & Backup Modal - Mobile Bottom Sheet */}
        <CloudSyncModal
          isOpen={isSyncModalOpen}
          onClose={() => setIsSyncModalOpen(false)}
          lang={lang}
          onRefreshAllData={handleRefreshAllData}
        />

        {/* Offline Mode Indicator */}
        <OfflineIndicator text={t.offlineMode} />

        {/* Toast Notification Pill */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-white backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-stone-700 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200 text-center max-w-[85%]">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
