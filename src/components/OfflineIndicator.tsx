import React, { useState, useEffect } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, X } from 'lucide-react';

interface Props {
  text?: string;
  durationMs?: number;
}

export const OfflineIndicator: React.FC<Props> = ({ 
  text, 
  durationMs = 4000 
}) => {
  const isOnline = useOnlineStatus();
  const [isVisible, setIsVisible] = useState(false);
  const [hasShownThisOffline, setHasShownThisOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      if (!hasShownThisOffline) {
        setIsVisible(true);
        setHasShownThisOffline(true);

        const timer = setTimeout(() => {
          setIsVisible(false);
        }, durationMs);

        return () => clearTimeout(timer);
      }
    } else {
      // When connection is restored, reset so if user disconnects again it can notify once
      setIsVisible(false);
      setHasShownThisOffline(false);
    }
  }, [isOnline, hasShownThisOffline, durationMs]);

  if (isOnline || !isVisible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 flex items-center gap-2 rounded-xl bg-stone-900/90 text-amber-300 backdrop-blur-md px-3.5 py-2 text-xs font-medium shadow-xl border border-amber-500/30 animate-in fade-in slide-in-from-bottom duration-300">
      <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
      <span>{text || 'آف لائن موڈ فعال ہے (بغیر انٹرنیٹ چلے گا)'}</span>
      <button 
        onClick={() => setIsVisible(false)}
        className="ml-1 p-0.5 text-stone-400 hover:text-white rounded-md transition"
        aria-label="Close"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
