import { type NitroModule } from 'nitropack/core'
import * as path from 'path'
import { scanServerRoutes } from './utils/scanServerRoutes';
interface ModuleOptions {
    routePath: string,
    prefix?: string
}
const getRoutePath = (path: string, routesDir = 'routes') => {
    const routesIndex = path.indexOf(`/${routesDir}`);
    return path.substring(routesIndex + `/${routesDir}`.length);
}
export const extendsRouting = ({ routePath, prefix = '' }: ModuleOptions) => ({
    name: "extendsRouting",
    async setup(nitro) {
        const routeFullPath = path.resolve(__dirname, routePath);
        const routes = (await scanServerRoutes(nitro, routeFullPath)).map((handler) => ({
            ...handler,
            middleware: false,
            route: path.join('/', prefix, getRoutePath(handler.route)),
        }));
        nitro.options.handlers = [...nitro.options.handlers, ...routes];
    },
  }) satisfies NitroModule;