import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext, AuthUser } from '../../providers/AuthProvider';

type RegisterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Register = ({ isOpen, onClose }: RegisterProps) => {
  const { register } = useContext(AuthContext);
  const [user, setUser] = useState<AuthUser>({
    name: '',
    auth: false,
  });

  const handleClick = () => {
    register(user);
    onClose();
  };

  return (
    <Box as={Center}>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Register</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex
              maxW={80}
              h='100%'
              direction='column'
              justifyContent='center'
              alignItems='stretch'
              gap='3'
            >
              <Input
                placeholder='name'
                name='name'
                textAlign='center'
                value={user.name}
                onChange={(e) =>
                  setUser((curreUser) => ({
                    ...curreUser,
                    name: e.target.value,
                  }))
                }
              />
              <Button onClick={handleClick}>register</Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
