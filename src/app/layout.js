import './globals.css';

import { AuthProvider } from '@/context/auth-api';
import Providers from '@/styles/chakra-providers';

import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

import { Box, Flex } from '@chakra-ui/react';
export const metadata = {
  title: 'Feedback System',
  description: 'The easiest way to add reviews and comments to your static site.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Flex as="body" flexDirection="column" minH="100vh" className={inter.className} suppressHydrationWarning>
        <Box h="6px" bg={'#4070f4'} />

        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </Flex>
    </html>
  );
}
