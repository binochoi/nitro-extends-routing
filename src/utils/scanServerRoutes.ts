import type { Nitro } from "nitropack";
import { scanFiles } from "./scanFiles";
import {withLeadingSlash, withBase, withoutTrailingSlash} from 'ufo';

const suffixRegex =
    /\.(connect|delete|get|head|options|patch|post|put|trace)(\.(dev|prod|prerender))?$/;
type MatchedMethodSuffix = "connect" | "delete" | "get" | "head" | "options" | "patch" | "post" | "put" | "trace";
type MatchedEnvSuffix = "dev" | "prod" | "prerender";

export async function scanServerRoutes(
    nitro: Nitro,
    dir: string,
    prefix = "/"
) {
    const files = await scanFiles(nitro, dir);
    return files.map((file) => {
        let route = file.path
            .replace(/\.[A-Za-z]+$/, "")
            .replace(/\[\.{3}]/g, "**")
            .replace(/\[\.{3}(\w+)]/g, "**:$1")
            .replace(/\[(\w+)]/g, ":$1");
        route = withLeadingSlash(withoutTrailingSlash(withBase(route, prefix)));

        const suffixMatch = route.match(suffixRegex);
        let method: MatchedMethodSuffix | undefined;
        let env: MatchedEnvSuffix | undefined;
        if (suffixMatch?.index) {
            route = route.slice(0, Math.max(0, suffixMatch.index));
            method = suffixMatch[1] as MatchedMethodSuffix;
            env = suffixMatch[3] as MatchedEnvSuffix;
        }

        route = route.replace(/\/index$/, "") || "/";

        return {
            handler: file.fullPath,
            lazy: true,
            middleware: false,
            route,
            method,
            env,
        };
    });
}