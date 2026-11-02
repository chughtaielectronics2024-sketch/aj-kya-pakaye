import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { getStoredLanguage } from './services/storage.ts';

// Immediate sync of dir & lang before hydration to prevent layout shift
const initialLang = getStoredLanguage();
const isRtl = ['ur', 'ps', 'pa', 'ar', 'fa'].includes(initialLang);
document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
document.documentElement.lang = initialLang;

createRoot(document.getElementById('root')!).render(<App />);
