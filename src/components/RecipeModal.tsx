import React from 'react';
import { Recipe, FamilyMember, Language } from '../types';
import { translations } from '../data/translations';
import { getLocalizedRecipe } from '../services/recipeLocalization';
import { getLocalizedFamilyMember } from '../services/familyLocalization';
import { 
  X, Clock, Users, Flame, Heart, ShoppingBag, CheckCircle2, 
  AlertTriangle, ShieldCheck, Sparkles, ChefHat, Scale, Activity
} from 'lucide-react';

interface Props {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  familyMembers: FamilyMember[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onMarkCookedToday: (recipe: Recipe) => void;
  onAddToGrocery: (recipe: Recipe) => void;
}

export const RecipeModal: React.FC<Props> = ({
  recipe,
  isOpen,
  onClose,
  lang,
  familyMembers,
  isFavorite,
  onToggleFavorite,
  onMarkCookedToday,
  onAddToGrocery
}) => {
  if (!isOpen || !recipe) return null;

  const t = translations[lang] || translations.ur;
  const localizedRecipe = getLocalizedRecipe(recipe, lang);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-hidden animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-xl bg-white rounded-t-[32px] sm:rounded-3xl shadow-2xl border-t sm:border border-emerald-100 overflow-hidden max-h-[92vh] flex flex-col text-stone-900 animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Banner with drag handle */}
        <div className="relative bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 pt-2 pb-4 px-4 sm:p-5 text-white">
          {/* Mobile Bottom Sheet Pull Pill */}
          <div className="w-12 h-1.5 bg-white/40 rounded-full mx-auto mb-3 sm:hidden" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span className="text-xl sm:text-2xl">{localizedRecipe.imageEmoji}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-950/40 text-emerald-100 border border-emerald-400/30">
                  {localizedRecipe.displayCategory}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-white/20 text-white backdrop-blur-xs">
                  {localizedRecipe.season === 'all' ? t.seasonAll : localizedRecipe.season === 'summer' ? t.seasonSummer : t.seasonWinter}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black leading-[1.8] truncate text-start">
                {localizedRecipe.displayTitle}
              </h2>
              <p className="text-[11px] sm:text-xs text-emerald-100/90 font-medium truncate leading-[1.6] text-start">
                {localizedRecipe.displaySubTitle}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => onToggleFavorite(localizedRecipe.id)}
                className={`p-2 rounded-2xl transition shadow-xs active:scale-90 ${
                  isFavorite ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                title={isFavorite ? t.savedInFavorites : t.saveToFavorites}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition shadow-xs active:scale-90"
                title={t.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-1.5 mt-3 pt-2.5 border-t border-emerald-400/30 text-center">
            <div className="bg-emerald-900/30 backdrop-blur-xs rounded-xl p-1.5">
              <div className="flex items-center justify-center gap-0.5 text-[10px] text-emerald-200">
                <Clock className="w-3 h-3" />
                <span className="truncate">{t.prepTime}</span>
              </div>
              <p className="text-xs font-bold mt-0.5">{localizedRecipe.prepTimeMins}m</p>
            </div>
            <div className="bg-emerald-900/30 backdrop-blur-xs rounded-xl p-1.5">
              <div className="flex items-center justify-center gap-0.5 text-[10px] text-emerald-200">
                <Flame className="w-3 h-3" />
                <span className="truncate">{t.cookTime}</span>
              </div>
              <p className="text-xs font-bold mt-0.5">{localizedRecipe.cookTimeMins}m</p>
            </div>
            <div className="bg-emerald-900/30 backdrop-blur-xs rounded-xl p-1.5">
              <div className="flex items-center justify-center gap-0.5 text-[10px] text-emerald-200">
                <Users className="w-3 h-3" />
                <span className="truncate">{t.servings}</span>
              </div>
              <p className="text-xs font-bold mt-0.5">{localizedRecipe.servings}</p>
            </div>
            <div className="bg-emerald-900/30 backdrop-blur-xs rounded-xl p-1.5">
              <div className="flex items-center justify-center gap-0.5 text-[10px] text-emerald-200">
                <Activity className="w-3 h-3" />
                <span className="truncate">{t.calories}</span>
              </div>
              <p className="text-xs font-bold mt-0.5">{localizedRecipe.nutrition.calories}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {/* Best Utensil Spotlight */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-3.5 shadow-2xs">
            <div className="flex items-center gap-1.5 mb-1.5 text-emerald-900 font-bold text-xs">
              <ChefHat className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t.bestUtensil}: {localizedRecipe.utensil.name}</span>
            </div>
            <p className="text-stone-700 leading-relaxed mb-1.5">
              <strong>{t.whyBetterUtensil}</strong> {localizedRecipe.utensil.reason}
            </p>
            <div className="text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-xl p-2 flex items-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>{t.medicalHealthBenefit}</strong> {localizedRecipe.utensil.healthBenefit}</span>
            </div>
          </div>

          {/* Family Health & Parhez Audit */}
          <div className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-2xs">
            <h3 className="font-bold text-stone-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{t.parhezAlertTitle}</span>
            </h3>

            <div className="space-y-2">
              {familyMembers
                .filter((m, idx, arr) => arr.findIndex(x => x.id === m.id || x.name === m.name) === idx)
                .map((rawMember) => {
                const member = getLocalizedFamilyMember(rawMember, lang);
                const memberConditions = rawMember.healthConditions.filter(c => c !== 'none');
                if (memberConditions.length === 0) {
                  return (
                    <div key={rawMember.id} className="flex items-center justify-between py-1.5 px-3 bg-stone-50 rounded-xl border border-stone-200/60">
                      <span className="font-semibold text-stone-800 text-xs">{member.name} ({member.role})</span>
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        {t.parhezSafe}
                      </span>
                    </div>
                  );
                }

                const memberAlerts = memberConditions
                  .map(cond => localizedRecipe.parhezAlerts[cond])
                  .filter((a): a is NonNullable<typeof a> => Boolean(a));

                if (memberAlerts.length === 0) return null;

                const worstStatus = memberAlerts.some(a => a.status === 'avoid')
                  ? 'avoid'
                  : memberAlerts.some(a => a.status === 'caution')
                  ? 'caution'
                  : 'safe';

                const combinedTips = Array.from(new Set(memberAlerts.map(a => a.tip)))
                  .map(tip => tip.replace(/(ابو جان کیلئے:|امی جان کیلئے:|ابو جان:|امی جان:)\s*/g, '').trim())
                  .filter(Boolean)
                  .join(' • ');

                const substitute = memberAlerts.find(a => a.substitute)?.substitute;

                return (
                  <div 
                    key={member.id} 
                    className={`p-2.5 rounded-xl border flex flex-col gap-1 transition ${
                      worstStatus === 'avoid'
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : worstStatus === 'caution'
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span className="flex items-center gap-1.5">
                        <span>{member.name}</span>
                        <span className="text-[10px] text-stone-500 font-normal">({member.role})</span>
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-black ${
                        worstStatus === 'avoid' ? 'bg-rose-200 text-rose-900' :
                        worstStatus === 'caution' ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                      }`}>
                        {worstStatus === 'avoid' ? t.parhezAvoid : worstStatus === 'caution' ? t.parhezCaution : t.parhezSafe}
                      </span>
                    </div>
                    <p className="text-[11px] leading-relaxed">{combinedTips}</p>
                    {substitute && (
                      <p className="text-[10px] font-semibold text-emerald-900 bg-white/80 p-1.5 rounded-lg border border-emerald-200/50">
                        💡 {t.substituteTip}: {substitute}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Nutritional Breakdown Table */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{t.nutritionValues}</span>
              </h3>
              <span className="text-[10px] font-semibold text-stone-500">
                {t.glycemicIndex}: <strong className="text-stone-800">{localizedRecipe.nutrition.glycemicIndex}</strong>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center">
              <div className="bg-white p-1.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[9px] block">{t.calories}</span>
                <span className="font-black text-stone-800">{localizedRecipe.nutrition.calories}</span>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[9px] block">{t.protein}</span>
                <span className="font-black text-stone-800">{localizedRecipe.nutrition.proteinG}g</span>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[9px] block">{t.carbs}</span>
                <span className="font-black text-stone-800">{localizedRecipe.nutrition.carbsG}g</span>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[9px] block">{t.fats}</span>
                <span className="font-black text-stone-800">{localizedRecipe.nutrition.fatG}g</span>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[9px] block">{t.fiber}</span>
                <span className="font-black text-stone-800">{localizedRecipe.nutrition.fiberG}g</span>
              </div>
              <div className="bg-white p-1.5 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[9px] block">{t.sodium}</span>
                <span className="font-black text-stone-800">{localizedRecipe.nutrition.sodiumMg}mg</span>
              </div>
            </div>
          </div>

          {/* Ingredients & Bazaar Budget */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>{t.ingredients}</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {t.estimatedCost}: {localizedRecipe.estimatedCostPkr} {t.pkrCurrency}
              </span>
            </div>

            <div className="divide-y divide-stone-100 border border-stone-200 rounded-2xl overflow-hidden bg-white">
              {localizedRecipe.ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 hover:bg-stone-50 text-xs">
                  <div>
                    <span className="font-bold text-stone-900">{ing.name}</span>
                  </div>
                  <div className="text-end">
                    <span className="font-bold text-stone-800 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                      {ing.quantity}
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">
                      ~{ing.approxPkr} {t.pkrCurrency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h3 className="font-bold text-stone-900 uppercase tracking-wider mb-2 flex items-center gap-1">
              <ChefHat className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span>{t.instructions}</span>
            </h3>

            <div className="space-y-2">
              {localizedRecipe.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-stone-50 p-2.5 rounded-2xl border border-stone-200/80">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Chef Tip */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-2.5 text-xs text-emerald-950 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
            <p><strong>{t.proTip}:</strong> {localizedRecipe.proTip}</p>
          </div>
        </div>

        {/* Modal Footer Actions - Thumb Friendly */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center gap-2 safe-bottom">
          <button
            onClick={() => onAddToGrocery(recipe)}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl border border-stone-300 text-stone-700 bg-white font-bold text-xs active:scale-95 transition hover:bg-stone-50"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-700" />
            <span>{t.syncPlanToGrocery}</span>
          </button>

          <button
            onClick={() => {
              onMarkCookedToday(recipe);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs active:scale-95 transition shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.cookedThisToday}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
