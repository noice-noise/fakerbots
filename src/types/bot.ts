export type Status = {
  status: 'ready' | 'running' | 'error' | 'collect';
};

export type Bot = {
  id: number;
  name: string;
} & Status;
