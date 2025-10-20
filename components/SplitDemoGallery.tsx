import Image from 'next/image';

export default function SplitDemoGallery() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          See How It Works
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload one image, get perfectly split grids ready for Instagram carousel posts
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* 2x2 Demo */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold text-green-700 shadow-sm">
              📐 4-Grid (2×2) Split
            </span>
          </div>
          <div className="relative aspect-video bg-gray-50">
            <Image
              src="/examples/split-demo-2x2.jpg"
              alt="2x2 Grid Split Demo - Split one image into 4 perfect squares"
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Perfect for 4-Post Carousels</h3>
            <p className="text-sm text-gray-600">
              Split landscape or square photos into 4 equal parts. Great for panoramic scenes
              and creating engaging Instagram feeds.
            </p>
          </div>
        </div>

        {/* 3x3 Demo */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-semibold text-blue-700 shadow-sm">
              🎯 9-Grid (3×3) Split
            </span>
          </div>
          <div className="relative aspect-video bg-gray-50">
            <Image
              src="/examples/split-demo-3x3.jpg"
              alt="3x3 Grid Split Demo - Split one image into 9 perfect squares"
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-6 bg-gray-50">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Classic 9-Post Grid Layout</h3>
            <p className="text-sm text-gray-600">
              Create stunning 9-grid layouts that span across 3 rows on your Instagram profile.
              Perfect for showcasing detailed photos.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-sm font-semibold text-gray-900">Instant Split</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">🎨</div>
          <div className="text-sm font-semibold text-gray-900">Custom Gaps</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">📱</div>
          <div className="text-sm font-semibold text-gray-900">Mobile Ready</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl border border-gray-200">
          <div className="text-3xl mb-2">💾</div>
          <div className="text-sm font-semibold text-gray-900">Batch Download</div>
        </div>
      </div>
    </section>
  );
}
