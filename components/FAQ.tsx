'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'What image formats are supported?',
      answer: 'We support all common image formats including JPG, JPEG, PNG, and WEBP. For best results, we recommend using high-quality images with at least 1080px width. The maximum file size is 10MB per image.',
    },
    {
      question: 'How long does AI background removal take?',
      answer: 'The entire process typically takes around 90 seconds. This includes uploading your image, AI processing to remove the background, creating the 3D grid layout, and generating your final collage. You\'ll see a real-time progress bar during processing.',
    },
    {
      question: 'What\'s the daily generation limit?',
      answer: 'You can generate up to 5 collages per day for free. The quota resets every 24 hours at midnight. Important: Adjusting parameters (scale, position) after generation does NOT consume your quota — only clicking "Generate" uses one quota slot.',
    },
    {
      question: 'Can I use the generated images for commercial purposes?',
      answer: 'Yes! All generated collages are yours to use freely for both personal and commercial purposes. However, please ensure you have the rights to use the original photos you upload. We don\'t claim ownership of your images or generated collages.',
    },
    {
      question: 'What resolution is the final output?',
      answer: 'The final collage is generated at 1080×1440 pixels (3:4 aspect ratio), which is the optimal size for Instagram posts, Facebook stories, and TikTok videos. This ensures your collage looks crisp and professional on all social media platforms.',
    },
    {
      question: 'Do I need all 9 grid photos?',
      answer: 'No, you can start with fewer photos. While 9 photos create the fullest grid effect, you can generate collages with any number of grid photos from 1 to 9. Empty slots will simply remain blank, giving you more creative flexibility.',
    },
    {
      question: 'What makes this different from other collage makers?',
      answer: 'Unlike manual tools, we offer AI-powered background removal in 90 seconds, stunning 3D pop-out effects, and real-time parameter adjustments without consuming your quota. No Photoshop or design skills needed — just upload and create!',
    },
    {
      question: 'Is my data safe and private?',
      answer: 'Absolutely. Your uploaded images are processed securely and are not stored on our servers after processing. All data is handled with encryption. We respect your privacy and do not share your images with third parties.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to know about our AI Collage Generator
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
        <p className="text-gray-600 mb-4">Still have questions?</p>
        <button
          onClick={() => {
            const toolSection = document.getElementById('tool-section');
            if (toolSection) {
              toolSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-all"
        >
          Try it now — it's free!
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </section>
  );
}
