# ibm-products → Carbon Core: React Component Migration Prompt

Reusable prompt for migrating a single React component from
`carbon-for-ibm-products` into the Carbon core monorepo, aligned with
[ADR 0007](../decisions/0007-ibm-products-to-core-migration.md).

---

## How to Use

Fill in the three placeholders, then paste the completed prompt as your first
message in a new conversation.

| Placeholder                    | What to put here                         | Example            |
| ------------------------------ | ---------------------------------------- | ------------------ |
| `{{ComponentName}}`            | PascalCase component name                | `ConditionBuilder` |
| `{{ibm-products-export}}`      | Exact export from `@carbon/ibm-products` | `ConditionBuilder` |
| `{{stable\|preview\|utility}}` | Target status per ADR 0007 table         | `preview`          |

---

## The Prompt

```
You are migrating the {{ComponentName}} React component from carbon-for-ibm-products
into the Carbon core monorepo.

ibm-products export name: {{ibm-products-export}}
Migration status per ADR 0007: {{stable|preview|utility}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 0 — READ EVERYTHING BEFORE WRITING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Read the ibm-products source from GitHub:
  carbon-design-system/ibm-products  packages/ibm-products/src/components/{{ComponentName}}/
    • {{ComponentName}}.tsx (or .jsx)
    • {{ComponentName}}.stories.jsx (or .tsx)
    • {{ComponentName}}.mdx
    • __tests__/{{ComponentName}}.test.js (or similar)
    • index.ts
    • constants.ts, hooks/, utils/ (if present)
  e2e/components/{{ComponentName}}/
    • {{ComponentName}}-test.avt.e2e.js (if it exists)

Read these target files in the Carbon core repo for conventions:
  packages/react/src/components/TruncatedText/TruncatedText.tsx    (utility component pattern)
  packages/react/src/components/Resizer/Resizer.tsx                (recently migrated pattern)
  packages/react/src/components/TruncatedText/__tests__/TruncatedText-test.js
  packages/react/src/components/Resizer/Resizer.stories.js
  packages/react/src/components/TruncatedText/TruncatedText.mdx
  packages/react/src/components/Resizer/story.scss
  packages/react/src/components/UserAvatar/UserAvatar.tsx          (stable component pattern)
  packages/styles/scss/components/truncated-text/_truncated-text.scss   (SCSS mixin pattern)
  packages/styles/scss/components/truncated-text/_index.scss            (SCSS index pattern)
  packages/react/src/index.ts                                     (export registration)
  packages/styles/scss/components/_index.scss                     (styles registration)
  docs/style.md                                                   (coding standards)
  docs/preview-code.md                                            (preview naming rules)
  docs/decisions/0007-ibm-products-to-core-migration.md          (migration ADR)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1 — CREATE THE COMPONENT DIRECTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Create: packages/react/src/components/{{ComponentName}}/

Required files — NO MORE, NO LESS than this set:
  {{ComponentName}}.tsx
  {{ComponentName}}.mdx
  {{ComponentName}}.stories.js    ← MUST be .js, not .jsx or .tsx
  index.ts
  story.scss
  constants.ts                    ← only if the component has enums / shared types
  __tests__/{{ComponentName}}-test.js

Do NOT create:
  ✗ _storybook-styles.scss        ibm-products pattern, not used in Carbon core
  ✗ _carbon-imports.scss          ibm-products pattern, not used in Carbon core
  ✗ _index-with-carbon.scss       ibm-products pattern, not used in Carbon core
  ✗ {{ComponentName}}.figma.tsx   goes in packages/react/code-connect/ not src/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 2 — CONVERT {{ComponentName}}.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Apply every conversion in this table:

  ibm-products pattern                       Carbon core replacement
  ─────────────────────────────────────────────────────────────────────
  import { pkg } from '../../settings'       DELETE entirely
  pkg.prefix                                 const prefix = usePrefix()
                                               from '../../internal/usePrefix'
  getDevtoolsProps(componentName)            data-component-name={componentName}
                                               on root element only; import removed
  blockClass = `${pkg.prefix}--name`         const blockClass = `${prefix}--name`
                                               declared INSIDE the component function
  import { X } from '@carbon/ibm-products'  Relative import: import X from '../X'
  import { Button } from '@carbon/react'     import Button from '../Button'
  import { Icon } from '@carbon/react/icons' import { Icon } from '@carbon/icons-react'
  import { SkeletonText } from '@carbon/...' import SkeletonText from '../SkeletonText'
  import { Tooltip } from '@carbon/react'    import { Tooltip } from '../Tooltip'
  import { TooltipTrigger } from '../...'    Inline <button type="button"> — TooltipTrigger
                                               does not exist in Carbon core
  getSupportedLocale from global/js/utils/   import { getSupportedLocale } from
                                               '../../internal/getSupportedLocale'
  import cx from '@carbon/ibm-products/…'   import cx from 'classnames'
  prepareProps() from props-helper           Inline the utility or remove
  pkg.checkComponentEnabled(…)              DELETE
  c4p-specific feature flags                DELETE unless Carbon core equivalent exists

TypeScript rules — CRITICAL:
  • Keep `import React from 'react'` — Carbon core components need it
  • Do NOT add PropTypes — delete `import PropTypes from 'prop-types'` and any
    `.propTypes = { … }` block. The TypeScript interface is the sole source of truth.
  • forwardRef generic: use HTMLDivElement when the root/skeleton renders <div>.
    Use HTMLElement for semantic elements (<figure>, <section>, <article>).
    CRITICAL: parent forwardRef MUST match skeleton forwardRef exactly.
    Mismatch causes TS2322 — the most common migration error.
  • Skeleton rest-props type: MUST be React.HTMLAttributes
    NOT Record — classnames cx() cannot accept `unknown` arguments
  • Props in alphabetical order in: (a) interface, (b) destructure

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 3 — index.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  export { {{ComponentName}} } from './{{ComponentName}}';
  export type { {{ComponentName}}Props } from './{{ComponentName}}';
  // if skeleton exists:
  export { {{ComponentName}}Skeleton } from './{{ComponentName}}Skeleton';

  Note: ALL exports are uncommented here. This is the component's own barrel
  file — it always exports everything. Gating for the public package API is
  handled by packages/react/src/index.ts and product-migrated-components.mjs.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4 — REGISTER IN packages/react/src/index.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALL components (stable, preview, utility) — add as a commented-out block.
The component is excluded from the published v11 bundle via
product-migrated-components.mjs (Step 4b). Write the export line now so it
only needs to be uncommented when the component ships in v12.

  For PREVIEW:
    // TODO: uncomment in v12 — also remove from excludeProductsComponents
    // export {
    //   {{ComponentName}} as preview__{{ComponentName}},
    //   {{ComponentName}}Skeleton as preview__{{ComponentName}}Skeleton,
    // } from './components/{{ComponentName}}';
    // export type { {{ComponentName}}Props } from './components/{{ComponentName}}';

  For STABLE or UTILITY:
    // TODO: uncomment in v12 — also remove from excludeProductsComponents
    // export * from './components/{{ComponentName}}';

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 4b — REGISTER IN packages/react/product-migrated-components.mjs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This file controls which components are excluded from the v11 Storybook build
and the published JS / .d.ts bundle. Every migrated component MUST appear here.

Add to BOTH arrays (maintain alphabetical order within each):

  productMigratedStoryGlobs — excludes stories from the v11 Storybook:
    '../src/components/{{ComponentName}}/{{ComponentName}}.stories.js',

  excludeProductsComponents — excludes from the published bundle until v12:
    'src/components/{{ComponentName}}/**/*',

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 5 — SCSS STYLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
There are THREE separate SCSS locations. Create ALL three.

── Location A: packages/styles/scss/components/{{ComponentName}}/ ──────────────
  (Note: the directory name here PRESERVES PascalCase as used in ibm-products)

  File: _{{component-name}}.scss
    @use '../../config' as *;
    @use '../../theme' as *;
    @use '../../type' as *;
    @use '../../spacing' as *;
    // (add ../../utilities only if needed)

    /// {{ComponentName}} styles
    /// @access public
    /// @group {{component-name}}
    @mixin {{component-name}} {
      .#{$prefix}--{{component-name}} { … }
      // ALL selectors nested inside this mixin
    }

  Rules for _{{component-name}}.scss:
    • $prefix comes from ../../config — NOT any c4p variable
    • NO nesting of selectors (Carbon style guide)
    • Use CSS logical properties: margin-block, padding-inline, inset-block-start
    • Use $spacing-* tokens for all sizing/spacing (no px literals)
    • Use $text-*, $background-*, $layer-*, $focus tokens for colour

  File: _index.scss  (EXACT pattern — 3 lines after copyright):
    @forward '{{component-name}}';
    @use '{{component-name}}';

    @include {{component-name}}.{{component-name}};

  Register in packages/styles/scss/components/_index.scss:
    STABLE/UTILITY: add @use '{{ComponentName}}'; alphabetically (PascalCase dir name)
    PREVIEW: add commented out with TODO:
      // TODO: uncomment when {{ComponentName}} moves to stable
      // @use '{{ComponentName}}';

── Location B: packages/react/scss/components/{{component-name}}/ ──────────────
  (Note: directory name here uses kebab-case, matching side-panel, truncated-text)

  File: _index.scss:
    // Copyright IBM Corp. 2025
    // This source code is licensed under the Apache-2.0 license found in the
    // LICENSE file in the root directory of this source tree.

    @forward '@carbon/styles/scss/components/{{ComponentName}}';
    //                                        ↑ PascalCase — matches Location A dir

  File: _{{component-name}}.scss:
    // Copyright IBM Corp. 2025
    // This source code is licensed under the Apache-2.0 license found in the
    // LICENSE file in the root directory of this source tree.

    @forward '@carbon/styles/scss/components/{{ComponentName}}/{{component-name}}';
    //                                        ↑ PascalCase dir / kebab-case file

  IMPORTANT: packages/react/scss/components/_index.scss forwards '@carbon/styles/scss/components'
  wholesale — do NOT add individual @use entries there.

── Location C: story.scss (in the React component directory) ────────────────────
  PREVIEW component (styles NOT yet in the global @carbon/styles bundle):
    // {{ComponentName}} is a preview component — styles are not included in the
    // global @carbon/styles bundle yet. Load them explicitly here for Storybook.
    @use '@carbon/styles/scss/components/{{ComponentName}}';

  STABLE/UTILITY component (styles ARE in the global bundle via _index.scss):
    // Story-specific layout styles for {{ComponentName}}.
    // Component styles are provided globally through @carbon/styles.
    (add only story-layout-specific rules below — no component styles)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 6 — {{ComponentName}}.stories.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Rules — every one is mandatory:
  1. File extension: .js (NOT .jsx, NOT .tsx)
  2. First import: import './story.scss';  (side-effect, NOT ?inline)
  3. Then: import React from 'react';
  4. Carbon components: import Button from '../Button';
  5. Icons: import { Icon } from '@carbon/icons-react';
  6. Story title by status:
       STABLE UI:  'Components/{{ComponentName}}'
       PREVIEW:    'Preview/{{ComponentName}}'
       UTILITY:    'Utilities/{{ComponentName}}'
  7. CSF3 object syntax (NOT Template.bind({})):
       export const Default = { args: { … } };
  8. className MUST be hidden from controls:
       className: { table: { disable: true } }
  9. Node props with no valid control (children, iconButton) → map to a
     labelled select or hide from controls panel
  10. No parameters.styles — that was an ibm-products pattern
  11. Remove all TODO comments carried over from ibm-products source

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 7 — {{ComponentName}}.mdx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  import { Controls, Canvas, Story, Meta } from '@storybook/addon-docs/blocks';
  import * as {{ComponentName}}Stories from './{{ComponentName}}.stories';

  <Meta isTemplate />

  # {{ComponentName}}

  ## Table of Contents
  - [Overview](#overview)
  - [Example usage](#example-usage)
  - [Component API](#component-api)

  ## Overview
  (description copied + adapted from ibm-products MDX)

  ## Example usage

  <Canvas>
    <Story of={{{ComponentName}}Stories.Default} />
  </Canvas>

  ## Component API

  <Controls />

Rules:
  • Do NOT import CodesandboxLink
  • Do NOT import the component class itself
  • Story reference must match the EXACT named export in the .stories.js file
  • <Meta isTemplate /> MUST be the first JSX element — without it autodocs breaks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 8 — __tests__/{{ComponentName}}-test.js
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Location: packages/react/src/components/{{ComponentName}}/__tests__/{{ComponentName}}-test.js

Mandatory rules:
  1.  import React from 'react';
  2.  import { render, screen } from '@testing-library/react';
  3.  Carbon components: import { Button } from '../../Button';
  4.  Icons: import { Icon } from '@carbon/icons-react';
  5.  const prefix = 'cds';  — hardcoded, NEVER call usePrefix() at module scope
  6.  const blockClass = `${prefix}--{{component-name}}`;
  7.  Devtools assertion:
        expect(el).toHaveAttribute('data-component-name', componentName);
      NOT toHaveDevtoolsAttribute() — that matcher does not exist in Carbon core
  8.  Locale strings: use Unicode escapes for non-breaking spaces:
        '12\u00a0345,678'  not  '12 345,678'  (fr-CA uses U+202F narrow no-break space)
  9.  NO imports from: uuidv4, pkg, carbon (settings), global/js/utils
  10. ALL imports use relative paths — never '@carbon/react' or '@carbon/ibm-products'
  11. describe() label: use {{ComponentName}}.displayName (componentName const)
  12. Test names describe behaviour, not implementation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 9 — AVT e2e tests
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source (on GitHub): carbon-design-system/ibm-products
  e2e/components/{{ComponentName}}/{{ComponentName}}-test.avt.e2e.js  (may not exist)

Target: e2e/components/{{ComponentName}}/{{ComponentName}}-test.avt.e2e.js

If the source file exists, migrate it with these adaptations:

  ibm-products                        Carbon core
  ────────────────────────────────────────────────────────────────────
  import { … } from '@playwright/…'   const { … } = require('@playwright/test');
  import { visitStory } from '…'       const { visitStory } = require('../../test-utils/storybook');
  globals: { carbonTheme: 'white' }   globals: { theme: 'white' }
  component: '{{ComponentName}}'       PREVIEW: component: 'preview__{{ComponentName}}'
                                        STABLE:  component: '{{ComponentName}}'
  story id from ibm-products title     Recalculate from Carbon core title + export name:
                                          id = kebab(title.replace('/','-')) + '--' + kebab(exportName)
                                          e.g. 'Preview/BigNumber' + Default → 'preview-bignumber--default'
                                               'Components/SidePanel' + SlideOver → 'components-sidepanel--slide-over'
                                               'Utilities/TruncatedText' + WithTooltip → 'utilities-truncatedtext--with-tooltip'
  test.describe('X @avt', …)          test.describe('@avt {{ComponentName}}', …)
  Copyright 'yyyy, yyyy'               Update to current year range

  If a story referenced in the AVT test does NOT exist in Carbon core:
    → Add as test.skip() with a TODO comment explaining what must be added first
    → DO NOT invent or write tests for stories that don't exist
    → DO NOT create additional advanced-states tests beyond what ibm-products had

If the source AVT file does NOT exist in ibm-products:
  → Do not create one — no invented tests

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 10 — FINAL VERIFICATION CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Run before declaring done:

Component files:
  ☐ packages/react/src/components/{{ComponentName}}/ has ONLY the files from Step 1
  ☐ No _storybook-styles.scss, _carbon-imports.scss, _index-with-carbon.scss
  ☐ story.scss loads component styles only if NOT already in global bundle;
      if already in _index.scss — comment-only (double-@use causes Sass build error)
  ☐ stories file is .js not .jsx/.tsx
  ☐ No PropTypes — TypeScript interface is the only prop documentation
  ☐ Test file is in __tests__/{{ComponentName}}-test.js

TypeScript:
  ☐ No imports from '../../global/js/utils/', '../../settings', '@carbon/ibm-products'
  ☐ No `import PropTypes from 'prop-types'` and no `.propTypes = { … }` block
  ☐ forwardRef generic matches between parent and skeleton — no TS2322
  ☐ Skeleton rest-props is React.HTMLAttributes (not Record)
  ☐ blockClass declared inside the component function body (not at module level)

SCSS (all three locations):
  ☐ packages/styles/scss/components/{{ComponentName}}/ has _index.scss + _{{component-name}}.scss
  ☐ _{{component-name}}.scss uses $prefix from ../../config
  ☐ All styles inside @mixin {{component-name}} { }
  ☐ _index.scss follows exact @forward / @use / @include pattern
  ☐ packages/react/scss/components/{{component-name}}/ has _index.scss + _{{component-name}}.scss
      (kebab-case directory, forwarding to PascalCase path in @carbon/styles)
  ☐ packages/styles/scss/components/_index.scss entry added
      (active for stable/utility, commented with TODO for preview)
  ☐ packages/react/scss/components/_index.scss is NOT modified

packages/react/src/index.ts:
  ☐ Export block present — commented out with TODO for v12
  ☐ Comment includes reminder to remove from excludeProductsComponents when shipping

packages/react/product-migrated-components.mjs:
  ☐ Story glob added to productMigratedStoryGlobs
  ☐ Component glob added to excludeProductsComponents

Stories:
  ☐ import './story.scss'; is the first import (not ?inline)
  ☐ No parameters.styles
  ☐ Title follows Components/ Utilities/ or Preview/ convention per ADR 0007
  ☐ CSF3 object export syntax (not Template.bind({}))
  ☐ className hidden from controls

MDX:
  ☐ <Meta isTemplate /> present as first JSX element
  ☐ No CodesandboxLink import
  ☐ Story reference matches exact named export in .stories.js

Tests:
  ☐ prefix hardcoded as 'cds'
  ☐ No toHaveDevtoolsAttribute() — use toHaveAttribute('data-component-name', …)
  ☐ No uuidv4/pkg/carbon settings imports
  ☐ Locale test strings use unicode escapes for special whitespace

AVT:
  ☐ Uses require() not import
  ☐ globals.theme (not globals.carbonTheme)
  ☐ Story IDs recalculated for Carbon core Storybook title/export
  ☐ Missing stories are test.skip() with TODO — not invented
```

