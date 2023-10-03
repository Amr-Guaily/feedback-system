import './globals.css';

import { AuthProvider } from '@/context/auth-api';
import Providers from '@/styles/chakra-providers';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Feedback System',
  description: 'The easiest way to add reviews and comments to your static site.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
