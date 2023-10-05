'use client';

import { Flex, Heading, Text } from '@chakra-ui/react';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => {
  return (
    <Flex
      bg="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
      gap={2}
    >
      <Heading size="lg">You haven’t added any sites.</Heading>
      <Text mb={4}>Let’s get started.</Text>
      <AddSiteModal>Add Your First Site</AddSiteModal>
    </Flex>
  );
};

export default EmptyState;
