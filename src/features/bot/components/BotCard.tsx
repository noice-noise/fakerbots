import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Progress,
  Spacer,
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { useEffect, useReducer, useState } from 'react';
import { Bot } from '../types';

enum BotAction {
  PREV_STATE,
  NEXT_STATE,
  OVERRIDE_STATE,
  RESET_STATE,
}

type BotActionType =
  | { type: BotAction.PREV_STATE }
  | { type: BotAction.NEXT_STATE }
  | { type: BotAction.OVERRIDE_STATE }
  | { type: BotAction.RESET_STATE };

const reducer = (state: Bot, action: BotActionType): Bot => {
  switch (action.type) {
    case BotAction.NEXT_STATE:
      return handleStateLoop(state);
    case BotAction.OVERRIDE_STATE:
      return handleNextState(state);
    case BotAction.RESET_STATE:
      return state;
    default:
      throw new Error('Invalid action type.');
  }
};

const handleStateLoop = (bot: Bot): Bot => {
  const currentState = bot.currentState;

  if (currentState.task) {
    if (currentState.task?.currentValue >= currentState.task.targetValue) {
      return handleNextState(bot);
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

const handleNextState = (bot: Bot): Bot => {
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

type BotCardProps = {
  bot: Bot;
};

export const BotCard = ({ bot }: BotCardProps) => {
  const MILLISECONDS_PER_LOOP = 1;
  const [loop, setLoop] = useState<number | null>(null);
  const [state, dispatch] = useReducer(reducer, bot);

  useEffect(() => {
    setTimeout(() => {
      setLoop(new Date().getMilliseconds());
      dispatch({ type: BotAction.NEXT_STATE });
    }, MILLISECONDS_PER_LOOP);
  }, [loop, state]);

  const handleClick = () => {
    dispatch({ type: BotAction.OVERRIDE_STATE });
  };

  return (
    <Flex
      direction='column'
      w={80}
      p={4}
      borderWidth={'1px'}
      rounded={'lg'}
      gap={2}
    >
      <Flex align='center'>
        <Heading size='sm' fontWeight='bold'>
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
          hasStripe
          isAnimated
          value={Number(state.currentState.task.currentValue)}
          max={state.currentState.task.targetValue}
          rounded='lg'
          size='sm'
        />
        <Flex justify='space-between' mt={1}>
          <Text fontSize='xs'>{state.currentState.task.currentValue}</Text>
          <Text fontSize='xs'>{state.currentState.task.targetValue}</Text>
        </Flex>
      </Box>

      <Button variant={'outline'} size='sm' onClick={() => handleClick()}>
        Override
      </Button>
    </Flex>
  );
};
