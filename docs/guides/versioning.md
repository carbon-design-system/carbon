# Versioning

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Overview](#overview)
- [`carbon-components-react`, `@carbon/react`](#carbon-components-react-carbonreact)
  - [Changes](#changes)
  - [Examples](#examples)
    - [A change is made to component typings/definitions](#a-change-is-made-to-component-typingsdefinitions)
    - [A new prop is added to a component](#a-new-prop-is-added-to-a-component)
    - [An existing prop is deprecated](#an-existing-prop-is-deprecated)
    - [An existing prop is removed](#an-existing-prop-is-removed)
    - [An existing prop type is changed to be more specific](#an-existing-prop-type-is-changed-to-be-more-specific)
    - [An existing prop type is changed to be more generic](#an-existing-prop-type-is-changed-to-be-more-generic)
    - [A `PropTypes.func` prop type is changed to have different arguments](#a-proptypesfunc-prop-type-is-changed-to-have-different-arguments)
    - [A `PropTypes.func` prop type is changed to have additional arguments](#a-proptypesfunc-prop-type-is-changed-to-have-additional-arguments)
    - [A `PropTypes.func` prop type is changed to have fewer arguments](#a-proptypesfunc-prop-type-is-changed-to-have-fewer-arguments)
    - [The DOM node that an `id` corresponds to is changed](#the-dom-node-that-an-id-corresponds-to-is-changed)
    - [The DOM node that an `aria-label` corresponds to is changed](#the-dom-node-that-an-aria-label-corresponds-to-is-changed)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Overview

The Carbon Design System team aims to follow
[Semantic Versioning](https://semver.org/) (semver) for each of the packages
that we ship. From semver.org, this means that:

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> 1. **MAJOR** version when you make incompatible API changes,
> 2. **MINOR** version when you add functionality in a backwards compatible
>    manner, and
> 3. **PATCH** version when you make backwards compatible bug fixes.
>
> _Additional labels for pre-release and build metadata are available as
> extensions to the MAJOR.MINOR.PATCH format._

As a result, whenever you see a `minor` or `patch` update for a package from the
Carbon Design System you should feel confident that you can update without
anything breaking in your project.

**Note:** If you ever bring in an update and it does break something in your
project, please create an
[issue](https://github.com/carbon-design-system/carbon/issues/new?assignees=&labels=type%3A+bug+%F0%9F%90%9B&template=bug-report.md&title=Breaking%20change)
and we will resolve the issue as quickly as possible.

In the following sections, you'll find specific details for our packages and the
types of changes you can expect to occur as a consumer of that package. We'll
try to highlight common changes in code and the corresponding `semver` bump that
you can expect for the package when it is updated.

## `carbon-components-react`, `@carbon/react`

### Changes

| Type of change                                                      | semver bump |
| ------------------------------------------------------------------- | ----------- |
| A change is made to component typings/definitions                   | `patch`     |
| A new prop is added to a component                                  | `minor`     |
| An existing prop is deprecated                                      | `minor`     |
| An existing prop is removed                                         | `major`     |
| An existing prop type is changed to be more specific                | `major`     |
| An existing prop type is changed to be more generic                 | `minor`     |
| A `PropTypes.func` prop type is changed to have different arguments | `major`     |
| A `PropTypes.func` prop type is changed to have additional argument | `minor`     |
| A `PropTypes.func` prop type is changed to have fewer arguments     | `major`     |

### Examples

#### A change is made to component typings/definitions

semver bump: **minor**

Typescript definitions for component APIs are provided on an as-is basis and are
not bound to semver. This includes type additions, changes, or removals.
Breaking changes may happen across patch or minor versions. The component API
may shift and types could become outdated.

If a typing is out of date or incorrect, please let us know by opening an issue
or even better, propose a fix via PR! We appreciate the community's involvement
in this effort to keep component types up to date and as correct as possible!
:pray:

#### A new prop is added to a component

semver bump: **minor**

```diff
function ExampleComponent({
  propA,
+  propB,
}) {
  return (
    <>
      <span>{propA}</span>
+      <span>{propB}</span>
    </>
  );
}

ExampleComponent.propTypes = {
  propA: PropTypes.string,
+  propB: PropTypes.string,
};
```

#### An existing prop is deprecated

semver bump: **minor**

```diff
function ExampleComponent({ propA, propB }) {
  return (
    <>
      <span>{propA}</span>
      <span>{propB}</span>
    </>
  );
}

ExampleComponent.propTypes = {
  propA: PropTypes.string,
-  propB: PropTypes.string,
+  propB: deprecate(PropTypes.string),
};
```

#### An existing prop is removed

semver bump: **major**

```diff
function ExampleComponent({
  propA,
-  propB,
}) {
  return (
    <>
      <span>{propA}</span>
-      <span>{propB}</span>
    </>
  );
}

ExampleComponent.propTypes = {
  propA: PropTypes.string,
-  propB: deprecate(PropTypes.string),
};
```

#### An existing prop type is changed to be more specific

semver bump: **major**

```diff
function ExampleComponent({ propA, propB }) {
  return (
    <>
      <span>{propA}</span>
      <span>{propB}</span>
    </>
  );
}

ExampleComponent.propTypes = {
  propA: PropTypes.string,
-  propB: PropTypes.node,
+  propB: PropTypes.string,
};
```

#### An existing prop type is changed to be more generic

semver bump: **minor**

```diff
function ExampleComponent({ propA, propB }) {
  return (
    <>
      <span>{propA}</span>
      <span>{propB}</span>
    </>
  );
}

ExampleComponent.propTypes = {
  propA: PropTypes.string,
-  propB: PropTypes.string,
+  propB: PropTypes.node,
};
```

#### A `PropTypes.func` prop type is changed to have different arguments

semver bump: **major**

```diff
import { SomeComponent } from 'carbon-components-react';

function ExampleComponent() {
  function onChange(arg) {
    // If a or b change types (from number to string) or if they are removed
    // (a or b no longer exists)
    const { a, b } = arg;
  }

  return <SomeComponent onChange={onChange} />;
}
```

#### A `PropTypes.func` prop type is changed to have additional arguments

semver bump: **minor**

```diff
import { SomeComponent } from 'carbon-components-react';

function ExampleComponent() {
-  function onChange(a, b) {
+  function onChange(a, b, c) {
    // ...
  }

  return <SomeComponent onChange={onChange} />;
}
```

#### A `PropTypes.func` prop type is changed to have fewer arguments

semver bump: **major**

```diff
import { SomeComponent } from 'carbon-components-react';

function ExampleComponent() {
-  function onChange(a, b, c) {
+  function onChange(a, b) {
    // ...
  }

  return <SomeComponent onChange={onChange} />;
}
```

#### The DOM node that an `id` corresponds to is changed

semver bump: **minor**

We have components that require specifying an `id` that typically corresponds to
an underlying `<input>` node. However, changes to the exact node that the `id`
references may change over time. As a result, you should not rely on an `id`
pointing to a specific element but instead treat it as a unique identifier that
the component uses for something that it renders.

#### The DOM node that an `aria-label` corresponds to is changed

semver bump: **minor**

Certain components require the product developer to pass in an `aria-label` or
`aria-labelledby` prop for supporting screen reader users. Ultimately, these
values are passed along to a given element in the DOM. While the label should
stay consistent over time, you should not rely on either prop pointing to the
same element over time. In other words, the node that `aria-label` or
`aria-labelledby` is supplied to may change over time.
