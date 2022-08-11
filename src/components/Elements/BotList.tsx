import { Flex } from '@chakra-ui/react';
import { Bot } from '../../types/bot';
import { BotCard } from './BotCard';

type BotListProps = {
  bots: Bot[];
};

export const BotList = ({ bots }: BotListProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    console.log('clicked', id);
    bots.map((bot) => {
      if (bot.id === id) {
      }
      return bot;
    });
  };
  return (
    <Flex gap={3} flexWrap='wrap'>
      {bots.map((bot) => (
        <BotCard key={bot.id} bot={bot} onClick={handleClick} />
      ))}
    </Flex>
  );
};
