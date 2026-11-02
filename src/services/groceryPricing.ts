import { GroceryItem, MarketRates } from '../types';

export interface ParsedQuantity {
  amount: number;
  unit: 'kg' | 'g' | 'liter' | 'ml' | 'dozen' | 'packet' | 'item';
  unitMultiplier: number; // multiplier normalized to base rate unit (kg, liter, dozen, packet, item)
  rawDisplay: string;
}

// Pakistani Bazaar Benchmark Commodities dictionary
export const COMMODITY_PRICE_MAP: Record<
  string,
  {
    baseRate: number;
    unit: 'kg' | 'liter' | 'dozen' | 'packet' | 'item';
    category: GroceryItem['category'];
  }
> = {
  // Poultry & Meat
  chicken: { baseRate: 680, unit: 'kg', category: 'meat' },
  مرغی: { baseRate: 680, unit: 'kg', category: 'meat' },
  چکن: { baseRate: 680, unit: 'kg', category: 'meat' },
  beef: { baseRate: 950, unit: 'kg', category: 'meat' },
  بیف: { baseRate: 950, unit: 'kg', category: 'meat' },
  'بڑا گوشت': { baseRate: 950, unit: 'kg', category: 'meat' },
  گائے: { baseRate: 950, unit: 'kg', category: 'meat' },
  mutton: { baseRate: 2100, unit: 'kg', category: 'meat' },
  مٹن: { baseRate: 2100, unit: 'kg', category: 'meat' },
  'چھوٹا گوشت': { baseRate: 2100, unit: 'kg', category: 'meat' },
  بکرا: { baseRate: 2100, unit: 'kg', category: 'meat' },
  qeema: { baseRate: 1000, unit: 'kg', category: 'meat' },
  قیمہ: { baseRate: 1000, unit: 'kg', category: 'meat' },
  fish: { baseRate: 850, unit: 'kg', category: 'meat' },
  مچھلی: { baseRate: 850, unit: 'kg', category: 'meat' },

  // Dairy & Cooking Fats
  milk: { baseRate: 220, unit: 'liter', category: 'dairy' },
  دودھ: { baseRate: 220, unit: 'liter', category: 'dairy' },
  yogurt: { baseRate: 230, unit: 'kg', category: 'dairy' },
  dahi: { baseRate: 230, unit: 'kg', category: 'dairy' },
  دہی: { baseRate: 230, unit: 'kg', category: 'dairy' },
  eggs: { baseRate: 320, unit: 'dozen', category: 'dairy' },
  انڈے: { baseRate: 320, unit: 'dozen', category: 'dairy' },
  انڈا: { baseRate: 320, unit: 'dozen', category: 'dairy' },
  egg: { baseRate: 320, unit: 'dozen', category: 'dairy' },
  oil: { baseRate: 520, unit: 'liter', category: 'pantry' },
  'cooking oil': { baseRate: 520, unit: 'liter', category: 'pantry' },
  تیل: { baseRate: 520, unit: 'liter', category: 'pantry' },
  'کوکنگ آئل': { baseRate: 520, unit: 'liter', category: 'pantry' },
  ghee: { baseRate: 580, unit: 'kg', category: 'pantry' },
  گھی: { baseRate: 580, unit: 'kg', category: 'pantry' },
  'دیسی گھی': { baseRate: 1800, unit: 'kg', category: 'dairy' },
  'desi ghee': { baseRate: 1800, unit: 'kg', category: 'dairy' },
  butter: { baseRate: 1400, unit: 'kg', category: 'dairy' },
  makhan: { baseRate: 1400, unit: 'kg', category: 'dairy' },
  مکھن: { baseRate: 1400, unit: 'kg', category: 'dairy' },
  paneer: { baseRate: 1200, unit: 'kg', category: 'dairy' },
  پنیر: { baseRate: 1200, unit: 'kg', category: 'dairy' },

  // Vegetables (Produce)
  potato: { baseRate: 80, unit: 'kg', category: 'produce' },
  potatoes: { baseRate: 80, unit: 'kg', category: 'produce' },
  aloo: { baseRate: 80, unit: 'kg', category: 'produce' },
  آلو: { baseRate: 80, unit: 'kg', category: 'produce' },
  onion: { baseRate: 140, unit: 'kg', category: 'produce' },
  onions: { baseRate: 140, unit: 'kg', category: 'produce' },
  pyaz: { baseRate: 140, unit: 'kg', category: 'produce' },
  پیاز: { baseRate: 140, unit: 'kg', category: 'produce' },
  tomato: { baseRate: 120, unit: 'kg', category: 'produce' },
  tomatoes: { baseRate: 120, unit: 'kg', category: 'produce' },
  tamatar: { baseRate: 120, unit: 'kg', category: 'produce' },
  ٹماٹر: { baseRate: 120, unit: 'kg', category: 'produce' },
  garlic: { baseRate: 450, unit: 'kg', category: 'produce' },
  lehsun: { baseRate: 450, unit: 'kg', category: 'produce' },
  لہسن: { baseRate: 450, unit: 'kg', category: 'produce' },
  ginger: { baseRate: 650, unit: 'kg', category: 'produce' },
  adrak: { baseRate: 650, unit: 'kg', category: 'produce' },
  ادرک: { baseRate: 650, unit: 'kg', category: 'produce' },
  'green chili': { baseRate: 180, unit: 'kg', category: 'produce' },
  'hari mirch': { baseRate: 180, unit: 'kg', category: 'produce' },
  'ہری مرچ': { baseRate: 180, unit: 'kg', category: 'produce' },
  spinach: { baseRate: 60, unit: 'kg', category: 'produce' },
  palak: { baseRate: 60, unit: 'kg', category: 'produce' },
  پالک: { baseRate: 60, unit: 'kg', category: 'produce' },
  okra: { baseRate: 130, unit: 'kg', category: 'produce' },
  bhindi: { baseRate: 130, unit: 'kg', category: 'produce' },
  بھنڈی: { baseRate: 130, unit: 'kg', category: 'produce' },
  karela: { baseRate: 120, unit: 'kg', category: 'produce' },
  'bitter gourd': { baseRate: 120, unit: 'kg', category: 'produce' },
  کریلے: { baseRate: 120, unit: 'kg', category: 'produce' },
  tinda: { baseRate: 90, unit: 'kg', category: 'produce' },
  ٹنڈے: { baseRate: 90, unit: 'kg', category: 'produce' },
  gobi: { baseRate: 90, unit: 'kg', category: 'produce' },
  cauliflower: { baseRate: 90, unit: 'kg', category: 'produce' },
  cabbage: { baseRate: 80, unit: 'kg', category: 'produce' },
  گوبھی: { baseRate: 90, unit: 'kg', category: 'produce' },
  'بند گوبھی': { baseRate: 80, unit: 'kg', category: 'produce' },
  peas: { baseRate: 160, unit: 'kg', category: 'produce' },
  matar: { baseRate: 160, unit: 'kg', category: 'produce' },
  مٹر: { baseRate: 160, unit: 'kg', category: 'produce' },
  lemon: { baseRate: 200, unit: 'kg', category: 'produce' },
  لیموں: { baseRate: 200, unit: 'kg', category: 'produce' },
  cucumber: { baseRate: 80, unit: 'kg', category: 'produce' },
  kheera: { baseRate: 80, unit: 'kg', category: 'produce' },
  کھیرا: { baseRate: 80, unit: 'kg', category: 'produce' },
  capsicum: { baseRate: 150, unit: 'kg', category: 'produce' },
  'shimla mirch': { baseRate: 150, unit: 'kg', category: 'produce' },
  'شملہ مرچ': { baseRate: 150, unit: 'kg', category: 'produce' },
  coriander: { baseRate: 30, unit: 'item', category: 'produce' },
  dhaniya: { baseRate: 30, unit: 'item', category: 'produce' },
  دھنیا: { baseRate: 30, unit: 'item', category: 'produce' },
  'ہرا دھنیا': { baseRate: 30, unit: 'item', category: 'produce' },
  mint: { baseRate: 30, unit: 'item', category: 'produce' },
  podina: { baseRate: 30, unit: 'item', category: 'produce' },
  پودینہ: { baseRate: 30, unit: 'item', category: 'produce' },

  // Grains, Flours, Pulses (Pantry)
  rice: { baseRate: 350, unit: 'kg', category: 'pantry' },
  basmati: { baseRate: 350, unit: 'kg', category: 'pantry' },
  chawal: { baseRate: 350, unit: 'kg', category: 'pantry' },
  چاول: { baseRate: 350, unit: 'kg', category: 'pantry' },
  'باسپتی چاول': { baseRate: 350, unit: 'kg', category: 'pantry' },
  flour: { baseRate: 140, unit: 'kg', category: 'pantry' },
  atta: { baseRate: 140, unit: 'kg', category: 'pantry' },
  آٹا: { baseRate: 140, unit: 'kg', category: 'pantry' },
  maida: { baseRate: 160, unit: 'kg', category: 'pantry' },
  میدہ: { baseRate: 160, unit: 'kg', category: 'pantry' },
  sugar: { baseRate: 155, unit: 'kg', category: 'pantry' },
  cheeni: { baseRate: 155, unit: 'kg', category: 'pantry' },
  چینی: { baseRate: 155, unit: 'kg', category: 'pantry' },
  tea: { baseRate: 360, unit: 'packet', category: 'pantry' },
  chai: { baseRate: 360, unit: 'packet', category: 'pantry' },
  پتی: { baseRate: 360, unit: 'packet', category: 'pantry' },
  'چائے کی پتی': { baseRate: 360, unit: 'packet', category: 'pantry' },
  'daal chana': { baseRate: 290, unit: 'kg', category: 'pantry' },
  'دال چنا': { baseRate: 290, unit: 'kg', category: 'pantry' },
  'daal mash': { baseRate: 480, unit: 'kg', category: 'pantry' },
  'دال ماش': { baseRate: 480, unit: 'kg', category: 'pantry' },
  'daal moong': { baseRate: 320, unit: 'kg', category: 'pantry' },
  'دال مونگ': { baseRate: 320, unit: 'kg', category: 'pantry' },
  'daal masoor': { baseRate: 330, unit: 'kg', category: 'pantry' },
  'دال مسور': { baseRate: 330, unit: 'kg', category: 'pantry' },
  dal: { baseRate: 320, unit: 'kg', category: 'pantry' },
  daal: { baseRate: 320, unit: 'kg', category: 'pantry' },
  دال: { baseRate: 320, unit: 'kg', category: 'pantry' },
  besan: { baseRate: 260, unit: 'kg', category: 'pantry' },
  بیسن: { baseRate: 260, unit: 'kg', category: 'pantry' },
  bread: { baseRate: 140, unit: 'packet', category: 'pantry' },
  'ڈبل روٹی': { baseRate: 140, unit: 'packet', category: 'pantry' },

  // Spices & Condiments
  salt: { baseRate: 40, unit: 'packet', category: 'spices' },
  namak: { baseRate: 40, unit: 'packet', category: 'spices' },
  نمک: { baseRate: 40, unit: 'packet', category: 'spices' },
  'red chili': { baseRate: 170, unit: 'packet', category: 'spices' },
  'lal mirch': { baseRate: 170, unit: 'packet', category: 'spices' },
  'لال مرچ': { baseRate: 170, unit: 'packet', category: 'spices' },
  turmeric: { baseRate: 120, unit: 'packet', category: 'spices' },
  haldi: { baseRate: 120, unit: 'packet', category: 'spices' },
  ہلدی: { baseRate: 120, unit: 'packet', category: 'spices' },
  cumin: { baseRate: 190, unit: 'packet', category: 'spices' },
  zeera: { baseRate: 190, unit: 'packet', category: 'spices' },
  زیرہ: { baseRate: 190, unit: 'packet', category: 'spices' },
  'garam masala': { baseRate: 160, unit: 'packet', category: 'spices' },
  'گرم مصالحہ': { baseRate: 160, unit: 'packet', category: 'spices' },
  'shan masala': { baseRate: 110, unit: 'packet', category: 'spices' },
  'شان مصالحہ': { baseRate: 110, unit: 'packet', category: 'spices' },
  'national masala': { baseRate: 110, unit: 'packet', category: 'spices' },
  'نیشنل مصالحہ': { baseRate: 110, unit: 'packet', category: 'spices' },
  biryani: { baseRate: 110, unit: 'packet', category: 'spices' },
  بریانی: { baseRate: 110, unit: 'packet', category: 'spices' },
  'بریانی مصالحہ': { baseRate: 110, unit: 'packet', category: 'spices' },
  karahi: { baseRate: 110, unit: 'packet', category: 'spices' },
  'کڑاہی مصالحہ': { baseRate: 110, unit: 'packet', category: 'spices' },
};

