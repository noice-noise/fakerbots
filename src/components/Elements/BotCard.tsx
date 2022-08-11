import { Badge, Button, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { Bot } from '../../types/bot';

type BotCardProps = {
  bot: Bot;
  onClick: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

export const BotCard = ({ bot, onClick }: BotCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick(e, bot.id);
  };

  return (
    <Flex direction='column' p={4} borderWidth={'1px'} rounded={'lg'} gap={2}>
      <Heading size={'sm'}>{bot.name}</Heading>
      <Badge>{bot.status}</Badge>
      <Button variant={'outline'} size='sm' onClick={(e) => handleClick(e)}>
        Run
      </Button>
    </Flex>
  );
};
