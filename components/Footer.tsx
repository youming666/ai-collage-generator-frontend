'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">{t.footer.aboutTitle}</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {t.footer.aboutDescription}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">{t.footer.aboutStatus}</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">{t.footer.toolsTitle}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <span>• </span> {t.footer.tool1}
                </Link>
              </li>
              <li>
                <Link href="/split" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <span>• </span> {t.footer.tool2}
                </Link>
              </li>
              <li>
                <span className="text-gray-400 flex items-center gap-2">
                  <span>• </span> {t.footer.tool3}
                </span>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">{t.footer.useCasesTitle}</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• {t.footer.useCase1}</li>
              <li>• {t.footer.useCase2}</li>
              <li>• {t.footer.useCase3}</li>
              <li>• {t.footer.useCase4}</li>
              <li>• {t.footer.useCase5}</li>
              <li>• {t.footer.useCase6}</li>
            </ul>
          </div>

          {/* Keywords (SEO) */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">{t.footer.keywordsTitle}</h3>
            <div className="flex flex-wrap gap-2">
              {[
                t.footer.keyword1,
                t.footer.keyword2,
                t.footer.keyword3,
                t.footer.keyword4,
                t.footer.keyword5,
                t.footer.keyword6,
                t.footer.keyword7,
                t.footer.keyword8,
              ].map((keyword, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                {t.footer.copyright}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {t.footer.madeWith}
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.privacyPolicy}</a>
              <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.termsOfService}</a>
              <a href="#" className="hover:text-blue-600 transition-colors">{t.footer.contact}</a>
            </div>
          </div>
        </div>

        {/* Additional SEO Content */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="text-xs text-gray-500 leading-relaxed">
            <p className="mb-2">
              <strong className="text-gray-700">{t.footer.seoKeyword}</strong> {t.footer.seoDescription}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
