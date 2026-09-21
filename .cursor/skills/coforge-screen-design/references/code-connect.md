# Code Connect lookup

Source of truth: `packages/web-components/code-connect-parserless/**/*.figma.ts`

```
// url=https://www.figma.com/design/Ude8f8dEgXxxnpbzrvWfwE/...?node-id=1854-1776
// component=cds-button
id: 'cds-button'
```

| From file                          | Use                                                  |
| ---------------------------------- | ---------------------------------------------------- |
| `node-id=1854-1776`                | `1854:1776` (hyphen → colon)                         |
| Published `Ude8f8dEgXxxnpbzrvWfwE` | **Do not write.** Identity only.                     |
| Write fileKey                      | `mnPFHuLUzXItWQimrWQEvV` (map `figma.write_fileKey`) |
| `getEnum` maps                     | Figma `props` in screen-spec                         |

Prefer
[component-token-map.json](../../../../packages/themes/src/dtcg/coforge/component-token-map.json)
over grepping. Regenerate:

```bash
python3 packages/themes/src/dtcg/coforge/scripts/build-component-token-map.py
```

React parser-based maps that point at `YAnB1jKx0yCUL29j6uSLpg` are **not** write
targets.

If `get_code_connect_map` / `search_design_system` runs: Code Connect node IDs
first, then library search (figma-generate-design order). Missing published
mapping → stop and propose; do not fake a component.
