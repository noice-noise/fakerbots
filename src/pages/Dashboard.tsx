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
      inset={0}
    >
      <BotList />
      <ButtonGroup>
        <Button>Add random</Button>
        <Button>Run all</Button>
      </ButtonGroup>
    </Flex>
  );
};
