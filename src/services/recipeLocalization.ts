import { Recipe, Language, UtensilRecommendation, ParhezDetail, HealthCondition } from '../types';
import { translations } from '../data/translations';

export interface LocalizedRecipe extends Recipe {
  displayTitle: string;
  displaySubTitle: string;
  displayCategory: string;
  displaySeason: string;
}

// English translations dictionary for all recipes
const englishRecipeData: Record<string, {
  name: string;
  seasonalNotes: string;
  utensil: UtensilRecommendation;
  ingredients: Array<{ name: string; quantity: string }>;
  instructions: string[];
  proTip: string;
  parhezAlerts: Partial<Record<HealthCondition, ParhezDetail>>;
}> = {
  'chicken-karahi': {
    name: 'Traditional Chicken Karahi (Shinwari Style)',
    seasonalNotes: 'A classic Pakistani dish enjoyed across all seasons and a centerpiece for every family dining table.',
    utensil: {
      name: 'Black Cast Iron Wok (Lohe ki Karahi)',
      type: 'karahi',
      reason: 'High heat quickly sears the chicken and tomatoes, preventing excess moisture and giving that authentic restaurant aroma.',
      healthBenefit: 'Cooking in iron naturally enriches the dish with dietary iron, which supports healthy hemoglobin levels.'
    },
    ingredients: [
      { name: 'Chicken (Medium Curry Cut)', quantity: '1 kg' },
      { name: 'Red Ripe Tomatoes', quantity: '1/2 kg' },
      { name: 'Ginger Garlic Paste', quantity: '2 tbsp' },
      { name: 'Green Chillies & Ginger Julienne', quantity: '5-6 pcs' },
      { name: 'Crushed Black Pepper & Red Chilli Flakes', quantity: '1.5 tsp' },
      { name: 'Cooking Oil / Desi Ghee', quantity: '1/2 cup' }
    ],
    instructions: [
      'Heat oil in a cast iron karahi, add chicken and ginger-garlic paste; stir-fry on high heat for 5 minutes until chicken turns golden.',
      'Cut tomatoes in half and place them cut-side down over the chicken; cover and simmer for 8 minutes to steam and soften skins.',
      'Peel off tomato skins with tongs and mash the tomatoes into a rich gravy on high heat until the water evaporates.',
      'Add freshly crushed black pepper, red chilli flakes, and salt; sauté vigorously for 5 minutes until oil separates around the edges.',
      'Garnish generously with sliced green chillies and fresh julienned ginger. Serve sizzling hot with tandoori roti or naan.'
    ],
    proTip: 'Shinwari karahi does not use onions or yogurt; its signature pure taste comes solely from searing ripe red tomatoes with freshly ground black pepper.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'Low in carbohydrates and high in lean protein. Excellent for blood sugar management. Pair with whole wheat bran roti instead of refined flour naan.'
      },
      hypertension: {
        status: 'caution',
        tip: 'Cut salt by half and reduce cooking oil to 2 tablespoons, or prepare in heart-healthy olive oil.'
      },
      uric_acid: {
        status: 'safe',
        tip: 'Use skinless chicken breast in moderate portions. White meat is significantly safer for uric acid than red meat.'
      },
      cholesterol_heart: {
        status: 'caution',
        tip: 'Reduce oil by half and trim any excess chicken fat.',
        substitute: 'Prepare a steam-roasted karahi using light canola or extra-virgin olive oil.'
      }
    }
  },
  'bhindi-masala': {
    name: 'Crispy Desi Bhindi Masala (Okra)',
    seasonalNotes: 'Peak summer vegetable specialty; freshest and most affordable from May through September in Pakistani bazaars.',
    utensil: {
      name: 'Wide Shallow Karahi or Non-Stick Skillet',
      type: 'karahi',
      reason: 'Frying in a wide open pan allows moisture to evaporate instantly, keeping okra crisp and slime-free.',
      healthBenefit: 'Okra is loaded with pectin and soluble mucilage fiber that helps naturally lower blood glucose and LDL cholesterol.'
    },
    ingredients: [
      { name: 'Fresh Tender Okra (Bhindi)', quantity: '1/2 kg' },
      { name: 'Sliced Onions', quantity: '3 large (300g)' },
      { name: 'Chopped Tomatoes', quantity: '2 medium' },
      { name: 'Green Chillies & Fresh Coriander', quantity: '4 pcs' },
      { name: 'Turmeric, Cumin & Dry Pomegranate Seeds', quantity: '1 tbsp' },
      { name: 'Mustard Oil / Cooking Oil', quantity: '4 tbsp' }
    ],
    instructions: [
      'Wash okra and pat completely dry with a clean kitchen towel, then slice into 1-inch pieces (wet okra becomes sticky).',
      'Heat 2 tablespoons of oil in a wide pan and sauté the okra on high heat for 6-7 minutes until lightly golden; set aside.',
      'In the remaining oil, crackle cumin seeds and sauté sliced onions until soft and translucent.',
      'Add tomatoes, turmeric, chilli powder, coriander powder, and anardana powder; cook until a fragrant masala forms.',
      'Gently fold in the fried okra and green chillies, cover on low heat (dum) for 7 minutes, and finish with a squeeze of fresh lemon juice.'
    ],
    proTip: 'Always ensure bhindi is bone-dry before cutting, and add a few drops of fresh lemon juice or dry mango powder during dum to eliminate any stickiness.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'A powerhouse superfood for diabetics; rich dietary fiber slows carbohydrate absorption and enhances insulin sensitivity.'
      },
      hypertension: {
        status: 'safe',
        tip: 'High in natural potassium, helping to balance blood pressure levels. Keep table salt low.'
      },
      uric_acid: {
        status: 'safe',
        tip: 'Extremely safe for uric acid as purine content is nearly zero.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Soluble fiber binds cholesterol in the digestive tract. Cook with minimal heart-healthy oil.'
      },
      kidney_care: {
        status: 'caution',
        tip: 'Contains moderate oxalates; consume in moderation if prone to calcium oxalate kidney stones.'
      }
    }
  },
  'aloo-gosht-shorba': {
    name: 'Heritage Aloo Gosht Shorba (Meat & Potato Stew)',
    seasonalNotes: 'The ultimate comforting Pakistani family classic; traditional Sunday centerpiece across households.',
    utensil: {
      name: 'Traditional Clay Pot (Mitti ki Handi) or Pressure Cooker',
      type: 'handi',
      reason: 'Slow cooking in a clay pot extracts natural collagen from marrow bones, creating a silky, aromatic broth.',
      healthBenefit: 'Bone broth provides natural collagen and amino acids that support joint health, gut healing, and immunity.'
    },
    ingredients: [
      { name: 'Mutton / Veal with Bones', quantity: '750g' },
      { name: 'Potatoes (Halved)', quantity: '3 medium' },
      { name: 'Finely Pureed Onions', quantity: '2 large' },
      { name: 'Fresh Plain Yogurt', quantity: '1/2 cup' },
      { name: 'Whole Garam Masala & Spices', quantity: '2 tbsp' },
      { name: 'Cooking Oil / Ghee', quantity: '1/3 cup' }
    ],
    instructions: [
      'Heat oil in a heavy pot, add whole spices (cinnamon stick, black cardamom, cloves) until fragrant.',
      'Add pureed onions and fry until rich golden brown, then add meat and ginger-garlic paste and sear for 7 minutes.',
      'Whisk yogurt with turmeric, Kashmiri chilli, and coriander powder; add to the pot and sauté until oil separates.',
      'Pour 2 cups of warm water and pressure cook for 20 minutes (or simmer in a clay pot for 45 minutes) until meat is tender.',
      'Add halved potatoes and 1 more cup of water; simmer until potatoes are fork-tender. Garnish with fresh cilantro and garam masala.'
    ],
    proTip: 'To bring a restaurant-grade glistening oil sheen (tari) on top, turn off the heat and let the covered pot rest undisturbed for 5 minutes before serving.',
    parhezAlerts: {
      diabetes: {
        status: 'caution',
        tip: 'The broth and meat are safe, but potatoes are high-glycemic. Serve diabetic members the tender meat and shorba without potato pieces.'
      },
      hypertension: {
        status: 'caution',
        tip: 'Keep sodium low, skim floating fat from the top of the broth, and serve the lean stew portion.'
      },
      uric_acid: {
        status: 'avoid',
        tip: 'Red meat bone broth is concentrated in purines and strictly restricted during high uric acid flare-ups.',
        substitute: 'Prepare a light chicken shorba or bottle gourd (lauki) stew instead.'
      },
      cholesterol_heart: {
        status: 'caution',
        tip: 'Trim all visible fat from the meat and prepare using cold-pressed olive or canola oil.'
      }
    }
  },
  'sarson-saag': {
    name: 'Punjabi Sarson Ka Saag & Makki Ki Roti',
    seasonalNotes: 'Winter treasure of Punjab (November to February), warming the body and bursting with natural energy.',
    utensil: {
      name: 'Clay Handi with Traditional Wooden Masher (Ghotna)',
      type: 'handi',
      reason: 'Hand-mashing with a traditional wooden ghotna gently emulsifies the saag fibers without creating an unpleasant foamy puree.',
      healthBenefit: 'Mustard greens are packed with vitamins K, A, and C, folic acid, and potent phytonutrients that boost winter immunity.'
    },
    ingredients: [
      { name: 'Fresh Mustard Greens (Sarson)', quantity: '1 kg' },
      { name: 'Spinach (Palak) & Fenugreek (Bathu/Methi)', quantity: '1/2 kg' },
      { name: 'Green Chillies & Garlic Cloves', quantity: '15 pcs' },
      { name: 'Makki Atta (Cornmeal for Aalan)', quantity: '3 tbsp' },
      { name: 'Desi White Butter / Ghee', quantity: '4 tbsp' },
      { name: 'Tadka Garlic, Ginger & Dried Red Chillies', quantity: '2 tbsp' }
    ],
    instructions: [
      'Chop greens finely and rinse in 3-4 changes of cold water to eliminate all soil.',
      'Place sarson, palak, methi, green chillies, garlic, and salt in a large heavy pot with 1 cup water; simmer on low for 60 minutes.',
      'When greens are fork-tender, sprinkle cornmeal and mash continuously with a wooden ghotna until smooth and buttery.',
      'In a separate small pan, heat desi ghee, golden-brown the sliced garlic, julienned ginger, and whole red chillies, and pour sizzling tadka over the saag.',
      'Serve steaming hot with a dollop of white butter alongside warm makki ki roti and jaggery (gur).'
    ],
    proTip: 'To eliminate bitterness, always balance mustard greens with half the quantity of fresh spinach and a handful of fresh fenugreek (methi).',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'High in fiber and low in sugar. Serve with 100% pure cornmeal or barley roti and omit jaggery.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Naturally rich in potassium and minerals. Use unsalted white butter and keep tadka salt minimal.'
      },
      uric_acid: {
        status: 'caution',
        tip: 'Spinach contains moderate purines. If uric acid is elevated, reduce spinach proportion and enjoy in moderation.'
      },
      cholesterol_heart: {
        status: 'caution',
        tip: 'Replace heavy butter dollops with a fragrant garlic and olive oil tadka.'
      },
      kidney_care: {
        status: 'avoid',
        tip: 'Very high in potassium and oxalates; requires strict restriction for individuals with chronic kidney disease.'
      }
    }
  },
  'daal-chana-tadka': {
    name: 'Lahori Shahi Daal Chana (Split Chickpea Curry)',
    seasonalNotes: 'Year-round high-protein staple cherished across all Pakistani homes and roadside dhabas.',
    utensil: {
      name: 'Clay Pot (Mitti ki Handi) or Heavy Saucepan',
      type: 'handi',
      reason: 'Even gentle heat prevents lentils from sticking to the bottom while allowing every grain to bloom tenderly.',
      healthBenefit: 'Complex carbohydrates and soluble dietary fiber keep you satiated for hours, stabilizing energy and blood sugar.'
    },
    ingredients: [
      { name: 'Split Bengal Gram (Chana Daal)', quantity: '350g' },
      { name: 'Onion & Tomatoes', quantity: '1 each' },
      { name: 'Ginger Garlic & Green Chilli', quantity: '2 tbsp' },
      { name: 'Cumin Seeds (Zeera) & Kashmiri Mirch', quantity: '1 tbsp' },
      { name: 'Ghee / Cooking Oil for Tadka', quantity: '4 tbsp' },
      { name: 'Kasuri Methi & Garam Masala', quantity: '1 tsp' }
    ],
    instructions: [
      'Wash chana daal and soak in warm water for at least 30 minutes.',
      'Pressure cook with 3 cups water, salt, turmeric, and 1 tsp oil for 12-14 minutes until tender yet holding shape.',
      'In a pan, heat oil, brown the onions, add ginger-garlic paste and pureed tomatoes; fry until oil separates.',
      'Stir the cooked daal into the onion-tomato masala and simmer on low for 5 minutes.',
      'In a tadka pan, heat desi ghee, crackle cumin seeds, curry leaves, and dried red chillies; pour over daal and sprinkle kasuri methi.'
    ],
    proTip: 'Adding a teaspoon of butter or oil while boiling lentils prevents foam from overflowing and yields tender, silky grains.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'Low glycemic index and high fiber make chana daal ideal for blood sugar regulation.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Rich in potassium and magnesium. Keep tadka salt moderate and use vegetable oil.'
      },
      uric_acid: {
        status: 'caution',
        tip: 'Pulses contain moderate purines; limit to once a week and keep the curry light rather than concentrated.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Soluble fiber actively lowers blood cholesterol. Temper with olive oil or mustard oil.'
      },
      gluten_intolerance: {
        status: 'safe',
        tip: '100% naturally gluten-free; pair with fragrant basmati rice.'
      }
    }
  },
  'karela-gosht': {
    name: 'Karela Gosht (Bitter Gourd with Meat)',
    seasonalNotes: 'Prized summer tonic dish; traditional blood purifier and nature’s remedy for metabolism.',
    utensil: {
      name: 'Cast Iron Karahi',
      type: 'karahi',
      reason: 'Crisps the bitter gourd slices efficiently, burning off bitterness and creating deep caramelized flavor.',
      healthBenefit: 'Contains charantin and polypeptide-p, insulin-like compounds shown to actively help regulate blood sugar.'
    },
    ingredients: [
      { name: 'Fresh Bitter Gourd (Karela)', quantity: '1/2 kg' },
      { name: 'Veal / Beef or Chicken Mince', quantity: '1/2 kg' },
      { name: 'Sliced Onions', quantity: '4 large (400g)' },
      { name: 'Tomatoes & Green Chillies', quantity: '3 pcs' },
      { name: 'Fennel Seeds (Saunf) & Kalonji', quantity: '1 tbsp' },
      { name: 'Cooking Oil for Frying', quantity: '1/2 cup' }
    ],
    instructions: [
      'Scrape karela lightly, slice into rounds, discard seeds, rub with salt, rest for 20 mins, squeeze out bitter juice, and rinse thoroughly.',
      'Heat oil in a karahi and deep-fry the karela rounds over high heat until golden-crisp; remove and set aside.',
      'In a separate pot, cook the meat with onions, ginger-garlic, tomatoes, and spices until tender and dry.',
      'Sauté thick onion slices in remaining oil until soft, then combine the tender meat and fried karela.',
      'Add fennel seeds, kalonji, and green chillies; cover on low heat (dum) for 10 minutes so sweetness of onions balances the bitter gourd.'
    ],
    proTip: 'The secret to eliminating harsh bitterness is salting and squeezing out the moisture, followed by high-heat golden crisping.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'Number one natural home remedy for blood sugar management in Pakistani cuisine. Recommended twice weekly.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Promotes vascular health. Salt is washed out during prep, so do not add excess table salt.'
      },
      uric_acid: {
        status: 'caution',
        tip: 'If prepared with beef, patients with elevated uric acid should avoid. Safe when prepared with chicken or as vegetarian Karela Piyaz.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Helps clear arterial plaque and promotes healthy circulation.'
      }
    }
  },
  'tori-bhujia': {
    name: 'Light Masaledar Tori Bhujia (Ridge Gourd)',
    seasonalNotes: 'Lightest summer vegetable; hydrating, cooling, and soothing for digestive comfort.',
    utensil: {
      name: 'Non-Stick Pan or Silver Skillet',
      type: 'nonstick',
      reason: 'Ridge gourd releases its own natural juices; cooking covered on gentle steam preserves its natural sweetness.',
      healthBenefit: 'Consists of 95% water, fighting summer dehydration, heat exhaustion, and stomach acidity.'
    },
    ingredients: [
      { name: 'Fresh Ridge Gourd (Tori)', quantity: '1 kg' },
      { name: 'Onions & Tomatoes', quantity: '2 each' },
      { name: 'Cumin Seeds & Kalonji', quantity: '1 tsp' },
      { name: 'Green Chillies & Turmeric', quantity: '1 tbsp' },
      { name: 'Olive Oil / Canola Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      'Lightly scrape ridge gourd, discard ends, and cut into thin rounds.',
      'Heat oil in a pan, crackle cumin seeds, then sauté sliced onions until soft.',
      'Add chopped tomatoes, turmeric, chilli flakes, and salt; cook for 2 minutes.',
      'Add the sliced tori and green chillies; stir well (do not add any water as tori releases plenty of its own liquid).',
      'Cover tightly and cook on medium-low for 15 minutes; uncover and reduce on high heat for 2 minutes. Garnish with coriander.'
    ],
    proTip: 'Never add water to tori; letting it simmer gently in its own sweet botanical juices produces the richest flavor.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: '100% safe and therapeutic for diabetes; virtually zero glycemic impact.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Extremely low sodium and high natural hydration; ideal for blood pressure control.'
      },
      uric_acid: {
        status: 'safe',
        tip: 'Completely purine-free and highly recommended for individuals with gout or high uric acid.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Very light and heart-protective when cooked in cold-pressed olive oil.'
      },
      kidney_care: {
        status: 'safe',
        tip: 'Gentle on kidneys; acts as a mild natural diuretic helping eliminate metabolic waste.'
      }
    }
  },
  'gajar-matar-aloo': {
    name: 'Winter Gajar Matar Aloo (Carrot, Peas & Potatoes)',
    seasonalNotes: 'Vibrant winter bazaar delight (December & January) featuring sweet red carrots and sweet green peas.',
    utensil: {
      name: 'Heavy Bottom Pan (Degchi)',
      type: 'degchi',
      reason: 'Slow steam simmering keeps carrots sweet and tender while preserving the vibrant green hue of peas.',
      healthBenefit: 'Red carrots supply beta-carotene and vitamin A for eye health, clear skin, and cellular protection.'
    },
    ingredients: [
      { name: 'Fresh Red Winter Carrots', quantity: '1/2 kg' },
      { name: 'Fresh Green Peas', quantity: '1/2 kg' },
      { name: 'Diced Potatoes', quantity: '2 medium' },
      { name: 'Tomatoes & Green Chillies', quantity: '2 pcs' },
      { name: 'Cumin, Kasuri Methi & Butter', quantity: '1 tbsp' },
      { name: 'Cooking Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      'Heat oil in a pot and crackle cumin seeds.',
      'Add chopped tomatoes, turmeric, red chilli powder, coriander powder, and salt; cook for 3 minutes.',
      'Add diced carrots, peas, and potatoes; sauté on medium-high heat for 3 minutes.',
      'Sprinkle 1/4 cup water, cover tightly, and steam on low heat for 15 minutes until vegetables are tender.',
      'Crush kasuri methi between palms and sprinkle on top with fresh cilantro and a dab of butter.'
    ],
    proTip: 'Steam on gentle heat rather than boiling in excess water to retain the bright orange and emerald colors.',
    parhezAlerts: {
      diabetes: {
        status: 'caution',
        tip: 'Cooked carrots and potatoes contain starches; omit potatoes for diabetic members and enjoy peas and carrots in moderation.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Packed with antioxidants and dietary fiber. Keep table salt light.'
      },
      uric_acid: {
        status: 'caution',
        tip: 'Green peas have moderate purines; enjoy small portions during active uric acid flare-ups.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Carrot pectin fiber supports healthy cholesterol levels.'
      }
    }
  },
  'chicken-biryani': {
    name: 'Karachi Style Spicy Chicken Biryani',
    seasonalNotes: 'Crown jewel of celebratory meals, weekend dawats, and family feasts.',
    utensil: {
      name: 'Heavy-Bottomed Stainless Steel / Copper Degchi',
      type: 'degchi',
      reason: 'Thick base distributes heat evenly during the steam (dum) phase, preventing rice from burning.',
      healthBenefit: 'Aromatic spices like cloves, cardamom, and saffron aid digestion and stimulate metabolism.'
    },
    ingredients: [
      { name: 'Aged Basmati Rice', quantity: '750g' },
      { name: 'Chicken (Biryani Cut)', quantity: '750g' },
      { name: 'Golden Fried Onions (Birista)', quantity: '3 large' },
      { name: 'Yogurt & Dried Plums (Aloo Bukhara)', quantity: '1 cup' },
      { name: 'Biryani Spice Blend & Kewra Saffron Water', quantity: '3 tbsp' },
      { name: 'Golden Yellow Potatoes', quantity: '3 pcs' },
      { name: 'Cooking Oil / Ghee', quantity: '1/2 cup' }
    ],
    instructions: [
      'Soak aged basmati rice for 30 minutes; boil in salted water with whole spices until 85% done (al dente); drain.',
      'In a pot, heat oil, sauté chicken with ginger-garlic, brown onions, tomatoes, yogurt, and biryani spices until cooked.',
      'Add boiled yellow potatoes and dried plums into the chicken gravy.',
      'Layer the gravy at the bottom of the degchi, top with drained rice, and garnish with mint, cilantro, and saffron-kewra milk.',
      'Seal the lid with a towel and steam (dum) on low heat for 15 minutes. Gently fluff with a saucer and serve with raita.'
    ],
    proTip: 'Never boil biryani rice completely; drain when there is still a firm grain (ek kani) so it finishes in the aromatic steam without turning mushy.',
    parhezAlerts: {
      diabetes: {
        status: 'caution',
        tip: 'High in starches from rice and potatoes. Diabetic members should take small rice portions with chicken and plenty of salad and cucumber raita.'
      },
      hypertension: {
        status: 'caution',
        tip: 'Biryani blends often have hidden sodium; make home-blend spices with reduced salt.'
      },
      uric_acid: {
        status: 'safe',
        tip: 'Chicken biryani is safe compared to beef/mutton varieties.'
      },
      cholesterol_heart: {
        status: 'caution',
        tip: 'Moderate oil consumption; prepare in canola or sunflower oil instead of hydrogenated vanaspati.'
      }
    }
  },
  'lauki-chana-daal': {
    name: 'Bottle Gourd with Chana Lentils (Lauki Daal)',
    seasonalNotes: 'Honored sunnah vegetable (Kaddu Shareef); cooling and restorative throughout warm Pakistani summers.',
    utensil: {
      name: 'Clay Pot (Mitti ki Handi) or Pressure Cooker',
      type: 'handi',
      reason: 'Gently blends bottle gourd and split lentils into a velvety, wholesome gravy.',
      healthBenefit: 'Supports heart muscle function, naturally regulates blood pressure, and neutralizes stomach acidity.'
    },
    ingredients: [
      { name: 'Fresh Bottle Gourd (Lauki/Kaddu)', quantity: '1/2 kg' },
      { name: 'Chana Daal (Soaked)', quantity: '250g' },
      { name: 'Onion & Tomatoes', quantity: '1 each' },
      { name: 'Ginger Garlic & Green Chillies', quantity: '2 tbsp' },
      { name: 'Cumin & Curry Leaves for Tadka', quantity: '1 tbsp' },
      { name: 'Cooking Oil', quantity: '3 tbsp' }
    ],
    instructions: [
      'Soak chana daal for 30 minutes; peel bottle gourd and cut into medium cubes.',
      'In a cooker, heat oil, brown onions, add ginger-garlic paste and tomatoes; sauté masala.',
      'Add chana daal, bottle gourd, salt, turmeric, chilli powder, and 2 cups water.',
      'Pressure cook for 10 minutes until both daal and gourd are tender.',
      'Lightly mash with a spoon, temper with sizzling cumin and curry leaves in ghee, and garnish with fresh coriander.'
    ],
    proTip: 'Always taste a raw slice of lauki before cooking; never use bitter bottle gourd.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'Highly therapeutic for blood sugar balance; does not spike blood glucose.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Assists in reducing high blood pressure naturally. Keep sodium moderate.'
      },
      uric_acid: {
        status: 'safe',
        tip: 'Bottle gourd has gentle diuretic properties that assist in flushing out excess uric acid.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'One of the best traditional dishes for clearing arterial fat and promoting heart wellness.'
      },
      kidney_care: {
        status: 'safe',
        tip: 'Gentle on kidneys and bladder.'
      }
    }
  },
  'daal-mash-fry': {
    name: 'Dhaba Style White Daal Mash Fry',
    seasonalNotes: 'Popular highway dhaba classic; celebrated with black pepper, fresh ginger julienne, and hot tandoori roti.',
    utensil: {
      name: 'Cast Iron Skillet or Heavy Wok',
      type: 'karahi',
      reason: 'High heat quickly fries whole distinct lentil grains without turning them into a mushy paste.',
      healthBenefit: 'Urad lentils are dense in protein, iron, and fiber, restoring physical vigor and strength.'
    },
    ingredients: [
      { name: 'White Urad Lentils (Washed)', quantity: '300g' },
      { name: 'Butter / Desi Ghee', quantity: '3 tbsp' },
      { name: 'Onions & Tomatoes (Finely Diced)', quantity: '1 each' },
      { name: 'Ginger Julienne & Green Chillies', quantity: '3 tbsp' },
      { name: 'Crushed Black Pepper & Cumin', quantity: '1.5 tbsp' }
    ],
    instructions: [
      'Soak daal mash for 1 hour; boil in salted water until 85% cooked with grains distinct; drain.',
      'In a wok, heat butter or ghee, golden the onions, add ginger-garlic and sauté.',
      'Add tomatoes, black pepper, red chilli flakes, and salt; fry until oil separates.',
      'Toss in the boiled daal mash and stir-fry on high heat for 3 minutes without breaking grains.',
      'Top with julienned ginger, green chillies, garam masala, and a dollop of butter; cover on low heat for 5 minutes.'
    ],
    proTip: 'Do not overcook daal mash during boiling; dhaba style relies on individual tender grains dressed with sizzling ginger.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'High in plant protein and complex fiber; helps stabilize daytime glucose.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Use unsalted butter and keep table salt light.'
      },
      uric_acid: {
        status: 'avoid',
        tip: 'Daal mash is high in purines and traditionally known to trigger joint flares; strictly avoid during high uric acid.',
        substitute: 'Prepare light yellow moong lentils or bottle gourd instead.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Fry in canola or olive oil for heart health.'
      }
    }
  },
  'chapli-kabab': {
    name: 'Peshawari Chapli Kabab (Crispy Meat Patties)',
    seasonalNotes: 'Khyber Pakhtunkhwa’s culinary masterpiece; savory, spiced, and crispy on the edges.',
    utensil: {
      name: 'Flat Cast Iron Tawa (Griddle)',
      type: 'tawa',
      reason: 'The wide iron surface distributes intense heat evenly, giving crisp edges while keeping the center succulent.',
      healthBenefit: 'Rich in dietary protein, heme iron, and digestive pomegranate seeds.'
    },
    ingredients: [
      { name: 'Beef / Veal Mince (20% Fat)', quantity: '750g' },
      { name: 'Coarse Cornmeal (Makki Atta)', quantity: '4 tbsp' },
      { name: 'Squeezed Finely Chopped Onions', quantity: '2 large' },
      { name: 'Pomegranate Seeds (Anardana)', quantity: '2 tbsp' },
      { name: 'Crushed Coriander, Cumin & Carom Seeds', quantity: '2 tbsp' },
      { name: 'Tomato Slices & Cooked Egg', quantity: '2 pcs' },
      { name: 'Oil / Tallow for Frying', quantity: '1/2 cup' }
    ],
    instructions: [
      'In a large bowl, knead mince vigorously with spices, anardana, and cornmeal for 10 minutes.',
      'Incorporate squeezed onions, fresh cilantro, green chillies, and cooked scrambled egg.',
      'Wet hands and shape into large thin patties; press a thin slice of tomato into the center.',
      'Shallow fry on a hot iron tawa for 4-5 minutes per side until deeply browned and crisp.',
      'Serve hot with warm naan, mint chutney, and fresh onion rings.'
    ],
    proTip: 'Squeeze every drop of liquid out of chopped onions before adding to mince to prevent kababs from breaking on the griddle.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'Virtually carbohydrate-free. Enjoy with mint yogurt dip and salad without bread.'
      },
      hypertension: {
        status: 'avoid',
        tip: 'High fat and beef content can aggravate high blood pressure.',
        substitute: 'Prepare light chicken breast mince patties with low salt.'
      },
      uric_acid: {
        status: 'avoid',
        tip: 'Red meat mince is high in purines and restricted for uric acid.'
      },
      cholesterol_heart: {
        status: 'avoid',
        tip: 'Animal fat is not recommended for coronary care; prepare using skinless chicken breast.'
      }
    }
  },
  'moong-masoor-daal-chawal': {
    name: 'Quick Moong Masoor Daal & Cumin Rice',
    seasonalNotes: 'Evergreen, 20-minute comfort meal across all Pakistani households.',
    utensil: {
      name: 'Stainless Steel Pot or Pressure Cooker',
      type: 'degchi',
      reason: 'Gentle simmering turns yellow and red lentils into a silky golden soup in just 15 minutes.',
      healthBenefit: 'Lightest and easiest to digest among all lentils; ideal for convalescence and sensitive stomachs.'
    },
    ingredients: [
      { name: 'Yellow Moong & Red Masoor Lentils', quantity: '250g' },
      { name: 'Basmati Rice for Cumin Rice', quantity: '400g' },
      { name: 'Garlic Cloves & Cumin for Tadka', quantity: '2 tbsp' },
      { name: 'Curry Leaves & Whole Red Chillies', quantity: '8 pcs' },
      { name: 'Desi Ghee / Oil for Tempering', quantity: '3 tbsp' }
    ],
    instructions: [
      'Wash lentils and bring to a boil with 4 cups water, salt, turmeric, chilli powder, and ginger-garlic.',
      'Cook on medium for 15 minutes until both lentils melt together smoothly.',
      'In a small pan, heat ghee, brown sliced garlic, add cumin, curry leaves, and dried chillies; pour hot tadka over daal.',
      'Boil basmati rice with cumin seeds and a touch of salt to make cumin rice.',
      'Serve comforting daal chawal with lemon wedges, raw onion salad, and pickle.'
    ],
    proTip: 'Cover the pot immediately after pouring the garlic-cumin tadka to seal the fragrant aroma into the daal.',
    parhezAlerts: {
      diabetes: {
        status: 'caution',
        tip: 'Daal is wonderful, but white rice spikes blood sugar. Pair with brown rice or enjoy daal as a hearty soup.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Gentle and low-sodium meal that does not strain blood pressure.'
      },
      uric_acid: {
        status: 'safe',
        tip: 'Moong daal is recognized as the safest, lightest lentil for uric acid patients.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Virtually fat-free with high soluble fiber; highly heart-friendly.'
      },
      kidney_care: {
        status: 'safe',
        tip: 'High fluid content and balanced minerals support kidney comfort.'
      }
    }
  },
  'shaljam-gosht': {
    name: 'Winter Shaljam Gosht (Turnip & Meat Curry)',
    seasonalNotes: 'December & January winter specialty; subtle turnip sweetness beautifully complements savory meat.',
    utensil: {
      name: 'Clay Pot (Mitti ki Handi) or Pressure Cooker',
      type: 'handi',
      reason: 'Clay pot cooking softens turnip fibers until they melt seamlessly into the savory meat gravy.',
      healthBenefit: 'Turnips support liver detoxification, provide vitamin C, and soothe winter respiratory congestion.'
    },
    ingredients: [
      { name: 'Mutton / Beef with Bones', quantity: '600g' },
      { name: 'Fresh Purple-Top Turnips (Shaljam)', quantity: '1/2 kg' },
      { name: 'Onions, Tomatoes & Ginger', quantity: '2 each' },
      { name: 'Pinch of Jaggery / Sugar', quantity: '1/2 tsp' },
      { name: 'Cooking Oil & Spices', quantity: '1/3 cup' }
    ],
    instructions: [
      'In a cooker, heat oil, brown onions, add meat and ginger-garlic paste; sauté for 5 minutes.',
      'Add tomatoes, turmeric, chilli powder, coriander powder, and salt; fry until oil separates.',
      'Add water, cover, and pressure cook until meat is 80% tender.',
      'Peel and dice turnips, add to meat along with a pinch of jaggery, and cook for 8 minutes until turnips are soft.',
      'Lightly mash turnips with the back of a spoon; garnish with cilantro and serve with hot chapatis.'
    ],
    proTip: 'Turnips have a mild natural sharpness; adding a pinch of jaggery or sugar neutralizes the bite and balances the flavors.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'Low glycemic index. Set aside a portion without jaggery for diabetic members.'
      },
      hypertension: {
        status: 'caution',
        tip: 'Keep meat fat low and table salt moderate.'
      },
      uric_acid: {
        status: 'avoid',
        tip: 'Red meat broth increases purine load. Cook turnips with chicken breast instead.'
      },
      cholesterol_heart: {
        status: 'caution',
        tip: 'Trim all visible fat and cook in cold-pressed oil.'
      }
    }
  },
  'chana-pulao': {
    name: 'Degi Chana Pulao (Spiced Chickpea Rice)',
    seasonalNotes: 'Beloved Friday lunch and festive family staple; comforting and fragrant.',
    utensil: {
      name: 'Heavy Bottom Degchi',
      type: 'degchi',
      reason: 'Even steam circulation ensures fluffy, separated rice grains without crusting or burning.',
      healthBenefit: 'White chickpeas deliver plant-based protein, iron, and folate for sustained vitality.'
    },
    ingredients: [
      { name: 'Basmati Rice', quantity: '600g' },
      { name: 'Boiled White Chickpeas', quantity: '350g' },
      { name: 'Sliced Onions', quantity: '2 large' },
      { name: 'Whole Garam Masala & Green Chillies', quantity: '2 tbsp' },
      { name: 'Cooking Oil / Ghee', quantity: '1/3 cup' }
    ],
    instructions: [
      'Heat oil in a pot and fry onions until deep golden brown for that authentic degi color.',
      'Add ginger-garlic, whole spices (cumin, cloves, black pepper, bay leaf), and 2 tbsp water to release color.',
      'Add boiled chickpeas, slit green chillies, and salt; sauté for 5 minutes.',
      'Pour 1.5 times water to rice ratio and bring to a boil; stir in soaked basmati rice.',
      'When liquid is mostly absorbed, cover tightly and steam (dum) on low for 15 minutes. Serve with cumin raita.'
    ],
    proTip: 'Pulao color comes from how deeply you brown the onions; achieve a rich golden hue before deglazing with water.',
    parhezAlerts: {
      diabetes: {
        status: 'caution',
        tip: 'White rice has high glycemic load. Take more chickpeas and minimal rice with raw onion salad.'
      },
      hypertension: {
        status: 'safe',
        tip: 'Safe when cooked with modest salt and vegetable oil.'
      },
      uric_acid: {
        status: 'caution',
        tip: 'Chickpeas have moderate purines; limit portion size during active flares.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Pure plant-based protein without animal saturated fats.'
      }
    }
  },
  'chicken-corn-soup': {
    name: 'Desi Chicken Corn Soup & Boiled Eggs',
    seasonalNotes: 'Beloved winter evening comforter; protects against seasonal colds and chills.',
    utensil: {
      name: 'Stainless Steel Saucepan or Clay Pot',
      type: 'degchi',
      reason: 'Gentle simmering clarifies the chicken broth while cornstarch thickens smoothly without clumping.',
      healthBenefit: 'Warm broth soothes the respiratory tract, eases throat irritation, and restores depleted stamina.'
    },
    ingredients: [
      { name: 'Chicken Bones & Breast', quantity: '400g' },
      { name: 'Sweet Corn Kernels', quantity: '1 cup' },
      { name: 'Beaten Egg Whites', quantity: '2 pcs' },
      { name: 'Cornstarch (Cornflour)', quantity: '3 tbsp' },
      { name: 'Soy Sauce, Chilli Sauce & Vinegar', quantity: '3 tbsp' }
    ],
    instructions: [
      'Boil chicken with 5 cups water, salt, garlic, and crushed black pepper for 20 minutes to make broth.',
      'Remove chicken, shred finely, and return shredded chicken to the simmering broth.',
      'Add sweet corn kernels and bring to a gentle boil.',
      'Dissolve cornstarch in a little cold water and drizzle into soup while stirring until thick.',
      'Slowly pour beaten egg whites while gently stirring to create delicate white ribbons. Serve hot with vinegar and chilli sauce.'
    ],
    proTip: 'Lower the flame when drizzling egg whites and stir very gently to form long, silky ribbons rather than tiny clumps.',
    parhezAlerts: {
      diabetes: {
        status: 'safe',
        tip: 'High in lean protein and low in calories. Keep cornstarch light for diabetic patients.'
      },
      hypertension: {
        status: 'caution',
        tip: 'Soy sauce contains high sodium; serve high-BP members the pure black pepper broth without soy sauce.'
      },
      uric_acid: {
        status: 'caution',
        tip: 'Consume in moderation; avoid excess concentrated chicken broth daily.'
      },
      cholesterol_heart: {
        status: 'safe',
        tip: 'Clear skinless chicken broth is virtually cholesterol-free and highly invigorating.'
      }
    }
  }
};



