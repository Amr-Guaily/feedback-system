'use client';

import { useAuthData } from '@/context/auth-api';
import { useAuthAPI } from '@/context/auth-api';
import { Button, Text, Flex } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon } from '../../styles/icons';
import DashboardButton from './DashboardButton';

const LoginButtons = () => {
  const { user, loading } = useAuthData();
  const { loginWithGithub, loginWithGoogle } = useAuthAPI();

  return (
    <>
      {!user ? (
        <Flex
          flexDirection={{ base: 'column', sm: 'row' }}
          gap={3}
          alignItems="center"
        >
          <Button
            isDisabled={loading}
            bg="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)',
            }}
            onClick={loginWithGithub}
          >
            <GithubIcon />
            <Text ml="6px">Continue With Github</Text>
          </Button>
          <Button
            isDisabled={loading}
            bg="white"
            color="gray.900"
            variant="outline"
            fontWeight="medium"
            _hover={{ bg: 'gray.100' }}
            _active={{
              bg: 'gray.100',
              transform: 'scale(0.95)',
            }}
            onClick={loginWithGoogle}
          >
            <GoogleIcon />
            <Text ml="6px">Continue With Google</Text>
          </Button>
        </Flex>
      ) : (
        <DashboardButton />
      )}
    </>
  );
};

export default LoginButtons;
