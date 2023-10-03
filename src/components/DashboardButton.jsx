'use client';

import NextLink from 'next/link';
import { Button, Link } from '@chakra-ui/react';
const DashboardButton = () => {
  return (
    <Link as={NextLink} href="/sites">
      <Button
        bg="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        View Dashboard
      </Button>
    </Link>
  );
};

export default DashboardButton;
