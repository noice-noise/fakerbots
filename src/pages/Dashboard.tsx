import { Button, ButtonGroup, Center, Flex } from '@chakra-ui/react';
import { BotList } from '../features/bot/components/BotList';

export const Dashboard = () => {
  return (
    <Flex
      direction={'column'}
      gap={5}
      as={Center}
      h={'100vh'}
      w={'100vw'}
      overflowY={'hidden'}
      inset={0}
      justify='center'
      align='center'
    >
      <BotList />
    </Flex>
  );
};
