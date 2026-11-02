import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Props {
  currentLang: Language;
}

export const PWAInstallButton: React.FC<Props> = ({ currentLang }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const t = translations[currentLang] || translations.ur;

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3 py-1.5 shadow-sm transition active:scale-95"
        title={t.installApp}
      >
        <Download className="w-3.5 h-3.5" />
        <span>{t.installApp}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-semibold px-3 py-1.5 shadow-xs transition active:scale-95"
          title={t.installOnIos}
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-700" />
          <span>{t.installOnIos}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-amber-200 text-stone-900">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/pwa-192x192.png"
                    alt="Aj kya pakaye logo"
                    className="w-10 h-10 rounded-xl object-cover shadow-md border border-amber-300/60 shrink-0"
                  />
                  <div className="text-start">
                    <h3 className="text-sm font-bold text-stone-900 leading-[1.6]">{t.iosGuideTitle}</h3>
                    <p className="text-[11px] text-stone-500 leading-normal">Add to Home Screen</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-full p-1 text-stone-400 hover:bg-stone-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
                <div className="flex items-start gap-2.5 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-[10px]">1</span>
                  <p>{t.iosGuideStep1}</p>
                </div>
                <div className="flex items-start gap-2.5 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-[10px]">2</span>
                  <p>{t.iosGuideStep2}</p>
                </div>
                <div className="flex items-start gap-2.5 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-[10px]">3</span>
                  <p>{t.iosGuideStep3}</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-stone-900 text-white py-2 text-xs font-semibold hover:bg-stone-800 transition"
              >
                {t.understood}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
