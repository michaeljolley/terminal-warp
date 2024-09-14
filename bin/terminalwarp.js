const os = require("os");

if (os.type() !== "win32") {
  console.log("Terminal Warp is only supported on Windows.");
  process.exit(0);
}

console.log("Welcome to Terminal Warp!"); 

// import fs from "fs/promises";
// import { intro, outro, spinner } from "@clack/prompts";
// import tmp from "tmp";
// import unzipper from "unzipper";
// import { parse } from "yaml";


// var getWarpWorkflowRepo = async () => {
//   tmp.setGracefulCleanup();
//   const { name: tmpDir } = tmp.dirSync({ unsafeCleanup: true });
//   const response = await fetch(
//     "https://github.com/warpdotdev/workflows/archive/refs/heads/main.zip"
//   );
//   const buffer = await response.arrayBuffer();
//   await fs.writeFile(`${tmpDir}/workflows.zip`, Buffer.from(buffer));
//   const dir = await unzipper.Open.file(`${tmpDir}/workflows.zip`);
//   await dir.extract({ path: tmpDir });
//   return `${tmpDir}/workflows-main`;
// };

// var gatherTools = async () => {
//   const s = spinner();
//   s.start("Downloading suggestions...");
//   const tmpDir = await getWarpWorkflowRepo();
//   const files = await fs.readdir(`${tmpDir}/specs`, { withFileTypes: true });
//   const tools2 = files.filter((file) => file.isDirectory()).map((file) => {
//     return {
//       name: file.name,
//       path: `${tmpDir}/specs/${file.name}`
//     };
//   });
//   s.stop("Suggestions downloaded");
//   return tools2;
// };

// var getActions = async (tool) => {
//   const suggestions = await getSuggestions(tool.path);
//   const commands = [];
//   const loops = suggestions.length / 5;
//   for (let i = 0; i < loops; i++) {
//     const commandPromises = [];
//     for (let v = i * 5; v < i * 5 + 5; v++) {
//       if (v >= suggestions.length) break;
//       commandPromises.push(getCommand(suggestions[v]));
//     }
//     commands.push(...await Promise.all(commandPromises));
//   }
//   return {
//     name: `${tool.name}...`,
//     commands
//   };
// };

// var getSuggestions = async (path) => {
//   let files = await fs.readdir(path, { withFileTypes: true });
//   files = files.filter(
//     (file) => file.isFile() && (file.name.endsWith(".yml") || file.name.endsWith(".yaml"))
//   );
//   return files.map((file) => `${path}/${file.name}`);
// };

// var getCommand = async (path) => {
//   const warpSuggestion = await fs.readFile(path, "utf-8");
//   const suggestion = parse(warpSuggestion);
//   return {
//     command: {
//       input: suggestion.command,
//       action: "sendInput"
//     },
//     name: suggestion.name,
//     description: suggestion.description || ""
//   };
// };

// var settingPathOptions = [
//   `${process.env.HOME}/AppData/Local/Microsoft/Windows Terminal/settings.json`,
//   `${process.env.HOME}/AppData/Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/LocalState/settings.json`
// ];
// var settingPreviewPathOptions = [
//   `${process.env.HOME}/AppData/Local/Microsoft/Windows Terminal Preview/settings.json`,
//   `${process.env.HOME}/AppData/Local/Packages/Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe/LocalState/settings.json`
// ];

// var saveKeybind = async () => {
//   const s = spinner();
//   s.start("Saving keybind for suggestions");
//   const settingsPath = await getSettingsPath(settingPathOptions);
//   const settingsPreviewPath = await getSettingsPath(settingPreviewPathOptions);
//   if (settingsPath) {
//     await saveSettings(settingsPath);
//   }
//   if (settingsPreviewPath) {
//     await saveSettings(settingsPreviewPath);
//   }
//   s.stop("Use Ctrl+Shift+Y to open suggestions in Windows Terminal.");
// };

// var saveSettings = async (settingsPath) => {
//   const settingsContent = await fs.readFile(settingsPath, "utf-8");
//   const settings = JSON.parse(settingsContent);
//   let keybindings = settings.keybindings || [];
//   const keybind = keybindings.find(
//     (f) => f.keys === "ctrl+shift+y"
//   );
//   if (keybind) {
//     keybindings = keybindings.filter(
//       (f) => f.keys !== "ctrl+shift+y"
//     );
//   }
//   keybindings.push({
//     id: "Terminal.Suggestions",
//     keys: "ctrl+shift+y"
//   });
//   settings.keybindings = keybindings;
//   await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
// };

// var getSettingsPath = async (options) => {
//   for (const path of options) {
//     try {
//       await fs.access(path);
//       return path;
//     } catch {
//       continue;
//     }
//   }
//   return void 0;
// };

// intro(`Terminal Warp \u2728`);
// var tools = await gatherTools();
// var selectedTools = [];
// selectedTools = tools;
// var actions = [];
// for (const tool of selectedTools) {
//   const toolActions = await getActions(tool);
//   actions.push(toolActions);
// }
// var actionPath = `${process.env.HOME}/AppData/Local/Microsoft/Windows Terminal/Fragments/warp-workflows`;
// await fs.mkdir(actionPath, { recursive: true });
// await fs.writeFile(
//   `${actionPath}/actions.json`,
//   JSON.stringify({ actions }, null, 2)
// );
// await saveKeybind();
// outro(`You're all set! \u{1F680}`);
