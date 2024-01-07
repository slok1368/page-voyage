import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavigationBar from '@/components/NavigationBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Provider from './context/client-provider';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { getServerSession } from 'next-auth/next';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Page Voyage',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body
        className={`${inter.className} items-top flex w-screen flex-col pb-10`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Provider session={session}>
            <NavigationBar />
            <div className='w-screen'>{children}</div>
            <ToastContainer />
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
