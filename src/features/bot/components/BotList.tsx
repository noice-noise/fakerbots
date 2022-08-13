import { Box, Button, ButtonGroup, Flex } from '@chakra-ui/react';
import { useReducer, useState } from 'react';
import {
  generateRandomInitialState,
  generateRandomStates,
} from '../../../utils/data-generators';
import { Bot } from '../types';
import { Action, BotCard } from './BotCard';

export enum BotListAction {
  BOT_UPDATED,
  RUN_ALL,
  HOLD_ALL,
  OVERRIDE_ALL,
  RESET_ALL,
}

export type BotListActionType =
  | { type: BotListAction.BOT_UPDATED; payload: Bot }
  | { type: BotListAction.OVERRIDE_ALL }
  | { type: BotListAction.RESET_ALL };

export const botListReducer = (
  state: Bot[],
  action: BotListActionType
): Bot[] => {
  switch (action.type) {
    case BotListAction.RESET_ALL:
      return initialBots;
    case BotListAction.BOT_UPDATED:
      return updateBots(action.payload, state);
    default:
      throw new Error('Invalid action type');
  }
};

const updateBots = (bot: Bot, state: Bot[]): Bot[] => {
  const updatedBots = state.map((currentBot) =>
    currentBot.id === bot.id ? bot : currentBot
  );

  return updatedBots;
};

export const initialBots: Bot[] = [
  {
    id: new Date().getTime(),
    name: 'RowBot',
    currentStateIndex: 0,
    currentState: generateRandomInitialState(),
    states: generateRandomStates(),
  },
  {
    id: new Date().getTime(),
    name: 'LowBot',
    currentStateIndex: 0,
    currentState: generateRandomInitialState(),
    states: generateRandomStates(),
  },
  {
    id: new Date().getTime(),
    name: 'AmBot',
    currentStateIndex: 0,
    currentState: generateRandomInitialState(),
    states: generateRandomStates(),
  },
  {
    id: new Date().getTime(),
    name: 'BeBot',
    currentStateIndex: 0,
    currentState: generateRandomInitialState(),
    states: generateRandomStates(),
  },
  {
    id: new Date().getTime(),
    name: 'GinaBot',
    currentStateIndex: 0,
    currentState: generateRandomInitialState(),
    states: generateRandomStates(),
  },
  {
    id: new Date().getTime(),
    name: 'KilaBot',
    currentStateIndex: 0,
    currentState: generateRandomInitialState(),
    states: generateRandomStates(),
  },
];

export const BotList = () => {
  const [bots, dispatch] = useReducer(botListReducer, initialBots);

  // Note: I don't want to use redux for this simple project, so I used this workaround to broadcast higher level redux-like actions XD
  const [action, setAction] = useState<Action | null>(null);

  const handleUpdate = (bot: Bot): void => {
    dispatch({ type: BotListAction.BOT_UPDATED, payload: bot });
  };

  return (
    <Flex
      direction='column'
      justify='center'
      align='center'
      w='full'
      h='full'
      mx='auto'
    >
      <Flex
        gap={3}
        flexWrap='wrap'
        maxW='container.xl'
        justify='center'
        align='center'
      >
        {bots.map((bot) => (
          <BotCard
            key={bot.id}
            bot={bot}
            action={action}
            onUpdate={handleUpdate}
          />
        ))}
      </Flex>

      <Box
        backdropFilter='auto'
        backdropBlur='8px'
        position='fixed'
        bottom={0}
        left={0}
        w='full'
        py={2}
        zIndex={2}
        borderTopWidth='1px'
      >
        <ButtonGroup
          as={Flex}
          mx='auto'
          w='full'
          h={16}
          px={5}
          align='center'
          justify='center'
        >
          <Button
            minW={32}
            px={5}
            py={6}
            onClick={() => {
              setAction({ type: BotListAction.OVERRIDE_ALL });
            }}
          >
            Override all
          </Button>
          <Button
            minW={32}
            px={5}
            py={6}
            onClick={() => {
              dispatch({ type: BotListAction.RESET_ALL });
              setAction({ type: BotListAction.RESET_ALL });
            }}
          >
            Reset all
          </Button>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
