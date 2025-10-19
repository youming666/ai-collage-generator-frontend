export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-500 mb-8">Last Updated: October 19, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-600 mb-4">
              AI Collage Generator is committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, and safeguard your information when you use our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Images You Upload</h3>
            <p className="text-gray-600 mb-4">
              When you use our service, you upload images for processing. These images are processed
              to create your collage and are not permanently stored on our servers. Images are
              temporarily cached during processing and automatically deleted after the session ends.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-2">Usage Information</h3>
            <p className="text-gray-600 mb-4">
              We may collect anonymous usage statistics including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and features used</li>
              <li>Time and date of visits</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Provide and improve our services</li>
              <li>Process your images to create collages</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Detect and prevent technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Image Storage and Processing</h2>
            <p className="text-gray-600 mb-4">
              Your images are processed using client-side technology and server-side APIs. Images
              sent to our servers for AI processing are:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Processed immediately upon receipt</li>
              <li>Not stored permanently on our servers</li>
              <li>Automatically deleted after processing completes</li>
              <li>Not used for training AI models</li>
              <li>Not shared with third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-600 mb-4">
              We may use cookies and similar tracking technologies to enhance your experience.
              These may include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Essential cookies for service functionality</li>
              <li>Analytics cookies to understand usage patterns</li>
              <li>Advertising cookies from third-party ad networks</li>
            </ul>
            <p className="text-gray-600 mb-4">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 mb-4">
              We may use third-party services including:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Google AdSense for advertising</li>
              <li>Analytics services to understand usage</li>
              <li>AI service providers for background removal</li>
            </ul>
            <p className="text-gray-600 mb-4">
              These services have their own privacy policies governing their use of your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement reasonable security measures to protect your information. However, no
              method of transmission over the internet is 100% secure. We cannot guarantee absolute
              security of your data.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>Access the information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-600 mb-4">
              Our service is not intended for children under 13 years of age. We do not knowingly
              collect personal information from children under 13. If you believe we have collected
              information from a child under 13, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600">
              <a href="mailto:ahyouming001@2925.com" className="text-blue-600 hover:text-blue-700">
                ahyouming001@2925.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
