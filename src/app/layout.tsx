import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavigationBar from '@/components/NavigationBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Page Voyage',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} items-top flex h-screen flex-col`}>
        <NavigationBar />
        <div className='mx-auto w-8/12'>{children}</div>
      </body>
    </html>
  );
}
