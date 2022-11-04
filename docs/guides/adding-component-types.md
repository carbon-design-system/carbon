# Adding component types

This document lays out the goal, strategy, and guidelines for adding
[TypeScript](https://www.typescriptlang.org/) types for components within
`@carbon/react`.

## Goal

- Get types fast, increase adoption, don’t boil the ocean

The goal of this workstream is to provide as much downstream value to consumers
who are using typescript, while writing the least amount of typescript possible
within the Carbon monorepo codebase (this repo).

The goal is _not_ to convert the entire codebase to Typescript right now.

### Why

Adding TypeScript types to components will be beneficial for the following
reasons:

- Developer productivity will increase due to Component API's being
  self-documenting and providing tight integration with code editor
  intellisense.
- The qualtiy of products developed will increase due to more stable, correct,
  and thorough component API typings providing first-party through
  `@carbon/react` itself.
-

- Component APIs will be self-documenting, improving developer productivity via
  tight integration with code editor intellisense.
- Consumers using TypeScript will be able to take advantage of first-party types
  provided through `@carbon/react`, improving the quality of products developed
  using Carbon.
- Types will be maintained within the package itself, not having to go through
  the DefinetlyTyped contribution process/system leading to easier maintenance
  of typings.

By adding TypeScript types to components we hope to accomplis

Focusing on limiting the amount of Typescript within the repository is backed by
two primary reasons.

Adding typescript to the codebase is a large shift for the developer community
surrounding the Carbon Design System. Most projects are not using typescript,
and contributors are more likely to not have in-depth knowledge of typescript.
The bar to contribute to Carbon should be as low as possible to facilitate
experimentation, innovation, and progress within the system. Adding TypeScript
raises this bar of contribution adding additional friction to even the smallest
of pull requests.

The core group of maintainers both on the core team and the

- community concerns
- maintenance

Adjacent to these concerns, we believe the majority of the benefits of
typescript can be provided to consumers without needing to convert the entire
codebase to use TypeScript.

## Strategy

With the above concerns in mind, we'd like to approach Typescript adoption in
the following phases:

1. Add as few things as possible to get baseline types provided, intellisense in
   vscode
2. Research and evalutate where we could extract future value from Typescript
   for consumers or maintainers
3. Convert the entire codebase to typescript

Within this incremental adoption strategy, **for now types will not be bound to
semver**.

This means that types are provided on an as-is basis. The aim is for types to be
very stable and not ship breaking changes, but the reality is typings may at
times be incorrect, outdated, or missing. Full details available within our
[versioning documentation]().

- link to typescript semver documentation

### Steps

Below is a general outline of what needs to be done for each component within
the repository. The issue tracking current status of this effort is #ISSUEHERE

- Change extension to `.tsx`
- Copying the proptypes def to above the component definition
- Retooling those proptypes to be a ts interface
- Fix errors as they appear
- Test your changes

  - Can use Storybook
  - At the bottom of a file, write a dummy component that uses the component
    that you’re converting to ensure that you can still pass whatever prop that
    you need to
  - Take a storybook example for a component, paste it into the bottom of the
    .tsx file and validate whether or not it accepts the props as you’ve defined
    them

- Ask questions if you get stuck
  - Slack, discord, on the issue itself
