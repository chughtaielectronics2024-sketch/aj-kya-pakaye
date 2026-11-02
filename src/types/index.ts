export type Language = 'ur' | 'en' | 'ps' | 'pa' | 'ar' | 'fa' | 'es';

export type Season = 'all' | 'summer' | 'winter' | 'monsoon';

export type MealCategory = 'chicken' | 'mutton' | 'beef' | 'sabzi' | 'daal' | 'rice' | 'nashta' | 'dessert' | 'soup';

export type UtensilType = 'handi' | 'karahi' | 'pressure_cooker' | 'degchi' | 'nonstick' | 'tawa';

export type HealthCondition = 
  | 'none'
  | 'diabetes'
  | 'hypertension'
  | 'uric_acid'
  | 'cholesterol_heart'
  | 'stomach_digestive'
  | 'kidney_care'
  | 'gluten_intolerance'
  | 'lactose_intolerance'
  | 'weight_loss';

export interface FamilyMember {
  id: string;
  name: string;
  role: string; // e.g. Abu, Ami, Dadi, Dada, Bacha, Khud
  healthConditions: HealthCondition[];
  likes: string[];
  dislikes: string[];
}

export interface UtensilRecommendation {
  name: string;
  type: UtensilType;
  reason: string;
  healthBenefit: string;
}

export interface NutritionInfo {
  calories: number; // kcal per serving
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  sodiumMg: number;
  glycemicIndex: 'Low' | 'Medium' | 'High';
}

export interface Ingredient {
  name: string;
  nameUrdu: string;
  quantity: string;
  category: 'meat' | 'produce' | 'pantry' | 'dairy' | 'spices';
  approxPkr: number;
}

export interface ParhezDetail {
  status: 'safe' | 'caution' | 'avoid';
  tip: string;
  substitute?: string;
}

export interface Recipe {
  id: string;
  name: string;
  nativeName: string;
  category: MealCategory;
  season: Season;
  seasonalNotes: string;
  prepTimeMins: number;
  cookTimeMins: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  utensil: UtensilRecommendation;
  nutrition: NutritionInfo;
  ingredients: Ingredient[];
  instructions: string[];
  parhezAlerts: Partial<Record<HealthCondition, ParhezDetail>>;
  proTip: string;
  estimatedCostPkr: number;
  tags: string[];
  imageEmoji: string;
}

export type MealSlot = 'nashta' | 'dopahar' | 'raat';

export interface MealHistoryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  slot: MealSlot;
  recipeId: string;
  recipeName: string;
  timestamp: number;
}

export interface DayPlan {
  nashta?: string; // recipeId
  dopahar?: string;
  raat?: string;
}

export type WeeklyPlan = Record<number, DayPlan>; // 0 (Monday) to 6 (Sunday)

export interface GroceryItem {
  id: string;
  name: string;
  nameUrdu?: string;
  category: 'meat' | 'produce' | 'pantry' | 'dairy' | 'spices';
  quantity: string;
  approxPkr: number;
  isBought: boolean;
  recipeId?: string;
}

export interface MarketRates {
  chickenPerKg: number;
  beefPerKg: number;
  muttonPerKg: number;
  seasonalSabziAvgPerKg: number;
  cookingOilPerLiter: number;
  basmatiRicePerKg: number;
  attaPerKg: number;
  eggsPerDozen: number;
}
