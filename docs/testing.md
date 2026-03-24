# Testing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

<!-- END doctoc generated TOC please keep comment here to allow auto update --> <!-- prettier-ignore-end -->

## Overview

| Task                                                  | Command                                            |
| :---------------------------------------------------- | :------------------------------------------------- |
| Run package test                                      | `yarn test:e2e`                                    |
| Run playwright tests                                  | `yarn playwright test`                             |
| Run a specific playwright test                        | `yarn playwright test path/to/test-e2e.js`         |
| Run playwright tests in a specific browser            | `yarn playwright test --browser=chromium`          |
| Run playwright tests in a specific project            | `yarn playwright test --project=chromium`          |
| Debug playwright tests                                | `yarn playwright test --debug`                     |
| Run playwright with browser visible                   | `yarn playwright test --project=chromium --headed` |
| Run playwright tests that match a specific tag        | `yarn playwright test --grep @tag-name`            |
| Run playwright tests that do not match a specific tag | `yarn playwright test --grep-invert @tag-name`     |

## End-to-end

We use our end-to-end tests to verify the packaging of libraries along with the
look and behavior of components in our design system. End-to-end tests for
packages are run using Jest, components are run using Playwright.

### Playwright

We use Playwright to run end-to-end tests against our components in our Design
System. We also use it in other situations to prevent visual regressions, like
in our elements site.

These tests are authored within the `e2e` directory and match the file pattern:
`*-test.e2e.js`.

#### Tags

Playwright tests are divided into different tag categories for reporting
purposes. `@avt` test tags are used to populate accessibility test statuses
within component pages on https://carbondesignsystem.com

For avt tests, the test title should always include one of the following:

| Tag                    | Description                                                                                                                    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `@avt`                 | High level/root tag that should wrap all avt tests. This is usually placed in a `describe` block title.                        |
| `@avt-default-state`   | Sub-tag of `@avt`, used to tag individual tests covering the default state of a component.                                     |
| `@avt-advanced-states` | Sub-tag of `@avt`, used to tag individual tests covering advanced states of a component (open/close, invalid, expanded, etc.). |
| `@avt-keyboard-nav`    | Sub-tag of `@avt`, used to tag individual tests covering keyboard navigation flows.                                            |

#### Developing

When working with Playwright locally, it's important to start up the service
that you're testing against. For components in React, this will mean starting up
the React storybook locally by doing the following from the root of the project:

```bash
cd packages/react
yarn storybook
```

Once the storybook is loaded, you can run tests against it using the storybook
test-utils found in `e2e/test-utils/storybook`.

You can do this by writing the following:

```js
// e2e/components/component/component-test.e2e.js

'use strict';

const { test } = require('@playwright/test');
const { themes } = require('../../test-utils/env');
const { visitStory } = require('../../test-utils/storybook');

test.describe('component-name @vrt', () => {
  themes.forEach((theme) => {
    test(theme, async ({ page }) => {
      await visitStory(page, {
        component: 'component',
        story: 'story-name',
        globals: { theme },
      });
    });
  });
});
```

If you would like to debug or interact with the test suite, you can use
Playwright's VS Code integration or run `yarn playwright test` with the
`--debug` flag to open up the inspector. This will allow you to go through the
test step-by-step to debug what's going on. It will also allow you to interact
with the page to quickly find selectors you can use to find items to run tests
against.

## FAQ

### Why am I seeing `browserType.launch: Executable doesn't exist at ../path`?

The browser executables need to be installed so that Playwright can run tests
inside Chromium, Firefox, etc. They can be installed by running
`yarn playwright install`
