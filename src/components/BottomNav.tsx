import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { 
  Sparkles, Calendar, ShoppingBag, Users, BookOpen, ChefHat 
} from 'lucide-react';

export type TabType = 'suggest' | 'calendar' | 'grocery' | 'family' | 'recipes' | 'aichef';

interface Props {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  lang: Language;
  groceryCount: number;
}

export const BottomNav: React.FC<Props> = ({
  activeTab,
  onChangeTab,
  lang,
  groceryCount
}) => {
  const t = translations[lang] || translations.ur;

  // Short labels optimized for mobile 6-column bottom bar to prevent clipping & overflow
  const getTabLabel = (id: TabType) => {
    switch (id) {
      case 'suggest':
        return lang === 'en' ? 'Today' : lang === 'es' ? 'Hoy' : lang === 'fa' ? 'امروز' : lang === 'ar' ? 'اليوم' : t.tabSuggest;
      case 'calendar':
        return lang === 'en' ? 'Weekly' : lang === 'es' ? 'Semanal' : lang === 'fa' ? 'برنامه' : lang === 'ar' ? 'الخطة' : (lang === 'ur' || lang === 'pa') ? 'ہفتہ وار' : t.tabCalendar;
      case 'grocery':
        return lang === 'en' ? 'Grocery' : lang === 'es' ? 'Compras' : lang === 'fa' ? 'خرید' : lang === 'ar' ? 'المشتريات' : (lang === 'ur' || lang === 'pa') ? 'سودا سلف' : t.tabGrocery;
      case 'family':
        return lang === 'en' ? 'Family' : lang === 'es' ? 'Familia' : lang === 'fa' ? 'خانواده' : lang === 'ar' ? 'العائلة' : lang === 'pa' ? 'ٹبر' : lang === 'ps' ? 'کورنۍ' : 'خاندان';
      case 'recipes':
        return lang === 'en' ? 'Recipes' : lang === 'es' ? 'Recetas' : lang === 'fa' ? 'دستورها' : lang === 'ar' ? 'الوصفات' : (lang === 'ur' || lang === 'pa') ? 'پکوان' : t.tabRecipes;
      case 'aichef':
        return lang === 'en' ? 'AI Chef' : lang === 'es' ? 'Chef IA' : lang === 'fa' ? 'آشپز' : lang === 'ar' ? 'الشيف' : lang === 'ps' ? 'AI اشپز' : 'AI باورچی';
    }
  };

  const tabs: { id: TabType; label: string; tooltip: string; icon: React.ReactNode }[] = [
    { id: 'suggest', label: getTabLabel('suggest'), tooltip: t.tabSuggest, icon: <Sparkles className="w-5 h-5" /> },
    { id: 'calendar', label: getTabLabel('calendar'), tooltip: t.tabCalendar, icon: <Calendar className="w-5 h-5" /> },
    { id: 'grocery', label: getTabLabel('grocery'), tooltip: t.tabGrocery, icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'family', label: getTabLabel('family'), tooltip: t.tabFamily, icon: <Users className="w-5 h-5" /> },
    { id: 'recipes', label: getTabLabel('recipes'), tooltip: t.tabRecipes, icon: <BookOpen className="w-5 h-5" /> },
    { id: 'aichef', label: getTabLabel('aichef'), tooltip: t.tabAiChef, icon: <ChefHat className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-emerald-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] safe-bottom select-none">
      <div className="max-w-xl mx-auto px-1 grid grid-cols-6 items-center h-[62px] sm:h-[66px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              title={tab.tooltip}
              className={`w-full min-w-0 py-1 px-0.5 flex flex-col items-center justify-center gap-0.5 transition active:scale-90 cursor-pointer ${
                isActive ? 'text-emerald-700 font-extrabold' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <div className="relative">
                <div className={`p-1 rounded-xl transition ${
                  isActive ? 'bg-emerald-100 text-emerald-800 scale-105' : ''
                }`}>
                  {tab.icon}
                </div>
                {tab.id === 'grocery' && groceryCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-emerald-600 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-white leading-none">
                    {groceryCount}
                  </span>
                )}
              </div>
              <span className={`text-[9.5px] xs:text-[10px] leading-tight text-center w-full px-0.5 truncate block ${
                isActive ? 'font-black text-emerald-900' : 'font-semibold text-stone-600'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
