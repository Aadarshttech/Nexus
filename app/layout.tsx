import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: 'NEXUS | Interactive 3D Component Hub | Aadarsh Pandit',
  description: 'A dark futuristic interactive 3D showcase built with Spline, Next.js, and Framer Motion. Explore cutting-edge web components and immersive design.',
  keywords: ['3D Web Experience', 'Spline 3D', 'Interactive Design', 'Creative Showcase', 'Dark Futuristic UI', 'Next.js', 'Framer Motion', 'WebGL', 'Aadarsh Pandit Portfolio'],
  authors: [{ name: 'Aadarsh Pandit' }],
  creator: 'Aadarsh Pandit',
  publisher: 'Aadarsh Pandit',
  openGraph: {
    title: 'NEXUS | Interactive 3D Component Hub',
    description: 'A dark futuristic interactive 3D showcase built with Spline, Next.js, and Framer Motion.',
    url: 'https://cdn.aadarshapandit.com.np/projects/nexus',
    siteName: 'Aadarsh Pandit Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS | Interactive 3D Component Hub',
    description: 'Explore cutting-edge web components and immersive 3D design.',
    creator: '@aadarshttech',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

