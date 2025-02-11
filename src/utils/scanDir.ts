import { join, relative} from 'pathe';
import { globby } from 'globby';
import type { Nitro } from "nitropack";
import type { FileInfo } from '../types';

const GLOB_SCAN_PATTERN = "**/*.{js,ts}";

export async function scanDir(
    nitro: Nitro,
    dir: string,
    name: string
): Promise<FileInfo[]> {
    const fileNames = await globby(join(name, GLOB_SCAN_PATTERN), {
        cwd: dir,
        dot: true,
        ignore: nitro.options.ignore,
        absolute: true,
    });
    return fileNames
        .map((fullPath) => {
            return {
                fullPath,
                path: relative(join(dir, name), fullPath),
            };
        })
        .sort((a, b) => a.path.localeCompare(b.path));
}