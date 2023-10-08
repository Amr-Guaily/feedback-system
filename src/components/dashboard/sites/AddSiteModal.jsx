'use client';

import { useRef } from 'react';
import { useToast } from '@chakra-ui/react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';

import { db } from '@/lib/firebase';
import { collection, where, getDocs, query } from 'firebase/firestore';
import addSite from '@/actions/addSite';

const AddSiteModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef(null);

  async function checkSite(url) {
    const q = query(collection(db, 'sites'), where('url', '==', url));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  }

  async function submitHandler(formData) {
    const isExistUrl = await checkSite(formData.get('url'));

    if (isExistUrl) {
      toast({
        description: 'Site Link is already exist..',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    await addSite(formData);
    onClose();
  }

  return (
    <>
      <Button
        bg="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
        onClick={onOpen}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent action={submitHandler} as="form">
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                required
                placeholder="My site"
                name="name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input required placeholder="https://website.com" name="url" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button
              type="submit"
              bg="#4070f4"
              color="white"
              fontWeight="medium"
              _hover={{ bg: '#4070f4', opacity: 0.9 }}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