---

## Story Title / Storybook ID / Export Convention

| Status  | `title:`            | `index.ts` export       | `visitStory component:` | Story ID formula              |
| ------- | ------------------- | ----------------------- | ----------------------- | ----------------------------- |
| preview | `'Preview/Name'`    | `Name as preview__Name` | `'preview__Name'`       | `preview-name--story-name`    |
| stable  | `'Components/Name'` | `// TODO v12`           | `'Name'`                | `components-name--story-name` |
| utility | `'Utilities/Name'`  | `// TODO v12`           | `'Name'`                | `utilities-name--story-name`  |

Story ID derivation: `kebab(title.replace('/', '-')) + '--' + kebab(exportName)`

---

## Components to Migrate (ADR 0007)

| #   | Component           | ibm-products export                | Status  |
| --- | ------------------- | ---------------------------------- | ------- |
| 1   | Add and Select      | `MultiAddSelect / SingleAddSelect` | stable  |
| 3   | Coachmark           | `Coachmark`                        | stable  |
| 4   | Composable Card     | `Card`                             | preview |
| 5   | Condition Builder   | `ConditionBuilder`                 | preview |
| 6   | Full-Page Error     | `FullPageError`                    | stable  |
| 7   | Guide Banner        | `GuideBanner`                      | stable  |
| 8   | Inline Edit         | `EditInPlace`                      | stable  |
| 9   | Interstitial Screen | `InterstitialScreen`               | stable  |
| 10  | Notifications Panel | `NotificationsPanel`               | preview |
| 11  | Options Tile        | `OptionsTile`                      | stable  |
| 12  | Page Header         | `PageHeader`                       | stable  |
| 13  | Scroll Gradient     | `ScrollGradient`                   | utility |
| 15  | Tag Overflow        | `TagOverflow`                      | preview |
| 16  | Tearsheet           | `Tearsheet`                        | stable  |
| 18  | User Avatar         | `UserAvatar`                       | stable  |
