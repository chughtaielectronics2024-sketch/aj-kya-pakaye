import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { ExternalLink, Settings2 } from 'lucide-react';
import { STORAGE_KEYS, AdSettingsModal } from './AdSettingsModal';

interface Props {
  lang: Language;
}

const adTexts: Record<Language, {
  shanBrand: string; shanHeadline: string; shanTagline: string; shanCta: string;
  daldaBrand: string; daldaHeadline: string; daldaTagline: string; daldaCta: string;
  olpersBrand: string; olpersHeadline: string; olpersTagline: string; olpersCta: string;
  sponsored: string; adBadge: string; configTitle: string;
}> = {
  ur: {
    shanBrand: 'شان اسپیشل مصالحہ جات', shanHeadline: 'ہر کھانے میں لاہوری ذائقہ اور مہک', shanTagline: 'بریانی، کڑاہی اور نہاری کے خالص مصالحے', shanCta: 'آرڈر کریں',
    daldaBrand: 'ڈالڈا دیسی گھی اور زیتون کا تیل', daldaHeadline: 'صحت مند دل اور کرکرے پراٹھے کی ضمانت', daldaTagline: 'خالص وٹامن A اور D سے بھرپور', daldaCta: 'تفصیل دیکھیں',
    olpersBrand: 'اولپرز تازہ دہی اور دودھ', olpersHeadline: 'گاڑھی ملائی دار لسی اور ٹھنڈا ناشتہ', olpersTagline: '100% خالص اور قدرتی غذائیت', olpersCta: 'خریدیں',
    sponsored: 'اسپانسرڈ', adBadge: 'اشتہار', configTitle: 'ایڈسینس سیٹنگز'
  },
  pa: {
    shanBrand: 'شان اسپیشل مصالحہ جات', shanHeadline: 'ہر کھانے چ لاہوری سواد تے مہک', shanTagline: 'بریانی، کڑاہی تے نہاری دے خالص مصالحے', shanCta: 'آرڈر کرو',
    daldaBrand: 'ڈالڈا دیسی گھیو تے تیل', daldaHeadline: 'صحت مند دل تے کرکرے پراٹھے دی ضمانت', daldaTagline: 'خالص وٹامن A تے D نال بھرپور', daldaCta: 'تفصیل ویکھو',
    olpersBrand: 'اولپرز تازہ دہی تے دُدھ', olpersHeadline: 'گاڑھی ملائی دار لسی تے ٹھنڈا ناشتہ', olpersTagline: '100% خالص تے قدرتی غذائیت', olpersCta: 'خرید کرو',
    sponsored: 'اسپانسرڈ', adBadge: 'اشتہار', configTitle: 'ایڈسینس سیٹنگز'
  },
  ps: {
    shanBrand: 'د شان ځانګړي مصالحې', shanHeadline: 'په هر خواړه کې د لاهور خوند او بوی', shanTagline: 'د بریاني، کڑاهي او نهاري مصالحې', shanCta: 'فرمایش ورکړئ',
    daldaBrand: 'دالډا غوړي او تېل', daldaHeadline: 'د زړه روغتیا او کرکرا پراټه', daldaTagline: 'په A او D ویټامینونو بډایه', daldaCta: 'تفصیل وګورئ',
    olpersBrand: 'اولپرز تازه شیدې او مستې', olpersHeadline: 'ګاټه لاسي او تازه سهارنۍ', olpersTagline: '۱۰۰٪ خالص او طبیعي خواړه', olpersCta: 'پیرودل',
    sponsored: 'سپانسر شوی', adBadge: 'اعلان', configTitle: 'د اعلاناتو تنظیمات'
  },
  ar: {
    shanBrand: 'بهارات شان الباكستانية', shanHeadline: 'المذاق الباكستاني الأصيل في كل طبق', shanTagline: 'بهارات البرياني، الكراهي والنهاري', shanCta: 'اطلب الآن',
    daldaBrand: 'زيت وسمن دالدا', daldaHeadline: 'لقلب صحي وفطائر باراثا مقرمشة', daldaTagline: 'غني بفيتامين A و D للعائلة', daldaCta: 'اعرف المزيد',
    olpersBrand: 'أولبرز زبادي وحليب طازج', olpersHeadline: 'لبن لاسي كريمي وإفطار منعش', olpersTagline: '100% تغذية نقية وطبيعية', olpersCta: 'اشتري الآن',
    sponsored: 'إعلان ممول', adBadge: 'إعلان', configTitle: 'إعدادات الإعلانات'
  },
  fa: {
    shanBrand: 'ادویه‌جات مخصوص شان', shanHeadline: 'طعم اصیل غذاهای پاکستانی در هر بشقاب', shanTagline: 'ادویه بریانی، کراهی و نهاری', shanCta: 'سفارش دهید',
    daldaBrand: 'روغن و روغن حیوانی دالدا', daldaHeadline: 'قلب سالم و نان پاراتای ترد و خوشمزه', daldaTagline: 'سرشار از ویتامین A و D', daldaCta: 'مشاهده جزییات',
    olpersBrand: 'لبنیات تازه اولپرز', olpersHeadline: 'لاسی خنک و صبحانه دلچسب', olpersTagline: 'تغذیه ۱۰۰٪ طبیعی و سالم', olpersCta: 'خرید',
    sponsored: 'آگهی', adBadge: 'تبلیغ', configTitle: 'تنظیمات تبلیغات'
  },
  es: {
    shanBrand: 'Shan Especias', shanHeadline: 'Sabor Auténtico en Cada Plato', shanTagline: 'Mezclas de especias tradicionales', shanCta: 'Comprar',
    daldaBrand: 'Aceite y Ghee Dalda', daldaHeadline: 'Corazón Sano y Parathas Crujientes', daldaTagline: 'Rico en Vitaminas A y D', daldaCta: 'Detalles',
    olpersBrand: 'Lácteos Olpers', olpersHeadline: 'Lassi Cremoso y Desayuno Fresco', olpersTagline: '100% Puro y Natural', olpersCta: 'Comprar',
    sponsored: 'Patrocinado', adBadge: 'Anuncio', configTitle: 'Ajustes de Ads'
  },
  en: {
    shanBrand: 'Shan Recipe Mixes', shanHeadline: 'Authentic Pakistani Taste in Every Dish', shanTagline: 'Biryani, Karahi & Nihari Spice Mixes', shanCta: 'Shop Now',
    daldaBrand: 'Dalda Cooking Oil & Desi Ghee', daldaHeadline: 'Healthy Heart & Crispy Parathas', daldaTagline: 'Rich in Vitamins A & D for family health', daldaCta: 'Learn More',
    olpersBrand: "Olper's Fresh Dahi & Milk", olpersHeadline: 'Rich Creamy Lassi & Pure Breakfast', olpersTagline: '100% Pure & Nutritious Dairy', olpersCta: 'Buy Fresh',
    sponsored: 'Sponsored', adBadge: 'Ad', configTitle: 'Google Ads Setup'
  }
};

