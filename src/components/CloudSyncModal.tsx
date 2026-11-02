import React, { useState } from 'react';
import { exportFullBackup, importFullBackup } from '../services/storage';
import { Language } from '../types';
import { translations } from '../data/translations';
import { Cloud, Download, Upload, Copy, Check, X, ShieldCheck, Smartphone } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onRefreshAllData: () => void;
}

export const CloudSyncModal: React.FC<Props> = ({
  isOpen,
  onClose,
  lang,
  onRefreshAllData
}) => {
  if (!isOpen) return null;

  const t = translations[lang] || translations.ur;
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleCopyBackup = () => {
    const backupJson = exportFullBackup();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(backupJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadBackup = () => {
    const backupJson = exportFullBackup();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aj-kya-pakaye-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;

    const ok = importFullBackup(importText.trim());
    if (ok) {
      setSyncStatus(t.dataRestoredSuccess);
      onRefreshAllData();
      setTimeout(() => {
        setSyncStatus(null);
        onClose();
      }, 1500);
    } else {
      setSyncStatus(t.invalidBackupFormat);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 overflow-hidden animate-in fade-in duration-200 select-none"
      onClick={onClose}
    >
      <div 
        className="w-full sm:max-w-md bg-white rounded-t-[32px] sm:rounded-3xl p-5 shadow-2xl border-t sm:border border-emerald-100 text-stone-900 animate-in slide-in-from-bottom duration-300 max-h-[92vh] overflow-y-auto safe-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pull handle for mobile */}
        <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Cloud className="w-5 h-5 text-emerald-700" />
            <h3 className="font-extrabold text-base text-stone-900">
              {t.cloudSyncTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:bg-stone-100 active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5 text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <p>
              {t.syncNotice}
            </p>
          </div>

          {/* Export Actions */}
          <div className="space-y-2">
            <label className="font-bold text-stone-700 block">{t.exportBackupLabel}</label>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyBackup}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold active:scale-95 transition"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.copySuccess : t.copyBackupCode}</span>
              </button>

              <button
                onClick={handleDownloadBackup}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold active:scale-95 transition shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>{t.exportBackup}</span>
              </button>
            </div>
          </div>

          {/* Import / Restore */}
          <form onSubmit={handleImportSubmit} className="space-y-2 pt-3 border-t border-stone-100">
            <label className="font-bold text-stone-700 block">{t.importBackupLabel}</label>
            <textarea
              rows={3}
              placeholder={t.pasteCodePlaceholder}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              className="w-full p-3 rounded-2xl border border-stone-300 font-mono text-[11px] outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold active:scale-95 transition"
            >
              <Upload className="w-4 h-4" />
              <span>{t.importBackup}</span>
            </button>
          </form>

          {syncStatus && (
            <p className={`p-2.5 rounded-2xl text-center font-bold text-xs ${
              syncStatus.includes('کامیابی') || syncStatus.includes('success') ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
            }`}>
              {syncStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
