import React, { useState } from 'react';
import { Language } from '../types';
import { X, Check, ExternalLink, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export const STORAGE_KEYS = {
  CLIENT_ID: 'ajk_adsense_client_id',
  SLOT_ID: 'ajk_adsense_slot_id',
  MODE: 'ajk_adsense_mode', // 'preview' | 'live'
};

interface AdSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const modalTexts: Record<Language, {
  title: string;
  desc: string;
  modeLabel: string;
  modeDemo: string;
  modeLive: string;
  clientIdLabel: string;
  clientIdPlaceholder: string;
  slotIdLabel: string;
  slotIdPlaceholder: string;
  testBtn: string;
  saveBtn: string;
  savedMsg: string;
  noteTitle: string;
  noteBody: string;
  adsenseLinkText: string;
}> = {
  ur: {
    title: 'گوگل ایڈسینس سیٹنگز (Google Ads)',
    desc: 'یہاں آپ اپنا گوگل ایڈسینس پبلشر ID ڈال کر لائیو اشتہارات فعال کر سکتے ہیں۔',
    modeLabel: 'اشتہارات کی حالت (Status)',
    modeDemo: 'ڈیمو موڈ (Preview)',
    modeLive: 'لائیو ایڈسینس (Live Google Ads)',
    clientIdLabel: 'گوگل پبلشر ID (Publisher ID)',
    clientIdPlaceholder: 'مثال: ca-pub-1234567890123456',
    slotIdLabel: 'اشتہار کا سلاٹ ID (Ad Slot ID)',
    slotIdPlaceholder: 'مثال: 1234567890',
    testBtn: 'ٹیسٹ ایڈ آئی ڈی آزمائیں',
    saveBtn: 'سیٹنگز محفوظ کریں',
    savedMsg: 'سیٹنگز کامیابی سے محفوظ ہو گئیں!',
    noteTitle: 'اہم نوٹ برائے ایڈسینس:',
    noteBody: 'جب آپ کا گوگل ایڈسینس اکاؤنٹ منظور (Approve) ہو جائے تو گوگل آپ کو ca-pub کوڈ فراہم کرتا ہے۔ وہ کوڈ یہاں درج کرنے سے آپ کی ایپ پر باقاعدہ گوگل اشتہارات چلنا شروع ہو جائیں گے۔',
    adsenseLinkText: 'گوگل ایڈسینس ویب سائٹ پر جائیں'
  },
  pa: {
    title: 'گوگل ایڈسینس سیٹنگز (Google Ads)',
    desc: 'ایتھے تسی اپنا گوگل ایڈسینس پبلشر ID پا کے لائیو اشتہار چالو کر سکدے او۔',
    modeLabel: 'اشتہار دی حالت (Status)',
    modeDemo: 'ڈیمو موڈ (Preview)',
    modeLive: 'لائیو ایڈسینس (Live Google Ads)',
    clientIdLabel: 'گوگل پبلشر ID (Publisher ID)',
    clientIdPlaceholder: 'مثال: ca-pub-1234567890123456',
    slotIdLabel: 'اشتہار دا سلاٹ ID (Ad Slot ID)',
    slotIdPlaceholder: 'مثال: 1234567890',
    testBtn: 'ٹیسٹ ایڈ آئی ڈی ورتو',
    saveBtn: 'سیٹنگز سانبھو',
    savedMsg: 'سیٹنگز محفوظ ہو گئیاں!',
    noteTitle: 'اہم نوٹ برائے ایڈسینس:',
    noteBody: 'جدوں ایڈسینس منظور ہو جاوے تے ca-pub کوڈ ایتھے درج کرن نال گوگل اشتہار چلن لگ پین گے۔',
    adsenseLinkText: 'گوگل ایڈسینس تے جاؤ'
  },
  ps: {
    title: 'د ګوګل اعلاناتو تنظیمات (Google Ads)',
    desc: 'دلته خپل د ګوګل ایډسینس پبلشر ID دننه کړئ ترڅو ژوندي اعلانونه فعال شي.',
    modeLabel: 'د اعلاناتو حالت (Status)',
    modeDemo: 'ډیمو بڼه (Preview)',
    modeLive: 'ژوندي اعلانونه (Live Google Ads)',
    clientIdLabel: 'ګوګل پبلشر ID (Publisher ID)',
    clientIdPlaceholder: 'بېلګه: ca-pub-1234567890123456',
    slotIdLabel: 'د اعلان سلاټ ID (Ad Slot ID)',
    slotIdPlaceholder: 'بېلګه: 1234567890',
    testBtn: 'د آزمایښت اعلانونو کوډ',
    saveBtn: 'تنظیمات خوندي کړئ',
    savedMsg: 'تنظیمات په بریا سره خوندي شول!',
    noteTitle: 'مهم یادښت:',
    noteBody: 'کله چې ستاسو د AdSense حساب تصویب شي، نو ورکړل شوی ca-pub کوډ دلته ولیکئ.',
    adsenseLinkText: 'د AdSense وېبپاڼې ته لاړ شئ'
  },
  ar: {
    title: 'إعدادات إعلانات جوجل (Google Ads)',
    desc: 'أدخل معرّف الناشر في Google AdSense لتفعيل الإعلانات المباشرة على التطبيق.',
    modeLabel: 'وضع الإعلانات (Status)',
    modeDemo: 'وضع المعاينة (Demo Mode)',
    modeLive: 'إعلانات جوجل المباشرة (Live Ads)',
    clientIdLabel: 'معرّف الناشر (Publisher ID)',
    clientIdPlaceholder: 'مثال: ca-pub-1234567890123456',
    slotIdLabel: 'معرّف الوحدة الإعلانية (Slot ID)',
    slotIdPlaceholder: 'مثال: 1234567890',
    testBtn: 'استخدام معرّف تجريبي',
    saveBtn: 'حفظ الإعدادات',
    savedMsg: 'تم حفظ الإعدادات بنجاح!',
    noteTitle: 'ملاحظة هامة:',
    noteBody: 'بمجرد الموافقة على حسابك في AdSense، انسخ رمز الناشر هنا لعرض الإعلانات فورياً.',
    adsenseLinkText: 'الانتقال إلى موقع Google AdSense'
  },
  fa: {
    title: 'تنظیمات تبلیغات گوگل (Google Ads)',
    desc: 'شناسه ناشر گوگل ادسنس خود را برای فعال‌سازی تبلیغات زنده وارد کنید.',
    modeLabel: 'وضعیت نمایش تبلیغات (Status)',
    modeDemo: 'حالت پیش‌نمایش (Demo)',
    modeLive: 'تبلیغات زنده گوگل (Live Ads)',
    clientIdLabel: 'شناسه ناشر (Publisher ID)',
    clientIdPlaceholder: 'مثال: ca-pub-1234567890123456',
    slotIdLabel: 'شناسه اسلات تبلیغ (Slot ID)',
    slotIdPlaceholder: 'مثال: 1234567890',
    testBtn: 'آزمایش با شناسه تستی',
    saveBtn: 'ذخیره تنظیمات',
    savedMsg: 'تنظیمات با موفقیت ذخیره شد!',
    noteTitle: 'نکته مهم:',
    noteBody: 'پس از تایید حساب در AdSense، شناسه ca-pub خود را اینجا وارد کنید.',
    adsenseLinkText: 'ورود به گوگل ادسنس'
  },
  es: {
    title: 'Configuración de Google AdSense',
    desc: 'Configure su ID de editor de Google AdSense para mostrar anuncios en vivo.',
    modeLabel: 'Modo de Anuncios',
    modeDemo: 'Modo Demo / Vista Previa',
    modeLive: 'Google AdSense en Vivo',
    clientIdLabel: 'ID de Editor (ca-pub-...)',
    clientIdPlaceholder: 'ej. ca-pub-1234567890123456',
    slotIdLabel: 'ID del Espacio Publicitario',
    slotIdPlaceholder: 'ej. 1234567890',
    testBtn: 'Usar ID de Prueba',
    saveBtn: 'Guardar Configuración',
    savedMsg: '¡Configuración guardada!',
    noteTitle: 'Guía de AdSense:',
    noteBody: 'Una vez aprobado su dominio en Google AdSense, inserte su código ca-pub aquí.',
    adsenseLinkText: 'Ir a Google AdSense'
  },
  en: {
    title: 'Google AdSense Settings',
    desc: 'Configure your Google AdSense Publisher ID to display live advertisements.',
    modeLabel: 'Ad Serving Mode',
    modeDemo: 'Preview / Demo Ads',
    modeLive: 'Live Google AdSense',
    clientIdLabel: 'Publisher ID (client)',
    clientIdPlaceholder: 'e.g. ca-pub-1234567890123456',
    slotIdLabel: 'Ad Slot ID (optional)',
    slotIdPlaceholder: 'e.g. 1234567890',
    testBtn: 'Use Official Test ID',
    saveBtn: 'Save Settings',
    savedMsg: 'Settings saved successfully!',
    noteTitle: 'Google AdSense Guidance:',
    noteBody: 'Once your website domain is approved by Google AdSense, paste your ca-pub publisher code here to instantly serve real Google advertisements across the application.',
    adsenseLinkText: 'Open Google AdSense Console'
  }
};

export const AdSettingsModal: React.FC<AdSettingsModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const [clientId, setClientId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CLIENT_ID) || '';
  });
  const [slotId, setSlotId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.SLOT_ID) || '';
  });
  const [mode, setMode] = useState<'preview' | 'live'>(() => {
    return (localStorage.getItem(STORAGE_KEYS.MODE) as 'preview' | 'live') || 'preview';
  });
  const [showSaved, setShowSaved] = useState(false);

  if (!isOpen) return null;

  const t = modalTexts[lang] || modalTexts.ur;

  const handleUseTest = () => {
    // Official Google AdSense test client ID
    setClientId('ca-pub-1234567890123456');
    setSlotId('1234567890');
    setMode('live');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEYS.CLIENT_ID, clientId.trim());
    localStorage.setItem(STORAGE_KEYS.SLOT_ID, slotId.trim());
    localStorage.setItem(STORAGE_KEYS.MODE, mode);
    setShowSaved(true);
    setTimeout(() => {
      setShowSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto text-stone-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-stone-900 leading-tight">
                {t.title}
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                Google AdSense Manager
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-stone-600 mb-4 font-medium leading-relaxed">
          {t.desc}
        </p>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {/* Mode Switcher */}
          <div>
            <label className="font-bold text-stone-700 block mb-1.5">
              {t.modeLabel}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('preview')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition border cursor-pointer ${
                  mode === 'preview'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t.modeDemo}
              </button>
              <button
                type="button"
                onClick={() => setMode('live')}
                className={`py-2 px-3 rounded-xl font-bold text-xs transition border cursor-pointer ${
                  mode === 'live'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t.modeLive}
              </button>
            </div>
          </div>

          {/* Publisher ID Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-stone-700">
                {t.clientIdLabel}
              </label>
              <button
                type="button"
                onClick={handleUseTest}
                className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                {t.testBtn}
              </button>
            </div>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder={t.clientIdPlaceholder}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
              dir="ltr"
            />
          </div>

          {/* Ad Slot ID Field */}
          <div>
            <label className="font-bold text-stone-700 block mb-1">
              {t.slotIdLabel}
            </label>
            <input
              type="text"
              value={slotId}
              onChange={(e) => setSlotId(e.target.value)}
              placeholder={t.slotIdPlaceholder}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-stone-900 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
              dir="ltr"
            />
          </div>

          {/* Information & Guidelines Box */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-3 text-stone-700 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{t.noteTitle}</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              {t.noteBody}
            </p>
            <a
              href="https://adsense.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline pt-1"
            >
              <span>{t.adsenseLinkText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition active:scale-95 cursor-pointer"
            >
              بند کریں (Close)
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {showSaved ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{t.savedMsg}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>{t.saveBtn}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
