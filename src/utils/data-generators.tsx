import { Task, State } from '../features/bot';

export const generateRandomTask = (
  minUnit: number,
  maxUnit: number,
  minTarget: number,
  maxTarget: number,
  title: string = 'Running task',
  description: string = 'Executing...'
): Task => {
  const randomUnitValue =
    Math.floor(Math.random() * (maxUnit - minUnit + 1)) + minUnit;
  const randomTargetValue =
    Math.floor(Math.random() * (maxTarget - minTarget + 1)) + 100;

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
      task: generateRandomTask(1, 10, 5000, 10000),
    },
    {
      name: 'Formulating',
      message: 'Formulating strategy...',
      task: generateRandomTask(1, 10, 1000, 2000),
    },
    {
      name: 'Running',
      message: 'Running strategy...',
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
  ];
  return generateRandomStates;
};
