export default function SplitHowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Upload Image',
      description: 'Choose any photo you want to split — landscape, portrait, or square.',
      icon: '📤',
      color: 'from-green-500 to-teal-500',
    },
    {
      number: 2,
      title: 'Select Grid Size',
      description: 'Choose 4-grid (2×2) for carousel posts or 9-grid (3×3) for profile layouts.',
      icon: '⚙️',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 3,
      title: 'Adjust Gap',
      description: 'Customize the spacing between grid cells from 0px to 50px.',
      icon: '📏',
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: 4,
      title: 'Download All',
      description: 'Download all split images at once or individually — ready to post!',
      icon: '⬇️',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          How to Split Your Photos
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Split any image into perfect grids in 4 simple steps
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          ⏱️ Total time: <span className="font-semibold text-gray-700">Less than 10 seconds</span>
        </p>
      </div>
    </section>
  );
}
