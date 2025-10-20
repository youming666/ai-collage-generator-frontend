export default function Features() {
  const features = [
    {
      icon: '✨',
      title: 'AI-Powered Background Removal',
      description: 'Advanced AI technology automatically removes backgrounds with precision in ~90 seconds. No more hours of manual editing in Photoshop.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '🎨',
      title: 'Real-Time Adjustments',
      description: 'Adjust scale, position, and other parameters instantly. See changes in real-time before downloading. No quota consumed when tweaking!',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '📱',
      title: 'Perfect for Social Media',
      description: 'Optimized 3:4 aspect ratio (1080×1440px) designed specifically for Instagram posts, Facebook stories, and TikTok videos.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: '💯',
      title: 'Generous Free Daily Quota',
      description: 'Generate up to 5 stunning 3D collages per day — completely free. Unlimited parameter adjustments without consuming your quota.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast Processing',
      description: 'Get your professional-quality 3D collage in approximately 90 seconds. No waiting around, no complicated steps. Just upload and go!',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🎯',
      title: 'Zero Skills Required',
      description: 'Simple drag-and-drop interface that anyone can use. No Photoshop, no design degree, no technical knowledge needed. Create like a pro!',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Why Choose Our AI Collage Generator?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to create professional 3D photo collages — no experience required
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
          Ready to experience the difference?
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
          Start Creating Free
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
