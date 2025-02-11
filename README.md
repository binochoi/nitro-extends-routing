# nitro-extends-routing
register routes of layer to the system

It should be used as a replacement until the function is supported for layer in nitro.

## Usage
```ts
// ~~/layers/A/nitro.config.ts
import extendsRouting from 'nitro-extends-routing';
export default defineNitroConfig({
  modules: [
    extendsRouting({
        routePath: path.resolve(__dirname, './routes'),
    })
  ]
})

// ~~/nitro.config.ts
export default defineNitroConfig({
  extends: [
    'layer-a'
  ]
})
```

# Note
- api folder is not supported