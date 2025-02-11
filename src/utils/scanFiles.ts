import type { Nitro } from "nitropack";
import type { FileInfo } from "../types";
import { scanDir } from "./scanDir";

export async function scanFiles(nitro: Nitro, name: string): Promise<FileInfo[]> {
    const files = await Promise.all(
        nitro.options.scanDirs.map((dir) => scanDir(nitro, dir, name))
    ).then((r) => r.flat());
    return files;
}
