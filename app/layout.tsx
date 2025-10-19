import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import MicrosoftClarity from '@/components/MicrosoftClarity';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Collage Generator | 3D Grid Photo Maker & Photo Split Tool - Free Online',
  description: 'Create stunning 3D photo collages and grid layouts for social media. Free AI-powered collage generator with background removal. Split photos into 4-grid or 9-grid instantly for Instagram, Facebook, and more.',
  keywords: 'ai collage generator, grid photo maker, photo split tool, 9 grid photo, 4 grid photo, 3d photo collage, instagram grid maker, photo grid generator, ai background remover, social media collage maker, free collage generator, grid photo split, photo splitter, collage maker online',
  authors: [{ name: 'AI Collage Generator Team' }],
  openGraph: {
    title: 'AI Collage Generator - Create 3D Photo Grids for Social Media',
    description: 'Design stylish 3D photo grids and split images into perfect grids for Instagram, Facebook, and more. AI-powered background removal included. 100% free online tool.',
    type: 'website',
    locale: 'en_US',
    siteName: 'AI Collage Generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Collage Generator - 3D Grid Photo Maker & Photo Split Tool',
    description: 'Create stunning 3D photo collages for social media with AI background removal. Free online grid photo maker.',
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
        <GoogleAnalytics />
        <MicrosoftClarity />
        <Navigation />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
