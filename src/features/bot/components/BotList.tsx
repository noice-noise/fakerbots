import { Box, ButtonGroup, Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useReducer, useState } from 'react';
import { TbAtom2, TbRobot, TbRotateClockwise2 } from 'react-icons/tb';
import { generateRandomBot } from '../../../utils/data-generators';
import { parentVariants } from '../animations';
import { Bot } from '../types';
import { Action, BotCard } from './BotCard';

export enum BotListAction {
  ADD_BOT,
  BOT_UPDATED,
  RUN_ALL,
  HOLD_ALL,
  OVERRIDE_ALL,
  RESET_ALL,
}

export type BotListActionType =
  | { type: BotListAction.ADD_BOT; payload: Bot }
  | { type: BotListAction.BOT_UPDATED; payload: Bot }
  | { type: BotListAction.OVERRIDE_ALL }
  | { type: BotListAction.RESET_ALL };

export const botListReducer = (
  state: Bot[],
  action: BotListActionType
): Bot[] => {
  switch (action.type) {
    case BotListAction.ADD_BOT:
      return addBots(state, action.payload);
    case BotListAction.RESET_ALL:
      return resetBots(state);
    case BotListAction.BOT_UPDATED:
      return updateBots(state, action.payload);
    default:
      throw new Error('Invalid action type');
  }
};

const addBots = (state: Bot[], bot: Bot): Bot[] => {
  const updatedBots = [...state, bot];
  return updatedBots;
};

const updateBots = (state: Bot[], bot: Bot): Bot[] => {
  const updatedBots = state.map((currentBot) =>
    currentBot.id === bot.id ? bot : currentBot
  );

  return updatedBots;
};

const resetBots = (state: Bot[]): Bot[] => {
  const resetBots = state.map((currentBot) => ({
    ...currentBot,
    currentStateIndex: 0,
    currentState: currentBot.states[0],
  }));

  return resetBots;
};

export const initialBots: Bot[] = [
  generateRandomBot(),
  generateRandomBot(),
  generateRandomBot(),
  generateRandomBot(),
  generateRandomBot(),
  generateRandomBot(),
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
      justify='start'
      align='center'
      w='full'
      h='full'
      mx='auto'
    >
      <Flex
        gap={4}
        flexWrap='wrap'
        maxW='90vw'
        justify='center'
        align='center'
        as={motion.div}
        variants={parentVariants}
        initial='initial'
        animate='animate'
        exit='exit'
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
          w='full'
          h={16}
          align='center'
          justify='center'
          isAttached
        >
          <Tooltip
            rounded='full'
            px={3}
            label='Override Bot States'
            aria-label='Override Bot States'
          >
            <IconButton
              aria-label='Override Bot States'
              icon={<TbAtom2 size={'md'} />}
              borderRadius='10rem'
              rounded='full'
              size='lg'
              boxSize={14}
              p={3}
              onClick={() => {
                setAction({ type: BotListAction.OVERRIDE_ALL });
              }}
            />
          </Tooltip>
          <Tooltip
            rounded='full'
            label='Add Random Bot'
            px={3}
            aria-label='Add Random Bot'
          >
            <IconButton
              aria-label='Add Random Bot'
              icon={<TbRobot size={'md'} />}
              borderRadius='10rem'
              rounded='full'
              size='lg'
              boxSize={14}
              p={3}
              onClick={() => {
                const bot = generateRandomBot();
                dispatch({ type: BotListAction.ADD_BOT, payload: bot });
              }}
            />
          </Tooltip>
          <Tooltip
            rounded='full'
            label='Reset Bot States'
            px={3}
            aria-label='Reset Bot States'
          >
            <IconButton
              aria-label='Reset Bot States'
              icon={<TbRotateClockwise2 size={'md'} />}
              borderRadius='10rem'
              rounded='full'
              size='lg'
              boxSize={14}
              p={3}
              onClick={() => {
                dispatch({ type: BotListAction.RESET_ALL });
                setAction({ type: BotListAction.RESET_ALL });
              }}
            />
          </Tooltip>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};
