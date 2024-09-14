import { Command } from "./command.js";

export type Action = {
  name: string;
  commands: Command[];
};