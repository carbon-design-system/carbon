# Screen spec

Directory: `packages/themes/examples/coforge-skin/screens/<slug>/`

| File               | Role                      |
| ------------------ | ------------------------- |
| `TASK.md`          | Human brief (required)    |
| `screen-spec.json` | Machine composition       |
| `flow.md`          | Steps, screens, decisions |

## `screen-spec.json`

```json
{
  "slug": "create-request",
  "screen": "Create request",
  "flow_id": "create-request",
  "viewport": { "width": 1280, "height": 800 },
  "figma": {
    "fileKey": "mnPFHuLUzXItWQimrWQEvV",
    "page": "Screens / create-request"
  },
  "states": ["default", "empty", "error", "success"],
  "regions": [
    {
      "id": "submit",
      "component": "cds-button",
      "react": "Button",
      "variant": { "kind": "primary", "size": "lg", "state": "enabled" },
      "tokens": ["--cds-button-primary", "--cds-text-on-color"],
      "figma": {
        "fileKey": "mnPFHuLUzXItWQimrWQEvV",
        "nodeId": "1854:1776",
        "props": { "Style": "Primary", "Size": "Large" }
      },
      "copy": "Submit request"
    }
  ],
  "forbidden": ["raw hex", "off-catalogue components", "coral on small text"]
}
```

`figma.nodeId` and `props` come from `component-token-map.json` + the matching
`*.figma.ts` enums.

Figma agents instantiate from `figma` + `props`. Code agents from `react` /
`component` + `variant`. Same row, two surfaces.

Interactive flows: `product/flows/<flow_id>.json` (`coforge-prototype`
proto-spec). Region `id`s must match hotspot `from` values.
