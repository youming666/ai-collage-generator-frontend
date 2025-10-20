import Footer from '@/components/Footer';
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About AI Collage Generator</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 mb-4">
              AI Collage Generator is a free online tool that helps you create stunning 3D photo collages
              with the power of artificial intelligence. Our platform combines advanced image processing
              with an intuitive interface to make professional-quality collages accessible to everyone.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 mb-4">
              Simply upload your images and let our AI do the magic:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Upload 9 grid images to create a beautiful background</li>
              <li>Upload 1 main image that will be the focus of your collage</li>
              <li>Our AI removes the background from your main image</li>
              <li>Adjust parameters like scale, position, blur, and brightness</li>
              <li>Download your stunning 3D collage in high quality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              We believe that everyone should have access to professional-grade photo editing tools.
              Our mission is to democratize creative content creation by providing free, easy-to-use
              AI-powered tools that produce exceptional results.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology</h2>
            <p className="text-gray-600 mb-4">
              Our platform leverages cutting-edge AI technology for background removal and advanced
              image processing algorithms to create depth and visual interest. All processing is done
              securely, and we don't store your images on our servers.
            </p>
          </section>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </main>
  );
}
