import { Button, Flex, Heading, Spacer, useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { Register } from '../../features/auth/components/Register';

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);

  return (
    <>
      <Flex
        justify='center'
        align='center'
        position='fixed'
        top={0}
        left={0}
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
      <Register isOpen={isOpen} onClose={onClose} />
    </>
  );
};
