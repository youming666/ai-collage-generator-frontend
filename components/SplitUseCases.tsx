export default function SplitUseCases() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Perfect For Instagram & Beyond
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create stunning grid layouts that grab attention and boost engagement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Use Case 1 */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-pink-100">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <span className="text-3xl">📸</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Instagram Carousel Posts</h3>
          <p className="text-gray-700 mb-4">
            Split panoramic photos into carousel posts that users can swipe through.
            Perfect for landscapes, cityscapes, and group photos.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Increase swipe-through rate
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Show more detail
            </li>
          </ul>
        </div>

        {/* Use Case 2 */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <span className="text-3xl">🎨</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Profile Grid Layouts</h3>
          <p className="text-gray-700 mb-4">
            Create eye-catching 9-grid layouts that span 3 rows on your Instagram profile.
            Perfect for product showcases and announcements.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Stand out on profile view
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Professional aesthetic
            </li>
          </ul>
        </div>

        {/* Use Case 3 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-100">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <span className="text-3xl">🛍️</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Product Showcases</h3>
          <p className="text-gray-700 mb-4">
            Split product photos to show different angles, features, and details.
            Great for e-commerce and brand marketing.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Highlight product details
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Drive more sales
            </li>
          </ul>
        </div>
      </div>

      {/* Additional Examples */}
      <div className="mt-12">
        <p className="text-center text-gray-600 mb-6 font-medium">Also great for:</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: '🏞️', label: 'Travel Photos' },
            { icon: '🎭', label: 'Event Coverage' },
            { icon: '🍽️', label: 'Food Photography' },
            { icon: '💍', label: 'Wedding Albums' },
            { icon: '🏢', label: 'Real Estate' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm font-semibold text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
