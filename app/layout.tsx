import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import { LanguageProvider } from '@/contexts/LanguageContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-collage-generator-frontend.vercel.app'),
  title: 'AI Collage Generator | Free 3D Photo Grid Maker with AI Background Removal',
  description: 'Create stunning 3D photo collages with AI-powered background removal in 90 seconds. Free online grid photo maker perfect for Instagram, TikTok & Facebook. No sign-up required. Generate 5 collages daily.',
  keywords: 'ai collage generator, 3d photo collage, grid photo maker, ai background remover, instagram grid maker, photo split tool, 9 grid photo, free collage maker, social media collage, tiktok collage, facebook photo grid',
  authors: [{ name: 'AI Collage Generator Team' }],
  openGraph: {
    title: 'AI Collage Generator - Create 3D Photo Collages in 90 Seconds',
    description: 'Transform your photos into stunning 3D collages with AI background removal. Perfect for social media. 100% free, no sign-up required.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AI Collage Generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Collage Generator - 3D Photo Grid Maker',
    description: 'Create stunning 3D photo collages for social media with AI background removal. Free online tool with 5 daily generations.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9678673801172605"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <GoogleAnalytics />
          <MicrosoftClarity />
          <Navigation />
          <div className="pt-16">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
