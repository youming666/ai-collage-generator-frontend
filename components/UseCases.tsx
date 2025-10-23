'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function UseCases() {
  const { t } = useLanguage();

  const cases = [
    {
      icon: '📸',
      title: t.useCases.case1.title,
      description: t.useCases.case1.description,
      features: [t.useCases.case1.feature1, t.useCases.case1.feature2, t.useCases.case1.feature3],
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
    },
    {
      icon: '🎉',
      title: t.useCases.case2.title,
      description: t.useCases.case2.description,
      features: [t.useCases.case2.feature1, t.useCases.case2.feature2, t.useCases.case2.feature3],
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-50 to-indigo-50',
    },
    {
      icon: '🛍️',
      title: t.useCases.case3.title,
      description: t.useCases.case3.description,
      features: [t.useCases.case3.feature1, t.useCases.case3.feature2, t.useCases.case3.feature3],
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {t.useCases.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.useCases.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {cases.map((useCase, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${useCase.bgGradient} rounded-2xl shadow-lg border-2 border-white p-8 hover:shadow-2xl transition-all hover:scale-105`}
          >
            {/* Icon */}
            <div className={`w-20 h-20 bg-gradient-to-br ${useCase.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
              <span className="text-4xl">{useCase.icon}</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {useCase.title}
            </h3>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {useCase.description}
            </p>

            {/* Features List */}
            <ul className="space-y-3">
              {useCase.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Additional Use Cases Grid */}
      <div className="mt-12">
        <p className="text-center text-gray-600 mb-6 font-medium">{t.useCases.alsoGreatFor}</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {[
            { icon: '💍', label: t.useCases.extra1 },
            { icon: '🎓', label: t.useCases.extra2 },
            { icon: '✈️', label: t.useCases.extra3 },
            { icon: '🏆', label: t.useCases.extra4 },
            { icon: '❤️', label: t.useCases.extra5 },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm font-semibold text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
