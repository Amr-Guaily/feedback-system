'use client';

import { Button } from '@chakra-ui/react';
const DashboardButton = () => {
  return (
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
  );
};

export default DashboardButton;
