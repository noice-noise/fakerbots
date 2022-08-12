import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import {
  generateRandomState,
  generateRandomStates,
} from '../../../utils/data-generators';
import { Bot } from '../types';
import { BotCard } from './BotCard';

const initialBots: Bot[] = [
  {
    id: 1,
    name: 'RowBot',
    currentStateIndex: 0,
    currentState: generateRandomState(),
    states: generateRandomStates(),
  },
  {
    id: 287,
    name: 'LowBot',
    currentStateIndex: 0,
    currentState: generateRandomState(),
    states: generateRandomStates(),
  },
  {
    id: 123,
    name: 'DiscordBot',
    currentStateIndex: 0,
    currentState: generateRandomState(),
    states: generateRandomStates(),
  },
  {
    id: 354,
    name: 'BeBot',
    currentStateIndex: 0,
    currentState: generateRandomState(),
    states: generateRandomStates(),
  },
  {
    id: 312,
    name: 'GinaBot',
    currentStateIndex: 0,
    currentState: generateRandomState(),
    states: generateRandomStates(),
  },
  {
    id: 2489,
    name: 'KilaBot',
    currentStateIndex: 0,
    currentState: generateRandomState(),
    states: generateRandomStates(),
  },
];

export const BotList = () => {
  const [bots, setBots] = useState<Bot[]>(initialBots);

  return (
    <Flex
      gap={3}
      flexWrap='wrap'
      maxW='container.xl'
      justify='center'
      align='center'
    >
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} />
      ))}
    </Flex>
  );
};
