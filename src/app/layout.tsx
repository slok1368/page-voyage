import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavigationBar from '@/components/NavigationBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Provider from './context/client-provider';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

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
        <Provider session={session}>
          <NavigationBar />
          <div className='mx-auto w-11/12 sm:w-8/12'>{children}</div>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
