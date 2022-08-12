export type State = Readonly<{
  name: string;
  message: string;
  task: Task;
}>;

export type Task = {
  title: string;
  description: string;
  unitValue: number;
  currentValue: number;
  targetValue: number;
};

export type Bot = Readonly<{
  id: number;
  name: string;
  currentStateIndex: number;
  currentState: State;
  states: State[];
}>;
