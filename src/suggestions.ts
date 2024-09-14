import fs from "fs/promises";
// import { spinner } from '@clack/prompts';
// import toTitleCase from 'titlecase';
import { parse } from "yaml";
import { Command } from "./types/command.js";
import { Action } from "./types/action.js";
import { Tool } from "./types/tool.js";

export const getActions = async (tool: Tool): Promise<Action> => {
  // const toolName = tool.name.length === 3 ? tool.name.toUpperCase() : toTitleCase(tool.name);

  // const s = spinner();
  // s.start(`Saving suggestions for ${toolName}...`);

  const suggestions = await getSuggestions(tool.path);

  const commands: Command[] = [];
  const loops = suggestions.length / 5;

  for (let i = 0; i < loops; i++) {
    const commandPromises: Promise<Command>[] = [];

    for (let v = i * 5; v < i * 5 + 5; v++) {
      if (v >= suggestions.length) break;
      commandPromises.push(getCommand(suggestions[v]));
    }

    commands.push(...(await Promise.all(commandPromises)));
  }

  // s.stop(`${toolName} saved`);

  return {
    name: `${tool.name}...`,
    commands,
  };
};

const getSuggestions = async (path: string): Promise<string[]> => {
  let files = await fs.readdir(path, { withFileTypes: true });
  files = files.filter(
    (file) =>
      file.isFile() &&
      (file.name.endsWith(".yml") || file.name.endsWith(".yaml")),
  );

  return files.map((file) => `${path}/${file.name}`);
};

const getCommand = async (path: string): Promise<Command> => {
  const warpSuggestion = await fs.readFile(path, "utf-8");
  const suggestion = parse(warpSuggestion);

  return {
    command: {
      input: suggestion.command,
      action: "sendInput",
    },
    name: suggestion.name,
    description: suggestion.description || "",
  };
};