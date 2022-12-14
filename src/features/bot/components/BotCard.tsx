import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Progress,
  Spacer,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useReducer, useState } from 'react';
import { TbArrowsRandom, TbAtom2 } from 'react-icons/tb';
import {
  generateRandomInitialState,
  generateRandomStates,
} from '../../../utils/data-generators';
import {
  buttonGroupVariants,
  buttonVariants,
  childrenVariants,
} from '../animations';
import { Bot } from '../types';
import { BotListAction } from './BotList';

enum BotAction {
  UPDATE_STATE,
  PREV_STATE,
  NEXT_STATE,
  OVERRIDE_STATE,
  RESET_STATE,
}

type BotActionType =
  | { type: BotAction.UPDATE_STATE }
  | { type: BotAction.PREV_STATE }
  | { type: BotAction.NEXT_STATE }
  | { type: BotAction.OVERRIDE_STATE; payload: Bot }
  | { type: BotAction.RESET_STATE };

const reducer = (state: Bot, action: BotActionType): Bot => {
  switch (action.type) {
    case BotAction.UPDATE_STATE:
      return getStateUpdates(state);
    case BotAction.NEXT_STATE:
      return getNextState(state);
    case BotAction.OVERRIDE_STATE:
      return action.payload;
    case BotAction.RESET_STATE:
      const resetState = {
        ...state,
        currentStateIndex: 0,
        currentState: generateRandomInitialState(),
        states: generateRandomStates(),
      } as Bot;
      return resetState;
    default:
      throw new Error('Invalid action type.');
  }
};

const getStateUpdates = (bot: Bot): Bot => {
  const currentState = bot.currentState;

  if (currentState.task) {
    if (currentState.task?.currentValue >= currentState.task.targetValue) {
      return getNextState(bot);
    }

    const updatedState = {
      ...bot,
      currentState: {
        ...currentState,
        task: {
          ...currentState.task,
          currentValue:
            currentState.task.currentValue + currentState.task.unitValue,
        },
      },
    };

    return updatedState;
  }

  return bot;
};

const getNextState = (bot: Bot): Bot => {
  // loop to initial state index if last index is reached
  const nextStateIndex =
    bot.currentStateIndex + 1 >= bot.states.length
      ? 0
      : bot.currentStateIndex + 1;

  let updatedBot: Bot = {
    ...bot,
    currentStateIndex: nextStateIndex,
    currentState: bot.states[nextStateIndex],
  };

  return updatedBot;
};

export type Action = {
  type: BotListAction;
};

type BotCardProps = {
  bot: Bot;
  onUpdate: (bot: Bot) => void;
  action: Action | null;
};

export const BotCard = ({ bot, onUpdate, action }: BotCardProps) => {
  const MILLISECONDS_PER_LOOP = 1;
  const [loop, setLoop] = useState<number | null>(null);
  const [state, dispatch] = useReducer(reducer, bot);

  useEffect(() => {
    setTimeout(() => {
      setLoop(new Date().getMilliseconds());
      dispatch({ type: BotAction.UPDATE_STATE });
      handleParentDispatch();
    }, MILLISECONDS_PER_LOOP);
  }, [loop, state]);

  useEffect(() => {
    switch (action?.type) {
      case BotListAction.OVERRIDE_ALL:
        dispatch({ type: BotAction.NEXT_STATE });
        break;
      case BotListAction.RESET_ALL:
        dispatch({ type: BotAction.RESET_STATE });
        break;
    }
  }, [action]);

  const handleParentDispatch = (): void => {
    if (
      state.currentState.task?.currentValue >=
      state.currentState.task.targetValue
    ) {
      onUpdate(state);
    }
  };

  return (
    <Box as={motion.div} variants={childrenVariants}>
      <Flex
        w={80}
        p={4}
        direction='column'
        borderWidth={'1px'}
        rounded={'lg'}
        gap={2}
        as={motion.div}
        variants={childrenVariants}
        initial='initial'
        animate='animate'
        whileHover='hover'
        exit='exit'
      >
        <Flex align='center'>
          <Heading size='sm' fontWeight='bolclsd'>
            {state.name}
          </Heading>
          <Spacer />
          <Tag size='sm'>
            <TagLabel>Bot</TagLabel>
          </Tag>
        </Flex>
        <Divider />
        <Flex justify='space-between'>
          <Text opacity={0.75} fontSize='xs'>
            {state.currentState.message}
          </Text>
          <Badge>{state.currentState.name}</Badge>
        </Flex>
        <Box>
          <Progress
            colorScheme='green'
            value={Number(state.currentState.task.currentValue)}
            max={state.currentState.task.targetValue}
            rounded='lg'
            size='sm'
            isAnimated
            hasStripe
          />
          <Flex justify='space-between' mt={1}>
            <Text fontSize='xs'>{state.currentState.task.currentValue}</Text>
            <Text fontSize='xs'>{state.currentState.task.targetValue}</Text>
          </Flex>
        </Box>

        <ButtonGroup
          justifyContent='flex-end'
          as={motion.div}
          variants={buttonGroupVariants}
        >
          <Button
            variant='outline'
            leftIcon={<TbAtom2 />}
            onClick={() => dispatch({ type: BotAction.NEXT_STATE })}
            size='sm'
            as={motion.button}
            variants={buttonVariants}
          >
            Override
          </Button>
          <Button
            variant='outline'
            leftIcon={<TbArrowsRandom />}
            onClick={() => dispatch({ type: BotAction.RESET_STATE })}
            as={motion.button}
            variants={buttonVariants}
            size='sm'
          >
            Reset
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};
