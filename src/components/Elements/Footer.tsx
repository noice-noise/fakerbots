import { Flex, Link, Spacer, Text } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Flex
      position='fixed'
      bottom={0}
      left={0}
      borderTopWidth='1px'
      w='full'
      h={16}
      px={5}
      align='center'
      justify='center'
    >
      <Text>WIP 0.1.0</Text>
      <Spacer />
      <Link
        textDecoration='underline'
        href='https://github.com/noice-noise/fakerbots'
        isExternal
      >
        Github
      </Link>
    </Flex>
  );
};
