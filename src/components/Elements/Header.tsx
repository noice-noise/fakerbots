import {
  Box,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { TbUserCircle } from 'react-icons/tb';
import { Register } from '../../features/auth/components/Register';
import { AuthContext } from '../../providers/AuthProvider';

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Box
        backdropFilter='auto'
        backdropBlur='8px'
        position='fixed'
        top={0}
        left={0}
        w='full'
        zIndex={2}
      >
        <Flex
          justify='center'
          align='center'
          borderBottomWidth='1px'
          w='full'
          h={16}
          px={5}
        >
          <IconButton
            aria-label='Edit User'
            icon={<TbUserCircle size='sm' />}
            boxSize={12}
            rounded='full'
            onClick={onOpen}
            variant='ghost'
            p={3}
          />
          <Spacer />
          <Heading size='md'>{user.name}</Heading>
          <Spacer />
        </Flex>
      </Box>
      <Register isOpen={isOpen} onClose={onClose} />
    </>
  );
};
