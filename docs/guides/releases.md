# Releases

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Introduction](#introduction)
- [Versioning](#versioning)
  - [Major, minor, and patch numbers](#major-minor-and-patch-numbers)
- [Pre-releases](#pre-releases)
- [Publishing a package](#publishing-a-package)
- [Glossary](#glossary)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

The Carbon Design System team ships a collection of packages to a service called
[npm](https://www.npmjs.com/). These packages contain different pieces of
functionality that developers can use to build their projects. Developers can
install these packages using `npm` directly in their projects.

Each package is published along with a version. Together, the name and version
uniquely identify a collection of files that make up a package. When installing
a package, a developer will install the latest version of a package. When a new
version of a package is published, a developer will need to update their version
of the package to match the latest version.

## Versioning

When deciding what version a package should have, the Carbon team follows a
process called [Semantic Versioning](https://semver.org/) (semver). This
versioning scheme attempts to give meaning to each number in a package version.

For example, if we had the version `1.2.3` for a package then the following
would be true:

- `1` is the **major** version of the package
- `2` is the **minor** version of the package
- `3` is the **patch** version of the package

How your version number gets incremented will depend on the types of changes
made in your package.

### Major, minor, and patch numbers

As an example, imagine your package, `acme`, exported the following function:

```js
// Version: 0.1.0
export default function createPerson() {
  return {
    name: 'Jane Doe',
  };
}
```

Users of your package will install and use it in the following way:

```js
import createPerson from 'acme';

const person = createPerson();
console.log(person.name);
```

Since publishing version `0.1.0` for package `acme`, abbreviated as
`acme@0.1.0`, you decided to change this `createPerson` function. Now, it looks
like the following snippet:

```js
// Version: ???
export default function createPerson() {
  return {
    firstName: 'Jane',
    lastName: 'Doe',
  };
}
```

You'll notice that the `name` field is no longer returned, and instead we now
have `firstName` and `lastName` available.

```diff
export default function createPerson() {
  return {
-    name: 'Jane Doe',
+    firstName: 'Jane',
+    lastName: 'Doe',
  };
}
```

If we published this package, then the snippet we saw earlier **would no longer
work**. This is what is known as a **breaking change**, which is a change that
breaks existing code that is being used from your package.

As a result, if you started at `acme@0.1.0` then you would need to publish
`acme@1.0.0` with these changes since you need to increment the **major**
number.

## Pre-releases

## Publishing a package

## Glossary

- Packages
- Version
