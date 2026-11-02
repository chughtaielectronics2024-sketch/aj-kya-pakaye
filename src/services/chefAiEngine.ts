import { Recipe, FamilyMember, MealHistoryEntry, Language } from '../types';
import { getLocalizedRecipe } from './recipeLocalization';
import { evaluateCurrentMealTime, TimeEvaluationResult } from './mealTimeEvaluator';

export interface SlotActionOption {
  label: string;
  slot: 'nashta' | 'dopahar' | 'raat';
  promptText: string;
}

export interface ChefAiResponse {
  reply: string;
  dishName: string;
  category: string;
  prepTime: string;
  bestUtensil: string;
  calories: number;
  budgetEstimatePKR: number;
  recipeId?: string;
  whyRecommended?: string;
  suggestedSlotActions?: SlotActionOption[];
}

// Comprehensive ingredient dictionary with aliases in Roman Urdu, Urdu script, and English
interface IngredientDef {
  key: string;
  ur: string;
  en: string;
  keywords: string[];
}

const INGREDIENTS_DB: IngredientDef[] = [
  { key: 'aloo', ur: 'آلو', en: 'Potato', keywords: ['alo', 'aloo', 'aalo', 'aaloo', 'potato', 'potatoes', 'آلو', 'الو'] },
  { key: 'palak', ur: 'پالک', en: 'Spinach', keywords: ['palak', 'paalak', 'spinach', 'پالک'] },
  { key: 'methi', ur: 'میتھی', en: 'Fenugreek', keywords: ['methi', 'meethi', 'fenugreek', 'میتھی'] },
  { key: 'matar', ur: 'مٹر', en: 'Peas', keywords: ['matar', 'mattar', 'muttar', 'peas', 'green peas', 'مٹر'] },
  { key: 'gobhi', ur: 'گوبھی', en: 'Cauliflower/Cabbage', keywords: ['gobi', 'gobhi', 'gobi phool', 'phool gobhi', 'band gobhi', 'cauliflower', 'cabbage', 'گوبھی', 'پھول گوبھی', 'بند گوبھی'] },
  { key: 'baingan', ur: 'بینگن', en: 'Eggplant', keywords: ['baingan', 'bangan', 'baigan', 'eggplant', 'brinjal', 'aubergine', 'بینگن'] },
  { key: 'bhindi', ur: 'بھنڈی', en: 'Okra', keywords: ['bhindi', 'bhendi', 'okra', 'ladyfinger', 'lady finger', 'بھنڈی'] },
  { key: 'karela', ur: 'کریلے', en: 'Bitter Gourd', keywords: ['karela', 'karelay', 'karelae', 'bitter gourd', 'کریلے', 'کریلا'] },
  { key: 'tori', ur: 'توری', en: 'Ridge Gourd/Zucchini', keywords: ['tori', 'turai', 'toori', 'ridge gourd', 'zucchini', 'توری', 'گھیا توری'] },
  { key: 'lauki', ur: 'لوکی / کدو', en: 'Bottle Gourd', keywords: ['lauki', 'kaddu', 'kadu', 'ghia', 'bottle gourd', 'pumpkin', 'لوکی', 'کدو', 'گھیا'] },
  { key: 'tinda', ur: 'ٹینڈے', en: 'Apple Gourd', keywords: ['tinda', 'tinday', 'apple gourd', 'round gourd', 'ٹینڈے', 'ٹینڈا'] },
  { key: 'arvi', ur: 'اروی', en: 'Taro Root', keywords: ['arvi', 'arbi', 'taro', 'taro root', 'اروی', 'اربی'] },
  { key: 'shalgam', ur: 'شلجم', en: 'Turnip', keywords: ['shalgam', 'shaljam', 'turnip', 'شلجم'] },
  { key: 'gajar', ur: 'گاجر', en: 'Carrot', keywords: ['gajar', 'carrot', 'carrots', 'گاجر'] },
  { key: 'mooli', ur: 'مولی', en: 'Radish', keywords: ['mooli', 'moli', 'radish', 'مولی'] },
  { key: 'shimla', ur: 'شملہ مرچ', en: 'Capsicum', keywords: ['shimla', 'shimla mirch', 'capsicum', 'bell pepper', 'شملہ مرچ', 'شملہ'] },
  { key: 'tamatar', ur: 'ٹماٹر', en: 'Tomato', keywords: ['tamatar', 'tamator', 'tomato', 'tomatoes', 'ٹماٹر'] },
  { key: 'pyaz', ur: 'پیاز', en: 'Onion', keywords: ['pyaz', 'pyaaz', 'piyaz', 'onion', 'onions', 'پیاز'] },
  { key: 'chicken', ur: 'چکن / مرغی', en: 'Chicken', keywords: ['chicken', 'chiken', 'murgi', 'murghi', 'مرغی', 'چکن'] },
  { key: 'gosht', ur: 'گوشت (مٹن/بیف)', en: 'Meat (Mutton/Beef)', keywords: ['gosht', 'ghost', 'meat', 'mutton', 'beef', 'bakra', 'bara gosht', 'گوشت', 'مٹن', 'بیف'] },
  { key: 'qeema', ur: 'قیمہ', en: 'Minced Meat', keywords: ['qeema', 'keema', 'mince', 'minced meat', 'قیمہ'] },
  { key: 'daal', ur: 'دال', en: 'Lentils', keywords: ['daal', 'dal', 'lentil', 'lentils', 'moong', 'masoor', 'chana daal', 'mash', 'دال', 'مونگ', 'مسور', 'ماش'] },
  { key: 'chana', ur: 'چنے', en: 'Chickpeas', keywords: ['chana', 'chanay', 'chola', 'cholay', 'chholay', 'chickpeas', 'garbanzo', 'چنے', 'چھولے', 'چنا'] },
  { key: 'anda', ur: 'انڈے', en: 'Eggs', keywords: ['anda', 'anday', 'egg', 'eggs', 'انڈا', 'انڈے'] },
  { key: 'machli', ur: 'مچھلی', en: 'Fish', keywords: ['machli', 'machhli', 'fish', 'مچھلی'] },
  { key: 'paneer', ur: 'پنیر', en: 'Cottage Cheese', keywords: ['paneer', 'panir', 'cheese', 'cottage cheese', 'پنیر'] },
  { key: 'chawal', ur: 'چاول', en: 'Rice', keywords: ['chawal', 'rice', 'basmati', 'biryani rice', 'چاول'] },
  { key: 'dahi', ur: 'دہی', en: 'Yogurt', keywords: ['dahi', 'yogurt', 'curd', 'دہی'] },
  { key: 'besan', ur: 'بیسن', en: 'Gram Flour', keywords: ['besan', 'gram flour', 'chickpea flour', 'بیسن'] },
  { key: 'suji', ur: 'سوجی', en: 'Semolina', keywords: ['suji', 'sooji', 'semolina', 'سوجی'] },
  { key: 'saag', ur: 'سرسوں کا ساگ', en: 'Mustard Greens', keywords: ['saag', 'sarson', 'sarson ka saag', 'ساگ', 'سرسوں'] },
  { key: 'bread', ur: 'ڈبل روٹی / بریڈ', en: 'Bread', keywords: ['bread', 'double roti', 'toast', 'بریڈ', 'ڈبل روٹی'] }
];

export function extractIngredients(query: string): string[] {
  const q = query.toLowerCase();
  const matched = new Set<string>();

  for (const item of INGREDIENTS_DB) {
    for (const kw of item.keywords) {
      // Word boundary match or substring check for Urdu
      const isUrdu = /[\u0600-\u06FF]/.test(kw);
      if (isUrdu) {
        if (q.includes(kw)) {
          matched.add(item.key);
          break;
        }
      } else {
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        if (regex.test(q) || (kw.length >= 4 && q.includes(kw))) {
          matched.add(item.key);
          break;
        }
      }
    }
  }

  return Array.from(matched);
}

export function detectSlotInQuery(q: string): 'dopahar' | 'raat' | 'nashta' | null {
  const lower = q.toLowerCase();

  // If user says "lunch or dinner" or asks a question without choosing
  if (
    lower.includes('dinner ya lunch') || 
    lower.includes('lunch ya dinner') || 
    lower.includes('دوپہر یا رات') || 
    lower.includes('لنچ یا ڈنر') ||
    lower.includes('dinner or lunch') ||
    lower.includes('lunch or dinner')
  ) {
    return null;
  }

  const isLunch = lower.includes('lunch') || lower.includes('dopahar') || lower.includes('dupehr') || lower.includes('dopahr') || lower.includes('لنچ') || lower.includes('دوپہر');
  const isDinner = lower.includes('dinner') || lower.includes('raat') || lower.includes('sham') || lower.includes('rat') || lower.includes('رات') || lower.includes('ڈنر') || lower.includes('شام');
  const isBreakfast = lower.includes('nashta') || lower.includes('breakfast') || lower.includes('brunch') || lower.includes('subah') || lower.includes('ناشتہ') || lower.includes('برنچ') || lower.includes('صبح');

  if (isLunch && !isDinner) return 'dopahar';
  if (isDinner && !isLunch) return 'raat';
  if (isBreakfast) return 'nashta';
  return null;
}

