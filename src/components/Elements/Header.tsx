import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Register } from '../../features/auth/components/Register';

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
          <Button onClick={onOpen} variant='ghost' px='0'>
            👋
          </Button>
          <Spacer />
          <Heading size='md'>{user.name}</Heading>
          <Spacer />
          <Button variant='ghost' px='0'>
            🛒
          </Button>
        </Flex>
      </Box>
      <Register isOpen={isOpen} onClose={onClose} />
    </>
  );
};
