import Image from 'next/image';

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Upload Your Memories',
      description: 'Select up to 9 photos to create your background grid. Drag to reorder them perfectly.',
      icon: '📸',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      number: 2,
      title: 'Add Your Main Subject',
      description: 'Upload your main photo — a person, product, or any object you want to highlight.',
       icon: '🎯',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      number: 3,
      title: 'AI Works Its Magic',
      description: 'Our AI automatically removes the background in ~90 seconds. No manual editing needed!',
      icon: '✨',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      number: 4,
      title: 'Customize & Download',
      description: 'Fine-tune position, scale, and download your professional 3D collage in HD quality.',
      icon: '🎨',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create your perfect 3D collage in 4 simple steps — no design experience needed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border-2 border-gray-100 p-6 hover:shadow-xl transition-all hover:scale-105 relative"
          >
            {/* Step Number Badge */}
            <div className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
              {step.number}
            </div>

            {/* Icon */}
            <div className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 border ${step.borderColor}`}>
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

      {/* Visual Demo Image */}
      <div className="mt-16 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            See It In Action
          </h3>
          <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/examples/how-it-works.jpg"
              alt="How to use AI Collage Generator - Step by step visual guide"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="text-center text-gray-600 mt-6 text-sm">
            Upload grid photos → Upload main photo → AI removes background → Adjust & download
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-10 text-center">
        <p className="text-gray-500 text-sm">
          ⏱️ Total time: <span className="font-semibold text-gray-700">2-3 minutes from upload to download</span>
        </p>
      </div>
    </section>
  );
}
