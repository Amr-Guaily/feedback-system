'use client';

import { useAuthData } from '@/context/auth-api';
import { useAuthAPI } from '@/context/auth-api';
import { Button, Text, Flex } from '@chakra-ui/react';
import { GithubIcon, GoogleIcon } from '../styles/icons.js';

const LoginButtons = () => {
  const { user } = useAuthData();

  console.log(user);
  const { loginWithGithub, loginWithGoogle } = useAuthAPI();

  return (
    <>
      {!user ? (
        <Flex gap={2} alignItems="center" mt={10}>
          <Button
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
        <Text>Hello: {user.name}</Text>
      )}
    </>
  );
};

export default LoginButtons;
