import path from "path";
import { extendsRouting } from "../../src/module";
export default defineNitroConfig({
    modules: [
        extendsRouting({
            routePath: path.resolve(__dirname, './routes'),
            prefix: 'a'
        }),
    ],
  });