// Multi-language title, subtitle and seasonal notes dictionary
const localizedMetadata: Record<Language, Record<string, { title: string; subTitle: string; seasonNotes?: string }>> = {
  ur: {
    'halwa-puri': {
      title: 'لاہوری حلوہ پوری اور چنے کا سالن',
      subTitle: 'سوجی کا گرما گرم حلوہ، مسالے دار چنے اور خستہ نرم پوریاں'
    },
    'siri-paaye': {
      title: 'لاہوری سری پائے اور گرم نان',
      subTitle: 'ساری رات دھیمی آنچ پر پکنے والا روغنی عرق دار پائے کا شوربہ'
    },
    'naan-chanay': {
      title: 'لاہوری ناشتہ نان چنے اور تندوری نان',
      subTitle: 'کالی مرچ اور مسور کی گاڑھی گریوی والے روایتی چنے مع اچار و پیاز'
    },
    'chai-paratha': {
      title: 'کڑک چائے اور دیسی گھی کا پراٹھا',
      subTitle: 'الائچی والی کڑک دودھ پتی اور بل دار کرکرا دیسی گھی پراٹھا'
    },
    'anda-paratha-omelette': {
      title: 'دیسی آملیٹ اور کرکرا پراٹھا',
      subTitle: 'پیاز، ہری مرچ اور ٹماٹر سے بھرا پھولا ہوا آملیٹ مع لچھے دار پراٹھا'
    },
    'anda-paratha-halffry': {
      title: 'ہاف فرائی انڈا اور کرکرا پراٹھا',
      subTitle: 'کالی مرچ اور رسیلی زردی والا ہاف فرائی انڈا اور گرما گرم کرکرا پراٹھا'
    },
    'anda-paratha-boiled': {
      title: 'ابلا ہوا انڈا، چاٹ مصالحہ اور پراٹھا',
      subTitle: 'صحت بخش پروٹین ناشتہ، ابلے دیسی انڈے مع چاٹ مصالحہ اور ہلکا پراٹھا'
    },
    'dahi-lassi': {
      title: 'موسمی تازہ دہی، ٹھنڈی لسی اور پراٹھا',
      subTitle: 'مٹکے کا میٹھا دہی، ملائی دار لسی اور گرما گرم گھی کا پراٹھا'
    },
    'bread-toast-anda-chai': {
      title: 'ڈبل روٹی (بریڈ ٹوسٹ)، انڈے اور کڑک چائے',
      subTitle: 'ہلکا پھلکا فوری ناشتہ: مکھن لگا ٹوسٹ، انڈے اور گرم چائے'
    },
    'sarson-saag-roti': {
      title: 'سرسوں کا ساگ، مکھن اور گرم روٹی / مکئی کی روٹی',
      subTitle: 'سردیوں کی خاص سوغات: دیسی ساگ، لہسن ادرک تڑکا اور تازہ مکھن'
    },
    'gajar-matar-aloo-roti': {
      title: 'موسمی گاجر، مٹر، آلو کی بھجیا اور روٹی',
      subTitle: 'سردیوں کی مشہور سبزی: میٹھی سرخ گاجریں، ہرے مٹر اور زیرہ بھجیا'
    },
    'gobhi-matar-aloo-roti': {
      title: 'پھول گوبھی، مٹر اور آلو کی سبزی اور روٹی',
      subTitle: 'سردیوں کی خستہ پھول گوبھی، میٹھے مٹر اور آلو کا خوشبودار سالن'
    },
    'shaljam-bhujia-roti': {
      title: 'دیسی شلجم کی بھجیا (گڑ اور دیسی گھی تڑکا) اور روٹی',
      subTitle: 'سردیوں کی روایتی سبزی: گڑ اور دیسی گھی کے تڑکے والے ملائم شلجم'
    },
    'methi-aloo-roti': {
      title: 'تازہ قصوری میتھی آلو کی بھجیا اور روٹی',
      subTitle: 'سردیوں کی خوشبودار سبزی: تازہ ہری میتھی کے پتے اور بھنے آلو'
    },
    'palak-aloo-roti': {
      title: 'دیسی پالک آلو کا سالن اور گرما گرم روٹی',
      subTitle: 'سردیوں کی تازہ پالک، آلو کے قتلوں اور لہسن کے بگھار والا سالن'
    },
    'mooli-bhujia-roti': {
      title: 'تازہ مولی اور پتوں کی بھجیا اور روٹی',
      subTitle: 'ہاضمہ دار سردیوں کی سبزی: تازی سفید مولی اور اجوائن تڑکا'
    },
    'bhindi-masala-roti': {
      title: 'کرکری بھنڈی پیاز مصالحہ اور گرما گرم پھلکا روٹی',
      subTitle: 'گرمیوں کی خاص سبزی: خستہ بھنڈی، پیاز مصالحہ اور لیموں کا رس'
    },
    'karelay-pyaz-roti': {
      title: 'کریلے پیاز مصالحہ / انار دانہ تڑکا اور تندوری روٹی',
      subTitle: 'خون صاف کرنے والی گرمیوں کی سبزی: کریلے، پیاز اور انار دانہ تڑکا'
    },
    'tori-bhujia-roti': {
      title: 'گھیاتوری کی ہلکی بھجیا اور نرم پھلکا روٹی',
      subTitle: 'گرمیوں کی دوپہر کا ہلکا، زود ہضم اور ٹھنڈک بخش کھانا'
    },
    'kaddu-lauki-roti': {
      title: 'گھیا کدو / لوکی کا سالن اور گرما گرم روٹی',
      subTitle: 'گرمیوں کی سب سے برکت والی اور ٹھنڈک بخش سنت سبزی'
    },
    'tinda-masala-roti': {
      title: 'دیسی ٹینڈے مصالحہ اور تازی روٹی',
      subTitle: 'گرمیوں کی خاص سبزی: چھوٹے گول دیسی ٹینڈے اور بھنا پیاز ٹماٹر'
    },
    'aloo-baingan-roti': {
      title: 'چٹپٹا آلو بینگن کا سالن اور گرم روٹی',
      subTitle: 'کلونجی، میتھی دانے اور سونف کے اچاری تڑکے والا بینگن آلو'
    },
    'arvi-masala-roti': {
      title: 'مسالے دار اروی، لیموں کا رس اور گرما گرم روٹی',
      subTitle: 'خستہ تلی ہوئی اروی، اجوائن تڑکا، ہری مرچیں اور لیموں کا رس'
    },
    'white-rice-moong-masoor': {
      title: 'سفید ابلے چاول اور تڑکا مونگ مسور دال (مع کچومبر و اچار)',
      subTitle: 'زیرہ لہسن تڑکا دال، ابلے ہوئے باسمتی چاول مع کچومر سلاد'
    },
    'white-rice-daal-chana': {
      title: 'سفید ابلے چاول اور ڈھابہ تڑکا دال چنا',
      subTitle: 'ڈھابہ اسٹائل دیسی گھی اور زیرہ تڑکا چنا دال مع سفید چاول'
    },
    'white-rice-sabut-masoor': {
      title: 'سفید ابلے چاول، ثابت کالی مسور دال اور شامی کباب',
      subTitle: 'دیسی لہسن بگھار والی کالی مسور دال، ابلے چاول اور شامی کباب'
    },
    'daal-mash-fry': {
      title: 'ڈھابہ فرائی دال ماش، مکھن اور تندوری روٹی',
      subTitle: 'مکھن اور دیسی گھی میں بھنی ہوئی کھڑی دال ماش، ادرک اور ہری مرچیں'
    },
    'chicken-biryani': {
      title: 'کراچی و سندھی چکن دم بریانی اور پودینہ رائتہ',
      subTitle: 'زعفرانی سپر باسمتی چاول، مسالے دار چکن بوٹی اور دم آلو مع رائتہ'
    },
    'chicken-pulao': {
      title: 'دیگی یخنی چکن پلاؤ اور زیرہ رائتہ',
      subTitle: 'سونف اور ثابت دھنیا کی خوشبودار یخنی میں پکے روایتی چاول مع رائتہ'
    },
    'chicken-matar-pulao': {
      title: 'چکن مٹر پلاؤ اور دہی کچومبر سلاد',
      subTitle: 'چکن بوٹی اور میٹھے ہرے مٹر کا خوشبودار ذائقہ دار پلاؤ مع سلاد'
    },
    'crispy-zinger-burger': {
      title: 'کرسپی چکن زنگر برگر مع فرنچ فرائز (فاسٹ فوڈ)',
      subTitle: 'کرسپی چکن زنگر فلے، سلاد پتہ، سوس، بن اور گرم فرائز'
    },
    'chicken-tikka-pizza': {
      title: 'دیسی چکن تکہ پین پیزا (فاسٹ فوڈ)',
      subTitle: 'اسموکی چکن تکہ بوٹی، پگھلا ہوا موزریلا چیز، شملہ مرچ اور پیاز'
    },
  },
  en: {
    'halwa-puri': {
      title: 'Traditional Halwa Puri & Chana Tarkari',
      subTitle: 'Classic breakfast platter: semolina halwa, spiced chickpeas, and puffy puris'
    },
    'siri-paaye': {
      title: 'Shahi Siri Paaye & Roghani Naan',
      subTitle: 'Slow-simmered trotters in rich aromatic gelatinous broth with piping hot naan'
    },
    'naan-chanay': {
      title: 'Lahori Naan Chanay & Achar',
      subTitle: 'Iconic Lahore street breakfast: tender spiced chickpeas in thick gravy with tandoori naan'
    },
    'chai-paratha': {
      title: 'Kadak Chai & Desi Ghee Paratha',
      subTitle: 'Every Pakistani’s timeless favorite: cardamom milk tea with flaky crispy paratha'
    },
    'anda-paratha-omelette': {
      title: 'Desi Omelette & Crispy Paratha',
      subTitle: 'Fluffy spiced egg omelette with fresh onions, chillies, and golden layered paratha'
    },
    'anda-paratha-halffry': {
      title: 'Half Fry Egg & Crispy Paratha',
      subTitle: 'Sunny-side up egg with runny yolk, cracked black pepper, and golden paratha'
    },
    'anda-paratha-boiled': {
      title: 'Boiled Egg, Chaat Masala & Paratha',
      subTitle: 'High-protein wholesome morning meal with sliced boiled eggs and tangy chaat masala'
    },
    'dahi-lassi': {
      title: 'Fresh Dahi, Meethi Lassi & Paratha',
      subTitle: 'Cooling country breakfast: rich claypot yogurt, sweet creamy lassi, and paratha'
    },
    'bread-toast-anda-chai': {
      title: 'Bread Toast, Eggs & Hot Karak Chai',
      subTitle: 'Quick and light daily breakfast: buttered toasted bread with eggs and milk tea'
    },
    'sarson-saag-roti': {
      title: 'Sarson Ka Saag, Butter & Hot Roti',
      subTitle: 'Winter heritage delicacy: slow-simmered mustard greens with white butter and corn roti'
    },
    'gajar-matar-aloo-roti': {
      title: 'Winter Gajar Matar Aloo & Hot Roti',
      subTitle: 'Vibrant winter stir-fry: sweet red carrots, tender green peas, and potatoes with cumin'
    },
    'gobhi-matar-aloo-roti': {
      title: 'Winter Phool Gobhi Matar Aloo & Hot Roti',
      subTitle: 'Crisp cauliflower florets, sweet peas, and baby potatoes sautéed in ginger-turmeric masala'
    },
    'shaljam-bhujia-roti': {
      title: 'Desi Winter Shaljam Bhujia & Hot Roti',
      subTitle: 'Sweet and savory caramelized mashed turnips tempered with jaggery and desi ghee'
    },
    'methi-aloo-roti': {
      title: 'Fresh Winter Methi Aloo & Hot Roti',
      subTitle: 'Aromatic fresh fenugreek leaves sautéed with spiced golden potatoes and cumin'
    },
    'palak-aloo-roti': {
      title: 'Desi Winter Palak Aloo & Hot Roti',
      subTitle: 'Iron-rich fresh green spinach gravy cooked with tender baby potatoes and garlic'
    },
    'mooli-bhujia-roti': {
      title: 'Fresh Winter Mooli Bhujia & Hot Roti',
      subTitle: 'Grated crisp white radish and tender radish greens sautéed with carom seeds'
    },
    'bhindi-masala-roti': {
      title: 'Crispy Summer Bhindi Masala & Phulka Roti',
      subTitle: 'Crispy pan-fried okra tossed with sweet caramelized onions, tomatoes, and pomegranate seeds'
    },
    'karelay-pyaz-roti': {
      title: 'Summer Karelay Pyaz Masala & Tandoori Roti',
      subTitle: 'Pan-crisped bitter gourd balanced with sweet slow-cooked onions and tangy raw mango'
    },
    'tori-bhujia-roti': {
      title: 'Fresh Summer Tori Bhujia & Soft Roti',
      subTitle: 'Cooling and hydrating ridge gourd stir-fry cooked gently with green chillies and cumin'
    },
    'kaddu-lauki-roti': {
      title: 'Desi Summer Lauki / Kaddu Salan & Hot Roti',
      subTitle: 'Prophetic soothing bottle gourd cooked in delicate tomato-ginger gravy with hot roti'
    },
    'tinda-masala-roti': {
      title: 'Summer Tinda Masala & Fresh Roti',
      subTitle: 'Tender apple gourds simmered in spiced onion-tomato masala with fresh coriander'
    },
    'aloo-baingan-roti': {
      title: 'Achari Aloo Baingan Masala & Hot Roti',
      subTitle: 'Silky dark eggplants and tender potatoes simmered with pickling seeds and green chillies'
    },
    'arvi-masala-roti': {
      title: 'Spiced Summer Arvi Masala & Hot Roti',
      subTitle: 'Golden crisp colocasia (taro roots) tossed with ajwain carom seeds and tangy lemon juice'
    },
    'white-rice-moong-masoor': {
      title: 'White Boiled Rice & Tarka Moong Masoor Daal',
      subTitle: 'Pakistan’s ultimate comforting dinner: steamed basmati rice with golden tempered yellow and red lentils'
    },
    'white-rice-daal-chana': {
      title: 'White Boiled Rice & Dhaba Tarka Daal Chana',
      subTitle: 'Nutritious split chickpeas simmered with whole chillies and cumin ghee, paired with rice'
    },
    'white-rice-sabut-masoor': {
      title: 'White Rice, Sabut Masoor Daal & Shami Kabab',
      subTitle: 'Whole brown lentils tempered with browned garlic, served with steamed rice and shami kababs'
    },
    'daal-mash-fry': {
      title: 'Dhaba Style Bhuni Daal Mash & Hot Roti',
      subTitle: 'Dry roasted white lentils cooked with fresh butter, ginger slivers, green chillies, and naan'
    },
    'chicken-biryani': {
      title: 'Karachi Chicken Dum Biryani & Mint Raita',
      subTitle: 'Undisputed king of Pakistani dinners: saffron long-grain basmati layered with spicy chicken and potatoes'
    },
    'chicken-pulao': {
      title: 'Degi Yakhni Chicken Pulao & Zeera Raita',
      subTitle: 'Fragrant long-grain basmati simmered slowly in rich bone broth with fennel, cumin, and coriander'
    },
    'chicken-matar-pulao': {
      title: 'Chicken Matar Pulao & Dahi Kachumber',
      subTitle: 'Tender chicken morsels and sweet green peas steamed together in cumin spiced basmati rice'
    },
    'crispy-zinger-burger': {
      title: 'Crispy Chicken Zinger Burger & French Fries',
      subTitle: 'Crisp golden fried chicken fillet with creamy mayonnaise, fresh iceberg lettuce, and french fries'
    },
    'chicken-tikka-pizza': {
      title: 'Desi Pan-Baked Chicken Tikka Pizza',
      subTitle: 'Smoky charbroiled chicken tikka cubes on fresh dough with melted mozzarella, onions, and bell peppers'
    },
  },
  pa: {
    'halwa-puri': {
      title: 'لاہوری حلوہ پوری تے چنے',
      subTitle: 'سوجی دا مٹھا حلوہ، چٹپٹے چنے تے پھلیاں پوریاں'
    },
    'siri-paaye': {
      title: 'لاہوری سری پائے تے تندوری نان',
      subTitle: 'رات بھر ہولی اَگ تے پکیا سوادی پاواں دا شوربہ'
    },
    'naan-chanay': {
      title: 'لاہوری نان چنے تے تندوری روٹی',
      subTitle: 'کالی مرچ آلے گاڑھے چنے، تندوری گرم نان تے اچار'
    },
    'chai-paratha': {
      title: 'کڑک چاہ تے دیسی گھیو دا پروٹھا',
      subTitle: 'الائچی آلی کڑک چاہ تے مکھن آلا لچھے دار پروٹھا'
    },
    'anda-paratha-omelette': {
      title: 'دیسی آملیٹ تے کرکرا پروٹھا',
      subTitle: 'پیاز ہری مرچاں آلا پھلیا آملیٹ تے خستہ پروٹھا'
    },
    'anda-paratha-halffry': {
      title: 'ہاف فرائی آنڈا تے پروٹھا',
      subTitle: 'کالی مرچ آلا ہاف فرائی آنڈا تے گرما گرم پروٹھا'
    },
    'anda-paratha-boiled': {
      title: 'ابلا آنڈا، چاٹ مصالحہ تے پروٹھا',
      subTitle: 'پروٹین نال بھریا ناشتہ، ابلا آنڈا، مصالحہ تے روٹی یا پروٹھا'
    },
    'dahi-lassi': {
      title: 'مٹکے دا دہی، مٹھی لسی تے پروٹھا',
      subTitle: 'ٹھنڈی ملائی آلی لسی، تازی دہی تے گرما گرم پروٹھا'
    },
    'bread-toast-anda-chai': {
      title: 'بریڈ ٹوسٹ، آنڈے تے کڑک چاہ',
      subTitle: 'ہلکا پھلکا ناشتہ: مکھن آلا ٹوسٹ، آنڈا تے مٹھی چاہ'
    },
    'sarson-saag-roti': {
      title: 'سرسوں دا ساگ، چٹا مکھن تے مکی دی روٹی',
      subTitle: 'پنجاب دی سوغات: ہولی اَگ تے کڑھیا ساگ تے مکھن دا پیڑا'
    },
    'gajar-matar-aloo-roti': {
      title: 'گاجر، مٹر، آلو دی سبزی تے پھلکا',
      subTitle: 'سردیاں دی تازی سبزی: مٹھی گاجر، ہرے مٹر تے مصالحے آلے آلو'
    },
    'gobhi-matar-aloo-roti': {
      title: 'پھل گوبھی، مٹر، آلو تے گرم پھلکا',
      subTitle: 'سردیاں دی خستہ گوبھی تے تازی ادرک نال بھنی سبزی'
    },
    'shaljam-bhujia-roti': {
      title: 'دیسی شلجم دی مٹھی بھجیا تے روٹی',
      subTitle: 'گُڑ تے دیسی گھیو دا تڑکا لگی شلجم دی روایتی بھجیا'
    },
    'methi-aloo-roti': {
      title: 'تازہ میتھی آلو تے تندوری روٹی',
      subTitle: 'خوشبودار قصوری میتھی تے تلے آلوواں دی مزیدار بھجیا'
    },
    'palak-aloo-roti': {
      title: 'پالک آلو دا سالن تے تازی روٹی',
      subTitle: 'لہسن دے تڑکے آلی تازی پالک تے آلو دا سوادی سالن'
    },
    'mooli-bhujia-roti': {
      title: 'مولی دی بھجیا تے اجوائن روٹی',
      subTitle: 'ہاضمے آلی تازی مولی تے ہرے پتیاں دی بھنی ہوئی سبزی'
    },
    'bhindi-masala-roti': {
      title: 'کرکری بھنڈی مصالحہ تے پھلکا روٹی',
      subTitle: 'تلی ہوئی خستہ بھنڈی، انار دانہ تے پیاز دی چٹپٹی سبزی'
    },
    'karelay-pyaz-roti': {
      title: 'کریلے پیاز مصالحہ تے تندوری روٹی',
      subTitle: 'خون صاف کرن آلی سوغات: کریلے تے چوکھے پیاز دی سبزی'
    },
    'tori-bhujia-roti': {
      title: 'توری دی سوادی بھجیا تے نرم پھلکا',
      subTitle: 'معدے نوں ٹھنڈک دین آلی ہلکی پھلکی توری دی سبزی'
    },
    'kaddu-lauki-roti': {
      title: 'گھیا کدو دا سالن تے تازی روٹی',
      subTitle: 'گرمی نوں مارن آلی تازی لوکی تے کدو دی ہلکی سبزی'
    },
    'tinda-masala-roti': {
      title: 'دیسی ٹینڈے مصالحہ تے پھلکا روٹی',
      subTitle: 'نکے نکے دیسی ٹینڈے تے بھنے ہوئے مصالحے دی سبزی'
    },
    'aloo-baingan-roti': {
      title: 'اچاری آلو بینگن تے گرما گرم روٹی',
      subTitle: 'کلونجی تے سونف دے تڑکے آلا چٹپٹا بینگن دا سالن'
    },
    'arvi-masala-roti': {
      title: 'چٹپٹی اروی مصالحہ تے پھلکا روٹی',
      subTitle: 'تلی ہوئی کرکری اروی، اجوائن دا تڑکا تے نچوڑیا لیموں'
    },
    'white-rice-moong-masoor': {
      title: 'ابلے چاول تے تڑکا مونگ مسور دال',
      subTitle: 'لہسن تے زیرے دے تڑکے آلی پتلی دال تے ابلے باسمتی چاول'
    },
    'white-rice-daal-chana': {
      title: 'ابلے چاول تے ڈھابہ تڑکا چنا دال',
      subTitle: 'دیسی گھیو دے تڑکے آلی چنا دال تے باسمتی ابلے چاول'
    },
    'white-rice-sabut-masoor': {
      title: 'ابلے چاول، کالی مسور دال تے شامی کباب',
      subTitle: 'تڑکے آلی ثابت مسور دال، ابلے چاول تے سوادی شامی کباب'
    },
    'daal-mash-fry': {
      title: 'ڈھابہ فرائی دال ماش تے مکھن روٹی',
      subTitle: 'مکھن چ بھنی ہوئی کھڑی دال ماش تے کٹی ہوئی تازی ادرک'
    },
    'chicken-biryani': {
      title: 'کراچی چکن دم بریانی تے پودینہ رائتہ',
      subTitle: 'زعفرانی چاول، چٹپٹی چکن بوٹی، آلو تے ٹھنڈا رائتہ'
    },
    'chicken-pulao': {
      title: 'دیگی یخنی چکن پلاؤ تے زیرہ رائتہ',
      subTitle: 'خوشبودار یخنی چ پکے سوادی چاول تے ٹھنڈا زیرہ رائتہ'
    },
    'chicken-matar-pulao': {
      title: 'چکن مٹر پلاؤ تے کچومر سلاد',
      subTitle: 'نرم چکن بوٹی تے ہرے مٹر آلا سوادی پلاؤ تے دہی'
    },
    'crispy-zinger-burger': {
      title: 'کرسپی چکن زنگر برگر تے چپس',
      subTitle: 'کرسپی تلیا چکن، سلاد، مایونیز برگر تے گرم فرائز'
    },
    'chicken-tikka-pizza': {
      title: 'چکن تکہ پین پیزا مع چیز',
      subTitle: 'اسموکی چکن تکہ، پگھلیا پنیر (چیز)، شملہ مرچ تے پیاز'
    },
  },
  ps: {
    'halwa-puri': {
      title: 'لاہوری حلوا پوری او د چڼو ښوروا',
      subTitle: 'د سوجي خوږه حلوا، خوندورې چڼې او تودې نرمې پورۍ'
    },
    'siri-paaye': {
      title: 'لاہوری پښې او تازه ډوډۍ (پاچايي پايې)',
      subTitle: 'په ټوله شپه په نرمه اور پخ شوي خوندور هډوکي او ښوروا'
    },
    'naan-chanay': {
      title: 'لاہوری نان چڼې او تندوري ډوډۍ',
      subTitle: 'د تورو مرچکو خوندورې چڼې، تندوري نان او ترشي'
    },
    'chai-paratha': {
      title: 'کلکه چای او د غوړیو پراټه',
      subTitle: 'د هیل خوندورې چای او د سوچه غوړیو پخه شوې کرکره پراټه'
    },
    'anda-paratha-omelette': {
      title: 'دودیز املېټ او خوندوره پراټه',
      subTitle: 'د پیازو او تېرو مرچکو ډک املېټ او د غوړیو کرکره پراټه'
    },
    'anda-paratha-halffry': {
      title: 'نیمه تلی شوې هګۍ او پراټه',
      subTitle: 'د تور مرچکو نیمه تلی شوې هګۍ او توده کرکره پراټه'
    },
    'anda-paratha-boiled': {
      title: 'ایشېدلې هګۍ، چاټ مساله او پراټه',
      subTitle: 'روغتیایي لوړ پروټین ناشته، ایشېدلې هګۍ او د غوړیو پراټه'
    },
    'dahi-lassi': {
      title: 'تازه مستې، خوږه لسي او پراټه',
      subTitle: 'د خاورین منګي تازه مستې، د سرشیر لسي او ګرمه پراټه'
    },
    'bread-toast-anda-chai': {
      title: 'ټوسټ شوې ډوډۍ، هګۍ او ګرمه چای',
      subTitle: 'سپکه او چټکه ناشته: کوچ لګول شوې ډوډۍ، هګۍ او شیدو چای'
    },
    'sarson-saag-roti': {
      title: 'د شړشمو ساګ، سوچه کوچ او توده ډوډۍ',
      subTitle: 'د ژمي ځانګړی سوغات: ورو ورو پخ شوی ساګ او تازه کوچ'
    },
    'gajar-matar-aloo-roti': {
      title: 'د ژمي ګازرې، مټري، کچالو او توده ډوډۍ',
      subTitle: 'د ژمي خوندوره سبزي: خوږې سورې ګازرې او تازه مټري'
    },
    'gobhi-matar-aloo-roti': {
      title: 'ګلپي، مټري او کچالو سبزي له ډوډۍ سره',
      subTitle: 'د ژمي خوندور ګلپي، تازه مټري او د ادرکو تریخ مساله'
    },
    'shaljam-bhujia-roti': {
      title: 'د ژمي ټیپر سبزي او ګرمه ډوډۍ',
      subTitle: 'په خوږه ګوړه او سوچه غوړیو پخه شوې د شلجمو خوندوره سبزي'
    },
    'methi-aloo-roti': {
      title: 'د ژمي میتي، کچالو او توده ډوډۍ',
      subTitle: 'د تازه میتي خوشبویه پاڼې او د کچالو خوندور سالن'
    },
    'palak-aloo-roti': {
      title: 'د پالکو او کچالو سالن له ډوډۍ سره',
      subTitle: 'د اوسپنې بډایه تازه پالک او نرم کچالو د اوږې په تڑکا سره'
    },
    'mooli-bhujia-roti': {
      title: 'د مولیګو او پاڼو سبزي له تودې ډوډۍ سره',
      subTitle: 'د ژمي د هاضمې غوره سبزي: تازه سپینې مولیګې او پاڼې'
    },
    'bhindi-masala-roti': {
      title: 'کرکره بهینډي مساله او نرمه ډوډۍ',
      subTitle: 'د اوړي ځانګړې سبزي: تلی شوې بهینډي د پیازو او لیمو سره'
    },
    'karelay-pyaz-roti': {
      title: 'د کریلې او پیازو مساله له تندوري ډوډۍ سره',
      subTitle: 'د اوړي ګټوره سبزي: کریلې د خوږو پیازو او اناردانې سره'
    },
    'tori-bhujia-roti': {
      title: 'د تورۍ سپکه سبزي او نرمه ډوډۍ',
      subTitle: 'د اوړي د غرمې سپک او یخ خواړه: نرمه تورۍ له زیرې سره'
    },
    'kaddu-lauki-roti': {
      title: 'د لوکي / کدو سالن له تودې ډوډۍ سره',
      subTitle: 'د اوړي یخ او سنت خواړه: نرم کدو په سپکه ښوروا کې'
    },
    'tinda-masala-roti': {
      title: 'د اوړي ټینډې مساله او تازه ډوډۍ',
      subTitle: 'د اوړي ځانګړې سبزي: واړه ګردي ټینډي او د پیازو مساله'
    },
    'aloo-baingan-roti': {
      title: 'ترش بینګن او کچالو له تودې ډوډۍ سره',
      subTitle: 'د کلونجي او سونف په ترش خوند پخ شوي تور بینګن او کچالو'
    },
    'arvi-masala-roti': {
      title: 'د اوړي اروي مساله او تازه ډوډۍ',
      subTitle: 'تلی شوې کرکره اروي، د اجواین تڑکا او د لیمو تازه جوس'
    },
    'white-rice-moong-masoor': {
      title: 'سپینې وریجې او د تڑکا مونګ مسور دال',
      subTitle: 'د زیرې او اوږې تڑکا دال او تودې پخې شوې باسمتي وریجې'
    },
    'white-rice-daal-chana': {
      title: 'سپینې وریجې او د چڼو تڑکا دال',
      subTitle: 'په سوچه غوړیو او زیره تڑکا شوې چڼو دال له وریجو سره'
    },
    'white-rice-sabut-masoor': {
      title: 'سپینې وریجې، ثابته دال او شامي کباب',
      subTitle: 'د هوږې تڑکا توره مسور دال، وریجې او د غوښې شامي کباب'
    },
    'daal-mash-fry': {
      title: 'ډهابه فرای ماش دال او تود نان',
      subTitle: 'په تازه کوچ کې پخه شوې د ماش دال د ادرکو او شنو مرچکو سره'
    },
    'chicken-biryani': {
      title: 'د کراچۍ چرګ ډم بریاني او د ولنې رائته',
      subTitle: 'د زعفرانو اوږده باسمتي وریجې، خوندور چرګ او د نعناع تروه شړومبې'
    },
    'chicken-pulao': {
      title: 'د چرګ دیګي یخني پلاو او زیره رائته',
      subTitle: 'په خوشبویه یخني کې پخې شوې وریجې د چرګ له غوښې سره'
    },
    'chicken-matar-pulao': {
      title: 'د چرګ او مټرو پلاو له کچومبر سلاد سره',
      subTitle: 'د چرګ غوښه او خوږ مټري په عطري وریجو کې د تازه سلاد سره'
    },
    'crispy-zinger-burger': {
      title: 'کرسپي چرګ زنګر برګر له چپسو سره',
      subTitle: 'تلی شوی کرسپي چرګ، ساس، سلاد او ګرم کچالو فرایز'
    },
    'chicken-tikka-pizza': {
      title: 'د چرګ ټکه پین پیزا د پنیر سره',
      subTitle: 'د چرګ ټکه غوښه، ویلې شوی پنیر (چیز) او شنه مرچکه'
    },
  },
  ar: {
    'halwa-puri': {
      title: 'حلاوة بوري وحمص تقليدي',
      subTitle: 'وجبة إفطار تقليدية: حلوى السميد، حمص متبل، وخبز بوري مقلي'
    },
    'siri-paaye': {
      title: 'أقدام البقر المطهوة ببطء (سيري بايي)',
      subTitle: 'مرق غني ودسم مطهو على نار هادئة يقدم مع خبز النان الساخن'
    },
    'naan-chanay': {
      title: 'حمص لاهوري تقليدي مع خبز النان',
      subTitle: 'إفطار كلاسيكي من الحمص المتبل بالفلفل الأسود مع النان والمخلل'
    },
    'chai-paratha': {
      title: 'شاي كرك ساخن مع خبز باراثا بالسمن',
      subTitle: 'الإفطار الشعبي الدائم: شاي كرك بالهيل مع باراثا مقرمشة بالسمن البلدي'
    },
    'anda-paratha-omelette': {
      title: 'عجة بيض باكستانية متبلة مع خبز باراثا',
      subTitle: 'عجة بيض مقلية مع البصل والفلفل الحار والكزبرة وباراثا مقرمشة'
    },
    'anda-paratha-halffry': {
      title: 'بيض عيون نصف مقلي مع باراثا',
      subTitle: 'بيض مقلي بصفار سائل وفلفل أسود مع خبز باراثا ساخن ومقرمش'
    },
    'anda-paratha-boiled': {
      title: 'بيض مسلوق مع بهارات شات وباراثا',
      subTitle: 'إفطار صحي غني بالبروتين مع بيض مسلوق وتوابل شات المنعشة'
    },
    'dahi-lassi': {
      title: 'زبادي طازج، لبن لاسي حلو وباراثا',
      subTitle: 'إفطار منعش ومبرد: لبن زبادي طازج، لاسي حلو بالقشطة، وباراثا'
    },
    'bread-toast-anda-chai': {
      title: 'توست محمص مع بيض وشاي كرك',
      subTitle: 'إفطار خفيف وسريع: خبز محمص بالزبدة مع بيض وشاي بالحليب'
    },
    'sarson-saag-roti': {
      title: 'سارسون كا ساغ (أوراق الخردل) مع الزبدة والخبز',
      subTitle: 'طبق الشتاء الشهير: خضار الخردل المطهوة بالزبدة مع خبز الذرة'
    },
    'gajar-matar-aloo-roti': {
      title: 'خضار شتوية مشكلة: جزر وبازلاء وبطاطا',
      subTitle: 'طبق خضار شتوي متبل بالكمون: جزر حلو، بازلاء خضراء، وبطاطس طازجة'
    },
    'gobhi-matar-aloo-roti': {
      title: 'قرنبيط وبازلاء وبطاطا بتوابل الزنجبيل',
      subTitle: 'زهرات قرنبيط مقرمشة مع البازلاء الحلوة والبطاطا المتبلة بالكركم'
    },
    'shaljam-bhujia-roti': {
      title: 'لفت شتوي مكرمل بالسمن والتوابل (شلجم)',
      subTitle: 'طبق لفت شتوي تقليدي مطهو على نار هادئة بطعم حلو وحار متوازن'
    },
    'methi-aloo-roti': {
      title: 'أوراق الحلبة الطازجة مع البطاطا (ميثي آلو)',
      subTitle: 'أوراق حلبة خضراء عطرية مطهوة مع البطاطا المتبلة بالكمون والكزبرة'
    },
    'palak-aloo-roti': {
      title: 'سبانخ طازجة مطهوة مع البطاطا والثوم (بالاك آلو)',
      subTitle: 'طبق سبانخ غني بالحديد مطهو بمرق خفيف مع البطاطس والثوم المقلي'
    },
    'mooli-bhujia-roti': {
      title: 'فجل أبيض مطهو مع أوراقه الخضراء (مولي بهوجيا)',
      subTitle: 'فجل طازج مبشور مطهو مع أوراقه الخضراء وتوابل الأجوين الهاضمة'
    },
    'bhindi-masala-roti': {
      title: 'بامية مقلية متبلة مع البصل (بهيندي ماسالا)',
      subTitle: 'بامية صيفية مقرمشة مطهوة مع البصل المكرمل وعصير الليمون'
    },
    'karelay-pyaz-roti': {
      title: 'قرع مر متبل مع البصل المكرمل (كاريلا)',
      subTitle: 'طبق صحي لتنقية الدم: قرع مر مقلي مع البصل الحلو والليمون'
    },
    'tori-bhujia-roti': {
      title: 'كوسا صيفية خفيفة بالكمون (توري بهوجيا)',
      subTitle: 'طبق صيفي خفيف ومرطب سهل الهضم مطهو بالكمون وزيت الزيتون'
    },
    'kaddu-lauki-roti': {
      title: 'يقطين القرع الصيفي المهدئ (لوكي سالان)',
      subTitle: 'طبق يقطين خفيف ومهدئ للمعدة مطهو بمرق الطماطم الخفيف والزنجبيل'
    },
    'tinda-masala-roti': {
      title: 'قرع التفاح الصيفي المتبل (تيندا ماسالا)',
      subTitle: 'طبق خضار صيفي هندي شهي مطهو بصلصة الطماطم والبصل والكزبرة'
    },
    'aloo-baingan-roti': {
      title: 'باذنجان وبطاطا ببهارات المخلل (ألو باينغان)',
      subTitle: 'باذنجان طري مع بطاطس بمرق متبل بحبة البركة وبذور الشمر'
    },
    'arvi-masala-roti': {
      title: 'قلقاس صيفي مقلي ومتبل بالليمون (أرفي ماسالا)',
      subTitle: 'قطع قلقاس مقلية ومقرمشة متبلة ببذور الأجوين وعصير الليمون المنعش'
    },
    'white-rice-moong-masoor': {
      title: 'أرز بسمتي أبيض مع عدس مونغ ومسور بالتادكا',
      subTitle: 'العشاء الأكثر راحة: أرز أبيض مسلوق مع عدس أصفر وأحمر متبل بالثوم والكمون'
    },
    'white-rice-daal-chana': {
      title: 'أرز أبيض مسلوق مع عدس الحمص (دال شانا)',
      subTitle: 'حمص أصفر مقسوم مطهو بالسمن البلدي والكمون مع أرز بسمتي'
    },
    'white-rice-sabut-masoor': {
      title: 'أرز أبيض مع عدس أسود كامل وكباب شامي',
      subTitle: 'عدس بني كامل مع طشة الثوم يقدم مع الأرز البسمتي وكباب الشامي'
    },
    'daal-mash-fry': {
      title: 'عدس ماش أبيض مقلي على طريقة الطرقات (ماش فراي)',
      subTitle: 'عدس أبيض جاف محمص بالزبدة والزنجبيل والفلفل الأخضر الحار مع خبز النان'
    },
    'chicken-biryani': {
      title: 'برياني دجاج كراتشي على البخار (دم برياني)',
      subTitle: 'ملك العشاء الباكستاني: أرز بسمتي فاخر بالزعفران مع دجاج متبل حار وبطاطس'
    },
    'chicken-pulao': {
      title: 'أرز بيلو دجاج مطهو بمرق اللحم العطري (يخني بلو)',
      subTitle: 'أرز بسمتي معطر مطهو ببطء في مرق الدجاج الغني بالشمر والكمون والكزبرة'
    },
    'chicken-matar-pulao': {
      title: 'أرز بلو بالدجاج والبازلاء الخضراء مع السلطة',
      subTitle: 'قطع دجاج طرية وبازلاء خضراء حلوة مطهوة على البخار مع أرز بسمتي متبل'
    },
    'crispy-zinger-burger': {
      title: 'برجر زنجر الدجاج المقرمش مع البطاطس المقلية',
      subTitle: 'فيليه دجاج مقلي مقرمش مع المايونيز والخس الطازج والبطاطا المقلية'
    },
    'chicken-tikka-pizza': {
      title: 'بيتزا دجاج تيكا المخبوزة في المقلاة',
      subTitle: 'قطع دجاج تيكا المدخنة على عجينة طازجة مع جبنة الموزاريلا والفلفل الحلو'
    },
  },
  fa: {
    'halwa-puri': {
      title: 'حلوا پوری و خورش چانا لاهوری',
      subTitle: 'صبحانه اصیل: حلوای سمولینا، نخود تند و نان پوری داغ'
    },
    'siri-paaye': {
      title: 'کله‌پاچه سنتی لاهوری (سیری پای)',
      subTitle: 'آبگوشت ژلاتینی و معطر آرام‌پز با نان گرم روغنی'
    },
    'naan-chanay': {
      title: 'نان چانا لاهوری و ترشی',
      subTitle: 'نخود غلیظ فلفلی پخته شده با ادویه معطر و نان تندوری'
    },
    'chai-paratha': {
      title: 'چای کرک هل‌دار و نان پراتا با روغن حیوانی',
      subTitle: 'چای شیرین معطر و پراتای لایه‌لایه برشته و خوش‌طعم'
    },
    'anda-paratha-omelette': {
      title: 'املت سبزیجات سنتی و نان پراتا',
      subTitle: 'املت تخم‌مرغ معطر با پیاز و فلفل تازه و پراتای طلایی'
    },
    'anda-paratha-halffry': {
      title: 'نیمرو عسلی و نان پراتای برشته',
      subTitle: 'تخم‌مرغ نیمرو با زرده روان و فلفل سیاه همراه پراتای داغ'
    },
    'anda-paratha-boiled': {
      title: 'تخم‌مرغ آب‌پز با چات ماسالا و نان پراتا',
      subTitle: 'صبحانه مقوی و پرپروتئین با ادویه تند و پراتای سبک'
    },
    'dahi-lassi': {
      title: 'ماست تازه سنتی، لاسی شیرین و پراتا',
      subTitle: 'صبحانه خنک‌کننده: ماست کوزه‌ای، نوشیدنی لاسی خامه‌ای و پراتا'
    },
    'bread-toast-anda-chai': {
      title: 'نان تست کره‌ای، تخم‌مرغ و چای داغ',
      subTitle: 'صبحانه سبک روزمره: نان برشته با کره، تخم‌مرغ و چای معطر'
    },
    'sarson-saag-roti': {
      title: 'خوراک سارسن ساگ، کره حیوانی و نان سنتی',
      subTitle: 'غذای اصیل زمستانی: سبزی خردل پخته شده با کره محلی و نان ذرت'
    },
    'gajar-matar-aloo-roti': {
      title: 'خوراک هویج، نخود فرنگی و سیب‌زمینی زمستانی',
      subTitle: 'سبزیجات معطر فصلی: هویج شیرین، نخود فرنگی تازه و زیره با نان گرم'
    },
    'gobhi-matar-aloo-roti': {
      title: 'گل‌کلم، نخود فرنگی و سیب‌زمینی معطر',
      subTitle: 'گل‌کلم ترد زمستانی تفت‌داده با زنجبیل تازه، نخود فرنگی و نان'
    },
    'shaljam-bhujia-roti': {
      title: 'خوراک شلغم کاراملیزه سنتی با نان گرم',
      subTitle: 'شلغم شیرین و ادویه‌دار زمستانی تفت‌داده با روغن حیوانی'
    },
    'methi-aloo-roti': {
      title: 'شنبلیله تازه و سیب‌زمینی برشته (متی آلو)',
      subTitle: 'برگ‌های شنبلیله معطر زمستانی تفت‌داده با سیب‌زمینی و ادویه'
    },
    'palak-aloo-roti': {
      title: 'اسفناج تازه با سیب‌زمینی و سیر داغ',
      subTitle: 'خوراک اسفناج مغذی و خوش‌طعم با سیب‌زمینی و نان تندوری'
    },
    'mooli-bhujia-roti': {
      title: 'ترب سفید و برگ‌های تازه تفت‌داده با نان',
      subTitle: 'خوراک تربچه سفید زمستانی و سبزیجات هاضمه با ادویه معطر'
    },
    'bhindi-masala-roti': {
      title: 'خوراک بامیه ترد با پیاز داغ و نان نرم',
      subTitle: 'بامیه تابستانی سرخ‌شده با ادویه ملس، لیمو و اناردانه'
    },
    'karelay-pyaz-roti': {
      title: 'خوراک خربزه تلخ با پیاز داغ (کارلا)',
      subTitle: 'سبزی تابستانی تصفیه‌کننده قند خون تفت‌داده با پیاز شیرین'
    },
    'tori-bhujia-roti': {
      title: 'کدو خورشتی تفت‌داده سبک با نان نرم',
      subTitle: 'غذای سبک و خنک‌کننده تابستانی با زیره و فلفل شیرین'
    },
    'kaddu-lauki-roti': {
      title: 'خوراک کدو حلوایی سبک با نان داغ',
      subTitle: 'سبزیجات سنتی آرام‌بخش و لطیف برای هضم سریع در تابستان'
    },
    'tinda-masala-roti': {
      title: 'خوراک کدو سیبی تابستانی با ادویه معطر',
      subTitle: 'کدوهای گرد کوچک تابستانی پخته شده در سس گوجه و پیاز'
    },
    'aloo-baingan-roti': {
      title: 'خوراک بادمجان و سیب‌زمینی آچاری ترش‌مزه',
      subTitle: 'بادمجان‌های براق پخته شده با سیاه‌دانه، زیره و سیب‌زمینی'
    },
    'arvi-masala-roti': {
      title: 'خوراک تارو (اروی) برشته با چاشنی لیمو',
      subTitle: 'تارو ترد سرخ‌شده با زیره، ادویه مخصوص و آبلیموی تازه'
    },
    'white-rice-moong-masoor': {
      title: 'برنج سفید کته با دال عدس مونگ و مسور',
      subTitle: 'شام آرام‌بخش سنتی: برنج باسماتی با دال عدس طعم‌دار با سیر و زیره'
    },
    'white-rice-daal-chana': {
      title: 'برنج سفید کته با دال نخود لپه دابایی',
      subTitle: 'لپه پخته شده با زیره، روغن حیوانی و فلفل قرمز به همراه برنج'
    },
    'white-rice-sabut-masoor': {
      title: 'برنج سفید با دال عدس قهوه‌ای و شامی کباب',
      subTitle: 'عدس قهوه‌ای کامل با سیر داغ، برنج دانه بلند و شامی کباب گوشت'
    },
    'daal-mash-fry': {
      title: 'دال ماش سرخ‌شده رستورانی با کره و نان تندوری',
      subTitle: 'ماش سفید تفت‌داده با کره محلی، خلال زنجبیل تازه و فلفل سبز'
    },
    'chicken-biryani': {
      title: 'بریانی مرغ مجلسی کراچی با رایته نعناع',
      subTitle: 'شاهانه و پرعطر: برنج باسماتی زعفرانی با مرغ تند مزه‌دار و ماست و نعناع'
    },
    'chicken-pulao': {
      title: 'پلو مرغ دمی با عصاره گوشت و رایته زیره',
      subTitle: 'برنج معطر پخته شده در آب مرغ غلیظ همراه رازیانه و زیره سبز'
    },
    'chicken-matar-pulao': {
      title: 'پلو مرغ با نخود فرنگی و سالاد شیرازی',
      subTitle: 'تکه‌های مرغ لذیذ و نخود فرنگی شیرین در برنج زعفرانی خوش‌عطر'
    },
    'crispy-zinger-burger': {
      title: 'برگر زینگر مرغ ترد با سیب‌زمینی سرخ‌کرده',
      subTitle: 'فیله مرغ سوخاری کریسپی با سس مایونز، کاهو پیچ و سیب‌زمینی خلال داغ'
    },
    'chicken-tikka-pizza': {
      title: 'پیتزا تابه‌ای مرغ تیکا با پنیر موزارلا',
      subTitle: 'تکه‌های مرغ باربیکیو دودی، پنیر فراوان کش‌دار، فلفل دلمه‌ای و قارچ'
    },
  },
  es: {
    'halwa-puri': {
      title: 'Halwa Puri y Garbanzos Tradicionales',
      subTitle: 'Desayuno clásico: halwa dulce de sémola, garbanzos especiados y puris inflados'
    },
    'siri-paaye': {
      title: 'Siri Paaye y Pan Naan Caliente',
      subTitle: 'Guiso tradicional de manitas cocinado a fuego lento en caldo aromático'
    },
    'naan-chanay': {
      title: 'Naan Chanay con Encurtidos',
      subTitle: 'Desayuno icónico de garbanzos en salsa espesa con pan naan al tandoor'
    },
    'chai-paratha': {
      title: 'Té Chai Especiado y Paratha Crujiente',
      subTitle: 'Té con leche y cardamomo acompañado de pan plano hojaldrado en ghee'
    },
    'anda-paratha-omelette': {
      title: 'Tortilla de Huevo Desi y Pan Paratha',
      subTitle: 'Tortilla esponjosa con cebolla y chile servida con paratha crujiente'
    },
    'anda-paratha-halffry': {
      title: 'Huevo a la Plancha y Paratha Crujiente',
      subTitle: 'Huevo frito con yema tierna, pimienta negra molida y pan paratha'
    },
    'anda-paratha-boiled': {
      title: 'Huevo Cocido con Especias y Paratha',
      subTitle: 'Desayuno nutritivo rico en proteínas con huevo duro y especias chaat'
    },
    'dahi-lassi': {
      title: 'Yogur Fresco, Lassi Dulce y Paratha',
      subTitle: 'Desayuno refrescante de yogur artesanal, batido lassi y pan paratha'
    },
    'bread-toast-anda-chai': {
      title: 'Tostadas de Pan con Huevo y Té Chai',
      subTitle: 'Desayuno rápido y ligero: pan tostado con mantequilla, huevos y té'
    },
    'sarson-saag-roti': {
      title: 'Sarson Ka Saag con Mantequilla y Roti',
      subTitle: 'Especialidad invernal de hojas de mostaza con mantequilla artesanal y roti'
    },
    'gajar-matar-aloo-roti': {
      title: 'Zanahoria, Guisantes y Patatas al Comino',
      subTitle: 'Guiso invernal saludable: zanahorias dulces, guisantes y patatas tiernas'
    },
    'gobhi-matar-aloo-roti': {
      title: 'Coliflor, Guisantes y Patatas al Jengibre',
      subTitle: 'Coliflor crujiente con guisantes y patatas salteadas en cúrcuma'
    },
    'shaljam-bhujia-roti': {
      title: 'Puré de Nabos Estofados al Ghee (Shaljam)',
      subTitle: 'Guiso invernal reconfortante de nabos caramelizados con especias suaves'
    },
    'methi-aloo-roti': {
      title: 'Hojas de Fenogreco Frescas con Patatas',
      subTitle: 'Plato aromático de hojas verdes de fenogreco y patatas salteadas'
    },
    'palak-aloo-roti': {
      title: 'Espinacas Frescas y Patatas al Ajo (Palak Aloo)',
      subTitle: 'Espinacas tiernas ricas en hierro estofadas con patatas y ajo'
    },
    'mooli-bhujia-roti': {
      title: 'Rábano Blanco Rallado con Especias (Mooli)',
      subTitle: 'Rábano fresco salteado con sus hojas y semillas aromáticas digestivas'
    },
    'bhindi-masala-roti': {
      title: 'Okra Crujiente Especiada con Cebolla (Bhindi)',
      subTitle: 'Okra frita en sartén con cebolla caramelizada, tomate y limón'
    },
    'karelay-pyaz-roti': {
      title: 'Melón Amargo Especiado con Cebolla Dulce',
      subTitle: 'Plato depurativo de melón amargo caramelizado con cebolla y especias'
    },
    'tori-bhujia-roti': {
      title: 'Calabacín de Verano Salteado al Comino (Tori)',
      subTitle: 'Guiso ligero y digestivo de calabacín tierno con especias suaves'
    },
    'kaddu-lauki-roti': {
      title: 'Calabaza de Botella Estofada (Lauki Salan)',
      subTitle: 'Guiso refrescante y suave de calabaza tierna con tomate y jengibre'
    },
    'tinda-masala-roti': {
      title: 'Calabacita Tinda Especiada con Tomate',
      subTitle: 'Pequeñas calabazas de verano estofadas en salsa de cebolla y especias'
    },
    'aloo-baingan-roti': {
      title: 'Berenjenas y Patatas al Estilo Achari',
      subTitle: 'Berenjenas tiernas con patatas cocinadas con semillas aromáticas de encurtido'
    },
    'arvi-masala-roti': {
      title: 'Taro Especiado al Limón y Carom (Arvi)',
      subTitle: 'Tubérculos de taro fritos y crujientes con especias y zumo de limón'
    },
    'white-rice-moong-masoor': {
      title: 'Arroz Blanco al Vapor con Lentejas Daal Tadka',
      subTitle: 'Cena reconfortante de arroz basmati con lentejas amarillas y rojas templadas en ajo'
    },
    'white-rice-daal-chana': {
      title: 'Arroz Blanco con Lentejas de Garbanzo (Daal Chana)',
      subTitle: 'Garbanzos partidos estofados en ghee y comino servidos con arroz basmati'
    },
    'white-rice-sabut-masoor': {
      title: 'Arroz con Lentejas Pardas Enteras y Shami Kabab',
      subTitle: 'Lentejas enteras templadas al ajo con arroz al vapor y hamburguesas shami'
    },
    'daal-mash-fry': {
      title: 'Lentejas Blancas Mash Salteadas con Mantequilla',
      subTitle: 'Lentejas blancas firmes y secas salteadas con jengibre fresco y naan caliente'
    },
    'chicken-biryani': {
      title: 'Biryani de Pollo al Dum de Karachi con Raita',
      subTitle: 'El rey de las cenas: arroz basmati aromático al azafrán con pollo picante y patatas'
    },
    'chicken-pulao': {
      title: 'Pulao de Pollo al Caldo Aromático (Yakhni Pulao)',
      subTitle: 'Arroz basmati de grano largo cocido a fuego lento en caldo de pollo con hinojo'
    },
    'chicken-matar-pulao': {
      title: 'Pulao de Pollo con Guisantes Verdes y Ensalada',
      subTitle: 'Pollo tierno y guisantes dulces cocinados al vapor con arroz basmati aromático'
    },
    'crispy-zinger-burger': {
      title: 'Hamburguesa Zinger de Pollo Crujiente con Patatas',
      subTitle: 'Filete de pollo crujiente empanado con mayonesa, lechuga iceberg y patatas fritas'
    },
    'chicken-tikka-pizza': {
      title: 'Pizza Artesanal de Pollo Tikka con Queso Fundido',
      subTitle: 'Trozos de pollo tikka ahumado sobre masa fresca con queso mozzarella y pimientos'
    },
  },
};

