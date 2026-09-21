# Figma handoff

Load **before** any `use_figma` call: Figma skill `figma-use`, then
`figma-generate-design` for composed screens.

Pass `skillNames: "figma-use"` on every `use_figma`. For screen assembly also
pass `figma-generate-design`.

## Targets

|                  |                                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| fileKey          | `mnPFHuLUzXItWQimrWQEvV`                                                                                                                   |
| Never            | `Ude8f8dEgXxxnpbzrvWfwE`, `YAnB1jKx0yCUL29j6uSLpg`                                                                                         |
| Product UI page  | Existing `Screens` (`1756:1439`). Frame name = `<slug>`. Do not create a second page named `Screens / <slug>` if `Screens` already exists. |
| Not first canvas | Code snippet `35:2542` (syntax stays IBM; do not park product UI there)                                                                    |
| Variable mode    | IBM default. Bind CoForge only where CSS already proves the role.                                                                          |
| Library          | Do not `figma-generate-library`                                                                                                            |

## Assemble

1. For each `screen-spec.json` region, resolve `componentKey` from Code Connect
   node (`use_figma` import / `search_design_system` **after** Code Connect
   IDs).
2. `$fig.instance(componentKey, { props })` — variant names from the `.figma.ts`
   enum maps.
3. Auto-layout the **page chrome** (sections) only. Controls inside sections are
   instances.
4. `.screenshot()` and compare to spec.
5. If a proto-spec exists: set `reactions` per `coforge-prototype`
   `figma-reactions.md`. Header menu → job frames.

Forbidden: unlabeled rectangles with `hex('#f15b40')` when `cds-button` exists.
Forbidden hotspots must not get reactions.

Code Connect mapping updates: `figma-code-connect` in a **separate commit**,
never with the screen.

## After write

Run colour checks from `coforge-skin-bench` that this screen uses. Report Check
· Result · Evidence.
