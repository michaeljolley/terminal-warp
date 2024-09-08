import fs from 'fs/promises';
import { intro, outro } from '@clack/prompts';
// import toTitleCase from 'titlecase';
import { gatherTools } from "./warp.js";
import { getActions } from './suggestions.js';
import { saveKeybind } from './keybinds.js';
intro(`Terminal Warp ✨`);
const tools = await gatherTools();
// const installAll = await confirm({
//     message: 'Would you like to install all suggestions?',
//     active: 'Yes',
// });
let selectedTools = [];
// if (installAll) {
selectedTools = tools;
// } else {
//     const selections = await multiselect({
//         message: 'Select tools to install suggestions for.',
//         options: tools.map(tool => { return { value: tool.name, label: toTitleCase(tool.name) }}),
//         required: false,
//       });
//     selectedTools = tools.filter(tool => (selections as string[]).includes(tool.name));
// }
const actions = [];
for (const tool of selectedTools) {
    const toolActions = await getActions(tool);
    actions.push(toolActions);
}
const actionPath = `${process.env.HOME}/AppData/Local/Microsoft/Windows Terminal/Fragments/warp-workflows`;
await fs.mkdir(actionPath, { recursive: true });
await fs.writeFile(`${actionPath}/actions.json`, JSON.stringify({ actions }, null, 2));
await saveKeybind();
outro(`You're all set! 🚀`);