// Generate an exact, tailored answer based on user query
export function getSmartCulinaryAnswer(
  query: string,
  recipes: Recipe[] = [],
  familyMembers: FamilyMember[] = [],
  history: MealHistoryEntry[] = [],
  lang: Language = 'ur',
  previousUserMessage?: string
): ChefAiResponse {
  const isUr = ['ur', 'ps', 'pa', 'ar', 'fa'].includes(lang);
  const q = query.toLowerCase().trim();

  // 0. GREETINGS (السلام علیکم / Assalam-o-Alaikum / Salam / Hey)
  const isGreetingQuery =
    q === 'salam' || q === 'assalam o alaikum' || q === 'assalam-o-alaikum' ||
    q === 'assalamualaykum' || q === 'assalamu alaikum' || q === 'asalam o alaikum' ||
    q === 'aslam o alaikum' || q === 'aoa' || q === 'slam' ||
    q === 'السلام علیکم' || q === 'اسلام علیکم' || q === 'سلام' ||
    q === 'ہیلو' || q === 'hello' || q === 'hi' || q === 'hey' ||
    ((q.startsWith('salam') || q.startsWith('assalam')) && q.length < 25 && !q.includes('chicken') && !q.includes('aloo'));

  if (isGreetingQuery) {
    let replyText = '';
    if (lang === 'en') {
      replyText = `Wa Alaikum Assalam wa Rahmatullah wa Barakatuh! (Assalam-o-Alaikum!)\n\nWelcome! I am your authentic Pakistani AI Master Chef & Certified Family Nutritionist.\nTell me what ingredients or chicken/meat you have in your fridge, or let me know if you would like meal suggestions for today!`;
    } else if (lang === 'es') {
      replyText = `¡Wa Alaikum Assalam wa Rahmatullah wa Barakatuh!\n\n¡Bienvenido! Soy su Chef Maestro de Cocina Pakistaní y Nutricionista Familiar.\nCuénteme qué ingredientes tiene en su refrigerador o solicite recomendaciones para hoy.`;
    } else if (lang === 'pa') {
      replyText = `وعلیکم السلام و رحمتہ اللہ و برکاتہ!\n\nجی آیاں نوں! میں تواڈا مستند پاکستانی AI ماہر باورچی ہاں۔\nدسو اج فریج چ کی سامان پیا اے؟ یا ویلے دے مطابق کھانا تجویز کراں؟`;
    } else if (lang === 'ps') {
      replyText = `وعلیکم السلام و رحمتہ اللہ و برکاتہ!\n\nښه راغلاست! زه ستاسو هوښیار پخلنځي لارښود یم.\nووایاست په فریج کې مو څه شته یا د نن ورځې خواړه وټاکم؟`;
    } else if (lang === 'ar') {
      replyText = `وعليكم السلام ورحمة الله وبركاته!\n\nأهلاً بك! أنا خبير الطهي الباكستاني الذكي.\nأخبرني ماذا يتوفر لديك في الثلاجة، أو اطلب اقتراحات لوجبات اليوم!`;
    } else if (lang === 'fa') {
      replyText = `وعلیکم السلام و رحمتہ اللہ و برکاتہ!\n\nخوش آمدید! من سرآشپز هوشمند غذاهای پاکستانی هستم.\nبفرمایید در یخچال چه موادی دارید یا پیشنهاد غذای امروز را می‌خواهید؟`;
    } else {
      replyText = `وعلیکم السلام و رحمتہ اللہ و برکاتہ!\n\nخوش آمدید! اَلسَّلَامُ عَلَيْکُم (Assalam-o-Alaikum!)\nمیں آپ کا مستند پاکستانی AI ماہر باورچی اور فیملی نیوٹریشنسٹ ہوں۔\nبتائیے آج آپ کے پاس فریج میں کیا سامان، سبزی یا چکن موجود ہے؟ یا آج کے وقت کے لحاظ سے کھانا تجویز کروں؟`;
    }

    return {
      reply: replyText,
      dishName: '',
      category: lang === 'en' ? 'Welcome (Greeting)' : 'خوش آمدید (Greeting)',
      prepTime: '',
      bestUtensil: '',
      calories: 0,
      budgetEstimatePKR: 0,
      suggestedSlotActions: [
        {
          label: lang === 'en' ? '🍗 Have chicken in fridge' : lang === 'es' ? '🍗 Tengo pollo en el refrigerador' : lang === 'ps' ? '🍗 په فریج کې چرګ لرم' : lang === 'ar' ? '🍗 لدي دجاج في الثلاجة' : lang === 'fa' ? '🍗 در یخچال مرغ دارم' : lang === 'pa' ? '🍗 فریج چ چکن ہے، کی بناواں؟' : '🍗 فریج میں چکن ہے، کیا کیا بنا سکتے ہیں؟',
          slot: 'dopahar',
          promptText: lang === 'en' ? 'I have chicken in fridge what to cook' : lang === 'es' ? 'Tengo pollo en el refrigerador qué cocino' : lang === 'pa' ? 'میرے کول فریج چ چکن پیا اے کی بناواں' : lang === 'ps' ? 'په فریج کې چرګ شته څه پخ کړم' : lang === 'ar' ? 'لدي دجاج في الثلاجة ماذا أطبخ' : lang === 'fa' ? 'در یخچال مرغ دارم چی بپزم' : 'میرے پاس فریج میں چکن پڑا ہے کیا بناؤں'
        },
        {
          label: lang === 'en' ? '⏰ What to cook today?' : lang === 'es' ? '⏰ ¿Qué cocinamos hoy?' : lang === 'ps' ? '⏰ نن څه پخ کړو؟' : lang === 'ar' ? '⏰ ماذا نطبخ اليوم؟' : lang === 'fa' ? '⏰ امروز چی بپزیم؟' : lang === 'pa' ? '⏰ اج کی پکائیے؟' : '⏰ آج وقت کے مطابق کیا پکائیں؟',
          slot: 'dopahar',
          promptText: lang === 'en' ? 'What to cook today evaluated by time' : lang === 'es' ? 'Qué cocinamos hoy evaluado por hora' : lang === 'pa' ? 'اج کی پکائیے ویلے دے مطابق دسو' : lang === 'ps' ? 'نن څه پخ کړو د وخت مطابق وټاکئ' : lang === 'ar' ? 'ماذا نطبخ اليوم حسب الوقت' : lang === 'fa' ? 'امروز چی بپزیم بر اساس زمان' : 'آج کیا پکائیں وقت کے مطابق بتائیں'
        },
        {
          label: lang === 'en' ? '🥔 Have potatoes and fenugreek' : lang === 'es' ? '🥔 Tengo patatas y fenogreco' : lang === 'ps' ? '🥔 کچالو او میتي شته' : lang === 'ar' ? '🥔 لدي بطاطس وحلبة' : lang === 'fa' ? '🥔 سیب زمینی و شنبلیله دارم' : lang === 'pa' ? '🥔 فریج چ آلو تے میتھی ہے' : '🥔 فریج میں آلو اور میتھی ہے',
          slot: 'dopahar',
          promptText: lang === 'en' ? 'I have potatoes and fenugreek in fridge' : lang === 'es' ? 'Tengo patatas y fenogreco en el refrigerador' : lang === 'pa' ? 'میرے کول فریج چ آلو تے میتھی ہے' : lang === 'ps' ? 'په فریج کې کچالو او میتي شته' : lang === 'ar' ? 'لدي بطاطس وحلبة في الثلاجة' : lang === 'fa' ? 'در یخچال سیب زمینی و شنبلیله دارم' : 'میرے پاس فریج میں آلو اور میتھی ہے'
        }
      ]
    };
  }

  // Check if slot specified in current query
  const specifiedSlot = detectSlotInQuery(q);

  // 1. EXTRACT INGREDIENTS FIRST (User says: "fridge me alo palak methi rakhi hai")
  let detectedKeys = extractIngredients(q);

  // Context remembrance: if user says "lunch" or "dinner" without repeating ingredients, check previous message!
  if (detectedKeys.length === 0 && previousUserMessage) {
    const prevKeys = extractIngredients(previousUserMessage);
    if (prevKeys.length > 0 && specifiedSlot) {
      detectedKeys = prevKeys;
    }
  }

  // 1.1 SPECIAL CHICKEN MULTI-OPTIONS HANDLER (Never defaults to just Chicken Karahi!)
  if (detectedKeys.includes('chicken') || q.includes('chicken') || q.includes('چکن') || q.includes('مرغی')) {
    const chickenSet = new Set(detectedKeys);
    chickenSet.add('chicken');
    return generateChickenMultiOptionsResponse(q, chickenSet, recipes, familyMembers, isUr, specifiedSlot, lang);
  }

  if (detectedKeys.length > 0) {
    return generateIngredientSpecificResponse(detectedKeys, recipes, familyMembers, isUr, specifiedSlot, lang);
  }

  // 1.5 CHECK IF USER IS ASKING "WHAT TO COOK TODAY" (آج کیا پکائیں / وقت اور چھٹی کے مطابق جائزہ)
  const isAskingWhatToCook =
    q.includes('کیا پکا') || q.includes('کیا بنا') || q.includes('کیا کھا') ||
    q.includes('aj kya') || q.includes('aaj kya') || q.includes('kya pakaye') ||
    q.includes('kya paka') || q.includes('kya banaye') || q.includes('kya bana') ||
    q.includes('what to cook') || q.includes('what should i cook') ||
    q.includes('suggest') || q.includes('recommend') || q.includes('menu') ||
    q.includes('تجویز') || q.includes('مینیو') || q.includes('پکائیں') ||
    q.includes('بنائیں') || q.includes('پکاؤں') || q.includes('بناؤں') ||
    q === 'today' || q === 'aj' || q === 'aaj' || !q;

  if (isAskingWhatToCook) {
    const timeEval = evaluateCurrentMealTime();
    return generateTimeAwareMealRecommendation(timeEval, recipes, familyMembers, history, isUr, lang);
  }

  // 2. COOKING ISSUES & KITCHEN FIXES
  // Salt excess
  if (q.includes('نمک') || q.includes('salt') || q.includes('namak')) {
    return {
      reply: isUr
        ? `پریشان نہ ہوں! اگر سالن میں نمک زیادہ ہو جائے تو یہ ۳ آزمودہ روایتی طریقے اپنائیں:
۱. **کچا آلو:** ایک درمیانے سائز کا آلو چھیل کر دو ٹکڑے کریں اور سالن میں ڈال کر ۱۰ منٹ دھیمی آنچ پر پکنے دیں۔ آلو اضافی نمک چوس لے گا۔ بعد میں آلو نکال لیں۔
۲. **آٹے کے پیڑے:** گندم کے گندھے ہوئے آٹے کے ۲ چھوٹے پیڑے سالن میں ڈال دیں اور ۵ منٹ بعد نکال لیں۔ آٹا نمک کو اپنے اندر کھینچ لیتا ہے۔
۳. **دہی یا دودھ:** سالن میں ۲ چمچ پھینٹی ہوئی دہی یا تھوڑا سا دودھ شامل کر لیں۔ اس سے نمک کا تیز پن فوراً معتدل ہو جائے گا۔`
        : `If salt is too high in your dish, try these 3 quick master chef tips:
1. Peel a raw potato, cut into half, and simmer in the gravy for 10 minutes. The potato absorbs excess sodium.
2. Drop two small balls of kneaded wheat dough into the gravy, simmer for 5 minutes, and discard them.
3. Stir in 2 tablespoons of whisked yogurt or a splash of milk to balance the sharpness.`,
      dishName: '',
      category: 'ٹوٹکے (Kitchen Tips)',
      prepTime: '5 منٹ',
      bestUtensil: 'دیگچی / کڑاہی',
      calories: 0,
      budgetEstimatePKR: 20
    };
  }

  // Oil / Ghee excess
  if (q.includes('تیل') || q.includes('گھی') || q.includes('oil') || q.includes('ghee')) {
    return {
      reply: isUr
        ? `سالن میں اضافی تیل یا گھی کم کرنے کا آسان طریقہ:
۱. سالن کو چولہے سے اتار کر ۵ سے ۱۰ منٹ ٹھنڈا ہونے دیں۔ سارا گھی خودبخود سطح پر آ جائے گا، اسے چمچ سے نکال کر کسی پیالی میں محفوظ کر لیں۔
۲. برف کا ایک ٹکڑا کسی بڑے چمچ پر رکھیں اور سالن کی سطح پر آہستہ سے گھمائیں۔ جما ہوا گھی برف والے چمچ سے چپک جائے گا۔
۳. آئندہ کھانا بناتے وقت پیاز اور ادرک لہسن کو کم تیل میں بھونتے ہوئے ہلکا سا پانی کا چھینٹا دیں تاکہ مصالحہ جلے نہیں۔`
        : `To reduce excess cooking oil or ghee:
1. Let the pot rest off heat for 5-10 minutes. The oil will separate to the surface; gently ladle it out.
2. Glide an ice cube placed on a cold metal spoon over the surface; congealed oil will cling to the spoon.
3. Sauté spices with minimal oil and splash small drops of water to prevent burning.`,
      dishName: '',
      category: 'ٹوٹکے (Kitchen Tips)',
      prepTime: '5 منٹ',
      bestUtensil: 'دیگچی',
      calories: 0,
      budgetEstimatePKR: 0
    };
  }

  // Chili / Spices too hot
  if (q.includes('مرچ') || q.includes('spicy') || q.includes('chili') || q.includes('تیز')) {
    return {
      reply: isUr
        ? `اگر سالن میں مرچیں تیز ہو جائیں تو یہ تدابیر آزمائیں:
۱. سالن میں ۲ سے ۳ چمچ تازہ پھینٹا ہوا دہی یا تھوڑی سی فریش ملائی شامل کر کے ہلکی آنچ پر ۲ منٹ پکائیں۔
۲. آدھے لیموں کا رس اور ایک چٹکی چینی شامل کر لیں، ترشی اور مٹھاس مرچوں کی تندی کو فوری دبا دیتی ہے۔
۳. شوربے یا گریوی کی مقدار بڑھانے کے لیے تھوڑا سا ٹماٹر کا پیسٹ یا بھنا ہوا پیاز شامل کر لیں۔`
        : `To tone down excessive chili heat:
1. Whisk in 2-3 tablespoons of plain yogurt or fresh cream and simmer for 2 minutes.
2. Squeeze fresh lemon juice with a pinch of sugar; acidity and gentle sweetness temper capsaicin.
3. Increase the gravy base with pureed tomatoes or mild vegetable broth.`,
      dishName: '',
      category: 'ٹوٹکے (Kitchen Tips)',
      prepTime: '5 منٹ',
      bestUtensil: 'کڑاہی',
      calories: 0,
      budgetEstimatePKR: 30
    };
  }

  // Meat tenderizing / Gosht galana
  if (q.includes('گوشت') || q.includes('galane') || q.includes('tender') || q.includes('sakht')) {
    return {
      reply: isUr
        ? `گوشت (مٹن یا بیف) کو جلدی اور مکھن کی طرح نرم گلانے کا طریقہ:
۱. **کچا پپیتا یا کچری:** گوشت پر ۱ چائے کا چمچ کچے پپیتے کا پیسٹ یا کچری پاؤڈر لگا کر ۳۰ منٹ رکھ دیں۔
۲. **دہی کی میرینیشن:** دہی اور لیموں کے رس میں میرینیٹ کرنے سے گوشت کے ریشے نرم پڑ جاتے ہیں۔
۳. **دھیمی آنچ اور دم:** بھنائی کے بعد ٹھنڈا پانی نہ ڈالیں بلکہ نیم گرم پانی ڈال کر برتن کا ڈھکن اچھی طرح بند کر کے دھیمی آنچ پر پکائیں تاکہ گوشت جوسی اور نرم بنے۔`
        : `Secrets for melt-in-mouth tender mutton and beef:
1. Marinate with 1 tsp raw papaya paste or meat tenderizer powder for 30 minutes.
2. Yogurt and lemon juice acid gently break down tough meat fibers.
3. Always pour warm water (not cold) after sautéing and simmer with a tightly sealed lid on gentle flame.`,
      dishName: 'نرم اور لذیذ گوشت پکانے کی ترکیب',
      category: 'گوشت (Meat)',
      prepTime: '45 منٹ',
      bestUtensil: 'پریشر ککر یا مٹی کی ہانڈی',
      calories: 320,
      budgetEstimatePKR: 800
    };
  }

  // Rice / Biryani / Pulao grains
  if (q.includes('چاول') || q.includes('بریانی') || q.includes('پلاؤ') || q.includes('rice')) {
    return {
      reply: isUr
        ? `چاول اور بریانی کے چاول کھلے کھلے اور لمبے بنانے کے باورچی خانے کے گر:
۱. چاولوں کو پکانے سے کم از کم ۳۰ منٹ پہلے پانی میں بھگو کر رکھیں۔
۲. چاول ابالتے وقت پانی میں ۱ چمچ سرکہ یا لیموں کا رس اور ۱ چمچ تیل ڈالیں، اس سے چاول کبھی نہیں جڑیں گے۔
۳. بریانی کیلئے چاولوں کو صرف ۸۰ فیصد (ایک کنی) ابالیں، باقی دم کے دوران مکمل پکیں گے۔
۴. دم کھولنے کے بعد فوراً بڑا چمچ نہ چلائیں بلکہ کانٹے کی پشت سے ہلکے ہاتھ سے کھولیں۔`
        : `Master secrets for fluffy, separated basmati rice:
1. Soak basmati rice for at least 30 minutes before boiling.
2. Add 1 tsp vinegar or lemon juice plus 1 tsp oil to the boiling water to keep grains firm and bright.
3. Par-boil to 80% doneness before layering for steam (dum).
4. Fluff gently with a fork after letting it rest for 5 minutes.`,
      dishName: 'کراچی چکن بریانی و دیگی چاول',
      category: 'چاول (Rice)',
      prepTime: '35 منٹ',
      bestUtensil: 'دیگچی (Heavy Degchi)',
      calories: 420,
      budgetEstimatePKR: 500,
      recipeId: 'chicken-biryani'
    };
  }

  // Roti soft / Phulka
  if (q.includes('روٹی') || q.includes('roti') || q.includes('phulka') || q.includes('نرم')) {
    return {
      reply: isUr
        ? `گرما گرم نرم اور پھولی ہوئی روٹی بنانے کے راز:
۱. آٹا گوندھتے وقت نیم گرم پانی استعمال کریں اور آٹے کو نرم رکھیں۔ گوندھنے کے بعد ۱۵ منٹ گیلے کپڑے سے ڈھانپ کر رکھیں۔
۲. توے کو پہلے تیز گرم کریں، ٹھنڈے توے پر روٹی ڈالنے سے وہ اکڑ جاتی ہے۔
۳. روٹی ڈال کر جب ہلکے بلبلے آئیں تو فورا پلٹیں، اور کپڑے سے ہلکا سا دبا کر پھلائیں۔
۴. بناتے ہی روٹی کو ڈھکن والے ہاٹ پاٹ یا سوتی کپڑے میں رکھیں تاکہ نرم رہے۔`
        : `Tips for ultra-soft, fluffy homemade Phulka Roti:
1. Knead dough with lukewarm water and let it rest covered with a damp cloth for 15 minutes.
2. Ensure the tawa is properly preheated; cool pans make flat, chewy rotis.
3. Flip as soon as tiny bubbles appear, then gently press with a clean cloth to puff up.
4. Store immediately in an insulated container lined with a cotton towel.`,
      dishName: 'نرم پھلکا روٹی',
      category: 'روٹی (Breads)',
      prepTime: '15 منٹ',
      bestUtensil: 'لوہے کا توا (Iron Tawa)',
      calories: 120,
      budgetEstimatePKR: 50
    };
  }

  // 3. HEALTH & DIETARY CARE
  // Abu / Cholesterol / Low Salt & Oil
  if (q.includes('ابو') || q.includes('father') || q.includes('cholesterol') || q.includes('کولیسٹرول')) {
    const matched = recipes.find(r => r.id === 'tori-bhujia-roti') || recipes.find(r => r.category === 'sabzi') || recipes[0];
    const loc = matched ? getLocalizedRecipe(matched, lang) : null;
    return {
      reply: isUr
        ? `ابو جان کی صحت (کولیسٹرول، کم نمک اور کم تیل) کے لیے خاص مشورہ:
• **تجویز کردہ سالن:** ${loc ? loc.displayTitle : 'توری یا کدو کی ہلکی بھجیا'}، ابلے ہوئے چاول یا نرم پتلی روٹی کے ساتھ۔
• **پکانے کا اصول:** گھی کے بجائے زیادہ سے زیادہ ۱ چائے کا چمچ زیتون یا سرسوں کا تیل استعمال کریں۔
• **نمک و مصالحے:** نمک برائے نام رکھیں اور سرخ مرچ کے بجائے زیرہ، دھنیا اور ہلکی کالی مرچ استعمال کریں۔
• **طبی فائدہ:** یہ چکنائی سے پاک ہے اور دل اور شریانوں پر بوجھ نہیں ڈالتا۔`
        : `Guidance for Abu (Cholesterol, Low Salt & Oil restriction):
• Recommended: Fresh Tori Bhujia, Lauki Salan, or Moong Daal with soft roti.
• Cooking: Use max 1 teaspoon of healthy oil; avoid ghee or fried foods.
• Seasoning: Minimal sodium, replace red chilies with cumin and coriander.`,
      dishName: loc ? loc.displayTitle : 'توری کی ہلکی بھجیا',
      category: 'سبزی (Sabzi)',
      bestUtensil: 'مٹی کی ہانڈی یا نان اسٹک پین',
      prepTime: '20 منٹ',
      calories: 180,
      budgetEstimatePKR: 150,
      recipeId: matched?.id
    };
  }

  // Ami / Sensitive Stomach / Digestive Care
  if (q.includes('امی') || q.includes('mother') || q.includes('معدہ') || q.includes('stomach') || q.includes('ہاضمہ') || q.includes('بھاری')) {
    const matched = recipes.find(r => r.id === 'white-rice-moong-masoor') || recipes.find(r => r.id === 'tori-bhujia-roti') || recipes[0];
    const loc = matched ? getLocalizedRecipe(matched, lang) : null;
    return {
      reply: isUr
        ? `امی جان کی صحت (معدے کی حساسیت اور ہلکا کھانا) کے لیے خصوصی مشورہ:
• **تجویز کردہ کھانا:** ${loc ? loc.displayTitle : 'تڑکا مونگ مسور دال اور سفید چاول'} یا نرم کھچڑی۔
• **پرہیز:** فاسٹ فوڈ، نان، پراٹھے، تلی ہوئی اشیاء اور زیادہ گرم مصالحے سے مکمل پرہیز کروائیں کیونکہ ان کا معدہ بھاری کھانا ہضم نہیں کر پاتا۔
• **پکانے کا گر:** سبزی یا دال کو نرم گلا کر بنائیں اور اوپر سے صرف زیرے اور ہری الائچی کا ہلکا تڑکا دیں۔
• کھانے کے بعد ایک کپ سونف اور پودینے کا نیم گرم قہوہ ان کے ہاضمے کے لیے دوا کا کام کرے گا۔`
        : `Guidance for Ami (Sensitive Stomach & Light Diet):
• Recommended: Light Moong Masoor Daal with soft boiled rice or khichdi.
• Avoid: Fast food, deep-fried items, heavy biryanis, and sharp red chilies.
• Cooking: Thoroughly cooked, mildly tempered with cumin and mint. Warm fennel (saunf) tea afterwards aids digestion.`,
      dishName: loc ? loc.displayTitle : 'مونگ مسور دال چاول',
      category: 'دال (Daal)',
      bestUtensil: 'مٹی کی ہانڈی (Clay Pot)',
      prepTime: '25 منٹ',
      calories: 220,
      budgetEstimatePKR: 180,
      recipeId: matched?.id
    };
  }

  // Sugar / Diabetes
  if (q.includes('شوگر') || q.includes('sugar') || q.includes('diabetes') || q.includes('ذیابیطس')) {
    return {
      reply: isUr
        ? `شوگر (Diabetes) کے مریضوں کے لیے بہترین کھانے کا انتخاب:
۱. **کریلے اور میتھی:** کریلے پیاز کا سالن یا میتھی کی بھجیا بلڈ شوگر کو متوازن رکھنے میں قدرتی دوا ہے۔
۲. **دال مونگ یا چنا:** ہائی فائبر اور لو گلیسیمک انڈیکس والی دالیں استعمال کریں۔
۳. **روٹی:** میدہ یا سفید چاول کے بجائے گندم کے چوکر والی یا بیسن ملی روٹی دیں۔
۴. کھانے کے ساتھ کھیرے اور ٹماٹر کا سلاد لازمی شامل کریں۔`
        : `Healthy meal choice for Diabetes / Blood Sugar control:
1. Karela (Bitter gourd) or Methi (Fenugreek) helps naturally balance glucose levels.
2. Opt for high-fiber Moong Daal, Chana Daal, or seasonal vegetables.
3. Use whole wheat bran or besan roti instead of refined flour or large rice portions.`,
      dishName: 'کریلے پیاز مصالحہ یا میتھی آلو',
      category: 'سبزی (Sabzi)',
      prepTime: '30 منٹ',
      bestUtensil: 'لوہے کی کڑاہی',
      calories: 190,
      budgetEstimatePKR: 200,
      recipeId: 'karelay-pyaz-roti'
    };
  }

  // Quick / 20 mins / Jaldi
  if (q.includes('20') || q.includes('جلدی') || q.includes('quick') || q.includes('fast') || q.includes('emergency')) {
    return {
      reply: isUr
        ? `صرف ۱۵ سے ۲۰ منٹ میں تیار ہونے والے فوری اور مزیدار کھانے:
۱. **انڈا خاگینہ / پیاز انڈا بھجیا:** باریک پیاز، ٹماٹر، ہری مرچیں بھون کر انڈے پھینٹ کر ڈالیں، ۱۰ منٹ میں تیار!
۲. **آلو زیرہ بھجیا:** آلوؤں کے گول قتلے کاٹ کر کڑاہی میں زیرے اور کٹی لال مرچ میں ۱۰ منٹ دم پر بنائیں۔
۳. **تڑکا دال مونگ:** پریشر ککر میں ۸ منٹ میں گل جائے گی، زیرے لہسن کا تڑکا لگائیں اور روٹی کے ساتھ پیش کریں۔`
        : `Quick 15-20 minute meal ideas:
1. Desi Egg Khagina / Scrambled Masala Eggs (ready in 10 mins).
2. Aloo Zeera Slices (sautéed potato rounds with cumin).
3. Quick Tarka Moong Daal with fresh phulkas.`,
      dishName: 'انڈا پیاز خاگینہ و آلو زیرہ بھجیا',
      category: 'ناشتہ / ہلکا کھانا',
      prepTime: '15 منٹ',
      bestUtensil: 'نان اسٹک فرائنگ پین یا کڑاہی',
      calories: 260,
      budgetEstimatePKR: 160,
      recipeId: 'anda-paratha-omelette'
    };
  }

  // Sunday / Weekend / Dawat
  if (q.includes('sunday') || q.includes('اتوار') || q.includes('weekend') || q.includes('دعوت') || q.includes('خاص')) {
    return {
      reply: isUr
        ? `اتوار اور چھٹی کے دن کیلئے گھر والوں کی پسندیدہ خاص ڈش:
• **صبح ناشتہ:** لاہوری حلوہ پوری، چنے اور کڑک چائے۔
• **دوپہر یا رات کا کھانا:** کراچی یا سندھی چکن دم بریانی، پودینے کا رائتہ اور تازہ سلاد۔
• **باورچی کا مشورہ:** چکن بریانی دم پر لگاتے وقت اوپر سے ۲ چمچ دیسی گھی اور زعفرانی رنگ ڈالیں تاکہ روایتی خوشبو آئے۔`
        : `Special Sunday & Weekend feast recommendations:
• Breakfast: Lahori Halwa Puri with spicy chana tarkari.
• Lunch/Dinner: Karachi Chicken Dum Biryani with mint raita and salad.
• Chef Tip: Drizzle a spoon of desi ghee and saffron kewra before dum for that signature wedding aroma.`,
      dishName: 'کراچی چکن دم بریانی اور لاہوری حلوہ پوری',
      category: 'چاول (Rice)',
      prepTime: '45 منٹ',
      bestUtensil: 'بھاری پیندی والی دیگچی',
      calories: 480,
      budgetEstimatePKR: 650,
      recipeId: 'chicken-biryani'
    };
  }

  // 4. GENERAL FALLBACK: Contextual recommendation respecting time & weekend/holiday evaluation
  const timeEval = evaluateCurrentMealTime();
  return generateTimeAwareMealRecommendation(timeEval, recipes, familyMembers, history, isUr, lang);
}