export const TopBannerAd: React.FC<Props> = ({ lang }) => {
  const [adClientId, setAdClientId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CLIENT_ID) || '';
  });
  const [adSlotId, setAdSlotId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.SLOT_ID) || '';
  });
  const [adMode, setAdMode] = useState<'preview' | 'live'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.MODE) as 'preview' | 'live') || 'preview';
  });
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const refreshAdState = () => {
    setAdClientId(localStorage.getItem(STORAGE_KEYS.CLIENT_ID) || '');
    setAdSlotId(localStorage.getItem(STORAGE_KEYS.SLOT_ID) || '');
    setAdMode((localStorage.getItem(STORAGE_KEYS.MODE) as 'preview' | 'live') || 'preview');
  };

  const ad = adTexts[lang] || adTexts.ur;

  // Sample authentic Pakistani food/grocery sponsor creatives for banner
  const sampleAds = [
    {
      brand: ad.shanBrand,
      headline: ad.shanHeadline,
      tagline: ad.shanTagline,
      cta: ad.shanCta,
      color: 'from-emerald-700 to-teal-800',
      badge: ad.sponsored,
      emoji: '🍛'
    },
    {
      brand: ad.daldaBrand,
      headline: ad.daldaHeadline,
      tagline: ad.daldaTagline,
      cta: ad.daldaCta,
      color: 'from-teal-700 to-emerald-900',
      badge: ad.sponsored,
      emoji: '🫒'
    },
    {
      brand: ad.olpersBrand,
      headline: ad.olpersHeadline,
      tagline: ad.olpersTagline,
      cta: ad.olpersCta,
      color: 'from-emerald-800 to-green-950',
      badge: ad.sponsored,
      emoji: '🥛'
    }
  ];

  const [activeAdIndex, setActiveAdIndex] = useState(0);

  // Rotate sample ads every 9 seconds
  useEffect(() => {
    if (adMode === 'preview') {
      const interval = setInterval(() => {
        setActiveAdIndex((prev) => (prev + 1) % sampleAds.length);
      }, 9000);
      return () => clearInterval(interval);
    }
  }, [adMode]);

  // Load Google AdSense Script when in live mode with valid client ID
  useEffect(() => {
    if (adMode === 'live' && adClientId && adClientId.startsWith('ca-pub-')) {
      const existingScript = document.querySelector('script[src*="adsbygoogle"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
      try {
        // @ts-expect-error Google AdSense global array
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.log('AdSense init notice:', err);
      }
    }
  }, [adMode, adClientId, adSlotId]);

  const currentSample = sampleAds[activeAdIndex];

  return (
    <>
      <div className="w-full bg-stone-100 border-b border-stone-200/90 py-1.5 px-2 relative select-none">
        <div className="max-w-xl mx-auto flex items-center justify-between gap-1.5">
          {/* Compliance Badge & Google Ads Setting Button */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded bg-stone-200 text-stone-600 border border-stone-300">
              {ad.adBadge}
            </span>
            <button
              type="button"
              onClick={() => setIsConfigOpen(true)}
              className="p-1 rounded-md text-stone-400 hover:text-emerald-700 hover:bg-stone-200 transition cursor-pointer"
              title={ad.configTitle}
            >
              <Settings2 className="w-3 h-3" />
            </button>
          </div>

          {/* Ad Unit Container */}
          <div className="flex-1 min-w-0">
            {adMode === 'live' && adClientId ? (
              /* Live Google AdSense Banner Slot (Responsive 320x50 to 728x90) */
              <div className="w-full min-h-[50px] flex items-center justify-center bg-stone-50 rounded-lg overflow-hidden border border-stone-200">
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block', minHeight: '50px', width: '100%' }}
                  data-ad-client={adClientId}
                  data-ad-slot={adSlotId || '1234567890'}
                  data-ad-format="horizontal"
                  data-full-width-responsive="true"
                />
              </div>
            ) : (
              /* Responsive Sponsor Banner */
              <div
                className={`w-full py-1 px-2.5 rounded-xl bg-gradient-to-r ${currentSample.color} text-white shadow-xs flex items-center justify-between gap-2 transition-all duration-500`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{currentSample.emoji}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-[11px] sm:text-xs truncate text-emerald-100 leading-[1.6]">
                        {currentSample.brand}
                      </span>
                      <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded text-emerald-50 shrink-0 font-medium leading-normal">
                        {currentSample.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-200 truncate leading-[1.6] hidden xs:block">
                      {currentSample.headline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsConfigOpen(true)}
                    className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-[10px] sm:text-xs flex items-center gap-1 border border-white/20 transition cursor-pointer"
                  >
                    <span>{currentSample.cta}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isConfigOpen && (
        <AdSettingsModal
          isOpen={isConfigOpen}
          onClose={() => {
            setIsConfigOpen(false);
            refreshAdState();
          }}
          lang={lang}
        />
      )}
    </>
  );
};
