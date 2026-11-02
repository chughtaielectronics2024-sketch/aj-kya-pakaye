import { Recipe } from '../types';

export const initialRecipes: Recipe[] = [
  {
    "id": "halwa-puri",
    "name": "Traditional Halwa Puri & Chana Tarkari",
    "nativeName": "لاہوری حلوہ پوری اور چنے کا سالن",
    "category": "nashta",
    "season": "all",
    "seasonalNotes": "پاکستان کا سب سے مشہور روایتی ناشتہ، سوجی کا حلوہ، چنے کی ترکاری اور نرم پوریاں",
    "prepTimeMins": 20,
    "cookTimeMins": 25,
    "servings": 4,
    "difficulty": "medium",
    "utensil": {
      "name": "لوہے کی کڑاہی اور پتیلی (Iron Karahi)",
      "type": "karahi",
      "reason": "تیز گرم تیل میں پوریاں فوراً پھول کر سنہری اور نرم نکلتی ہیں۔",
      "healthBenefit": "لوہے کے برتن میں پوریاں کم تیل جذب کرتی ہیں اور کرکری رہتی ہیں۔"
    },
    "nutrition": {
      "calories": 460,
      "proteinG": 12,
      "carbsG": 62,
      "fatG": 19,
      "fiberG": 7,
      "sodiumMg": 480,
      "glycemicIndex": "Medium"
    },
    "ingredients": [
      {
        "name": "White Chickpeas (Chana)",
        "nameUrdu": "سفید چنے (ابلے ہوئے)",
        "quantity": "350g",
        "category": "pantry",
        "approxPkr": 110
      },
      {
        "name": "Semolina (Sooji for Halwa)",
        "nameUrdu": "سوجی (حلوہ کیلئے)",
        "quantity": "200g",
        "category": "pantry",
        "approxPkr": 50
      },
      {
        "name": "Fine Flour (Maida for Puris)",
        "nameUrdu": "میدہ (پوریوں کیلئے)",
        "quantity": "400g",
        "category": "pantry",
        "approxPkr": 75
      },
      {
        "name": "Kalonji, Achar Masala & Zeera",
        "nameUrdu": "کلونجی، آچار مصالحہ، زیرہ",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 30
      },
      {
        "name": "Desi Ghee / Cooking Oil",
        "nameUrdu": "دیسی گھی یا کوکنگ آئل",
        "quantity": "1 cup",
        "category": "pantry",
        "approxPkr": 140
      },
      {
        "name": "Sugar & Cardamom (Ilaichi)",
        "nameUrdu": "چینی اور الائچی",
        "quantity": "150g",
        "category": "pantry",
        "approxPkr": 40
      }
    ],
    "instructions": [
      "میدے میں تھوڑا نمک اور گھی ڈال کر نیم گرم پانی سے گوندھیں اور پیڑے بنا کر 15 منٹ رکھیں۔",
      "پتیلی میں ابلے چنے، کلونجی، رائی، ہلدی اور کالی مرچ ڈال کر ہلکا میش کر کے گاڑھی ترکاری تیار کریں۔",
      "دوسرے برتن میں گھی میں سوجی سنہری بھون کر الائچی والی چاشنی ڈالیں اور دانے دار حلوہ بنائیں۔",
      "کڑاہی میں تیل فل تیز گرم کر کے بیلی ہوئی پوریاں تلیں، دونوں طرف سے ہلکی سنہری کر کے نکالیں۔",
      "گرما گرم پوریاں، چنے کی ترکاری، حلوہ اور مکس اچار کے ساتھ روایتی ناشتہ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "شوگر کے مریض حلوہ چھوڑ کر چنے کا سالن لال آٹے کی روٹی کے ساتھ لیں۔"
      },
      "hypertension": {
        "status": "caution",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ ترکاری میں مصالحے متوازن رکھیں، تلی ہوئی پوری کے بجائے ایک پوری یا روٹی لیں۔"
      },
      "uric_acid": {
        "status": "caution",
        "tip": "چنوں میں پیورینز ہوتے ہیں، ہفتے میں ایک چھوٹی پیالی چنے لیں۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ پوری کو ٹشو پیپر سے صاف کریں یا روٹی کے ساتھ چنے اور کم میٹھا حلوہ لیں۔"
      },
      "stomach_digestive": {
        "status": "avoid",
        "tip": "امی جان کیلئے: فاسٹ فوڈ اور تلی ہوئی اشیاء معدے پر بہت بھاری ہیں اور بدہضمی و تیزابیت کرتی ہیں؛ ان کے لیے ہلکا کھانا پیش کریں۔",
        "substitute": "مونگ مسور دال، گھیا کدو / لوکی سالن یا توری کی بھجیا"
      }
    },
    "proTip": "پوری خستہ رکھنے کا راز یہ ہے کہ تیل مکمل گرم ہو تاکہ پوری چند سیکنڈ میں پھول کر نکل آئے۔",
    "estimatedCostPkr": 445,
    "tags": [
      "nashta",
      "traditional",
      "halwa-puri",
      "sunday-special"
    ],
    "imageEmoji": "🫓"
  },
  {
    "id": "siri-paaye",
    "name": "Shahi Siri Paaye & Roghani Naan",
    "nativeName": "لاہوری سری پائے اور گرم نان",
    "category": "nashta",
    "season": "all",
    "seasonalNotes": "روایتی لاہوری سری پائے، گودے والا لیس دار سالن، کٹی ادرک، ہری مرچ اور تندوری نان",
    "prepTimeMins": 30,
    "cookTimeMins": 120,
    "servings": 5,
    "difficulty": "hard",
    "utensil": {
      "name": "مٹی کی ہانڈی یا پریشر ککر",
      "type": "handi",
      "reason": "دھیمی آنچ پر پکنے سے ہڈیوں کا قدرتی جیلیٹن شوربے کو لیس دار اور خوشبودار بناتا ہے۔",
      "healthBenefit": "پائے کا شوربہ قدرتی کولیجن سے بھرپور ہوتا ہے جو ہڈیوں اور جوڑوں کے درد میں مفید ہے۔"
    },
    "nutrition": {
      "calories": 520,
      "proteinG": 38,
      "carbsG": 12,
      "fatG": 34,
      "fiberG": 2,
      "sodiumMg": 520,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Mutton / Beef Paaye & Siri",
        "nameUrdu": "پائے اور مغز سری",
        "quantity": "1.2 kg",
        "category": "meat",
        "approxPkr": 950
      },
      {
        "name": "Onions, Ginger & Garlic",
        "nameUrdu": "پیاز، لہسن اور ادرک",
        "quantity": "3 large & whole",
        "category": "produce",
        "approxPkr": 70
      },
      {
        "name": "Sonth & Garam Masala",
        "nameUrdu": "سونٹھ، ثابت گرم مصالحہ، ہلدی، لال مرچ",
        "quantity": "3 tbsp",
        "category": "spices",
        "approxPkr": 50
      },
      {
        "name": "Cooking Ghee / Oil",
        "nameUrdu": "دیسی گھی یا کوکنگ آئل",
        "quantity": "1/2 cup",
        "category": "pantry",
        "approxPkr": 90
      },
      {
        "name": "Lemon, Ginger Julienne & Chillies",
        "nameUrdu": "تازہ لیموں، ادرک لچھے اور ہری مرچیں",
        "quantity": "garnishing",
        "category": "produce",
        "approxPkr": 30
      }
    ],
    "instructions": [
      "پائے کو آٹے اور گرم پانی سے اچھی طرح دھو کر صاف کریں۔",
      "دیگچی میں پائے، پیاز، ادرک لہسن، سونٹھ، ہلدی، مرچ اور 6 گلاس پانی ڈالیں۔",
      "ہلکی آنچ پر 3 سے 4 گھنٹے پکائیں جب تک گوشت ہڈی سے الگ ہونے لگے اور شوربہ لیس دار ہو جائے۔",
      "الگ پین میں گھی اور زیرے کا تڑکا لگائیں اور پائے میں شامل کریں۔",
      "ادرک، ہری مرچ، پسا گرم مصالحہ اور لیموں نچوڑ کر روغنی نان کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "کارب کم ہے، نان کے بجائے ایک گندم کی روٹی کے ساتھ لیں۔"
      },
      "hypertension": {
        "status": "caution",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ شوربے کی روغنی تری چمچ سے اتار کر صاف یخنی نما سالن لیں۔"
      },
      "uric_acid": {
        "status": "avoid",
        "tip": "پائے کے شوربے میں پیورینز زیادہ ہوتے ہیں، پرہیز کریں۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ اوپر کی تری ہٹا کر لیموں نچوڑ کر اعتدال میں کھائیں۔"
      },
      "stomach_digestive": {
        "status": "avoid",
        "tip": "امی جان کیلئے: فاسٹ فوڈ اور تلی ہوئی اشیاء معدے پر بہت بھاری ہیں اور بدہضمی و تیزابیت کرتی ہیں؛ ان کے لیے ہلکا کھانا پیش کریں۔",
        "substitute": "مونگ مسور دال، گھیا کدو / لوکی سالن یا توری کی بھجیا"
      }
    },
    "proTip": "پائے کو گوندھے آٹے سے مل کر دھونے سے بو بالکل ختم ہو جاتی ہے۔",
    "estimatedCostPkr": 1190,
    "tags": [
      "nashta",
      "siri-paaye",
      "paaye",
      "traditional",
      "lahori"
    ],
    "imageEmoji": "🍲"
  },
  {
    "id": "naan-chanay",
    "name": "Lahori Naan Chanay & Achar",
    "nativeName": "لاہوری ناشتہ نان چنے اور تندوری نان",
    "category": "nashta",
    "season": "all",
    "seasonalNotes": "لاہور اور پورے پاکستان کا مشہور ترین ناشتہ: مسور کی گریوی میں پکے لاہوری چنے، کالی مرچ، تندوری نان اور پیاز اچار",
    "prepTimeMins": 15,
    "cookTimeMins": 25,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "دیگچی یا پتیلی",
      "type": "degchi",
      "reason": "دھیمی آنچ پر ابلے چنے مسور کی دال کی گریوی کے ساتھ یکجان ہو کر ہوٹل جیسا لیس دار شوربہ بناتے ہیں۔",
      "healthBenefit": "چنے میں نباتاتی فائبر اور آئرن ہوتا ہے جو دن بھر بھوک کا احساس نہیں ہونے دیتا اور توانائی دیتا ہے۔"
    },
    "nutrition": {
      "calories": 420,
      "proteinG": 18,
      "carbsG": 65,
      "fatG": 11,
      "fiberG": 9,
      "sodiumMg": 440,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "White Chickpeas (Chana Boiled)",
        "nameUrdu": "ابلے ہوئے سفید چنے",
        "quantity": "400g",
        "category": "pantry",
        "approxPkr": 120
      },
      {
        "name": "Tandoori Roghani Naan",
        "nameUrdu": "تازہ تندوری نان یا کلچے",
        "quantity": "4 pcs",
        "category": "pantry",
        "approxPkr": 100
      },
      {
        "name": "Red Lentils (Masoor Daal for Gravy)",
        "nameUrdu": "دھلی مسور دال (گریوی گاڑھی کرنے کیلئے)",
        "quantity": "3 tbsp",
        "category": "pantry",
        "approxPkr": 25
      },
      {
        "name": "Black Pepper, Zeera, Garam Masala & Haldi",
        "nameUrdu": "کالی مرچ، زیرہ، پسا گرم مصالحہ، ہلدی",
        "quantity": "2 tbsp",
        "category": "spices",
        "approxPkr": 25
      },
      {
        "name": "Cooking Ghee / Oil for Tarka",
        "nameUrdu": "دیسی گھی یا کوکنگ آئل تڑکے کیلئے",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 60
      },
      {
        "name": "Onion Slices, Green Chillies & Achar",
        "nameUrdu": "پیاز کے لچھے، ہری مرچیں اور مکس اچار",
        "quantity": "garnishing",
        "category": "produce",
        "approxPkr": 30
      }
    ],
    "instructions": [
      "دیگچی میں ابلے چنے، پسی مسور کی دال، نمک، ہلدی اور کالی مرچ ڈال کر 15 منٹ پکائیں تاکہ گریوی گاڑھی ہو جائے۔",
      "ڈوئی سے چند چمچ چنے میش کر لیں تاکہ روایتی لاہوری ہوٹلوں جیسی لیس دار گریوی بنے۔",
      "الگ پین میں گھی گرم کر کے زیرہ، کالی مرچ اور پسی لال مرچ کا کڑکڑاتا تڑکا لگائیں اور سالن میں ڈالیں۔",
      "اوپر سے پسا گرم مصالحہ اور ہری مرچیں چھڑکیں۔",
      "گرما گرم تندوری نان، پیاز کے لچھوں اور لیموں والے اچار کے ساتھ ناشتہ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "چنوں میں حل پذیر فائبر ہوتا ہے، نان کے بجائے لال آٹے کی روٹی کے ساتھ لیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ کالی مرچ کا استعمال کریں، نمک اور گھی کی تری متوازن رکھیں۔"
      },
      "uric_acid": {
        "status": "caution",
        "tip": "چنوں میں پیورینز ہوتے ہیں، ہفتے میں ایک بار ہی ناشتہ کریں۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ گوشت کے بغیر نباتاتی پروٹین ہے، دل کیلئے ہلکا ناشتہ ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "لاہوری چنوں کا اصل راز مسور کی دال کا پیسٹ ہے جو گریوی کو بغیر کارن فلور کے قدرتی طور پر گاڑھا اور لذیذ بناتا ہے۔",
    "estimatedCostPkr": 360,
    "tags": [
      "nashta",
      "naan-chanay",
      "lahori",
      "traditional",
      "chana"
    ],
    "imageEmoji": "🫓"
  },
  {
    "id": "chai-paratha",
    "name": "Kadak Chai & Desi Ghee Paratha",
    "nativeName": "کڑک چائے اور دیسی گھی کا پراٹھا",
    "category": "nashta",
    "season": "all",
    "seasonalNotes": "ہر پاکستانی کا سدا بہار پسندیدہ ناشتہ: الائچی والی کڑک دودھ پتی چائے اور توے کا خستہ سنہری پراٹھا",
    "prepTimeMins": 5,
    "cookTimeMins": 10,
    "servings": 2,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کا توا اور چائے دانی",
      "type": "tawa",
      "reason": "توے پر دیسی گھی میں پراٹھا یکساں کرکرا بنتا ہے اور چائے دانی میں دودھ پتی خوب کڑھتی ہے۔",
      "healthBenefit": "الائچی والی کڑک چائے سستی دور کرتی ہے اور پراٹھا دن کے آغاز کیلئے بھرپور توانائی دیتا ہے۔"
    },
    "nutrition": {
      "calories": 320,
      "proteinG": 8,
      "carbsG": 38,
      "fatG": 16,
      "fiberG": 2,
      "sodiumMg": 140,
      "glycemicIndex": "Medium"
    },
    "ingredients": [
      {
        "name": "Fresh Buffalo Milk",
        "nameUrdu": "خالص بھینس کا دودھ",
        "quantity": "2 cups",
        "category": "dairy",
        "approxPkr": 60
      },
      {
        "name": "Strong Tea (Patti)",
        "nameUrdu": "کڑک چائے کی پتی",
        "quantity": "2 tsp",
        "category": "pantry",
        "approxPkr": 20
      },
      {
        "name": "Green Cardamom (Ilaichi)",
        "nameUrdu": "سبز الائچی",
        "quantity": "3 pcs",
        "category": "spices",
        "approxPkr": 10
      },
      {
        "name": "Whole Wheat Dough",
        "nameUrdu": "گندم کا آٹا (پیڑے)",
        "quantity": "200g",
        "category": "pantry",
        "approxPkr": 30
      },
      {
        "name": "Desi Ghee / Makhan",
        "nameUrdu": "دیسی گھی یا مکھن",
        "quantity": "2 tbsp",
        "category": "dairy",
        "approxPkr": 40
      }
    ],
    "instructions": [
      "چائے دانی میں دودھ، الائچی اور پتی ڈال کر ہلکی آنچ پر 5 سے 7 منٹ ابالیں اور اچھالیں تاکہ کڑک دودھ پتی بنے۔",
      "توے پر گندم کا لچھے دار پراٹھا دیسی گھی میں کرکرا سنہری سینک لیں۔",
      "چائے کو چھان کر گرم کپ میں نکالیں۔",
      "کرکرے پراٹھے کے نوالے بنا کر کڑک چائے میں ڈبو کر لطف اٹھائیں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "چائے میں چینی نہ ڈالیں، بغیر شکر کے الائچی والی پھیکی چائے لیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ نمک سے پاک ناشتہ ہے، بی پی کے مریضوں کیلئے محفوظ ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "100% محفوظ ناشتہ ہے۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ پراٹھے میں گھی کم لگائیں اور دودھ کی بالائی اتار کر استعمال کریں۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "دودھ پتی چائے کو ڈوئی سے بار بار اچھالنے سے چائے میں گہرا رنگ اور لاہوری ہوٹلوں جیسی جھاگ بنتی ہے۔",
    "estimatedCostPkr": 160,
    "tags": [
      "nashta",
      "paratha",
      "chai-paratha",
      "quick",
      "everyday"
    ],
    "imageEmoji": "☕"
  },
  {
    "id": "anda-paratha-omelette",
    "name": "Desi Omelette & Crispy Paratha",
    "nativeName": "دیسی آملیٹ اور کرکرا پراٹھا",
    "category": "nashta",
    "season": "all",
    "seasonalNotes": "پاکستانی گھرانوں کا روزمرہ کا سب سے پسندیدہ ناشتہ، پیاز ہری مرچ والا آملیٹ اور لچھے دار پراٹھا",
    "prepTimeMins": 10,
    "cookTimeMins": 15,
    "servings": 2,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کا روایتی توا (Desi Iron Tawa)",
      "type": "tawa",
      "reason": "توے پر پراٹھا کرکرا لچھے دار بنتا ہے اور آملیٹ تیز گرم سطح پر فلفی بنتا ہے۔",
      "healthBenefit": "توے پر ہلکے گھی میں پروٹین محفوظ رہتی ہے اور وٹامنز ضائع نہیں ہوتے۔"
    },
    "nutrition": {
      "calories": 390,
      "proteinG": 16,
      "carbsG": 34,
      "fatG": 21,
      "fiberG": 3,
      "sodiumMg": 360,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Farm Eggs",
        "nameUrdu": "تازہ انڈے",
        "quantity": "4 pcs",
        "category": "dairy",
        "approxPkr": 100
      },
      {
        "name": "Atta Dough for Paratha",
        "nameUrdu": "گندم کا آٹا (پیڑے)",
        "quantity": "250g",
        "category": "pantry",
        "approxPkr": 35
      },
      {
        "name": "Onion, Tomato & Green Chillies",
        "nameUrdu": "باریک کٹا پیاز، ٹماٹر اور ہری مرچیں",
        "quantity": "1 each & 3 chillies",
        "category": "produce",
        "approxPkr": 35
      },
      {
        "name": "Fresh Coriander & Spices",
        "nameUrdu": "ہرا دھنیا، نمک، کالی مرچ، کٹی لال مرچ",
        "quantity": "1.5 tsp",
        "category": "spices",
        "approxPkr": 15
      },
      {
        "name": "Desi Ghee / Butter",
        "nameUrdu": "دیسی گھی یا مکھن",
        "quantity": "3 tbsp",
        "category": "dairy",
        "approxPkr": 60
      }
    ],
    "instructions": [
      "پیالے میں انڈے توڑیں، باریک کٹا پیاز، ٹماٹر، ہری مرچیں، ہرا دھنیا، نمک اور کالی مرچ ڈال کر اچھی طرح پھینٹیں۔",
      "توے پر گندم کا لچھے دار پراٹھا دیسی گھی کے ساتھ دونوں طرف سے سنہری کرکرا سینک لیں۔",
      "توے پر ایک چمچ گھی گرم کر کے آملیٹ ڈالیں اور درمیانی آنچ پر دونوں طرف سے فلفی سنہری پکائیں۔",
      "کرکرے پراٹھے کے ساتھ گرما گرم آملیٹ اور کڑک چائے پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "ہائی پروٹین اور کم کاربوہائیڈریٹ والا بہترین ناشتہ ہے، لال آٹے کا پراٹھا استعمال کریں۔"
      },
      "hypertension": {
        "status": "caution",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ آملیٹ میں نمک کم رکھیں اور کالی مرچ و ہرے دھنیے کا ذائقہ بڑھائیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "انڈے کی پروٹین پیورین سے پاک ہوتی ہے، یورک ایسڈ کے مریض کھا سکتے ہیں۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ اگر کولیسٹرول زیادہ ہو تو ایک زردی اور دوسرے انڈے کی صرف سفیدی لیں۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "آملیٹ کو فلفی بنانے کیلئے انڈے میں ایک گھونٹ دودھ ملا کر خوب پھینٹیں۔",
    "estimatedCostPkr": 245,
    "tags": [
      "nashta",
      "anda-paratha",
      "omelette",
      "protein",
      "quick"
    ],
    "imageEmoji": "🍳"
  },
  {
    "id": "anda-paratha-halffry",
    "name": "Half Fry Egg & Crispy Paratha",
    "nativeName": "ہاف فرائی انڈا اور کرکرا پراٹھا",
    "category": "nashta",
    "season": "all",
    "seasonalNotes": "کالی مرچ اور رسیلی زردی والا ہاف فرائی انڈا اور گرما گرم کرکرا پراٹھا",
    "prepTimeMins": 5,
    "cookTimeMins": 10,
    "servings": 2,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کا روایتی توا",
      "type": "tawa",
      "reason": "توے پر انڈے کی کناریاں خستہ بنتی ہیں جبکہ زردی نرم رہتی ہے۔",
      "healthBenefit": "ہاف فرائی کی زردی میں لیوٹین اور وٹامن ڈی مکمل محفوظ رہتے ہیں۔"
    },
    "nutrition": {
      "calories": 370,
      "proteinG": 15,
      "carbsG": 32,
      "fatG": 20,
      "fiberG": 2,
      "sodiumMg": 310,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Eggs",
        "nameUrdu": "تازہ انڈے",
        "quantity": "4 pcs",
        "category": "dairy",
        "approxPkr": 100
      },
      {
        "name": "Wheat Dough for Paratha",
        "nameUrdu": "گندم کا آٹا",
        "quantity": "250g",
        "category": "pantry",
        "approxPkr": 35
      },
      {
        "name": "Desi Ghee / Butter",
        "nameUrdu": "دیسی گھی یا مکھن",
        "quantity": "3 tbsp",
        "category": "dairy",
        "approxPkr": 60
      },
      {
        "name": "Crushed Black Pepper & Salt",
        "nameUrdu": "کالی مرچ اور نمک",
        "quantity": "1 tsp",
        "category": "spices",
        "approxPkr": 15
      }
    ],
    "instructions": [
      "توے پر گندم کا لچھے دار پراٹھا کرکرا سنہری کر کے پلیٹ میں رکھیں۔",
      "توے پر گھی گرم کریں، انڈا احتیاط سے توڑیں تاکہ زردی برقرار رہے۔",
      "اوپر چٹکی بھر نمک اور تازہ کالی مرچ چھڑکیں۔",
      "سفیدی پک جانے پر نکال لیں جبکہ زردی نرم و رسیلی رہے۔ پراٹھے کے ساتھ نوش فرمائیں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "پروٹین اور اچھی چکنائی شوگر کو متوازن رکھتی ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ کالی مرچ کا استعمال کریں اور نمک برائے نام رکھیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے مریضوں کیلئے 100% محفوظ ہے۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ کولیسٹرول کے مریض زردی اعتدال میں رکھیں۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "انڈے پر چند قطرے لیموں اور چاٹ مصالحہ چھڑکنے سے دیسی مزہ دوبالا ہو جاتا ہے۔",
    "estimatedCostPkr": 210,
    "tags": [
      "nashta",
      "half-fry",
      "egg",
      "crispy-paratha",
      "quick"
    ],
    "imageEmoji": "🍳"
  },
  {
    "id": "anda-paratha-boiled",
    "name": "Boiled Egg, Chaat Masala & Paratha",
    "nativeName": "ابلا ہوا انڈا، چاٹ مصالحہ اور پراٹھا",
    "category": "nashta",
    "season": "all",
    "seasonalNotes": "صحت بخش پروٹین سے بھرپور ناشتہ، ابلے دیسی انڈے، چاٹ مصالحہ، خستہ پراٹھا اور چائے",
    "prepTimeMins": 5,
    "cookTimeMins": 12,
    "servings": 2,
    "difficulty": "easy",
    "utensil": {
      "name": "ساس پین اور لوہے کا توا",
      "type": "degchi",
      "reason": "ساس پین میں انڈے 9 منٹ میں یکساں ابلتے ہیں۔",
      "healthBenefit": "ابلے انڈے بغیر اضافی چکنائی کے خالص پروٹین فراہم کرتے ہیں۔"
    },
    "nutrition": {
      "calories": 330,
      "proteinG": 18,
      "carbsG": 30,
      "fatG": 15,
      "fiberG": 3,
      "sodiumMg": 280,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Farm / Desi Eggs",
        "nameUrdu": "فارمی یا دیسی انڈے",
        "quantity": "4 pcs",
        "category": "dairy",
        "approxPkr": 100
      },
      {
        "name": "Atta Dough for Paratha",
        "nameUrdu": "گندم کا آٹا (پیڑے)",
        "quantity": "200g",
        "category": "pantry",
        "approxPkr": 30
      },
      {
        "name": "Chaat Masala & Kala Namak",
        "nameUrdu": "چاٹ مصالحہ، کالا نمک، کالی مرچ",
        "quantity": "1 tbsp",
        "category": "spices",
        "approxPkr": 15
      },
      {
        "name": "Desi Ghee / Butter",
        "nameUrdu": "دیسی گھی یا مکھن",
        "quantity": "2 tbsp",
        "category": "dairy",
        "approxPkr": 40
      }
    ],
    "instructions": [
      "ساس پین میں پانی اور نمک ڈال کر انڈوں کو 9 منٹ ابالیں۔",
      "ٹھنڈے پانی میں ڈال کر چھلکا اتاریں اور دو ٹکڑے کر لیں۔",
      "توے پر گندم کا ہلکا پراٹھا تیار کریں۔",
      "ابلے انڈوں پر چاٹ مصالحہ اور کالی مرچ چھڑک کر پراٹھے اور چائے کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "شوگر کے مریضوں کیلئے نمبر ون صحت بخش ناشتہ ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ چاٹ مصالحہ کم رکھیں، کالی مرچ استعمال کریں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے مریضوں کیلئے پروٹین کا محفوظ ترین ذریعہ۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ کولیسٹرول کا خدشہ ہو تو زردی الگ کر کے سفیدی لیں۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "پانی میں آدھا چمچ سرکہ ڈالنے سے انڈے کا چھلکا بغیر ٹوٹے آسانی سے اتر جاتا ہے۔",
    "estimatedCostPkr": 185,
    "tags": [
      "nashta",
      "boiled-egg",
      "healthy",
      "protein-rich"
    ],
    "imageEmoji": "🥚"
  },
  {
    "id": "dahi-lassi",
    "name": "Fresh Dahi, Meethi Lassi & Paratha",
    "nativeName": "موسمی تازہ دہی، ٹھنڈی لسی اور پراٹھا",
    "category": "nashta",
    "season": "summer",
    "seasonalNotes": "موسم کے لحاظ سے تازہ مٹکے کا دہی، بالائی دار میٹھی یا نمکین پیڑا لسی اور مکھن پراٹھا",
    "prepTimeMins": 10,
    "cookTimeMins": 10,
    "servings": 3,
    "difficulty": "easy",
    "utensil": {
      "name": "مٹی کا مٹکا یا بلینڈر",
      "type": "handi",
      "reason": "مٹی کے برتن میں دہی قدرتی ٹھنڈا اور میٹھا رہتا ہے۔",
      "healthBenefit": "تازہ دہی اور لسی میں قدرتی پروبائیوٹکس ہوتے ہیں جو معدے کو ٹھنڈک اور ہاضمے کو تقویت دیتے ہیں۔"
    },
    "nutrition": {
      "calories": 350,
      "proteinG": 14,
      "carbsG": 45,
      "fatG": 13,
      "fiberG": 2,
      "sodiumMg": 190,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Buffalo Yogurt (Dahi)",
        "nameUrdu": "تازہ گاڑھا دہی",
        "quantity": "1/2 kg",
        "category": "dairy",
        "approxPkr": 130
      },
      {
        "name": "Fresh Milk & Malai",
        "nameUrdu": "خالص دودھ اور بالائی",
        "quantity": "1/2 liter",
        "category": "dairy",
        "approxPkr": 110
      },
      {
        "name": "Fresh White Butter (Makhan)",
        "nameUrdu": "سفید مکھن",
        "quantity": "50g",
        "category": "dairy",
        "approxPkr": 60
      },
      {
        "name": "Sugar or Kala Namak & Zeera",
        "nameUrdu": "چینی یا کالا نمک و زیرہ",
        "quantity": "3 tbsp",
        "category": "pantry",
        "approxPkr": 20
      },
      {
        "name": "Wheat Dough for Paratha",
        "nameUrdu": "گندم کا آٹا (پراٹھے کیلئے)",
        "quantity": "300g",
        "category": "pantry",
        "approxPkr": 40
      }
    ],
    "instructions": [
      "دہی، دودھ، پانی اور برف کو بلینڈر میں پھینٹ کر جھاگ دار لسی بنائیں۔",
      "حسب پسند میٹھی لسی کیلئے چینی یا نمکین کیلئے کالا نمک و بھنا زیرہ ڈالیں۔",
      "توے پر گندم کا کرکرا پراٹھا بنائیں اور اوپر تازہ مکھن رکھیں۔",
      "گلاسوں میں لسی ڈالیں، اوپر موٹی بالائی کا چمچ رکھیں اور دہی پراٹھے کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "شوگر کے مریض چینی کے بغیر نمکین زیرہ لسی لیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ دہی کا پوٹاشیم بلڈ پریشر کو متوازن رکھتا ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "دہی یورک ایسڈ کے اخراج میں مددگار ہے۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ بالائی ہٹا کر کم چکنائی والے دہی کی نمکین لسی لیں۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے انتہائی ہلکا، ٹھنڈا اور زود ہضم کھانا ہے جو تیزابیت اور معدے کی گرانی کو دور کرتا ہے۔"
      }
    },
    "proTip": "لسی میں ایک چٹکی الائچی پاؤڈر ڈالنے سے لاہوری بازاری لسی جیسی خوشبو آتی ہے۔",
    "estimatedCostPkr": 360,
    "tags": [
      "nashta",
      "dahi",
      "lassi",
      "summer-cool",
      "traditional"
    ],
    "imageEmoji": "🥛"
  },
  {
    "id": "bread-toast-anda-chai",
    "name": "Bread Toast (White/Brown), Eggs & Chai / Dahi",
    "nativeName": "ڈبل روٹی (بریڈ ٹوسٹ)، انڈے اور کڑک چائے / دہی",
    "category": "nashta",
    "season": "all",
    "seasonalNotes": "پاکستانی گھرانوں کا روزمرہ ہلکا ناشتہ: مکھن لگا وائٹ یا براؤن بریڈ ٹوسٹ، آملیٹ یا ہاف فرائی انڈا، تازہ دہی اور گرم چائے",
    "prepTimeMins": 5,
    "cookTimeMins": 10,
    "servings": 2,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کا توا یا ٹوسٹر (Tawa / Toaster)",
      "type": "tawa",
      "reason": "توے پر مکھن کے ساتھ بریڈ کے سلائس یکساں سنہری اور کرکرے ٹوسٹ ہوتے ہیں۔",
      "healthBenefit": "براؤن بریڈ میں ڈائیٹری فائبر اور بی وٹامنز وافر ہوتے ہیں جو دیرپا توانائی دیتے ہیں۔"
    },
    "nutrition": {
      "calories": 340,
      "proteinG": 16,
      "carbsG": 36,
      "fatG": 14,
      "fiberG": 4,
      "sodiumMg": 360,
      "glycemicIndex": "Medium"
    },
    "ingredients": [
      {
        "name": "White or Brown Bread (Double Roti)",
        "nameUrdu": "ڈبل روٹی (وائٹ یا براؤن بریڈ سلائسز)",
        "quantity": "4 slices",
        "category": "pantry",
        "approxPkr": 50
      },
      {
        "name": "Eggs (for Omelette or Half Fry)",
        "nameUrdu": "تازہ انڈے (آملیٹ، ہاف فرائی یا ابلے ہوئے)",
        "quantity": "2-4 pcs",
        "category": "dairy",
        "approxPkr": 100
      },
      {
        "name": "Fresh Dahi or Makhan / Butter",
        "nameUrdu": "تازہ مکھن یا دہی",
        "quantity": "1 small bowl / 2 tbsp",
        "category": "dairy",
        "approxPkr": 50
      },
      {
        "name": "Kadak Chai / Milk",
        "nameUrdu": "کڑک چائے کی پتی، دودھ، الائچی",
        "quantity": "for 2 cups",
        "category": "pantry",
        "approxPkr": 40
      },
      {
        "name": "Black Pepper & Salt",
        "nameUrdu": "کالی مرچ اور نمک",
        "quantity": "1 tsp",
        "category": "spices",
        "approxPkr": 10
      }
    ],
    "instructions": [
      "توے پر مکھن یا ہلکے گھی کے ساتھ ڈبل روٹی (وائٹ یا براؤن سلائسز) کو دونوں طرف سے کرکرا سنہری ٹوسٹ کریں۔",
      "پسند کے مطابق دیسی پیاز ہری مرچ والا آملیٹ یا کالی مرچ والا ہاف فرائی انڈا تیار کریں۔",
      "ساتھ چھوٹی پیالی میں تازہ ٹھنڈا دہی رکھیں یا الائچی والی کڑک دودھ پتی چائے بنائیں (یا دونوں کا لطف لیں)۔",
      "گرم کرکرے بریڈ ٹوسٹ، انڈے، دہی اور چائے کے ساتھ ہلکا پھلکا اور صحت بخش ناشتہ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "وائٹ بریڈ کے بجائے خالص براؤن ہول ویٹ بریڈ استعمال کریں جو شوگر کو مستحکم رکھتی ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ انڈے میں نمک کم رکھیں اور بغیر نمک والے مکھن کے ساتھ ٹوسٹ کھائیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "بریڈ، انڈے اور دہی یورک ایسڈ کے مریضوں کیلئے 100% محفوظ ناشتہ ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ براؤن بریڈ کے ساتھ انڈے کی سفیدی اور بغیر بالائی کا دہی دل کیلئے بہترین ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے انتہائی ہلکا، ٹھنڈا اور زود ہضم کھانا ہے جو تیزابیت اور معدے کی گرانی کو دور کرتا ہے۔"
      }
    },
    "proTip": "براؤن بریڈ کو توے پر ہلکی آنچ پر سینکنے سے سلائس خستہ بنتے ہیں اور جلتے نہیں ہیں۔",
    "estimatedCostPkr": 250,
    "tags": [
      "nashta",
      "bread",
      "double-roti",
      "toast",
      "egg-toast",
      "chai-toast",
      "quick"
    ],
    "imageEmoji": "🍞"
  },
  {
    "id": "sarson-saag-roti",
    "name": "Sarson Ka Saag, Butter & Hot Roti",
    "nativeName": "سرسوں کا ساگ، مکھن اور گرم روٹی / مکئی کی روٹی",
    "category": "sabzi",
    "season": "winter",
    "seasonalNotes": "سردیوں کی سب سے خاص سوغات: تازہ سرسوں کا ساگ، پالک اور باتھو، لہسن و دیسی گھی کے تڑکے اور مکھن کے ساتھ گرما گرم روٹی۔ یہ صرف سردی میں ملتی ہے۔",
    "prepTimeMins": 30,
    "cookTimeMins": 45,
    "servings": 5,
    "difficulty": "medium",
    "utensil": {
      "name": "مٹی کی روایتی ہانڈی اور مدھانی (Ghotna)",
      "type": "handi",
      "reason": "ہانڈی میں ہلکی آنچ پر گھوٹا لگانے سے ساگ مکھن کی طرح ملائم اور یکجان بنتا ہے۔",
      "healthBenefit": "مٹی کے برتن میں ساگ کے قدرتی اینٹی آکسیڈنٹس، فولاد اور وٹامنز ضائع نہیں ہوتے۔"
    },
    "nutrition": {
      "calories": 240,
      "proteinG": 8,
      "carbsG": 26,
      "fatG": 12,
      "fiberG": 9,
      "sodiumMg": 280,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Winter Sarson Saag",
        "nameUrdu": "تازہ سرسوں کا ساگ (سردیوں کی فصل)",
        "quantity": "1 kg",
        "category": "produce",
        "approxPkr": 80
      },
      {
        "name": "Fresh Spinach & Bathu",
        "nameUrdu": "تازہ پالک اور باتھو",
        "quantity": "500g & 250g",
        "category": "produce",
        "approxPkr": 50
      },
      {
        "name": "Garlic, Ginger & Green Chillies",
        "nameUrdu": "دیسی لہسن، ادرک اور ہری مرچیں",
        "quantity": "3 tbsp & 6 chillies",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Makki Atta (Cornmeal for Aalun)",
        "nameUrdu": "مکئی کا آٹا (آلن کیلئے)",
        "quantity": "3 tbsp",
        "category": "pantry",
        "approxPkr": 25
      },
      {
        "name": "Desi Ghee / Fresh White Makhan",
        "nameUrdu": "دیسی گھی (تڑکا) اور تازہ سفید مکھن",
        "quantity": "1/3 cup & dollop",
        "category": "dairy",
        "approxPkr": 95
      },
      {
        "name": "Salt, Red Pepper Flakes & Zeera",
        "nameUrdu": "نمک، کٹی لال مرچ، زیرہ",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 20
      }
    ],
    "instructions": [
      "ساگ، پالک اور باتھو کو باریک کاٹ کر 3-4 بار کھلے پانی سے دھوئیں تاکہ مٹی اچھی طرح نکل جائے۔",
      "ہانڈی میں ساگ، ہری مرچیں، ادرک اور لہسن ڈال کر دھیمی آنچ پر 1 گھنٹہ پکائیں جب تک ڈنڈیاں گل نہ جائیں۔",
      "مکئی کا آٹا (آلن) تھوڑا تھوڑا چھڑک کر مدھانی (لکڑی کے گھوٹنے) سے خوب گھوٹیں تاکہ ساگ کریمی ہو جائے۔",
      "الگ پین میں دیسی گھی گرم کر کے کٹا ہوا لہسن، سوکھی گول لال مرچ اور زیرہ سنہری کر کے تڑکا لگائیں۔",
      "اوپر تازہ سفید مکھن کا پیڑا رکھیں اور گرما گرم گندم کی تندوری روٹی یا مکئی کی روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "ساگ میں فائبر بہت وافر ہے اور کاربوہائیڈریٹ نہ ہونے کے برابر، شوگر کے مریضوں کیلئے بہترین سوغات ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ پوٹاشیم اور میگنیشیم سے بھرپور سبزی ہے، تڑکے میں نمک معتدل رکھیں۔"
      },
      "uric_acid": {
        "status": "caution",
        "tip": "پالک اور ساگ میں پیورینز ہوتے ہیں، یورک ایسڈ کے مریض ہفتے میں ایک چھوٹی پیالی لیں۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ خالص قدرتی فائبر کولیسٹرول کو کم کرتا ہے، اوپر مکھن معتدل مقدار میں لیں۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "ساگ کو گرائنڈر میں بلینڈ نہ کریں بلکہ لکڑی کی مدھانی سے گھوٹیں، اس سے ساگ کا روایتی دیسی ریشہ اور ذائقہ قائم رہتا ہے۔",
    "estimatedCostPkr": 310,
    "tags": [
      "lunch",
      "sabzi",
      "winter",
      "saag",
      "roti",
      "traditional",
      "dinner"
    ],
    "imageEmoji": "🥬"
  },
  {
    "id": "gajar-matar-aloo-roti",
    "name": "Winter Gajar Matar Aloo Bhujia & Hot Roti",
    "nativeName": "موسمی گاجر، مٹر، آلو کی بھجیا اور روٹی",
    "category": "sabzi",
    "season": "winter",
    "seasonalNotes": "سردیوں کی مشہور ترین دوپہر کی سبزی: تازی میٹھی سرخ دیسی گاجریں، تازہ نکلے ہوئے میٹھے مٹر اور نئے آلو کی خشک بھجیا اور نرم پھلکا روٹی۔",
    "prepTimeMins": 20,
    "cookTimeMins": 25,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کی کڑاہی (Cast Iron Karahi)",
      "type": "karahi",
      "reason": "کڑاہی میں گاجر مٹر تیز آنچ پر بغیر پانی ڈالے اپنے ہی رس میں دم پر پکتے ہیں اور رنگت سرخ رہتی ہے۔",
      "healthBenefit": "گاجر میں بیٹا کیروٹین اور مٹر میں نباتاتی فائبر ہوتا ہے جو آنکھوں اور قوت مدافعت کو طاقت دیتا ہے۔"
    },
    "nutrition": {
      "calories": 210,
      "proteinG": 5,
      "carbsG": 32,
      "fatG": 8,
      "fiberG": 7,
      "sodiumMg": 240,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Sweet Red Winter Carrots",
        "nameUrdu": "سردیوں کی تازی لال میٹھی گاجریں",
        "quantity": "500g",
        "category": "produce",
        "approxPkr": 45
      },
      {
        "name": "Fresh Shelled Green Peas (Matar)",
        "nameUrdu": "تازہ نکلے ہوئے ہرے مٹر",
        "quantity": "350g",
        "category": "produce",
        "approxPkr": 60
      },
      {
        "name": "Potatoes (Aloo)",
        "nameUrdu": "نئے آلو چھوٹے ٹکڑے",
        "quantity": "250g",
        "category": "produce",
        "approxPkr": 35
      },
      {
        "name": "Tomatoes, Ginger & Green Chillies",
        "nameUrdu": "سرخ ٹماٹر، باریک ادرک، ہری مرچیں",
        "quantity": "2 pcs each & 3 chillies",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Zeera, Kalonji, Haldi & Kasuri Methi",
        "nameUrdu": "سفید زیرہ، کلونجی، ہلدی، قصوری میتھی",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 25
      },
      {
        "name": "Cooking Oil / Desi Ghee",
        "nameUrdu": "کوکنگ آئل یا دیسی گھی",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 55
      }
    ],
    "instructions": [
      "کڑاہی میں تیل گرم کر کے سفید زیرہ اور چٹکی بھر کلونجی کڑکڑائیں۔",
      "ادرک کے باریک لچھے، ٹماٹر اور مصالحے (ہلدی، نمک، لال مرچ) ڈال کر 3 منٹ بھونیں۔",
      "کٹھی ہوئی لال گاجریں، تازہ مٹر اور آلو شامل کر کے تیز آنچ پر 2 منٹ چمچ چلائیں۔",
      "پانی بالکل نہ ڈالیں، ڈھکن ڈھانپ کر ہلکی آنچ پر 15 منٹ دم دیں تاکہ سبزیاں اپنے رس میں گل جائیں۔",
      "ڈھکن ہٹا کر قصوری میتھی اور ہرا دھنیا چھڑکیں، 2 منٹ تیز آنچ پر بھونیں تاکہ گھی اوپر آ جائے۔ گرم پھلکا روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "سردی کی لال گاجر میں قدرتی مٹھاس اور مٹر میں کاربس ہوتے ہیں، شوگر کے مریض آلو کم اور مٹر گاجر اعتدال میں لیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ پوٹاشیم سے بھرپور سبزی بلڈ پریشر کو متوازن رکھتی ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے مریضوں کیلئے محفوظ اور ہلکی سبزی ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ زیرو کولیسٹرول، دل کی شریانوں کیلئے مفید ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "گاجر مٹر میں ایک بوند بھی پانی نہ ڈالیں، صرف ہلکی آنچ کے دم پر پکائیں تو گاجر کی مٹھاس اور مٹر کا ہرا رنگ برقرار رہے گا۔",
    "estimatedCostPkr": 260,
    "tags": [
      "lunch",
      "sabzi",
      "winter",
      "gajar-matar",
      "roti",
      "everyday",
      "dinner"
    ],
    "imageEmoji": "🥕"
  },
  {
    "id": "gobhi-matar-aloo-roti",
    "name": "Winter Phool Gobhi Matar Aloo & Hot Roti",
    "nativeName": "پھول گوبھی، مٹر اور آلو کی سبزی اور روٹی",
    "category": "sabzi",
    "season": "winter",
    "seasonalNotes": "سردیوں کی تازی سفید و خستہ پھول گوبھی، میٹھے مٹر اور آلو کی کڑاہی سبزی، اجوائن کے تڑکے کے ساتھ گرم پھلکا روٹی۔ سردی کے علاوہ یہ گوبھی نہیں ملتی۔",
    "prepTimeMins": 15,
    "cookTimeMins": 22,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کی کڑاہی (Iron Karahi)",
      "type": "karahi",
      "reason": "کڑاہی میں گوبھی تیز بھاپ میں بغیر ٹوٹے دم میں پکتی ہے اور پھول الگ الگ رہتا ہے۔",
      "healthBenefit": "پھول گوبھی وٹامن سی اور اینٹی آکسیڈنٹس سے بھرپور ہوتی ہے جو سردیوں کے نزلہ زکام سے بچاتی ہے۔"
    },
    "nutrition": {
      "calories": 225,
      "proteinG": 6,
      "carbsG": 29,
      "fatG": 9,
      "fiberG": 7,
      "sodiumMg": 290,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Winter Cauliflower (Gobhi)",
        "nameUrdu": "سردی کی تازہ پھول گوبھی",
        "quantity": "1 medium (750g)",
        "category": "produce",
        "approxPkr": 60
      },
      {
        "name": "Fresh Green Peas (Matar)",
        "nameUrdu": "تازہ مٹر کے دانے",
        "quantity": "200g",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Potatoes (Aloo)",
        "nameUrdu": "آلو کیوبز",
        "quantity": "250g",
        "category": "produce",
        "approxPkr": 35
      },
      {
        "name": "Onions, Tomatoes & Ginger",
        "nameUrdu": "پیاز، ٹماٹر اور باریک کٹا ادرک",
        "quantity": "2 pcs each & 2 tbsp",
        "category": "produce",
        "approxPkr": 45
      },
      {
        "name": "Ajwain, Zeera, Haldi & Garam Masala",
        "nameUrdu": "اجوائن، زیرہ، ہلدی، گرم مصالحہ",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 25
      },
      {
        "name": "Cooking Oil / Ghee",
        "nameUrdu": "کوکنگ آئل یا گھی",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 55
      }
    ],
    "instructions": [
      "کڑاہی میں تیل گرم کر کے زیرہ اور آدھی چمچ اجوائن کڑکڑائیں (اجوائن گوبھی کا بادی پن مکمل ختم کرتی ہے)۔",
      "پیاز، ادرک لہسن اور ٹماٹر بھون کر مصالحہ یکجان بنائیں۔",
      "آلو اور مٹر ڈال کر 3 منٹ بھونیں، پھر گوبھی کے درمیانے پھول شامل کریں۔",
      "پانی نہ ڈالیں، ڈھکن بند کر کے دھیمی آنچ پر 12 منٹ دم پر گلنے دیں۔",
      "ڈھکن کھول کر ادرک کے لچھے، ہرا دھنیا اور پسا گرم مصالحہ ڈال کر گرم روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "گوبھی میں کاربوہائیڈریٹ بہت کم ہوتے ہیں، شوگر کے مریض آلو کم کر کے گوبھی مٹر زیادہ کھائیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ اجوائن اور زیرہ گیس اور اپھارے کو روکتے ہیں اور بلڈ پریشر پر نرم رہتے ہیں۔"
      },
      "uric_acid": {
        "status": "caution",
        "tip": "پھول گوبھی میں پیورینز ہوتے ہیں، یورک ایسڈ کے مریض اعتدال میں لیں۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ پودوں پر مبنی کم چکنائی والی صحت بخش سبزی ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "گوبھی کے پھول زیادہ چھوٹے نہ کاٹیں اور اجوائن لازمی ڈالیں تاکہ بادی پن نہ ہو اور پھول کھڑا رہے حلوہ نہ بنے۔",
    "estimatedCostPkr": 260,
    "tags": [
      "lunch",
      "sabzi",
      "winter",
      "gobhi",
      "roti",
      "popular",
      "dinner"
    ],
    "imageEmoji": "🥦"
  },
  {
    "id": "shaljam-bhujia-roti",
    "name": "Desi Winter Shaljam Bhujia & Hot Roti",
    "nativeName": "دیسی شلجم کی بھجیا (گڑ اور دیسی گھی تڑکا) اور روٹی",
    "category": "sabzi",
    "season": "winter",
    "seasonalNotes": "سردی کی روایتی خاص سوغات: دیسی جامنی و سفید شلجم، دیسی گھی اور ہلکے گڑ کا روایتی تڑکا، جو صرف سردیوں کے موسم میں بنتی ہے۔",
    "prepTimeMins": 15,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "دیسی ہانڈی یا پتیلی",
      "type": "handi",
      "reason": "ہانڈی میں شلجم ہلکی آنچ پر گھوٹنے سے مکھن کی طرح نرم اور لذیذ بنتے ہیں۔",
      "healthBenefit": "شلجم میں پوٹاشیم، کیلشیم اور وٹامن سی وافر ہوتا ہے جو سردی میں گردوں کو ڈیٹاکس کرتا ہے۔"
    },
    "nutrition": {
      "calories": 165,
      "proteinG": 3,
      "carbsG": 21,
      "fatG": 8,
      "fiberG": 5,
      "sodiumMg": 210,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Purple & White Winter Turnips",
        "nameUrdu": "تازہ سفید و جامنی سردیوں کے شلجم",
        "quantity": "1 kg",
        "category": "produce",
        "approxPkr": 50
      },
      {
        "name": "Onions & Tomatoes",
        "nameUrdu": "پیاز اور ٹماٹر",
        "quantity": "2 medium each",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Desi Gur (Jaggery) / Sugar",
        "nameUrdu": "دیسی گڑ کا چھوٹا ٹکڑا یا شکر",
        "quantity": "1 tbsp",
        "category": "pantry",
        "approxPkr": 15
      },
      {
        "name": "Green Chillies, Ginger & Coriander",
        "nameUrdu": "سبز مرچیں، باریک ادرک اور ہرا دھنیا",
        "quantity": "3 pcs & leaves",
        "category": "produce",
        "approxPkr": 20
      },
      {
        "name": "Desi Ghee / Oil",
        "nameUrdu": "دیسی گھی یا کوکنگ آئل",
        "quantity": "1/4 cup",
        "category": "pantry",
        "approxPkr": 50
      },
      {
        "name": "Haldi, Zeera, Mirch & Salt",
        "nameUrdu": "ہلدی، زیرہ، لال مرچ، نمک",
        "quantity": "1 tbsp",
        "category": "spices",
        "approxPkr": 15
      }
    ],
    "instructions": [
      "شلجم کا چھلکا موٹا اتاریں تاکہ کڑواہٹ بالکل ختم ہو جائے، اور درمیانے ٹکڑوں میں کاٹ لیں۔",
      "پتیلی میں آدھا کپ پانی ڈال کر شلجم 10 منٹ ابالیں جب تک نرم نہ ہو جائیں، پھر ڈوئی سے میش کریں۔",
      "الگ کڑاہی میں گھی گرم کریں، پیاز، ادرک لہسن اور ٹماٹر بھونیں۔",
      "میش کیے ہوئے شلجم اور چھوٹا ٹکڑا دیسی گڑ ڈالیں اور تیز آنچ پر خوب بھونیں جب تک گھی اوپر نہ آ جائے۔",
      "ہری مرچیں اور ہرا دھنیا چھڑک کر گرم گرم پھلکا روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "شوگر کے مریض گڑ چھوڑ کر نمکین شلجم بنائیں، شلجم میں کاربوہائیڈریٹ بہت کم ہیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ شلجم پوٹاشیم کا خزانہ ہے جو ہائی بلڈ پریشر کو قابو میں رکھتا ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "شلجم پیشاب آور ہے اور جسم سے یورک ایسڈ کے اخراج میں مدد دیتا ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ زیرو کولیسٹرول اور انتہائی ہلکا کھانا ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "شلجم کا چھلکا ہمیشہ ذرا موٹا کاٹیں اور ذرا سا گڑ لازمی ڈالیں، شلجم کا ذائقہ شاہی بن جائے گا۔",
    "estimatedCostPkr": 190,
    "tags": [
      "lunch",
      "sabzi",
      "winter",
      "shaljam",
      "roti",
      "desi",
      "dinner"
    ],
    "imageEmoji": "🧄"
  },
  {
    "id": "methi-aloo-roti",
    "name": "Fresh Winter Methi Aloo & Hot Roti",
    "nativeName": "تازہ قصوری میتھی آلو کی بھجیا اور روٹی",
    "category": "sabzi",
    "season": "winter",
    "seasonalNotes": "سردیوں کی خوشبودار ترین سبزی: تازی ہری میتھی کے پتے، بھنے ہوئے آلو، کلونجی اور سرخ کٹی مرچ کے ساتھ گرما گرم روٹی۔ میتھی صرف سردی میں ملتی ہے۔",
    "prepTimeMins": 20,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کی کڑاہی (Iron Karahi)",
      "type": "karahi",
      "reason": "لوہے کی کڑاہی میں میتھی تیز آنچ پر بھن کر کڑواہٹ چھوڑ دیتی ہے اور سوندھی خوشبو پیدا ہوتی ہے۔",
      "healthBenefit": "تازہ میتھی خون صاف کرتی ہے، نظام ہاضمہ درست رکھتی ہے اور جوڑوں کے درد سے نجات دلاتی ہے۔"
    },
    "nutrition": {
      "calories": 215,
      "proteinG": 5,
      "carbsG": 28,
      "fatG": 10,
      "fiberG": 8,
      "sodiumMg": 230,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Winter Kasuri Methi Leaves",
        "nameUrdu": "تازہ سردیوں کی میتھی کے پتے",
        "quantity": "500g",
        "category": "produce",
        "approxPkr": 50
      },
      {
        "name": "Potatoes (Aloo Cubes)",
        "nameUrdu": "آلو باریک کیوبز",
        "quantity": "350g",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Garlic, Green Chillies & Tomatoes",
        "nameUrdu": "لہسن کے جوئے، ہری مرچیں اور ٹماٹر",
        "quantity": "2 tbsp & 2 tomatoes",
        "category": "produce",
        "approxPkr": 35
      },
      {
        "name": "Kalonji, Zeera & Kuti Lal Mirch",
        "nameUrdu": "کلونجی، زیرہ، کٹی لال مرچ",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 20
      },
      {
        "name": "Mustard Oil / Desi Ghee / Cooking Oil",
        "nameUrdu": "سرسوں کا تیل یا دیسی گھی",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 55
      }
    ],
    "instructions": [
      "میتھی کے صرف پتے توڑ کر 3 بار اچھی طرح دھوئیں اور باریک کاٹ لیں۔ ہلکا نمک لگا کر 10 منٹ رکھیں پھر نچوڑیں تاکہ کڑواہٹ نکل جائے۔",
      "کڑاہی میں تیل گرم کر کے کٹا ہوا لہسن، زیرہ، کلونجی اور کٹی لال مرچ کڑکڑائیں۔",
      "آلو شامل کر کے 4 منٹ سنہری ہونے تک فرائی کریں۔",
      "میتھی شامل کریں اور تیز آنچ پر 3 منٹ بھونیں، پھر ٹماٹر ڈال کر ہلکی آنچ پر 10 منٹ دم دیں۔",
      "گرما گرم پھلکا روٹی یا تندوری روٹی اور تازہ مکھن کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "میتھی خون میں شوگر لیول کو کنٹرول کرنے میں دنیا کی بہترین سبزی مانی جاتی ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ کلونجی اور میتھی بلڈ پریشر اور شریانوں کے تناؤ کو کم کرتی ہیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے مریضوں کیلئے محفوظ سبزی ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ میتھی خون سے خراب کولیسٹرول (LDL) گھٹانے میں انتہائی مفید ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "میتھی میں ڈنڈیاں نہ ڈالیں صرف پتے لیں اور لہسن کا تڑکا تھوڑا زیادہ رکھیں، کڑواہٹ مٹ کر لاجواب ذائقہ بنے گا۔",
    "estimatedCostPkr": 200,
    "tags": [
      "lunch",
      "sabzi",
      "winter",
      "methi",
      "roti",
      "aromatic",
      "dinner"
    ],
    "imageEmoji": "🌿"
  },
  {
    "id": "palak-aloo-roti",
    "name": "Desi Winter Palak Aloo & Hot Roti",
    "nativeName": "دیسی پالک آلو کا سالن اور گرما گرم روٹی",
    "category": "sabzi",
    "season": "winter",
    "seasonalNotes": "سردیوں کی ملائم تازہ دیسی پالک، آلو کے قتلوں اور لہسن کے بگھار کے ساتھ گرما گرم روٹی۔ سردی کے موسم میں پالک نرم اور شیریں ہوتی ہے۔",
    "prepTimeMins": 15,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کی کڑاہی یا پتیلی",
      "type": "karahi",
      "reason": "کڑاہی میں پالک کا پانی تیزی سے سوکھتا ہے اور اس کا گہرا سبز رنگ ماند نہیں پڑتا۔",
      "healthBenefit": "پالک فولاد (Iron) اور فولیٹ کا قدرتی خزانہ ہے جو خون کی کمی دور کرتا ہے۔"
    },
    "nutrition": {
      "calories": 205,
      "proteinG": 6,
      "carbsG": 25,
      "fatG": 9,
      "fiberG": 7,
      "sodiumMg": 270,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Winter Spinach (Palak)",
        "nameUrdu": "سردیوں کی تازہ دیسی پالک",
        "quantity": "1 kg",
        "category": "produce",
        "approxPkr": 50
      },
      {
        "name": "Potatoes (Aloo)",
        "nameUrdu": "آلو کے درمیانے ٹکڑے",
        "quantity": "300g",
        "category": "produce",
        "approxPkr": 35
      },
      {
        "name": "Onions, Tomatoes & Garlic",
        "nameUrdu": "پیاز، ٹماٹر اور دیسی لہسن",
        "quantity": "2 pcs each & 2 tbsp",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Zeera, Haldi & Dhaniya Powder",
        "nameUrdu": "سفید زیرہ، ہلدی، دھنیا پاؤڈر، نمک",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 20
      },
      {
        "name": "Cooking Oil / Desi Ghee",
        "nameUrdu": "کوکنگ آئل یا دیسی گھی",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 55
      }
    ],
    "instructions": [
      "پالک کو اچھی طرح دھو کر موٹا کاٹ لیں اور بغیر اضافی پانی کے 5 منٹ ابال کر ہلکا میش کر لیں۔",
      "کڑاہی میں تیل گرم کر کے زیرہ اور لہسن سنہری کریں۔ پیاز اور ٹماٹر بھونیں۔",
      "آلو شامل کر کے 5 منٹ پکائیں۔",
      "پالک ڈال کر مکس کریں اور دھیمی آنچ پر 10 منٹ دم دیں جب تک آلو نرم نہ ہو جائیں۔",
      "تیز آنچ پر 2 منٹ بھونیں جب تک گھی اوپر نہ آئے۔ گرم روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "پالک بلڈ شوگر متوازن رکھنے کیلئے بہترین سبزی ہے، آلو کم کھائیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ ہائی پوٹاشیم بلڈ پریشر کو نارمل رکھتا ہے۔"
      },
      "uric_acid": {
        "status": "caution",
        "tip": "پالک میں پیورینز ہوتے ہیں، یورک ایسڈ کے مریض ہفتے میں ایک بار اعتدال میں کھائیں۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ شریانوں کی حفاظت کیلئے زبردست سبز سبزی ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "پالک کو زیادہ نہ ابالیں تاکہ اس کی ہری رنگت اور غذائی وٹامنز برقرار رہیں۔",
    "estimatedCostPkr": 200,
    "tags": [
      "lunch",
      "sabzi",
      "winter",
      "palak",
      "roti",
      "iron-rich",
      "dinner"
    ],
    "imageEmoji": "🥗"
  },
  {
    "id": "mooli-bhujia-roti",
    "name": "Fresh Winter Mooli Bhujia & Hot Roti",
    "nativeName": "تازہ مولی اور پتوں کی بھجیا اور روٹی",
    "category": "sabzi",
    "season": "winter",
    "seasonalNotes": "سردیوں کی ہاضمہ دار سبزی: تازی سفید مولی اور اس کے نرم ہرے پتے، اجوائن اور زیرے کی بھجیا، گرم روٹی اور مکھن۔ سردی کی دھوپ میں دوپہر کا بہترین کھانا۔",
    "prepTimeMins": 15,
    "cookTimeMins": 18,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کی کڑاہی یا فرائنگ پین",
      "type": "karahi",
      "reason": "تیز آنچ پر مولی کا اضافی پانی جلد خشک ہوتا ہے اور بھجیا خستہ رہتی ہے۔",
      "healthBenefit": "مولی معدے کی تیزابیت، اپھارہ اور جگر کی گرمی دور کر کے ہاضمہ تیز کرتی ہے۔"
    },
    "nutrition": {
      "calories": 155,
      "proteinG": 3,
      "carbsG": 18,
      "fatG": 8,
      "fiberG": 6,
      "sodiumMg": 220,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Winter White Radish & Greens",
        "nameUrdu": "تازہ سفید مولی اور نرم ہرے پتے",
        "quantity": "1 kg (مولی و پتے)",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Green Chillies & Ginger",
        "nameUrdu": "ہری مرچیں اور باریک ادرک",
        "quantity": "4 pcs & 2 tbsp",
        "category": "produce",
        "approxPkr": 25
      },
      {
        "name": "Ajwain, Zeera, Haldi & Kuti Mirch",
        "nameUrdu": "اجوائن، سفید زیرہ، ہلدی، کٹی لال مرچ",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 20
      },
      {
        "name": "Desi Ghee / Cooking Oil",
        "nameUrdu": "دیسی گھی یا کوکنگ آئل",
        "quantity": "1/4 cup",
        "category": "pantry",
        "approxPkr": 45
      }
    ],
    "instructions": [
      "مولی چھیل کر کدوکش کریں یا باریک ٹکڑے کاٹیں، اور مولی کے تازہ ہرے پتے بھی باریک کاٹ لیں۔",
      "مولی اور پتوں کو 5 منٹ ابال کر چھلنی میں ڈالیں اور ہاتھ سے دبا کر پانی نچوڑ لیں۔",
      "کڑاہی میں دیسی گھی گرم کر کے اجوائن، زیرہ، ادرک اور ہری مرچیں کڑکڑائیں۔",
      "نچوڑی ہوئی مولی اور پتے ڈال کر نمک، ہلدی، کٹی مرچ کے ساتھ تیز آنچ پر 8 منٹ بھونیں۔",
      "گرما گرم پھلکا روٹی پر تازہ مکھن لگا کر ساتھ مولی کی بھجیا پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "مولی میں انتہائی کم کیلوریز اور شوگر ہے، شوگر کے مریضوں کیلئے بے حد مفید ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ مولی میں موجود اینٹی آکسیڈنٹس بلڈ پریشر کو قابو میں رکھتے ہیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "مولی پیشاب آور ہے اور یورک ایسڈ کو جسم سے نکالتی ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ کولیسٹرول گھٹانے کیلئے بہترین سبزی ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے انتہائی ہلکا، ٹھنڈا اور زود ہضم کھانا ہے جو تیزابیت اور معدے کی گرانی کو دور کرتا ہے۔"
      }
    },
    "proTip": "مولی کے تازہ ہرے پتے کبھی مت پھینکیں، سارا ذائقہ اور اصل غذائیت پتوں میں ہوتی ہے۔",
    "estimatedCostPkr": 130,
    "tags": [
      "lunch",
      "sabzi",
      "winter",
      "mooli",
      "roti",
      "digestive",
      "dinner"
    ],
    "imageEmoji": "🥢"
  },
  {
    "id": "bhindi-masala-roti",
    "name": "Crispy Summer Bhindi Masala & Phulka Roti",
    "nativeName": "کرکری بھنڈی پیاز مصالحہ اور گرما گرم پھلکا روٹی",
    "category": "sabzi",
    "season": "summer",
    "seasonalNotes": "پاکستانی گرمیوں کا سب سے پسندیدہ دوپہر کا کھانا: تازی خستہ بھنڈی، ڈھیر سارا پیاز، ٹماٹر، ہری مرچیں اور گرما گرم پھلکا روٹی۔ شدید گرمی میں سب سے زیادہ پکنے والی سبزی۔",
    "prepTimeMins": 15,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "چوڑی لوہے کی کڑاہی یا نان سٹک پین",
      "type": "karahi",
      "reason": "کھلے برتن میں تیز آنچ پر تلنے سے بھنڈی کی لیس (لیس دار پن) فوراً ختم ہو جاتی ہے اور کرکری رہتی ہے۔",
      "healthBenefit": "بھنڈی میں پیکٹین اور حل پذیر فائبر ہوتا ہے جو گرمی کی حدت کم کر کے ہاضمہ ٹھنڈا رکھتا ہے۔"
    },
    "nutrition": {
      "calories": 195,
      "proteinG": 4,
      "carbsG": 22,
      "fatG": 10,
      "fiberG": 6,
      "sodiumMg": 230,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Summer Ladyfinger (Bhindi)",
        "nameUrdu": "گرمیوں کی تازی چھوٹی بھنڈی",
        "quantity": "750g",
        "category": "produce",
        "approxPkr": 75
      },
      {
        "name": "Onions (Lots of Pyaz)",
        "nameUrdu": "پیاز (سلائس کٹا ہوا)",
        "quantity": "500g",
        "category": "produce",
        "approxPkr": 45
      },
      {
        "name": "Tomatoes & Green Chillies",
        "nameUrdu": "سرخ ٹماٹر اور ہری مرچیں",
        "quantity": "3 pcs & 5 chillies",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Anardana / Amchur, Zeera, Haldi",
        "nameUrdu": "انار دانہ یا آمچور، زیرہ، ہلدی، لال مرچ",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 25
      },
      {
        "name": "Cooking Oil",
        "nameUrdu": "کوکنگ آئل",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 55
      }
    ],
    "instructions": [
      "بھنڈی کو پہلے دھوئیں، کپڑے سے اچھی طرح خشک کریں، پھر دونوں سرے کاٹ کر درمیانے ٹکڑے بنائیں۔",
      "کڑاہی میں تیل گرم کر کے کٹی بھنڈی تیز آنچ پر 5 منٹ فرائی کر کے الگ پلیٹ میں نکال لیں۔",
      "اسی تیل میں کٹا پیاز ڈالیں اور نرم و گلابی ہونے تک بھونیں۔ پھر ٹماٹر اور مصالحے شامل کریں۔",
      "تلی ہوئی بھنڈی اور کٹا انار دانہ شامل کر کے ہلکے ہاتھ سے مکس کریں۔",
      "ہلکی آنچ پر 5 منٹ دم دیں، پھر گرم گرم پھلکا روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "بھنڈی شوگر کے مریضوں کیلئے امرت مانی جاتی ہے کیونکہ یہ انسولین کی کارکردگی بڑھاتی ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ پوٹاشیم سے بھرپور سبزی بلڈ پریشر کو معتدل رکھتی ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے مریضوں کیلئے محفوظ اور ہلکی غذا ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ بھنڈی شریانوں میں کولیسٹرول کو جمع ہونے سے روکتی ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "بھنڈی کو کاٹنے کے بعد کبھی مت دھوئیں ورنہ لیس نہیں چھوٹے گی؛ پہلے دھو کر مکمل خشک کریں پھر کاٹیں۔",
    "estimatedCostPkr": 240,
    "tags": [
      "lunch",
      "sabzi",
      "summer",
      "bhindi",
      "roti",
      "favorite",
      "dinner"
    ],
    "imageEmoji": "🥒"
  },
  {
    "id": "karelay-pyaz-roti",
    "name": "Summer Karelay Pyaz Masala & Tandoori Roti",
    "nativeName": "کریلے پیاز مصالحہ / انار دانہ تڑکا اور تندوری روٹی",
    "category": "sabzi",
    "season": "summer",
    "seasonalNotes": "گرمیوں کی خاص سوغات: دیسی کریلے، پیاز مصالحہ، کچی امبی یا انار دانہ اور تندوری روٹی۔ گرمی کے موسم میں خون صاف کرنے والا لذیذ ترین کھانا۔",
    "prepTimeMins": 25,
    "cookTimeMins": 25,
    "servings": 4,
    "difficulty": "medium",
    "utensil": {
      "name": "لوہے کی کڑاہی (Iron Karahi)",
      "type": "karahi",
      "reason": "کڑاہی میں کریلے دھیمی آنچ پر خوب سنہری بھنتے ہیں جس سے کڑواہٹ لذیذ ذائقے میں بدل جاتی ہے۔",
      "healthBenefit": "کریلے میں پولی پیپٹائیڈ-پی ہوتا ہے جو قدرتی طور پر بلڈ شوگر نارمل کرتا ہے اور جگر صاف کرتا ہے۔"
    },
    "nutrition": {
      "calories": 185,
      "proteinG": 4,
      "carbsG": 20,
      "fatG": 10,
      "fiberG": 7,
      "sodiumMg": 210,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Summer Bitter Gourd (Karela)",
        "nameUrdu": "گرمیوں کے تازہ دیسی کریلے",
        "quantity": "750g",
        "category": "produce",
        "approxPkr": 70
      },
      {
        "name": "Sliced Onions (Lots of Pyaz)",
        "nameUrdu": "ڈھیر سارا سلائس پیاز",
        "quantity": "600g",
        "category": "produce",
        "approxPkr": 50
      },
      {
        "name": "Raw Mango (Kairi) / Anardana & Tomatoes",
        "nameUrdu": "کچی امبی (کیری) یا انار دانہ اور ٹماٹر",
        "quantity": "1 pc & 2 tomatoes",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Kalonji, Saunf, Zeera, Haldi",
        "nameUrdu": "کلونجی، سونف، زیرہ، ہلدی، کٹی لال مرچ",
        "quantity": "2 tbsp",
        "category": "spices",
        "approxPkr": 25
      },
      {
        "name": "Cooking Oil / Mustard Oil",
        "nameUrdu": "کوکنگ آئل یا سرسوں کا تیل",
        "quantity": "1/2 cup",
        "category": "pantry",
        "approxPkr": 70
      }
    ],
    "instructions": [
      "کریلوں کا چھلکا ہلکا کھرچ کر گول قتلے کاٹیں، نمک لگا کر 30 منٹ دھوپ میں رکھیں، پھر دھو کر اچھی طرح نچوڑیں۔",
      "کڑاہی میں تیل گرم کر کے نچوڑے ہوئے کریلے درمیانی آنچ پر سنہری براؤن فرائی کر کے نکال لیں۔",
      "باقی تیل میں کلونجی، سونف اور کٹا پیاز ڈال کر ہلکا سنہری بھونیں۔",
      "ٹماٹر، کچی امبی کے ٹکڑے اور مصالحے ڈال کر بھونیں، پھر تلے کریلے شامل کریں۔",
      "ہلکی آنچ پر 10 منٹ دم دیں تاکہ پیاز اور کریلے یکجان ہو جائیں۔ گرما گرم تندوری روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "شوگر کے مریضوں کیلئے دنیا کا سب سے مفید کھانا، خون میں گلوکوز تیزی سے کم کرتا ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ کلونجی اور سونف بلڈ پریشر کو پرسکون رکھتے ہیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے اخراج میں مددگار اور محفوظ ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ خون کی نالیوں کو چربی سے صاف کرتا ہے۔"
      },
      "stomach_digestive": {
        "status": "caution",
        "tip": "امی جان کیلئے: تیز مصالحے اور مرچیں معدے میں جلن کر سکتی ہیں؛ مرچیں بالکل ہلکی رکھیں اور دہی کا ٹھنڈا رائتہ ساتھ دیں۔",
        "substitute": "دیگی چکن یخنی پلاؤ یا تڑکا دال چاول"
      }
    },
    "proTip": "کریلوں کو کاٹ کر نمک لگا کر نچوڑنے سے کڑواہٹ 90 فیصد ختم ہو جاتی ہے، اور پیاز کی مقدار کریلوں کے برابر رکھیں۔",
    "estimatedCostPkr": 255,
    "tags": [
      "lunch",
      "sabzi",
      "summer",
      "karela",
      "roti",
      "healthy",
      "dinner"
    ],
    "imageEmoji": "🫑"
  },
  {
    "id": "tori-bhujia-roti",
    "name": "Fresh Summer Tori Bhujia & Soft Roti",
    "nativeName": "گھیاتوری کی ہلکی بھجیا اور نرم پھلکا روٹی",
    "category": "sabzi",
    "season": "summer",
    "seasonalNotes": "گرمیوں کی دوپہر کا ہلکا، زود ہضم اور ٹھنڈک بخش کھانا: کالی و گھیاتوری، زیرہ، سرخ ٹماٹر اور تازی نرم روٹی۔ گرمی کی شدت میں معدے کو سکون دیتی ہے۔",
    "prepTimeMins": 15,
    "cookTimeMins": 18,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "پتیلی یا لوہے کی کڑاہی",
      "type": "degchi",
      "reason": "توری اپنے ہی قدرتی پانی میں گلتی ہے، پتیلی میں ڈھکن لگا کر پکانے سے اس کی مٹھاس قائم رہتی ہے۔",
      "healthBenefit": "توری میں 94% قدرتی پانی ہوتا ہے جو لو اور گرمی کے تھپیڑوں سے ڈی ہائیڈریشن نہیں ہونے دیتا۔"
    },
    "nutrition": {
      "calories": 140,
      "proteinG": 3,
      "carbsG": 16,
      "fatG": 7,
      "fiberG": 5,
      "sodiumMg": 190,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Summer Ridge / Sponge Gourd (Tori)",
        "nameUrdu": "گرمیوں کی تازہ گھیاتوری یا کالی توری",
        "quantity": "1 kg",
        "category": "produce",
        "approxPkr": 60
      },
      {
        "name": "Onions & Ripe Tomatoes",
        "nameUrdu": "پیاز اور رس بھرے سرخ ٹماٹر",
        "quantity": "2 pcs each",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Green Chillies & Fresh Coriander",
        "nameUrdu": "ہری مرچیں اور ہرا دھنیا",
        "quantity": "3 pcs & bunch",
        "category": "produce",
        "approxPkr": 20
      },
      {
        "name": "Zeera, Haldi, Red Chilli & Salt",
        "nameUrdu": "سفید زیرہ، ہلدی، لال مرچ، نمک",
        "quantity": "1 tbsp",
        "category": "spices",
        "approxPkr": 15
      },
      {
        "name": "Cooking Oil / Desi Ghee",
        "nameUrdu": "کوکنگ آئل یا دیسی گھی",
        "quantity": "1/4 cup",
        "category": "pantry",
        "approxPkr": 45
      }
    ],
    "instructions": [
      "توری کا ہلکا چھلکا کھرچ کر گول قتلے کاٹ لیں۔",
      "برتن میں تیل گرم کر کے زیرہ کڑکڑائیں، پیاز سنہری کریں اور ٹماٹر بھونیں۔",
      "کٹی ہوئی توری شامل کریں اور چمچ چلا کر ڈھکن ڈھانپ دیں۔ (ایک قطرہ بھی پانی نہ ڈالیں)۔",
      "توری اپنا پانی چھوڑے گی، اسی پانی میں 12 منٹ دھیمی آنچ پر گلنے دیں۔",
      "ڈھکن کھول کر تیز آنچ پر پانی خشک کریں جب تک گھی الگ نہ ہو جائے۔ ہرا دھنیا چھڑک کر گرم روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "انتہائی کم کاربوہائیڈریٹ اور شوگر، شوگر کے مریضوں کیلئے بہترین ٹھنڈی سبزی۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ سوڈیم صفر اور پوٹاشیم زیادہ، بلڈ پریشر کے مریضوں کیلئے محفوظ۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے اخراج کیلئے بے حد ہلکی غذا ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ زیرو کولیسٹرول، دل اور معدے کو ٹھنڈک بخشتی ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے انتہائی ہلکا، ٹھنڈا اور زود ہضم کھانا ہے جو تیزابیت اور معدے کی گرانی کو دور کرتا ہے۔"
      }
    },
    "proTip": "توری میں کبھی پانی نہ ڈالیں، توری خود اتنا پانی چھوڑتی ہے کہ اسی میں گل کر مکھن بن جاتی ہے۔",
    "estimatedCostPkr": 180,
    "tags": [
      "lunch",
      "sabzi",
      "summer",
      "tori",
      "roti",
      "cooling",
      "dinner"
    ],
    "imageEmoji": "🥣"
  },
  {
    "id": "kaddu-lauki-roti",
    "name": "Desi Summer Lauki / Kaddu Salan & Hot Roti",
    "nativeName": "گھیا کدو / لوکی کا سالن اور گرما گرم روٹی",
    "category": "sabzi",
    "season": "summer",
    "seasonalNotes": "گرمیوں کے موسم کی سب سے برکت والی اور ٹھنڈک بخش سبزی: کدو/لوکی کا ہلکا مسالے دار سالن اور نرم پھلکا روٹی۔ جسم کی گرمی اور جلن کو فوری ٹھنڈا کرتا ہے۔",
    "prepTimeMins": 15,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "مٹی کی ہانڈی یا پتیلی",
      "type": "handi",
      "reason": "ہانڈی میں کدو دھیمی آنچ پر رس چھوڑ کر گلتا ہے جس سے اس کا ٹھنڈا مزاج اور مٹھاس محفوظ رہتی ہے۔",
      "healthBenefit": "کدو دل، جگر اور دماغ کو فرحت دیتا ہے اور شدید گرمی میں لو لگنے سے بچاتا ہے۔"
    },
    "nutrition": {
      "calories": 145,
      "proteinG": 3,
      "carbsG": 18,
      "fatG": 7,
      "fiberG": 5,
      "sodiumMg": 195,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Summer Bottle Gourd (Kaddu / Lauki)",
        "nameUrdu": "گرمیوں کا تازہ گھیا کدو یا لوکی",
        "quantity": "1 kg",
        "category": "produce",
        "approxPkr": 50
      },
      {
        "name": "Onions & Tomatoes",
        "nameUrdu": "پیاز اور ٹماٹر",
        "quantity": "2 pcs each",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Ginger, Garlic & Green Chillies",
        "nameUrdu": "ادرک، لہسن اور ہری مرچیں",
        "quantity": "1.5 tbsp",
        "category": "produce",
        "approxPkr": 25
      },
      {
        "name": "Zeera, Kalonji, Haldi & Dhaniya",
        "nameUrdu": "زیرہ، چٹکی کلونجی، ہلدی، پسا دھنیا",
        "quantity": "1 tbsp",
        "category": "spices",
        "approxPkr": 15
      },
      {
        "name": "Desi Ghee / Cooking Oil",
        "nameUrdu": "دیسی گھی یا کوکنگ آئل",
        "quantity": "1/4 cup",
        "category": "pantry",
        "approxPkr": 45
      }
    ],
    "instructions": [
      "کدو چھیل کر ٹکڑوں میں کاٹ لیں۔ کدو چکھ لیں کہ کہیں کڑوا تو نہیں (کڑوا کدو نہیں پکانا چاہیے)۔",
      "ہانڈی میں گھی گرم کر کے زیرہ، کلونجی اور پیاز سنہری کریں۔ ادرک لہسن اور ٹماٹر بھونیں۔",
      "کدو کے ٹکڑے شامل کر کے 2 منٹ چمچ چلائیں۔",
      "ڈھکن ڈھانپ کر ہلکی آنچ پر 15 منٹ پکائیں تاکہ کدو اپنے ہی پانی میں گل جائے۔",
      "ہرا دھنیا چھڑک کر گرم گرم پھلکا روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "کدو شوگر کے مریضوں کیلئے بہترین قدرتی دوا ہے، لبلبے کو طاقت دیتا ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ ہائی بلڈ پریشر اور گرمی دور کرنے کیلئے انتہائی آزمودہ کھانا ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "گردوں کو واش کرتا ہے اور یورک ایسڈ کم کرتا ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ دل کے مریضوں کیلئے سب سے محفوظ اور ہلکی غذا ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے انتہائی ہلکا، ٹھنڈا اور زود ہضم کھانا ہے جو تیزابیت اور معدے کی گرانی کو دور کرتا ہے۔"
      }
    },
    "proTip": "کدو کاٹنے سے پہلے چھوٹا سا ٹکڑا چکھ لیں کہ کڑوا نہ ہو۔ کلونجی کا بگھار لگائیں، برکت اور ذائقہ دونوں ملیں گے۔",
    "estimatedCostPkr": 175,
    "tags": [
      "lunch",
      "sabzi",
      "summer",
      "lauki",
      "kaddu",
      "roti",
      "hydrating",
      "dinner"
    ],
    "imageEmoji": "🍲"
  },
  {
    "id": "tinda-masala-roti",
    "name": "Summer Tinda Masala & Fresh Roti",
    "nativeName": "دیسی ٹینڈے مصالحہ اور تازی روٹی",
    "category": "sabzi",
    "season": "summer",
    "seasonalNotes": "گرمیوں کی خاص سبزی: چھوٹے گول دیسی ٹینڈے، بھنا ہوا پیاز ٹماٹر مصالحہ، ہرا دھنیا اور گرم روٹی۔ روایتی پاکستانی دوپہر کی من پسند غذا۔",
    "prepTimeMins": 15,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "پتیلی یا کڑاہی",
      "type": "karahi",
      "reason": "ٹینڈے مصالحے میں تیز آنچ پر بھن کر دم پر مکھن کی طرح نرم ہوتے ہیں۔",
      "healthBenefit": "ٹینڈے میں وٹامن اے، سی اور معدنیات وافر ہوتے ہیں جو گرمی میں معدے کو تیزابیت سے بچاتے ہیں۔"
    },
    "nutrition": {
      "calories": 160,
      "proteinG": 3,
      "carbsG": 19,
      "fatG": 8,
      "fiberG": 5,
      "sodiumMg": 210,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Summer Apple Gourd (Tinda)",
        "nameUrdu": "گرمیوں کے تازہ چھوٹے دیسی ٹینڈے",
        "quantity": "1 kg",
        "category": "produce",
        "approxPkr": 60
      },
      {
        "name": "Onions & Tomatoes",
        "nameUrdu": "پیاز اور ٹماٹر",
        "quantity": "2 pcs each",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Ginger, Garlic & Chillies",
        "nameUrdu": "ادرک، لہسن اور ہری مرچیں",
        "quantity": "2 tbsp",
        "category": "produce",
        "approxPkr": 25
      },
      {
        "name": "Zeera, Haldi, Lal Mirch & Kasuri Methi",
        "nameUrdu": "زیرہ، ہلدی، لال مرچ، قصوری میتھی",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 20
      },
      {
        "name": "Cooking Oil / Ghee",
        "nameUrdu": "کوکنگ آئل یا گھی",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 50
      }
    ],
    "instructions": [
      "ٹینڈوں کا ہلکا چھلکا اتار کر چار چار پھانکیں بنا لیں (اگر بیج سخت ہوں تو نکال دیں)۔",
      "کڑاہی میں تیل گرم کر کے زیرہ کڑکڑائیں اور پیاز سنہری کریں۔ ادرک لہسن اور ٹماٹر بھون کر گاڑھا مصالحہ بنائیں۔",
      "ٹینڈے شامل کر کے تیز آنچ پر 3 منٹ بھونیں۔",
      "آدھا کپ پانی ڈال کر ہلکی آنچ پر ڈھکن لگا کر 12 منٹ دم دیں جب تک ٹینڈے نرم نہ ہو جائیں۔",
      "قصوری میتھی اور ہرا دھنیا چھڑک کر گرما گرم پھلکا روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "کاربوہائیڈریٹ بہت کم ہیں، شوگر کے مریضوں کیلئے بالکل محفوظ ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ بلڈ پریشر کو قابو میں رکھنے کیلئے بہترین سبزی ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے مریضوں کیلئے محفوظ ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ زیرو کولیسٹرول، دل کیلئے ہلکا کھانا۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "ٹینڈے ہمیشہ چھوٹے اور نرم خریدیں جن کے بیج کچے ہوں، بڑے اور پکے بیج والے ٹینڈے سخت رہتے ہیں۔",
    "estimatedCostPkr": 195,
    "tags": [
      "lunch",
      "sabzi",
      "summer",
      "tinda",
      "roti",
      "traditional",
      "dinner"
    ],
    "imageEmoji": "🧅"
  },
  {
    "id": "aloo-baingan-roti",
    "name": "Achari Aloo Baingan Masala & Hot Roti",
    "nativeName": "چٹپٹا آلو بینگن کا سالن اور گرم روٹی",
    "category": "sabzi",
    "season": "summer",
    "seasonalNotes": "گرمیوں کے چمکدار کالے بینگن اور آلو، کلونجی، میتھی دانے اور سونف کے اچاری تڑکے کے ساتھ گرما گرم روٹی۔ دوپہر کی اشتہا انگیز اور چٹپٹی ڈش۔",
    "prepTimeMins": 15,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "لوہے کی کڑاہی (Iron Karahi)",
      "type": "karahi",
      "reason": "کڑاہی میں بینگن تیز آنچ پر بھن کر مکھن جیسے ملائم ہو جاتے ہیں اور اچاری مصالحہ رچ بس جاتا ہے۔",
      "healthBenefit": "بینگن میں نیسونین اور اینتھوسیانین اینٹی آکسیڈنٹس ہوتے ہیں جو دماغ اور خلیات کو طاقت دیتے ہیں۔"
    },
    "nutrition": {
      "calories": 210,
      "proteinG": 4,
      "carbsG": 27,
      "fatG": 10,
      "fiberG": 7,
      "sodiumMg": 240,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Summer Eggplants (Baingan)",
        "nameUrdu": "گرمیوں کے تازہ کالے بینگن",
        "quantity": "750g",
        "category": "produce",
        "approxPkr": 60
      },
      {
        "name": "Potatoes (Aloo)",
        "nameUrdu": "آلو ٹکڑے",
        "quantity": "300g",
        "category": "produce",
        "approxPkr": 35
      },
      {
        "name": "Onions, Tomatoes & Chillies",
        "nameUrdu": "پیاز، ٹماٹر اور ہری مرچیں",
        "quantity": "2 pcs each & 3 chillies",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Achar Masala (Kalonji, Saunf, Methi Dana)",
        "nameUrdu": "آچار مصالحہ (کلونجی، سونف، میتھی دانہ، رائی)",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 25
      },
      {
        "name": "Mustard Oil / Cooking Oil",
        "nameUrdu": "سرسوں کا تیل یا کوکنگ آئل",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 55
      }
    ],
    "instructions": [
      "بینگن اور آلو کو درمیانے ٹکڑوں میں کاٹ لیں (بینگن کو پانی میں رکھیں تاکہ کالے نہ ہوں)۔",
      "کڑاہی میں تیل گرم کر کے آچار مصالحہ (کلونجی، سونف، رائی) کڑکڑائیں۔",
      "پیاز، ادرک لہسن اور ٹماٹر بھون کر چٹپٹا مصالحہ تیار کریں۔",
      "آلو اور نچوڑے ہوئے بینگن شامل کریں، ہلکا مکس کر کے ڈھکن ڈھانپ دیں۔",
      "ہلکی آنچ پر 12 منٹ دم دیں جب تک آلو اور بینگن گل نہ جائیں۔ ہرا دھنیا ڈال کر گرم روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "بینگن میں کاربوہائیڈریٹ بہت کم ہیں اور فائبر زیادہ، آلو کم کھائیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ کلونجی اور سونف بلڈ پریشر کیلئے مفید ہیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے مریضوں کیلئے محفوظ سبزی ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ بینگن شریانوں سے کولیسٹرول گھٹانے میں معاون ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "بینگن کاٹتے ہی پانی کے پیالے میں ڈالیں تاکہ ان کا رس کالا نہ ہو اور پکتے وقت سبزی چمکدار بنے۔",
    "estimatedCostPkr": 215,
    "tags": [
      "lunch",
      "sabzi",
      "summer",
      "baingan",
      "roti",
      "flavorful",
      "dinner"
    ],
    "imageEmoji": "🍆"
  },
  {
    "id": "arvi-masala-roti",
    "name": "Spiced Summer Arvi Masala & Hot Roti",
    "nativeName": "مسالے دار اروی، لیموں کا رس اور گرما گرم روٹی",
    "category": "sabzi",
    "season": "summer",
    "seasonalNotes": "گرمیوں اور برسات کی روایتی خاص سبزی: خستہ تلی ہوئی اروی، اجوائن، بھنا ہوا پیاز ٹماٹر مصالحہ، نچوڑا ہوا لیموں اور گرم پھلکا روٹی۔",
    "prepTimeMins": 20,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "medium",
    "utensil": {
      "name": "لوہے کی کڑاہی (Iron Karahi)",
      "type": "karahi",
      "reason": "تیز تیل میں اروی فرائی کرنے سے اس کا لیس دار پن ختم ہو جاتا ہے اور باہر سے خستہ سنہری بنتی ہے۔",
      "healthBenefit": "اروی میں فائبر، پوٹاشیم اور وٹامن ای ہوتا ہے جو بلڈ پریشر اور جلد کی چمک کیلئے مفید ہے۔"
    },
    "nutrition": {
      "calories": 220,
      "proteinG": 4,
      "carbsG": 30,
      "fatG": 10,
      "fiberG": 7,
      "sodiumMg": 230,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Fresh Summer / Monsoon Taro Root (Arvi)",
        "nameUrdu": "گرمیوں کی تازہ اروی",
        "quantity": "750g",
        "category": "produce",
        "approxPkr": 75
      },
      {
        "name": "Onions & Tomatoes",
        "nameUrdu": "پیاز اور ٹماٹر",
        "quantity": "2 pcs each",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Fresh Lemon & Green Chillies",
        "nameUrdu": "تازہ لیموں کا رس اور ہری مرچیں",
        "quantity": "2 lemons & 4 chillies",
        "category": "produce",
        "approxPkr": 25
      },
      {
        "name": "Ajwain, Zeera, Haldi, Chaat Masala",
        "nameUrdu": "اجوائن، زیرہ، ہلدی، لال مرچ، چاٹ مصالحہ",
        "quantity": "2 tbsp",
        "category": "spices",
        "approxPkr": 25
      },
      {
        "name": "Cooking Oil",
        "nameUrdu": "کوکنگ آئل",
        "quantity": "1/2 cup",
        "category": "pantry",
        "approxPkr": 70
      }
    ],
    "instructions": [
      "اروی کو چھیل کر گول قتلے کاٹیں، نمک اور ذرا سا آٹا لگا کر 15 منٹ رکھیں، پھر اچھی طرح دھو کر کپڑے سے خشک کریں۔",
      "کڑاہی میں تیل گرم کر کے اروی کو تیز آنچ پر ہلکا سنہری فرائی کر کے نکال لیں۔",
      "باقی تیل میں اجوائن اور زیرہ کڑکڑائیں، پیاز اور ٹماٹر بھون کر مسالے دار گریوی تیار کریں۔",
      "تلی ہوئی اروی شامل کریں، تھوڑا سا پانی چھڑک کر ہلکی آنچ پر 8 منٹ دم دیں تاکہ اروی مکھن جیسی گل جائے۔",
      "اوپر تازہ لیموں کا رس اور ہرا دھنیا نچوڑیں اور گرم روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "اروی میں نشاستہ (Starches) ہوتا ہے، شوگر کے مریض اعتدال میں کھائیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ اجوائن اروی کا بادی پن دور کرتی ہے اور بلڈ پریشر پر نرم ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "یورک ایسڈ کے مریضوں کیلئے محفوظ سبزی ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ فائبر سے بھرپور سبزی ہے جو شریانوں کو صاف رکھتی ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "اروی کو نمک اور تھوڑا سا سوکھا آٹا لگا کر دھونے سے ساری لیس نکل جاتی ہے اور ہاتھ میں کھجلی بھی نہیں ہوتی۔",
    "estimatedCostPkr": 235,
    "tags": [
      "lunch",
      "sabzi",
      "summer",
      "arvi",
      "roti",
      "monsoon-summer",
      "dinner"
    ],
    "imageEmoji": "🥔"
  },
  {
    "id": "white-rice-moong-masoor",
    "name": "White Boiled Rice & Tarka Moong Masoor Daal",
    "nativeName": "سفید ابلے چاول اور تڑکا مونگ مسور دال (مع کچومبر و اچار)",
    "category": "daal",
    "season": "all",
    "seasonalNotes": "پاکستان کے ہر گھر کا پسندیدہ رات کا کھانا: سفید ابلے ہوئے باسمتی چاول، لہسن، زیرہ اور دیسی گھی کے تڑکے والی مونگ مسور دال، ساتھ کچومبر سلاد اور آم کا اچار۔",
    "prepTimeMins": 15,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "پتیلی اور بگھار پین (Tarka Pan)",
      "type": "degchi",
      "reason": "دال دھیمی آنچ پر ملائم گھلتی ہے اور دیسی گھی کے تڑکے کی خوشبو پورے سالن میں رچ بس جاتی ہے۔",
      "healthBenefit": "دال چاول مکمل امائنو ایسڈز اور نباتاتی پروٹین کا مجموعہ ہے جو رات کو معدے پر ہلکا رہتا ہے۔"
    },
    "nutrition": {
      "calories": 380,
      "proteinG": 16,
      "carbsG": 64,
      "fatG": 8,
      "fiberG": 7,
      "sodiumMg": 340,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Moong & Masoor Daal",
        "nameUrdu": "دال مونگ اور دال مسور (برابر وزن)",
        "quantity": "250g",
        "category": "pantry",
        "approxPkr": 95
      },
      {
        "name": "Super Basmati Rice",
        "nameUrdu": "سپر باسمتی چاول (سفید ابلے)",
        "quantity": "450g",
        "category": "pantry",
        "approxPkr": 155
      },
      {
        "name": "Garlic, Ginger & Green Chillies",
        "nameUrdu": "دیسی لہسن کے جوئے، ادرک، ہری مرچیں",
        "quantity": "2 tbsp",
        "category": "produce",
        "approxPkr": 25
      },
      {
        "name": "Desi Ghee / Cooking Oil for Tarka",
        "nameUrdu": "دیسی گھی یا کوکنگ آئل (تڑکے کیلئے)",
        "quantity": "1/4 cup",
        "category": "pantry",
        "approxPkr": 65
      },
      {
        "name": "Zeera, Sabut Lal Mirch, Curry Leaves",
        "nameUrdu": "سفید زیرہ، گول لال مرچ، کڑھی پتہ، ہلدی",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 20
      },
      {
        "name": "Cucumber, Onion & Mango Achar",
        "nameUrdu": "کھیرا، پیاز، لیموں کچومبر اور آم کا اچار",
        "quantity": "salad & achar",
        "category": "produce",
        "approxPkr": 40
      }
    ],
    "instructions": [
      "دال کو دھو کر 3 گلاس پانی، نمک، ہلدی اور لہسن ڈال کر 15 منٹ پکائیں اور ڈوئی سے ہلکا سا گھوٹیں۔",
      "الگ پین میں دیسی گھی گرم کر کے کٹا لہسن، زیرہ، گول لال مرچ اور کڑھی پتہ کا تڑکا لگائیں اور فوراً ڈھانپ دیں۔",
      "دیگچی میں پانی ابال کر باسمتی چاول ایک کنی پر نتھار لیں یا دم پر ابلے چاول تیار کریں۔",
      "گرم چاولوں پر تڑکا دال ڈالیں، ساتھ تازہ کچومبر سلاد اور اچار رکھ کر روایتی شام کا کھانا پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "دال زیادہ اور چاول کم مقدار میں کچومبر سلاد کے ساتھ لیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ کم نمک میں تیار دال چاول بلڈ پریشر کیلئے محفوظ اور زود ہضم ہیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "مونگ مسور دال گوشت کے مقابلے میں یورک ایسڈ کیلئے ہلکی اور محفوظ ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ زیرو کولیسٹرول، دل اور معدے کو رات کو پرسکون رکھتا ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے انتہائی ہلکا، ٹھنڈا اور زود ہضم کھانا ہے جو تیزابیت اور معدے کی گرانی کو دور کرتا ہے۔"
      }
    },
    "proTip": "تڑکے میں لہسن ہلکا گلابی سنہری کریں، جلائیں مت؛ اور تڑکا لگتے ہی ڈھکن 2 منٹ بند رکھیں تاکہ خوشبو اندر قید ہو جائے۔",
    "estimatedCostPkr": 400,
    "tags": [
      "dinner",
      "daal-chawal",
      "white-rice",
      "comfort-food",
      "popular",
      "everyday"
    ],
    "imageEmoji": "🍛"
  },
  {
    "id": "white-rice-daal-chana",
    "name": "White Boiled Rice & Dhaba Tarka Daal Chana",
    "nativeName": "سفید ابلے چاول اور ڈھابہ تڑکا دال چنا",
    "category": "daal",
    "season": "all",
    "seasonalNotes": "رات کے کھانے کا شاہکار: ڈھابہ اسٹائل دیسی گھی اور زیرہ تڑکا دال چنا، ساتھ گرم سفید ابلے باسمتی چاول اور پیاز کے لچھے۔",
    "prepTimeMins": 20,
    "cookTimeMins": 30,
    "servings": 4,
    "difficulty": "medium",
    "utensil": {
      "name": "پریشر ککر یا ہانڈی اور تڑکا پین",
      "type": "pressure_cooker",
      "reason": "دال چنا ککر میں 12 منٹ میں مکمل گل کر مکھن جیسی ملائم ہو جاتی ہے لیکن دانہ سلامت رہتا ہے۔",
      "healthBenefit": "چنے کی دال میں پروٹین اور فائبر وافر ہوتا ہے جو بلڈ شوگر کو رات بھر مستحکم رکھتا ہے۔"
    },
    "nutrition": {
      "calories": 410,
      "proteinG": 18,
      "carbsG": 66,
      "fatG": 9,
      "fiberG": 9,
      "sodiumMg": 350,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Chana Daal (Split Bengal Gram)",
        "nameUrdu": "دال چنا (بھگوئی ہوئی)",
        "quantity": "300g",
        "category": "pantry",
        "approxPkr": 110
      },
      {
        "name": "Super Basmati Rice",
        "nameUrdu": "سپر باسمتی چاول",
        "quantity": "450g",
        "category": "pantry",
        "approxPkr": 155
      },
      {
        "name": "Onions, Tomatoes & Ginger",
        "nameUrdu": "پیاز، ٹماٹر اور باریک ادرک",
        "quantity": "2 pcs each & 2 tbsp",
        "category": "produce",
        "approxPkr": 45
      },
      {
        "name": "Desi Ghee / Butter for Tarka",
        "nameUrdu": "دیسی گھی یا مکھن تڑکے کیلئے",
        "quantity": "1/3 cup",
        "category": "dairy",
        "approxPkr": 85
      },
      {
        "name": "Zeera, Kasoori Methi, Sabut Lal Mirch",
        "nameUrdu": "سفید زیرہ، قصوری میتھی، گول مرچ، لونگ",
        "quantity": "2 tbsp",
        "category": "spices",
        "approxPkr": 25
      }
    ],
    "instructions": [
      "دال چنا کو 1 گھنٹہ بھگوئیں، پھر نمک اور ہلدی کے ساتھ پریشر ککر میں 12 منٹ ابال لیں تاکہ دانہ نرم ہو۔",
      "الگ کڑاہی میں پیاز اور ٹماٹر کا چٹپٹا مصالحہ بھونیں اور ابلے ہوئے دال چنا اس میں شامل کریں۔",
      "تڑکا پین میں دیسی گھی گرم کر کے زیرہ، کٹا لہسن، قصوری میتھی اور ہری مرچوں کا روغنی تڑکا لگائیں۔",
      "دیگچی میں سفید باسمتی چاول ابال کر چھان لیں۔",
      "گرما گرم سفید چاولوں کے ساتھ تڑکا دال چنا اور پیاز لیموں پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "دال چنا کا گلیسیمک انڈیکس بہت کم ہے، شوگر کیلئے تمام دالوں میں سب سے بہترین ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ تڑکے میں نمک معتدل رکھیں۔"
      },
      "uric_acid": {
        "status": "caution",
        "tip": "دال چنا میں پیورینز ہوتے ہیں، یورک ایسڈ کے مریض ہفتے میں ایک دن اعتدال میں کھائیں۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ فائبر سے بھرپور نباتاتی کھانا دل کیلئے مفید ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "دال چنا کو گلانے کے بعد مکمل میش نہ کریں؛ دانہ الگ الگ اور نرم ہو تبھی اصل ڈھابہ ذائقہ ملتا ہے۔",
    "estimatedCostPkr": 420,
    "tags": [
      "dinner",
      "daal-chawal",
      "white-rice",
      "chana-daal",
      "popular"
    ],
    "imageEmoji": "🥣"
  },
  {
    "id": "white-rice-sabut-masoor",
    "name": "White Rice, Sabut Masoor Daal & Shami Kabab",
    "nativeName": "سفید ابلے چاول، ثابت کالی مسور دال اور شامی کباب",
    "category": "daal",
    "season": "all",
    "seasonalNotes": "پاکستانی گھرانوں کا کلاسک کھانا: دیسی لہسن بگھار والی کالی مسور کی دال (ملکہ مسور)، سفید ابلے چاول، کرسپی شامی کباب اور پودینہ چٹنی۔",
    "prepTimeMins": 20,
    "cookTimeMins": 25,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "پریشر ککر اور تڑکا پین",
      "type": "pressure_cooker",
      "reason": "ثابت مسور ککر میں یکساں گھلتی ہے اور اس کی لذیذ مٹیاری خوشبو برقرار رہتی ہے۔",
      "healthBenefit": "ثابت مسور میں آئرن، میگنیشیم اور زنک وافر ہوتے ہیں جو خون اور توانائی بڑھاتے ہیں۔"
    },
    "nutrition": {
      "calories": 440,
      "proteinG": 20,
      "carbsG": 68,
      "fatG": 10,
      "fiberG": 8,
      "sodiumMg": 360,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "Sabut Kali Masoor Daal (Whole Black Lentils)",
        "nameUrdu": "ثابت کالی مسور کی دال",
        "quantity": "250g",
        "category": "pantry",
        "approxPkr": 90
      },
      {
        "name": "Super Basmati White Rice",
        "nameUrdu": "سپر باسمتی سفید چاول",
        "quantity": "400g",
        "category": "pantry",
        "approxPkr": 140
      },
      {
        "name": "Ready Shami Kababs (Chicken / Beef)",
        "nameUrdu": "تیار شامی کباب (چکن یا بیف)",
        "quantity": "4 pcs",
        "category": "meat",
        "approxPkr": 160
      },
      {
        "name": "Garlic, Chillies, Cumin & Desi Ghee",
        "nameUrdu": "لہسن، ہری مرچیں، زیرہ، دیسی گھی",
        "quantity": "tarka mix",
        "category": "pantry",
        "approxPkr": 60
      },
      {
        "name": "Mint, Coriander & Yogurt (Chutney)",
        "nameUrdu": "پودینہ، دھنیا اور دہی کی چٹنی",
        "quantity": "1 bowl",
        "category": "dairy",
        "approxPkr": 35
      }
    ],
    "instructions": [
      "ثابت مسور دال کو دھو کر پریشر ککر میں نمک، ہلدی اور کٹے لہسن کے ساتھ 15 منٹ پکا کر نرم کریں۔",
      "پین میں دیسی گھی میں لہسن کے باریک ٹکڑے، زیرہ اور ہری مرچوں کا تیز بگھار لگائیں۔",
      "الگ پین میں انڈے میں ڈپ کر کے شامی کباب سنہری فرائی کریں۔",
      "دیگچی میں ابلے سفید چاول تیار کریں۔",
      "سفید چاولوں پر کالی مسور کی دال ڈالیں، ساتھ شامی کباب، پودینہ چٹنی اور اچار رکھ کر پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "ثابت مسور چھلکے والی دال ہے اس لیے فائبر زیادہ ہے اور شوگر کو آہستہ جذب کرتی ہے۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ ہلکے مصالحے اور کم نمک میں تیار یہ کھانا بلڈ پریشر پر نرم ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "اعتدال میں کھائیں، کباب کی جگہ سلاد بڑھا سکتے ہیں۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ قدرتی فائبر شریانوں کو صاف رکھتا ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "کالی مسور کی دال میں لہسن کا تڑکا تھوڑا زیادہ رکھیں، اس دال کا اصل ذائقہ لہسن کے بگھار سے ہی نکھرتا ہے۔",
    "estimatedCostPkr": 485,
    "tags": [
      "dinner",
      "daal-chawal",
      "white-rice",
      "shami-kabab",
      "favorite"
    ],
    "imageEmoji": "🍲"
  },
  {
    "id": "daal-mash-fry",
    "name": "Dhaba Style Bhuni Daal Mash & Hot Roti",
    "nativeName": "ڈھابہ فرائی دال ماش، مکھن اور تندوری روٹی",
    "category": "daal",
    "season": "all",
    "seasonalNotes": "رات کے کھانے کی مشہور سوغات: مکھن اور دیسی گھی میں بھنی ہوئی کھڑی دال ماش، ادرک کے لچھے، کالی مرچ، ہری مرچیں اور گرما گرم روٹی۔",
    "prepTimeMins": 15,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "medium",
    "utensil": {
      "name": "لوہے کی کڑاہی (Iron Karahi)",
      "type": "karahi",
      "reason": "کڑاہی میں دال ماش تیز آنچ پر بغیر ٹوٹے بھنتی ہے اور دانہ الگ الگ اور نرم رہتا ہے۔",
      "healthBenefit": "دال ماش پٹھوں اور اعصاب کو طاقت دیتی ہے اور جسمانی کمزوری دور کرتی ہے۔"
    },
    "nutrition": {
      "calories": 320,
      "proteinG": 17,
      "carbsG": 42,
      "fatG": 11,
      "fiberG": 7,
      "sodiumMg": 310,
      "glycemicIndex": "Low"
    },
    "ingredients": [
      {
        "name": "White Urad Daal (Dhuli Mash Daal)",
        "nameUrdu": "دھلی سفید دال ماش",
        "quantity": "300g",
        "category": "pantry",
        "approxPkr": 120
      },
      {
        "name": "Ginger Julienne & Green Chillies",
        "nameUrdu": "باریک ادرک کے لچھے اور ہری مرچیں",
        "quantity": "3 tbsp & 4 chillies",
        "category": "produce",
        "approxPkr": 30
      },
      {
        "name": "Onions & Tomatoes",
        "nameUrdu": "پیاز اور باریک کٹے ٹماٹر",
        "quantity": "2 pcs each",
        "category": "produce",
        "approxPkr": 40
      },
      {
        "name": "Butter / Desi Ghee",
        "nameUrdu": "مکھن یا دیسی گھی",
        "quantity": "1/3 cup",
        "category": "dairy",
        "approxPkr": 85
      },
      {
        "name": "Black Pepper, Zeera, Garam Masala",
        "nameUrdu": "کالی مرچ پاؤڈر، زیرہ، پسا گرم مصالحہ",
        "quantity": "1.5 tbsp",
        "category": "spices",
        "approxPkr": 25
      }
    ],
    "instructions": [
      "دال ماش کو 30 منٹ بھگوئیں، پھر نمک ڈال کر 85% تک ابال لیں تاکہ دانہ گلا ہو لیکن حلوہ نہ بنے۔ نتھار لیں۔",
      "کڑاہی میں مکھن اور گھی گرم کر کے زیرہ کڑکڑائیں، پیاز اور ٹماٹر بھون کر مصالحہ بنائیں۔",
      "ابلی ہوئی دال ماش شامل کر کے تیز آنچ پر 3 منٹ ہلکے ہاتھ سے فرائی کریں۔",
      "کالی مرچ، کٹا ادرک اور ہری مرچیں ڈال کر ہلکی آنچ پر 5 منٹ دم دیں۔",
      "اوپر ہرا دھنیا چھڑکیں اور گرم تندوری روٹی کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "safe",
        "tip": "دال ماش میں کاربوہائیڈریٹ معتدل ہیں، شوگر کے مریض گندم کی روٹی کے ساتھ لیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ ادرک اور کالی مرچ ہاضمہ تیز کرتی ہیں اور بی پی پر ہلکی ہیں۔"
      },
      "uric_acid": {
        "status": "caution",
        "tip": "دال ماش بادی ہوتی ہے، یورک ایسڈ کے مریض ہفتے میں ایک دن اعتدال میں لیں۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ مکھن معتدل مقدار میں استعمال کریں۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "دال ماش کو ابالتے وقت 80 فیصد پر ہی اتار لیں، اگر زیادہ ابل گئی تو بھونتے وقت حلوہ بن جائے گی دانہ الگ نہیں رہے گا۔",
    "estimatedCostPkr": 300,
    "tags": [
      "dinner",
      "daal",
      "daal-mash",
      "dhaba-style",
      "roti",
      "popular"
    ],
    "imageEmoji": "🫓"
  },
  {
    "id": "chicken-biryani",
    "name": "Karachi / Sindhi Chicken Dum Biryani & Mint Raita",
    "nativeName": "کراچی و سندھی چکن دم بریانی اور پودینہ رائتہ",
    "category": "rice",
    "season": "all",
    "seasonalNotes": "پاکستان کے رات کے کھانے کا بے تاج بادشاہ: زعفرانی سپر باسمتی چاول، چٹپٹا چکن مصالحہ قورمہ، آلو بخارا، تلی پیاز اور ٹھنڈا پودینہ رائتہ۔",
    "prepTimeMins": 30,
    "cookTimeMins": 45,
    "servings": 6,
    "difficulty": "medium",
    "utensil": {
      "name": "بھاری پیندے کی دیگچی (Biryani Degchi)",
      "type": "degchi",
      "reason": "بھاری دیگچی میں چاول نیچے نہیں لگتے اور بھاپ میں دم یکساں لگتا ہے جس سے چاول کھل کر لمبا ہوتا ہے۔",
      "healthBenefit": "چکن کا پروٹین، چاول اور دہی کا رائتہ رات کو جسم کو بھرپور توانائی اور تسکین فراہم کرتے ہیں۔"
    },
    "nutrition": {
      "calories": 540,
      "proteinG": 32,
      "carbsG": 68,
      "fatG": 18,
      "fiberG": 4,
      "sodiumMg": 520,
      "glycemicIndex": "Medium"
    },
    "ingredients": [
      {
        "name": "Fresh Chicken Pieces",
        "nameUrdu": "تازہ چکن بوٹی",
        "quantity": "1 kg",
        "category": "meat",
        "approxPkr": 650
      },
      {
        "name": "Super Basmati Rice",
        "nameUrdu": "سپر باسمتی چاول (پختہ)",
        "quantity": "750g",
        "category": "pantry",
        "approxPkr": 260
      },
      {
        "name": "Yogurt & Fried Crispy Onions",
        "nameUrdu": "تازہ دہی اور تلی ہوئی گولڈن پیاز",
        "quantity": "250g & 200g",
        "category": "dairy",
        "approxPkr": 110
      },
      {
        "name": "Tomatoes, Mint & Green Chillies",
        "nameUrdu": "سرخ ٹماٹر، تازہ پودینہ، ہری مرچیں",
        "quantity": "350g & leaves",
        "category": "produce",
        "approxPkr": 65
      },
      {
        "name": "Biryani Masala, Aloo Bukhara, Kewra",
        "nameUrdu": "بریانی مصالحہ، آلو بخارا، کیوڑا واٹر، زردہ رنگ",
        "quantity": "special mix",
        "category": "spices",
        "approxPkr": 55
      },
      {
        "name": "Cooking Oil / Ghee",
        "nameUrdu": "کوکنگ آئل یا گھی",
        "quantity": "1/2 cup",
        "category": "pantry",
        "approxPkr": 90
      }
    ],
    "instructions": [
      "باسمتی چاولوں کو ثابت گرم مصالحے (بادیان، لونگ، تیز پتہ) کے ساتھ 75% (ایک کنی) ابال کر چھان لیں۔",
      "دیگچی میں چکن، ادرک لہسن، ٹماٹر، دہی اور بریانی مصالحے کا چٹپٹا گریوی قورمہ تیار کریں۔",
      "قورمے کے اوپر ابلے چاولوں کی پہلی تہہ اور پھر دوسری تہہ لگائیں۔",
      "اوپر تلی پیاز، پودینہ کے پتے، لیموں کے سلائس، کیوڑا اور زردہ رنگ چھڑک کر 15 منٹ دھیمی آنچ پر دم دیں۔",
      "ہلکے ہاتھ سے چاول کھولیں اور ٹھنڈے پودینہ رائتے کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "چاول کاربوہائیڈریٹ بڑھاتے ہیں، چکن بوٹی اور رائتہ زیادہ اور چاول ایک چھوٹی پلیٹ لیں۔"
      },
      "hypertension": {
        "status": "caution",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ بریانی مصالحے میں نمک اعتدال میں رکھیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "چکن کا سفید گوشت بیف کے مقابلے میں یورک ایسڈ کیلئے محفوظ ہے۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ تیل کم رکھیں اور چکن کی کھال اتار کر پکائیں۔"
      },
      "stomach_digestive": {
        "status": "caution",
        "tip": "امی جان کیلئے: تیز مصالحے اور مرچیں معدے میں جلن کر سکتی ہیں؛ مرچیں بالکل ہلکی رکھیں اور دہی کا ٹھنڈا رائتہ ساتھ دیں۔",
        "substitute": "دیگی چکن یخنی پلاؤ یا تڑکا دال چاول"
      }
    },
    "proTip": "چاولوں کو ایک کنی پر ہی اتاریں تاکہ دم لگاتے وقت قورمے کی نمی سے چاول لمبا اور نکھرا بنے، ٹوٹے نہیں۔",
    "estimatedCostPkr": 1230,
    "tags": [
      "dinner",
      "biryani",
      "chicken",
      "rice",
      "popular",
      "weekend-favorite"
    ],
    "imageEmoji": "🍗"
  },
  {
    "id": "chicken-pulao",
    "name": "Degi Yakhni Chicken Pulao & Zeera Raita",
    "nativeName": "دیگی یخنی چکن پلاؤ اور زیرہ رائتہ",
    "category": "rice",
    "season": "all",
    "seasonalNotes": "شام اور رات کا خوشبودار و ہلکا کھانا: سونف اور ثابت دھنیا کی خالص چکن یخنی میں پکا روایتی دیگی پلاؤ اور ٹھنڈا زیرہ رائتہ۔ ہاضمے پر بالکل ہلکا۔",
    "prepTimeMins": 20,
    "cookTimeMins": 35,
    "servings": 5,
    "difficulty": "easy",
    "utensil": {
      "name": "بھاری پیندے کی دیگچی (Pulao Degchi)",
      "type": "degchi",
      "reason": "یخنی چاولوں کے ایک ایک دانے میں مکمل جذب ہو کر عرق اور خوشبو بھر دیتی ہے۔",
      "healthBenefit": "چکن کی یخنی معدے کو سکون بخشتی ہے اور رات کو ہاضمے پر بوجھ نہیں بنتی۔"
    },
    "nutrition": {
      "calories": 460,
      "proteinG": 28,
      "carbsG": 62,
      "fatG": 14,
      "fiberG": 3,
      "sodiumMg": 420,
      "glycemicIndex": "Medium"
    },
    "ingredients": [
      {
        "name": "Fresh Chicken Pieces",
        "nameUrdu": "تازہ چکن بوٹی",
        "quantity": "800g",
        "category": "meat",
        "approxPkr": 520
      },
      {
        "name": "Super Basmati Rice",
        "nameUrdu": "سپر باسمتی چاول",
        "quantity": "600g",
        "category": "pantry",
        "approxPkr": 210
      },
      {
        "name": "Saunf, Sabut Dhania & Garam Masala",
        "nameUrdu": "سونف، ثابت دھنیا، زیرہ، دارچینی، لونگ",
        "quantity": "3 tbsp",
        "category": "spices",
        "approxPkr": 35
      },
      {
        "name": "Onions, Ginger & Whole Garlic",
        "nameUrdu": "پیاز، لہسن کا گٹھا اور ادرک",
        "quantity": "2 large & whole",
        "category": "produce",
        "approxPkr": 45
      },
      {
        "name": "Cooking Oil / Desi Ghee",
        "nameUrdu": "کوکنگ آئل یا دیسی گھی",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 60
      }
    ],
    "instructions": [
      "دیگچی میں چکن، سونف، ثابت دھنیا، ثابت لہسن، نمک اور پانی ڈال کر 15 منٹ ابالیں تاکہ خوشبودار یخنی تیار ہو۔ یخنی چھان لیں۔",
      "دیگچی میں گھی گرم کر کے پیاز بادامی سنہری کریں اور ادرک لہسن کے ساتھ چکن 3 منٹ بھونیں۔",
      "چھانی ہوئی گرم یخنی ڈالیں اور ابال آنے پر بھیگے ہوئے باسمتی چاول شامل کریں۔",
      "جب پانی چاولوں کی سطح پر آ جائے تو ڈھکن پر کپڑا لپیٹ کر 12 منٹ دھیمی آنچ پر دم دیں۔",
      "ٹھنڈے زیرہ رائتے کے ساتھ گرما گرم دیگی پلاؤ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "چاول اعتدال میں لیں اور ساتھ کچومبر سلاد اور دہی زیادہ رکھیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ ہلکے مصالحے اور قدرتی یخنی بلڈ پریشر کیلئے محفوظ اور پرسکون ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "چکن وائٹ میٹ یورک ایسڈ کیلئے محفوظ ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ بریانی کے مقابلے میں چکنائی کم ہوتی ہے اور دل کیلئے ہلکا کھانا ہے۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "سونف اور دھنیا کو ململ کے کپڑے کی پوٹلی میں باندھ کر ابالیں تاکہ یخنی میں ذائقہ اتر آئے اور چاولوں میں مصالحہ منہ میں نہ آئے۔",
    "estimatedCostPkr": 870,
    "tags": [
      "dinner",
      "pulao",
      "yakhni",
      "chicken",
      "comfort-food",
      "everyday"
    ],
    "imageEmoji": "🍚"
  },
  {
    "id": "chicken-matar-pulao",
    "name": "Chicken Matar Pulao & Dahi Kachumber",
    "nativeName": "چکن مٹر پلاؤ اور دہی کچومبر سلاد",
    "category": "rice",
    "season": "all",
    "seasonalNotes": "شام اور رات کا ذائقہ دار کھانا: چکن بوٹی اور میٹھے ہرے مٹر کا خوشبودار پلاؤ، زیرہ بگھار اور دہی کا کچومبر سلاد۔",
    "prepTimeMins": 20,
    "cookTimeMins": 30,
    "servings": 5,
    "difficulty": "easy",
    "utensil": {
      "name": "دیگچی (Heavy Base Degchi)",
      "type": "degchi",
      "reason": "چاول اور مٹر بھاپ میں دم پر کھلتے ہیں اور مٹر کا ہرا رنگ قائم رہتا ہے۔",
      "healthBenefit": "چکن کا پروٹین اور مٹر کا فائبر متوازن اور صحت بخش کھانا مہیا کرتے ہیں۔"
    },
    "nutrition": {
      "calories": 450,
      "proteinG": 26,
      "carbsG": 64,
      "fatG": 12,
      "fiberG": 5,
      "sodiumMg": 400,
      "glycemicIndex": "Medium"
    },
    "ingredients": [
      {
        "name": "Chicken Pieces",
        "nameUrdu": "چکن بوٹی",
        "quantity": "600g",
        "category": "meat",
        "approxPkr": 390
      },
      {
        "name": "Fresh Green Peas (Matar)",
        "nameUrdu": "تازہ ہرے مٹر کے دانے",
        "quantity": "300g",
        "category": "produce",
        "approxPkr": 50
      },
      {
        "name": "Super Basmati Rice",
        "nameUrdu": "سپر باسمتی چاول",
        "quantity": "500g",
        "category": "pantry",
        "approxPkr": 175
      },
      {
        "name": "Onions, Tomatoes & Whole Spices",
        "nameUrdu": "پیاز، ٹماٹر، زیرہ، دارچینی، تیز پتہ",
        "quantity": "mix",
        "category": "produce",
        "approxPkr": 45
      },
      {
        "name": "Cooking Oil / Ghee",
        "nameUrdu": "کوکنگ آئل یا گھی",
        "quantity": "1/3 cup",
        "category": "pantry",
        "approxPkr": 55
      }
    ],
    "instructions": [
      "دیگچی میں گھی گرم کریں، ثابت زیرہ اور گرم مصالحہ کڑکڑائیں، پیاز سنہری کریں۔",
      "چکن اور ادرک لہسن ڈال کر 5 منٹ بھونیں، پھر ٹماٹر اور ہرے مٹر شامل کریں۔",
      "پانی ڈال کر ابالیں، پھر بھیگے ہوئے چاول ڈالیں۔",
      "پانی خشک ہونے پر 12 منٹ دم دیں۔",
      "دہی کچومبر سلاد کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "چاول کی مقدار کم لیں اور مٹر چکن زیادہ لیں۔"
      },
      "hypertension": {
        "status": "safe",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ کم نمک میں محفوظ ہے۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "چکن محفوظ رہتا ہے۔"
      },
      "cholesterol_heart": {
        "status": "safe",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ کم چکنائی والا کھانا۔"
      },
      "stomach_digestive": {
        "status": "safe",
        "tip": "امی جان کیلئے: معدے کیلئے مناسب ہے؛ مرچیں اور گھی معتدل رکھیں تو باآسانی ہضم ہو جائے گا۔"
      }
    },
    "proTip": "مٹر کو چکن کے ساتھ زیادہ نہ بھونیں تاکہ ان کا ہرا رنگ کالا نہ پڑے بلکہ دم پر قدرتی سبز رہے۔",
    "estimatedCostPkr": 715,
    "tags": [
      "dinner",
      "pulao",
      "chicken",
      "matar-pulao",
      "rice",
      "popular"
    ],
    "imageEmoji": "🥘"
  },
  {
    "id": "crispy-zinger-burger",
    "name": "Crispy Chicken Zinger Burger & French Fries",
    "nativeName": "کرسپی چکن زنگر برگر مع فرنچ فرائز (فاسٹ فوڈ)",
    "category": "chicken",
    "season": "all",
    "seasonalNotes": "شام اور رات کا من پسند فاسٹ فوڈ: کرسپی چکن زنگر فلے، سلاد پتہ، گارلک مایونیز ساس اور گرما گرم فرنچ فرائز۔ ویک اینڈ اور باہر کے کھانے کا نعم البدل۔",
    "prepTimeMins": 20,
    "cookTimeMins": 15,
    "servings": 4,
    "difficulty": "easy",
    "utensil": {
      "name": "ڈیپ کڑاہی یا فرائر (Frying Karahi)",
      "type": "karahi",
      "reason": "تیز گرم تیل میں چکن کوٹنگ چند منٹ میں کرکری بنتی ہے اور گوشت جوسی رہتا ہے۔",
      "healthBenefit": "گھر کے صاف تیل میں بنا برگر باہر کے غیر معیاری تیل سے 100 فیصد محفوظ اور صحت بخش ہے۔"
    },
    "nutrition": {
      "calories": 520,
      "proteinG": 29,
      "carbsG": 48,
      "fatG": 22,
      "fiberG": 3,
      "sodiumMg": 560,
      "glycemicIndex": "Medium"
    },
    "ingredients": [
      {
        "name": "Boneless Chicken Breast Fillets",
        "nameUrdu": "چکن بون لیس بریسٹ فلے",
        "quantity": "500g",
        "category": "meat",
        "approxPkr": 480
      },
      {
        "name": "Fresh Burger Buns & Iceberg Lettuce",
        "nameUrdu": "برگر بن اور تازی آئس برگ سلاد پتہ",
        "quantity": "4 pcs & leaves",
        "category": "pantry",
        "approxPkr": 110
      },
      {
        "name": "Flour & Cornstarch Coating",
        "nameUrdu": "میدہ اور کارن فلور کوٹنگ",
        "quantity": "2 cups",
        "category": "pantry",
        "approxPkr": 50
      },
      {
        "name": "Garlic Mayonnaise & Chilli Sauce",
        "nameUrdu": "گارلک مایونیز اور چلی گارلک ساس",
        "quantity": "1/2 cup",
        "category": "dairy",
        "approxPkr": 70
      },
      {
        "name": "Fresh Potatoes for French Fries",
        "nameUrdu": "تازہ آلو فرائز کیلئے",
        "quantity": "500g",
        "category": "produce",
        "approxPkr": 50
      },
      {
        "name": "Cooking Oil for Frying",
        "nameUrdu": "کوکنگ آئل فرائنگ کیلئے",
        "quantity": "2 cups",
        "category": "pantry",
        "approxPkr": 140
      }
    ],
    "instructions": [
      "چکن فلے پر سرکہ، کالی مرچ، کٹی لال مرچ، مسٹرڈ پیسٹ، ادرک لہسن اور نمک لگا کر 20 منٹ میرینیٹ کریں۔",
      "میدے میں چکن فلے کو دبائیں، ٹھنڈے پانی میں 1 سیکنڈ ڈبوئیں اور دوبارہ میدے میں گھما کر جھاڑیں تاکہ کرسپی فلیکس بنیں۔",
      "تیل میں درمیانی تیز آنچ پر 8 منٹ سنہری اور کرسپی فرائی کریں۔",
      "برگر بن کو ہلکا ٹوسٹ کریں، مایونیز ساس لگائیں، سلاد پتہ اور کرسپی چکن فلے رکھیں۔",
      "ساتھ کرسپی فرنچ فرائز کے ساتھ پیش کریں۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "بن اور میدہ شوگر بڑھاتے ہیں، اعتدال میں کھائیں یا گرلڈ فلے سلاد کے ساتھ لیں۔"
      },
      "hypertension": {
        "status": "caution",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ مایونیز اور ساسز میں سوڈیم زیادہ ہوتا ہے، ساس کم لگائیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "چکن بریسٹ سفید گوشت ہے اور یورک ایسڈ کیلئے محفوظ ہے۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ ایئر فرائر میں بنائیں تو دل کیلئے کافی محفوظ بن جاتا ہے۔"
      },
      "stomach_digestive": {
        "status": "avoid",
        "tip": "امی جان کیلئے: فاسٹ فوڈ اور تلی ہوئی اشیاء معدے پر بہت بھاری ہیں اور بدہضمی و تیزابیت کرتی ہیں؛ ان کے لیے ہلکا کھانا پیش کریں۔",
        "substitute": "مونگ مسور دال، گھیا کدو / لوکی سالن یا توری کی بھجیا"
      }
    },
    "proTip": "پرفیکٹ کرسپی کرمز کیلئے چکن کو میدے سے نکال کر برف والے ٹھنڈے پانی میں صرف ایک سیکنڈ ڈبوئیں اور دوبارہ میدے میں دبا کر جھاڑیں۔",
    "estimatedCostPkr": 900,
    "tags": [
      "dinner",
      "fast-food",
      "burger",
      "zinger",
      "weekend-treat"
    ],
    "imageEmoji": "🍔"
  },
  {
    "id": "chicken-tikka-pizza",
    "name": "Desi Pan-Baked Chicken Tikka Pizza",
    "nativeName": "دیسی چکن تکہ پین پیزا (فاسٹ فوڈ)",
    "category": "chicken",
    "season": "all",
    "seasonalNotes": "رات کا مزیدار فاسٹ فوڈ: اسموکی چکن تکہ بوٹی، پگھلا ہوا موزریلا اور چیڈر پنیر، شملہ مرچ، پیاز، زیتون اور اوریگینو۔ پین یا اوون میں باآسانی تیار۔",
    "prepTimeMins": 25,
    "cookTimeMins": 20,
    "servings": 4,
    "difficulty": "medium",
    "utensil": {
      "name": "نان سٹک پین یا اوون (Pizza Pan)",
      "type": "nonstick",
      "reason": "ڈھکن بند پین میں بھاپ سے پنیر مکمل میلٹ ہوتا ہے اور کرسٹ خستہ بنتا ہے۔",
      "healthBenefit": "گھر میں تیار پیزا میں خالص پنیر اور تازہ سبزیاں ہوتی ہیں، مصنوعی کیمیکلز نہیں ہوتے۔"
    },
    "nutrition": {
      "calories": 480,
      "proteinG": 26,
      "carbsG": 52,
      "fatG": 19,
      "fiberG": 3,
      "sodiumMg": 520,
      "glycemicIndex": "Medium"
    },
    "ingredients": [
      {
        "name": "Pizza Dough",
        "nameUrdu": "پیزا ڈو یا میدے کا خمیری پیڑا",
        "quantity": "350g",
        "category": "pantry",
        "approxPkr": 60
      },
      {
        "name": "Cooked Chicken Tikka Chunks",
        "nameUrdu": "چکن تکہ بوٹی اسموکی کیوبز",
        "quantity": "300g",
        "category": "meat",
        "approxPkr": 260
      },
      {
        "name": "Mozzarella & Cheddar Cheese",
        "nameUrdu": "موزریلا اور چیڈر پنیر کدوکش",
        "quantity": "220g",
        "category": "dairy",
        "approxPkr": 240
      },
      {
        "name": "Pizza Sauce, Capsicum & Onion",
        "nameUrdu": "پیزا ساس، شملہ مرچ، پیاز، بلیک زیتون",
        "quantity": "topping",
        "category": "produce",
        "approxPkr": 90
      },
      {
        "name": "Oregano & Chilli Flakes",
        "nameUrdu": "اورریگینو اور کٹی لال مرچ",
        "quantity": "1 tsp",
        "category": "spices",
        "approxPkr": 15
      }
    ],
    "instructions": [
      "چکن کیوبز کو تکہ مصالحے میں پکا کر دہکتے کوئلے کا اسموکی دھواں دیں۔",
      "ڈو کو بیل کر پین میں پھیلائیں، کانٹے سے ہلکے سوراخ کریں۔",
      "پیزا ساس لگائیں، پنیر کی تہہ بچھائیں، اوپر چکن تکہ، شملہ مرچ، پیاز اور زیتون سجائیں۔",
      "اوپر مزید پنیر اور اوریگینو چھڑکیں۔",
      "پین کو ڈھانپ کر دھیمی آنچ پر 15 منٹ پکائیں جب تک پنیر میلٹ ہو جائے اور کرسٹ خستہ ہو جائے۔"
    ],
    "parhezAlerts": {
      "diabetes": {
        "status": "caution",
        "tip": "میدے کی کرسٹ شوگر بڑھاتی ہے، ایک سلائس سلاد کے ساتھ کھائیں۔"
      },
      "hypertension": {
        "status": "caution",
        "tip": "ابو جان کیلئے: سالن میں نمک اور کٹی مرچیں معتدل رکھیں۔ پنیر میں نمک ہوتا ہے، اعتدال میں کھائیں۔"
      },
      "uric_acid": {
        "status": "safe",
        "tip": "چکن تکہ اور پنیر یورک ایسڈ کیلئے محفوظ ہیں۔"
      },
      "cholesterol_heart": {
        "status": "caution",
        "tip": "ابو جان کیلئے: تیل و گھی کی مقدار کم رکھیں تاکہ کولیسٹرول نہ بڑھے۔ پنیر کم رکھیں اور سبزیاں زیادہ ڈالیں۔"
      },
      "stomach_digestive": {
        "status": "avoid",
        "tip": "امی جان کیلئے: فاسٹ فوڈ اور تلی ہوئی اشیاء معدے پر بہت بھاری ہیں اور بدہضمی و تیزابیت کرتی ہیں؛ ان کے لیے ہلکا کھانا پیش کریں۔",
        "substitute": "مونگ مسور دال، گھیا کدو / لوکی سالن یا توری کی بھجیا"
      }
    },
    "proTip": "پین کے ڈھکن پر باریک سوتی کپڑا لپیٹ دیں تاکہ بھاپ کے قطرے پیزا پر گر کر اسے نرم نہ کریں بلکہ کرسٹ کرکرا رہے۔",
    "estimatedCostPkr": 665,
    "tags": [
      "dinner",
      "fast-food",
      "pizza",
      "tikka",
      "weekend-treat"
    ],
    "imageEmoji": "🍕"
  }
];
