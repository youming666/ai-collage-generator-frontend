import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gradient-to-b from-white to-gray-50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">About AI Collage Generator</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Our AI-powered tool helps creators, businesses, and individuals design professional 3D photo collages in seconds.
              Perfect for Instagram grid posts, Facebook stories, TikTok videos, and more.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">Free & No Sign-up Required</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Our Tools</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <span>• </span> AI Collage Generator
                </Link>
              </li>
              <li>
                <Link href="/split" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2">
                  <span>• </span> Grid Photo Split Tool
                </Link>
              </li>
              <li>
                <span className="text-gray-400 flex items-center gap-2">
                  <span>• </span> More tools coming soon...
                </span>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Popular Uses</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Social Media Posts</li>
              <li>• Instagram Grid Layout</li>
              <li>• Travel Photo Collage</li>
              <li>• Product Showcase</li>
              <li>• Birthday & Wedding Collages</li>
              <li>• TikTok & Facebook Stories</li>
            </ul>
          </div>

          {/* Keywords (SEO) */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4 text-lg">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {[
                '3D photo collage',
                'AI background removal',
                'Instagram grid maker',
                'photo grid tool',
                'social media collage',
                'free collage maker',
                '9 grid photo',
                'TikTok collage',
              ].map((keyword, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-600 text-sm">
                © 2025 AI Collage Generator. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built for creators, by creators. Made with ❤️ for the creative community.
              </p>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>

        {/* Additional SEO Content */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <div className="text-xs text-gray-500 leading-relaxed">
            <p className="mb-2">
              <strong className="text-gray-700">AI Collage Generator</strong> is a free online tool that helps you create stunning 3D photo collages
              with AI-powered background removal. Perfect for creating Instagram grid posts, TikTok videos, Facebook stories, and other social media content.
              Our advanced AI technology automatically removes backgrounds from your photos in seconds, creating professional-looking collages with a beautiful
              3D pop-out effect. No Photoshop or design skills needed — just upload your photos and let our AI do the work. Generate up to 5 free collages per day,
              with unlimited parameter adjustments to get the perfect look for your social media posts.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
