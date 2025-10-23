'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import zh from '@/locales/zh.json';

type Language = 'en' | 'zh';
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 检测用户地理位置（基于浏览器语言和时区）
const detectUserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';

  // 1. 检查 localStorage 中是否有保存的语言偏好
  const savedLang = localStorage.getItem('preferred-language');
  if (savedLang === 'zh' || savedLang === 'en') {
    return savedLang;
  }

  // 2. 检测浏览器语言
  const browserLang = navigator.language || (navigator as any).userLanguage;
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }

  // 3. 默认英语
  return 'en';
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 客户端初始化时检测语言
    const detectedLang = detectUserLanguage();
    setLanguageState(detectedLang);
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang);
    }
  };

  const translations: Translations = language === 'zh' ? zh : en;

  // 避免 SSR 和 CSR 不匹配，在客户端挂载前返回默认语言
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage, t: en }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