// Helper to generate time & holiday aware meal recommendation
function generateTimeAwareMealRecommendation(
  timeEval: TimeEvaluationResult,
  recipes: Recipe[],
  familyMembers: FamilyMember[],
  history: MealHistoryEntry[],
  isUr: boolean,
  lang: Language
): ChefAiResponse {
  const recentIds = new Set(history.slice(0, 4).map(h => h.recipeId));

  if (timeEval.slot === 'nashta') {
    let candidate: Recipe | undefined;
    if (timeEval.isWeekend || timeEval.isPublicHoliday) {
      candidate = recipes.find(r => r.id === 'halwa-puri') ||
                  recipes.find(r => r.id === 'beef-nihari') ||
                  recipes.find(r => r.category === 'nashta');
    } else {
      candidate = recipes.find(r => r.id === 'anda-paratha-omelette') ||
                  recipes.find(r => r.id === 'naan-chanay') ||
                  recipes.find(r => r.category === 'nashta');
    }

    const title = candidate ? getLocalizedRecipe(candidate, lang).displayTitle : (timeEval.isWeekend || timeEval.isPublicHoliday ? 'لاہوری حلوہ پوری اور چنے' : 'دیسی انڈہ آملیٹ اور پراٹھا');
    const proTip = candidate ? getLocalizedRecipe(candidate, lang).proTip : 'چائے میں الائچی اور ادرک شامل کریں تاکہ تروتازگی رہے۔';

    const reply = isUr
      ? `⏰ **وقت اور شیڈول کا تفصیلی جائزہ:**
• **موجودہ وقت:** ابھی ${timeEval.timeStringUrdu} ہوئے ہیں۔
• **دن کا احوال:** آج **${timeEval.isWeekend ? `ویک اینڈ (${timeEval.dayNameUrdu})` : timeEval.isPublicHoliday ? 'عوامی چھٹی کا دن' : `عام ورکنگ ڈے (${timeEval.dayNameUrdu})`}** ہے۔
• **وقت کا اصول:** ${timeEval.timeEvaluationExplanationUrdu}

🍳 **تجویز کردہ ناشتہ (${timeEval.isWeekend || timeEval.isPublicHoliday ? 'ویک اینڈ اسپیشل' : 'فوری ناشتہ'}):**
• **خاص پکوان:** **${title}**
• **ساتھ پیش کریں:** ${timeEval.isWeekend || timeEval.isPublicHoliday ? 'گرما گرم پوریاں، چنے کی ترکاری، سوجی کا حلوہ اور کڑک الائچی والی چائے' : 'دیسی انڈہ آملیٹ، تازہ پھلکا روٹی یا پراٹھا اور گرم چائے'}۔
• **باورچی کا مشورہ:** ${proTip}
• **صحت کا خیال:** ابو جان کیلئے تلی ہوئی پوری کے بجائے بغیر گھی کی روٹی یا ابلا انڈہ اور کم چینی والی چائے دیں، اور امی جان کے ہاضمے کیلئے ہلکے مصالحے کے چنے۔`
      : `⏰ **Time & Schedule Evaluation:**
• **Current Time:** ${timeEval.timeString12h} (${timeEval.dayNameEn}).
• **Schedule Rule:** ${timeEval.timeEvaluationExplanationEn}

🍳 **Recommended Breakfast:**
• **Dish:** **${title}**
• **Chef Tip:** ${proTip}
• **Family Health:** Low oil and light spices for parents.`;

    return {
      reply,
      dishName: title,
      category: 'ناشتہ (Breakfast)',
      prepTime: candidate ? `${candidate.prepTimeMins + candidate.cookTimeMins} منٹ` : '20 منٹ',
      bestUtensil: candidate?.utensil?.name || 'کڑاہی یا توا',
      calories: candidate?.nutrition?.calories || 380,
      budgetEstimatePKR: candidate?.estimatedCostPkr || 220,
      recipeId: candidate?.id
    };
  }

  if (timeEval.slot === 'dopahar') {
    const lunchCandidates = recipes.filter(r => (r.category === 'daal' || r.category === 'sabzi') && !recentIds.has(r.id));
    const candidate = lunchCandidates[0] || recipes.find(r => r.category === 'daal') || recipes.find(r => r.category === 'sabzi') || recipes[0];
    const title = candidate ? getLocalizedRecipe(candidate, lang).displayTitle : 'تڑکا مونگ مسور دال اور سفید چاول';
    const proTip = candidate ? getLocalizedRecipe(candidate, lang).proTip : 'دال کو زیرے اور لہسن کا ہلکا تڑکا دیں۔';

    const reply = isUr
      ? `⏰ **وقت اور شیڈول کا تفصیلی جائزہ:**
• **موجودہ وقت:** ابھی ${timeEval.timeStringUrdu} ہوئے ہیں۔
• **دن کا احوال:** آج **${timeEval.isWeekend ? `ویک اینڈ (${timeEval.dayNameUrdu})` : `عام دن (${timeEval.dayNameUrdu})`}** ہے۔
• **وقت کا اصول:** ${timeEval.timeEvaluationExplanationUrdu}

🍲 **تجویز کردہ دوپہر کا کھانا (Lunch):**
• **خاص پکوان:** **${title}**
• **ساتھ پیش کریں:** تازہ کھیرا ٹماٹر سلاد، پودینے کا رائتہ اور گرما گرم پھلکا روٹی یا ابلے چاول۔
• **کیوں تجویز کیا گیا:** دوپہر کے وقت ہلکی دال یا تازہ سبزی معدے کو فرحت بخشتی ہے اور دن کے کاموں میں سستی پیدا نہیں ہونے دیتی۔
• **صحت کا خیال:** ابو جان کے کولیسٹرول اور امی جان کے معدے کیلئے کم تیل اور ہلکے زیرے کا تڑکا استعمال کریں۔`
      : `⏰ **Time & Schedule Evaluation:**
• **Current Time:** ${timeEval.timeString12h} (${timeEval.dayNameEn}).
• **Schedule Rule:** ${timeEval.timeEvaluationExplanationEn}

🍲 **Recommended Lunch:**
• **Dish:** **${title}**
• **Chef Note:** Gentle on the stomach with balanced nutrients.`;

    return {
      reply,
      dishName: title,
      category: 'دوپہر (Lunch)',
      prepTime: candidate ? `${candidate.prepTimeMins + candidate.cookTimeMins} منٹ` : '25 منٹ',
      bestUtensil: candidate?.utensil?.name || 'دیگچی یا کڑاہی',
      calories: candidate?.nutrition?.calories || 260,
      budgetEstimatePKR: candidate?.estimatedCostPkr || 220,
      recipeId: candidate?.id
    };
  }

  // Raat / Dinner
  const dinnerCandidates = recipes.filter(r => r.category !== 'nashta' && !recentIds.has(r.id));
  const candidate = dinnerCandidates.find(r => r.category === 'chicken' || r.category === 'beef') || dinnerCandidates[0] || recipes[0];
  const title = candidate ? getLocalizedRecipe(candidate, lang).displayTitle : 'روایتی لاہوری چکن کڑاہی';
  const proTip = candidate ? getLocalizedRecipe(candidate, lang).proTip : 'گوشت کو دھیمی آنچ پر بھونیں تاکہ ذائقہ اندر تک رچ بس جائے۔';

  const reply = isUr
    ? `⏰ **وقت اور شیڈول کا تفصیلی جائزہ:**
• **موجودہ وقت:** ابھی ${timeEval.timeStringUrdu} ہوئے ہیں۔
• **دن کا احوال:** آج **${timeEval.isWeekend ? `ویک اینڈ (${timeEval.dayNameUrdu})` : `عام دن (${timeEval.dayNameUrdu})`}** ہے۔
• **وقت کا اصول:** ${timeEval.timeEvaluationExplanationUrdu}

🌙 **تجویز کردہ رات کا کھانا (Dinner):**
• **خاص پکوان:** **${title}**
• **ساتھ پیش کریں:** گرما گرم توے کی روٹی یا نان، پودینہ رائتہ اور کچومر سلاد۔
• **باورچی کا مشورہ:** ${proTip}
• **صحت کا خیال:** ابو جان کیلئے گریوی میں تیل کم رکھیں اور امی جان کیلئے زیادہ تیز لال مرچ کے بجائے کالی مرچ اور زیرہ استعمال کریں۔`
    : `⏰ **Time & Schedule Evaluation:**
• **Current Time:** ${timeEval.timeString12h} (${timeEval.dayNameEn}).
• **Schedule Rule:** ${timeEval.timeEvaluationExplanationEn}

🌙 **Recommended Dinner:**
• **Dish:** **${title}**
• **Chef Note:** Flavorful evening dinner with balanced spices.`;

  return {
    reply,
    dishName: title,
    category: 'رات (Dinner)',
    prepTime: candidate ? `${candidate.prepTimeMins + candidate.cookTimeMins} منٹ` : '35 منٹ',
    bestUtensil: candidate?.utensil?.name || 'کڑاہی یا ہانڈی',
    calories: candidate?.nutrition?.calories || 420,
    budgetEstimatePKR: candidate?.estimatedCostPkr || 450,
    recipeId: candidate?.id
  };
}

