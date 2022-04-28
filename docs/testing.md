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

#### Developing

When working with Playwright locally, it's important to start up the service
that you're testing against. For components in React, this will mean starting up
the React storybook locally.

One the storybook is loaded, you can run tests against is using the storybook
test-utils found in `e2e/test-utils/storybook`. A common use-case for testing a
component is to use Percy to take a snapshot of a component in a particular
theme from a specific story in storybook.

If you would like to debug or interact with the test suite, you can use
Playwright's VS Code integration or run `yarn playwright test` with the
`--debug` flag to open up the inspector. This will allow you to go through the
test step-by-step to debug what's going on. It will also allow you to interact
with the page to quickly find selectors you can use to find items to run tests
against.

## FAQ

### Why am I seeing `browserType.launch: Executable doesn't exist at ../path`?

The browser executables need to be installed so that playwright can run tests
inside chromium, firefox, etc. They can be installed by running
`yarn playwright install`
