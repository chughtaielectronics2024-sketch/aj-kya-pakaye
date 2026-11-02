import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSmartCulinaryAnswer } from './src/services/chefAiEngine.ts';
import { initialRecipes } from './src/data/recipes.ts';
import { evaluateCurrentMealTime } from './src/services/mealTimeEvaluator.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Google GenAI
  const rawKey = process.env.GEMINI_API_KEY;
  const apiKey = rawKey && rawKey !== 'MY_GEMINI_API_KEY' ? rawKey : undefined;
  let ai: GoogleGenAI | null = null;
  try {
    ai = new GoogleGenAI(apiKey ? { apiKey } : undefined);
  } catch (err) {
    console.error('Failed to init GoogleGenAI:', err);
  }

  // API Route: AI Pakistani Chef Suggestion & Parhez Analysis
  app.post('/api/ai-suggest', async (req, res) => {
    const { prompt, previousUserMessage, familyMembers, recentMeals, season, language } = req.body;
    const userQuery = (prompt || '').trim();
    const langCode = (language === 'English' ? 'en' : 'ur');

    const timeEval = evaluateCurrentMealTime();

    // Helper for fast, high-quality Pakistani culinary engine response
    const getLocalFallback = () => {
      const result = getSmartCulinaryAnswer(userQuery, initialRecipes, familyMembers || [], recentMeals || [], langCode, previousUserMessage);
      return {
        reply: result.reply,
        dishName: result.dishName || '',
        category: result.category || '',
        prepTime: result.prepTime || '',
        bestUtensil: result.bestUtensil || '',
        calories: result.calories || 250,
        budgetEstimatePKR: result.budgetEstimatePKR || 250,
        recipeId: result.recipeId || '',
        suggestedSlotActions: result.suggestedSlotActions || []
      };
    };

    if (!ai) {
      return res.status(200).json({
        success: true,
        data: getLocalFallback()
      });
    }

    try {
      const systemInstruction = `You are an authentic Pakistani Master Chef (ماہر باورچی / شیف) and Certified Culinary Nutritionist.

CURRENT TIME & SCHEDULE CONTEXT:
- Current Local Time: ${timeEval.timeString12h} (${timeEval.timeStringUrdu})
- Day: ${timeEval.dayNameEn} (${timeEval.dayNameUrdu})
- Is Weekend/Public Holiday: ${timeEval.isWeekend || timeEval.isPublicHoliday}
- Evaluated Current Meal Slot: ${timeEval.slotNameEn} (${timeEval.slotNameUrdu})
- Rules for Meal Times:
  * Weekday Breakfast: active strictly until 10:00 AM maximum.
  * Weekend (Saturday/Sunday) & Public Holidays Breakfast: extended until 12:00 PM (noon) for late breakfast/brunch!
  * Lunch: active after breakfast cutoff until 4:30 PM.
  * Dinner: active from 4:30 PM onwards.

TOP PRIORITY MANDATES:
You MUST answer 100% SPECIFICALLY, ACCURATELY, and DIRECTLY according to what the user says and asks:

0. GREETINGS & SPELLING (اَلسَّلَامُ عَلَيْکُم / Assalam-o-Alaikum / Salam):
   - If the user greets (Assalam o Alaikum / Salam / Hello / السلام علیکم):
   - Reply warmly with the exact correct Islamic spelling and etiquette:
     "وعلیکم السلام و رحمتہ اللہ و برکاتہ! (Wa Alaikum Assalam wa Rahmatullah wa Barakatuh - Assalam-o-Alaikum!)"
   - Welcoming them as their Pakistani AI Chef and Certified Family Nutritionist.

1. "WHAT TO COOK TODAY" (آج کیا پکائیں / مینیو کی تجویز):
   - When asked what to cook today or general meal suggestions, you MUST EVALUATE THE CURRENT TIME FIRST!
   - Clearly state the current time, whether today is a weekday or weekend/holiday (and that on weekends breakfast extends to 12 PM), and which meal slot it currently is.
   - Then provide a delicious, authentic Pakistani meal recommendation specifically suited for that meal slot.

2. SPECIAL STRICT MANDATE FOR CHICKEN (چکن کے پکوان - NEVER JUST CHICKEN KARAHI!):
   - CRITICAL: When the user asks about chicken (e.g. "mere pass fridge me chicken para huwa hai kya banau" or mentions chicken in the kitchen/fridge):
     * NEVER, UNDER ANY CIRCUMSTANCES, JUST DEFAULT TO CHICKEN KARAHI!
     * Pakistani cuisine has a tremendous variety of chicken dishes across breakfast, lunch, and dinner.
     * You MUST ALWAYS provide MULTIPLE OPTIONS:
       - For Lunch (دوپہر کا کھانا):
         1. خوشبودار چکن یخنی پلاؤ یا کراچی دم بریانی (Aromatic Chicken Yakhni Pulao / Biryani with mint raita & fresh salad)
         2. روایتی دیسی آلو چکن شوربہ سالن (Desi Aloo Chicken Shorba Curry with soft phulkas or steamed rice)
         3. لاہوری چکن کڑاہی (Lahori Chicken Karahi in iron wok)
         4. چکن پالک سالن (Nutritious Palak Chicken)
         5. چکن دال گوشت (Chana Daal Chicken)
       - For Dinner (رات کا کھانا - Gentle, Light & Low-Oil for Night Digestion):
         1. ہلکی چکن وائٹ ہانڈی (Creamy Chicken White Handi - yogurt/black pepper, zero heavy red chili, soothing for Ami's stomach)
         2. صحت بخش چکن تکہ بوٹی / سٹیم روسٹ (Healthy Steam Roast / Tikka - zero/low oil, safe for Abu's cholesterol)
         3. چکن جل فریزی یا شاشلک (Chicken Jalfrezi / Shashlik with crisp bell peppers & onions)
         4. ہاضمہ دار جنجر چکن و سوپ (Ginger Chicken Soup & Curry)
       - For Breakfast / Brunch (صبح کا ناشتہ):
         1. ریشہ دار چکن شامی کباب و خستہ پراٹھا (Chicken Shami Kababs with Paratha & Karak Chai)
         2. چکن چیز آملیٹ یا پراٹھا رول (Chicken Cheese Omelette / Roll)
         3. چکن قیمہ بھرا پراٹھا (Stuffed Chicken Keema Paratha)
     * IF MEAL SLOT NOT SPECIFIED (e.g. "mere pass fridge me chicken para huwa hai kya banau"):
       - State the evaluated current time: "${timeEval.timeString12h}" (${timeEval.timeStringUrdu}), day "${timeEval.dayNameUrdu}", and current meal window (${timeEval.slotNameUrdu}).
       - State clearly that chicken has numerous rich options beyond just Karahi!
       - Present multiple delicious options categorized for Lunch, Dinner, and Breakfast.
       - Provide multiple interactive "suggestedSlotActions" buttons for these varied dishes so the user can choose.
       - dishName: "چکن کے متنوع پکوان (Multiple Chicken Choices)"
     * IF LUNCH SPECIFIED:
       - Recommend the best lunch chicken dish (e.g. Chicken Yakhni Pulao / Biryani or Aloo Chicken Shorba) with complete recipe steps, AND list 3 alternative lunch chicken options with buttons!
       - dishName: "خوشبودار چکن یخنی پلاؤ (دوپہر کا کھانا / Lunch)"
     * IF DINNER SPECIFIED:
       - Recommend gentle, low-oil options (Chicken White Handi or Healthy Steam Roast / Tikka) with recipe steps, AND list 3 alternative dinner chicken options with buttons!
       - dishName: "ہلکی چکن وائٹ ہانڈی (رات کا کھانا / Dinner)"
     * IF BREAKFAST SPECIFIED:
       - Recommend Chicken Shami Kababs with Paratha & Karak Chai or Chicken Omelette!
       - dishName: "چکن شامی کباب و پراٹھا (ناشتہ / Breakfast)"

3. SPECIFIC INGREDIENTS IN FRIDGE / KITCHEN (EVALUATE TIME & ASK LUNCH OR DINNER!):
   - If the user mentions other ingredients (e.g. "mere pass fridge me aloo or meethi hai"):
   - CHECK IF THEY ALREADY SPECIFIED A MEAL TIME (Lunch/دوپہر or Dinner/رات or Breakfast/ناشتہ).
   - IF NOT SPECIFIED:
     * You MUST FIRST EVALUATE THE TIME! State current clock time: "${timeEval.timeString12h}" (${timeEval.timeStringUrdu}), day "${timeEval.dayNameUrdu}", and current meal slot window (${timeEval.slotNameUrdu}).
     * EXPLICITLY ASK: "آپ یہ دوپہر کے کھانے (Lunch) کیلئے بنانا چاہتے ہیں یا رات کے کھانے (Dinner) کیلئے؟"
     * Provide a brief preview of how these ingredients are best prepared for Lunch vs Dinner.
     * Populate "suggestedSlotActions" array with options for Lunch and Dinner.
   - IF SPECIFIED:
     * Recommend the exact dish tailored for that meal slot with step-by-step cooking steps using those exact ingredients.

4. SPECIFIC COOKING QUESTIONS:
   - If the user asks about a cooking technique, salt/spice fix, bread/roti, meat tenderizing, etc., answer that exact question directly with practical kitchen tips.

5. FAMILY HEALTH & DIETARY CARE:
   - Abu has cholesterol and needs low salt and minimal oil.
   - Ami has a sensitive stomach and cannot digest heavy/greasy foods or fast food; she needs light, easily digestible food.

6. LANGUAGE:
   - Respond in the language used by the user: ${language || 'Urdu'}. If Urdu, write in natural, fluent Urdu script.

Respond in JSON format:
{
  "reply": "Your complete, warm, direct answer addressing the user's specific query. If chicken or ingredients were mentioned without meal time, evaluate time and present multiple varied options.",
  "dishName": "Exact dish name (e.g. چکن کے متنوع پکوان or specific dish)",
  "category": "Sabzi/Chicken/Mutton/Beef/Daal/Rice",
  "prepTime": "25 mins",
  "bestUtensil": "دیگچی یا کڑاہی",
  "calories": 320,
  "budgetEstimatePKR": 500,
  "recipeId": "",
  "suggestedSlotActions": [
    { "label": "☀️ چکن یخنی پلاؤ (Lunch)", "slot": "dopahar", "promptText": "چکن یخنی پلاؤ دوپہر کے کھانے کیلئے بنائیں" },
    { "label": "☀️ آلو چکن شوربہ (Lunch)", "slot": "dopahar", "promptText": "آلو چکن شوربہ سالن دوپہر کے کھانے کیلئے بنائیں" },
    { "label": "🌙 چکن وائٹ ہانڈی (Dinner)", "slot": "raat", "promptText": "چکن وائٹ ہانڈی رات کے کھانے کیلئے بنائیں" },
    { "label": "🌙 چکن تکہ / سٹیم روسٹ (Dinner)", "slot": "raat", "promptText": "چکن تکہ سٹیم روسٹ رات کے کھانے کیلئے بنائیں" },
    { "label": "🍳 چکن شامی کباب و پراٹھا (Breakfast)", "slot": "nashta", "promptText": "چکن شامی کباب ناشتے کیلئے بنائیں" }
  ]
}`;

      // Try gemini-flash-latest with 3500ms timeout
      const generatePromise = ai.models.generateContent({
        model: 'gemini-flash-latest',
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          maxOutputTokens: 900
        },
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `User inquiry: "${userQuery || 'آج کھانے میں کیا بنائیں؟'}"\n\nContext:\n- Language requested: ${language || 'Urdu'}\n- Family health preferences: ${JSON.stringify(familyMembers || [])}\n- Recent meals cooked: ${JSON.stringify(recentMeals || [])}\n- Season: ${season || 'all'}`
              }
            ]
          }
        ]
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('AI response timed out')), 3500)
      );

      const response = await Promise.race([generatePromise, timeoutPromise]);

      if (response && response.text) {
        let parsed;
        try {
          parsed = JSON.parse(response.text);
        } catch {
          parsed = { reply: response.text, dishName: '' };
        }

        // If chicken was queried and model missed multiple actions, enrich from local culinary engine
        const lowerQ = userQuery.toLowerCase();
        const isChickenQuery = lowerQ.includes('chicken') || lowerQ.includes('chiken') || lowerQ.includes('murgi') || lowerQ.includes('چکن') || lowerQ.includes('مرغی');
        if (isChickenQuery && (!parsed.suggestedSlotActions || parsed.suggestedSlotActions.length === 0)) {
          const localAns = getLocalFallback();
          parsed.suggestedSlotActions = localAns.suggestedSlotActions;
          if (!parsed.dishName || parsed.dishName.includes('کڑاہی')) {
            parsed.dishName = localAns.dishName;
          }
        }

        return res.status(200).json({ success: true, data: parsed });
      }

      // If response text was empty, fall back immediately
      return res.status(200).json({ success: true, data: getLocalFallback() });
    } catch (err: any) {
      console.warn('Gemini fast attempt failed, returning instant authentic culinary answer:', err?.message || err);
      return res.status(200).json({
        success: true,
        data: getLocalFallback()
      });
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Setup Vite in middleware mode for dev
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Aj kya pakaye server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