export function getLocalizedRecipe(recipe: Recipe, lang: Language): LocalizedRecipe {
  const t = translations[lang] || translations.ur;
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const isUr = lang === 'ur';

  // Category & Season localization from translations dictionary
  let catName = recipe.category.toUpperCase();
  if (recipe.category === 'chicken') catName = t.catChicken;
  else if (recipe.category === 'mutton' || recipe.category === 'beef') catName = t.catMutton;
  else if (recipe.category === 'sabzi') catName = t.catSabzi;
  else if (recipe.category === 'daal') catName = t.catDaal;
  else if (recipe.category === 'rice') catName = t.catRice;
  else if (recipe.category === 'soup') catName = t.catSoup;
  else if (recipe.category === 'nashta') catName = t.slotBreakfast;

  const seasonLabel = recipe.season === 'summer' 
    ? t.seasonSummer 
    : recipe.season === 'winter' 
    ? t.seasonWinter 
    : t.seasonAll;

  const eng = englishRecipeData[recipe.id];
  const langMeta = localizedMetadata[lang]?.[recipe.id] || localizedMetadata.en[recipe.id] || {
    title: isEn ? recipe.name : recipe.nativeName,
    subTitle: isEn ? 'Authentic Pakistani Dish' : recipe.seasonalNotes
  };

  // 1. English Mode: Pure 100% English
  if (isEn && eng) {
    return {
      ...recipe,
      displayTitle: eng.name,
      displaySubTitle: langMeta.subTitle || eng.seasonalNotes,
      displayCategory: catName,
      displaySeason: seasonLabel,
      seasonalNotes: eng.seasonalNotes,
      utensil: eng.utensil,
      ingredients: recipe.ingredients.map((ing, idx) => ({
        ...ing,
        name: eng.ingredients[idx]?.name || ing.name,
        nameUrdu: '',
        quantity: eng.ingredients[idx]?.quantity || ing.quantity
      })),
      instructions: eng.instructions,
      proTip: eng.proTip,
      parhezAlerts: {
        ...recipe.parhezAlerts,
        ...(eng.parhezAlerts || {})
      }
    };
  }

  // 2. Spanish Mode: Pure Spanish
  if (isEs && eng) {
    return {
      ...recipe,
      displayTitle: langMeta.title,
      displaySubTitle: langMeta.subTitle,
      displayCategory: catName,
      displaySeason: seasonLabel,
      seasonalNotes: eng.seasonalNotes,
      utensil: {
        ...eng.utensil,
        name: eng.utensil.name.includes('Karahi') ? 'Wok tradicional (Karahi)' : eng.utensil.name,
      },
      ingredients: recipe.ingredients.map((ing, idx) => ({
        ...ing,
        name: eng.ingredients[idx]?.name || ing.name,
        nameUrdu: '',
        quantity: eng.ingredients[idx]?.quantity || ing.quantity
      })),
      instructions: eng.instructions,
      proTip: eng.proTip,
      parhezAlerts: {
        ...recipe.parhezAlerts,
        ...(eng.parhezAlerts || {})
      }
    };
  }

  // 3. Other languages (Urdu, Pashto, Punjabi, Arabic, Farsi) or English fallback
  const isRtl = ['ur', 'ps', 'pa', 'ar', 'fa'].includes(lang);

  return {
    ...recipe,
    displayTitle: isEn ? recipe.name : (langMeta.title || recipe.nativeName),
    displaySubTitle: langMeta.subTitle || (isEn ? 'Traditional Pakistani Recipe' : recipe.seasonalNotes),
    displayCategory: catName,
    displaySeason: seasonLabel,
    seasonalNotes: isEn ? (eng?.seasonalNotes || recipe.name) : (langMeta.seasonNotes || recipe.seasonalNotes),
    utensil: recipe.utensil,
    ingredients: recipe.ingredients.map((ing) => ({
      ...ing,
      name: isRtl ? (ing.nameUrdu || ing.name) : ing.name,
      nameUrdu: '',
      quantity: ing.quantity
    })),
    instructions: recipe.instructions,
    proTip: recipe.proTip,
    parhezAlerts: recipe.parhezAlerts
  };
}
