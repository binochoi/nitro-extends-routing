import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index",
  ],
  externals: [
    'globby', 'nitropack'
  ],
  failOnWarn: false,
  declaration: true,
});
