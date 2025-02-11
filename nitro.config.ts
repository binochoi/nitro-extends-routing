//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "playground",
  extends: [
    "layer-a"
  ],
  compatibilityDate: "2025-02-11",
  typescript: {
    tsConfig: {
      compilerOptions: {
        skipLibCheck: true,
      }
    }
  }
});