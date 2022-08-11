import { Button, ButtonGroup, Center, Flex } from '@chakra-ui/react';
import { BotList } from '../components/Elements/BotList';
import { Bot } from '../types/bot';

const bots: Bot[] = [
  {
    id: 1,
    name: 'RowBot',
    status: 'ready',
  },
  {
    id: 2,
    name: 'LowBot',
    status: 'ready',
  },
  {
    id: 3,
    name: 'BehBot',
    status: 'ready',
  },
];

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
      <BotList bots={bots} />
      <ButtonGroup>
        <Button>Add random</Button>
        <Button>Run all</Button>
      </ButtonGroup>
    </Flex>
  );
};
