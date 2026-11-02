import { FamilyMember, MealHistoryEntry, Recipe, WeeklyPlan, GroceryItem, MarketRates, Language, Season } from '../types';
import { initialRecipes } from '../data/recipes';

const STORAGE_KEYS = {
  RECIPES: 'aj_kya_recipes_v1',
  FAMILY: 'aj_kya_family_v1',
  HISTORY: 'aj_kya_history_v1',
  WEEKLY: 'aj_kya_weekly_v1',
  GROCERY: 'aj_kya_grocery_v1',
  RATES: 'aj_kya_rates_v1',
  FAVORITES: 'aj_kya_favorites_v1',
  LANG: 'aj_kya_lang_v1',
  SEASON: 'aj_kya_season_v1',
};

export const defaultFamilyMembers: FamilyMember[] = [
  {
    id: 'fam-1',
    name: 'ابو جان',
    role: 'سربراہِ خانہ',
    healthConditions: ['cholesterol_heart', 'hypertension'],
    likes: ['پتلی تڑکا دال', 'موسمی سبزی اور روٹی', 'سفید ابلے چاول', 'دیگی چکن یخنی پلاؤ'],
    dislikes: ['زیادہ تیل و گھی (کولیسٹرول)', 'زیادہ نمک (بلڈ پریشر)', 'تیز لال مرچیں']
  },
  {
    id: 'fam-2',
    name: 'امی جان',
    role: 'گھر کی دیکھ بھال',
    healthConditions: ['stomach_digestive'],
    likes: ['گھیا توری کی بھجیا', 'گھیا کدو / لوکی', 'مونگ مسور دال', 'نرم پھلکا روٹی'],
    dislikes: ['فاسٹ فوڈ (برگر، پیزا)', 'تلی ہوئی پوریاں / پکوڑے', 'ہیوی روغنی کھانے (معدے کا بوجھ)', 'تیزابیت پیدا کرنے والے مصالحے']
  },
  {
    id: 'fam-3',
    name: 'دادا جان',
    role: 'بزرگ',
    healthConditions: ['uric_acid'],
    likes: ['آلو گوشت شوربہ', 'پتلی دال', 'شلجم کی بھجیا'],
    dislikes: ['سخت گوشت', 'چنے کی دال']
  },
  {
    id: 'fam-4',
    name: 'بچے',
    role: 'بچے',
    healthConditions: ['none'],
    likes: ['چکن بریانی', 'چکن پلاؤ', 'چکن زنگر برگر'],
    dislikes: ['کریلا', 'شلجم']
  }
];

export const defaultMarketRates: MarketRates = {
  chickenPerKg: 650,
  beefPerKg: 1200,
  muttonPerKg: 2200,
  seasonalSabziAvgPerKg: 120,
  cookingOilPerLiter: 520,
  basmatiRicePerKg: 340,
  attaPerKg: 130,
  eggsPerDozen: 300
};

export const defaultWeeklyPlan: WeeklyPlan = {
  0: { nashta: 'anda-paratha-omelette', dopahar: 'gajar-matar-aloo-roti', raat: 'white-rice-moong-masoor' }, // Monday
  1: { nashta: 'anda-paratha-halffry', dopahar: 'bhindi-masala-roti', raat: 'chicken-biryani' }, // Tuesday
  2: { nashta: 'naan-chanay', dopahar: 'sarson-saag-roti', raat: 'white-rice-daal-chana' }, // Wednesday
  3: { nashta: 'anda-paratha-boiled', dopahar: 'tori-bhujia-roti', raat: 'chicken-pulao' }, // Thursday
  4: { nashta: 'chai-paratha', dopahar: 'palak-aloo-roti', raat: 'white-rice-sabut-masoor' }, // Friday
  5: { nashta: 'siri-paaye', dopahar: 'karelay-pyaz-roti', raat: 'crispy-zinger-burger' }, // Saturday
  6: { nashta: 'halwa-puri', dopahar: 'gobhi-matar-aloo-roti', raat: 'chicken-tikka-pizza' } // Sunday
};

const RECIPE_DATA_VERSION = 'v10_abu_cholesterol_ami_maida_alerts';

