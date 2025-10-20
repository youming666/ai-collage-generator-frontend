import Footer from '@/components/Footer';
export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <p className="text-gray-600 mb-6">
            We'd love to hear from you! Whether you have questions, feedback, or need support,
            feel free to reach out to us.
          </p>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Email</h2>
              <a
                href="mailto:ahyouming001@2925.com"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                ahyouming001@2925.com
              </a>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Response Time</h2>
              <p className="text-gray-600">
                We typically respond to all inquiries within 24-48 hours during business days.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">What to Include</h2>
              <p className="text-gray-600 mb-2">
                When contacting us, please include:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>A clear description of your question or issue</li>
                <li>Screenshots if applicable</li>
                <li>Your browser and device information</li>
                <li>Any error messages you received</li>
              </ul>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Is the service free?</h3>
                  <p className="text-gray-600">Yes, AI Collage Generator is completely free to use.</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Do you store my images?</h3>
                  <p className="text-gray-600">
                    No, all processing is done in your browser or temporarily on our servers.
                    We do not permanently store your images.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">What image formats are supported?</h3>
                  <p className="text-gray-600">
                    We support all common image formats including JPG, PNG, and WebP.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </main>
  );
}
