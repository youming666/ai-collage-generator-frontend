'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: '✨',
      title: t.features.feature1.title,
      description: t.features.feature1.description,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🎨',
      title: t.features.feature2.title,
      description: t.features.feature2.description,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '📱',
      title: t.features.feature3.title,
      description: t.features.feature3.description,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: '💯',
      title: t.features.feature4.title,
      description: t.features.feature4.description,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: '⚡',
      title: t.features.feature5.title,
      description: t.features.feature5.description,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🎯',
      title: t.features.feature6.title,
      description: t.features.feature6.description,
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {t.features.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.features.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all hover:scale-105 group"
          >
            {/* Icon with Gradient Background */}
            <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
              <span className="text-3xl">{feature.icon}</span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-4">
          {t.features.ctaText}
        </p>
        <button
          onClick={() => {
            const toolSection = document.getElementById('tool-section');
            if (toolSection) {
              toolSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
        >
          {t.features.ctaButton}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
