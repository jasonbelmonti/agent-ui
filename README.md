# @jasonbelmonti/signal-ui

Signal-driven React and Ant Design UI package for desktop apps.

## Development

```bash
bun install
bun run storybook
bun run typecheck
bun run build
```

`bun run build` emits the consumable package contract in `dist/`:

- `dist/index.js`
- `dist/index.d.ts`
- `dist/styles.css`

`dist/` is checked into the repo on purpose so Bun consumers using
`"@jasonbelmonti/signal-ui": "file:../signal-ui"` can install the package from a fresh clone without
depending on blocked lifecycle scripts.

## Consumption

Add the package as a sibling file dependency:

```json
{
  "dependencies": {
    "@jasonbelmonti/signal-ui": "file:../signal-ui"
  }
}
```

Import the shared global styles once at the renderer entry, then wrap the app with the provider:

```tsx
import "@jasonbelmonti/signal-ui/styles.css";
import { AntdThemeProvider } from "@jasonbelmonti/signal-ui";
```

The package exports the provider, theme tokens, and shared components including `Panel`,
`PixelCubeLoader`, and `PixelCubePath`.
