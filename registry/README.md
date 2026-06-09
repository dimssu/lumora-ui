# Lumora UI registry

`registry.json` is the machine-readable index the `lumora` CLI reads to
resolve `lumora add <name>` requests. It is **generated** — never edit it by
hand. Regenerate with:

```sh
node scripts/build-registry.mjs
```

CI must re-run that script whenever anything in `packages/ui/src/` or
`packages/icons/src/` changes, and commit the result.

## Format

```jsonc
{
  "name": "lumora",
  "version": 1,                       // registry schema version
  "tokens": { "path": "packages/ui/styles/lumora.css" },
  "lib": {
    // shared internal files, keyed by registry id
    "lib/cn": { "path": "packages/ui/src/lib/cn.ts", "npmDeps": ["clsx", "tailwind-merge"] }
  },
  "items": [
    {
      "name": "button",               // file name without extension
      "category": "component",        // component | block | ai | icon
      "path": "packages/ui/src/components/button.tsx",
      "description": "First JSDoc sentence of the exported component.",
      "internalDeps": ["lib/cn", "lib/motion"],  // registry ids to install too
      "npmDeps": ["class-variance-authority", "motion", "react"]
    }
  ]
}
```

Notes:

- The registry stays **light**: only paths and metadata. File contents are
  fetched by the CLI from the same base the registry was loaded from — the
  raw GitHub URL in production, the checkout root in development.
- Registry ids: components are addressed by bare name (`button`); other
  categories are prefixed (`block/hero`, `ai/prompt-bar`, `icon/mail`).
- `internalDeps` are detected from each file's relative imports;
  `npmDeps` from its bare package imports (`motion/react` → `motion`).
  `react`/`react-dom` are listed but treated as peers by the CLI.