// Ask user whether they want to cook these ingredients for Lunch or Dinner, with evaluated clock time
function askMealTimeForIngredients(
  ingredients: string[],
  isUr: boolean,
  timeEval: TimeEvaluationResult,
  recipes: Recipe[],
  familyMembers: FamilyMember[],
  lang: Language
): ChefAiResponse {
  const set = new Set(ingredients);
  const ingDefs = ingredients.map(k => INGREDIENTS_DB.find(i => i.key === k) || { key: k, ur: k, en: k, keywords: [] });
  const ingNamesUrdu = ingDefs.map(i => i.ur).join(' اور ');
  const ingNamesEn = ingDefs.map(i => i.en).join(' & ');

  let dishTitleUrdu = '';
  let dishTitleEn = '';
  let lunchIdeaUrdu = '';
  let dinnerIdeaUrdu = '';
  let lunchIdeaEn = '';
  let dinnerIdeaEn = '';
  let matchedRecipeId: string | undefined = undefined;

  if (set.has('aloo') && set.has('methi') && set.has('palak')) {
    dishTitleUrdu = 'آلو پالک میتھی کی سبزی';
    dishTitleEn = 'Aloo Palak Methi Sabzi';
    lunchIdeaUrdu = 'گرما گرم بھجیا، تازہ پھلکا روٹی یا پراٹھے اور دہی کے ٹھنڈے رائتے کے ساتھ دوپہر میں زبردست لگتی ہے۔';
    dinnerIdeaUrdu = 'رات کے ہاضمے اور کولیسٹرول کے بچاؤ کیلئے کم تیل، ہلکے مصالحے اور نرم دم پر پکی سبزی نرم پتلی روٹی کے ساتھ بنائی جاتی ہے تاکہ رات کو معدے پر بوجھ نہ بنے۔';
    lunchIdeaEn = 'Crispy bhujia with hot rotis/parathas and cooling raita.';
    dinnerIdeaEn = 'Gentle low-oil preparation with soft thin rotis for light night digestion.';
    matchedRecipeId = 'methi-aloo-roti';
  } else if (set.has('aloo') && set.has('methi')) {
    dishTitleUrdu = 'قصوری میتھی آلو کی بھجیا / سبزی';
    dishTitleEn = 'Aloo Methi Bhujia / Sabzi';
    lunchIdeaUrdu = 'گرما گرم زیرے دار آلو میتھی کی بھجیا تازہ پھلکا روٹی یا خستہ پراٹھے اور دہی کے رائتے کے ساتھ دوپہر میں لاجواب لگتی ہے۔';
    dinnerIdeaUrdu = 'رات کے وقت ہاضمے اور کولیسٹرول کے بچاؤ کیلئے کم تیل، ہلکے مصالحے اور اجوائن کے تڑکے والی قصوری میتھی آلو کی نرم سبزی مناسب رہے گی تاکہ رات کو معدے پر بالکل بوجھ نہ بنے۔';
    lunchIdeaEn = 'Aromatic cumin-tempered Aloo Methi bhujia with hot rotis or paratha and raita.';
    dinnerIdeaEn = 'Low-oil tender Aloo Methi with carom seeds (ajwain) for gentle night digestion.';
    matchedRecipeId = 'methi-aloo-roti';
  } else if (set.has('aloo') && set.has('palak')) {
    dishTitleUrdu = 'پالک آلو کا سالن / بھجیا';
    dishTitleEn = 'Palak Aloo Curry / Bhujia';
    lunchIdeaUrdu = 'دوپہر میں دیسی پالک آلو کا سالن پھلکا روٹی یا ابلے چاولوں کے ساتھ بہترین رہتا ہے۔';
    dinnerIdeaUrdu = 'رات کے وقت ہلکی گریوی والا نرم پالک آلو کم نمک اور کم تیل میں معدے اور ہاضمے کیلئے مفید ہے۔';
    matchedRecipeId = 'palak-aloo-roti';
  } else if (set.has('aloo') && set.has('matar')) {
    dishTitleUrdu = 'آلو مٹر کا سالن';
    dishTitleEn = 'Aloo Matar Curry';
    lunchIdeaUrdu = 'دوپہر میں ابلے سفید چاول یا روٹی اور سلاد کے ساتھ آلو مٹر کا سالن۔';
    dinnerIdeaUrdu = 'رات میں ہلکی پھلکی روٹی کے ساتھ کم مرچوں اور کم تیل والا آلو مٹر۔';
  } else if (set.has('chicken')) {
    dishTitleUrdu = 'چکن کڑاہی یا سالن';
    dishTitleEn = 'Chicken Karahi / Curry';
    lunchIdeaUrdu = 'دوپہر میں گرم گرم روٹی یا چاول کے ساتھ مصالحے دار چکن سالن۔';
    dinnerIdeaUrdu = 'رات کے کھانے میں کم تیل والی ہلکی چکن ہانڈی تاکہ رات کو معدے پر بوجھ نہ بنے۔';
  } else {
    dishTitleUrdu = `${ingNamesUrdu} کا پکوان`;
    dishTitleEn = `${ingNamesEn} Dish`;
    lunchIdeaUrdu = `دوپہر کے کھانے (Lunch) میں گرم گرم مصالحے دار انداز میں روٹی یا چاول کے ساتھ بہترین رہے گا۔`;
    dinnerIdeaUrdu = `رات کے کھانے (Dinner) میں کم تیل، ہلکے مصالحے اور نرم دم پر پکا کر رات کے ہاضمے کیلئے موزوں رہے گا۔`;
  }

  const promptPrefixUrdu = `یہ ${ingNamesUrdu}`;
  const promptPrefixEn = `Cook this ${ingNamesEn}`;

  const reply = isUr
    ? `ماشاءاللہ! آپ کے فریج میں **${ingNamesUrdu}** موجود ہیں۔

⏰ **وقت کا جائزہ (Time Evaluation):**
اس وقت گھڑی کے مطابق **${timeEval.timeStringUrdu} (${timeEval.timeString12h})** ہو چکے ہیں اور آج **${timeEval.dayNameUrdu}**${timeEval.isWeekend ? ' (ویک اینڈ)' : ''} ہے۔
گھڑی اور شیڈول کے لحاظ سے فی الحال **${timeEval.slotNameUrdu}** کا وقت ہے۔

❓ **وقت کا تعین (Meal Time Clarification):**
آپ یہ کھانا **دوپہر کے کھانے (Lunch)** کے لیے بنانا چاہتے ہیں یا **رات کے کھانے (Dinner)** کے لیے؟${timeEval.slot === 'nashta' ? ' (یا ناشتے کیلئے؟)' : ''}

☀️ **اگر دوپہر کا کھانا (Lunch) بنانا ہے:**
${lunchIdeaUrdu}

🌙 **اگر رات کا کھانا (Dinner) بنانا ہے:**
${dinnerIdeaUrdu}

👇 **بتانے کیلئے نیچے دیے گئے بٹن پر کلک کریں کہ آپ کس وقت کیلئے پکانا چاہتے ہیں:**`
    : `Great! You have **${ingNamesEn}** available in your fridge.

⏰ **Current Time Check:**
It is currently **${timeEval.timeString12h}** on **${timeEval.dayNameEn}** (${timeEval.slotNameEn} window).

❓ **Meal Time Clarification:**
Would you like to cook this for **Lunch (دوپہر کا کھانا)** or for **Dinner (رات کا کھانا)**?

☀️ **For Lunch:**
${lunchIdeaEn}

🌙 **For Dinner:**
${dinnerIdeaEn}

👇 **Tap one of the buttons below to select the meal time:**`;

  return {
    reply,
    dishName: dishTitleUrdu,
    category: 'سبزی / کھانا',
    prepTime: '20 منٹ',
    bestUtensil: 'کڑاہی یا ہانڈی',
    calories: 210,
    budgetEstimatePKR: 200,
    recipeId: matchedRecipeId,
    whyRecommended: isUr ? 'کھانے کے وقت کے مطابق بہترین طریقہ منتخب کریں' : 'Choose the best style for your meal time',
    suggestedSlotActions: [
      {
        label: isUr ? '☀️ دوپہر کا کھانا (Lunch) کیلئے بنائیں' : '☀️ Cook for Lunch',
        slot: 'dopahar',
        promptText: isUr ? `${promptPrefixUrdu} دوپہر کے کھانے (Lunch) کیلئے بنائیں` : `${promptPrefixEn} for Lunch`
      },
      {
        label: isUr ? '🌙 رات کا کھانا (Dinner) کیلئے بنائیں' : '🌙 Cook for Dinner',
        slot: 'raat',
        promptText: isUr ? `${promptPrefixUrdu} رات کے کھانے (Dinner) کیلئے بنائیں` : `${promptPrefixEn} for Dinner`
      },
      ...(timeEval.slot === 'nashta' || timeEval.isWeekend ? [{
        label: isUr ? '🍳 ناشتہ / برنچ (Breakfast) کیلئے بنائیں' : '🍳 Cook for Breakfast/Brunch',
        slot: 'nashta' as const,
        promptText: isUr ? `${promptPrefixUrdu} ناشتے (Breakfast) کیلئے بنائیں` : `${promptPrefixEn} for Breakfast`
      }] : [])
    ]
  };
}

