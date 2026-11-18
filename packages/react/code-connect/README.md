# Figma Code Connect for @carbon/react

> [!WARNING]
>
> Figma [Code Connect](https://github.com/figma/code-connect) for Carbon React
> is in an exploratory phase.

Code Connect offers a solution for linking the
[Carbon v11 All themes](https://carbondesignsystem.com/designing/kits/figma/)
Figma library components directly to their counterparts inside of
`@carbon/react`. By incorporating Code Connect into your workflow, Figma's Dev
Mode will display actual code snippets from Carbon React.

Not only does Code Connect establish connections between component definitions,
but it also facilitates the mapping of properties from Carbon React code to
Figma. This capability enables the creation of dynamic and accurate examples,
promoting consistency across both design and engineering.

Carbon React and Carbon Web Components are connected to the same Figma
components. When you add or change a connection in one package, make the
matching change in the other. The Web Components connections live in
[`packages/web-components/code-connect`](../../web-components/code-connect/README.md).

## Connecting components

To work on Code Connect within Carbon, you’ll need a Figma editor license. If
you only need to view code snippets, you’ll just need a Dev Mode license.

Carbon connects components with Figma's
[template files](https://developers.figma.com/docs/code-connect/template-files/),
written against the
[Template API](https://developers.figma.com/docs/code-connect/template-api/).

`packages/react/figma.config.json` controls which files are published.

### Template file structure

Each template is a `.figma.ts` file that default-exports the snippet shown in
Dev Mode:

```ts
// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=50111-991
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Link/Link.tsx
// component=Link

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const linkText = instance.getString('Link text');
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});

export default {
  id: 'Link',
  imports: ["import { Link } from '@carbon/react';"],
  example: figma.code`<Link href="#"${figma.helpers.react.renderProp(
    'size',
    size
  )}>
  ${figma.helpers.react.renderChildren(linkText)}
</Link>`,
  metadata: { nestable: true },
};
```

- **Header comments:** `// url=` must be the first line of the file, followed by
  `// source=` and `// component=`. Put them above the license block. If the
  license comes first, the CLI silently skips the file.
- **Rendering props:** use `figma.helpers.react.renderProp` and `renderChildren`
  for values read from Figma.
- **Imports:** list the `@carbon/react` imports the snippet needs.

See the
[Template API reference](https://developers.figma.com/docs/code-connect/template-api/)
for a full list of methods and helpers.

## Demo Figma File

A
[demo Figma file](https://www.figma.com/design/NwXsMCCoMg1po4KK2oUK3o/Code-connect-demo---Carbon-Design-System?node-id=612-252440&m=dev)
is available to help test and add new components while working with Code
Connect.

## Testing locally

Run Code Connect commands from `packages/react` so that `figma.config.json` is
picked up. `npx figma` uses the CLI version pinned in the repository root
`package.json`.

To check that a template compiles and is picked up by the config, parse it. No
access token is needed:

```sh
cd packages/react
npx figma connect parse --file code-connect/Link/Link.figma.ts
```

If the output is an empty array (`[]`), the file was skipped. Check that
`// url=` is the first line of the file.

### Publishing

Figma code connect is set up to automatically publish when PRs are merged into
the `main` branch. If you need to test publishing while working locally you will
need to follow the
[documentation](https://developers.figma.com/docs/code-connect/quickstart-guide/)
and create your own `FIGMA_ACCESS_TOKEN` variable.

```sh
cd packages/react
npx figma connect publish --token <token>
```

You can also publish specific files instead of the entire set:

```sh
npx figma connect publish --file code-connect/Tabs/*.figma.ts --token <token>
```

Add `--dry-run` to either command to validate the files without publishing them.
