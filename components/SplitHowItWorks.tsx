'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function SplitHowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      title: t.split.howItWorks.step1.title,
      description: t.split.howItWorks.step1.description,
      icon: '📤',
      color: 'from-green-500 to-teal-500',
    },
    {
      number: 2,
      title: t.split.howItWorks.step2.title,
      description: t.split.howItWorks.step2.description,
      icon: '⚙️',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 3,
      title: t.split.howItWorks.step3.title,
      description: t.split.howItWorks.step3.description,
      icon: '📏',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {t.split.howItWorks.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.split.howItWorks.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.number}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all hover:scale-105 relative"
          >
            {/* Step Number Badge */}
            <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
              {step.number}
            </div>

            {/* Icon */}
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-200">
              <span className="text-4xl">{step.icon}</span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-10 text-center">
        <p className="text-gray-500 text-sm">
          ⏱️ {t.split.howItWorks.totalTimeLabel} <span className="font-semibold text-gray-700">{t.split.howItWorks.totalTimeValue}</span>
        </p>
      </div>
    </section>
  );
}
