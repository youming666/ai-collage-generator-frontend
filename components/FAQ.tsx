'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t.faq.q1.question,
      answer: t.faq.q1.answer,
    },
    {
      question: t.faq.q2.question,
      answer: t.faq.q2.answer,
    },
    {
      question: t.faq.q3.question,
      answer: t.faq.q3.answer,
    },
    {
      question: t.faq.q4.question,
      answer: t.faq.q4.answer,
    },
    {
      question: t.faq.q5.question,
      answer: t.faq.q5.answer,
    },
    {
      question: t.faq.q6.question,
      answer: t.faq.q6.answer,
    },
    {
      question: t.faq.q7.question,
      answer: t.faq.q7.answer,
    },
    {
      question: t.faq.q8.question,
      answer: t.faq.q8.answer,
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {t.faq.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.faq.subtitle}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions? */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">{t.faq.stillHaveQuestions}</p>
        <button
          onClick={() => {
            const toolSection = document.getElementById('tool-section');
            if (toolSection) {
              toolSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all"
        >
          {t.faq.tryNowButton}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
