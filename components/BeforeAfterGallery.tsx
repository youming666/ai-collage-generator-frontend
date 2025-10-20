import Image from 'next/image';

export default function BeforeAfterGallery() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          See the Magic in Action
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform ordinary photos into stunning 3D collages with our AI-powered tool
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Example 1 - Flower */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold text-purple-700 shadow-sm">
              ✨ Lavender Field Portrait
            </span>
          </div>
          <div className="relative aspect-[3/4]">
            <Image
              src="/examples/example-flower.jpeg"
              alt="3D Collage Example - Lavender Field"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold text-gray-900">9 grid photos + 1 main photo</span> → Stunning 3D pop-out effect
            </p>
          </div>
        </div>

        {/* Example 2 - Water */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold text-blue-700 shadow-sm">
              🏞️ Waterfall Adventure
            </span>
          </div>
          <div className="relative aspect-[3/4]">
            <Image
              src="/examples/example-water.jpg"
              alt="3D Collage Example - Waterfall"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 bg-gray-50">
            <p className="text-sm text-gray-600 text-center">
              <span className="font-semibold text-gray-900">Travel memories</span> → Professional social media post
            </p>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">🎨</div>
          <div className="text-sm font-semibold text-gray-900">AI Auto Remove BG</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">📐</div>
          <div className="text-sm font-semibold text-gray-900">Perfect 3:4 Ratio</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">⚙️</div>
          <div className="text-sm font-semibold text-gray-900">Real-time Adjust</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">💾</div>
          <div className="text-sm font-semibold text-gray-900">HD Download</div>
        </div>
      </div>
    </section>
  );
}
