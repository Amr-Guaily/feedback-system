'use client';

import { useAuthData } from '@/context/auth-api';
import { useAuthAPI } from '@/context/auth-api';

import {
  Box,
  Icon,
  Flex,
  Spacer,
  HStack,
  Text,
  Avatar,
} from '@chakra-ui/react';

import Link from 'next/link';
import Navlink from './NavLink';

const Navbar = () => {
  const { user } = useAuthData();
  const { signout } = useAuthAPI();

  return (
    <Box as="header">
      <Flex as="nav" className="container" alignItems="center" gap={10} py={3}>
        <Link href="/">
          <Icon viewBox="0 0 46 32" boxSize={8}>
            <path
              d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
              fill="currentColor"
            />
          </Icon>
        </Link>

        <Flex gap={3}>
          <Navlink href="/sites">Sites</Navlink>
          <Navlink href="#">feedback</Navlink>
        </Flex>
        <Spacer />

        <HStack>
          <Text cursor="pointer" onClick={signout} mr="8px">
            Logout
          </Text>
          <Link href="#">
            <Avatar size="sm" name={user?.name} src={user?.photoUrl} />
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
