import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: {
    default: 'OneKit - Your Daily Tools, All in One Place',
    template: '%s | OneKit',
  },
  description: 'A beautiful, 100% free collection of online tools that work entirely in your browser. Compress images, convert units, format code, and much more. Fast, secure, and easy to use.',
  metadataBase: new URL('https://onekit.dev'), // Replace with actual domain
  openGraph: {
    title: 'OneKit - Your Daily Tools, All in One Place',
    description: 'A beautiful, 100% free collection of online tools that work entirely in your browser.',
    url: 'https://onekit.dev', // Replace with actual domain
    siteName: 'OneKit',
    images: [
      {
        url: '/og-image.png', // Create and add an OG image to the /public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
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
  twitter: {
    card: 'summary_large_image',
    title: 'OneKit - Your Daily Tools, All in One Place',
    description: 'A beautiful, 100% free collection of online tools that work entirely in your browser.',
    // images: ['/og-image.png'], // Create and add an OG image
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
          "font-body antialiased",
          "min-h-screen bg-background font-sans"
        )}>
        <div className="relative flex min-h-dvh flex-col bg-background">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