/**
 * Parses user-entered quantity string into normalized multiplier and unit.
 * Examples:
 * "1 kg" -> 1.0 (kg)
 * "2 kg" -> 2.0 (kg)
 * "500 g" or "500 gram" -> 0.5 (kg)
 * "250 g" or "1 pao" or "1 پاؤ" -> 0.25 (kg)
 * "2 dozen" or "2 درجن" -> 2.0 (dozen)
 * "2 liter" or "2 لیٹر" -> 2.0 (liter)
 * "آدھا کلو" -> 0.5 (kg)
 * "ڈیڑھ کلو" -> 1.5 (kg)
 * "ڈھائی کلو" -> 2.5 (kg)
 * "2" -> 2.0
 */
export function parseQuantity(rawQty: string): ParsedQuantity {
  if (!rawQty || !rawQty.trim()) {
    return { amount: 1, unit: 'item', unitMultiplier: 1, rawDisplay: '1' };
  }

  const str = rawQty.trim().toLowerCase();

  // Urdu common text amounts
  if (str.includes('آدھا کلو') || str.includes('half kg')) {
    return { amount: 0.5, unit: 'kg', unitMultiplier: 0.5, rawDisplay: '0.5 kg' };
  }
  if (str.includes('ڈیڑھ کلو') || str.includes('1.5 kg') || str.includes('1 1/2 kg')) {
    return { amount: 1.5, unit: 'kg', unitMultiplier: 1.5, rawDisplay: '1.5 kg' };
  }
  if (str.includes('ڈھائی کلو') || str.includes('2.5 kg') || str.includes('2 1/2 kg')) {
    return { amount: 2.5, unit: 'kg', unitMultiplier: 2.5, rawDisplay: '2.5 kg' };
  }
  if (str.includes('پاؤ') || str.includes('pao') || str.includes('paao')) {
    const m = str.match(/(\d+(\.\d+)?)/);
    const paoCount = m ? parseFloat(m[1]) : 1;
    return { amount: paoCount * 0.25, unit: 'kg', unitMultiplier: paoCount * 0.25, rawDisplay: `${paoCount * 250} g` };
  }
  if (str.includes('آدھی درجن') || str.includes('half dozen')) {
    return { amount: 0.5, unit: 'dozen', unitMultiplier: 0.5, rawDisplay: '0.5 dozen' };
  }

  // Gram check (g, gm, gram, گرام)
  const gramMatch = str.match(/(\d+(\.\d+)?)\s*(gm|g|gram|grams|گرام)/i);
  if (gramMatch) {
    const grams = parseFloat(gramMatch[1]);
    const kg = grams / 1000;
    return { amount: kg, unit: 'kg', unitMultiplier: kg, rawDisplay: `${grams} g` };
  }

  // Kg check (kg, kgs, kilo, کلو)
  const kgMatch = str.match(/(\d+(\.\d+)?)\s*(kg|kgs|kilo|kilos|کلو)/i);
  if (kgMatch) {
    const val = parseFloat(kgMatch[1]);
    return { amount: val, unit: 'kg', unitMultiplier: val, rawDisplay: `${val} kg` };
  }

  // Dozen check (dozen, doz, درجن)
  const dozenMatch = str.match(/(\d+(\.\d+)?)\s*(dozen|doz|درجن)/i);
  if (dozenMatch) {
    const val = parseFloat(dozenMatch[1]);
    return { amount: val, unit: 'dozen', unitMultiplier: val, rawDisplay: `${val} dozen` };
  }

  // Liter check (liter, l, ltr, لیٹر)
  const literMatch = str.match(/(\d+(\.\d+)?)\s*(liter|liters|ltr|l|لیٹر)/i);
  if (literMatch) {
    const val = parseFloat(literMatch[1]);
    return { amount: val, unit: 'liter', unitMultiplier: val, rawDisplay: `${val} liter` };
  }

  // ML check (ml, ملی لیٹر)
  const mlMatch = str.match(/(\d+(\.\d+)?)\s*(ml|ملی)/i);
  if (mlMatch) {
    const mls = parseFloat(mlMatch[1]);
    const liters = mls / 1000;
    return { amount: liters, unit: 'liter', unitMultiplier: liters, rawDisplay: `${mls} ml` };
  }

  // Packet check (pkt, packet, پیکٹ)
  const pktMatch = str.match(/(\d+(\.\d+)?)\s*(packet|pkt|پیکٹ|ڈبہ)/i);
  if (pktMatch) {
    const val = parseFloat(pktMatch[1]);
    return { amount: val, unit: 'packet', unitMultiplier: val, rawDisplay: `${val} packet` };
  }

  // Plain number without unit e.g. "2", "3", "5"
  const numMatch = str.match(/(\d+(\.\d+)?)/);
  if (numMatch) {
    const val = parseFloat(numMatch[1]);
    return { amount: val, unit: 'item', unitMultiplier: val, rawDisplay: `${val}` };
  }

  // Fallback
  return { amount: 1, unit: 'item', unitMultiplier: 1, rawDisplay: rawQty };
}

