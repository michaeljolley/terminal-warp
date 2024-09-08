import fs from 'fs/promises';
import tmp from 'tmp';
import unzipper from 'unzipper';
import { spinner } from '@clack/prompts';
const getWarpWorkflowRepo = async () => {
    tmp.setGracefulCleanup();
    const { name: tmpDir } = tmp.dirSync({ unsafeCleanup: true });
    const response = await fetch("https://github.com/warpdotdev/workflows/archive/refs/heads/main.zip");
    const buffer = await response.arrayBuffer();
    await fs.writeFile(`${tmpDir}/workflows.zip`, Buffer.from(buffer));
    const dir = await unzipper.Open.file(`${tmpDir}/workflows.zip`);
    await dir.extract({ path: tmpDir, });
    return `${tmpDir}/workflows-main`;
};
export const gatherTools = async () => {
    const s = spinner();
    s.start('Downloading suggestions...');
    const tmpDir = await getWarpWorkflowRepo();
    const files = await fs.readdir(`${tmpDir}/specs`, { withFileTypes: true });
    const tools = files.filter(file => file.isDirectory()).map(file => {
        return {
            name: file.name,
            path: `${tmpDir}/specs/${file.name}`
        };
    });
    s.stop('Suggestions downloaded');
    return tools;
};
