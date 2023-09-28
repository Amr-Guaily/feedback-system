'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Inter } from 'next/font/google';
import theme from './theme';

const inter = Inter({ subsets: ['latin'] });

export default function Providers({ children }) {
    return (
        <>
            <style jsx global>
                {`
                    :root {
                        --font-inter: ${inter.style.fontFamily}
                    }
                `}
            </style>

            <CacheProvider>
                <ChakraProvider theme={theme}>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </>
    );
}