/**
 * Finds commodity rate and calculates realistic price based on quantity.
 * Scales dynamically with quantity (e.g. 1 kg -> 680, 2 kg -> 1360, 500g -> 340).
 */
export function estimateItemPrice(
  itemName: string,
  quantityStr: string,
  category: GroceryItem['category'] = 'produce',
  marketRates?: MarketRates
): number {
  if (!itemName || !itemName.trim()) return 100;

  const cleanName = itemName.trim().toLowerCase();
  const parsed = parseQuantity(quantityStr);

  // 1. Direct match or substring match in commodity price map
  let foundKey: string | null = null;
  let matchLength = 0;

  for (const key of Object.keys(COMMODITY_PRICE_MAP)) {
    if (cleanName === key) {
      foundKey = key;
      break;
    }
    if (cleanName.includes(key) && key.length > matchLength) {
      foundKey = key;
      matchLength = key.length;
    }
  }

  let baseRate = 120; // Default benchmark rate
  let commodityCat = category;

  if (foundKey) {
    const comm = COMMODITY_PRICE_MAP[foundKey];
    baseRate = comm.baseRate;
    commodityCat = comm.category;

    // Apply live customized market rates if user adjusted them in the Market Rates tab
    if (marketRates) {
      if ((foundKey.includes('chicken') || foundKey.includes('مرغی') || foundKey.includes('چکن')) && marketRates.chickenPerKg) {
        baseRate = marketRates.chickenPerKg;
      } else if ((foundKey.includes('beef') || foundKey.includes('بیف') || foundKey.includes('بڑا گوشت')) && marketRates.beefPerKg) {
        baseRate = marketRates.beefPerKg;
      } else if ((foundKey.includes('mutton') || foundKey.includes('مٹن') || foundKey.includes('چھوٹا گوشت')) && marketRates.muttonPerKg) {
        baseRate = marketRates.muttonPerKg;
      } else if ((foundKey.includes('oil') || foundKey.includes('تیل')) && marketRates.cookingOilPerLiter) {
        baseRate = marketRates.cookingOilPerLiter;
      } else if ((foundKey.includes('rice') || foundKey.includes('چاول')) && marketRates.basmatiRicePerKg) {
        baseRate = marketRates.basmatiRicePerKg;
      } else if ((foundKey.includes('atta') || foundKey.includes('آٹا')) && marketRates.attaPerKg) {
        baseRate = marketRates.attaPerKg;
      } else if ((foundKey.includes('egg') || foundKey.includes('انڈ')) && marketRates.eggsPerDozen) {
        baseRate = marketRates.eggsPerDozen;
      }
    }
  } else {
    // Category-level fallback rate per standard unit
    switch (commodityCat) {
      case 'meat':
        baseRate = marketRates?.chickenPerKg || 750;
        break;
      case 'produce':
        baseRate = marketRates?.seasonalSabziAvgPerKg || 120;
        break;
      case 'pantry':
        baseRate = 220;
        break;
      case 'dairy':
        baseRate = 220;
        break;
      case 'spices':
        baseRate = 110;
        break;
      default:
        baseRate = 120;
    }
  }

  // Multiply base rate by parsed quantity factor
  const calculated = Math.round(baseRate * (parsed.unitMultiplier > 0 ? parsed.unitMultiplier : 1));

  // Minimum safety floor: items won't be 0
  return Math.max(calculated, 30);
}

