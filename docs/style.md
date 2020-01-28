<!-- alex disable hooks -->

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
  - [Style](#style-1)
    - [Naming event handlers](#naming-event-handlers)
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
group build stable and reliable sofware. What this means to the developer may
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
