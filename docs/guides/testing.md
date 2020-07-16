# Testing

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Common test-related tasks](#common-test-related-tasks)
- [React](#react)
  - [Common tests for components](#common-tests-for-components)
    - [The component accepts a `ref`](#the-component-accepts-a-ref)
    - [The component accepts a `className`](#the-component-accepts-a-classname)
    - [The component accepts an `id`](#the-component-accepts-an-id)
    - [The component forwards props](#the-component-forwards-props)
    - [The component calls a function passed in as a prop](#the-component-calls-a-function-passed-in-as-a-prop)
    - [The component has translation ids for globalization](#the-component-has-translation-ids-for-globalization)
- [Sass](#sass)
  - [Common tests for styles](#common-tests-for-styles)
    - [Checking that a mixin exists](#checking-that-a-mixin-exists)
    - [Checking that a function exists](#checking-that-a-function-exists)
    - [Checking for the value of a variable](#checking-for-the-value-of-a-variable)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Common test-related tasks

| Task                      | Command         |
| ------------------------- | --------------- |
| Run the test suite        | `yarn test`     |
| Update a failing snapshot | `yarn test -u`  |
| Run end-to-end tests      | `yarn test:e2e` |

## React

When testing a component in React, we want to focus on several aspects of the
component including:

- Any automated accessibility checks we can make with tools like `axe` or
  `accessibility-checker`
- How we anticipate a user interacting with the component to perform certain
  actions
- How we anticipate a developer working with the component to build their UI
- How we anticipate this component working with other components in the system

As a result, each test for a component should loosely adhere to the following
format:

```js
describe('ComponentName', () => {
  // Write tests from the user's perspective at the top-level block. This could
  // be related to selecting items from a dropdown, sorting a table, expanding an
  // accordion, etc.
  //
  // These tests verify that the component operates as intended for an end-user
  it('should do X when user does Y', () => {
    // ...
  });

  // This block contains tools that we use to run AVT level 1 testing and can
  // assist in catching common errors when writing markup for components
  describe('automated accessibility checks', () => {
    it('should have no axe violations', async () => {
      // ...
    });

    it('should have no accessibility-checker violations', async () => {
      // ...
    });
  });

  // This block tests how developers will interact with the component through
  // its API (typically props). These tests will verify that any changes to the
  // API of the component adhere to semantic versioning.
  //
  // As a result, failling tests here should indicate that we have made a
  // semver-incompatible change in a component and it would require a major
  // release to ship the changes
  describe('Component API', () => {
    it('should support a custom `className` on the top-level node', () => {
      // ...
    });
  });
});
```

### Common tests for components

#### The component accepts a `ref`

#### The component accepts a `className`

#### The component accepts an `id`

#### The component forwards props

#### The component calls a function passed in as a prop

#### The component has translation ids for globalization

## Sass

The `@carbon/test-utils` package provides a `scss` entrypoint that you can use
to compile and test Sass in Carbon. The utilities exported by this package are
useful for verifying that the Public API of styles from Carbon stays consistent
across versions, and can help with testing more complex mixins or functions that
may be authored.

The current pattern for Sass in packages is to place the files in the
`<packageRoot>/scss` directory. Tests for sass should live under the
`<packageRoot>/__tests__/` directory and should be named after their
corresponding Sass file.

For example, if we were working in the `themes` package, with a mixins file
available at `themes/scss/mixins.scss` then we would name the test file
`themes/__tests__/mixins-test.js`

To test a Sass file, you will need to bring in `@carbon/test-utils/scss` and
create a sass renderer. With this renderer, you can write a stylesheet in the
test itself. Imports in this stylesheet are relative to the test file, and you
can use a custom `test` function to interop between Sass and JavaScript. This
makes it useful to test specific values or get the result of calling specific
functions.

```js
// mixins-test.js
const { createSassRenderer } = require('@carbon/test-utils/scss');

const render = createSassRenderer(__dirname);

describe('_mixins.scss', () => {
  it('should export a carbon--theme mixin', async () => {
    const { calls } = await render(`
      @import '../scss/mixins';
      $t: test(mixin-exists(carbon--theme));
    `);
    expect(calls[0][0].getValue()).toBe(true);
  });
});
```

### Common tests for styles

#### Checking that a mixin exists

#### Checking that a function exists

#### Checking for the value of a variable
