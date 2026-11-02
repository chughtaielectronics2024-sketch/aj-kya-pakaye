import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { Sparkles, Settings2, ExternalLink, ShieldCheck } from 'lucide-react';
import { STORAGE_KEYS, AdSettingsModal } from './AdSettingsModal';

interface GoogleAdBannerProps {
  lang: Language;
  slotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal';
  className?: string;
}

const adTexts: Record<Language, {
  adBadge: string;
  sponsored: string;
  googleAdsTitle: string;
  demoNotice: string;
  configBtn: string;
  sampleBrand: string;
  sampleHeadline: string;
  sampleCta: string;
}> = {
  ur: {
    adBadge: 'اشتہار',
    sponsored: 'گوگل اشتہار',
    googleAdsTitle: 'گوگل ایڈسینس کا اشتہاری ایریا',
    demoNotice: 'جب آپ اپنا پبلشر ID ڈالیں گے تو یہاں اصل گوگل اشتہارات آئیں گے۔',
    configBtn: 'سیٹنگز',
    sampleBrand: 'باورچی خانے کی ضروری اشیاء',
    sampleHeadline: 'تازہ گھی، خالص مصالحہ جات اور گروسری پر خصوصی رعایت',
    sampleCta: 'آرڈر کریں'
  },
  pa: {
    adBadge: 'اشتہار',
    sponsored: 'گوگل اشتہار',
    googleAdsTitle: 'گوگل ایڈسینس دی اشتہاری تھاں',
    demoNotice: 'جدوں تسی اپنا پبلشر ID پاؤ گے تے ایتھے اصلی گوگل اشتہار آ جان گے۔',
    configBtn: 'سیٹنگز',
    sampleBrand: 'رسوئی دیاں خاص چیزاں',
    sampleHeadline: 'خالص گھیو، مصالحے تے کرانہ سامان تے خاص رعایت',
    sampleCta: 'آرڈر کرو'
  },
  ps: {
    adBadge: 'اعلان',
    sponsored: 'د ګوګل اعلان',
    googleAdsTitle: 'د ګوګل ایډسینس ځای',
    demoNotice: 'کله چې خپل د پبلشر ID ولیکئ، نو اصلي ګوګل اعلانونه به دلته ښودل کیږي.',
    configBtn: 'تنظیمات',
    sampleBrand: 'د پخلنځي اړین توکي',
    sampleHeadline: 'خالص غوړي، مصالحې او تازه خوراکي توکي',
    sampleCta: 'فرمایش ورکړئ'
  },
  ar: {
    adBadge: 'إعلان',
    sponsored: 'إعلان جوجل',
    googleAdsTitle: 'مساحة إعلانية من Google AdSense',
    demoNotice: 'ستظهر إعلانات جوجل الحقيقية هنا فور تفعيل معرّف الناشر الخاص بك.',
    configBtn: 'الإعدادات',
    sampleBrand: 'مستلزمات الطهي والمطبخ',
    sampleHeadline: 'عروض خاصة على التوابل الأصلية وزيوت الطهي النقية',
    sampleCta: 'تسوق الآن'
  },
  fa: {
    adBadge: 'تبلیغ',
    sponsored: 'تبلیغات گوگل',
    googleAdsTitle: 'فضای تبلیغاتی گوگل ادسنس',
    demoNotice: 'با وارد کردن شناسه ناشر، تبلیغات واقعی گوگل در این مکان نمایش داده می‌شود.',
    configBtn: 'تنظیمات',
    sampleBrand: 'ملزومات تازه آشپزخانه',
    sampleHeadline: 'تخفیف ویژه انواع ادویه و روغن‌های خالص پخت و پز',
    sampleCta: 'مشاهده'
  },
  es: {
    adBadge: 'Anuncio',
    sponsored: 'Google Ads',
    googleAdsTitle: 'Espacio de Google AdSense',
    demoNotice: 'Los anuncios reales de Google aparecerán aquí una vez configurado su ID.',
    configBtn: 'Ajustes',
    sampleBrand: 'Esenciales de Cocina',
    sampleHeadline: 'Descuentos en especias y aceites naturales de cocina',
    sampleCta: 'Ver Ofertas'
  },
  en: {
    adBadge: 'Ad',
    sponsored: 'Google Ads',
    googleAdsTitle: 'Google AdSense Placement',
    demoNotice: 'Real Google Ads will display here once your Publisher ID is configured.',
    configBtn: 'Settings',
    sampleBrand: 'Kitchen & Grocery Essentials',
    sampleHeadline: 'Special discounts on pure spices, cooking oils & organic foods',
    sampleCta: 'Shop Now'
  }
};

