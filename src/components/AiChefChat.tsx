import React, { useState, useEffect } from 'react';
import { FamilyMember, MealHistoryEntry, Recipe, Season, Language } from '../types';
import { translations } from '../data/translations';
import { getLocalizedRecipe } from '../services/recipeLocalization';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { getSmartCulinaryAnswer } from '../services/chefAiEngine';
import { 
  Sparkles, Send, Bot, ChefHat, CheckCircle2, AlertCircle, 
  HelpCircle, Utensils, Scale, ShieldAlert, Clock 
} from 'lucide-react';

interface Props {
  familyMembers: FamilyMember[];
  history: MealHistoryEntry[];
  season: Season;
  lang: Language;
  onOpenRecipeById: (id: string) => void;
  recipes: Recipe[];
}

export interface SlotAction {
  label: string;
  slot: 'nashta' | 'dopahar' | 'raat';
  promptText: string;
}

interface Message {
  id: string;
  sender: 'user' | 'chef';
  text: string;
  recipeData?: any;
  slotActions?: SlotAction[];
  timestamp: string;
}

export const AiChefChat: React.FC<Props> = ({
  familyMembers,
  history,
  season,
  lang,
  onOpenRecipeById,
  recipes
}) => {
  const t = translations[lang] || translations.ur;
  const isOnline = useOnlineStatus();
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'chef',
      text: t.aiChefGreeting,
      timestamp: t.justNow
    }
  ]);

  // Update initial message if language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'm-1') {
        return [{
          id: 'm-1',
          sender: 'chef',
          text: t.aiChefGreeting,
          timestamp: t.justNow
        }];
      }
      return prev;
    });
  }, [lang]);

  const quickPromptsByLang: Record<Language, string[]> = {
    ur: [
      'السلام علیکم شیف صاحب! (Assalam-o-Alaikum)',
      'میرے پاس فریج میں چکن پڑا ہے، کیا کیا بناؤں؟',
      'فریج میں آلو اور میتھی ہے، کیا بناؤں؟',
      'فریج میں آلو، پالک اور میتھی ہے، کیا بناؤں؟',
      'سالن میں نمک زیادہ ہو جائے تو کیا کریں؟',
      'ابو کے کولیسٹرول اور امی کے معدے کیلئے کھانا',
      '15 منٹ میں جلدی کیا بن سکتا ہے؟',
      'اتوار کیلئے کوئی خاص ڈش بتائیں'
    ],
    pa: [
      'السلام علیکم شیف صاحب!',
      'میرے کول فریج چ چکن ہے، کیہڑا کھانا بناواں؟',
      'فریج چ آلو تے میتھی ہے، کی بناواں؟',
      'فریج چ آلو، پالک تے میتھی ہے، کی بناواں؟',
      'سالن چ نمک ودھ جاوے تاں کی کریئے؟',
      'والدین لئی ہلکا تے صحت بخش کھانا',
      '15 منٹاں چ جلدی کی بن سکدا اے؟',
      'ایتوار لئی کوئی خاص ڈش دسو'
    ],
    ps: [
      'سلام علیکم اشپز صیب!',
      'په فریج کې چرګ لرم، څه څه پخولی شم؟',
      'په فریج کې کچالو او میتي شته، څه پخ کړم؟',
      'په فریج کې کچالو، پالک او میتي شته، څه جوړ کړم؟',
      'په ښوروا کې مالګه زیاته شوې، څه وکړم؟',
      'د مور او پلار لپاره سپک او روغتیایي خواړه',
      'په ۱۵ دقیقو کې څه ژر پخېدای شي؟',
      'د یکشنبې لپاره یو ځانګړی خواړه وښایاست'
    ],
    ar: [
      'السلام عليكم شيف!',
      'لدي دجاج في الثلاجة، ماذا يمكنني أن أطبخ؟',
      'لدي بطاطس وحلبة في الثلاجة، ماذا أعد؟',
      'لدي بطاطس وسبانخ وحلبة، ما الاقتراح؟',
      'الملح زائد في المرقة، كيف أعالجه؟',
      'وجبة صحية خفيفة للوالدين',
      'ماذا يمكن تحضيره سريعاً في 15 دقيقة؟',
      'طبق عائلي مميز لعطلة نهاية الأسبوع'
    ],
    fa: [
      'سلام علیکم سرآشپز!',
      'در یخچال مرغ دارم، چه غذاهایی می‌توانم بپزم؟',
      'سیب زمینی و شنبلیله دارم، چی بپزم؟',
      'سیب زمینی، اسفناج و شنبلیله دارم، پیشنهاد چیست؟',
      'نمک خورش زیاد شده، راه حل چیست؟',
      'غذای سبک و سالم برای والدین',
      'در ۱۵ دقیقه چه غذای سریعی می‌شود پخت؟',
      'پیشنهاد غذای ویژه برای آخر هفته'
    ],
    es: [
      '¡Assalam-o-Alaikum Chef!',
      'Tengo pollo en la nevera, ¿qué platos puedo cocinar?',
      'Tengo patatas y espinacas en la nevera, ¿qué preparo?',
      '¿Cómo solucionar el exceso de sal en el guiso?',
      'Comida ligera y saludable para los padres',
      '¿Qué puedo cocinar rápidamente en 15 minutos?',
      'Plato familiar especial para el domingo'
    ],
    en: [
      'Assalam-o-Alaikum Chef!',
      'I have chicken in the fridge, what dishes can I cook?',
      'I have potatoes and fenugreek in the fridge, what to cook?',
      'I have potatoes, spinach, and fenugreek in the fridge, what to cook?',
      'Salt is too high in my gravy, how to fix?',
      'Healthy low-oil meal for parents',
      'What can I cook quickly in 15 minutes?',
      'Special Sunday family dish'
    ]
  };

  const quickPrompts = quickPromptsByLang[lang] || quickPromptsByLang.ur;

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || inputText).trim();
    if (!textToSend || isLoading) return;

    // Previous user message for context remembrance
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user')?.text;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      if (isOnline) {
        const langMap: Record<Language, string> = {
          en: 'English',
          ur: 'Urdu',
          ps: 'Pashto',
          pa: 'Punjabi',
          ar: 'Arabic',
          fa: 'Farsi',
          es: 'Spanish'
        };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        try {
          const response = await fetch('/api/ai-suggest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              prompt: textToSend,
              previousUserMessage: lastUserMsg,
              familyMembers,
              recentMeals: history.slice(0, 5),
              season,
              language: langMap[lang] || 'Urdu'
            })
          });
          clearTimeout(timeoutId);

          const resData = await response.json();
          if (resData.success && resData.data) {
            const aiData = resData.data;
            const replyMsg: Message = {
              id: 'ai-' + Date.now(),
              sender: 'chef',
              text: aiData.reply || aiData.whyRecommended || (aiData.dishName ? `${aiData.dishName} - ${t.recIdealChoice}` : textToSend),
              recipeData: aiData.dishName ? aiData : undefined,
              slotActions: aiData.suggestedSlotActions && aiData.suggestedSlotActions.length > 0 ? aiData.suggestedSlotActions : undefined,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages((prev) => [...prev, replyMsg]);
            setIsLoading(false);
            return;
          }
        } catch (fetchErr) {
          clearTimeout(timeoutId);
          console.warn('AI fetch timed out or failed, using smart chef fallback:', fetchErr);
        }
      }

      // Fast, smart local culinary answering engine (when offline or if API timed out)
      const fallbackResult = getSmartCulinaryAnswer(textToSend, recipes, familyMembers, history, lang, lastUserMsg);
      const replyMsg: Message = {
        id: 'ai-' + Date.now(),
        sender: 'chef',
        text: fallbackResult.reply,
        recipeData: fallbackResult.dishName ? fallbackResult : undefined,
        slotActions: fallbackResult.suggestedSlotActions && fallbackResult.suggestedSlotActions.length > 0 ? fallbackResult.suggestedSlotActions : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, replyMsg]);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-4 sm:p-5 shadow-xs flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <ChefHat className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">
              {t.aiChefTitle}
            </h2>
          </div>
          <p className="text-[11px] text-stone-500">
            {t.aiChefSubtitle}
          </p>
        </div>

        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 shrink-0">
          Gemini AI
        </span>
      </div>

      {/* Chat Messages Box - 90% Mobile Friendly Height */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col h-[calc(100vh-270px)] min-h-[380px] max-h-[560px] overflow-hidden">
        <div className="flex-1 p-3.5 sm:p-5 overflow-y-auto space-y-3">
          {messages.map((msg) => {
            const isChef = msg.sender === 'chef';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[92%] sm:max-w-[85%] ${
                  isChef
                    ? 'self-start items-start text-start'
                    : 'self-end items-start flex-row-reverse text-start'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs mt-0.5 ${
                  isChef ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-white'
                }`}>
                  {isChef ? <ChefHat className="w-4 h-4" /> : t.youUser}
                </div>

                <div className="space-y-1 min-w-0">
                  <div className={`p-3.5 sm:p-4 rounded-3xl text-xs sm:text-sm leading-relaxed rtl:leading-[1.85] ${
                    isChef 
                      ? 'bg-emerald-50/80 border border-emerald-100 text-stone-900 rounded-tr-xs rtl:rounded-tr-3xl rtl:rounded-tl-xs' 
                      : 'bg-stone-900 text-white rounded-tl-xs rtl:rounded-tl-3xl rtl:rounded-tr-xs'
                  }`}>
                    <div className="whitespace-pre-line leading-relaxed rtl:leading-[1.85]">
                      {msg.text}
                    </div>

                    {/* AI Structured Recipe Recommendation Card */}
                    {msg.recipeData && (
                      <div className="mt-3 pt-3 border-t border-emerald-100 bg-white/95 p-3 rounded-2xl border text-stone-900 shadow-2xs space-y-2 text-xs">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-emerald-900 text-sm leading-[1.7]">{msg.recipeData.dishName}</span>
                          <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full leading-normal">
                            ~{msg.recipeData.budgetEstimatePKR} {t.pkrCurrency}
                          </span>
                        </div>

                        <div className="text-[11px] text-stone-600 space-y-1 leading-[1.7]">
                          <p><strong>{t.bestUtensil}:</strong> {msg.recipeData.bestUtensil}</p>
                          <p><strong>{t.prepTime}:</strong> {msg.recipeData.prepTime} • <strong>{t.calories}:</strong> {msg.recipeData.calories} kcal</p>
                        </div>

                        {msg.recipeData.recipeId && (
                          <button
                            onClick={() => onOpenRecipeById(msg.recipeData.recipeId)}
                            className="w-full mt-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition active:scale-95 text-center block leading-normal cursor-pointer"
                          >
                            {t.viewFullRecipe}
                          </button>
                        )}
                      </div>
                    )}

                    {/* Interactive Meal Time Selection Buttons */}
                    {msg.slotActions && msg.slotActions.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-emerald-200/90 space-y-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-black text-emerald-950">
                          <Clock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span className="leading-normal">{t.selectMealTime}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          {msg.slotActions.map((action, aIdx) => (
                            <button
                              key={aIdx}
                              type="button"
                              onClick={() => handleSend(action.promptText)}
                              className="flex-1 py-2 px-3 rounded-2xl bg-white hover:bg-emerald-600 hover:text-white border-2 border-emerald-300 hover:border-emerald-600 text-emerald-950 text-xs font-black transition-all shadow-xs flex items-center justify-between gap-1.5 cursor-pointer active:scale-95 leading-normal"
                            >
                              <span>{action.label}</span>
                              <span className="text-[11px] opacity-70">➔</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 block px-1 text-start">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 p-3 rounded-2xl border border-emerald-200 w-fit">
              <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
              <span>{t.chefThinking}</span>
            </div>
          )}
        </div>

        {/* Quick Query Pills */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-3 py-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-xs text-stone-700 shrink-0 transition leading-[1.6] cursor-pointer shadow-2xs"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder={t.askChefPlaceholder}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 p-3 rounded-2xl border border-stone-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs text-stone-900 bg-stone-50/50 leading-[1.7] text-start"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition active:scale-95 shadow-md shadow-emerald-600/20 cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
};