export function getStoredRecipes(): Recipe[] {
  try {
    const version = localStorage.getItem('ajk_recipes_version');
    if (version !== RECIPE_DATA_VERSION) {
      // Clean sync with authentic Pakistani traditional recipes database
      saveStoredRecipes(initialRecipes);
      localStorage.setItem('ajk_recipes_version', RECIPE_DATA_VERSION);
      return initialRecipes;
    }
    const raw = localStorage.getItem(STORAGE_KEYS.RECIPES);
    if (!raw) return initialRecipes;
    const custom: Recipe[] = JSON.parse(raw);
    if (!Array.isArray(custom) || custom.length === 0) return initialRecipes;
    
    // Purge any old/deleted recipes that are no longer part of initialRecipes
    const validInitialIds = new Set(initialRecipes.map(r => r.id));
    const cleaned = custom.filter(r => validInitialIds.has(r.id));
    
    // Auto-merge any newly added default recipes
    const existingIds = new Set(cleaned.map(r => r.id));
    const missing = initialRecipes.filter(r => !existingIds.has(r.id));
    const merged = [...cleaned, ...missing];
    if (merged.length !== custom.length || missing.length > 0) {
      saveStoredRecipes(merged);
    }
    return merged;
  } catch {
    return initialRecipes;
  }
}

export function saveStoredRecipes(recipes: Recipe[]): void {
  localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(recipes));
}

const FAMILY_DATA_VERSION = 'v6_multilingual_pure_names_no_brackets';

export function getStoredFamily(): FamilyMember[] {
  try {
    const famVer = localStorage.getItem('ajk_family_version');
    if (famVer !== FAMILY_DATA_VERSION) {
      localStorage.setItem('ajk_family_version', FAMILY_DATA_VERSION);
      saveStoredFamily(defaultFamilyMembers);
      return defaultFamilyMembers;
    }
    const raw = localStorage.getItem(STORAGE_KEYS.FAMILY);
    if (!raw) return defaultFamilyMembers;
    const parsed: FamilyMember[] = JSON.parse(raw);

    // Guard against duplicate Abu entries or missing Ami, and clean foreign brackets
    const seenNames = new Set<string>();
    const cleaned = parsed
      .map(m => ({
        ...m,
        name: m.name.replace(/\s*\((Father|Mother|Grandfather|Grandmother|Children|Kids)\)/gi, '').trim()
      }))
      .filter(m => {
        const lower = m.name.toLowerCase();
        const isAbu = lower.includes('abu') || m.name.includes('ابو');
        if (isAbu) {
          if (seenNames.has('abu')) return false;
          seenNames.add('abu');
        }
        return true;
      });

    return cleaned.length > 0 ? cleaned : defaultFamilyMembers;
  } catch {
    return defaultFamilyMembers;
  }
}

export function saveStoredFamily(members: FamilyMember[]): void {
  localStorage.setItem(STORAGE_KEYS.FAMILY, JSON.stringify(members));
}

