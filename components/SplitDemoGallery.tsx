'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SplitDemoGallery() {
  const { t } = useLanguage();

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {t.split.demo.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.split.demo.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* 2x2 Demo */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold text-green-700 shadow-sm">
              📐 {t.split.demo.grid4}
            </span>
          </div>
          <div className="relative aspect-video bg-gray-50">
            <Image
              src="/examples/split-demo-2x2.jpg"
              alt="2x2 Grid Split Demo - Split one image into 4 perfect squares"
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t.split.demo.grid4Description}</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.split.demo.grid4Feature1}
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.split.demo.grid4Feature2}
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.split.demo.grid4Feature3}
              </li>
            </ul>
          </div>
        </div>

        {/* 3x3 Demo */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold text-blue-700 shadow-sm">
              🎯 {t.split.demo.grid9}
            </span>
          </div>
          <div className="relative aspect-video bg-gray-50">
            <Image
              src="/examples/split-demo-3x3.jpg"
              alt="3x3 Grid Split Demo - Split one image into 9 perfect squares"
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t.split.demo.grid9Description}</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.split.demo.grid9Feature1}
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.split.demo.grid9Feature2}
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {t.split.demo.grid9Feature3}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">👁️</div>
          <div className="text-sm font-semibold text-gray-900">{t.split.demo.featureLabel1}</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">⬇️</div>
          <div className="text-sm font-semibold text-gray-900">{t.split.demo.featureLabel2}</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">⚙️</div>
          <div className="text-sm font-semibold text-gray-900">{t.split.demo.featureLabel3}</div>
        </div>
      </div>
    </section>
  );
}
