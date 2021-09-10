<!--
Inspired by Uber's Go Style Guide:
https://github.com/uber-go/guide/blob/85bf203f4371a8ae9e5e9a4d52ea77b17ca04ae6/style.md

Editing this document:

- Update the table of contents as new sections are added or removed. You can use
  `yarn doctoc docs/style.md` to accomplish this
- Use tables for side-by-side code samples. See below.

Code Samples:

Use 2 spaces to indent. Horizontal real estate is important in side-by-side
samples.

For side-by-side code samples, use the following snippet.

~~~
<table>
<thead><tr><th>Unpreferred</th><th>Preferred</th></tr></thead>
<tbody>
<tr><td>

```jsx
UNPREFERRED CODE GOES HERE
```

</td><td>

```jsx
PREFERRED CODE GOES HERE
```

</td></tr>
</tbody></table>
~~~

(You need the empty lines between the <td> and code samples for it to be
treated as Markdown.)

If you need to add labels or descriptions below the code samples, add another
row before the </tbody></table> line.

~~~
<tr>
<td>DESCRIBE UNPREFERRED CODE</td>
<td>DESCRIBE PREFERRED CODE</td>
</tr>
~~~

-->

# Carbon Style Guide

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Introduction](#introduction)
- [JavaScript](#javascript)
  - [Style](#style)
    - [Be explicit](#be-explicit)
- [React](#react)
  - [Guidelines](#guidelines)
    - [Writing a component](#writing-a-component)
    - [Translating a component](#translating-a-component)
      - [Working with messages that depend on state](#working-with-messages-that-depend-on-state)
    - [Using `useCallback` and `useMemo`](#using-usecallback-and-usememo)
    - [Hooks that rely on refs](#hooks-that-rely-on-refs)
    - [Hooks that use a callback](#hooks-that-use-a-callback)
  - [Style](#style-1)
    - [Naming event handlers](#naming-event-handlers)
    - [Naming experimental code](#naming-experimental-code)
- [Sass](#sass)
  - [Guidelines](#guidelines-1)
    - [Author component styles using mixins](#author-component-styles-using-mixins)
    - [Use design tokens where appropriate](#use-design-tokens-where-appropriate)
    - [Avoid nesting selectors](#avoid-nesting-selectors)
    - [Use only as much specificity as needed](#use-only-as-much-specificity-as-needed)
    - [Use the global `$prefix` variable](#use-the-global-prefix-variable)
    - [Annotate relevant Sass values with SassDoc](#annotate-relevant-sass-values-with-sassdoc)
  - [Style](#style-2)
    - [Comments](#comments)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Introduction

This guide covers how we prefer to write code for the Carbon Design System. As a
result, this document will evolve and change over time as we explore new
concepts, learn from our mistakes, and grow the number of languages that we
target or support as a design system.

Guidelines or practices outlined in this document are meant to help us as a
group build stable and reliable software. What this means to the developer may
change depending on the environment in which one writes code.

At the end of the day, we as a group hold the following values about writing
code:

- No abstraction is better than the wrong abstraction
- Prefer learning patterns over libraries or frameworks
- Prefer few abstractions and lots of repetition
- When creating abstractions, only fix or update code if repetition or patterns
  lead to bugs. Make sure the abstraction is worth its weight

_Inspired by
[Minimal API Surface Area](https://www.youtube.com/watch?v=4anAwXYqLG8)_

## JavaScript

### Style

#### Be explicit

<table>
<thead><tr><th>Unpreferred</th><th>Preferred</th></tr></thead>
<tbody>
<tr><td>

```jsx
const add = (a, b) => a + b;
```

</td><td>

```jsx
const add = (a, b) => {
  return a + b;
};
```

</td></tr>
</tbody></table>

Certain features in JavaScript have implicit behavior. One of these that we see
most often is the implicit return behavior of arrow function expressions, for
example:

```js
const add = (a, b) => a + b;
```

We've found that, while this style is terse and compact, it can be at odds with
the fact that code is revisited often and that developers need to peak inside
sometimes to see what is going on. For example, if we needed to debug a specific
value in the function above then we would go through the following steps:

```js
// Step 1. The code as originally authored
const add = (a, b) => a + b;

// Step 2. Update the code to no longer use the implicit return
const add = (a, b) => {
  return a + b;
};

// Step 3. Add any debugging code or ways to introspect its values
const add = (a, b) => {
  console.log(a);
  return a + b;
};

// Step 4. Undo these changes and bring back to original format
const add = (a, b) => a + b;
```

If instead we had written this code without the implicit return then we would
have saved three out of the four steps above. As a result, we tend to favor
being explicit in how JavaScript is written instead of relying on implicit
behavior.

## React

### Guidelines

#### Writing a component

In general, we prefer to author components using functions instead of classes.
This means that we take advantage of built-in and custom
[hooks](https://reactjs.org/docs/hooks-intro.html) to provide state-based
behavior inside of a component.

At a high-level, the structure of a component will mirror the following:

```jsx
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

function MyComponent({
  // Prefer default argument values to `defaultProps`
  initialValue = 0,
}) {
  // State-related behavior
  const [state, setState] = useState(initialValue);
  // Constants and other variables
  const value = 1;

  // Handlers
  function onClick() {
    // ...
  }

  // Effects
  useEffect(() => {
    // ...
  }, []);

  // Output
  return <button onClick={onClick}>Output</button>;
}

MyComponent.propTypes = {
  /**
   * Description of what this prop is for
   */
  initialValue: PropTypes.number,
};
```

_Note: not every component will mirror the structure above. Some will need to
incorporate `useEffect`, some will not. You can think of the outline above as
slots that you can fill if you need this functionality in a component._

#### Translating a component

Certain components will need to expose a way for the caller to pass in
translated strings. For a wide variety of components, this should be done
through props. However, if there are situations where props don't make sense or
the data that needs to be translated depends on state or is nested you will need
to use the following strategy to translate a component.

For component translation, you will need to define a map of translation ids and
their corresponding default values, along with a default `translateWithId` prop.
For example:

```js
const translationIds = {
  'carbon.component-name.field': 'Default value',
  'carbon.component-name.other-field': 'Other value',
};

function translateWithId(messageId) {
  return translationIds[messageId];
}

function MyComponent({ translateWithId: t = translateWithId }) {
  return (
    <>
      <span>t('carbon.component-name.field')</span>
      <span>t('carbon.component-name.other-field')</span>
    </>
  );
}
```

The `id`s used in `translationIds` should be consistent between major versions.
Changing one will represent a breaking change for the component.

These translation message `id`s should be specified in the component
documentation page.

##### Working with messages that depend on state

If it seems like your translation requires state in order to be translated
correctly, consider creating specific message ids for each state value.

For example, when working with something that can be sorted in ascending or
descending order you could create two message ids and choose, based on state,
which one to use.

```jsx
function MyComponent({ translateWithId: t = translateWithId }) {
  const [sortDirection, setSortDirection] = useState('ASC');

  function onClick() {
    if (sortDirection === 'ASC') {
      setSortDirection('DESC');
    } else {
      setSortDirection('ASC');
    }
  }

  return (
    <>
      <span>
        {sortDirection === 'ASC'
          ? t('carbon.component-name.sort.ascending')
          : t('carbon.component-name.sort.descending')}
      </span>
      <button onClick={onClick}>t('carbon.component-name.toggle-sort')</button>
    </>
  );
}
```

If the message depends on a state value, for example a count, then you should
pass along this information as a state argument to `translateWithId`.

```jsx
function MyComponent({ translateWithId: t = translateWithId }) {
  const [count, updateCount] = useState(0);
  const translationState = {
    count,
  };

  return (
    <>
      <span>The current count is:
      {t('carbon.component-name.display-count'), translationState}</span>
      <button onClick={() => updateCount(count + 1)}>
        {t('carbon.component-name.increment-count')}</span>
      </button>
    </>
  );
}
```

#### Using `useCallback` and `useMemo`

`useCallback` and `useMemo` can be incredibly useful tools in certain
situations. In general, however, we try to avoid them unless one of the
following conditions occur:

- The identitiy of a function or object is required as a dependency in a
  dependency array
- We have observed performance issues due to allocations that can be reproduced
  and resolved using these techniques

This practice is to avoid introducing `useCallback` and `useMemo` prematurely,
which can create extra work for our components to perform.

A rule of thumb for this is to understand how frequently a dependency will
update that is given to `useCallback` or `useMemo`. If a dependency is likely to
update frequently, then React will have to perform comparisons and re-run
callback to `useCallback` and `useMemo`. This would be slower than creating a
new function each render instead.

#### Hooks that rely on refs

When designing hooks that require a reference to a DOM node (using a `ref`) you
should design the hook to take in a `ref` as an argument instead of creating a
`ref` on behalf of the caller.

This is important when a caller decides to use multiple hooks that rely on a
`ref`. For example,

```jsx
function MyComponent() {
  const [ref1, isHovering] = useHover();
  const [ref2, isDragging] = useDrag();

  // How should the caller merge these two refs?
}
```

If, instead, these hooks took in a `ref` we could have the caller manage the
`ref` and pass it into the hooks.

```jsx
function MyComponent() {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const isDragging = useDrag(ref);

  // Caller has to add `ref` to a node below
}
```

#### Hooks that use a callback

Often times, you will want to author a hook that executes a given function when
something happens. For example, we could have a hook called `useEvent` that will
execute a function whenever the event is triggered:

```js
useEvent(window, 'click', (event) => {
  // Called when the click event fires
});
```

When you write a hook that uses a pattern like this, you may run into a problem
where you want to call the callback in a `useEffect` block, but you don't want
that effect to fire every time the callback changes.

From our `useEvent` hook above, this would come up when adding the event
listener to the document:

```js
function useEvent(element, eventName, callback) {
  // ...

  useEffect(() => {
    element.addEventListener(eventName, callback);
    return () => {
      element.removeEventListener(eventName, callback);
    };
  }, [element, eventName, callback]);

  // ...
}
```

In the code snippet above, the effect specified in `useEffect` will trigger any
time the element changes, the event changes, or the callback changes. However,
we only would want the listener re-attached any time the element or event name
changes, not when the callback changes.

To separate out the callback changes from changes in our effect's dependencies,
you can use the saved callback pattern:

```js
function useEvent(element, eventName, callback) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function listener(event) {
      savedCallback.current(event);
    }
    element.addEventListener(eventName, listener);
    return () => {
      element.removeEventListener(eventName, listener);
    };
  }, [element, eventName]);
}
```

By saving our callback in a `ref`, we're able to keep track of changes to the
callback that we receive without having to re-run our `useEffect` block every
time it changes.

### Style

#### Naming event handlers

<table>
<thead><tr><th>Unpreferred</th><th>Preferred</th></tr></thead>
<tbody>
<tr><td>

```jsx
function MyComponent() {
  function click() {
    // ...
  }
  return <button onClick={click} />;
}
```

</td><td>

```jsx
function MyComponent() {
  function onClick() {
    // ...
  }
  return <button onClick={onClick} />;
}
```

</td></tr>
<tr><td>

```jsx
function MyComponent({ onClick }) {
  function handleClick(event) {
    // ...
    onClick(event);
  }
  return <button onClick={handleClick} />;
}
```

</td><td>

```jsx
function MyComponent({ onClick }) {
  function handleOnClick(event) {
    // ...
    onClick(event);
  }
  return <button onClick={handleOnClick} />;
}
```

</td></tr>
</tbody></table>

When writing event handlers, we prefer using the exact name, `onClick` to a
shorthand. If that name is already being used in a given scope, which often
happens if the component supports a prop `onClick`, then we prefer to specify
the function as `handleOnClick`.

#### Naming experimental code

The team occasionally will author code, or accept contributions, that is
considered experimental or unstable. The goal for this code is to ship it as
unstable for sponsor groups to leverage. During this time, the team can get
feedback around what is working and what does not work so that changes can be
made before an official release.

For experimental or unstable code, we use the `unstable_` prefix. For example:

```js
// An unstable method
function unstable_layout() {
  // ...
}

// An unstable variable
const unstable_meta = {
  // ...
};

// An unstable component will retain its name, specifically for things like
// the rules of hooks plugin which depend on the correct casing of the name
function Pagination(props) {
  // ...
}

// However, when we export the component we will export it with the `unstable_`
// prefix. (Similar to React.unstable_Suspense, React.unstable_Profiler)
export { default as unstable_Pagination } from './components/Pagination';
```

For teams using these features, they will need to import the functionality by
using the `unstable_` prefix. For example:

```jsx
import { unstable_Pagination as Pagination } from 'carbon-components-react';
```

This code should be treated as experimental and will break between release
versions for the package that it is being imported from.

### Testing

#### Strategy

In general we aim to test components from a user-focused perspective. This means
avoiding testing implementation details, and instead focusing on writing tests
that closely resemble how the components are used. The various `testing-library`
packages are used to encourage this mindset when writing and composing test
suites.

#### Organization

Every component should have tests covering a series of Categories

- General component functionality/API
- Accessibility
- End to end tests
- Server side rendering

Each of these are separated into individual files. In some cases the syntax may
be slightly different and separate files make this easier to understand.
Additionally separate file types can be more easily globbed to only run certain
tests in certain environments (local, CI, Pre-release checks, etc).

| File name                    | Category                        |
| ---------------------------- | ------------------------------- |
| `ComponentName-test.js`      | General component functionality |
| `ComponentName-test.a11y.js` | Accessibility testing           |
| `ComponentName-test.e2e.js`  | End to end tests                |
| `ComponentName-test.ssr.js`  | Server side rendering           |

There are corresponding commands to run all categories, individual categories,
or a combination. Depending on your shell, modifiers can be used to run two
commands one after another. Refer to the documentation of your shell.

| Command                           | Corresponding test category                                          |
| --------------------------------- | -------------------------------------------------------------------- |
| `yarn test`                       | All categories                                                       |
| `yarn test:unit`                  | Only component unit tests                                            |
| `yarn test:a11y`                  | Only accessibility tests                                             |
| `yarn test:ssr`                   | Only server side tests                                               |
| `yarn test:a11y && yarn test:e2e` | In `bash` via `&&`: Run the a11y tests, and if they succeed, run e2e |

#### Recipes

Below are some common recipes for component testing. Many of the pattern/syntax
details contained within these recipes are enforced via eslint rules declared in
`eslint-config-carbon`.

##### `ComponentName-test.js`

- Use `@testing-library/react`
  - Render using `render()`
  - Query using `screen()`, prefer
    [queries accessible to everyone](https://testing-library.com/docs/queries/about#priority)
  - Simulate events with `userEvent`
- Format with `describe`/`it` blocks
- Use [`jest-dom`](https://github.com/testing-library/jest-dom) matchers for
  assertions

```js
import { render, screen, findByLabel } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  describe('API', () => {
    it('should provide a data-testid attribute on the outermost DOM node', () => {
      const { container } = render(<ComponentName className="test" />);
      expect(screen.getByTestId('component-test-id')).toBeInTheDocument();
      expect(container.firstChild).toHaveAttribute('class', 'test');
    });

    it('should place the `className` prop on the outermost DOM node', () => {
      const { container } = render(<ComponentName className="test" />);
      expect(container.firstChild).toHaveAttribute('class', 'test');
    });

    it('should place extra props on the outermost DOM node', () => {
      const { container } = render(<ComponentName data-testid="test" />);
      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    describe('i18n', () => {
      // ... ensure when each prop string is configured it is rendered to the DOM
    });

    // id
    // -----
    // When a component accepts an id prop, it's important
    // that the node on which the id is placed is consistent
    // between minor versions. As a result, tests that you
    // write for id should make assertions around id being
    // placed on the same node.
    it('should place the `id` prop on the same DOM node between minor versions', () => {
      const { container } = render(<ComponentName data-testid="test" />);
      expect(container.firstChild).toHaveAttribute('id', 'test');
    });

    // Event Handlers
    // -----
    // When a component accepts an `onClick` or `onChange` prop
    // it can be helpful to make assertions about when these
    // props are called and what they are called with in order
    // to test the Public API of the component.
    // To make assertions on a function, such as whether its
    // been called or what it has been called with, we can make
    // use of Jest's `jest.fn()` method to create mock
    // functions. We can then make assertions on these mock
    // functions.
    it('should call `onClick` when the trigger element is pressed', () => {
      const onClick = jest.fn();

      render(<TestComponent onClick={onClick} />);

      const trigger = screen.getByText('trigger');
      userEvent.click(trigger);
      expect(onClick).toHaveBeenCalled();
    });

    // Optional ref tests
    // A component that accepts a ref falls in one of three scenarios:
    // 1. A class component
    // 2. A component that uses React.forwardRef and placed
    //    it on an HTML element
    // 3. A component that uses React.forwardRef and uses
    //    useImperativeHandle to decorate the ref (this is
    //    uncommon but can come up)
  });
});
```

##### `ComponentName-test.a11y.js`

- Use `accessibility-checker` and `axe`
- Optionally configure common props to ensure component variants do not contain
  accessibility errors.
- Always use the destructured `container` from `render()` to ensure the entire
  DOM tree is validated before and after interaction.

```js
describe('ComponentName AVT1', () => {
  it('should have no aXe violations', async () => {
    const { container } = render(<ComponentName />);
    await expect(container).toHaveNoAxeViolations();
  });

  it('should have no AC violations', async () => {
    const { container } = render(<ComponentName />);
    await expect(container).toHaveNoACViolations('ComponentName');
  });
});
```

##### `ComponentName-test.server.js`

```js
/**
 * @jest-environment node
 */
import ReactDOMServer from 'react-dom/server';
import { ComponentName } from '../ComponentName';

describe('ComponentName - SSR', () => {
  it('should import ComponentName in a node/server environment', () => {
    expect(ComponentName).not.toThrow();
  });

  it('should not use document/window/etc', () => {
    expect(ReactDOMServer.renderToStaticMarkup(ComponentName)).not.toThrow();
  });
});
```

##### Notes on manual testing

- [The A11Y Project checklist](https://www.a11yproject.com/checklist/) is a
  great resource listing a range of issues to check for that cover a wide range
  of disability conditions.
- Due to
  [the complexity of screenreader testing](https://webaim.org/articles/screenreader_testing/),
  all screen reader testing is done manually.

## Sass

### Guidelines

#### Author component styles using mixins

When authoring the styles for a component, it's important that we use
[`mixins`](https://sass-lang.com/documentation/at-rules/mixin) to allow
developers to control when the CSS for a specific component gets emitted. For
example:

```scss
// src/components/accordion/_accordion.scss

/// Accordion
/// @access private
/// @group accordion
@mixin accordion {
  .#{$prefix}--accordion {
    // ...
  }
}
```

Authoring component styles under a mixin allows the design system to:

- Control when the CSS for accordion gets emitted, or not emitted, from the
  library
- Allows us to author experimental or future styles in a separate mixin and
  toggle its inclusion through feature flags
- Could allow developers consuming the design system to control when styles get
  emitted

#### Use design tokens where appropriate

We have a number of Sass variables available in the project to be used as design
tokens when building out a component. Almost always you will want to leverage
these instead of hard coding values for colors, type, or even spacing. You can
visit the following SassDoc links to view all of the design tokens relevant to
this project:

- [Color](../packages/theme/docs/sass.md)
- [Layout](../packages/layout/docs/sass.md)
- [Motion](../packages/motion/docs/sass.md)
- [Type](../packages/type/docs/sass.md)

#### Avoid nesting selectors

Nesting selectors is often a convenient and fast way to author styles in Sass.
Unfortunately, they also add a performance and maintenance burden for the design
system. The performance burden is due to the generated nature of selectors which
can lead to unexpected CSS bundle bloat. The maintenance burden manifests itself
in a way that makes it harder to find specific selectors while working on the
codebase. For example, if we are looking for the selector `.component:focus` in
the following file:

```scss
// Early on in the file
.component {
  // ...
}

// ...

// Later on in the file
.component {
  &:focus {
    // ...
  }
}
```

It can be difficult to track down the specific `.component:focus` selector
without having to navigate through the file and relevant matches to see where
`&:focus` is being defined. While this may be hard to visualize in a short code
snippet, as file size grows and our Sass is rewritten or updated, this problem
becomes increasingly obvious.

#### Use only as much specificity as needed

It's important that we write selectors that use only as much specificity as
needed. Ideally, we would only need one selector per component but this is
rarely the case. As a result, adding specificity should be done sparingly or
when including it is helpful when building a component. For example, if you
would like to enforce a specific element or ARIA attribute then using this
attribute in a selector would be appropriate:

```scss
button[aria-expanded='false'] {
  // ...
}
```

If we compared this to a class selector, for example `.my-component__button`,
then we may consider this as adding more specificity than needed. However, for
the design system it is more important that the component itself implements this
contract for accessibility.

#### Use the global `$prefix` variable

When writing selectors, always include the global `$prefix` variable. This value
is used to namespace all of the selectors that we ship in the design system.

<table>
<thead><tr><th>Unpreferred</th><th>Preferred</th></tr></thead>
<tbody>
<tr><td>

```scss
.my-component {
  // ...
}
```

</td><td>

```scss
.#{$prefix}--my-component {
  // ...
}
```

</td></tr>
</tbody></table>

#### Annotate relevant Sass values with SassDoc

When authoring functions, mixins, or values that are intended to be shared, you
should leverage SassDoc. The typical format we use includes the following
information:

```scss
/// <Details about the mixin>
/// @access <public|private>
/// @group <name-of-group>
@mixin my-component {
  // ...
}
```

### Style

#### Comments

When annotating individual selectors or properties, you should add an inline
comment above the piece of code you're commenting.

<table>
<thead><tr><th>Unpreferred</th><th>Preferred</th></tr></thead>
<tbody>
<tr><td>

```scss
.#{$prefix}--my-component {
  width: 100%; // Comment about why we need 100% width
}
```

</td><td>

```scss
.#{$prefix}--my-component {
  // Comment about why we need 100% width
  width: 100%;
}
```

</td></tr>
</tbody></table>

When annotating a section of a Sass file, it is helpful to use the following
banner comment style:

```scss
//----------------------------------------------------------------------------
// Section name
//----------------------------------------------------------------------------
```

_Note: this banner should be formatted to span 80 columns_

When writing SassDoc comments, you should use three forward slashes:

```scss
/// This is a comment for SassDoc
/// @access public
.#{$prefix}--my-component {
  // ...
}
```

### Testing

We use the `@carbon/test-utils` package to test our Sass styles in JavaScript.
Inside of this package, there is a `SassRenderer` module that you can bring in
that allows you to get values from Sass in JavaScript to be used in test
assertions.

The basic template for tests for Sass files will look like:

```js
/**
 * <COPYRIGHT>
 *
 * @jest-environment node
 */

'use strict';

const { SassRenderer } = require('@carbon/test-utils/scss');

const { render } = SassRenderer.create(__dirname);

describe('@carbon/styles/scss/config', () => {
  test('Public API', async () => {
    const { get } = await render(`
      // You can bring in modules using the path from the test file
      @use '../path/to/sass/module';

      $test: true;

      // The `get` helper will let you pass a value from Sass to JavaScript
      $_: get('test', $test);
    `);

    // get('<key>') gives you both the JavaScript representation of a value
    // along with the `nativeValue` which comes from Dart sass. Use `.value`
    // to get the JavaScript value and make assertions
    expect(get('test').value).toBe(true);
  });
});
```

#### Recipes

##### Public API

Sometimes it is useful to assert that a module's Public API matches what is
expected or does not change between versions. To do this in a test file, you can
use the `sass:meta` module along with several helpers for getting the variables
and functions from a module. Unfortunately, mixins need to be checked by hand
using the `mixin-exists` function from `sass:meta`.

```js
test('Public API', async () => {
  await render(`
    @use 'sass:meta';
    @use '../path/to/module';

    // Get the variables for the module under the namespace `module`
    $_: get('variables', meta.module-variables('module'));

    // Get the functions for the module under the namespace `module`
    $_: get('variables', meta.module-functions('module'));

    // Verify that a mixin exists, optionally within a module
    $_: get('mixin-name', meta.mixin-exists('mixin-name', 'module');
  `);
});
```
