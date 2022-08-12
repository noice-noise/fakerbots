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
import { useEffect, useState } from 'react';
import { Bot } from '../types';

type BotCardProps = {
  bot: Bot;
};

export const BotCard = ({ bot }: BotCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBotState(handleNextState(botState));
  };

  const [botState, setBotState] = useState<Bot>(bot);

  const MS_PER_LOOP = 1; // milliseconds per loop
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setTime(new Date().getMilliseconds().toString());
      setBotState((bot) => handleStateLoop(bot));
    }, MS_PER_LOOP);
  }, [time]);

  const handleStateLoop = (bot: Bot): Bot => {
    if (bot.currentState.task) {
      if (
        bot.currentState.task?.currentValue >=
        bot.currentState.task?.targetValue
      ) {
        return handleNextState(bot);
      } else {
        return {
          ...bot,
          currentState: {
            ...bot.currentState,
            task: {
              ...bot.currentState.task,
              currentValue:
                bot.currentState.task?.currentValue +
                bot.currentState.task?.unitValue,
            },
          },
        };
      }
    } else {
      return bot;
    }
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
          {botState.name}
        </Heading>
        <Spacer />
        <Tag size='sm'>
          <TagLabel>Bot</TagLabel>
        </Tag>
      </Flex>
      <Divider />
      <Flex justify='space-between'>
        <Badge>{botState.currentState.name}</Badge>
        <Text fontSize='xs'>{botState.currentState.message}</Text>
      </Flex>
      <Box>
        <Progress
          colorScheme='green'
          hasStripe
          isAnimated
          value={Number(botState.currentState.task.currentValue)}
          max={botState.currentState.task.targetValue}
          rounded='lg'
          size='sm'
        />
        <Flex justify='space-between' mt={1}>
          <Text fontSize='xs'>{botState.currentState.task.currentValue}</Text>
          <Text fontSize='xs'>{botState.currentState.task.targetValue}</Text>
        </Flex>
      </Box>

      <Button variant={'outline'} size='sm' onClick={(e) => handleClick(e)}>
        Override
      </Button>
    </Flex>
  );
};