/**
 * Adjust quantity string (+1 step or -1 step) and return updated quantity string and updated price.
 */
export function stepQuantityAndPrice(
  currentQtyStr: string,
  direction: 'inc' | 'dec',
  currentPrice: number,
  itemName: string,
  category: GroceryItem['category'],
  marketRates?: MarketRates
): { newQtyStr: string; newPrice: number } {
  const parsed = parseQuantity(currentQtyStr);
  const curAmt = parsed.amount;
  let newAmt: number;

  if (direction === 'inc') {
    if (curAmt < 1) {
      newAmt = curAmt + 0.5;
    } else {
      newAmt = Math.round((curAmt + 1) * 10) / 10;
    }
  } else {
    if (curAmt <= 0.5) {
      newAmt = 0.25;
    } else if (curAmt <= 1) {
      newAmt = 0.5;
    } else {
      newAmt = Math.max(0.5, Math.round((curAmt - 1) * 10) / 10);
    }
  }

  let unitLabel = '';
  const lower = currentQtyStr.toLowerCase();
  if (lower.includes('kg') || lower.includes('کلو')) unitLabel = 'kg';
  else if (lower.includes('g') || lower.includes('گرام')) unitLabel = newAmt < 1 ? 'g' : 'kg';
  else if (lower.includes('dozen') || lower.includes('درجن')) unitLabel = 'dozen';
  else if (lower.includes('liter') || lower.includes('لیٹر')) unitLabel = 'liter';
  else if (lower.includes('packet') || lower.includes('پیکٹ')) unitLabel = 'packet';
  else unitLabel = parsed.unit === 'item' ? '' : parsed.unit;

  const newQtyStr = unitLabel ? `${newAmt} ${unitLabel}` : `${newAmt}`;
  const newPrice = estimateItemPrice(itemName, newQtyStr, category, marketRates);

  return { newQtyStr, newPrice };
}