// Dedicated Multi-Option Chicken Culinary Generator
function generateChickenMultiOptionsResponse(
  query: string,
  set: Set<string>,
  recipes: Recipe[],
  familyMembers: FamilyMember[],
  isUr: boolean,
  specifiedSlot: 'dopahar' | 'raat' | 'nashta' | null,
  lang: Language = 'ur'
): ChefAiResponse {
  const q = query.toLowerCase().trim();
  const timeEval = evaluateCurrentMealTime();

  // 1. Check if user asked for a SPECIFIC chicken dish
  const wantsPulao = q.includes('pulao') || q.includes('پلاؤ') || q.includes('biryani') || q.includes('بریانی') || (set.has('chawal') && !q.includes('shorba'));
  const wantsWhiteHandi = q.includes('white') || q.includes('وائٹ') || q.includes('makhni') || q.includes('مکھنی') || q.includes('malai') || q.includes('ملائی');
  const wantsTikka = q.includes('tikka') || q.includes('تکہ') || q.includes('roast') || q.includes('روسٹ') || q.includes('steam') || q.includes('سٹیم') || q.includes('bbq') || q.includes('باربی کیو');
  const wantsShorba = q.includes('shorba') || q.includes('شوربہ') || q.includes('salan') || q.includes('سالن') || (set.has('aloo') && !wantsPulao) || q.includes('qorma') || q.includes('قورمہ');
  const wantsJalfrezi = q.includes('jalfrezi') || q.includes('جل فریزی') || q.includes('shashlik') || q.includes('شاشلک') || (set.has('shimla') && !wantsPulao);
  const wantsShami = q.includes('shami') || q.includes('شامی') || q.includes('kabab') || q.includes('کباب');
  const wantsKarahi = q.includes('karahi') || q.includes('کڑاہی') || q.includes('kadai');
  const wantsPalakChicken = set.has('palak') || q.includes('palak') || q.includes('پالک');
  const wantsKeemaParatha = q.includes('keema') || q.includes('قیمہ') || q.includes('paratha') || q.includes('پراٹھا');
  const wantsSoup = q.includes('soup') || q.includes('سوپ') || q.includes('yakhni') || q.includes('یخنی');

  // A. Chicken Yakhni Pulao / Biryani
  if (wantsPulao) {
    const isBiryani = q.includes('biryani') || q.includes('بریانی');
    return {
      reply: isUr
        ? `ماشاءاللہ! چکن کا سب سے پسندیدہ دسترخوان پکوان: **${isBiryani ? 'کراچی چکن دم بریانی' : 'خوشبودار چکن یخنی پلاؤ (Chicken Yakhni Pulao)'}**!

دوپہر کے دسترخوان پر ٹھنڈے پودینے کے رائتے اور کچومر سلاد کے ساتھ اس کا کوئی ثانی نہیں۔

**طریقہ تیاری (Step-by-Step Recipe):**
۱. **خوشبودار یخنی:** چکن کی بوٹیوں میں ۴ کپ پانی، ۱ پیاز، ۱ چمچ سونف، ۱ چمچ ثابت دھنیا، دارچینی، لونگ، کالی مرچ اور نمک ڈال کر ۱۵ منٹ ابالیں تاکہ رس دار یخنی بن جائے۔ یخنی چھان لیں اور چکن الگ کر لیں۔
۲. **تڑکا و بھنائی:** دیگچی میں ۲ چمچ تیل یا دیسی گھی گرم کریں، باریک پیاز سنہری کریں، لہسن ادرک کا پیسٹ، ۲ ہری مرچیں اور ۳ چمچ پھینٹا ہوا دہی ڈال کر چکن کو ۲ منٹ بھونیں۔
۳. **چاول پکانا:** چھانی ہوئی یخنی دیگچی میں شامل کریں۔ ابال آنے پر بھیگے ہوئے باسمتی چاول ڈالیں اور تیز آنچ پر پانی خشک ہونے دیں۔
۴. **دم:** ہلکی نمی پر ہرا دھنیا، پودینہ اور تلی پیاز ڈال کر ۱۰ منٹ دھیمی آنچ پر دم دیں۔ چاول کا دانہ دانہ نکھرا بنے گا۔

**گھر والوں کی صحت کا خاص خیال:**
• **ابو جان کیلئے:** چکن کی یخنی قدرتی پروٹین ہے، اضافی گھی کے بغیر بنائی گئی ہے تاکہ کولیسٹرول قابو میں رہے۔
• **امی جان کیلئے:** سونف اور زیرے کی بدولت یہ پلاؤ معدے پر بالکل ہلکا رہتا ہے اور گیس نہیں ہونے دیتا۔`
        : `Top Choice! **Aromatic Chicken Yakhni Pulao**:
Simmer bone-in chicken with whole coriander seeds, fennel, and whole spices for a rich broth. Sauté onions and cook fragrant basmati rice in the stock. Light and refreshing with mint raita.`,
      dishName: isBiryani ? 'کراچی چکن دم بریانی' : 'خوشبودار چکن یخنی پلاؤ (Chicken Yakhni Pulao)',
      category: 'چاول / چکن (Rice)',
      prepTime: '35 منٹ',
      bestUtensil: 'دیگچی یا پتیلی',
      calories: 380,
      budgetEstimatePKR: 520,
      recipeId: isBiryani ? 'chicken-biryani' : 'chicken-pulao',
      suggestedSlotActions: [
        { label: '🍗 چکن وائٹ ہانڈی کی ترکیب دیکھیں', slot: 'raat', promptText: 'چکن وائٹ ہانڈی کی ترکیب بتائیں' },
        { label: '🍗 آلو چکن شوربہ سالن کی ترکیب دیکھیں', slot: 'dopahar', promptText: 'آلو چکن شوربہ سالن کی ترکیب بتائیں' },
        { label: '🍗 چکن تکہ / سٹیم روسٹ دیکھیں', slot: 'raat', promptText: 'چکن تکہ سٹیم روسٹ کی ترکیب بتائیں' }
      ]
    };
  }

  // B. Chicken White Handi (Night digestion friendly)
  if (wantsWhiteHandi) {
    return {
      reply: isUr
        ? `بہترین اور لذیذ انتخاب! رات کے کھانے کیلئے **ہلکی چکن وائٹ ہانڈی (Creamy Chicken White Handi)**:

یہ روایتی کڑاہی کے برعکس بغیر تیز لال مرچوں کے دہی، کالی مرچ اور زیرے میں بنتی ہے، جس سے رات کو سینے میں جلن یا تیزابیت نہیں ہوتی۔

**طریقہ تیاری (Step-by-Step Recipe):**
۱. مٹی کی ہانڈی یا کڑاہی میں صرف ڈیڑھ چمچ تیل گرم کریں اور چکن کو لہسن ادرک کے پیسٹ کے ساتھ سفید رنگت آنے تک فرائی کریں۔
۲. آنچ دھیمی کریں اور ۱ پیالی پھینٹا ہوا دہی، آدھا چمچ پسی کالی مرچ، آدھا چمچ بھنا پسا زیرہ، آدھا چمچ پسا دھنیا اور ہلکا سا نمک ڈالیں۔
۳. ڈھکن لگا کر ۱۰ سے ۱۲ منٹ پکنے دیں تاکہ چکن دہی کے قدرتی رس میں مکھن کی طرح نرم ہو جائے۔
۴. آخر میں ۲ چمچ فریش کریم یا ملائی، باریک کٹی ادرک اور ہری مرچیں ڈال کر ۲ منٹ دم دیں۔ گرما گرم نرم روٹی کے ساتھ پیش کریں۔

**گھر والوں کی صحت کا خاص خیال:**
• **امی جان کیلئے:** لال مرچ سے مکمل پرہیز ہے، دہی اور کالی مرچ معدے کو ٹھنڈا اور پرسکون رکھتے ہیں۔
• **ابو جان کیلئے:** کم چکنائی، دل اور کولیسٹرول کیلئے انتہائی محفوظ اور ہلکا کھانا۔`
        : `Gentle & Creamy! **Chicken White Handi**:
Cooked in gentle yogurt, freshly crushed black pepper, cumin, and light cream without harsh red chilies. Perfectly soothing for dinner.`,
      dishName: 'ہلکی چکن وائٹ ہانڈی (Chicken White Handi)',
      category: 'ہانڈی / ڈنر (Dinner)',
      prepTime: '25 منٹ',
      bestUtensil: 'مٹی کی ہانڈی (Clay Handi)',
      calories: 310,
      budgetEstimatePKR: 490,
      suggestedSlotActions: [
        { label: '🍗 چکن تکہ / سٹیم روسٹ کی ترکیب', slot: 'raat', promptText: 'چکن تکہ سٹیم روسٹ کی ترکیب بتائیں' },
        { label: '🍗 چکن یخنی پلاؤ کی ترکیب', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ کی ترکیب بتائیں' },
        { label: '🍗 آلو چکن شوربہ سالن', slot: 'dopahar', promptText: 'آلو چکن شوربہ سالن کی ترکیب بتائیں' }
      ]
    };
  }

  // C. Chicken Tikka / Steam Roast (Zero Oil / Healthy Diet)
  if (wantsTikka) {
    return {
      reply: isUr
        ? `صحت بخش اور لاجواب انتخاب! **چکن تکہ بوٹی و سٹیم روسٹ (Healthy Chicken Steam Roast)**:

یہ کڑاہی اور تلی ہوئی چیزوں کے مقابلے میں کم ترین کیلوریز اور برائے نام تیل (Zero/Low Oil) کے ساتھ تیار ہوتا ہے۔

**طریقہ تیاری (Step-by-Step Recipe):**
۱. چکن کی بوٹیوں پر گہرے کٹ لگائیں۔
۲. ۲ چمچ دہی، ۱ چمچ لیموں کا رس، آدھا چمچ لہسن ادرک، آدھا چمچ تکہ مصالحہ، کالی مرچ اور نمک ملا کر چکن پر لگائیں۔ ۳۰ منٹ میرینیٹ ہونے دیں۔
۳. پین یا کڑاہی میں چکن رکھیں، ۲ چمچ پانی کا چھینٹا دیں اور ڈھکن بند کر کے دھیمی آنچ پر ۱۵ منٹ بھاپ (سٹیم) میں پکائیں تاکہ گوشت نرم گل جائے۔
۴. تیز آنچ پر اضافی پانی خشک کر کے توے یا جالی پر ہلکا سا سینک لیں تاکہ روایتی تکہ کی خوشبو آ جائے۔ پودینے کی چٹنی اور سلاد کے ساتھ پیش کریں۔

**گھر والوں کی صحت کا خاص خیال:**
• **ابو جان کیلئے:** زیرو آئل ہونے کی وجہ سے کولیسٹرول اور دل کے مریضوں کیلئے نمبر ۱ غذا۔
• **امی جان کیلئے:** بھاپ میں نرم پکا ہوا ہونے کے باعث فوری ہضم ہو جاتا ہے۔`
        : `Zero/Low Oil Healthy Choice! **Chicken Tikka & Steam Roast**:
Marinated with yogurt, lemon juice, garlic, and gentle spices, then steamed until succulent and tender without heavy cooking oil.`,
      dishName: 'چکن تکہ و سٹیم روسٹ (Chicken Tikka / Steam Roast)',
      category: 'روسٹ / باربی کیو (Healthy BBQ)',
      prepTime: '25 منٹ',
      bestUtensil: 'نان سٹک پین یا سٹیمر',
      calories: 220,
      budgetEstimatePKR: 420,
      suggestedSlotActions: [
        { label: '🍗 چکن وائٹ ہانڈی کی ترکیب', slot: 'raat', promptText: 'چکن وائٹ ہانڈی کی ترکیب بتائیں' },
        { label: '🍗 چکن یخنی پلاؤ کی ترکیب', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ کی ترکیب بتائیں' },
        { label: '🍗 چکن جل فریزی کی ترکیب', slot: 'raat', promptText: 'چکن جل فریزی کی ترکیب بتائیں' }
      ]
    };
  }

  // D. Desi Aloo Chicken Shorba / Salan
  if (wantsShorba) {
    return {
      reply: isUr
        ? `روایتی گھریلو سدا بہار کھانا: **دیسی آلو چکن شوربہ سالن (Desi Aloo Chicken Shorba)**!

یہ سالن بھاری کڑاہیوں سے کہیں زیادہ ہلکا، زود ہضم اور پھلکا روٹی یا ابلے چاول کے ساتھ پاکستان کا سب سے پسندیدہ گھریلو پکوان ہے۔

**طریقہ تیاری (Step-by-Step Recipe):**
۱. پتیلی میں ۲ چمچ تیل میں باریک کٹا پیاز ہلکا سنہری کریں، لہسن ادرک اور ٹماٹر کا پیسٹ ڈال کر مصالحہ بھونیں۔
۲. چکن اور چوکور کٹے آلو شامل کریں، ہلدی، دھنیا، نمک اور کشمیری لال مرچ کے ساتھ ۳ منٹ اچھی طرح بھونیں۔
۳. ۲ کپ نیم گرم پانی ڈال کر ڈھکن بند کر دیں اور درمیانی آنچ پر ۱۵ منٹ پکائیں تاکہ آلو اور چکن نرم گل جائیں اور پتلا، خوشبودار شوربہ تیار ہو جائے۔
۴. آخر میں پسا گرم مصالحہ اور ڈھیر سارا ہرا دھنیا چھڑکیں۔ تازی پھلکا روٹی کے ساتھ پیش کریں۔

**صحت کا خیال:**
• شوربے والا سالن خشک بھنے سالن سے زیادہ معدے کو تر اور پرسکون رکھتا ہے اور امی جان و ابو جان دونوں کیلئے محفوظ ہے۔`
        : `Comforting Everyday Curry! **Desi Aloo Chicken Shorba**:
A light, golden potato and chicken broth cooked with mild aromatics, best paired with whole wheat phulkas or steamed rice.`,
      dishName: 'روایتی آلو چکن شوربہ سالن (Aloo Chicken Shorba)',
      category: 'شوربہ / سالن (Curry)',
      prepTime: '30 منٹ',
      bestUtensil: 'دیگچی یا پتیلی',
      calories: 290,
      budgetEstimatePKR: 450,
      suggestedSlotActions: [
        { label: '🍗 چکن یخنی پلاؤ کی ترکیب', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ کی ترکیب بتائیں' },
        { label: '🍗 چکن وائٹ ہانڈی کی ترکیب', slot: 'raat', promptText: 'چکن وائٹ ہانڈی کی ترکیب بتائیں' },
        { label: '🍗 لاہوری چکن کڑاہی کی ترکیب', slot: 'dopahar', promptText: 'لاہوری چکن کڑاہی کی ترکیب بتائیں' }
      ]
    };
  }

  // E. Chicken Jalfrezi / Shashlik
  if (wantsJalfrezi) {
    return {
      reply: isUr
        ? `بہترین اور چٹپٹا پکوان: **چکن جل فریزی و شاشلک (Chicken Jalfrezi & Shashlik)**!

شملہ مرچ، پیاز اور ٹماٹر کی کھٹی میٹھی چٹپٹی گریوی کے ساتھ چکن کا شاندار پکوان۔

**طریقہ تیاری:**
۱. بون لیس چکن کو لہسن، نمک اور کالی مرچ میں تیز آنچ پر فرائی کر کے نکال لیں۔
۲. کڑاہی میں پیاز اور شملہ مرچ کے چوکور قتلے تیز آنچ پر ۱ منٹ فرائی کریں۔
۳. چکن واپس ڈالیں، ۳ چمچ ٹماٹر کیچپ، ۱ چمچ سرکہ، کالی مرچ اور آدھا کپ پانی ڈال کر ۲ منٹ دم دیں۔
۴. ابلے چاول یا پراٹھے کے ساتھ گرم گرم پیش کریں۔ سبزیوں کا کرنچ برقرار رکھیں۔`
        : `Vibrant & Delicious! **Chicken Jalfrezi**:
Tender chicken cubes stir-fried with onions, bell peppers, and a zesty tomato sauce.`,
      dishName: 'چکن جل فریزی و شاشلک (Chicken Jalfrezi)',
      category: 'جل فریزی (Stir-fry)',
      prepTime: '20 منٹ',
      bestUtensil: 'کڑاہی یا ووک',
      calories: 310,
      budgetEstimatePKR: 480,
      suggestedSlotActions: [
        { label: '🍗 چکن وائٹ ہانڈی کی ترکیب', slot: 'raat', promptText: 'چکن وائٹ ہانڈی کی ترکیب بتائیں' },
        { label: '🍗 چکن تکہ سٹیم روسٹ', slot: 'raat', promptText: 'چکن تکہ سٹیم روسٹ کی ترکیب بتائیں' },
        { label: '🍗 چکن یخنی پلاؤ کی ترکیب', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ کی ترکیب بتائیں' }
      ]
    };
  }

  // F. Chicken Shami Kabab
  if (wantsShami) {
    return {
      reply: isUr
        ? `ناشتے اور چائے کا لاجواب شاہکار: **ریشہ دار چکن شامی کباب (Chicken Shami Kabab)**!

چکن اور دال چنا کے مصالحے دار کباب جو فریز بھی کیے جا سکتے ہیں اور ناشتے، لنچ یا شام کے وقت فوری تل کر پیش کیے جاتے ہیں۔

**طریقہ تیاری:**
۱. چکن اور بھیگی ہوئی دال چنا کو پیاز، ادرک لہسن، ثابت لال مرچ، زیرہ اور نمک کے ساتھ ککر میں ۸ منٹ ابال کر سارا پانی خشک کر لیں۔
۲. ہاون دستے میں کوٹ لیں تاکہ چکن کے ریشے بن جائیں۔
۳. ہرا دھنیا، پودینہ، ہری مرچیں اور ۱ انڈا ملا کر گول ٹکیاں بنا لیں۔
۴. توے پر ہلکے گھی میں سنہری فرائی کریں۔ خستہ پراٹھے یا ٹوسٹ کے ساتھ ناشتے میں پیش کریں۔`
        : `Classic Heritage Favorite! **Chicken Shami Kababs**:
Tender shredded chicken and lentils patties pan-fried golden, perfect for breakfast parathas or afternoon tea.`,
      dishName: 'ریشہ دار چکن شامی کباب (Chicken Shami Kabab)',
      category: 'کباب / ناشتہ (Kababs)',
      prepTime: '25 منٹ',
      bestUtensil: 'توا یا فرائنگ پین',
      calories: 190,
      budgetEstimatePKR: 350,
      suggestedSlotActions: [
        { label: '🍗 چکن یخنی پلاؤ کی ترکیب', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ کی ترکیب بتائیں' },
        { label: '🍗 چکن وائٹ ہانڈی کی ترکیب', slot: 'raat', promptText: 'چکن وائٹ ہانڈی کی ترکیب بتائیں' }
      ]
    };
  }

  // G. Palak Chicken
  if (wantsPalakChicken) {
    return {
      reply: isUr
        ? `غذائیت سے بھرپور روایتی پکوان: **چکن پالک سالن (Palak Chicken)**!

آئرن اور پروٹین کا شاندار امتزاج جو تازی پھلکا روٹی یا ابلے چاول کے ساتھ لاجواب لگتا ہے۔

**طریقہ تیاری:**
۱. پالک دھو کر ہلکی ابالیں اور بلینڈ کر لیں۔
۲. کڑاہی میں پیاز، ادرک لہسن بھون کر چکن کو سنہری فرائی کریں۔
۳. ہلدی، دھنیا، نمک اور پالک کی پیوری شامل کر کے ڈھکن لگا کر ۱۰ منٹ دم پر پکائیں تاکہ چکن پالک کے رس میں نرم گل جائے۔
۴. آخر میں ہلکا سا گرم مصالحہ اور مکھن شامل کریں۔ پھلکا روٹی کے ساتھ پیش کریں۔`
        : `Nutritious & Delicious! **Palak Chicken**:
Tender chicken simmered in smooth, lightly spiced spinach gravy.`,
      dishName: 'چکن پالک سالن (Palak Chicken)',
      category: 'سبزی و چکن (Curry)',
      prepTime: '25 منٹ',
      bestUtensil: 'کڑاہی',
      calories: 270,
      budgetEstimatePKR: 440,
      suggestedSlotActions: [
        { label: '🍗 چکن یخنی پلاؤ کی ترکیب', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ کی ترکیب بتائیں' },
        { label: '🍗 چکن وائٹ ہانڈی کی ترکیب', slot: 'raat', promptText: 'چکن وائٹ ہانڈی کی ترکیب بتائیں' }
      ]
    };
  }

  // H. Lahori Chicken Karahi
  if (wantsKarahi) {
    return {
      reply: isUr
        ? `روایتی لاہوری انداز: **لاہوری چکن کڑاہی (Lahori Chicken Karahi)**:

تیز آنچ پر ٹماٹروں، ادرک اور کالی مرچ کی بھنی ہوئی کڑاہی۔

**طریقہ تیاری:**
۱. لوہے کی کڑاہی میں ۲ چمچ تیل اور چکن کو لہسن کے پانی میں تیز آنچ پر فرائی کریں۔
۲. ۴ ٹماٹر دو حصوں میں کاٹ کر چکن کے اوپر رکھیں اور ڈھکن لگا کر ۵ منٹ دم دیں، پھر چھلکے اتار کر چمچ سے میش کریں۔
۳. نمک، کالی مرچ، کٹا دھنیا اور ہری مرچیں ڈال کر تیز آنچ پر تیل الگ ہونے تک بھونیں۔
۴. باریک کٹی ادرک اور ہرا دھنیا ڈال کر گرم نان یا روٹی کے ساتھ پیش کریں۔`
        : `Authentic Lahori Chicken Karahi cooked with ripe tomatoes, ginger juliennes, and black pepper in a traditional iron wok.`,
      dishName: 'لاہوری چکن کڑاہی (Lahori Chicken Karahi)',
      category: 'کڑاہی (Karahi)',
      prepTime: '25 منٹ',
      bestUtensil: 'لوہے کی کڑاہی (Iron Karahi)',
      calories: 360,
      budgetEstimatePKR: 520,
      suggestedSlotActions: [
        { label: '🍗 چکن یخنی پلاؤ کی ترکیب', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ کی ترکیب بتائیں' },
        { label: '🍗 چکن وائٹ ہانڈی کی ترکیب', slot: 'raat', promptText: 'چکن وائٹ ہانڈی کی ترکیب بتائیں' },
        { label: '🍗 آلو چکن شوربہ سالن', slot: 'dopahar', promptText: 'آلو چکن شوربہ سالن کی ترکیب بتائیں' }
      ]
    };
  }

  // 2. IF MEAL SLOT IS SPECIFIED:
  // LUNCH SPECIFIED:
  if (specifiedSlot === 'dopahar') {
    return {
      reply: isUr
        ? `ماشاءاللہ! **دوپہر کے کھانے (Lunch)** کے لیے چکن سے کئی شاندار پکوان بن سکتے ہیں (صرف کڑاہی نہیں!):

**دوپہر کے لذیذ ترین آپشنز:**
۱. **خوشبودار چکن یخنی پلاؤ (نمبر ۱ انتخاب):** دہی کے ٹھنڈے رائتے اور کچومر سلاد کے ساتھ دوپہر کا سب سے مقبول کھانا۔
۲. **روایتی آلو چکن شوربہ سالن:** تازی پھلکا روٹی یا ابلے چاولوں کے ساتھ ہلکا پھلکا، سدا بہار۔
۳. **لاہوری چکن کڑاہی:** تیز آنچ پر ادرک اور کالی مرچ میں بھنی روایتی کڑاہی۔
۴. **چکن پالک سالن:** پالک اور چکن کا صحت بخش امتزاج۔

---
💡 **آج دوپہر کی بہترین ترکیب: "خوشبودار چکن یخنی پلاؤ"**
• **طریقہ:** چکن کی بوٹیوں میں سونف، دھنیا اور ثابت مصالحے ڈال کر یخنی ابال لیں۔ دیسی گھی اور پیاز کے تڑکے میں چکن کو بھون کر یخنی اور باسمتی چاول دم پر پکائیں۔
• **ابو جان کیلئے:** تیل برائے نام، چکن کی یخنی کولیسٹرول کیلئے محفوظ ہے۔
• **امی جان کیلئے:** سونف اور زیرے کی وجہ سے یہ پلاؤ معدے پر بالکل ہلکا رہتا ہے۔

👇 **اگر آپ کوئی دوسرا چکن پکوان بنانا چاہتے ہیں تو نیچے بٹن پر کلک کریں:**`
        : `For **Lunch**, chicken offers several diverse options beyond just karahi:
1. **Chicken Yakhni Pulao** (Aromatic rice in chicken stock)
2. **Desi Aloo Chicken Shorba** (Comforting potato-chicken curry)
3. **Lahori Chicken Karahi** (Iron wok sautéed chicken)
4. **Palak Chicken** (Spinach & chicken healthy curry)
Tap below to get the full recipe for any dish:`,
      dishName: 'خوشبودار چکن یخنی پلاؤ (دوپہر کا کھانا / Lunch)',
      category: 'چاول / چکن (Rice)',
      prepTime: '35 منٹ',
      bestUtensil: 'دیگچی یا پتیلی',
      calories: 380,
      budgetEstimatePKR: 520,
      recipeId: 'chicken-pulao',
      suggestedSlotActions: [
        { label: '☀️ چکن یخنی پلاؤ کی ترکیب', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ کی ترکیب بتائیں' },
        { label: '☀️ آلو چکن شوربہ سالن کی ترکیب', slot: 'dopahar', promptText: 'آلو چکن شوربہ سالن کی ترکیب بتائیں' },
        { label: '☀️ لاہوری چکن کڑاہی کی ترکیب', slot: 'dopahar', promptText: 'لاہوری چکن کڑاہی کی ترکیب بتائیں' },
        { label: '🌙 یا رات کے کھانے (Dinner) کیلئے بنائیں', slot: 'raat', promptText: 'چکن رات کے کھانے کیلئے کیا بنائیں' }
      ]
    };
  }

  // DINNER SPECIFIED:
  if (specifiedSlot === 'raat') {
    return {
      reply: isUr
        ? `ماشاءاللہ! **رات کے کھانے (Dinner)** میں چکن سے ہلکے، کم تیل اور زود ہضم پکوان بنانے چاہئیں تاکہ رات کو معدے پر بوجھ نہ بنے۔ رات کیلئے یہ بہترین آپشنز ہیں:

**رات کے بہترین آپشنز (Light & Healthy):**
۱. **ہلکی چکن وائٹ ہانڈی (نمبر ۱ انتخاب):** دہی، کریم، زیرے اور کالی مرچ میں بنی نرم ہانڈی—بغیر تیز لال مرچ کے، رات کے ہاضمے کیلئے پرفیکٹ۔
۲. **چکن تکہ بوٹی / سٹیم روسٹ (Zero Oil):** کم یا بغیر تیل، کولیسٹرول اور ڈائٹ کے مریضوں کیلئے محفوظ ترین کھانا۔
۳. **چکن جل فریزی یا شاشلک:** شملہ مرچ، پیاز اور ٹماٹر کی چٹپٹی گریوی، تازی روٹی کے ساتھ۔
۴. **ہاضمہ دار جنجر چکن و سوپ:** ادرک کی کثرت کے ساتھ پکا ہوا، رات کو گیس اور تیزابیت سے محفوظ۔

---
💡 **آج رات کی بہترین ترکیب: "ہلکی چکن وائٹ ہانڈی"**
• **طریقہ:** چکن کو ادرک لہسن میں ہلکا فرائی کر کے دہی، کالی مرچ اور زیرے کے ساتھ دم پر ۱۰ منٹ پکائیں۔ آخر میں ۲ چمچ کریم اور ہری مرچیں ڈال کر ۲ منٹ دم دیں۔
• **ابو جان کیلئے:** چکنائی برائے نام ہے، کولیسٹرول اور دل کیلئے بالکل محفوظ۔
• **امی جان کیلئے:** لال مرچ سے پرہیز ہے، دہی اور کالی مرچ معدے کو ٹھنڈا اور پرسکون رکھتے ہیں۔

👇 **اگر آپ کوئی دوسرا چکن پکوان بنانا چاہتے ہیں تو نیچے بٹن پر کلک کریں:**`
        : `For **Dinner**, chicken should be light, healthy, and easy to digest at night:
1. **Chicken White Handi** (Mild black pepper and yogurt sauce, zero red chili)
2. **Chicken Tikka / Steam Roast** (Zero oil / low-oil healthy protein)
3. **Chicken Jalfrezi** (Stir-fried with crunchy bell peppers)
4. **Ginger Chicken & Soup** (Digestive ginger with soothing broth)
Tap below to get the full recipe for any dish:`,
      dishName: 'ہلکی چکن وائٹ ہانڈی (رات کا کھانا / Dinner)',
      category: 'ہانڈی / ڈنر (Dinner)',
      prepTime: '25 منٹ',
      bestUtensil: 'مٹی کی ہانڈی یا پین',
      calories: 310,
      budgetEstimatePKR: 490,
      suggestedSlotActions: [
        { label: '🌙 چکن وائٹ ہانڈی کی ترکیب', slot: 'raat', promptText: 'چکن وائٹ ہانڈی کی ترکیب بتائیں' },
        { label: '🌙 چکن تکہ / سٹیم روسٹ کی ترکیب', slot: 'raat', promptText: 'چکن تکہ سٹیم روسٹ کی ترکیب بتائیں' },
        { label: '🌙 چکن جل فریزی کی ترکیب', slot: 'raat', promptText: 'چکن جل فریزی کی ترکیب بتائیں' },
        { label: '☀️ یا دوپہر کے کھانے (Lunch) کیلئے بنائیں', slot: 'dopahar', promptText: 'چکن دوپہر کے کھانے کیلئے کیا بنائیں' }
      ]
    };
  }

  // BREAKFAST SPECIFIED:
  if (specifiedSlot === 'nashta') {
    return {
      reply: isUr
        ? `ماشاءاللہ! **صبح کے ناشتے / برنچ (Breakfast)** کیلئے چکن سے یہ توانائی بخش پکوان بن سکتے ہیں:

۱. **چکن شامی کباب و خستہ پراٹھا:** چکن اور دال چنا کے ریشہ دار کباب خستہ پراٹھے اور کڑک چائے کے ساتھ۔
۲. **ریشہ دار چکن چیز آملیٹ / رول:** ابلے چکن، انڈے اور کالی مرچ کا زبردست ملاپ۔
۳. **چکن قیمہ پراٹھا:** باریک مصالحے دار قیمے سے بھرا ہوا تندوری یا توے کا پراٹھا۔

👇 **اپنی پسندیدہ ڈش منتخب کریں:**`
        : `For **Breakfast / Brunch**, you can prepare:
1. **Chicken Shami Kabab with Paratha**
2. **Shredded Chicken Cheese Omelette / Roll**
3. **Chicken Keema Stuffed Paratha**`,
      dishName: 'چکن شامی کباب و پراٹھا (ناشتہ / Breakfast)',
      category: 'ناشتہ (Breakfast)',
      prepTime: '20 منٹ',
      bestUtensil: 'توا یا فرائنگ پین',
      calories: 290,
      budgetEstimatePKR: 320,
      suggestedSlotActions: [
        { label: '🍳 چکن شامی کباب کی ترکیب', slot: 'nashta', promptText: 'چکن شامی کباب کی ترکیب بتائیں' },
        { label: '☀️ یا دوپہر کے کھانے (Lunch) کیلئے بنائیں', slot: 'dopahar', promptText: 'چکن دوپہر کے کھانے کیلئے کیا بنائیں' },
        { label: '🌙 یا رات کے کھانے (Dinner) کیلئے بنائیں', slot: 'raat', promptText: 'چکن رات کے کھانے کیلئے کیا بنائیں' }
      ]
    };
  }

  // 3. NO MEAL SLOT SPECIFIED (User asks: "mere pass fridge me chicken para hai kya banau")
  return {
    reply: isUr
      ? `ماشاءاللہ! آپ کے فریج میں **چکن** موجود ہے۔ چکن ایک ایسا گوشت ہے جس سے صرف چکن کڑاہی ہی نہیں، بلکہ وقت اور پسند کے مطابق درجنوں مختلف لذیذ اور منفرد پکوان بن سکتے ہیں:

⏰ **وقت کا جائزہ:** اس وقت گھڑی کے مطابق **${timeEval.timeStringUrdu} (${timeEval.timeString12h})** ہو چکے ہیں، آج **${timeEval.dayNameUrdu}**${timeEval.isWeekend ? ' (ویک اینڈ)' : ''} ہے اور یہ **${timeEval.slotNameUrdu}** کا وقت ہے۔

---
☀️ **دوپہر کے کھانے (Lunch) کیلئے آپشنز:**
۱. **خوشبودار چکن یخنی پلاؤ یا دم بریانی:** دہی کے رائتے اور کچومر کے ساتھ دوپہر کا بادشاہ کھانا۔
۲. **روایتی آلو چکن شوربہ سالن:** تازی پھلکا روٹی یا ابلے چاولوں کے ساتھ سدا بہار۔
۳. **لاہوری چکن کڑاہی:** تیز آنچ پر ادرک اور کالی مرچ میں بھنی روایتی کڑاہی۔
۴. **چکن پالک سالن:** پالک اور چکن کا ملاپ، غذائیت سے بھرپور۔

🌙 **رات کے کھانے (Dinner) کیلئے آپشنز (ہلکے اور زود ہضم):**
۱. **ہلکی چکن وائٹ ہانڈی (White Handi):** دہی اور کریم میں پکی، بغیر تیز لال مرچ—رات کے ہاضمے کیلئے بہترین۔
۲. **چکن تکہ بوٹی / سٹیم روسٹ (Zero Oil):** کم تیل، رات کو معدے اور کولیسٹرول پر زیرو بوجھ۔
۳. **چکن جل فریزی یا شاشلک:** شملہ مرچ اور پیاز کی چٹپٹی گریوی کے ساتھ۔
۴. **ہاضمہ دار جنجر چکن و یخنی سوپ:** ادرک کی کثرت کے ساتھ پکا ہوا، رات کو پرسکون نیند دیتا ہے۔

🍳 **صبح کے ناشتے / برنچ (Breakfast) کیلئے آپشنز:**
۱. **چکن شامی کباب و پراٹھا:** خستہ کباب اور چائے۔
۲. **ریشہ دار چکن چیز آملیٹ / پراٹھا رول:** پروٹین سے بھرپور ناشتہ۔

---
❓ **آپ کس وقت کیلئے اور کون سی ڈش بنانا چاہتے ہیں؟ نیچے دیے گئے بٹنز میں سے کلک کر کے بتائیں:**`
      : `Great! You have **Chicken** in your fridge. Chicken is versatile and can make dozens of wonderful dishes beyond just Karahi:

⏰ **Current Time Check:** It is currently **${timeEval.timeString12h}** on **${timeEval.dayNameEn}** (${timeEval.slotNameEn} window).

☀️ **Lunch Options:**
1. **Chicken Yakhni Pulao / Biryani** (Aromatic rice with cooling cucumber raita)
2. **Desi Aloo Chicken Shorba** (Comforting broth with whole wheat phulkas)
3. **Lahori Chicken Karahi** (Ginger & tomato tempered wok chicken)
4. **Palak Chicken** (Spinach & chicken healthy curry)

🌙 **Dinner Options (Gentle & Digestion-Friendly):**
1. **Chicken White Handi** (Mild yogurt-cream gravy, no red chilies)
2. **Chicken Tikka / Steam Roast** (Zero/Low oil, diet & cholesterol safe)
3. **Chicken Jalfrezi / Shashlik** (Zesty with crisp bell peppers)
4. **Ginger Chicken & Soup** (Digestive ginger with soothing broth)

🍳 **Breakfast / Brunch Options:**
1. **Chicken Shami Kabab with Paratha**
2. **Shredded Chicken Cheese Omelette / Roll**

👇 **Please tap one of the buttons below to select the meal and recipe:**`,
    dishName: 'چکن کے متنوع پکوان (Multiple Chicken Choices)',
    category: 'چکن (Chicken)',
    prepTime: '25 منٹ',
    bestUtensil: 'دیگچی یا کڑاہی',
    calories: 320,
    budgetEstimatePKR: 500,
    suggestedSlotActions: [
      { label: '☀️ چکن یخنی پلاؤ (Lunch)', slot: 'dopahar', promptText: 'چکن یخنی پلاؤ دوپہر کے کھانے کیلئے بنائیں' },
      { label: '☀️ آلو چکن شوربہ (Lunch)', slot: 'dopahar', promptText: 'آلو چکن شوربہ سالن دوپہر کے کھانے کیلئے بنائیں' },
      { label: '☀️ لاہوری چکن کڑاہی (Lunch)', slot: 'dopahar', promptText: 'لاہوری چکن کڑاہی دوپہر کے کھانے کیلئے بنائیں' },
      { label: '🌙 چکن وائٹ ہانڈی (Dinner)', slot: 'raat', promptText: 'چکن وائٹ ہانڈی رات کے کھانے کیلئے بنائیں' },
      { label: '🌙 چکن تکہ / سٹیم روسٹ (Dinner)', slot: 'raat', promptText: 'چکن تکہ سٹیم روسٹ رات کے کھانے کیلئے بنائیں' },
      { label: '🌙 چکن جل فریزی (Dinner)', slot: 'raat', promptText: 'چکن جل فریزی رات کے کھانے کیلئے بنائیں' },
      { label: '🍳 چکن شامی کباب و پراٹھا (Breakfast)', slot: 'nashta', promptText: 'چکن شامی کباب ناشتے کیلئے بنائیں' }
    ]
  };
}

// Helper to synthesize authentic recipes from combinations of ingredients
function generateIngredientSpecificResponse(
  ingredients: string[],
  recipes: Recipe[],
  familyMembers: FamilyMember[],
  isUr: boolean,
  specifiedSlot: 'dopahar' | 'raat' | 'nashta' | null,
  lang: Language = 'ur'
): ChefAiResponse {
  // If user has not specified whether it's for lunch or dinner, evaluate time and ASK!
  if (!specifiedSlot) {
    const timeEval = evaluateCurrentMealTime();
    return askMealTimeForIngredients(ingredients, isUr, timeEval, recipes, familyMembers, lang);
  }

  const set = new Set(ingredients);

  // If chicken is present, route to dedicated chicken multi-options handler
  if (set.has('chicken')) {
    return generateChickenMultiOptionsResponse('', set, recipes, familyMembers, isUr, specifiedSlot, lang);
  }

  // Match 1: ALOO + PALAK + METHI (User's exact fridge example!)
  if (set.has('aloo') && set.has('palak') && set.has('methi')) {
    if (specifiedSlot === 'dopahar') {
      return {
        reply: isUr
          ? `ماشاءاللہ! **دوپہر کے کھانے (Lunch)** کے لیے **آلو پالک میتھی کی ذائقہ دار بھجیا**:

⏰ **وقت کی تصدیق:** دوپہر کا وقت ہے، اس لیے یہ روایتی سبزی تازہ پھلکا روٹی یا پراٹھے اور دہی کے ٹھنڈے رائتے کے ساتھ دوپہر میں بہترین ذائقہ دے گی۔

**طریقہ تیاری (Step-by-Step Lunch Recipe):**
۱. **سبزی کی صفائی:** میتھی کے پتے دھو کر ہلکے نمکین پانی میں ۵ منٹ رکھیں اور نچوڑ لیں (اس سے کڑواہٹ ختم ہو جاتی ہے)۔ پالک کو دھو کر باریک کاٹ لیں۔
۲. **آلو کی کٹائی:** ۲ درمیانے آلوؤں کو چھوٹے چوکور ٹکڑوں (کیوبز) میں کاٹ لیں۔
۳. **تڑکا:** کڑاہی میں ۲ کھانے کے چمچ تیل/گھی گرم کریں، آدھا چائے کا چمچ زیرہ اور ۳ جوئے لہسن باریک کاٹ کر ہلکا سنہری کریں۔
۴. **بھنائی:** پہلے آلو ڈال کر ۲ سے ۳ منٹ ہلکا فرائی کریں، پھر ہلدی، پسا دھنیا اور ہلکا سا نمک ڈالیں۔
۵. **دم:** اب کٹی ہوئی پالک اور میتھی شامل کریں اور چمچ چلا کر ڈھکن لگا دیں۔ دھیمی آنچ پر ۱۰ سے ۱۲ منٹ پکنے دیں—سبزی اپنے ہی قدرتی پانی میں گل جائے گی۔
۶. **فنشنگ:** تیز آنچ پر اضافی نمی خشک کر کے ۲ ہری مرچیں اور ہلکا سا گرم مصالحہ چھڑکیں۔

**گھر والوں کی صحت کے مطابق خاص خیال:**
• **ابو جان کیلئے:** تیل کی مقدار کم رکھی گئی ہے اور نمک برائے نام، تاکہ کولیسٹرول اور بی پی قابو میں رہے۔
• **امی جان کیلئے:** پالک اور میتھی کو نرم گلا کر بنایا گیا ہے اور تیز لال مرچ سے پرہیز کیا گیا ہے، جس سے معدے پر بالکل بوجھ نہیں پڑے گا۔`
          : `Great choice! Here is the **Lunch** recipe for **Aloo Palak Methi Sabzi**:
Cook fresh cubed potatoes with chopped spinach and washed fenugreek leaves in a cumin-garlic tempering. Serve with fresh rotis and yogurt raita for lunch!`,
        dishName: 'آلو پالک میتھی کی سبزی (دوپہر کا کھانا / Lunch)',
        category: 'سبزی (Sabzi)',
        prepTime: '25 منٹ',
        bestUtensil: 'لوہے کی کڑاہی یا مٹی کی ہانڈی',
        calories: 230,
        budgetEstimatePKR: 260,
        recipeId: 'methi-aloo-roti',
        whyRecommended: 'دوپہر کے کھانے کیلئے تازہ پھلکا روٹی اور رائتے کے ہمراہ غذائیت سے بھرپور سبزی۔'
      };
    } else if (specifiedSlot === 'raat') {
      return {
        reply: isUr
          ? `ماشاءاللہ! **رات کے کھانے (Dinner)** کے لیے **نرم آلو پالک میتھی کی زود ہضم سبزی**:

⏰ **وقت کی تصدیق:** رات کا وقت ہے، اس لیے اسے ہلکا، کم تیل اور زود ہضم رکھا گیا ہے تاکہ رات کو سوتے وقت تیزابیت یا بھاری پن نہ ہو۔

**طریقہ تیاری (Step-by-Step Dinner Recipe):**
۱. میتھی اور پالک کو باریک کاٹیں اور آلوؤں کے چھوٹے پتلے قتلے کاٹیں تاکہ جلدی اور نرم گل جائیں۔
۲. ہانڈی میں صرف ڈیڑھ چمچ تیل ڈالیں، ایک چٹکی اجوائن (ہاضمے کیلئے) اور تھوڑا سا زیرہ کڑکڑائیں۔
۳. آلو، پالک اور میتھی ڈال کر ہلکی ہلدی اور برائے نام نمک شامل کریں۔
۴. دھیمی آنچ پر ڈھکن لگا کر دم پر ۱۰ منٹ پکائیں تاکہ سبزی بغیر تیز مصالحوں کے بالکل نرم ہو جائے۔
۵. رات کے کھانے میں اسے نرم پتلی روٹی کے ساتھ نوش فرمائیں، نیند پرسکون آئے گی اور معدہ ہلکا رہے گا۔

**گھر والوں کی صحت کے مطابق خاص خیال:**
• **ابو جان اور امی جان:** رات کے وقت چکنائی اور تیز مصالحوں سے مکمل پرہیز، کولیسٹرول اور معدے کیلئے انتہائی محفوظ۔`
          : `Great choice! Here is the **Dinner** recipe for **Aloo Palak Methi**:
Prepared light and gentle on digestion with minimal oil and carom seeds, perfect for nighttime digestion.`,
        dishName: 'آلو پالک میتھی (رات کا کھانا / Dinner)',
        category: 'سبزی (Sabzi)',
        prepTime: '20 منٹ',
        bestUtensil: 'ہانڈی یا کڑاہی',
        calories: 200,
        budgetEstimatePKR: 260,
        recipeId: 'methi-aloo-roti',
        whyRecommended: 'رات کے ہاضمے اور کولیسٹرول کے بچاؤ کیلئے کم تیل میں نرم پکی سبزی۔'
      };
    } else {
      return {
        reply: isUr
          ? `**صبح کے ناشتے / برنچ (Breakfast)** کے لیے **آلو میتھی پالک کی بھجیا اور پراٹھا**:
چھوٹے کٹے آلو اور میتھی پالک کی بھجیا کو خستہ پراٹھے اور کڑک چائے کے ساتھ ناشتے میں پیش کریں۔`
          : `Breakfast / Brunch recipe for Aloo Palak Methi with crisp paratha and chai.`,
        dishName: 'آلو پالک میتھی بھجیا (ناشتہ / Breakfast)',
        category: 'ناشتہ',
        prepTime: '20 منٹ',
        bestUtensil: 'کڑاہی',
        calories: 280,
        budgetEstimatePKR: 260,
        recipeId: 'methi-aloo-roti'
      };
    }
  }

  // Match 2: ALOO + PALAK
  if (set.has('aloo') && set.has('palak')) {
    const matched = recipes.find(r => r.id === 'palak-aloo-roti');
    if (specifiedSlot === 'raat') {
      return {
        reply: isUr
          ? `آپ کے پاس **آلو اور پالک** موجود ہیں! **رات کے کھانے (Dinner)** کیلئے نرم اور ہلکا سالن:

⏰ **وقت کی تصدیق:** رات کا کھانا ہے، اس لیے ہلکے مصالحے اور کم تیل میں تیار کیا گیا ہے۔
۱. پالک اور آلو کے قتلے کڑاہی میں زیرے کے ہلکے تڑکے میں دم دیں۔
۲. نرم روٹی کے ساتھ رات کو نوش فرمائیں، ہاضمہ ہلکا رہے گا۔`
          : `Dinner recipe for Palak Aloo with gentle seasoning and soft rotis.`,
        dishName: 'دیسی پالک آلو کا سالن (رات کا کھانا / Dinner)',
        category: 'سبزی (Sabzi)',
        prepTime: '20 منٹ',
        bestUtensil: 'لوہے کی کڑاہی',
        calories: 200,
        budgetEstimatePKR: 220,
        recipeId: matched ? matched.id : 'palak-aloo-roti'
      };
    }

    return {
      reply: isUr
        ? `آپ کے پاس **آلو اور پالک** موجود ہیں! **دوپہر کے کھانے (Lunch)** کیلئے گرما گرم **پالک آلو کا لذیذ سالن / بھجیا** تیار کریں۔

**ترکیب:**
۱. پالک کو دھو کر باریک کاٹ لیں اور آلو کے ٹکڑے کاٹ لیں۔
۲. کڑاہی میں ۲ چمچ تیل گرم کر کے زیرہ اور لہسن بھونیں۔
۳. آلو اور ہلدی، نمک، دھنیا ڈال کر ۲ منٹ بھونیں۔
۴. پالک ڈال کر دھیمی آنچ پر ۱۰ منٹ دم پر پکائیں تاکہ آلو پالک کے اپنے پانی میں نرم ہو جائیں۔
۵. ابو کیلئے کم نمک/تیل اور امی کے معدے کیلئے ہلکے مصالحے کے ساتھ یہ بہترین کھانا ہے۔`
        : `You have **Aloo and Palak**! Cook a delicious **Palak Aloo Curry/Bhujia** for lunch.`,
      dishName: 'دیسی پالک آلو کا سالن (دوپہر کا کھانا / Lunch)',
      category: 'سبزی (Sabzi)',
      prepTime: '25 منٹ',
      bestUtensil: 'لوہے کی کڑاہی',
      calories: 220,
      budgetEstimatePKR: 220,
      recipeId: matched ? matched.id : 'palak-aloo-roti'
    };
  }

  // Match 3: ALOO + METHI (User's exact query!)
  if (set.has('aloo') && set.has('methi')) {
    const matched = recipes.find(r => r.id === 'methi-aloo-roti');

    if (specifiedSlot === 'dopahar') {
      return {
        reply: isUr
          ? `ماشاءاللہ! **دوپہر کے کھانے (Lunch)** کے لیے **آلو میتھی کی ذائقہ دار بھجیا** کا مکمل طریقہ کار:

⏰ **وقت کی تصدیق:** دوپہر کا وقت ہے، اس لیے یہ تڑکے دار بھجیا تازہ پھلکا روٹی یا خستہ پراٹھے اور دہی کے ٹھنڈے رائتے کے ساتھ دوپہر میں زبردست لگے گی۔

**طریقہ تیاری (Step-by-Step Lunch Recipe):**
۱. **میتھی کی تیاری:** میتھی کے پتے دھو کر باریک کاٹ لیں اور ہلکے نمک ملے پانی میں ۵ منٹ بھگو کر نچوڑ لیں تاکہ اس کی کڑواہٹ ختم ہو جائے۔
۲. **تڑکا:** کڑاہی میں ۲ کھانے کے چمچ تیل یا دیسی گھی گرم کریں، آدھا چائے کا چمچ زیرہ اور ۳ جوئے لہسن باریک کاٹ کر ہلکا سنہری کریں۔
۳. **آلو کی بھنائی:** ۲ درمیانے آلو چھوٹے چوکور کاٹ کر کڑاہی میں ڈالیں اور آدھا چمچ ہلدی، آدھا چمچ پسا دھنیا اور ہلکا سا نمک ڈال کر ۲ منٹ بھونیں۔
۴. **دم:** کٹی ہوئی میتھی شامل کریں اور اچھی طرح مکس کر کے ڈھکن لگا دیں۔ دھیمی آنچ پر ۸ سے ۱۰ منٹ دم پر پکائیں (میتھی کے اپنے رس میں آلو نرم ہو جائیں گے)۔
۵. **فنشنگ:** جب آلو گل جائیں تو تیز آنچ پر اضافی نمی خشک کر کے ۲ ہری مرچیں اور ہلکا سا گرم مصالحہ چھڑکیں۔

**گھر والوں کی صحت کے مطابق خاص خیال:**
• **ابو جان کیلئے:** کولیسٹرول کے پیش نظر تیل کم رکھا گیا ہے اور نمک برائے نام۔
• **امی جان کیلئے:** میتھی معدے کی گیس اور جلن کو ختم کرتی ہے، تیز لال مرچ سے پرہیز کیا گیا ہے تاکہ ہاضمہ درست رہے۔`
          : `Great choice! Here is the authentic **Lunch** recipe for **Aloo Methi Bhujia**:
Fry diced potatoes with cumin, garlic, and fresh fenugreek leaves. Serve with hot phulka rotis and yogurt raita.`,
        dishName: 'آلو میتھی کی بھجیا (دوپہر کا کھانا / Lunch)',
        category: 'سبزی (Sabzi)',
        prepTime: '20 منٹ',
        bestUtensil: 'کڑاہی',
        calories: 220,
        budgetEstimatePKR: 200,
        recipeId: matched ? matched.id : 'methi-aloo-roti',
        whyRecommended: 'دوپہر کے کھانے کیلئے پھلکا روٹی اور رائتے کے ہمراہ خوشبودار اور لذیذ بھجیا۔'
      };
    } else if (specifiedSlot === 'raat') {
      return {
        reply: isUr
          ? `ماشاءاللہ! **رات کے کھانے (Dinner)** کے لیے **نرم قصوری آلو میتھی کی سبزی** کی ترکیب:

⏰ **وقت کی تصدیق:** رات کا وقت ہے، اس لیے اسے ہلکا، کم تیل اور زود ہضم رکھا گیا ہے تاکہ رات کو سوتے وقت معدے پر بوجھ نہ بنے۔

**طریقہ تیاری (Step-by-Step Dinner Recipe):**
۱. میتھی کے پتے دھو کر باریک کاٹیں اور آلوؤں کے چھوٹے باریک قتلے کاٹیں تاکہ جلدی اور نرم گل جائیں۔
۲. ہانڈی میں صرف ڈیڑھ کھانے کا چمچ تیل ڈالیں، ایک چٹکی اجوائن (رات کے ہاضمے کیلئے) اور تھوڑا سا زیرہ کڑکڑائیں۔
۳. آلو اور میتھی ڈال کر ہلکی ہلدی اور برائے نام نمک شامل کریں۔
۴. ۲ کھانے کے چمچ پانی کا چھینٹا دے کر بالکل ہلکی آنچ پر دم پر ۱۰ منٹ پکائیں تاکہ سبزی نرم ملائم ہو جائے۔
۵. رات کے کھانے میں اسے نرم پتلی پھلکا روٹی کے ساتھ نوش فرمائیں، رات کو سوتے وقت نہ تیزابیت ہوگی نہ پیٹ میں بھاری پن۔

**گھر والوں کی صحت کے مطابق خاص خیال:**
• **ابو جان اور امی جان:** رات کے وقت چکنائی اور تیز مصالحوں سے مکمل پرہیز، کولیسٹرول اور معدے کیلئے انتہائی محفوظ۔`
          : `Great choice! Here is the **Dinner** recipe for **Kasuri Aloo Methi**:
Cooked gently with minimal oil and a pinch of carom seeds (ajwain) for nighttime comfort and easy digestion.`,
        dishName: 'قصوری آلو میتھی (رات کا کھانا / Dinner)',
        category: 'سبزی (Sabzi)',
        prepTime: '20 منٹ',
        bestUtensil: 'ہانڈی یا کڑاہی',
        calories: 195,
        budgetEstimatePKR: 200,
        recipeId: matched ? matched.id : 'methi-aloo-roti',
        whyRecommended: 'رات کے ہاضمے اور کولیسٹرول کے بچاؤ کیلئے کم تیل میں نرم دم پر پکی سبزی۔'
      };
    } else {
      // Breakfast
      return {
        reply: isUr
          ? `**صبح کے ناشتے / برنچ (Breakfast)** کے لیے **میتھی آلو کی بھجیا اور پراٹھا**:
چھوٹے کٹے آلو اور قصوری میتھی کو کڑاہی میں فرائی کریں اور گرما گرم خستہ پراٹھے اور چائے کے ساتھ نوش فرمائیں۔`
          : `Breakfast recipe for Aloo Methi Bhujia with crispy paratha.`,
        dishName: 'میتھی آلو کی بھجیا (ناشتہ / Breakfast)',
        category: 'ناشتہ',
        prepTime: '20 منٹ',
        bestUtensil: 'کڑاہی',
        calories: 270,
        budgetEstimatePKR: 200,
        recipeId: matched ? matched.id : 'methi-aloo-roti'
      };
    }
  }

  // Match 4: ALOO + MATAR (Peas)
  if (set.has('aloo') && set.has('matar')) {
    return {
      reply: isUr
        ? `آپ کے پاس **آلو اور مٹر** موجود ہیں! اس سے **آلو مٹر کا ذائقہ دار سالن / شوربہ** یا بھجیا بنائیں۔

پیاز اور ٹماٹر کی ہلکی گریوی میں آلو مٹر کو گلا کر ہرا دھنیا اور گرم مصالحہ ڈالیں، پھلکا روٹی یا ابلے چاول کے ساتھ لاجواب لگتا ہے۔`
        : `You have **Aloo and Matar**! Prepare a delicious **Aloo Matar Curry** in a mild onion-tomato gravy.`,
      dishName: 'آلو مٹر کا سالن (Aloo Matar)',
      category: 'سبزی (Sabzi)',
      prepTime: '25 منٹ',
      bestUtensil: 'دیگچی یا ہانڈی',
      calories: 240,
      budgetEstimatePKR: 220
    };
  }

  // Match 5: ALOO + GOBHI (Cauliflower)
  if (set.has('aloo') && set.has('gobhi')) {
    const matched = recipes.find(r => r.id === 'gobhi-matar-aloo-roti');
    return {
      reply: isUr
        ? `آپ کے پاس **آلو اور گوبھی** موجود ہیں! روایتی **آلو گوبھی کی مسالے دار سبزی** تیار کریں۔

گوبھی کے پھول اور آلو ادرک اور زیرے کے تڑکے میں دم پر پکائیں، ادرک گوبھی کے بادی پن کو ختم کر کے ہاضمہ درست رکھتی ہے۔`
        : `You have **Aloo and Gobhi**! Make comforting **Aloo Gobi** with generous julienned ginger and cumin tempering.`,
      dishName: 'آلو گوبھی کی سبزی (Aloo Gobi)',
      category: 'سبزی (Sabzi)',
      prepTime: '25 منٹ',
      bestUtensil: 'کڑاہی',
      calories: 230,
      budgetEstimatePKR: 240,
      recipeId: matched ? matched.id : undefined
    };
  }

  // Match 6: ALOO + BAINGAN (Eggplant)
  if (set.has('aloo') && set.has('baingan')) {
    const matched = recipes.find(r => r.id === 'aloo-baingan-roti');
    return {
      reply: isUr
        ? `آپ کے پاس **آلو اور بینگن** موجود ہیں! چٹپٹا **اچاری آلو بینگن کا سالن** بنائیں۔

کلونجی، میتھی دانہ اور رائی کے اچاری تڑکے کے ساتھ آلو بینگن دم پر بنائیں، گرما گرم روٹی کے ساتھ بے حد لذیذ بنتا ہے۔`
        : `You have **Aloo and Baingan**! Cook savory **Achari Aloo Baingan** tempered with nigella seeds and mustard.`,
      dishName: 'اچاری آلو بینگن (Aloo Baingan)',
      category: 'سبزی (Sabzi)',
      prepTime: '25 منٹ',
      bestUtensil: 'مٹی کی ہانڈی',
      calories: 220,
      budgetEstimatePKR: 190,
      recipeId: matched ? matched.id : undefined
    };
  }

  // Match 7: ALOO + SHIMLA MIRCH
  if (set.has('aloo') && set.has('shimla')) {
    return {
      reply: isUr
        ? `آپ کے پاس **آلو اور شملہ مرچ** موجود ہیں! اس سے لذیذ **آلو شملہ مرچ کی بھجیا** بنائیں۔

پہلے آلوؤں کو گلا لیں، آخر کے ۵ منٹ میں شملہ مرچ ڈال کر تیز آنچ پر بھونیں تاکہ شملہ مرچ کا کرنچ اور خوشبو برقرار رہے۔`
        : `You have **Aloo and Shimla Mirch**! Make a quick **Aloo Capsicum Bhujia**, keeping capsicum crisp and aromatic.`,
      dishName: 'آلو شملہ مرچ بھجیا',
      category: 'سبزی (Sabzi)',
      prepTime: '20 منٹ',
      bestUtensil: 'کڑاہی',
      calories: 210,
      budgetEstimatePKR: 200
    };
  }

  // Match 8: QEEMA + SHIMLA / MATAR / ALOO
  if (set.has('qeema')) {
    let dish = 'دم قیمہ';
    if (set.has('shimla')) dish = 'قیمہ شملہ مرچ (Qeema Shimla Mirch)';
    else if (set.has('matar')) dish = 'قیمہ مٹر (Qeema Matar)';
    else if (set.has('aloo')) dish = 'آلو قیمہ (Aloo Qeema)';
    else if (set.has('karela')) dish = 'قیمہ بھرے کریلے';

    return {
      reply: isUr
        ? `آپ کے پاس قیمہ اور متعلقہ اجزاء موجود ہیں! آپ کے لیے بہترین تجویز: **${dish}**۔

قیمے کو پیاز، ادرک لہسن اور ٹماٹر کے ساتھ بھون کر گلائیں، آخر میں ہری مرچیں، ادرک اور لیموں نچوڑ کر دم دیں۔`
        : `You have minced meat! Cook delicious **${dish}** with aromatic ginger, garlic, and sliced green chilies.`,
      dishName: dish,
      category: 'قیمہ (Mince)',
      prepTime: '30 منٹ',
      bestUtensil: 'کڑاہی یا ہانڈی',
      calories: 340,
      budgetEstimatePKR: 550
    };
  }

  // Match 9: CHICKEN combinations (Never default to just Chicken Karahi!)
  if (set.has('chicken')) {
    return generateChickenMultiOptionsResponse('', set, recipes, familyMembers, isUr, specifiedSlot, lang);
  }

  // Match 10: DAAL / CHANA combinations
  if (set.has('daal') || set.has('chana')) {
    let dish = 'تڑکا دال';
    let id: string | undefined = undefined;

    if (set.has('chawal')) {
      dish = 'تڑکا مونگ مسور دال اور سفید چاول';
      id = 'white-rice-moong-masoor';
    } else if (set.has('palak')) {
      dish = 'دال پالک تڑکا';
    } else if (set.has('lauki') || set.has('kaddu')) {
      dish = 'دال چنا لوکی سالن';
    } else if (set.has('chana')) {
      dish = 'لاہوری چنے / سفید چولے';
      id = 'naan-chanay';
    }

    return {
      reply: isUr
        ? `آپ کے پاس دال/چنے موجود ہیں! اس سے **${dish}** بنائیں۔

دال کو نرم گلا کر دیسی گھی، زیرے، لہسن اور گول لال مرچ کا تڑکا لگائیں، امی کے معدے کیلئے نہایت ہلکا اور پروٹین سے بھرپور ہے۔`
        : `You have lentils/chickpeas! Cook comforting **${dish}** with cumin and garlic tarka.`,
      dishName: dish,
      category: 'دال (Daal)',
      prepTime: '25 منٹ',
      bestUtensil: 'مٹی کی ہانڈی',
      calories: 240,
      budgetEstimatePKR: 180,
      recipeId: id
    };
  }

  // Match 11: ANDA (Eggs)
  if (set.has('anda')) {
    return {
      reply: isUr
        ? `آپ کے پاس انڈے موجود ہیں! صرف ۱۰ منٹ میں **انڈا پیاز خاگینہ یا دیسی آملیٹ** تیار کریں۔

پیاز، ٹماٹر، ہری مرچ اور ہلکے مصالحے کے ساتھ انڈے بھونیں، گرما گرم پراٹھے یا روٹی کے ساتھ فوری تیار ہو جاتا ہے۔`
        : `You have eggs! Make quick **Desi Egg Khagina / Masala Scramble** in just 10 minutes.`,
      dishName: 'انڈا خاگینہ و دیسی آملیٹ',
      category: 'ناشتہ / ہلکا کھانا',
      prepTime: '10 منٹ',
      bestUtensil: 'فرائنگ پین',
      calories: 240,
      budgetEstimatePKR: 120,
      recipeId: 'anda-paratha-omelette'
    };
  }

  // Match 12: VEGETABLE SINGLE/MULTIPLE (Bhindi, Karela, Tori, Lauki)
  if (set.has('bhindi')) {
    return {
      reply: isUr
        ? `آپ کے پاس **بھنڈی** موجود ہے! کرکری **بھنڈی پیاز مصالحہ** بنائیں۔

بھنڈی کو پہلے خشک کر کے تیز آنچ پر فرائی کریں تاکہ لیس ختم ہو، پھر پیاز اور ٹماٹر میں دم پر پکائیں۔`
        : `You have **Bhindi (Okra)**! Fry crispy **Bhindi Pyaz Masala** on high heat to prevent stickiness.`,
      dishName: 'کرکری بھنڈی پیاز مصالحہ',
      category: 'سبزی (Sabzi)',
      prepTime: '20 منٹ',
      bestUtensil: 'کڑاہی',
      calories: 190,
      budgetEstimatePKR: 190,
      recipeId: 'bhindi-masala-roti'
    };
  }

  if (set.has('karela')) {
    return {
      reply: isUr
        ? `آپ کے پاس **کریلے** موجود ہیں! کڑواہٹ سے پاک **کریلے پیاز مصالحہ** بنائیں۔

کریلوں پر نمک لگا کر نچوڑ لیں اور پیاز کی زیادہ مقدار کے ساتھ بھونیں، شوگر کے مریضوں کیلئے بھی اکسیر ہے۔`
        : `You have **Karelay (Bitter Gourd)**! Cook **Karelay Pyaz** with sliced onions to balance bitterness.`,
      dishName: 'کریلے پیاز مصالحہ',
      category: 'سبزی (Sabzi)',
      prepTime: '30 منٹ',
      bestUtensil: 'کڑاہی',
      calories: 180,
      budgetEstimatePKR: 200,
      recipeId: 'karelay-pyaz-roti'
    };
  }

  if (set.has('tori') || set.has('lauki')) {
    const isTori = set.has('tori');
    const dish = isTori ? 'گھیا توری کی ہلکی بھجیا' : 'گھیا کدو / لوکی کا سالن';
    return {
      reply: isUr
        ? `آپ کے پاس **${isTori ? 'توری' : 'لوکی/کدو'}** موجود ہے! یہ معدے اور کولیسٹرول کے مریضوں کیلئے دنیا کی سب سے بہترین اور ٹھنڈی سبزی ہے۔

زیرے اور کالی مرچ کے ہلکے تڑکے میں دم پر بنائیں، امی اور ابو دونوں کی صحت کیلئے پرفیکٹ ہے۔`
        : `You have **${isTori ? 'Tori' : 'Lauki'}**! Cook light, digestible **${dish}** with mild cumin tempering.`,
      dishName: dish,
      category: 'سبزی (Sabzi)',
      prepTime: '20 منٹ',
      bestUtensil: 'مٹی کی ہانڈی یا پتیلی',
      calories: 160,
      budgetEstimatePKR: 140,
      recipeId: isTori ? 'tori-bhujia-roti' : 'kaddu-lauki-roti'
    };
  }

  // Generic ingredient combination response
  const ingredientNamesUr = ingredients.map(k => INGREDIENTS_DB.find(i => i.key === k)?.ur || k).join('، ');
  const title = `موسمی ${ingredientNamesUr} کی سبزی / سالن`;

  return {
    reply: isUr
      ? `آپ کے پاس موجود اجزاء (${ingredientNamesUr}) سے **${title}** تیار کی جا سکتی ہے!

**باورچی کے ہدایات:**
۱. سبزی کو دھو کر کاٹ لیں اور کڑاہی میں ۲ چمچ تیل میں زیرہ اور لہسن کا ہلکا تڑکا لگائیں۔
۲. دھیمی آنچ پر ڈھکن لگا کر پکائیں تاکہ اجزاء اپنی ہی بھاپ اور غذائیت میں گل جائیں۔
۳. ابو کے کولیسٹرول کیلئے نمک/تیل کم رکھیں اور امی کے معدے کیلئے مرچیں ہلکی رکھیں تاکہ سب خوش ہو کر کھائیں۔`
      : `With your ingredients (${ingredients.join(', ')}), prepare a wholesome **${title}** sautéed with cumin and garlic.`,
    dishName: title,
    category: 'سبزی / سالن',
    prepTime: '25 منٹ',
    bestUtensil: 'کڑاہی',
    calories: 220,
    budgetEstimatePKR: 200
  };
}
