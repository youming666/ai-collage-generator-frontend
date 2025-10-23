'use client';

import { useEffect } from 'react';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Privacy() {
  const { t } = useLanguage();
  const pageData = t.pages.privacy;

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
              {pageData.sections.introduction.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.introduction.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.informationWeCollect.title}
            </h2>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {pageData.sections.informationWeCollect.imagesYouUpload.subtitle}
            </h3>
            <p className="text-gray-600 mb-4">
              {pageData.sections.informationWeCollect.imagesYouUpload.content}
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {pageData.sections.informationWeCollect.usageInformation.subtitle}
            </h3>
            <p className="text-gray-600 mb-4">
              {pageData.sections.informationWeCollect.usageInformation.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.informationWeCollect.usageInformation.item1}</li>
              <li>{pageData.sections.informationWeCollect.usageInformation.item2}</li>
              <li>{pageData.sections.informationWeCollect.usageInformation.item3}</li>
              <li>{pageData.sections.informationWeCollect.usageInformation.item4}</li>
              <li>{pageData.sections.informationWeCollect.usageInformation.item5}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.howWeUseYourInformation.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.howWeUseYourInformation.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.howWeUseYourInformation.item1}</li>
              <li>{pageData.sections.howWeUseYourInformation.item2}</li>
              <li>{pageData.sections.howWeUseYourInformation.item3}</li>
              <li>{pageData.sections.howWeUseYourInformation.item4}</li>
              <li>{pageData.sections.howWeUseYourInformation.item5}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.imageStorageAndProcessing.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.imageStorageAndProcessing.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.imageStorageAndProcessing.item1}</li>
              <li>{pageData.sections.imageStorageAndProcessing.item2}</li>
              <li>{pageData.sections.imageStorageAndProcessing.item3}</li>
              <li>{pageData.sections.imageStorageAndProcessing.item4}</li>
              <li>{pageData.sections.imageStorageAndProcessing.item5}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.cookiesAndTracking.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.cookiesAndTracking.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.cookiesAndTracking.item1}</li>
              <li>{pageData.sections.cookiesAndTracking.item2}</li>
              <li>{pageData.sections.cookiesAndTracking.item3}</li>
            </ul>
            <p className="text-gray-600 mb-4">
              {pageData.sections.cookiesAndTracking.outro}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.thirdPartyServices.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.thirdPartyServices.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.thirdPartyServices.item1}</li>
              <li>{pageData.sections.thirdPartyServices.item2}</li>
              <li>{pageData.sections.thirdPartyServices.item3}</li>
            </ul>
            <p className="text-gray-600 mb-4">
              {pageData.sections.thirdPartyServices.outro}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.dataSecurity.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.dataSecurity.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.yourRights.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.yourRights.intro}
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>{pageData.sections.yourRights.item1}</li>
              <li>{pageData.sections.yourRights.item2}</li>
              <li>{pageData.sections.yourRights.item3}</li>
              <li>{pageData.sections.yourRights.item4}</li>
              <li>{pageData.sections.yourRights.item5}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.childrensPrivacy.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.childrensPrivacy.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.changesToThisPolicy.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.changesToThisPolicy.content}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {pageData.sections.contactUs.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {pageData.sections.contactUs.content}
            </p>
            <p className="text-gray-600">
              <a href={`mailto:${t.pages.contact.email}`} className="text-blue-600 hover:text-blue-700">
                {t.pages.contact.email}
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
