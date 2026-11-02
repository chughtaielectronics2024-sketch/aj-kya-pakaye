import { Recipe, FamilyMember, MealHistoryEntry, Season, MealSlot, Language } from '../types';
import { translations } from '../data/translations';
import { getLocalizedRecipe } from './recipeLocalization';
import { getLocalizedFamilyMember } from './familyLocalization';

export interface RecommendationResult {
  recipe: Recipe;
  score: number;
  reason: string;
  seasonMatch: boolean;
  parhezAudit: Array<{
    member: FamilyMember;
    status: 'safe' | 'caution' | 'avoid';
    tip: string;
    substitute?: string;
  }>;
  daysSinceLastCooked: number | null; // null if never
}

export function getSmartRecommendations(
  allRecipes: Recipe[],
  familyMembers: FamilyMember[],
  history: MealHistoryEntry[],
  currentSeason: Season,
  slot: MealSlot = 'dopahar',
  lang: Language = 'ur'
): RecommendationResult[] {
  const t = translations[lang] || translations.ur;
  const isEn = lang === 'en';

  // Map last cooked date for each recipe
  const lastCookedMap: Record<string, number> = {};
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  history.forEach(entry => {
    const daysAgo = Math.max(0, Math.floor((now - entry.timestamp) / ONE_DAY));
    if (lastCookedMap[entry.recipeId] === undefined || daysAgo < lastCookedMap[entry.recipeId]) {
      lastCookedMap[entry.recipeId] = daysAgo;
    }
  });

  const mostRecentEntry = history.length > 0 ? history[0] : null;
  const recentRecipe = mostRecentEntry ? allRecipes.find(r => r.id === mostRecentEntry.recipeId) : null;
  const recentCategory = recentRecipe ? recentRecipe.category : null;

  // Filter strictly by meal slot so non-breakfast dishes NEVER appear in nashta
  const relevantRecipes = allRecipes.filter(r => {
    if (slot === 'nashta') {
      return r.category === 'nashta';
    }
    if (slot === 'dopahar') {
      return r.category === 'sabzi';
    }
    if (slot === 'raat') {
      // Allow Pakistani dinner favorites: White rice & daal, chicken biryani & pulao, fast food, and seasonal sabzi with roti
      return r.category !== 'nashta';
    }
    return true;
  });

  const results: RecommendationResult[] = relevantRecipes.map(recipe => {
    let score = 100;
    const reasons: string[] = [];

    // 1. History penalty & variety
    const daysAgo = lastCookedMap[recipe.id];
    if (daysAgo !== undefined) {
      if (daysAgo === 0) {
        score -= 90;
        reasons.push(t.recCookedToday);
      } else if (daysAgo === 1) {
        score -= 70;
        reasons.push(t.recCookedYesterday);
      } else if (daysAgo === 2) {
        score -= 40;
        reasons.push(t.recCooked2DaysAgo);
      } else if (daysAgo >= 5) {
        score += 25;
        reasons.push(isEn ? `Not cooked in ${daysAgo} days` : `${daysAgo} ${t.recNotCookedDays}`);
      }
    } else {
      score += 30;
      reasons.push(t.recFreshChoice);
    }

    // 2. Category rotation
    if (recentCategory) {
      if (recipe.category === recentCategory && recipe.category !== 'sabzi') {
        score -= 25;
      } else if (
        (recentCategory === 'chicken' || recentCategory === 'mutton' || recentCategory === 'beef') &&
        (recipe.category === 'sabzi' || recipe.category === 'daal')
      ) {
        score += 30;
        reasons.push(t.recVegBalance);
      } else if (
        (recentCategory === 'sabzi' || recentCategory === 'daal') &&
        (recipe.category === 'chicken' || recipe.category === 'mutton' || recipe.category === 'rice')
      ) {
        score += 25;
        reasons.push(t.recMeatTurn);
      }
    }

    // 3. Season match & seasonal availability
    let seasonMatch = false;
    if (slot === 'dopahar' || recipe.category === 'sabzi') {
      if (currentSeason === 'all') {
        score += 30;
        seasonMatch = true;
      } else if (recipe.season === currentSeason) {
        score += 55;
        seasonMatch = true;
        const seasonTexts: Record<Language, { winter: string; summer: string }> = {
          ur: { winter: 'سردیوں کی تازہ موسمی سبزی اور روٹی', summer: 'گرمیوں کی خاص موسمی سبزی اور روٹی' },
          en: { winter: 'Winter seasonal vegetable with hot roti', summer: 'Summer seasonal vegetable with fresh roti' },
          pa: { winter: 'سردیاں دی تازی موسمی سبزی تے روٹی', summer: 'گرمیاں دی خاص موسمی سبزی تے روٹی' },
          ps: { winter: 'د ژمي تازه موسمي سبزي او ګرمه ډوډۍ', summer: 'د اوړي ځانګړې موسمي سبزي او تازه ډوډۍ' },
          ar: { winter: 'خضار شتوية موسمية طازجة مع خبز ساخن', summer: 'خضار صيفية موسمية مع خبز طازج' },
          fa: { winter: 'سبزیجات فصلی زمستانه با نان داغ', summer: 'سبزیجات مخصوص تابستان با نان تازه' },
          es: { winter: 'Verdura de temporada de invierno con pan caliente', summer: 'Verdura especial de verano con pan fresco' }
        };
        const sText = seasonTexts[lang] || seasonTexts.ur;
        reasons.push(currentSeason === 'winter' ? sText.winter : sText.summer);
      } else if (recipe.season === 'all') {
        score += 20;
        seasonMatch = true;
      } else {
        // Vegetable from the opposite season is not in season in Pakistan
        score -= 75;
      }
    } else {
      if (recipe.season === currentSeason) {
        score += 35;
        seasonMatch = true;
        reasons.push(t.recSeasonBazaar);
      } else if (recipe.season === 'all') {
        score += 15;
        seasonMatch = true;
      } else {
        score -= 20;
      }
    }

    // 4. Family Parhez & Health Check
    const locRecipe = getLocalizedRecipe(recipe, lang);
    const parhezAudit: RecommendationResult['parhezAudit'] = [];
    let hasStrictAvoid = false;

    familyMembers.forEach(member => {
      const activeConditions = member.healthConditions.filter(c => c !== 'none');
      if (activeConditions.length > 0) {
        const memberAlerts = activeConditions
          .map(cond => locRecipe.parhezAlerts[cond])
          .filter((a): a is NonNullable<typeof a> => Boolean(a));

        if (memberAlerts.length > 0) {
          // Determine worst status across member's conditions
          const worstStatus = memberAlerts.some(a => a.status === 'avoid')
            ? 'avoid'
            : memberAlerts.some(a => a.status === 'caution')
            ? 'caution'
            : 'safe';

          if (worstStatus === 'avoid') {
            score -= 30;
            hasStrictAvoid = true;
          } else if (worstStatus === 'caution') {
            score -= 5;
          } else if (worstStatus === 'safe') {
            score += 15;
          }

          // Consolidate tips into a single, clean modification advice per member
          const combinedTips = Array.from(new Set(memberAlerts.map(a => a.tip)))
            .map(t => t.replace(/(ابو جان کیلئے:|امی جان کیلئے:|ابو جان:|امی جان:)\s*/g, '').trim())
            .filter(Boolean)
            .join(' • ');

          const substitute = memberAlerts.find(a => a.substitute)?.substitute;

          const locMember = getLocalizedFamilyMember(member, lang);

          parhezAudit.push({
            member: {
              ...member,
              name: locMember.name,
              role: locMember.role,
              likes: locMember.likes,
              dislikes: locMember.dislikes
            },
            status: worstStatus,
            tip: combinedTips,
            substitute
          });
        }
      }

      const locMember = getLocalizedFamilyMember(member, lang);

      // 5. Family likes & dislikes
      const isLiked = member.likes.some(like => 
        like.trim() && (
          recipe.name.toLowerCase().includes(like.toLowerCase()) || 
          recipe.nativeName.includes(like) ||
          locRecipe.displayTitle.toLowerCase().includes(like.toLowerCase())
        )
      );
      if (isLiked) {
        score += 15;
        reasons.push(`${t.recFavoriteOf} ${locMember.name}`);
      }

      const isDisliked = member.dislikes.some(dislike => 
        dislike.trim() && (
          recipe.name.toLowerCase().includes(dislike.toLowerCase()) || 
          recipe.nativeName.includes(dislike) ||
          locRecipe.displayTitle.toLowerCase().includes(dislike.toLowerCase())
        )
      );
      if (isDisliked) {
        score -= 20;
      }
    });

    // Ensure distinct order: Point 1 Abu Jaan, Point 2 Ami Jaan
    parhezAudit.sort((a, b) => {
      const aIsAbu = a.member.id === 'fam-1' || a.member.name.includes('ابو');
      const bIsAbu = b.member.id === 'fam-1' || b.member.name.includes('ابو');
      const aIsAmi = a.member.id === 'fam-2' || a.member.name.includes('امی');
      const bIsAmi = b.member.id === 'fam-2' || b.member.name.includes('امی');

      if (aIsAbu && !bIsAbu) return -1;
      if (!aIsAbu && bIsAbu) return 1;
      if (aIsAmi && !bIsAmi) return -1;
      if (!aIsAmi && bIsAmi) return 1;
      return 0;
    });

    if (!hasStrictAvoid && parhezAudit.length > 0) {
      reasons.push(t.recSafeFamily);
    }

    if (slot === 'nashta') {
      if (recipe.category === 'nashta') {
        score += 80;
        reasons.unshift(isEn ? 'Traditional Pakistani Breakfast' : 'روایتی دیسی ناشتہ');
      } else {
        score -= 70; // Non-breakfast dishes should not appear in morning nashta
      }
    } else if (slot === 'dopahar') {
      if (recipe.category === 'sabzi') {
        score += 65;
        reasons.unshift(isEn ? 'Seasonal Sabzi with Fresh Roti' : 'موسمی سبزی اور تازہ روٹی');
      } else if (recipe.category === 'daal') {
        score += 45;
        reasons.unshift(isEn ? 'Nutritious Lunch Daal' : 'ہلکی پھلکی دوپہر کی دال');
      } else if (recipe.category === 'nashta') {
        score -= 80;
      }
    } else if (slot === 'raat') {
      if (recipe.category === 'daal' || recipe.id.includes('white-rice')) {
        score += 90;
        reasons.unshift(isEn ? 'White Rice & Traditional Tarka Daal' : 'سفید چاول اور روایتی تڑکا دال');
      } else if (recipe.id.includes('biryani') || recipe.id.includes('pulao')) {
        score += 88;
        reasons.unshift(isEn ? 'Chicken Dum Biryani / Yakhni Pulao' : 'چکن دم بریانی یا یخنی پلاؤ');
      } else if (recipe.id.includes('burger') || recipe.id.includes('pizza')) {
        score += 75;
        reasons.unshift(isEn ? 'Popular Fast Food Dinner' : 'من پسند فاسٹ فوڈ (برگر / پیزا)');
      } else if (recipe.category === 'sabzi') {
        score += 45;
        reasons.unshift(
          currentSeason === 'winter'
            ? (isEn ? 'Light Dinner: Winter Vegetable & Roti' : 'رات کا ہلکا کھانا: سردیوں کی موسمی سبزی اور روٹی')
            : (isEn ? 'Light Dinner: Summer Vegetable & Roti' : 'رات کا ہلکا کھانا: گرمیوں کی موسمی سبزی اور روٹی')
        );
      } else if (recipe.category === 'nashta') {
        score -= 80;
      }
    }

    const defaultReason = t.recIdealChoice;
    const finalReason = reasons.slice(0, 2).join(' • ') || defaultReason;

    return {
      recipe,
      score,
      reason: finalReason,
      seasonMatch,
      parhezAudit,
      daysSinceLastCooked: daysAgo !== undefined ? daysAgo : null
    };
  });

  return results.sort((a, b) => b.score - a.score);
}