export function getDefaultPastMeals(): MealHistoryEntry[] {
  const getPastDate = (daysAgo: number) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
  };

  return [
    {
      id: 'hist-seed-1',
      date: getPastDate(1), // Yesterday
      slot: 'raat',
      recipeId: 'rec-1', // Chicken Karahi
      recipeName: 'چکن کڑاہی',
      timestamp: Date.now() - 1 * 86400000
    },
    {
      id: 'hist-seed-2',
      date: getPastDate(1), // Yesterday
      slot: 'dopahar',
      recipeId: 'rec-10', // Daal Moong
      recipeName: 'دال مونگ',
      timestamp: Date.now() - 1 * 86400000 - 18000000
    },
    {
      id: 'hist-seed-3',
      date: getPastDate(2), // Day before yesterday (پرسوں)
      slot: 'raat',
      recipeId: 'rec-4', // Aloo Gosht
      recipeName: 'آلو گوشت شوربہ',
      timestamp: Date.now() - 2 * 86400000
    },
    {
      id: 'hist-seed-4',
      date: getPastDate(3), // 3 days ago
      slot: 'raat',
      recipeId: 'rec-7', // Chicken Biryani
      recipeName: 'چکن بریانی',
      timestamp: Date.now() - 3 * 86400000
    },
    {
      id: 'hist-seed-5',
      date: getPastDate(4), // 4 days ago
      slot: 'dopahar',
      recipeId: 'rec-8', // Sabzi Mix
      recipeName: 'مکس سبزی ترکاری',
      timestamp: Date.now() - 4 * 86400000
    },
    {
      id: 'hist-seed-6',
      date: getPastDate(5), // 5 days ago
      slot: 'raat',
      recipeId: 'rec-5', // Daal Chawal
      recipeName: 'دال چاول',
      timestamp: Date.now() - 5 * 86400000
    },
    {
      id: 'hist-seed-7',
      date: getPastDate(6), // 6 days ago
      slot: 'raat',
      recipeId: 'rec-6', // Chapli Kabab
      recipeName: 'چپلی کباب',
      timestamp: Date.now() - 6 * 86400000
    },
    {
      id: 'hist-seed-8',
      date: getPastDate(7), // Exactly 7 days ago (Same weekday of previous week!)
      slot: 'raat',
      recipeId: 'rec-7',
      recipeName: 'چکن بریانی',
      timestamp: Date.now() - 7 * 86400000
    },
    {
      id: 'hist-seed-9',
      date: getPastDate(7), // 7 days ago lunch
      slot: 'dopahar',
      recipeId: 'rec-10',
      recipeName: 'دال چنا تڑکا',
      timestamp: Date.now() - 7 * 86400000 - 18000000
    },
    {
      id: 'hist-seed-10',
      date: getPastDate(8),
      slot: 'raat',
      recipeId: 'beef-nihari',
      recipeName: 'بیف نہاری',
      timestamp: Date.now() - 8 * 86400000
    }
  ];
}

export function getStoredHistory(): MealHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) {
      const defaults = getDefaultPastMeals();
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(defaults));
      return defaults;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const defaults = getDefaultPastMeals();
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(defaults));
      return defaults;
    }
    return parsed;
  } catch {
    return getDefaultPastMeals();
  }
}

export function saveStoredHistory(history: MealHistoryEntry[]): void {
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

export function addMealHistoryEntry(recipeId: string, recipeName: string, slot: 'nashta' | 'dopahar' | 'raat'): void {
  const current = getStoredHistory();
  const today = new Date().toISOString().split('T')[0];
  const newEntry: MealHistoryEntry = {
    id: 'hist-' + Date.now(),
    date: today,
    slot,
    recipeId,
    recipeName,
    timestamp: Date.now()
  };
  const updated = [newEntry, ...current].slice(0, 100);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
}

export function addPastMealHistoryEntry(
  date: string,
  recipeId: string,
  recipeName: string,
  slot: 'nashta' | 'dopahar' | 'raat'
): MealHistoryEntry[] {
  const current = getStoredHistory();
  const newEntry: MealHistoryEntry = {
    id: 'hist-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    date,
    slot,
    recipeId,
    recipeName,
    timestamp: new Date(date).getTime() || Date.now()
  };
  const updated = [newEntry, ...current].sort((a, b) => b.date.localeCompare(a.date));
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  return updated;
}

export function deleteMealHistoryEntry(id: string): MealHistoryEntry[] {
  const current = getStoredHistory();
  const updated = current.filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  return updated;
}

export function clearMealHistory(): void {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
}

export function getStoredWeeklyPlan(): WeeklyPlan {
  try {
    const weeklyVersion = localStorage.getItem('ajk_weekly_version');
    if (weeklyVersion !== RECIPE_DATA_VERSION) {
      localStorage.setItem('ajk_weekly_version', RECIPE_DATA_VERSION);
      saveStoredWeeklyPlan(defaultWeeklyPlan);
      return defaultWeeklyPlan;
    }
    const raw = localStorage.getItem(STORAGE_KEYS.WEEKLY);
    if (!raw) return defaultWeeklyPlan;
    const plan = JSON.parse(raw);
    const validInitialIds = new Set(initialRecipes.map(r => r.id));
    let updated = false;
    for (let day = 0; day < 7; day++) {
      const cur = plan[day];
      if (!cur || !validInitialIds.has(cur.nashta) || !validInitialIds.has(cur.dopahar) || !validInitialIds.has(cur.raat)) {
        plan[day] = {
          nashta: validInitialIds.has(cur?.nashta) ? cur.nashta : defaultWeeklyPlan[day].nashta,
          dopahar: validInitialIds.has(cur?.dopahar) ? cur.dopahar : defaultWeeklyPlan[day].dopahar,
          raat: validInitialIds.has(cur?.raat) ? cur.raat : defaultWeeklyPlan[day].raat
        };
        updated = true;
      }
    }
    if (updated) {
      saveStoredWeeklyPlan(plan);
    }
    return plan;
  } catch {
    return defaultWeeklyPlan;
  }
}

export function saveStoredWeeklyPlan(plan: WeeklyPlan): void {
  localStorage.setItem(STORAGE_KEYS.WEEKLY, JSON.stringify(plan));
}

export function getStoredGrocery(): GroceryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.GROCERY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredGrocery(items: GroceryItem[]): void {
  localStorage.setItem(STORAGE_KEYS.GROCERY, JSON.stringify(items));
}

export function getStoredRates(): MarketRates {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RATES);
    if (!raw) return defaultMarketRates;
    return { ...defaultMarketRates, ...JSON.parse(raw) };
  } catch {
    return defaultMarketRates;
  }
}

