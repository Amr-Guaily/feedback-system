'use client';

import { useState, useRef } from 'react';
import {
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from '@chakra-ui/react';

import deleteSite from '@/actions/deleteSite';

const DeleteSiteButton = ({ siteId }) => {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();
  const toast = useToast();

  const onClose = () => setIsOpen(false);

  async function handleRemoveSite() {
    const isSuccess = await deleteSite(siteId);

    if (!isSuccess) {
      toast({
        description: 'Something went wrong, please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <IconButton
        aria-label="Delete site"
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
              fill="currentColor"
            />
            <path d="M9 9H11V17H9V9Z" fill="currentColor" />
            <path d="M13 9H15V17H13V9Z" fill="currentColor" />
          </svg>
        }
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Site
          </AlertDialogHeader>
          <AlertDialogBody>
            Are you sure? This will also delete all feedback left on the site.
            You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              bg="red.500"
              color="white"
              _hover={{ bg: 'red.500', opacity: 0.9 }}
              ml={3}
              onClick={() => handleRemoveSite()}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteSiteButton;