export const GoogleAdBanner: React.FC<GoogleAdBannerProps> = ({
  lang,
  slotId = 'default-slot',
  format = 'auto',
  className = ''
}) => {
  const [clientId, setClientId] = useState<string>(() => localStorage.getItem(STORAGE_KEYS.CLIENT_ID) || '');
  const [adMode, setAdMode] = useState<'preview' | 'live'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.MODE) as 'preview' | 'live') || 'preview';
  });
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const t = adTexts[lang] || adTexts.ur;

  // Sync state if localStorage changes
  const refreshSettings = () => {
    setClientId(localStorage.getItem(STORAGE_KEYS.CLIENT_ID) || '');
    setAdMode(((localStorage.getItem(STORAGE_KEYS.MODE) as 'preview' | 'live') || 'preview'));
  };

  useEffect(() => {
    if (adMode === 'live' && clientId && clientId.startsWith('ca-pub-')) {
      const existingScript = document.querySelector('script[src*="adsbygoogle"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
      try {
        // @ts-expect-error Google AdSense global
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log('AdSense in-feed push note:', e);
      }
    }
  }, [adMode, clientId]);

  return (
    <>
      <div className={`w-full my-4 ${className}`}>
        {/* Compliance Header */}
        <div className="flex items-center justify-between text-[10px] font-bold text-stone-400 mb-1 px-1">
          <div className="flex items-center gap-1.5">
            <span className="uppercase tracking-wider px-1.5 py-0.5 rounded bg-stone-200 text-stone-600 font-black">
              {t.adBadge}
            </span>
            <span className="text-stone-500 font-semibold">{t.sponsored}</span>
          </div>
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="flex items-center gap-1 text-stone-400 hover:text-emerald-700 transition cursor-pointer"
            title="Google Ads Configuration"
          >
            <Settings2 className="w-3 h-3" />
            <span className="text-[10px] font-medium">{t.configBtn}</span>
          </button>
        </div>

        {/* Ad Container */}
        {adMode === 'live' && clientId ? (
          <div className="w-full bg-white rounded-2xl border border-stone-200 p-2 overflow-hidden shadow-xs min-h-[90px] flex items-center justify-center">
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%', minHeight: '90px' }}
              data-ad-client={clientId}
              data-ad-slot={slotId}
              data-ad-format={format}
              data-full-width-responsive="true"
            />
          </div>
        ) : (
          /* High-fidelity Google Ads Preview Card */
          <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 rounded-2xl border border-emerald-200/80 p-3 sm:p-4 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div className="min-w-0 text-start">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs sm:text-sm text-stone-900 leading-snug">
                      {t.sampleBrand}
                    </span>
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-sm">
                      Google Ads Ready
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight mt-0.5 font-medium line-clamp-1">
                    {t.sampleHeadline}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                <button
                  type="button"
                  onClick={() => setIsConfigOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 text-xs font-bold border border-stone-200 transition active:scale-95 cursor-pointer shadow-2xs"
                >
                  {t.configBtn}
                </button>
                <a
                  href="https://adsense.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <span>{t.sampleCta}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-emerald-100/70 flex items-center justify-between text-[10px] text-stone-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>{t.demoNotice}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {isConfigOpen && (
        <AdSettingsModal
          isOpen={isConfigOpen}
          onClose={() => {
            setIsConfigOpen(false);
            refreshSettings();
          }}
          lang={lang}
        />
      )}
    </>
  );
};
