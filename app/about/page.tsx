'use client';

import { useEffect } from 'react';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const pageData = t.pages.about;

  // 动态更新页面标题和meta标签
  useEffect(() => {
    document.title = pageData.meta.title;

    // 更新meta描述
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', pageData.meta.description);

    // 更新meta关键词
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', pageData.meta.keywords);
  }, [pageData]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{pageData.title}</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.whatWeDo.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.whatWeDo.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.howItWorks.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.howItWorks.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>{pageData.sections.howItWorks.step1}</li>
              <li>{pageData.sections.howItWorks.step2}</li>
              <li>{pageData.sections.howItWorks.step3}</li>
              <li>{pageData.sections.howItWorks.step4}</li>
              <li>{pageData.sections.howItWorks.step5}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.ourMission.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.ourMission.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.technology.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.technology.content}
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
