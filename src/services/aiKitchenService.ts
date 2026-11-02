import { Recipe, FamilyMember, MealHistoryEntry, Season, Language, MealSlot } from '../types';
import { getLocalizedRecipe } from './recipeLocalization';

export interface AiKitchenInsight {
  currentDayName: string;
  currentDayEn: string;
  currentDateFormatted: string;
  
  // Last week on the exact same weekday
  lastWeekSameDay: {
    dayName: string;
    dishesCooked: Array<{ name: string; slot: MealSlot }>;
    advice: string;
  };

  // Yesterday, Day before yesterday, and past few days
  recentHistory: Array<{
    daysAgo: number;
    label: string;
    date: string;
    dishes: Array<{ name: string; slot: MealSlot; recipeId: string }>;
  }>;
  recentBalanceAdvice: string;

  // Dishes not cooked for a long time
  longTimeNotCooked: Array<{
    recipe: Recipe;
    daysAgoText: string;
    reason: string;
  }>;

  // Today's suggested 3-meal menu
  todaySuggestedMenu: {
    nashta: { recipe: Recipe; reason: string };
    dopahar: { recipe: Recipe; reason: string };
    raat: { recipe: Recipe; reason: string };
  };

  healthAndFamilyNotes: string[];
}

export const WEEKDAYS_SHORT: Record<Language, string[]> = {
  ur: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  pa: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
  ps: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
  ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  fa: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
};

