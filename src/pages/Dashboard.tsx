import { Button, ButtonGroup, Center, Flex } from '@chakra-ui/react';
import { BotList } from '../features/bot/components/BotList';

export const Dashboard = () => {
  return (
    <Flex
      direction={'column'}
      gap={5}
      as={Center}
      mt={20}
      mb={32}
      minH={'100vh'}
      w={'100vw'}
      inset={0}
      justify='start'
      align='start'
    >
      <BotList />
    </Flex>
  );
};
