import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AppProvider } from '@/lib/context/AppContext';
import { ComingSoonProvider } from '@/components/ui/ComingSoonModal';

export const metadata: Metadata = {
  title: 'Image Tools — Free Fast Private Online Image Utilities',
  description: 'Fast, private, free online image tools - compress, resize, convert, and crop images directly in your browser with zero server uploads.',
  openGraph: {
    title: 'Image Tools — Free Fast Private Online Image Utilities',
    description: 'Fast, private, free online image tools - compress, resize, convert, and crop images directly in your browser with zero server uploads.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Tools — Free Fast Private Online Image Utilities',
    description: 'Fast, private, free online image tools - compress, resize, convert, and crop images directly in your browser with zero server uploads.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('imagetools_theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
                const lang = localStorage.getItem('imagetools_lang') || 'ar';
                document.documentElement.setAttribute('lang', lang);
                document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-blue-100 selection:text-blue-900 selection:dark:bg-blue-900 selection:dark:text-blue-100 transition-colors">
        <AppProvider>
          <ComingSoonProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ComingSoonProvider>
        </AppProvider>
      </body>
    </html>
  );
}

