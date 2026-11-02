import fs from 'fs';
import path from 'path';

// Load existing recipes
const recipesFile = path.join(process.cwd(), 'src/data/recipes.ts');
const rawContent = fs.readFileSync(recipesFile, 'utf-8');

// Extract current recipes
const parsedRecipes = JSON.parse(
  rawContent
    .replace(/^import[^{]*\{[^}]*\}[^;]*;/, '')
    .replace(/export const initialRecipes:\s*Recipe\[\]\s*=\s*/, '')
    .replace(/;\s*$/, '')
);

// 1. Keep ALL 9 Breakfast recipes untouched
const nashtaRecipes = parsedRecipes.filter((r: any) => r.category === 'nashta');

// 2. Keep ALL 5 Dinner recipes untouched
const dinnerRecipes = parsedRecipes.filter((r: any) => r.category !== 'nashta' && r.category !== 'sabzi');

// 3. Brand NEW 100% Seasonal Lunch Sabzi Menu with Roti (Winter vs Summer vs All Season)
const newLunchSabziRecipes = [
  // --- WINTER SABZI (موسم سرما کی سبزیاں جو گرمی میں نہیں ملتیں) ---
  {
    id: 'winter-aloo-gobhi',
    name: 'Winter Aloo Gobhi Matar & Hot Roti',
    nativeName: 'موسم سرما کی آلو گوبھی مٹر اور گرما گرم روٹی',
    category: 'sabzi',
    season: 'winter',
    seasonalNotes: 'سردیوں کی خاص سبزی: تازہ میٹھی پھول گوبھی، نئے آلو اور مٹر، ادرک و قصوری میتھی اور گرما گرم روٹی (گرمیوں میں دستیاب نہیں ہوتی)',
    prepTimeMins: 15,
    cookTimeMins: 25,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'لوہے کی کڑاہی (Iron Karahi)',
      type: 'karahi',
      reason: 'کڑاہی میں گوبھی تیز آنچ پر بغیر پانی کے بھاپ میں گلتی ہے، جس سے گوبھی کا پھول گھلتا نہیں اور کھڑا رہتا ہے۔',
      healthBenefit: 'پھول گوبھی میں کینسر سے بچاؤ کے اینٹی آکسیڈنٹس اور وٹامن سی کی بھرپور مقدار ہوتی ہے۔'
    },
    nutrition: {
      calories: 220,
      proteinG: 6,
      carbsG: 28,
      fatG: 10,
      fiberG: 7,
      sodiumMg: 310,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Winter Fresh Cauliflower (Gobhi)', nameUrdu: 'سردیوں کی تازہ پھول گوبھی', quantity: '1 medium (700g)', category: 'produce', approxPkr: 80 },
      { name: 'New Winter Potatoes (Aloo)', nameUrdu: 'نئے موسم کے آلو', quantity: '300g', category: 'produce', approxPkr: 40 },
      { name: 'Fresh Green Peas (Matar)', nameUrdu: 'تازہ مٹر کے دانے', quantity: '200g', category: 'produce', approxPkr: 50 },
      { name: 'Onions, Tomatoes & Ginger', nameUrdu: 'پیاز، ٹماٹر اور باریک ادرک', quantity: '2 pcs each & 2 tbsp', category: 'produce', approxPkr: 50 },
      { name: 'Ajwain, Zeera, Haldi & Methi', nameUrdu: 'اجوائن، زیرہ، ہلدی، قصوری میتھی', quantity: '1.5 tbsp', category: 'spices', approxPkr: 25 },
      { name: 'Cooking Oil / Ghee', nameUrdu: 'کوکنگ آئل یا گھی', quantity: '1/3 cup', category: 'pantry', approxPkr: 55 }
    ],
    instructions: [
      'کڑاہی میں تیل گرم کر کے زیرہ اور اجوائن کڑکڑائیں (اجوائن گوبھی کا بادی پن ختم کرتی ہے)۔',
      'پیاز، ادرک لہسن اور ٹماٹر ڈال کر مصالحہ اچھی طرح بھونیں۔',
      'آلو اور مٹر ڈال کر 3 منٹ بھونیں، پھر گوبھی کے پھول شامل کر کے مکس کریں۔',
      'پانی نہ ڈالیں، ڈھکن ڈھانپ کر ہلکی آنچ پر 12 منٹ دم دیں تاکہ سبزی اپنے ہی رس میں گل جائے۔',
      'قصوری میتھی، ادرک کے لچھے اور ہرا دھنیا چھڑک کر گرم پھلکا روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'فائبر زیادہ ہے، آلو کم اور گوبھی زیادہ کھائیں۔' },
      hypertension: { status: 'safe', tip: 'اجوائن اور زیرہ بلڈ پریشر اور اپھارے کو کنٹرول کرتے ہیں۔' },
      uric_acid: { status: 'caution', tip: 'گوبھی میں پیورینز ہوتے ہیں، اعتدال میں کھائیں۔' },
      cholesterol_heart: { status: 'safe', tip: 'خالص نباتاتی سبزی ہے، دل کیلئے بہترین ہے۔' }
    },
    proTip: 'گوبھی میں پانی کبھی نہ ڈالیں، صرف ہلکی آنچ کے دم میں پکائیں تو گوبھی کا پھول حلوہ نہیں بنے گا۔',
    estimatedCostPkr: 250,
    tags: ['lunch', 'sabzi', 'winter', 'gobhi', 'roti'],
    imageEmoji: '🥦'
  },
  {
    id: 'winter-shaljam-bhujia',
    name: 'Winter Shaljam Bhujia & Hot Roti',
    nativeName: 'موسم سرما کی روایتی شلجم کی بھجیا اور روٹی',
    category: 'sabzi',
    season: 'winter',
    seasonalNotes: 'سردیوں کے جامنی شلجم، دیسی گھی اور ہلکے گڑ کا روایتی تڑکا اور تازی روٹی (گرمی کے موسم میں نہیں آتی)',
    prepTimeMins: 15,
    cookTimeMins: 20,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'دیسی ہانڈی یا دیگچی',
      type: 'handi',
      reason: 'شلجم کو ہانڈی میں گھوٹا لگانے سے وہ مکھن کی طرح ملائم بنتے ہیں۔',
      healthBenefit: 'شلجم میں پوٹاشیم اور فائبر وافر ہوتا ہے جو بلڈ پریشر کم اور گردوں کو صاف کرتا ہے۔'
    },
    nutrition: {
      calories: 160,
      proteinG: 3,
      carbsG: 19,
      fatG: 8,
      fiberG: 5,
      sodiumMg: 210,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Winter Turnips (Shaljam)', nameUrdu: 'سردیوں کے تازہ شلجم', quantity: '1 kg', category: 'produce', approxPkr: 60 },
      { name: 'Onions & Tomatoes', nameUrdu: 'پیاز اور ٹماٹر', quantity: '2 medium each', category: 'produce', approxPkr: 40 },
      { name: 'Desi Gur (Jaggery) / Sugar', nameUrdu: 'دیسی گڑ کا چھوٹا ٹکڑا یا شکر', quantity: '1 tbsp', category: 'pantry', approxPkr: 15 },
      { name: 'Green Chillies, Ginger & Coriander', nameUrdu: 'سبز مرچیں، ادرک اور ہرا دھنیا', quantity: '3 pcs & leaves', category: 'produce', approxPkr: 20 },
      { name: 'Desi Ghee / Oil', nameUrdu: 'دیسی گھی یا کوکنگ آئل', quantity: '1/4 cup', category: 'pantry', approxPkr: 50 },
      { name: 'Haldi, Zeera, Mirch & Salt', nameUrdu: 'ہلدی، زیرہ، لال مرچ، نمک', quantity: '1 tbsp', category: 'spices', approxPkr: 15 }
    ],
    instructions: [
      'شلجم کا موٹا چھلکا اتار کر ٹکڑوں میں کاٹ لیں تاکہ کسی قسم کی کڑواہٹ نہ رہے۔',
      'پتیلی میں شلجم کو آدھا گلاس پانی کے ساتھ 10 منٹ ابال کر نرم کریں اور ڈوئی سے میش کریں۔',
      'الگ کڑاہی میں گھی گرم کریں، پیاز، ادرک لہسن اور ٹماٹر بھونیں، پھر شلجم شامل کریں۔',
      'ایک چھوٹا ٹکڑا گڑ ڈالیں اور تیز آنچ پر بھونیں جب تک گھی اوپر نہ آ جائے۔',
      'گرم پھلکا روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'شوگر کے مریض گڑ کے بغیر نمکین شلجم بنائیں، کاربوہائیڈریٹ بہت کم ہے۔' },
      hypertension: { status: 'safe', tip: 'پوٹاشیم سے بھرپور سبزی بلڈ پریشر کے مریضوں کیلئے مفید ہے۔' },
      uric_acid: { status: 'safe', tip: 'شلجم پیشاب آور ہے اور یورک ایسڈ خارج کرتا ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'زیرو کولیسٹرول اور کم کیلوریز والا کھانا۔' }
    },
    proTip: 'شلجم کا چھلکا ہمیشہ موٹا اتاریں اور ذرا سا گڑ ڈالیں، ذائقہ لاجواب بنے گا۔',
    estimatedCostPkr: 200,
    tags: ['lunch', 'sabzi', 'winter', 'shaljam', 'roti'],
    imageEmoji: '🥔'
  },
  {
    id: 'winter-sarson-saag',
    name: 'Winter Sarson Ka Saag, Makhan & Roti',
    nativeName: 'پنجابی سرسوں کا ساگ، مکھن اور مکئی/گندم کی روٹی',
    category: 'sabzi',
    season: 'winter',
    seasonalNotes: 'سردیوں کا شاہی کھانا: مٹی کی ہانڈی میں پکا سرسوں کا ساگ، دیسی سفید مکھن اور گرما گرم روٹی (صرف سردیوں میں آتا ہے)',
    prepTimeMins: 30,
    cookTimeMins: 60,
    servings: 5,
    difficulty: 'medium',
    utensil: {
      name: 'مٹی کی ہانڈی اور مدھانی/گھوٹنا',
      type: 'handi',
      reason: 'ہانڈی میں دھیمی آنچ پر ساگ گھوٹنے سے ملائی کی طرح مکھن بن جاتا ہے۔',
      healthBenefit: 'سرسوں کے ساگ میں اینٹی آکسیڈنٹس، آئرن اور کیلشیم کا خزانہ ہوتا ہے۔'
    },
    nutrition: {
      calories: 310,
      proteinG: 9,
      carbsG: 28,
      fatG: 18,
      fiberG: 9,
      sodiumMg: 380,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Sarson (Mustard Leaves)', nameUrdu: 'تازہ سرسوں کی گندلیں', quantity: '1 kg', category: 'produce', approxPkr: 60 },
      { name: 'Fresh Palak & Bathu', nameUrdu: 'پالک اور بتھوا', quantity: '1/2 kg & 250g', category: 'produce', approxPkr: 50 },
      { name: 'Makai ka Atta (for Aalun)', nameUrdu: 'مکئی کا آٹا (آلن کیلئے)', quantity: '3 tbsp', category: 'pantry', approxPkr: 20 },
      { name: 'Garlic, Ginger & Green Chillies', nameUrdu: 'دیسی لہسن، ادرک اور تیز ہری مرچیں', quantity: '3 tbsp', category: 'produce', approxPkr: 40 },
      { name: 'Desi Makhan / White Butter', nameUrdu: 'خالص سفید مکھن', quantity: '100g', category: 'dairy', approxPkr: 110 }
    ],
    instructions: [
      'سرسوں، پالک اور بتھوے کو دھو کر باریک کاٹیں اور ہانڈی میں لہسن ادرک مرچ کے ساتھ 45 منٹ گلائیں۔',
      'مدھانی سے گھوٹا لگائیں اور مکئی کا آٹا ڈالتے جائیں تاکہ ملائم ہو جائے۔',
      'الگ پین میں گھی، لہسن اور ثابت مرچ کا کڑک تڑکا لگائیں۔',
      'اوپر سفید مکھن رکھ کر گرم مکئی یا گندم کی روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'فائبر اور وٹامنز کا پاور ہاؤس ہے، روٹی کے ساتھ لیں۔' },
      hypertension: { status: 'safe', tip: 'پوٹاشیم اور میگنیشیم بلڈ پریشر کو قابو میں رکھتے ہیں۔' },
      uric_acid: { status: 'caution', tip: 'پالک اور سرسوں میں پیورینز ہوتے ہیں، اعتدال میں کھائیں۔' },
      cholesterol_heart: { status: 'safe', tip: 'مکھن کے بغیر زیتون یا سرسوں کے تیل میں بنائیں تو دل کیلئے شاندار ہے۔' }
    },
    proTip: 'ساگ گھوٹتے وقت مکئی کے آٹے کا استعمال اس کی لیس اور نرمی کو مکھن جیسا بنا دیتا ہے۔',
    estimatedCostPkr: 280,
    tags: ['lunch', 'sabzi', 'winter', 'sarson-saag', 'punjabi', 'roti'],
    imageEmoji: '🥬'
  },
  {
    id: 'winter-gajar-matar',
    name: 'Winter Gajar Matar Aloo Mix Sabzi & Roti',
    nativeName: 'موسم سرما کی گاجر مٹر آلو مکس سبزی اور روٹی',
    category: 'sabzi',
    season: 'winter',
    seasonalNotes: 'سردیوں کی لال میٹھی گاجر، مٹر کے دانے اور آلو کی خوشبودار مکس سبزی اور پھلکا روٹی (گرمیوں میں یہ گاجر مٹر نہیں ملتے)',
    prepTimeMins: 20,
    cookTimeMins: 25,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'سٹین لیس سٹیل یا مٹی کی ہانڈی',
      type: 'handi',
      reason: 'ہانڈی میں ہلکی آنچ پر گاجر اور مٹر کا قدرتی رس محفوظ رہتا ہے اور رنگت خراب نہیں ہوتی۔',
      healthBenefit: 'گاجر میں بیٹا کیروٹین اور مٹر میں نباتاتی پروٹین ہے جو سردیوں میں قوت مدافعت بڑھاتی ہے۔'
    },
    nutrition: {
      calories: 240,
      proteinG: 6,
      carbsG: 34,
      fatG: 9,
      fiberG: 8,
      sodiumMg: 290,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Sweet Red Winter Carrots (Gajar)', nameUrdu: 'سردیوں کی سرخ گاجر کیوبز', quantity: '400g', category: 'produce', approxPkr: 40 },
      { name: 'Fresh Green Peas (Matar)', nameUrdu: 'تازہ مٹر کے دانے', quantity: '300g', category: 'produce', approxPkr: 60 },
      { name: 'Potatoes (Aloo)', nameUrdu: 'نئے آلو کیوبز', quantity: '300g', category: 'produce', approxPkr: 40 },
      { name: 'Onions, Tomatoes & Ginger', nameUrdu: 'پیاز، ٹماٹر اور ادرک', quantity: '2 pcs each', category: 'produce', approxPkr: 45 },
      { name: 'Zeera, Kasuri Methi & Ghee', nameUrdu: 'زیرہ، ہلدی، قصوری میتھی، گھی', quantity: 'spices & 3 tbsp', category: 'spices', approxPkr: 55 }
    ],
    instructions: [
      'ہانڈی میں گھی میں زیرہ کڑکڑائیں اور پیاز سنہری کریں۔',
      'ادرک لہسن اور ٹماٹر ڈال کر مصالحہ بھونیں۔',
      'آلو اور مٹر ڈال کر 3 منٹ بھونیں، پھر گاجر شامل کریں۔',
      'آدھا کپ پانی ڈال کر 12 منٹ دم پر گلائیں۔',
      'قصوری میتھی چھڑک کر گرم گرم پھلکا روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'فائبر وافر ہے، آلو کم کھائیں اور سبزی زیادہ لیں۔' },
      hypertension: { status: 'safe', tip: 'پوٹاشیم اور فائبر سے بھرپور کم نمک والا سالن ہے۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریض بغیر کسی خوف کے کھا سکتے ہیں۔' },
      cholesterol_heart: { status: 'safe', tip: 'دل اور شریانوں کیلئے مثالی مکس سبزی ہے۔' }
    },
    proTip: 'گاجر کو آلو اور مٹر کے بعد ڈالیں تاکہ وہ زیادہ نہ گھلے اور کھڑی رہے۔',
    estimatedCostPkr: 240,
    tags: ['lunch', 'sabzi', 'winter', 'mix-sabzi', 'gajar-matar', 'roti'],
    imageEmoji: '🥕'
  },
  {
    id: 'winter-palak-aloo',
    name: 'Winter Desi Palak Aloo Bhujia & Roti',
    nativeName: 'موسم سرما کی دیسی پالک آلو کی بھجیا اور روٹی',
    category: 'sabzi',
    season: 'winter',
    seasonalNotes: 'سردیوں کی تازی کٹی دیسی پالک اور آلو کا آئرن سے بھرپور لذیذ سالن اور گرما گرم روٹی',
    prepTimeMins: 15,
    cookTimeMins: 25,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'لوہے کی کڑاہی یا ہانڈی',
      type: 'karahi',
      reason: 'لوہے کے برتن میں پالک پکانے سے قدرتی آئرن جذب کرنے کی صلاحیت بڑھ جاتی ہے۔',
      healthBenefit: 'پالک خون کی کمی کو دور کرتی ہے اور بینائی تیز کرتی ہے۔'
    },
    nutrition: {
      calories: 230,
      proteinG: 6,
      carbsG: 26,
      fatG: 12,
      fiberG: 6,
      sodiumMg: 340,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Winter Spinach (Palak)', nameUrdu: 'سردیوں کی تازہ دیسی پالک', quantity: '1 kg', category: 'produce', approxPkr: 60 },
      { name: 'Potatoes (Aloo Diced)', nameUrdu: 'درمیانے آلو چوکور کٹے', quantity: '350g', category: 'produce', approxPkr: 40 },
      { name: 'Onions, Tomatoes & Garlic', nameUrdu: 'پیاز، ٹماٹر، لہسن اور ادرک', quantity: '2 pcs each & 2 tbsp', category: 'produce', approxPkr: 50 },
      { name: 'Kasuri Methi, Zeera & Chilli', nameUrdu: 'قصوری میتھی، زیرہ، کٹی لال مرچ', quantity: '1.5 tbsp', category: 'spices', approxPkr: 20 },
      { name: 'Mustard Oil / Desi Ghee', nameUrdu: 'سرسوں کا تیل یا دیسی گھی', quantity: '1/3 cup', category: 'pantry', approxPkr: 55 }
    ],
    instructions: [
      'پالک کو دھو کر باریک کاٹ لیں۔',
      'کڑاہی میں تیل گرم کر کے لہسن اور زیرے کا بگھار لگائیں۔',
      'پیاز، ٹماٹر، مصالحے اور آلو ڈال کر بھونیں۔',
      'پالک ڈال کر دم لگائیں؛ پالک اپنے ہی پانی میں آلوؤں کو 15 منٹ میں گلا دے گی۔',
      'پانی خشک کر کے بھونیں اور گرم روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'پالک شوگر کو قابو میں رکھتی ہے، آلو کم اور پالک زیادہ لیں۔' },
      hypertension: { status: 'safe', tip: 'پالک کا پوٹاشیم بلڈ پریشر کو معمول پر لاتا ہے۔' },
      uric_acid: { status: 'caution', tip: 'پالک میں آکسالیٹس ہوتے ہیں، اعتدال میں کھائیں۔' },
      cholesterol_heart: { status: 'safe', tip: 'شریانوں کی لچک برقرار رکھنے میں مددگار ہے۔' }
    },
    proTip: 'پالک میں کبھی پانی نہ ڈالیں، اس کا اپنا پانی ہی آلو کو گلانے کیلئے کافی ہوتا ہے۔',
    estimatedCostPkr: 225,
    tags: ['lunch', 'sabzi', 'winter', 'palak', 'roti', 'iron-rich'],
    imageEmoji: '🥬'
  },
  {
    id: 'winter-methi-aloo',
    name: 'Winter Taza Methi Aloo Bhujia & Roti',
    nativeName: 'موسم سرما کی تازہ میتھی آلو کی بھجیا اور روٹی',
    category: 'sabzi',
    season: 'winter',
    seasonalNotes: 'سردیوں کے موسم کی خوشبودار تازہ ہری میتھی، آلو اور دیسی گھی کی سوندھی بھجیا اور روٹی (صرف سردیوں میں ملتی ہے)',
    prepTimeMins: 15,
    cookTimeMins: 20,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'لوہے کی کڑاہی',
      type: 'karahi',
      reason: 'کڑاہی میں تازہ میتھی تیز آنچ پر جلدی بھنتی ہے اور اس کی سوندھی خوشبو سلامت رہتی ہے۔',
      healthBenefit: 'تازہ ہری میتھی شوگر کو قدرتی طور پر کنٹرول کرتی ہے اور پیٹ کے کیڑے اور گیس ختم کرتی ہے۔'
    },
    nutrition: {
      calories: 220,
      proteinG: 5,
      carbsG: 27,
      fatG: 11,
      fiberG: 7,
      sodiumMg: 290,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Green Methi (Fenugreek Leaves)', nameUrdu: 'سردیوں کی تازہ ہری میتھی باریک کٹی', quantity: '500g', category: 'produce', approxPkr: 50 },
      { name: 'Potatoes (Aloo Diced)', nameUrdu: 'آلو چھوٹے ٹکڑے کٹے', quantity: '350g', category: 'produce', approxPkr: 40 },
      { name: 'Onions, Garlic & Green Chillies', nameUrdu: 'پیاز، دیسی لہسن اور تیز ہری مرچیں', quantity: '2 pcs & 2 tbsp', category: 'produce', approxPkr: 35 },
      { name: 'Zeera, Haldi & Red Chilli Flakes', nameUrdu: 'زیرہ، ہلدی، کٹی لال مرچ، نمک', quantity: '1.5 tbsp', category: 'spices', approxPkr: 20 },
      { name: 'Desi Ghee / Mustard Oil', nameUrdu: 'دیسی گھی یا سرسوں کا تیل', quantity: '1/3 cup', category: 'pantry', approxPkr: 55 }
    ],
    instructions: [
      'میتھی کو دھو کر باریک کاٹ لیں اور چٹکی نمک لگا کر 5 منٹ رکھیں پھر ہلکا نچوڑ لیں تاکہ ہلکی کڑواہٹ نکل جائے۔',
      'کڑاہی میں گھی گرم کریں، ڈھیر سارا لہسن اور زیرہ کڑکڑائیں۔',
      'پیاز اور ہری مرچیں ڈال کر ہلکا سنہری کریں، پھر آلو شامل کر کے آدھا کپ پانی میں 8 منٹ گلائیں۔',
      'میتھی شامل کر کے تیز آنچ پر 5 منٹ بھونیں جب تک گھی اوپر نہ آ جائے۔',
      'گرما گرم پھلکا روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'میتھی شوگر کے مریضوں کیلئے قدرتی انسولین جیسی دوا ہے؛ ہفتے میں ضرور کھائیں۔' },
      hypertension: { status: 'safe', tip: 'خون کو پتلا کرتی ہے اور بلڈ پریشر کو قابو میں رکھتی ہے۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریضوں کیلئے 100% محفوظ ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'کولیسٹرول اور ٹرائی گلسرائڈز کو کم کرتی ہے۔' }
    },
    proTip: 'میتھی آلو میں لہسن کا زیادہ بگھار لگائیں، اس سے میتھی کی کڑواہٹ ختم ہو کر خوشبو دار ذائقہ پیدا ہوتا ہے۔',
    estimatedCostPkr: 200,
    tags: ['lunch', 'sabzi', 'winter', 'methi', 'roti', 'diabetes-friendly'],
    imageEmoji: '🌿'
  },

  // --- SUMMER SABZI (موسم گرما کی سبزیاں جو سردی میں نہیں آتیں) ---
  {
    id: 'summer-bhindi-masala',
    name: 'Summer Crispy Bhindi Piyaz Masala & Roti',
    nativeName: 'موسم گرما کی چٹپٹی کرکری بھنڈی پیاز اور روٹی',
    category: 'sabzi',
    season: 'summer',
    seasonalNotes: 'گرمیوں کی سب سے مقبول سبزی: انار دانے اور پیاز کے ساتھ تلی ہوئی کرکری بھنڈی اور تازی روٹی (سردیوں میں دستیاب نہیں ہوتی)',
    prepTimeMins: 15,
    cookTimeMins: 20,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'لوہے کی کھلی کڑاہی',
      type: 'karahi',
      reason: 'بھنڈی کو کھلے برتن میں فرائی کرنے سے اس کی لیس فوراً ختم ہوتی ہے اور وہ ٹوٹتی نہیں ہے۔',
      healthBenefit: 'بھنڈی میں حل پذیر فائبر کی وافر مقدار ہوتی ہے جو خون میں شوگر اور کولیسٹرول کو کم کرتی ہے۔'
    },
    nutrition: {
      calories: 210,
      proteinG: 4,
      carbsG: 18,
      fatG: 14,
      fiberG: 6,
      sodiumMg: 290,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Summer Bhindi (Okra)', nameUrdu: 'گرمیوں کی تازہ چھوٹی بھنڈی', quantity: '1/2 kg', category: 'produce', approxPkr: 90 },
      { name: 'Sliced Onions', nameUrdu: 'کٹے ہوئے پیاز', quantity: '3 large (300g)', category: 'produce', approxPkr: 50 },
      { name: 'Chopped Tomatoes', nameUrdu: 'سرخ ٹماٹر', quantity: '2 medium', category: 'produce', approxPkr: 40 },
      { name: 'Green Chillies & Anardana', nameUrdu: 'سبز مرچ اور کٹا انار دانہ', quantity: '4 pcs & 1 tbsp', category: 'spices', approxPkr: 25 },
      { name: 'Cooking Oil / Ghee', nameUrdu: 'کوکنگ آئل یا گھی', quantity: '1/3 cup', category: 'pantry', approxPkr: 60 }
    ],
    instructions: [
      'بھنڈی کو دھو کر خشک کریں اور ایک انچ کے ٹکڑوں میں کاٹ لیں۔',
      'کڑاہی میں تیل گرم کر کے بھنڈی کو تیز آنچ پر 5 منٹ فرائی کریں تاکہ لیس ختم ہو جائے، پھر نکال لیں۔',
      'پیاز اور ٹماٹر کا چٹپٹا اناردانہ مصالحہ تیار کریں۔',
      'فرائی بھنڈی مصالحے میں ڈال کر 5 منٹ دم دیں۔ تازہ روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'شوگر کے مریضوں کیلئے دنیا کی بہترین سبزیوں میں شمار ہوتی ہے۔' },
      hypertension: { status: 'safe', tip: 'نمک کم رکھیں تو بی پی کے مریضوں کیلئے انتہائی محفوظ ہے۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریضوں کیلئے 100% محفوظ سبزی ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'دل کی شریانوں کو صاف رکھنے میں مدد دیتی ہے۔' }
    },
    proTip: 'بھنڈی کاٹنے سے پہلے اسے دھو کر مکمل خشک کرنا ضروری ہے تاکہ لیس بالکل نہ بنے۔',
    estimatedCostPkr: 265,
    tags: ['lunch', 'sabzi', 'summer', 'bhindi', 'roti'],
    imageEmoji: '🥒'
  },
  {
    id: 'summer-tori-bhujia',
    name: 'Summer Masaledar Tori Ki Bhujia & Phulka Roti',
    nativeName: 'موسم گرما کی ہلکی پھلکی توری کی بھجیا اور پھلکا روٹی',
    category: 'sabzi',
    season: 'summer',
    seasonalNotes: 'گرمیوں کی ٹھنڈی تاثیر والی سبزی جو اپنے ہی رس میں پکتی ہے اور دوپہر کے وقت معدے پر ہلکی رہتی ہے (سردی میں نہیں آتی)',
    prepTimeMins: 15,
    cookTimeMins: 20,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'لوہے کی کڑاہی یا دیگچی',
      type: 'karahi',
      reason: 'توری بہت زیادہ پانی چھوڑتی ہے؛ کڑاہی میں تیز آنچ پر اس کا پانی جلدی خشک ہو کر رسیلا مصالحہ بنتا ہے۔',
      healthBenefit: 'توری میں 90% قدرتی پانی ہوتا ہے جو گرمیوں میں پانی کی کمی دور کرتا ہے اور جگر کو ٹھنڈک پہنچاتا ہے۔'
    },
    nutrition: {
      calories: 150,
      proteinG: 3,
      carbsG: 16,
      fatG: 9,
      fiberG: 5,
      sodiumMg: 220,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Summer Ridge Gourd (Tori)', nameUrdu: 'گرمیوں کی تازہ دیسی توری', quantity: '1 kg', category: 'produce', approxPkr: 70 },
      { name: 'Onions & Tomatoes', nameUrdu: 'پیاز اور سرخ ٹماٹر', quantity: '2 large each', category: 'produce', approxPkr: 45 },
      { name: 'Green Chillies & Fresh Coriander', nameUrdu: 'سبز مرچیں اور ہرا دھنیا', quantity: '4 pcs & leaves', category: 'produce', approxPkr: 15 },
      { name: 'Zeera, Kalonji & Red Chilli', nameUrdu: 'زیرہ، کلونجی، لال مرچ، ہلدی', quantity: '1 tbsp', category: 'spices', approxPkr: 20 },
      { name: 'Cooking Oil / Ghee', nameUrdu: 'کوکنگ آئل یا گھی', quantity: '1/4 cup', category: 'pantry', approxPkr: 50 }
    ],
    instructions: [
      'توری کا چھلکا کھرچ کر گول قتلے کاٹ لیں۔',
      'کڑاہی میں تیل گرم کر کے زیرہ اور چند دانے کلونجی کڑکڑائیں۔',
      'پیاز، ٹماٹر اور مصالحہ بھونیں، پھر توری شامل کریں۔ پانی بالکل نہ ڈالیں۔',
      'ڈھکن ڈھانپ کر 10 منٹ پکائیں، پھر تیز آنچ پر پانی خشک کر کے بھونیں۔',
      'گرم پھلکا روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'شوگر اور موٹاپے کے مریضوں کیلئے وزن کم کرنے والی مثالی سبزی ہے۔' },
      hypertension: { status: 'safe', tip: 'ٹھنڈی تاثیر اور نمکیات کے توازن سے بلڈ پریشر کو معمول پر رکھتی ہے۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریضوں کیلئے 100% محفوظ ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'زیرو کولیسٹرول اور دل کیلئے انتہائی ہلکا کھانا۔' }
    },
    proTip: 'توری میں قطرہ بھی پانی نہ ڈالیں، اس کے اپنے ہی عرق میں پکنے سے سبزی میٹھی بنتی ہے۔',
    estimatedCostPkr: 200,
    tags: ['lunch', 'sabzi', 'summer', 'tori', 'roti', 'light-meal'],
    imageEmoji: '🥒'
  },
  {
    id: 'summer-karela-pyaz',
    name: 'Summer Crispy Karela Piyaz Masala & Roti',
    nativeName: 'موسم گرما کے چٹپٹے کریلے پیاز مصالحہ اور تندوری روٹی',
    category: 'sabzi',
    season: 'summer',
    seasonalNotes: 'گرمیوں کی خاص سبزی: کیری اور پیاز کے ساتھ تلے ہوئے کرکرے کریلے جو شوگر اور گرمی کا توڑ ہیں (سردیوں میں دستیاب نہیں)',
    prepTimeMins: 25,
    cookTimeMins: 25,
    servings: 4,
    difficulty: 'medium',
    utensil: {
      name: 'لوہے کی کھلی کڑاہی',
      type: 'karahi',
      reason: 'کریلے کو تیز آنچ پر بغیر ڈھکن فرائی کرنے سے کڑواہٹ ختم ہو جاتی ہے اور وہ کرکرے بنتے ہیں۔',
      healthBenefit: 'کریلے میں قدرتی انسولین نما اجزا ہوتے ہیں جو خون میں گلوکوز کم کرتے ہیں۔'
    },
    nutrition: {
      calories: 220,
      proteinG: 4,
      carbsG: 22,
      fatG: 14,
      fiberG: 6,
      sodiumMg: 280,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Summer Bitter Gourd (Karela)', nameUrdu: 'گرمیوں کے تازہ کریلے باریک کٹے', quantity: '1/2 kg', category: 'produce', approxPkr: 80 },
      { name: 'Sliced Onions (Lots)', nameUrdu: 'پیاز (زیادہ مقدار میں)', quantity: '4 large (400g)', category: 'produce', approxPkr: 60 },
      { name: 'Chopped Tomatoes & Green Chillies', nameUrdu: 'ٹماٹر اور ہری مرچیں', quantity: '3 pcs each', category: 'produce', approxPkr: 50 },
      { name: 'Anardana & Amchur Powder', nameUrdu: 'انار دانہ اور آمچور پاؤڈر', quantity: '1.5 tbsp', category: 'spices', approxPkr: 30 },
      { name: 'Cooking Oil', nameUrdu: 'کوکنگ آئل', quantity: '1/3 cup', category: 'pantry', approxPkr: 60 }
    ],
    instructions: [
      'کریلوں کو قتلے کاٹ کر نمک لگا کر 20 منٹ رکھیں پھر نچوڑ کر دھو لیں۔',
      'کڑاہی میں تیل گرم کر کے کریلوں کو سنہری کرکرا فرائی کر کے نکالیں۔',
      'اسی تیل میں ڈھیر سارا پیاز سنہری کریں اور ٹماٹر اناردانہ مصالحہ بنائیں۔',
      'فرائی کریلے شامل کر کے 5 منٹ دم دیں۔ گرم تندوری روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'شوگر کے مریضوں کیلئے نمبر ون قدرتی سبزی ہے، گرمیوں میں ضرور کھائیں۔' },
      hypertension: { status: 'safe', tip: 'خون کو صاف کرتا ہے اور بلڈ پریشر کو قابو میں رکھتا ہے۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریضوں کیلئے 100% محفوظ ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'ایل ڈی ایل کولیسٹرول کو گھٹانے میں معاون ہے۔' }
    },
    proTip: 'کریلے میں پیاز کی مقدار برابر رکھنے سے کڑواہٹ محسوس ہی نہیں ہوتی۔',
    estimatedCostPkr: 280,
    tags: ['lunch', 'sabzi', 'summer', 'karela', 'roti', 'diabetes-friendly'],
    imageEmoji: '🥒'
  },
  {
    id: 'summer-lauki-kaddu',
    name: 'Summer Cooling Lauki / Kaddu Bhujia & Roti',
    nativeName: 'موسم گرما کی ٹھنڈی لوکی / کدو کی بھجیا اور روٹی',
    category: 'sabzi',
    season: 'summer',
    seasonalNotes: 'موسم گرما کا قدرتی کولنٹ: زیرے کے بگھار والی رسیلی لوکی کی سبزی اور گرما گرم روٹی (گرمیوں کا ہلکا کھانا)',
    prepTimeMins: 15,
    cookTimeMins: 20,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'مٹی کی ہانڈی یا دیگچی',
      type: 'handi',
      reason: 'ہانڈی میں لوکی دھیمی آنچ پر نرم ملائم گلتی ہے اور میٹھا ذائقہ برقرار رہتا ہے۔',
      healthBenefit: 'لوکی میں ٹھنڈک بخش اجزا اور 92% پانی ہوتا ہے جو گرمی کے لو سے بچاتا ہے اور بلڈ پریشر کم کرتا ہے۔'
    },
    nutrition: {
      calories: 140,
      proteinG: 3,
      carbsG: 15,
      fatG: 8,
      fiberG: 5,
      sodiumMg: 190,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Summer Bottle Gourd (Lauki/Kaddu)', nameUrdu: 'گرمیوں کی تازہ دیسی لوکی / کدو', quantity: '1 kg', category: 'produce', approxPkr: 60 },
      { name: 'Onions, Tomatoes & Green Chillies', nameUrdu: 'پیاز، ٹماٹر اور ہری مرچیں', quantity: '2 pcs each & 3 chillies', category: 'produce', approxPkr: 40 },
      { name: 'Zeera, Kalonji & Haldi', nameUrdu: 'سفید زیرہ، کلونجی، ہلدی، لال مرچ', quantity: '1 tbsp', category: 'spices', approxPkr: 20 },
      { name: 'Cooking Oil / Desi Ghee', nameUrdu: 'کوکنگ آئل یا دیسی گھی', quantity: '1/4 cup', category: 'pantry', approxPkr: 50 },
      { name: 'Fresh Coriander & Lemon', nameUrdu: 'ہرا دھنیا اور تازہ لیموں', quantity: 'for garnishing', category: 'produce', approxPkr: 15 }
    ],
    instructions: [
      'لوکی کا چھلکا اتار کر چھوٹے کیوبز میں کاٹ لیں۔',
      'ہانڈی میں تیل گرم کر کے زیرہ اور چند دانے کلونجی کڑکڑائیں۔',
      'پیاز، ٹماٹر اور ادرک لہسن بھونیں، پھر کٹی ہوئی لوکی شامل کریں۔',
      'ڈھکن ڈھانپ کر ہلکی آنچ پر 15 منٹ پکائیں جب تک لوکی مکھن کی طرح گل نہ جائے۔',
      'ہرا دھنیا اور لیموں کا رس نچوڑ کر گرم پھلکا روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'شوگر اور دل کے مریضوں کیلئے سنت نبوی ﷺ کی پسندیدہ سبزی ہے۔' },
      hypertension: { status: 'safe', tip: 'پوٹاشیم سے بھرپور سبزی بلڈ پریشر کو فوری نارمل کرتی ہے۔' },
      uric_acid: { status: 'safe', tip: 'پیشاب آور ہے اور یورک ایسڈ کو جسم سے نکالتی ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'کولیسٹرول سے بالکل پاک دل کیلئے شفاء بخش کھانا۔' }
    },
    proTip: 'لوکی کو ہمیشہ تازہ اور کچا خریدیں جس میں بیج نہ ہوں، اس سے سبزی انتہائی نرم اور میٹھی بنتی ہے۔',
    estimatedCostPkr: 185,
    tags: ['lunch', 'sabzi', 'summer', 'lauki', 'kaddu', 'roti', 'cooling'],
    imageEmoji: '🥒'
  },
  {
    id: 'summer-tinda-masala',
    name: 'Summer Desi Tinda Masala & Hot Roti',
    nativeName: 'موسم گرما کے دیسی ٹینڈے مصالحہ اور روٹی',
    category: 'sabzi',
    season: 'summer',
    seasonalNotes: 'گرمیوں کی روایتی سبزی: پیاز ٹماٹر کی بھنی گریوی میں پکے چھوٹے گول دیسی ٹینڈے اور روٹی (گرمیوں کا کلاسک لنچ)',
    prepTimeMins: 15,
    cookTimeMins: 20,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'لوہے کی کڑاہی یا ہانڈی',
      type: 'karahi',
      reason: 'کڑاہی میں ٹینڈے مصالحے کے ساتھ اچھی طرح بھنتے ہیں اور گریوی لذیذ بنتی ہے۔',
      healthBenefit: 'ٹینڈے میں فائبر اور پانی وافر ہوتا ہے جو گرمیوں میں معدے کی تیزابیت ختم کرتا ہے۔'
    },
    nutrition: {
      calories: 170,
      proteinG: 3,
      carbsG: 18,
      fatG: 9,
      fiberG: 5,
      sodiumMg: 230,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Summer Apple Gourd (Tinda)', nameUrdu: 'گرمیوں کے تازہ چھوٹے دیسی ٹینڈے', quantity: '750g', category: 'produce', approxPkr: 70 },
      { name: 'Onions & Ripe Tomatoes', nameUrdu: 'پیاز اور سرخ ٹماٹر', quantity: '2 large each', category: 'produce', approxPkr: 45 },
      { name: 'Ginger Garlic & Green Chillies', nameUrdu: 'ادرک لہسن اور ہری مرچیں', quantity: '2 tbsp', category: 'produce', approxPkr: 25 },
      { name: 'Zeera, Kasuri Methi & Garam Masala', nameUrdu: 'زیرہ، قصوری میتھی، گرم مصالحہ', quantity: '1.5 tbsp', category: 'spices', approxPkr: 20 },
      { name: 'Cooking Oil / Ghee', nameUrdu: 'کوکنگ آئل یا گھی', quantity: '1/3 cup', category: 'pantry', approxPkr: 55 }
    ],
    instructions: [
      'ٹینڈوں کا باریک چھلکا کھرچ کر چار حصوں میں کاٹ لیں۔',
      'کڑاہی میں تیل گرم کر کے زیرہ کڑکڑائیں اور پیاز و ٹماٹر کی مصالحہ دار گریوی تیار کریں۔',
      'ٹینڈے شامل کریں، آدھا کپ پانی ڈال کر ڈھکن بند کریں اور 12 منٹ دم پر گلائیں۔',
      'تیز آنچ پر بھونیں جب تک گھی اوپر نہ آ جائے۔ قصوری میتھی چھڑک کر روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'کم کیلوریز اور کم کارب والی سبزی ہے، شوگر کیلئے محفوظ ہے۔' },
      hypertension: { status: 'safe', tip: 'کم نمک میں تیار کریں تو بلڈ پریشر کیلئے بہترین ہے۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریضوں کیلئے 100% محفوظ ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'ہلکی پھلکی اور دل کیلئے صحت بخش سبزی۔' }
    },
    proTip: 'ٹینڈے کاٹتے وقت چیک کر لیں کہ بیج پکے ہوئے نہ ہوں، چھوٹے کچے ٹینڈے جلدی اور ذائقے دار پکتے ہیں۔',
    estimatedCostPkr: 215,
    tags: ['lunch', 'sabzi', 'summer', 'tinda', 'roti'],
    imageEmoji: '🍈'
  },
  {
    id: 'summer-arvi-masala',
    name: 'Summer Chatpati Arvi Masala & Hot Roti',
    nativeName: 'موسم گرما کی چٹپٹی اروی مصالحہ اور گرما گرم روٹی',
    category: 'sabzi',
    season: 'summer',
    seasonalNotes: 'گرمیوں کی روایتی کرکری اروی، اجوائن، لیموں کا رس اور گرما گرم پھلکا روٹی (سردیوں میں دستیاب نہیں)',
    prepTimeMins: 20,
    cookTimeMins: 20,
    servings: 4,
    difficulty: 'medium',
    utensil: {
      name: 'لوہے کی کڑاہی',
      type: 'karahi',
      reason: 'کڑاہی میں اروی تیز آنچ پر فرائی ہو کر سنہری کرکری بنتی ہے اور لیس ختم ہو جاتی ہے۔',
      healthBenefit: 'اروی میں پوٹاشیم اور ڈائیٹری فائبر کی کثرت ہوتی ہے جو نظام ہاضمہ کو طاقت دیتی ہے۔'
    },
    nutrition: {
      calories: 230,
      proteinG: 4,
      carbsG: 26,
      fatG: 12,
      fiberG: 6,
      sodiumMg: 270,
      glycemicIndex: 'Medium'
    },
    ingredients: [
      { name: 'Fresh Summer Taro Root (Arvi)', nameUrdu: 'گرمیوں کی تازہ اروی', quantity: '700g', category: 'produce', approxPkr: 80 },
      { name: 'Onions, Tomatoes & Lemons', nameUrdu: 'پیاز، ٹماٹر اور لیموں', quantity: '2 pcs each & 2 lemons', category: 'produce', approxPkr: 45 },
      { name: 'Ajwain, Zeera & Anardana', nameUrdu: 'اجوائن، زیرہ، انار دانہ، کٹی لال مرچ', quantity: '2 tbsp', category: 'spices', approxPkr: 25 },
      { name: 'Cooking Oil', nameUrdu: 'کوکنگ آئل فرائنگ کیلئے', quantity: '1/3 cup', category: 'pantry', approxPkr: 60 }
    ],
    instructions: [
      'اروی چھیل کر گول قتلے کاٹیں، نمک لگا کر دھوئیں اور کپڑے سے سکھا لیں۔',
      'کڑاہی میں تیل گرم کر کے اروی کو سنہری کرکرا فرائی کر کے نکال لیں۔',
      'اسی تیل میں اجوائن کڑکڑائیں (اجوائن اروی کا بادی پن دور کرتی ہے)۔',
      'پیاز، ٹماٹر اور مصالحے بھون کر فرائی اروی شامل کریں اور 5 منٹ دم دیں۔ لیموں نچوڑ کر روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'caution', tip: 'اروی میں نشاستہ زیادہ ہوتا ہے، شوگر کے مریض اعتدال میں کھائیں۔' },
      hypertension: { status: 'safe', tip: 'اجوائن اور لیموں بلڈ پریشر اور اپھارے کو کنٹرول کرتے ہیں۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریضوں کیلئے محفوظ ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'زیرو کولیسٹرول اور سبزی کی اچھی چکنائی۔' }
    },
    proTip: 'اروی میں اجوائن اور لیموں کا رس لازمی ڈالیں، یہ اس کی لیس اور بادی پن کو مکمل ختم کر دیتا ہے۔',
    estimatedCostPkr: 210,
    tags: ['lunch', 'sabzi', 'summer', 'arvi', 'roti'],
    imageEmoji: '🥔'
  },

  // --- ALL-SEASON SABZI (سدا بہار سبزیاں جو ہر موسم میں مل جاتی ہیں) ---
  {
    id: 'allseason-aloo-baingan',
    name: 'Aloo Baingan Masala & Hot Roti',
    nativeName: 'چٹپٹے آلو بینگن کی سبزی اور گرما گرم روٹی',
    category: 'sabzi',
    season: 'all',
    seasonalNotes: 'کلونجی اور میتھی دانے کے اچاری تڑکے والے آلو بینگن اور روٹی، ہر موسم کا آسان لذیذ لنچ',
    prepTimeMins: 15,
    cookTimeMins: 20,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'لوہے کی کڑاہی یا ہانڈی',
      type: 'karahi',
      reason: 'کڑاہی میں بینگن جلدی گلتے ہیں اور مصالحہ تیز آنچ پر چٹپٹا بھنتا ہے۔',
      healthBenefit: 'بینگن میں نیسونین اینٹی آکسیڈنٹ ہوتا ہے جو دماغی خلیات کی حفاظت کرتا ہے۔'
    },
    nutrition: {
      calories: 210,
      proteinG: 4,
      carbsG: 28,
      fatG: 10,
      fiberG: 6,
      sodiumMg: 290,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Eggplants (Baingan)', nameUrdu: 'تازہ کالے بینگن', quantity: '1/2 kg', category: 'produce', approxPkr: 50 },
      { name: 'Potatoes (Aloo)', nameUrdu: 'آلو قتلے کٹے ہوئے', quantity: '350g', category: 'produce', approxPkr: 40 },
      { name: 'Onions, Tomatoes & Green Chillies', nameUrdu: 'پیاز، ٹماٹر اور ہری مرچیں', quantity: '2 pcs each', category: 'produce', approxPkr: 45 },
      { name: 'Kalonji, Methi Dana & Amchur', nameUrdu: 'کلونجی، میتھی دانہ، آمچور، لال مرچ', quantity: '1.5 tbsp', category: 'spices', approxPkr: 25 },
      { name: 'Cooking Oil / Mustard Oil', nameUrdu: 'کوکنگ آئل یا سرسوں کا تیل', quantity: '1/3 cup', category: 'pantry', approxPkr: 55 }
    ],
    instructions: [
      'بینگن اور آلو کو درمیانے ٹکڑوں میں کاٹ کر پانی میں رکھیں تاکہ بینگن کالے نہ ہوں۔',
      'کڑاہی میں تیل گرم کر کے میتھی دانہ اور کلونجی کڑکڑائیں (اچاری خوشبو کیلئے)۔',
      'پیاز، ادرک لہسن اور ٹماٹر ڈال کر مصالحہ اچھی طرح بھونیں۔',
      'آلو اور بینگن ڈال کر مکس کریں، آدھا کپ پانی ڈال کر دھیمی آنچ پر 12 منٹ دم دیں۔',
      'جب آلو گل جائیں تو تیز آنچ پر بھونیں اور گرم روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'بینگن میں کاربوہائیڈریٹ بہت کم ہوتی ہے، شوگر کیلئے محفوظ ہے۔' },
      hypertension: { status: 'safe', tip: 'پوٹاشیم سے بھرپور سبزی ہے، نمک کم رکھیں۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریضوں کیلئے 100% محفوظ ہے۔' },
      cholesterol_heart: { status: 'safe', tip: 'خون میں کولیسٹرول کو کم کرنے میں معاون ہے۔' }
    },
    proTip: 'بینگن پکاتے وقت کلونجی اور میتھی دانہ ڈالنے سے اس کا ذائقہ اچاری بن جاتا ہے۔',
    estimatedCostPkr: 215,
    tags: ['lunch', 'sabzi', 'all-season', 'aloo-baingan', 'roti'],
    imageEmoji: '🍆'
  },
  {
    id: 'allseason-aloo-shimla',
    name: 'Aloo Shimla Mirch Masala & Hot Roti',
    nativeName: 'خوشبودار آلو شملہ مرچ کی سبزی اور روٹی',
    category: 'sabzi',
    season: 'all',
    seasonalNotes: 'کرکری شملہ مرچ اور مصالحہ دار آلوؤں کی جھٹ پٹ 15 منٹ میں تیار ہونے والی سبزی اور روٹی',
    prepTimeMins: 10,
    cookTimeMins: 15,
    servings: 4,
    difficulty: 'easy',
    utensil: {
      name: 'لوہے کی کڑاہی',
      type: 'karahi',
      reason: 'کڑاہی میں تیز آنچ پر شملہ مرچ کا کرکرا پن برقرار رہتا ہے۔',
      healthBenefit: 'شملہ مرچ وٹامن سی سے بھرپور ہوتی ہے جو قوت مدافعت کو بڑھاتی ہے۔'
    },
    nutrition: {
      calories: 200,
      proteinG: 4,
      carbsG: 25,
      fatG: 10,
      fiberG: 5,
      sodiumMg: 260,
      glycemicIndex: 'Low'
    },
    ingredients: [
      { name: 'Fresh Green Capsicum (Shimla Mirch)', nameUrdu: 'تازہ ہری شملہ مرچ کٹی ہوئی', quantity: '400g', category: 'produce', approxPkr: 60 },
      { name: 'Potatoes (Diced)', nameUrdu: 'آلو کیوبز میں کٹے ہوئے', quantity: '350g', category: 'produce', approxPkr: 40 },
      { name: 'Onions & Tomatoes', nameUrdu: 'پیاز اور سرخ ٹماٹر', quantity: '2 pcs each', category: 'produce', approxPkr: 45 },
      { name: 'Zeera, Kasuri Methi & Garam Masala', nameUrdu: 'زیرہ، قصوری میتھی، گرم مصالحہ', quantity: '1 tbsp', category: 'spices', approxPkr: 20 },
      { name: 'Cooking Oil', nameUrdu: 'کوکنگ آئل', quantity: '1/4 cup', category: 'pantry', approxPkr: 50 }
    ],
    instructions: [
      'کڑاہی میں تیل گرم کر کے زیرہ کڑکڑائیں اور پیاز و ٹماٹر کا چٹپٹا مصالحہ بنائیں۔',
      'پہلے آلو شامل کریں اور تھوڑا پانی ڈال کر 8 منٹ پکائیں تاکہ آلو 90% گل جائیں۔',
      'شملہ مرچ شامل کریں اور تیز آنچ پر 3 سے 4 منٹ بھونیں۔',
      'ہلکی آنچ پر 2 منٹ دم دیں تاکہ شملہ مرچ کی خوشبو رچ بس جائے۔ گرم روٹی کے ساتھ پیش کریں۔'
    ],
    parhezAlerts: {
      diabetes: { status: 'safe', tip: 'شملہ مرچ شوگر کیلئے بہت مفید ہے، آلو کی مقدار اعتدال میں رکھیں۔' },
      hypertension: { status: 'safe', tip: 'کم نمک میں تیار کریں، دل اور بی پی دونوں کیلئے بہترین ہے۔' },
      uric_acid: { status: 'safe', tip: 'یورک ایسڈ کے مریض بغیر جھجھک کھا سکتے ہیں۔' },
      cholesterol_heart: { status: 'safe', tip: 'وٹامن سی اور اینٹی آکسیڈنٹس شریانوں کو صحت مند رکھتے ہیں۔' }
    },
    proTip: 'شملہ مرچ کو ہمیشہ آخر میں ڈال کر تیز آنچ پر بھونیں تاکہ وہ نرم نہ پڑے۔',
    estimatedCostPkr: 215,
    tags: ['lunch', 'sabzi', 'all-season', 'shimla-mirch', 'roti'],
    imageEmoji: '🫑'
  }
];

// Combine: Nashta (9) + New Seasonal Lunch Sabzi (14) + Dinner (5) = 28 Recipes
const totalUpdatedRecipes = [...nashtaRecipes, ...newLunchSabziRecipes, ...dinnerRecipes];

const updatedFileContent = `import { Recipe } from '../types';

export const initialRecipes: Recipe[] = ${JSON.stringify(totalUpdatedRecipes, null, 2)};
`;

fs.writeFileSync(recipesFile, updatedFileContent, 'utf-8');
console.log('Successfully updated lunch menu with authentic seasonal vegetables!');
console.log('Total recipes in app:', totalUpdatedRecipes.length);
console.log(' - Nashta count:', nashtaRecipes.length);
console.log(' - Lunch Sabzi count:', newLunchSabziRecipes.length);
console.log('   * Winter sabzi count:', newLunchSabziRecipes.filter(r => r.season === 'winter').length);
console.log('   * Summer sabzi count:', newLunchSabziRecipes.filter(r => r.season === 'summer').length);
console.log('   * All-season sabzi count:', newLunchSabziRecipes.filter(r => r.season === 'all').length);
console.log(' - Dinner count:', dinnerRecipes.length);
