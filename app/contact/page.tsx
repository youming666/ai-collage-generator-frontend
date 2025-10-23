'use client';

import { useEffect } from 'react';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const pageData = t.pages.contact;

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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <p className="text-gray-600 mb-6">
            {pageData.intro}
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {pageData.sections.emailTitle}
              </h2>
              <a
                href={`mailto:${pageData.email}`}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                {pageData.email}
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {pageData.sections.responseTime.title}
              </h2>
              <p className="text-gray-600">
                {pageData.sections.responseTime.content}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {pageData.sections.whatToInclude.title}
              </h2>
              <p className="text-gray-600 mb-2">
                {pageData.sections.whatToInclude.intro}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>{pageData.sections.whatToInclude.item1}</li>
                <li>{pageData.sections.whatToInclude.item2}</li>
                <li>{pageData.sections.whatToInclude.item3}</li>
                <li>{pageData.sections.whatToInclude.item4}</li>
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {pageData.sections.faq.title}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {pageData.sections.faq.q1.question}
                  </h3>
                  <p className="text-gray-600">
                    {pageData.sections.faq.q1.answer}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {pageData.sections.faq.q2.question}
                  </h3>
                  <p className="text-gray-600">
                    {pageData.sections.faq.q2.answer}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {pageData.sections.faq.q3.question}
                  </h3>
                  <p className="text-gray-600">
                    {pageData.sections.faq.q3.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
