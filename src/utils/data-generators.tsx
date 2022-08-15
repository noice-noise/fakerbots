import { Task, State, Bot } from '../features/bot';

const defaultBotNames = [
  'RowBot',
  'LowBot',
  'KilaBot',
  'GinaBot',
  'AmBot',
  'BeBot',
  'SagBot',
];

const getDefaultName = (): string => {
  if (defaultBotNames.length <= 0) {
    return 'Bot';
  }

  const min = 0;
  const max = defaultBotNames.length - 1;

  const randomIndex = generateRandomNumber(min, max);
  const name = defaultBotNames[randomIndex];
  defaultBotNames.splice(randomIndex, 1); // remove the name

  return name;
};

export const generateRandomBot = (botName?: string): Bot => {
  return {
    id: new Date().getTime() + generateRandomNumber(0, 9999),
    name: botName || getDefaultName(),
    currentStateIndex: 0,
    currentState: generateRandomInitialState(),
    states: generateRandomStates(),
  };
};

export const generateRandomTask = (
  minUnit: number,
  maxUnit: number,
  minTarget: number,
  maxTarget: number,
  title: string = 'Running task',
  description: string = 'Executing...'
): Task => {
  const randomUnitValue = generateRandomNumber(minUnit, maxUnit);
  const randomTargetValue = generateRandomNumber(minTarget, maxTarget);

  const randomizedTask: Task = {
    title: title,
    description: description,
    unitValue: randomUnitValue,
    currentValue: 0,
    targetValue: randomTargetValue,
  };
  return randomizedTask;
};

export const generateRandomInitialState = (): State => {
  const randomInitialState: State = {
    name: 'Ready',
    message: 'Ready',
    task: generateRandomTask(0, 0, 1, 1),
  };
  return randomInitialState;
};

export const generateRandomStates = (): State[] => {
  const generateRandomStates: State[] = [
    {
      name: 'Ready',
      message: 'Ready',
      task: generateRandomTask(0, 0, 1, 1),
    },
    {
      name: 'Initializing',
      message: 'Initializing data assets...',
      task: generateRandomTask(1, 5, 20, 100),
    },
    {
      name: 'Analyzing',
      message: 'Analyzing target system...',
      task: generateRandomTask(1, 10, 500, 2000),
    },
    {
      name: 'Formulating',
      message: 'Formulating strategy...',
      task: generateRandomTask(1, 10, 1000, 2000),
    },
    {
      name: 'Running',
      message: 'Running...',
      task: generateRandomTask(1, 10, 10000, 20000),
    },
    {
      name: 'Collecting',
      message: 'Cashing out resources...',
      task: generateRandomTask(1, 10, 5000, 10000),
    },
    {
      name: 'Transferring',
      message: 'Transferring to accounts...',
      task: generateRandomTask(1, 5, 1000, 1000),
    },
    {
      name: 'Cleaning',
      message: 'Cleaning up...',
      task: generateRandomTask(1, 5, 1000, 1000),
    },
  ];
  return generateRandomStates;
};

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