export const WEEKDAYS_FULL: Record<Language, string[]> = {
  ur: ['اتوار (Sunday)', 'پیر (Monday)', 'منگل (Tuesday)', 'بدھ (Wednesday)', 'جمعرات (Thursday)', 'جمعہ (Friday)', 'ہفتہ (Saturday)'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  pa: ['اتوار (Sunday)', 'پیر (Monday)', 'منگل (Tuesday)', 'بدھ (Wednesday)', 'جمعرات (Thursday)', 'جمعہ (Friday)', 'ہفتہ (Saturday)'],
  ps: ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'],
  ar: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  fa: ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
};

export const SLOT_NAMES: Record<Language, Record<MealSlot, string>> = {
  ur: { nashta: 'ناشتہ', dopahar: 'دوپہر', raat: 'رات' },
  en: { nashta: 'Breakfast', dopahar: 'Lunch', raat: 'Dinner' },
  pa: { nashta: 'ناشتہ', dopahar: 'دوپہر', raat: 'رات' },
  ps: { nashta: 'سهارنی', dopahar: 'غرمه', raat: 'ماښام' },
  ar: { nashta: 'الإفطار', dopahar: 'الغداء', raat: 'العشاء' },
  fa: { nashta: 'صبحانه', dopahar: 'ناهار', raat: 'شام' },
  es: { nashta: 'Desayuno', dopahar: 'Almuerzo', raat: 'Cena' },
};

export function generateAiKitchenInsight(
  recipes: Recipe[],
  familyMembers: FamilyMember[],
  history: MealHistoryEntry[],
  season: Season,
  lang: Language = 'ur'
): AiKitchenInsight {
  const now = new Date();
  const dayIndex = now.getDay();
  const todayStr = now.toISOString().split('T')[0];

  const currentDayName = (WEEKDAYS_FULL[lang] || WEEKDAYS_FULL.ur)[dayIndex];
  const currentDayShort = (WEEKDAYS_SHORT[lang] || WEEKDAYS_SHORT.ur)[dayIndex];
  const currentDayEn = WEEKDAYS_SHORT.en[dayIndex];

  const oneDayMs = 24 * 60 * 60 * 1000;

  // 1. Group history by date & days ago
  const historyByDate: Record<string, MealHistoryEntry[]> = {};
  const recipeLastCookedDays: Record<string, number> = {};

  history.forEach(entry => {
    const entryDate = entry.date || new Date(entry.timestamp).toISOString().split('T')[0];
    if (!historyByDate[entryDate]) {
      historyByDate[entryDate] = [];
    }
    historyByDate[entryDate].push(entry);

    const diffDays = Math.max(0, Math.floor((now.getTime() - entry.timestamp) / oneDayMs));
    if (recipeLastCookedDays[entry.recipeId] === undefined || diffDays < recipeLastCookedDays[entry.recipeId]) {
      recipeLastCookedDays[entry.recipeId] = diffDays;
    }
  });

  // 2. Identify what was cooked on the SAME WEEKDAY LAST WEEK
  const lastWeekDate = new Date(now.getTime() - 7 * oneDayMs).toISOString().split('T')[0];
  const lastWeekEntries = historyByDate[lastWeekDate] || [];

  let fallbackSameWeekdayDishes: Array<{ name: string; slot: MealSlot }> = [];
  if (lastWeekEntries.length === 0) {
    for (let d = 8; d <= 21; d++) {
      const pastDateObj = new Date(now.getTime() - d * oneDayMs);
      if (pastDateObj.getDay() === dayIndex) {
        const pDateStr = pastDateObj.toISOString().split('T')[0];
        if (historyByDate[pDateStr] && historyByDate[pDateStr].length > 0) {
          fallbackSameWeekdayDishes = historyByDate[pDateStr].map(e => ({ name: e.recipeName, slot: e.slot }));
          break;
        }
      }
    }
  }

  const lastWeekCookedList: Array<{ name: string; slot: MealSlot }> = lastWeekEntries.length > 0
    ? lastWeekEntries.map(e => ({ name: e.recipeName, slot: e.slot }))
    : fallbackSameWeekdayDishes.length > 0
      ? fallbackSameWeekdayDishes
      : [
          { name: dayIndex === 5 ? 'چکن بریانی' : dayIndex === 6 ? 'دیگی چکن پلاؤ' : dayIndex === 0 ? 'حلوہ پوری و نہاری' : 'دال چاول و کباب', slot: 'raat' }
        ];

  const lastWeekDishNames = lastWeekCookedList.map(d => d.name).join(', ');
  let lastWeekAdvice = '';
  if (lang === 'en') {
    lastWeekAdvice = `Last week on ${currentDayEn}, you cooked "${lastWeekDishNames}". To ensure healthy variety, avoid repeating it today and try a fresh alternative!`;
  } else if (lang === 'pa') {
    lastWeekAdvice = `پچھلے ${currentDayShort} نوں تہاڈے کچن چ "${lastWeekDishNames}" پکیا سی، اج کجھ نواں پکا کے سواد لوو!`;
  } else if (lang === 'ps') {
    lastWeekAdvice = `تېره اونۍ په ${currentDayShort} ورځ ستاسو په پخلنځي کې "${lastWeekDishNames}" پخه شوې وه، نن ورځ د خوند بدلون لپاره نوي خواړه غوره کړئ!`;
  } else if (lang === 'ar') {
    lastWeekAdvice = `في الأسبوع الماضي يوم ${currentDayShort} تم طبخ "${lastWeekDishNames}". لتنويع الأطباق، ننصحك باختيار وجبة جديدة اليوم!`;
  } else if (lang === 'fa') {
    lastWeekAdvice = `هفته گذشته در روز ${currentDayShort} در آشپزخانه شما "${lastWeekDishNames}" پخته شده بود، برای تنوع طعم امروز غذای جدیدی را امتحان کنید!`;
  } else if (lang === 'es') {
    lastWeekAdvice = `La semana pasada el ${currentDayShort} cocinó "${lastWeekDishNames}". Para mantener la variedad, ¡pruebe algo diferente hoy!`;
  } else {
    lastWeekAdvice = `پچھلے ${currentDayShort} (${currentDayEn}) کو آپ کے کچن میں "${lastWeekDishNames}" بنی تھی، اس لیے آج دوبارہ وہی چیز نہ دہرائیں بلکہ دسترخوان کو نیا ذائقہ دیں!`;
  }

  // 3. Recent history breakdown
  const recentHistory: Array<{
    daysAgo: number;
    label: string;
    date: string;
    dishes: Array<{ name: string; slot: MealSlot; recipeId: string }>;
  }> = [];

  const recentLabels: Record<Language, { yesterday: string; dayBefore: string; daysAgo: string }> = {
    ur: { yesterday: 'کل (1 دن پہلے)', dayBefore: 'پرسوں (2 دن پہلے)', daysAgo: 'دن پہلے' },
    en: { yesterday: 'Yesterday (1 Day Ago)', dayBefore: 'Day Before Yesterday (2 Days Ago)', daysAgo: 'Days Ago' },
    pa: { yesterday: 'کل (1 دن پہلاں)', dayBefore: 'پرسوں (2 دن پہلاں)', daysAgo: 'دن پہلاں' },
    ps: { yesterday: 'پرون (1 ورځ مخکې)', dayBefore: 'وړمه ورځ (2 ورځې مخکې)', daysAgo: 'ورځې مخکې' },
    ar: { yesterday: 'الأمس (منذ يوم)', dayBefore: 'قبل أمس (منذ يومين)', daysAgo: 'أيام مضت' },
    fa: { yesterday: 'دیروز (۱ روز قبل)', dayBefore: 'پریروز (۲ روز قبل)', daysAgo: 'روز قبل' },
    es: { yesterday: 'Ayer (hace 1 día)', dayBefore: 'Anteayer (hace 2 días)', daysAgo: 'días atrás' },
  };

  const labels = recentLabels[lang] || recentLabels.ur;

  for (let diff = 1; diff <= 4; diff++) {
    const dObj = new Date(now.getTime() - diff * oneDayMs);
    const dStr = dObj.toISOString().split('T')[0];
    const dayWk = (WEEKDAYS_SHORT[lang] || WEEKDAYS_SHORT.ur)[dObj.getDay()];
    const entries = historyByDate[dStr] || [];

    let label = `${diff} ${labels.daysAgo} (${dayWk})`;
    if (diff === 1) label = `${labels.yesterday} - ${dayWk}`;
    if (diff === 2) label = `${labels.dayBefore} - ${dayWk}`;

    recentHistory.push({
      daysAgo: diff,
      label,
      date: dStr,
      dishes: entries.map(e => ({ name: e.recipeName, slot: e.slot, recipeId: e.recipeId }))
    });
  }

  const yesterdayDishes = recentHistory[0]?.dishes || [];
  const hadChickenRecently = recentHistory.some(h => h.dishes.some(d => d.name.toLowerCase().includes('چکن') || d.name.toLowerCase().includes('chicken') || d.name.toLowerCase().includes('بریانی')));
  const hadDaalRecently = recentHistory.some(h => h.dishes.some(d => d.name.toLowerCase().includes('دال') || d.name.toLowerCase().includes('daal')));

  let recentBalanceAdvice = '';
  if (lang === 'en') {
    recentBalanceAdvice = hadChickenRecently 
      ? 'You enjoyed chicken/meat recently. Today, consider seasonal fresh greens or comforting lentils for optimal gut health.'
      : 'You enjoyed lentils and vegetables recently. Today is a wonderful day to prepare a flavorful chicken dish or hearty pulao.';
  } else if (lang === 'pa') {
    recentBalanceAdvice = hadChickenRecently
      ? 'پچھلے دناں چ گوشت کھادا سی، اج تازی موسمی سبزی یا پتلی دال پھلکے نال بہترین رہے گی۔'
      : 'پچھلے دناں چ دال سبزی کھادی سی، اج کڑاہی یا پلاؤ پکاؤ تے مزہ لوو۔';
  } else if (lang === 'ps') {
    recentBalanceAdvice = hadChickenRecently
      ? 'په تېرو ورځو کې مو غوښه خوړلې وه، نن ورځ تازه سبزي یا دال د هاضمې لپاره غوره انتخاب دی.'
      : 'په تېرو ورځو کې مو دال او سبزي خوړلې وه، نن د خوندور چرګ یا پلاو پخولو ښه وخت دی.';
  } else if (lang === 'ar') {
    recentBalanceAdvice = hadChickenRecently
      ? 'تناولت اللحوم والدجاج مؤخراً، اليوم ننصحك بالخضار الموسمية الطازجة أو العدس الخفيف لصحة المعدة.'
      : 'تناولت العدس والخضار مؤخراً، اليوم يوم رائع لتحضير طبق دجاج شهي أو أرز بيلو خفيف.';
  } else if (lang === 'fa') {
    recentBalanceAdvice = hadChickenRecently
      ? 'اخیراً گوشت و مرغ میل کرده‌اید، امروز سبزیجات فصلی سبک یا سوپ دال برای تعادل هضم عالی است.'
      : 'اخیراً خوراک گیاهی و دال میل کرده‌اید، امروز پختن مرغ یا پلو معطر انتخابی فوق‌العاده است.';
  } else if (lang === 'es') {
    recentBalanceAdvice = hadChickenRecently
      ? 'Disfrutó de pollo recientemente. Hoy considere verduras frescas de temporada o lentejas para una digestión equilibrada.'
      : 'Disfrutó de lentejas y verduras recientemente. Hoy es ideal preparar un delicioso pollo o arroz pulao.';
  } else {
    recentBalanceAdvice = hadChickenRecently
      ? 'پچھلے دنوں چکن/گوشت کا استعمال ہوا ہے، اس لیے آج معدے کی راحت کیلئے موسمی تازہ سبزی یا پتلی دال بہترین رہے گی۔'
      : 'پچھلے دنوں دال و سبزی کھائی گئی ہے، اس لیے آج دسترخوان پر مزیدار چکن کڑاہی یا پلاؤ رونق بڑھائے گا۔';
  }

  // 4. Long time not cooked dishes
  const longTimeSelected = recipes
    .filter(r => (recipeLastCookedDays[r.id] === undefined || recipeLastCookedDays[r.id] >= 6))
    .slice(0, 4)
    .map(r => ({
      recipe: r,
      daysAgoText: recipeLastCookedDays[r.id] !== undefined ? `${recipeLastCookedDays[r.id]} ${labels.daysAgo}` : (lang === 'en' ? 'Not cooked yet' : 'کافی عرصہ ہو گیا'),
      reason: lang === 'en' ? 'Has not been prepared recently; revives dining table variety.' : 'کافی عرصے سے نہیں بنی، ذائقہ بدلنے کیلئے زبردست ہے۔'
    }));

  // 5. Today's suggested balanced 3-meal menu
  const nashtaRecipe = recipes.find(r => r.category === 'nashta') || recipes[0];
  const dopaharRecipe = recipes.find(r => r.category === 'sabzi') || recipes[1];
  const raatRecipe = recipes.find(r => r.category === 'daal' || r.category === 'chicken') || recipes[2];

  const todaySuggestedMenu = {
    nashta: {
      recipe: nashtaRecipe,
      reason: lang === 'en' ? 'Wholesome morning protein and energy.' : 'صحت بخش اور توانائی سے بھرپور روایتی ناشتہ'
    },
    dopahar: {
      recipe: dopaharRecipe,
      reason: lang === 'en' ? 'Light digestive midday meal with whole wheat roti.' : 'دوپہر میں زود ہضم ہلکی ترکاری اور پھلکا روٹی'
    },
    raat: {
      recipe: raatRecipe,
      reason: lang === 'en' ? 'Comforting dinner ensuring complete family satisfaction.' : 'رات کے وقت سب گھر والوں کی پسندیدہ اور متوازن غذا'
    }
  };

  const healthAndFamilyNotes = familyMembers.map(m => {
    return lang === 'en'
      ? `${m.name}: Monitored dietary parhez for family well-being.`
      : `${m.name}: پرہیز اور پسند ناپسند کا خیال رکھا گیا ہے۔`;
  });

  return {
    currentDayName,
    currentDayEn,
    currentDateFormatted: todayStr,
    lastWeekSameDay: {
      dayName: currentDayShort,
      dishesCooked: lastWeekCookedList,
      advice: lastWeekAdvice
    },
    recentHistory,
    recentBalanceAdvice,
    longTimeNotCooked: longTimeSelected,
    todaySuggestedMenu,
    healthAndFamilyNotes
  };
}

export interface DishLastCookedDetail {
  recipeId: string;
  found: boolean;
  daysAgo: number | null;
  dateStr: string | null;
  dayName: string | null;
  slotName: string | null;
  badgeText: string;
  detailSentence: string;
  isRecent: boolean;
  isSameWeekdayLastWeek: boolean;
}

export function findDishLastCooked(
  recipe: Recipe,
  history: MealHistoryEntry[],
  lang: Language = 'ur'
): DishLastCookedDetail {
  const now = new Date();

  const rName = (recipe.nativeName || recipe.name || '').toLowerCase();
  const rId = (recipe.id || '').toLowerCase();

  const matchedEntries = history.filter(entry => {
    if (entry.recipeId && (entry.recipeId === recipe.id || rId.includes(entry.recipeId) || entry.recipeId.includes(rId))) {
      return true;
    }
    const eName = (entry.recipeName || '').toLowerCase();
    const keywords = [
      'کڑاہی', 'karahi', 'بریانی', 'biryani', 'پلاؤ', 'pulao',
      'دال', 'daal', 'سبزی', 'sabzi', 'کباب', 'kabab', 'گوشت', 'gosht',
      'قیمہ', 'qeema', 'نہاری', 'nihari', 'ساگ', 'saag', 'بھنڈی', 'bhindi',
      'توری', 'tori', 'کریلے', 'karelay', 'گوبھی', 'gobhi', 'پالک', 'palak',
      'میتھی', 'methi', 'شملہ', 'shimla', 'حلوہ پوری', 'halwa puri', 'چنے', 'chanay'
    ];
    for (const kw of keywords) {
      if (eName.includes(kw) && (rName.includes(kw) || rId.includes(kw))) {
        return true;
      }
    }
    return false;
  });

  const notFoundBadges: Record<Language, { badge: string; sentence: string }> = {
    ur: {
      badge: 'کافی عرصے سے نہیں بنا (نیا ذائقہ!)',
      sentence: 'یہ کھانا کافی وقت سے نہیں بنا (کچن کی تاریخ میں درج نہیں ہے)، آج بنانا بالکل نیا اور پرلطف رہے گا!'
    },
    en: {
      badge: 'Not cooked in recent history (Fresh Taste!)',
      sentence: 'This dish has not been cooked in recent history. A great opportunity to introduce something fresh!'
    },
    pa: {
      badge: 'کافی چر توں نئیں بنیا (نواں سواد!)',
      sentence: 'ایہ کھانا کافی چِر توں نئیں بنیا، اج پکاؤ تے نوی بہار آئے گی!'
    },
    ps: {
      badge: 'ډېر وخت نه دی پخ شوی (نوې خوند!)',
      sentence: 'دا خواړه ډېر وخت نه دی پخ شوی، نن یې پخول نوی خوند راوړي!'
    },
    ar: {
      badge: 'لم يطبخ منذ فترة طويلة (طعم طازج!)',
      sentence: 'لم يتم طبخ هذا الطبق مؤخراً في المطبخ، إعداده اليوم سيكون تجديداً رائعاً!'
    },
    fa: {
      badge: 'مدت زیادی است پخته نشده (طعم تازه!)',
      sentence: 'این غذا مدت‌هاست در آشپزخانه پخته نشده است، پختن آن امروز انتخابی عالی است!'
    },
    es: {
      badge: 'No cocinado recientemente (¡Sabor fresco!)',
      sentence: 'Este plato no se ha preparado recientemente. ¡Una gran oportunidad para disfrutarlo hoy!'
    }
  };

  const nf = notFoundBadges[lang] || notFoundBadges.ur;

  if (matchedEntries.length === 0) {
    return {
      recipeId: recipe.id,
      found: false,
      daysAgo: null,
      dateStr: null,
      dayName: null,
      slotName: null,
      badgeText: nf.badge,
      detailSentence: nf.sentence,
      isRecent: false,
      isSameWeekdayLastWeek: false
    };
  }

  matchedEntries.sort((a, b) => b.timestamp - a.timestamp);
  const latest = matchedEntries[0];
  const diffDays = Math.max(0, Math.floor((now.getTime() - latest.timestamp) / (24 * 60 * 60 * 1000)));
  const latestDateObj = new Date(latest.timestamp);
  const entryDayIndex = latestDateObj.getDay();

  const dayName = (WEEKDAYS_SHORT[lang] || WEEKDAYS_SHORT.ur)[entryDayIndex];
  const slotName = (SLOT_NAMES[lang] || SLOT_NAMES.ur)[latest.slot];

  let badgeText = '';
  let detailSentence = '';
  const isRecent = diffDays <= 2;
  const isSameWeekdayLastWeek = diffDays === 7;

  if (diffDays === 0) {
    if (lang === 'en') {
      badgeText = `Cooked Today (${slotName})`;
      detailSentence = `This dish was cooked earlier today during ${slotName}.`;
    } else if (lang === 'pa') {
      badgeText = `اج (${slotName}) وچ پکیا سی`;
      detailSentence = `ایہ کھانا اج (${slotName}) ویلے پکایا جا چکیا اے۔`;
    } else if (lang === 'ps') {
      badgeText = `نن (${slotName}) کې پخ شوی و`;
      detailSentence = `دا خواړه نن (${slotName}) وخت کې پاخه شوي دي.`;
    } else if (lang === 'ar') {
      badgeText = `تم طبخه اليوم (${slotName})`;
      detailSentence = `تم تحضير هذه الوجبة مسبقاً اليوم خلال ${slotName}.`;
    } else if (lang === 'fa') {
      badgeText = `امروز در (${slotName}) پخته شد`;
      detailSentence = `این غذا امروز در وعده (${slotName}) پخته شده است.`;
    } else if (lang === 'es') {
      badgeText = `Cocinado hoy (${slotName})`;
      detailSentence = `Este plato se preparó hoy durante el ${slotName}.`;
    } else {
      badgeText = `آج (${slotName}) میں پکا تھا`;
      detailSentence = `یہ کھانا آج (${slotName}) کو پکایا جا چکا ہے۔`;
    }
  } else if (diffDays === 1) {
    if (lang === 'en') {
      badgeText = `Cooked Yesterday (${slotName})`;
      detailSentence = `This dish was cooked yesterday during ${slotName} (1 day ago).`;
    } else if (lang === 'pa') {
      badgeText = `کل (${slotName}) وچ پکیا سی (1 دن پہلاں)`;
      detailSentence = `ایہ کھانا کل (${slotName}) ویلے بنایا گیا سی۔`;
    } else if (lang === 'ps') {
      badgeText = `پرون (${slotName}) کې پخ شوی و`;
      detailSentence = `دا خواړه پرون د (${slotName}) پر مهال پاخه شوي وو (1 ورځ مخکې).`;
    } else if (lang === 'ar') {
      badgeText = `طُبخ بالأمس (${slotName})`;
      detailSentence = `تم طبخ هذه الوجبة بالأمس خلال ${slotName} (منذ يوم واحد).`;
    } else if (lang === 'fa') {
      badgeText = `دیروز در (${slotName}) پخته شد`;
      detailSentence = `این غذا دیروز در وعده (${slotName}) پخته شده بود (۱ روز قبل).`;
    } else if (lang === 'es') {
      badgeText = `Cocinado ayer (${slotName})`;
      detailSentence = `Este plato se cocinó ayer durante el ${slotName} (hace 1 día).`;
    } else {
      badgeText = `کل (${slotName}) میں پکا تھا (1 دن پہلے)`;
      detailSentence = `یہ کھانا کل (${slotName}) کو بنایا گیا تھا (1 دن پہلے)۔`;
    }
  } else if (diffDays === 2) {
    if (lang === 'en') {
      badgeText = `Cooked 2 Days Ago (${slotName})`;
      detailSentence = `This dish was cooked 2 days ago during ${slotName}.`;
    } else if (lang === 'pa') {
      badgeText = `پرسوں (${slotName}) وچ پکیا سی (2 دن پہلاں)`;
      detailSentence = `ایہ کھانا پرسوں (${slotName}) ویلے بنایا گیا سی۔`;
    } else if (lang === 'ps') {
      badgeText = `وړمه ورځ (${slotName}) کې پخ شوی و`;
      detailSentence = `دا خواړه وړمه ورځ د (${slotName}) پر مهال پاخه شوي وو (2 ورځې مخکې).`;
    } else if (lang === 'ar') {
      badgeText = `طُبخ قبل يومين (${slotName})`;
      detailSentence = `تم تحضير هذا الطبق قبل يومين خلال ${slotName}.`;
    } else if (lang === 'fa') {
      badgeText = `پریروز در (${slotName}) پخته شد`;
      detailSentence = `این غذا پریروز در وعده (${slotName}) پخته شده بود (۲ روز قبل).`;
    } else if (lang === 'es') {
      badgeText = `Cocinado hace 2 días (${slotName})`;
      detailSentence = `Este plato se cocinó hace 2 días durante el ${slotName}.`;
    } else {
      badgeText = `پرسوں (${slotName}) میں پکا تھا (2 دن پہلے)`;
      detailSentence = `یہ کھانا پرسوں (${slotName}) کو بنایا گیا تھا (2 دن پہلے)۔`;
    }
  } else if (diffDays >= 3 && diffDays <= 6) {
    if (lang === 'en') {
      badgeText = `${diffDays} days ago (${dayName} ${slotName})`;
      detailSentence = `This dish was cooked ${diffDays} days ago on ${dayName} (${slotName}).`;
    } else if (lang === 'pa') {
      badgeText = `${diffDays} دن پہلاں (${dayName} نوں)`;
      detailSentence = `ایہ کھانا ${diffDays} دن پہلاں (${dayName} نوں) بنایا گیا سی۔`;
    } else if (lang === 'ps') {
      badgeText = `${diffDays} ورځې مخکې (${dayName})`;
      detailSentence = `دا خواړه ${diffDays} ورځې وړاندې په ${dayName} ورځ پاخه شوي وو.`;
    } else if (lang === 'ar') {
      badgeText = `منذ ${diffDays} أيام (${dayName} ${slotName})`;
      detailSentence = `تم تحضير هذا الطبق منذ ${diffDays} أيام يوم ${dayName} (${slotName}).`;
    } else if (lang === 'fa') {
      badgeText = `${diffDays} روز قبل (${dayName} ${slotName})`;
      detailSentence = `این غذا ${diffDays} روز قبل در روز ${dayName} (${slotName}) پخته شده بود.`;
    } else if (lang === 'es') {
      badgeText = `Hace ${diffDays} días (${dayName} ${slotName})`;
      detailSentence = `Este plato se cocinó hace ${diffDays} días el ${dayName} (${slotName}).`;
    } else {
      badgeText = `${diffDays} دن پہلے (${dayName} کی ${slotName})`;
      detailSentence = `یہ کھانا ${diffDays} دن پہلے (${dayName} کی ${slotName}) میں بنایا گیا تھا۔`;
    }
  } else if (diffDays === 7) {
    if (lang === 'en') {
      badgeText = `Last week on this day (${dayName})`;
      detailSentence = `This dish was cooked last week on this exact day (${dayName} ${slotName}).`;
    } else if (lang === 'pa') {
      badgeText = `پچھلے ہفتے اج دے دن (${dayName} نوں)`;
      detailSentence = `ایہ کھانا پچھلے ہفتے ٹھیک اج دے دن (${dayName} نوں) پکیا سی۔`;
    } else if (lang === 'ps') {
      badgeText = `تېره اونۍ همدا ورځ (${dayName})`;
      detailSentence = `دا خواړه تېره اونۍ همدا ورځ (${dayName}) پاخه شوي وو (7 ورځې مخکې).`;
    } else if (lang === 'ar') {
      badgeText = `نفس هذا اليوم الأسبوع الماضي (${dayName})`;
      detailSentence = `تم تحضير هذا الطبق الأسبوع الماضي في نفس هذا اليوم (${dayName}).`;
    } else if (lang === 'fa') {
      badgeText = `هفته گذشته در همین روز (${dayName})`;
      detailSentence = `این غذا هفته گذشته دقیقاً در همین روز (${dayName}) پخته شده بود.`;
    } else if (lang === 'es') {
      badgeText = `La semana pasada en este día (${dayName})`;
      detailSentence = `Este plato se cocinó la semana pasada en este mismo día (${dayName}).`;
    } else {
      badgeText = `پچھلے ہفتے ٹھیک آج کے دن (${dayName} کو)`;
      detailSentence = `یہ کھانا پچھلے ہفتے ٹھیک آج کے دن (${dayName} کی ${slotName}) میں بنایا گیا تھا (7 دن پہلے)۔`;
    }
  } else {
    if (lang === 'en') {
      badgeText = `Not cooked for ${diffDays} days`;
      detailSentence = `This dish hasn't been prepared in ${diffDays} days. A wonderful classic to revive today!`;
    } else if (lang === 'pa') {
      badgeText = `${diffDays} دناں توں نئیں بنیا`;
      detailSentence = `ایہ کھانا ${diffDays} دناں توں نئیں پکیا، اج پکانا ودھیا انتخاب اے۔`;
    } else if (lang === 'ps') {
      badgeText = `${diffDays} ورځې نه دی پخ شوی`;
      detailSentence = `دا خواړه ${diffDays} ورځې کیږي چې نه دی پخ شوی، نن یې پخول غوره دی!`;
    } else if (lang === 'ar') {
      badgeText = `لم يطبخ منذ ${diffDays} يوماً`;
      detailSentence = `لم يتم تحضير هذا الطبق منذ ${diffDays} يوماً، إعداده اليوم خيار ممتاز!`;
    } else if (lang === 'fa') {
      badgeText = `${diffDays} روز است پخته نشده`;
      detailSentence = `این غذا ${diffDays} روز است پخته نشده است، امروز انتخابی عالی برای احیای آن است!`;
    } else if (lang === 'es') {
      badgeText = `No cocinado en ${diffDays} días`;
      detailSentence = `Este plato no se ha preparado en ${diffDays} días. ¡Una maravillosa opción para hoy!`;
    } else {
      badgeText = `کافی عرصے سے نہیں بنا (${diffDays} دن)`;
      detailSentence = `یہ کھانا ${diffDays} دن سے نہیں بنا، کافی عرصہ ہو گیا ہے، آج بنانا بہترین انتخاب ہے!`;
    }
  }

  return {
    recipeId: recipe.id,
    found: true,
    daysAgo: diffDays,
    dateStr: latest.date || latestDateObj.toISOString().split('T')[0],
    dayName,
    slotName,
    badgeText,
    detailSentence,
    isRecent,
    isSameWeekdayLastWeek
  };
}

export interface AiMenuCombo {
  id: string;
  badgeNumber: number;
  badgeTitle: string;
  themeTitle: string;
  mainDish: Recipe;
  slot: MealSlot;
  breakfastDish: Recipe;
  lunchDish: Recipe;
  dinnerDish: Recipe;
  reason: string;
  yesterdayRelation: string;
  lastWeekRelation: string;
  healthNote: string;
  lastCookedInfo: {
    mainDishLastCooked: DishLastCookedDetail;
    breakfastLastCooked: DishLastCookedDetail;
    lunchLastCooked: DishLastCookedDetail;
    dinnerLastCooked: DishLastCookedDetail;
    lastWeekSameDayText: string;
    recentDaysSummary: string;
  };
}

const COMBOS_DATA: Record<string, Record<Language, {
  badgeTitle: string;
  themeTitle: string;
  reason: string;
  yesterdayRelation: string;
  lastWeekRelation: string;
  healthNote: string;
}>> = {
  "combo-1-sabzi": {
    ur: {
      badgeTitle: 'تجویز #1: تازہ موسمی سبزی و پھلکا روٹی',
      themeTitle: 'موسمی تازہ سبزی اور روٹی',
      reason: 'کل کے کھانے کے بعد آج تازہ سبزی معدے کو فرحت بخشے گی اور ہاضمہ متوازن رکھے گی۔',
      yesterdayRelation: 'کل گوشت یا بھاری سالن کھایا تھا، اس لیے آج ہلکی سبزی بہترین ہے۔',
      lastWeekRelation: 'پچھلے ہفتے چکن یا چاول بنے تھے، آج سبزی سے دسترخوان کو نیا ذائقہ دیں۔',
      healthNote: 'کولیسٹرول اور بلڈ پریشر کے مریضوں کیلئے کم تیل میں تیار ہونے والی ڈش۔'
    },
    en: {
      badgeTitle: 'Suggestion #1: Fresh Seasonal Greens & Roti',
      themeTitle: 'Seasonal Fresh Vegetables',
      reason: 'Fresh seasonal vegetables provide light digestion and essential nutrients after yesterday’s meal.',
      yesterdayRelation: 'Balances yesterday’s heavier meal with fiber-rich produce.',
      lastWeekRelation: 'Offers a light, refreshing departure from last week’s meat or rice.',
      healthNote: 'Low-oil preparation safe for heart and blood pressure.'
    },
    pa: {
      badgeTitle: 'تجویز #1: تازی موسمی سبزی تے پھلکا روٹی',
      themeTitle: 'موسمی تازی سبزی تے نرم پھلکا',
      reason: 'کل دے کھانیاں پچھوں اج تازی سبزی معدے نوں ٹھنڈک بخشے گی۔',
      yesterdayRelation: 'کل گوشت یا بھاری سالن کھادا سی، اج ہلکی سبزی بہترین اے۔',
      lastWeekRelation: 'پچھلے ہفتے چاول یا چکن سی، اج سبزی نال نواں سواد لوو۔',
      healthNote: 'کولیسٹرول تے بلڈ پریشر لئی گھٹ تیل چ بنی صحت بخش ڈش۔'
    },
    ps: {
      badgeTitle: 'وړاندیز #1: تازه موسمي سبزي او ډوډۍ',
      themeTitle: 'د موسم تازه سبزي او نرمه ډوډۍ',
      reason: 'د پرون تر ډوډۍ وروسته نن ورځ تازه سبزي معده ارامه ساتي.',
      yesterdayRelation: 'پرون غوښه یا درانه خواړه خوړل شوي وو، نن سبزي خورا مناسبه ده.',
      lastWeekRelation: 'تېره اونۍ چکن یا وریجې وې، نن په سبزي سره دسترخوان نوی کړئ.',
      healthNote: 'د کم تېلو پخه شوې خواړه د وینې فشار او زړه لپاره ګټور دي.'
    },
    ar: {
      badgeTitle: 'الاقتراح 1: خضار موسمية طازجة وخبز روتي',
      themeTitle: 'خضار موسمية صحية وطازجة',
      reason: 'توفر الخضار الطازجة راحة هضمية وتوازناً مثالياً بعد وجبة الأمس.',
      yesterdayRelation: 'توازن وجبة الأمس الدسمة بألياف الخضار الصحية.',
      lastWeekRelation: 'بديل خفيف ومنعش مقارنة بوجبة الأسبوع الماضي الدسمة.',
      healthNote: 'طهي قليل الزيت آمن لضغط الدم والكوليسترول.'
    },
    fa: {
      badgeTitle: 'پیشنهاد ۱: سبزیجات تازه فصلی با نان نرم',
      themeTitle: 'سبزیجات تازه و نان روغنی سبک',
      reason: 'سبزیجات تازه به هضم آسان کمک کرده و ویتامین‌های ضروری بدن را تامین می‌کند.',
      yesterdayRelation: 'غذای سنگین روز گذشته را با سبزیجات مغذی متعادل می‌کند.',
      lastWeekRelation: 'تنوعی سبک و عالی در مقایسه با برنج و گوشت هفته گذشته.',
      healthNote: 'کم‌چرب و مناسب برای بیماران قلبی و فشار خون.'
    },
    es: {
      badgeTitle: 'Sugerencia 1: Verduras Frescas de Temporada y Roti',
      themeTitle: 'Verduras Frescas de Temporada',
      reason: 'Las verduras frescas proporcionan una digestión ligera y nutrientes esenciales tras la comida de ayer.',
      yesterdayRelation: 'Equilibra la comida más pesada de ayer con fibra vegetal saludable.',
      lastWeekRelation: 'Una alternativa fresca y ligera al arroz o carne de la semana pasada.',
      healthNote: 'Preparación baja en aceite, ideal para el corazón y la presión arterial.'
    }
  },
  "combo-2-daal-chawal": {
    ur: {
      badgeTitle: 'تجویز #2: روایتی تڑکا دال و سفید چاول',
      themeTitle: 'لذیذ تڑکا دال، سفید چاول اور کچومر سلاد',
      reason: 'دال چاول ہر دلعزیز روایتی کھانا ہے جو ہلکا، پروٹین سے بھرپور اور معدے کیلئے سکون بخش ہے۔',
      yesterdayRelation: 'اگر کل روٹی سالن کھایا تھا تو آج دوپہر یا رات کو چاول کا لطف لیں۔',
      lastWeekRelation: 'پچھلے ہفتے بریانی بنی تھی، آج ہلکی پتلی دال اور ابلے چاول بنائیں۔',
      healthNote: 'پتلی مونگ مسور دال امی جان اور ابو جان کے ہاضمے کیلئے اکسیر ہے۔'
    },
    en: {
      badgeTitle: 'Suggestion #2: Traditional Tadka Daal & White Rice',
      themeTitle: 'Comforting Daal Chawal & Fresh Salad',
      reason: 'Classic comforting Daal Chawal is rich in plant protein and gentle on the stomach.',
      yesterdayRelation: 'Offers a welcome, satisfying break from everyday flatbread.',
      lastWeekRelation: 'Gentle, light alternative to heavy rice dishes from last week.',
      healthNote: 'Moong and Masoor lentils are the easiest to digest.'
    },
    pa: {
      badgeTitle: 'تجویز #2: تڑکا دال تے ابلے چاول',
      themeTitle: 'سوادی تڑکا دال تے چاول',
      reason: 'دال چاول ہر بندے دا من بھاؤندا کھانا اے، ہلکا پھلکا تے سوادی۔',
      yesterdayRelation: 'کل روٹی سالن سی، اج چاول دا سواد لوو۔',
      lastWeekRelation: 'پچھلے ہفتے بریانی سی، اج ہلکی دال چاول بہترین نیں۔',
      healthNote: 'پتلی دال ہاضمے لئی سب توں ودھیا اے۔'
    },
    ps: {
      badgeTitle: 'وړاندیز #2: دودیزه تڑکا دال او سپینې وریجې',
      themeTitle: 'خوندوره دال، وریجې او کچومبر سلاد',
      reason: 'دال او وریجې اسانه هضمېدونکي خواړه دي چې ډېر پروټین لري.',
      yesterdayRelation: 'که پرون ډوډۍ وه، نن د غرمې یا ماښام لپاره وریجې خوندورې دي.',
      lastWeekRelation: 'تېره اونۍ درنه بریاني وه، نن سپکه دال او وریجې غوره دي.',
      healthNote: 'دال د کورنۍ د مشرانو د هاضمې لپاره خورا ګټوره ده.'
    },
    ar: {
      badgeTitle: 'الاقتراح 2: عدس تادكا التقليدي مع الأرز الأبيض',
      themeTitle: 'عدس بالتادكا وأرز بسمتي أبيض وسلطة',
      reason: 'وجبة العدس مع الأرز غنية بالبروتين النباتي وخفيفة ومهدئة للمعدة.',
      yesterdayRelation: 'تغيير شهي ومريح بعد تناول الخبز في الأيام السابقة.',
      lastWeekRelation: 'خيار خفيف وصحي مقارنة بالبرياني الدسم.',
      healthNote: 'عدس المونغ والمسور سهل الهضم ومثالي للعائلة.'
    },
    fa: {
      badgeTitle: 'پیشنهاد ۲: دال عدس با تادکا و برنج کته',
      themeTitle: 'دال عدس معطر، کته سفید و سالاد شیرازی',
      reason: 'دال عدس و برنج غذایی محبوب، مقوی و بسیار ملایم برای دستگاه گوارش است.',
      yesterdayRelation: 'تنوعی جذاب برای پرهیز از نان مداوم روزهای قبل.',
      lastWeekRelation: 'جایگزینی سبک و ساده برای غذاهای چرب هفته پیش.',
      healthNote: 'عدس زرد و قرمز برای هضم آسان و تامین آهن عالی است.'
    },
    es: {
      badgeTitle: 'Sugerencia 2: Lentejas Tadka Tradicionales y Arroz Blanco',
      themeTitle: 'Delicioso Daal Chawal y Ensalada Fresca',
      reason: 'El clásico Daal Chawal es rico en proteínas vegetales y muy suave para el estómago.',
      yesterdayRelation: 'Ofrece un descanso reconfortante frente a las comidas con pan.',
      lastWeekRelation: 'Alternativa ligera a platos de arroz más densos de la semana pasada.',
      healthNote: 'Las lentejas amarillas y rojas son fáciles de digerir.'
    }
  },
  "combo-3-chicken-pulao": {
    ur: {
      badgeTitle: 'تجویز #3: دیگی چکن یخنی پلاؤ / چکن کڑاہی',
      themeTitle: 'خوشبودار چکن پلاؤ اور رائتہ',
      reason: 'ہفتے کے وسط میں پروٹین سے بھرپور ذائقہ دار کھانا جو سب کا من پسند ہے۔',
      yesterdayRelation: 'دوپہر میں سبزی رکھ کر رات کو چکن بنانا متوازن رہتا ہے۔',
      lastWeekRelation: 'پچھلے ہفتے تیز مصالحے تھے، آج ہلکا یخنی پلاؤ زیادہ پرلطف رہے گا۔',
      healthNote: 'سینے کی بوٹی استعمال کریں اور تیل کم رکھیں۔'
    },
    en: {
      badgeTitle: 'Suggestion #3: Degi Chicken Pulao or Karahi',
      themeTitle: 'Fragrant Chicken Pulao & Raita',
      reason: 'Mid-week lean protein meal that satisfies the entire family with mild aromatic spices.',
      yesterdayRelation: 'Pairs nicely after a lighter vegetable lunch.',
      lastWeekRelation: 'Gentler spice profile than last week’s heavy dishes.',
      healthNote: 'Use lean skinless chicken breast and light cooking oil.'
    },
    pa: {
      badgeTitle: 'تجویز #3: دیگی چکن یخنی پلاؤ تے کڑاہی',
      themeTitle: 'خوشبودار چکن پلاؤ تے رائتہ',
      reason: 'پروٹین نال بھریا ذائقے دار کھانا جیہڑا سب نوں پسند آوے۔',
      yesterdayRelation: 'دوپہر سبزی سی، رات چکن نال توازن رہندا اے۔',
      lastWeekRelation: 'پچھلے ہفتے تیکھے مصالحے سن، اج ہلکا یخنی پلاؤ مزہ دیوے گا۔',
      healthNote: 'چکن دا صاف گوشت تے گھٹ گھیو ورتو۔'
    },
    ps: {
      badgeTitle: 'وړاندیز #3: د چرګ یخني پلاو یا کڑاهي',
      themeTitle: 'خوشبویه د چرګ پلاو او رائته',
      reason: 'د پروټین بډایه خوندور خواړه چې ټوله کورنۍ یې خوښوي.',
      yesterdayRelation: 'د غرمې تر سبزي وروسته د ماښام لپاره چرګ متوازن انتخاب دی.',
      lastWeekRelation: 'تېره اونۍ تېز مصالحې وې، نن معتدل یخني پلاو غوره دی.',
      healthNote: 'د چرګ سپینه غوښه او کم غوړي وکاروئ.'
    },
    ar: {
      badgeTitle: 'الاقتراح 3: أرز بيلو دجاج بالمرق العطري',
      themeTitle: 'أرز بيلو الدجاج العطري مع اللبن الرائب',
      reason: 'وجبة متوازنة غنية بالبروتين ترضي أفراد العائلة بنكهات هادئة.',
      yesterdayRelation: 'تتناغم بعد وجبة غداء نباتية خفيفة.',
      lastWeekRelation: 'توابل أهدأ وألطف من أطباق الأسبوع الماضي الحارة.',
      healthNote: 'استخدم صدور الدجاج الخالية من الجلد وزيتاً خفيفاً.'
    },
    fa: {
      badgeTitle: 'پیشنهاد ۳: پلو مرغ دمی یا خوراک کڑاهی',
      themeTitle: 'پلو مرغ زعفرانی معطر با ماست خیار',
      reason: 'غذای پروتئینی لذیذ با ادویه ملایم که همه اعضای خانواده از آن لذت می‌برند.',
      yesterdayRelation: 'تعادلی عالی بعد از ناهار سبزیجات روز گذشته.',
      lastWeekRelation: 'طعم معتدل‌تر و سبکتری نسبت به ادویه‌های تند هفته پیش.',
      healthNote: 'از گوشت سینه مرغ کم‌چرب با روغن کم استفاده کنید.'
    },
    es: {
      badgeTitle: 'Sugerencia 3: Pulao de Pollo al Caldo o Karahi',
      themeTitle: 'Pulao de Pollo Aromático con Salsa Raita',
      reason: 'Comida rica en proteínas que satisface a toda la familia con especias suaves.',
      yesterdayRelation: 'Combina perfectamente tras un almuerzo ligero de verduras.',
      lastWeekRelation: 'Perfil de especias más suave que los platos fuertes de la semana pasada.',
      healthNote: 'Utilice pechuga de pollo magra y poco aceite.'
    }
  },
  "combo-4-long-time": {
    ur: {
      badgeTitle: 'تجویز #4: کافی عرصے سے نہ بننے والا روایتی سالن',
      themeTitle: 'سرسوں کا ساگ / دال ماش / کریلے پیاز',
      reason: 'روزمرہ کے معمول سے ہٹ کر روایتی دیسی پکوان جو کافی دن سے نہیں پکا۔',
      yesterdayRelation: 'معمول کے کھانوں کو توڑ کر دسترخوان میں نیا پن لاتا ہے۔',
      lastWeekRelation: 'پچھلے پورے ہفتے میں یہ ڈش نہیں بنی، اس لیے آج بہترین موقع ہے۔',
      healthNote: 'ساگ اور کریلے شوگر اور خون صاف کرنے کیلئے انتہائی مفید ہیں۔'
    },
    en: {
      badgeTitle: 'Suggestion #4: Long-Time Not Cooked Traditional Specialty',
      themeTitle: 'Heritage Special (Saag / Daal Mash / Karelay)',
      reason: 'Revives culinary variety with an authentic classic not made recently.',
      yesterdayRelation: 'Breaks everyday cooking repetition with heritage flavors.',
      lastWeekRelation: 'Has not appeared on your family table for over a week.',
      healthNote: 'Rich in antioxidants and natural digestive benefits.'
    },
    pa: {
      badgeTitle: 'تجویز #4: چر توں نہ بنیا روایتی سالن',
      themeTitle: 'سرسوں دا ساگ / دال ماش / کریلے',
      reason: 'روز دے معمول توں ہٹ کے دیسی سالن جیہڑا کافی چِر توں نئیں پکیا۔',
      yesterdayRelation: 'روز دے کھانیاں چوں کجھ وکھرا تے سوادی۔',
      lastWeekRelation: 'پچھلے ہفتے ایہ سالن نئیں بنیا، اج پکاؤ۔',
      healthNote: 'ساگ تے کریلے شوگر تے صحت لئی بہوں چنگے نیں۔'
    },
    ps: {
      badgeTitle: 'وړاندیز #4: هغه خواړه چې ډېر وخت نه دي پاخه شوي',
      themeTitle: 'دودیز ځانګړي خواړه (ساګ / ماش دال / کریلې)',
      reason: 'د ورځني تکرار ماتول او دودیز نوي خوندونه مېز ته راوستل.',
      yesterdayRelation: 'د پرون تر معمولي خواړو وروسته ځانګړی خوندور انتخاب دی.',
      lastWeekRelation: 'په تېره اونۍ کې دا خواړه نه وو پاخه شوي، نن غوره وخت دی.',
      healthNote: 'طبیعي انټي اکسیډنټونه او د وینې د پاکوالي لپاره خورا ګټور.'
    },
    ar: {
      badgeTitle: 'الاقتراح 4: طبق تراثي لم يُطبخ منذ فترة',
      themeTitle: 'طبق تراثي خاص (أوراق الخردل / ماش / كاريلا)',
      reason: 'يكسر روتين الطبخ اليومي بوصفة أصيلة ومحبوبة غابت عن المائدة مؤخراً.',
      yesterdayRelation: 'يجدد حيوية المائدة بوجبة تراثية غنية بالنكهات.',
      lastWeekRelation: 'لم يُطبخ هذا الطبق خلال الأسبوع الماضي بأكمله.',
      healthNote: 'غني بمضادات الأكسدة ومفيد لضبط مستويات السكر.'
    },
    fa: {
      badgeTitle: 'پیشنهاد ۴: خوراک سنتی اصیل که مدتی است نپخته‌اید',
      themeTitle: 'غذای خاطره‌انگیز سنتی (ساگ / دال ماش / کارلا)',
      reason: 'تکرار غذاهای روزمره را می‌شکند و عطر و طعم اصیل به سفره می‌آورد.',
      yesterdayRelation: 'تنوعی جذاب برای پرهیز از تکرار مکررات هفتگی.',
      lastWeekRelation: 'بیش از یک هفته است که این غذا در خانه پخته نشده است.',
      healthNote: 'دارای آنتی‌اکسیدان فراوان و تنظیم‌کننده طبیعی قند خون.'
    },
    es: {
      badgeTitle: 'Sugerencia 4: Especialidad Tradicional No Preparada Recientemente',
      themeTitle: 'Plato Tradicional (Saag / Daal Mash / Karelay)',
      reason: 'Rompe la monotonía culinaria con un clásico entrañable ausente estos días.',
      yesterdayRelation: 'Aporta frescura y novedad a la mesa familiar.',
      lastWeekRelation: 'No ha aparecido en el menú en más de siete días.',
      healthNote: 'Excelente para depurar el organismo y regular el azúcar.'
    }
  }
};

export function generateAiMenuCombos(
  recipes: Recipe[],
  familyMembers: FamilyMember[],
  history: MealHistoryEntry[],
  season: Season,
  lang: Language = 'ur'
): AiMenuCombo[] {
  const now = new Date();
  const dayIndex = now.getDay();
  const currentDayShort = (WEEKDAYS_SHORT[lang] || WEEKDAYS_SHORT.ur)[dayIndex];
  const currentDayEn = WEEKDAYS_SHORT.en[dayIndex];

  // Helper to find recipe safely by ID or partial match
  const findR = (ids: string[], fallbackCategory?: string): Recipe => {
    for (const id of ids) {
      const match = recipes.find(r => r.id === id || r.id.includes(id));
      if (match) return match;
    }
    if (fallbackCategory) {
      const catMatch = recipes.find(r => r.category === fallbackCategory);
      if (catMatch) return catMatch;
    }
    return recipes[0];
  };

  const nashta1 = findR(['anda-paratha-omelette', 'anda-paratha-halffry'], 'nashta');
  const nashta2 = findR(['chai-paratha', 'naan-chanay'], 'nashta');
  const nashta3 = findR(['halwa-puri', 'anda-paratha-boiled'], 'nashta');

  const comboIds = ['combo-1-sabzi', 'combo-2-daal-chawal', 'combo-3-chicken-pulao', 'combo-4-long-time'];

  const rawCombos: Array<Omit<AiMenuCombo, 'lastCookedInfo'>> = comboIds.map((cid, idx) => {
    const meta = COMBOS_DATA[cid]?.[lang] || COMBOS_DATA[cid]?.ur || COMBOS_DATA['combo-1-sabzi'].ur;
    let mainDish = recipes[0];
    let slot: MealSlot = 'dopahar';
    let bDish = nashta1;
    let lDish = recipes[1] || recipes[0];
    let dDish = recipes[2] || recipes[0];

    if (cid === 'combo-1-sabzi') {
      mainDish = findR(['palak-aloo-roti', 'methi-aloo-roti', 'gajar-matar-aloo-roti', 'bhindi-masala-roti'], 'sabzi');
      slot = 'dopahar';
      bDish = nashta1;
      lDish = mainDish;
      dDish = findR(['white-rice-moong-masoor', 'white-rice-daal-chana'], 'daal');
    } else if (cid === 'combo-2-daal-chawal') {
      mainDish = findR(['white-rice-moong-masoor', 'white-rice-daal-chana', 'white-rice-sabut-masoor'], 'daal');
      slot = 'raat';
      bDish = nashta2;
      lDish = findR(['bhindi-masala-roti', 'gobhi-matar-aloo-roti'], 'sabzi');
      dDish = mainDish;
    } else if (cid === 'combo-3-chicken-pulao') {
      mainDish = findR(['chicken-pulao', 'chicken-biryani', 'chicken-matar-pulao'], 'rice');
      slot = 'raat';
      bDish = nashta3;
      lDish = findR(['tori-bhujia-roti', 'kaddu-lauki-roti'], 'sabzi');
      dDish = mainDish;
    } else {
      mainDish = findR(['sarson-saag-roti', 'daal-mash-fry', 'karelay-pyaz-roti'], 'sabzi');
      slot = 'dopahar';
      bDish = nashta2;
      lDish = mainDish;
      dDish = findR(['white-rice-daal-chana', 'white-rice-moong-masoor'], 'daal');
    }

    return {
      id: cid,
      badgeNumber: idx + 1,
      badgeTitle: meta.badgeTitle,
      themeTitle: meta.themeTitle,
      mainDish,
      slot,
      breakfastDish: bDish,
      lunchDish: lDish,
      dinnerDish: dDish,
      reason: meta.reason,
      yesterdayRelation: meta.yesterdayRelation,
      lastWeekRelation: meta.lastWeekRelation,
      healthNote: meta.healthNote
    };
  });

  // Calculate same day last week cooked text
  const oneDayMs = 24 * 60 * 60 * 1000;
  const lastWeekEntries = history.filter(h => {
    const diff = Math.floor((now.getTime() - h.timestamp) / oneDayMs);
    return diff >= 6 && diff <= 8 && new Date(h.timestamp).getDay() === dayIndex;
  });

  let lastWeekDishesText = '';
  if (lastWeekEntries.length > 0) {
    const names = lastWeekEntries.map(e => e.recipeName).slice(0, 2).join(', ');
    if (lang === 'en') {
      lastWeekDishesText = `Last ${currentDayEn}, your kitchen prepared "${names}".`;
    } else if (lang === 'pa') {
      lastWeekDishesText = `پچھلے ${currentDayShort} نوں تہاڈے کچن چ "${names}" بنیا سی۔`;
    } else if (lang === 'ps') {
      lastWeekDishesText = `تېره اونۍ په ${currentDayShort} ورځ ستاسو په پخلنځي کې "${names}" پاخه شوي وو.`;
    } else if (lang === 'ar') {
      lastWeekDishesText = `في يوم ${currentDayShort} الماضي، تم تحضير "${names}".`;
    } else if (lang === 'fa') {
      lastWeekDishesText = `در ${currentDayShort} گذشته، در آشپزخانه شما "${names}" پخته شد.`;
    } else if (lang === 'es') {
      lastWeekDishesText = `El ${currentDayShort} pasado, su cocina preparó "${names}".`;
    } else {
      lastWeekDishesText = `پچھلے ${currentDayShort} کو آپ کے کچن میں "${names}" بنا تھا۔`;
    }
  } else {
    if (lang === 'en') {
      lastWeekDishesText = `On past ${currentDayEn}, light comforting meals were logged.`;
    } else if (lang === 'pa') {
      lastWeekDishesText = `پچھلے ${currentDayShort} نوں ہلکا پھلکا کھانا پکیا سی۔`;
    } else if (lang === 'ps') {
      lastWeekDishesText = `په تېره ${currentDayShort} ورځ سپک او مناسب خواړه پاخه شوي وو.`;
    } else if (lang === 'ar') {
      lastWeekDishesText = `في يوم ${currentDayShort} الماضي تم تسجيل وجبة خفيفة ومريحة.`;
    } else if (lang === 'fa') {
      lastWeekDishesText = `در ${currentDayShort} گذشته وعده سبک و متعادلی ثبت شده بود.`;
    } else if (lang === 'es') {
      lastWeekDishesText = `El ${currentDayShort} pasado se registraron comidas ligeras.`;
    } else {
      lastWeekDishesText = `پچھلے ${currentDayShort} کو ہلکی روایتی غذا بنی تھی۔`;
    }
  }

  // Calculate yesterday & day before summary
  const yesterdayEntries = history.filter(h => Math.floor((now.getTime() - h.timestamp) / oneDayMs) === 1);
  const dayBeforeEntries = history.filter(h => Math.floor((now.getTime() - h.timestamp) / oneDayMs) === 2);

  const yStr = yesterdayEntries.map(e => e.recipeName).slice(0, 1).join('');
  const dbStr = dayBeforeEntries.map(e => e.recipeName).slice(0, 1).join('');

  let recentDaysSummary = '';
  if (lang === 'en') {
    recentDaysSummary = `${yStr ? `Yesterday: ${yStr}` : ''}${yStr && dbStr ? ' • ' : ''}${dbStr ? `2 Days Ago: ${dbStr}` : ''}`;
  } else if (lang === 'pa') {
    recentDaysSummary = `${yStr ? `کل: ${yStr}` : ''}${yStr && dbStr ? ' • ' : ''}${dbStr ? `پرسوں: ${dbStr}` : ''}`;
  } else if (lang === 'ps') {
    recentDaysSummary = `${yStr ? `پرون: ${yStr}` : ''}${yStr && dbStr ? ' • ' : ''}${dbStr ? `وړمه ورځ: ${dbStr}` : ''}`;
  } else if (lang === 'ar') {
    recentDaysSummary = `${yStr ? `أمس: ${yStr}` : ''}${yStr && dbStr ? ' • ' : ''}${dbStr ? `قبل أمس: ${dbStr}` : ''}`;
  } else if (lang === 'fa') {
    recentDaysSummary = `${yStr ? `دیروز: ${yStr}` : ''}${yStr && dbStr ? ' • ' : ''}${dbStr ? `پریروز: ${dbStr}` : ''}`;
  } else if (lang === 'es') {
    recentDaysSummary = `${yStr ? `Ayer: ${yStr}` : ''}${yStr && dbStr ? ' • ' : ''}${dbStr ? `Anteayer: ${dbStr}` : ''}`;
  } else {
    recentDaysSummary = `${yStr ? `کل: ${yStr}` : ''}${yStr && dbStr ? ' • ' : ''}${dbStr ? `پرسوں: ${dbStr}` : ''}`;
  }

  return rawCombos.map(combo => ({
    ...combo,
    lastCookedInfo: {
      mainDishLastCooked: findDishLastCooked(combo.mainDish, history, lang),
      breakfastLastCooked: findDishLastCooked(combo.breakfastDish, history, lang),
      lunchLastCooked: findDishLastCooked(combo.lunchDish, history, lang),
      dinnerLastCooked: findDishLastCooked(combo.dinnerDish, history, lang),
      lastWeekSameDayText: lastWeekDishesText,
      recentDaysSummary
    }
  }));
}