export function saveStoredRates(rates: MarketRates): void {
  localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(rates));
}

export function getStoredFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!raw) return ['chicken-karahi', 'bhindi-masala'];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function toggleFavorite(recipeId: string): string[] {
  const favs = getStoredFavorites();
  let updated: string[];
  if (favs.includes(recipeId)) {
    updated = favs.filter(id => id !== recipeId);
  } else {
    updated = [...favs, recipeId];
  }
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
  return updated;
}

export function getStoredLanguage(): Language {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LANG);
    if (raw && ['ur', 'en', 'ps', 'pa', 'ar', 'fa'].includes(raw)) {
      return raw as Language;
    }
  } catch {}
  return 'ur';
}

export function saveStoredLanguage(lang: Language): void {
  localStorage.setItem(STORAGE_KEYS.LANG, lang);
}

export function getStoredSeason(): Season {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SEASON);
    if (raw && ['all', 'summer', 'winter', 'monsoon'].includes(raw)) {
      return raw as Season;
    }
  } catch {}
  // Auto-detect based on current month (Oct -> Autumn/Winter in Pakistan)
  const month = new Date().getMonth(); // 0 to 11
  if (month >= 9 || month <= 1) return 'winter'; // Oct - Feb
  if (month >= 3 && month <= 7) return 'summer'; // Apr - Aug
  return 'all';
}

export function saveStoredSeason(season: Season): void {
  localStorage.setItem(STORAGE_KEYS.SEASON, season);
}

// Full Export & Import for Cloud Sync
export function exportFullBackup(): string {
  const payload = {
    app: 'AjKyaPakaye',
    version: '1.0',
    exportDate: new Date().toISOString(),
    recipes: getStoredRecipes(),
    family: getStoredFamily(),
    history: getStoredHistory(),
    weekly: getStoredWeeklyPlan(),
    grocery: getStoredGrocery(),
    rates: getStoredRates(),
    favorites: getStoredFavorites(),
    lang: getStoredLanguage(),
    season: getStoredSeason()
  };
  return JSON.stringify(payload, null, 2);
}

export function importFullBackup(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (!data || data.app !== 'AjKyaPakaye') return false;

    if (Array.isArray(data.recipes)) saveStoredRecipes(data.recipes);
    if (Array.isArray(data.family)) saveStoredFamily(data.family);
    if (Array.isArray(data.history)) localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(data.history));
    if (data.weekly) saveStoredWeeklyPlan(data.weekly);
    if (Array.isArray(data.grocery)) saveStoredGrocery(data.grocery);
    if (data.rates) saveStoredRates(data.rates);
    if (Array.isArray(data.favorites)) localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(data.favorites));
    if (data.lang) saveStoredLanguage(data.lang);
    if (data.season) saveStoredSeason(data.season);

    return true;
  } catch {
    return false;
  }
}
