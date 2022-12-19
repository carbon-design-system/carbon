# Adding component types

This document lays out the goal, strategy, and guidelines for adding
[TypeScript](https://www.TypeScriptlang.org/) types for components within
`@carbon/react`.

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Goal](#goal)
  - [Purpose](#purpose)
- [Strategy](#strategy)
  - [Steps to provide baseline type definitions for components](#steps-to-provide-baseline-type-definitions-for-components)
- [FAQ](#faq)
  - [How do I know what's part of the public api?](#how-do-i-know-whats-part-of-the-public-api)
  - [Should components have both prototypes and ts interface?](#should-components-have-both-prototypes-and-ts-interface)
  - [Should comment docs be duplicated into the ts interface?](#should-comment-docs-be-duplicated-into-the-ts-interface)
  - [Where should I put the ts interface in the file?](#where-should-i-put-the-ts-interface-in-the-file)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Goal

The goal of this workstream is to provide as much downstream value to consumers
who are using TypeScript, as quickly as possible, while writing the least amount
of TypeScript.

The goal is _not_ to convert the entire codebase to TypeScript right now.

### Purpose

By adding TypeScript types to components we anticipate a number of benefits:

- Developer productivity will increase due to Component API's being
  self-documenting and providing tight integration with code editor
  intellisense.
- The qualtiy of products developed will increase due to more stable, correct,
  and thorough component API typings provided first-party through
  `@carbon/react` itself.
- Maintenance of the types themselves will be simplified by not having to go
  through the DefinitelyTyped contribution process/system.

Despite these benefits, adding TypeScript to the codebase is still a large shift
for the developer community surrounding the Carbon Design System. Most projects
are not using TypeScript, and contributors are more likely to not have in-depth
knowledge of TypeScript.

The bar to contribute to Carbon should be as low as possible to facilitate
experimentation, innovation, and progress within the system. Adding TypeScript
raises this bar of contribution adding additional friction to even the smallest
of pull requests.

We believe the majority of the benefits of TypeScript can be provided to
consumers without needing to convert the entire codebase to use TypeScript.
Overall, this effort will be focused on limiting the amount of TypeScript within
the repository for now.

## Strategy

TypeScript will be incrementally adopted, focusing first on adding types to
components prop APIs that are included as part of the public API of
`@carbon/react`.

Internal components, helpers, function, etc. will not initially be typed. These
internal files/components not included in the public API should be left as
`.js`, given a
[jsdoc type annotation](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#providing-type-hints-in-js-via-jsdoc)
of `/** @type any */`, and
[errors should be enabled](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)
by adding `// @ts-check` to the first line in the file.

Other packages, such as `@carbon/icons-react`, `@carbon/elements`, etc will not
initially be typed.

Within this incremental adoption strategy, **for now types will not be bound to
semver**.

This means that types are provided on an as-is basis. Ideally types will be
stable and not ship breaking changes, but the reality is typings may at times be
incorrect, outdated, or missing. Full details available within our
[versioning documentation](https://github.com/carbon-design-system/carbon/blob/main/docs/guides/versioning.md#a-change-is-made-to-component-typingsdefinitions).

### Steps to provide baseline type definitions for components

Below is a general outline of what needs to be done for each component within
the repository. There is an issue tracking curring status of this effort,
[#12513](https://github.com/carbon-design-system/carbon/issues/12513)

- Change extension to `.tsx` via git (do not simply rename)
  - e.g. `git mv packages/react/src/components/ComponentName/ComponentName.js packages/react/src/components/ComponentName/ComponentName.tsx` 
- Copying the proptypes def to above the component definition
- Retool the proptypes to be a ts interface
- Fix errors as they appear
- Do not add types to internal components or functions that are not exported as
  part of the Public API.

  - Leave internals as `.js`
  - Add a
    [jsdoc type annotation](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#providing-type-hints-in-js-via-jsdoc)
    of `/** @type any */`
  - [Enable errors](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html#ts-check)
    by adding `// @ts-check` to the first line in the file.

- Test your changes - there are a few options here:
  - At the bottom of a file, write a dummy component that uses the component
    that you’re converting to ensure that you can still pass all appropriate
    props that you need to.
  - Take a storybook example for a component, copy and paste it into the bottom
    of the .tsx file and validate whether or not it accepts the props as you’ve
    defined them
- Submit a pull request for the changes
  - Please keep pull requests as small as possible
  - Avoid adding additional components to a single PR unless necessary
  - [Link to close the related issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword#linking-a-pull-request-to-an-issue-using-a-keyword),
    e.g. `Closes #12513`
- Ask questions if you get stuck!
  - The team is available on slack
    [`#carbon-wg-typescript`](https://ibm-studios.slack.com/archives/C03C8VASVED),
    [discord](https://discord.gg/J7JEUEkTRX), or on
    [the issue itself](https://github.com/carbon-design-system/carbon/issues/12513).

## FAQ

### How do I know what's part of the public api?

- If it's not on [the storybook](https://react.carbondesignsystem.com), it's
  probably not public.
- The entire Public API is snapshotted, you can
  [search the snapshot here](https://github.com/carbon-design-system/carbon/blob/main/packages/react/__tests__/__snapshots__/PublicAPI-test.js.snap).
  If it's not included there, it's not part of the public API.

### Should components have both prototypes and ts interface?

- Yes

### Should comment docs be duplicated into the ts interface?

- Yes
  - Duplicate comments between the proptypes definition and ts interface
  - Storybook prefers react-docgen for now
  - Once we have ts interfaces for everything we can switch out the storybook
    config to favor TypeScript docs

### Where should I put the ts interface in the file?

- Above the component definition (likely the top of the file)
  - The component implementation should be sandwiched inbetween the ts interface
    and the proptypes definition
