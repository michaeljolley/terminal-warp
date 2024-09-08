import { spinner } from '@clack/prompts';
import fs from 'fs/promises';
const settingPathOptions = [
    `${process.env.HOME}/AppData/Local/Microsoft/Windows Terminal/settings.json`,
    `${process.env.HOME}/AppData/Local/Packages/Microsoft.WindowsTerminal_8wekyb3d8bbwe/LocalState/settings.json`
];
const settingPreviewPathOptions = [
    `${process.env.HOME}/AppData/Local/Microsoft/Windows Terminal Preview/settings.json`,
    `${process.env.HOME}/AppData/Local/Packages/Microsoft.WindowsTerminalPreview_8wekyb3d8bbwe/LocalState/settings.json`
];
export const saveKeybind = async () => {
    const s = spinner();
    s.start("Saving keybind for suggestions");
    const settingsPath = await getSettingsPath(settingPathOptions);
    const settingsPreviewPath = await getSettingsPath(settingPreviewPathOptions);
    if (settingsPath) {
        await saveSettings(settingsPath);
    }
    if (settingsPreviewPath) {
        await saveSettings(settingsPreviewPath);
    }
    s.stop("Use Ctrl+Shift+Y to open suggestions in Windows Terminal.");
};
const saveSettings = async (settingsPath) => {
    const settingsContent = await fs.readFile(settingsPath, 'utf-8');
    const settings = JSON.parse(settingsContent);
    let keybindings = settings.keybindings || [];
    const keybind = keybindings.find((f) => f.keys === "ctrl+shift+y");
    if (keybind) {
        keybindings = keybindings.filter((f) => f.keys !== "ctrl+shift+y");
    }
    keybindings.push({
        id: "Terminal.Suggestions",
        keys: "ctrl+shift+y"
    });
    settings.keybindings = keybindings;
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
};
const getSettingsPath = async (options) => {
    for (const path of options) {
        try {
            await fs.access(path);
            return path;
        }
        catch {
            continue;
        }
    }
    return undefined;
};
