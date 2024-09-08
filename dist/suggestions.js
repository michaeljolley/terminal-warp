import fs from 'fs/promises';
import { parse } from 'yaml';
export const getActions = async (tool) => {
    // const toolName = tool.name.length === 3 ? tool.name.toUpperCase() : toTitleCase(tool.name);
    // const s = spinner();
    // s.start(`Saving suggestions for ${toolName}...`);
    const suggestions = await getSuggestions(tool.path);
    const commands = [];
    const loops = suggestions.length / 5;
    for (let i = 0; i < loops; i++) {
        const commandPromises = [];
        for (let v = i * 5; v < (i * 5) + 5; v++) {
            if (v >= suggestions.length)
                break;
            commandPromises.push(getCommand(suggestions[v]));
        }
        commands.push(...await Promise.all(commandPromises));
    }
    // s.stop(`${toolName} saved`);
    return {
        "name": `${tool.name}...`,
        commands
    };
};
const getSuggestions = async (path) => {
    let files = await fs.readdir(path, { withFileTypes: true });
    files = files.filter(file => file.isFile() &&
        (file.name.endsWith(".yml") || file.name.endsWith(".yaml")));
    return files.map(file => `${path}/${file.name}`);
};
const getCommand = async (path) => {
    const warpSuggestion = await fs.readFile(path, 'utf-8');
    const suggestion = parse(warpSuggestion);
    return {
        command: {
            input: suggestion.command,
            action: "sendInput"
        },
        name: suggestion.name,
        description: suggestion.description || ""
    };
};
