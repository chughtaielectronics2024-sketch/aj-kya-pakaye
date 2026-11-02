import React, { useState, useMemo } from 'react';
import { Recipe, Language, Season, MealCategory, HealthCondition } from '../types';
import { translations } from '../data/translations';
import { getLocalizedRecipe } from '../services/recipeLocalization';
import { 
  BookOpen, Search, Heart, Clock, Users, Flame, Utensils, 
  ShieldCheck, Sparkles, Filter 
} from 'lucide-react';
import { GoogleAdBanner } from './GoogleAdBanner';

interface Props {
  recipes: Recipe[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenRecipe: (recipe: Recipe) => void;
  lang: Language;
}

export const RecipeLibrary: React.FC<Props> = ({
  recipes,
  favorites,
  onToggleFavorite,
  onOpenRecipe,
  lang
}) => {
  const t = translations[lang] || translations.ur;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [parhezFilter, setParhezFilter] = useState<HealthCondition | 'all'>('all');
  const [showOnlyFavs, setShowOnlyFavs] = useState(false);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: t.all },
    { id: 'nashta', label: t.slotBreakfast },
    { id: 'sabzi', label: t.catSabzi },
    { id: 'daal', label: t.catDaal },
    { id: 'rice', label: t.catRice },
    { id: 'fastfood', label: lang === 'en' ? 'Fast Food' : 'فاسٹ فوڈ' }
  ];

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = recipe.name.toLowerCase().includes(q);
        const matchNative = recipe.nativeName.includes(q);
        const matchIng = recipe.ingredients.some(i => i.name.toLowerCase().includes(q) || i.nameUrdu.includes(q));
        if (!matchName && !matchNative && !matchIng) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'fastfood') {
          if (!recipe.id.includes('burger') && !recipe.id.includes('pizza')) return false;
        } else if (selectedCategory === 'daal') {
          if (recipe.category !== 'daal') return false;
        } else if (selectedCategory === 'rice') {
          if (recipe.category !== 'rice') return false;
        } else if (selectedCategory === 'nashta') {
          if (recipe.category !== 'nashta') return false;
        } else if (selectedCategory === 'sabzi') {
          if (recipe.category !== 'sabzi') return false;
        } else if (recipe.category !== selectedCategory) {
          return false;
        }
      }

      // Season
      if (selectedSeason !== 'all') {
        if (recipe.season !== selectedSeason && recipe.season !== 'all') return false;
      }

      // Parhez
      if (parhezFilter !== 'all') {
        const alert = recipe.parhezAlerts[parhezFilter];
        if (alert && alert.status === 'avoid') return false;
      }

      // Favorites
      if (showOnlyFavs && !favorites.includes(recipe.id)) {
        return false;
      }

      return true;
    });
  }, [recipes, searchQuery, selectedCategory, selectedSeason, parhezFilter, showOnlyFavs, favorites]);

  return (
    <div className="space-y-6">
      {/* Search & Main Filter Controls */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-extrabold text-stone-900 tracking-tight">
              {t.tabRecipes} ({recipes.length})
            </h2>
          </div>

          <button
            onClick={() => setShowOnlyFavs(!showOnlyFavs)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
              showOnlyFavs
                ? 'bg-rose-50 border-rose-200 text-rose-700'
                : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showOnlyFavs ? 'fill-current' : ''}`} />
            <span>{t.favorites} ({favorites.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 rtl:right-3.5 rtl:left-auto top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 rounded-2xl border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs text-stone-900 bg-stone-50/50 leading-[1.7] text-start"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Parhez & Season Sub-filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-1.5 text-stone-500 font-semibold">
            <Filter className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.dietFilterTitle}</span>
          </div>

          <button
            onClick={() => setParhezFilter(parhezFilter === 'diabetes' ? 'all' : 'diabetes')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
              parhezFilter === 'diabetes' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            {t.dietDiabetesSafe}
          </button>

          <button
            onClick={() => setParhezFilter(parhezFilter === 'hypertension' ? 'all' : 'hypertension')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
              parhezFilter === 'hypertension' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            {t.dietBpSafe}
          </button>

          <button
            onClick={() => setParhezFilter(parhezFilter === 'uric_acid' ? 'all' : 'uric_acid')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
              parhezFilter === 'uric_acid' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            {t.dietUricAcidSafe}
          </button>

          <button
            onClick={() => setParhezFilter(parhezFilter === 'cholesterol_heart' ? 'all' : 'cholesterol_heart')}
            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
              parhezFilter === 'cholesterol_heart' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-stone-50 text-stone-700 border-stone-200'
            }`}
          >
            {t.dietHeartSafe}
          </button>

          {/* Season Filter Pills */}
          <div className="flex items-center gap-1.5 ml-auto rtl:mr-auto rtl:ml-0 flex-wrap">
            <span className="text-stone-400 text-[11px]">{t.season}:</span>
            <button
              onClick={() => setSelectedSeason(selectedSeason === 'winter' ? 'all' : 'winter')}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 ${
                selectedSeason === 'winter'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>❄️</span>
              <span>{t.seasonWinter}</span>
            </button>
            <button
              onClick={() => setSelectedSeason(selectedSeason === 'summer' ? 'all' : 'summer')}
              className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold transition flex items-center gap-1 ${
                selectedSeason === 'summer'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <span>☀️</span>
              <span>{t.seasonSummer}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recipes Cards Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center text-xs text-stone-500">
          {t.noMatchingDishes}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRecipes.map((recipe) => {
            const isFav = favorites.includes(recipe.id);
            const localized = getLocalizedRecipe(recipe, lang);

            return (
              <div
                key={recipe.id}
                onClick={() => onOpenRecipe(recipe)}
                className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl shrink-0">{recipe.imageEmoji}</span>
                      <div>
                        <h3 className="font-extrabold text-base text-stone-900 leading-snug">
                          {localized.displayTitle}
                        </h3>
                        <span className="text-xs text-stone-500 line-clamp-1">
                          {localized.displaySubTitle}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(recipe.id);
                      }}
                      className={`p-2 rounded-xl transition shrink-0 ${
                        isFav ? 'text-rose-600 bg-rose-50' : 'text-stone-300 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Utensil & Season pill */}
                  <div className="flex items-center gap-1.5 flex-wrap my-2.5 text-[11px]">
                    <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-lg border border-emerald-200 font-semibold">
                      {localized.utensil.name.split('(')[0]}
                    </span>
                    <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-lg font-medium">
                      {recipe.season === 'summer' ? t.seasonSummer : recipe.season === 'winter' ? t.seasonWinter : t.seasonAll}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {localized.seasonalNotes}
                  </p>
                </div>

                {/* Card Footer Bar */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3 text-stone-500 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {recipe.prepTimeMins + recipe.cookTimeMins} {t.minutes}
                    </span>
                    <span>{recipe.nutrition.calories} kcal</span>
                  </div>

                  <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                    ~{recipe.estimatedCostPkr} {t.pkrCurrency}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Google Ads In-Feed Banner */}
      <GoogleAdBanner lang={lang} slotId="recipes-bottom-slot" />
    </div>
  );
};
