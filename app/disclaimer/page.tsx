'use client';

import { useEffect } from 'react';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Disclaimer() {
  const { t } = useLanguage();
  const pageData = t.pages.disclaimer;

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
          <p className="text-sm text-gray-500 mb-8">{pageData.lastUpdated}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.generalInformation.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.generalInformation.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.useAtYourOwnRisk.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.useAtYourOwnRisk.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.noWarranties.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.noWarranties.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.noWarranties.item1}</li>
              <li>{pageData.sections.noWarranties.item2}</li>
              <li>{pageData.sections.noWarranties.item3}</li>
              <li>{pageData.sections.noWarranties.item4}</li>
              <li>{pageData.sections.noWarranties.item5}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.contentResponsibility.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.contentResponsibility.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.contentResponsibility.item1}</li>
              <li>{pageData.sections.contentResponsibility.item2}</li>
              <li>{pageData.sections.contentResponsibility.item3}</li>
              <li>{pageData.sections.contentResponsibility.item4}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.copyrightAndIntellectualProperty.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.copyrightAndIntellectualProperty.content1}
            </p>
            <p className="text-gray-600 mb-4">
              {pageData.sections.copyrightAndIntellectualProperty.content2}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.limitationOfLiability.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.limitationOfLiability.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.limitationOfLiability.item1}</li>
              <li>{pageData.sections.limitationOfLiability.item2}</li>
              <li>{pageData.sections.limitationOfLiability.item3}</li>
              <li>{pageData.sections.limitationOfLiability.item4}</li>
              <li>{pageData.sections.limitationOfLiability.item5}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.thirdPartyLinksAndServices.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.thirdPartyLinksAndServices.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.aiProcessingDisclaimer.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.aiProcessingDisclaimer.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.serviceAvailability.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.serviceAvailability.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.serviceAvailability.item1}</li>
              <li>{pageData.sections.serviceAvailability.item2}</li>
              <li>{pageData.sections.serviceAvailability.item3}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.indemnification.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.indemnification.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.indemnification.item1}</li>
              <li>{pageData.sections.indemnification.item2}</li>
              <li>{pageData.sections.indemnification.item3}</li>
              <li>{pageData.sections.indemnification.item4}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.professionalAdviceDisclaimer.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.professionalAdviceDisclaimer.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.changesToDisclaimer.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.changesToDisclaimer.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.governingLaw.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.governingLaw.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.contactInformation.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.contactInformation.content}
            </p>
            <p className="text-gray-600">
              <a href={`mailto:${t.pages.contact.email}`} className="text-blue-600 hover:text-blue-700">
                {t.pages.contact.email}
              </a>
            </p>
          </section>

          <section className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.importantNotice.title}
            </h2>
            <p className="text-gray-600">
              {pageData.sections.importantNotice.content}
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
