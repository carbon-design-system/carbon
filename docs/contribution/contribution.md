# Carbon contribution model

Carbon Design System is an **open source** project at IBM. We pride ourselves in
open and inclusive design and development. If you're wondering more about our
contribution process, you're in the right place. First off, thank you for your
interest! This project is made possible not just by the core Carbon team, but
also by several community members who have invested their own time to give back
to the Carbon community.

## Code of conduct

We value all of our community members, and thus want to foster a positive
contributing environment. Please take a look at our
[code of conduct](./code_of_conduct.md) before engaging in our workspaces.

## Overview

### Who can contribute?

Anyone! We mean it. The one and only requirement is you'll need a
[public GitHub account](https://github.com/join), as all our assets live on
GitHub.

- **Development:** If coding is your thing, you can help us by contributing bug
  fixes or community components. Checkout our
  [Developer Handbook](../developer-handbook.md) to get your dev environment set
  up, read up on our best practices and more.
- **Design:** Design contributions can vary from visual assets, UX interactions,
  motion design, Sketch kit bug fixes and more.
- **Content:** Our documentation is just as important as our design and code
  assets. Whether it's updating our current docs, or adding new patterns, anyone
  can contribute to our
  [website content](https://github.com/carbon-design-system/carbon-website).
- **Research:** Carbon is made up of developers and designers, but
  unfortunately, no dedicated researchers. If you're a researcher and have
  findings that you think could improve Carbon users' experience, you're in the
  right place. This kind of contribution is most effective if coupled with
  design and development forces, which would be presented in a GitHub issue and
  subsequent PR.

### What is the contribution process?

1. **Issue:** Check repo for an _existing_ issue related to your contribution
   first. If none exist, open a new issue. Be sure to check the right repo.
   (i.e. Don't open an issue for website documentation in the `carbon`
   monorepo.) We reserve the right to close any issues that haven't been filled
   out properly according to the issue template.
2. **Contributor License Agreement:** Before you can contribute any code, we
   need you to sign a Contributor License Agreement (CLA). Code doesn't just
   mean "components"; if you're contributing to our website docs, you're
   contributing code. ;)
3. **Development environment:** If you haven't already, fork and clone whichever
   repo you want to contribute to. Then, create a new branch and add your
   contribution in it. Checkout our
   [Developer Handbook](../developer-handbook.md) to read up on our best coding
   practices and proper commit messages.
4. **Pull request:** Submit a PR. Be sure to fill out the template properly.
5. **Approval:** Get PR approved by design and developers, or make any necessary
   changes for approval. This process may be quick or take a few iterations of
   feedback-update.
6. **Documentation:** After design and dev have approved and merged PR, update
   any website documentation if necessary. One of the best examples for this is
   if you're contributing to component work which has website documentation
   related to your contribution.

Here are some contribution quick tips:

- **Do** fill out the required template for contributions entirely; this
  pertains to both issues and PRs.
- **Do** add or update tests for any contributions that require it.
- **Do** follow existing coding and writing styles.
- **Do** follow proper commit messages syntax.
- **Do** lint your code.
- **Do not** branch off another branch.
- **Do not** include unrelated changes in the same PR.
- **Do not** create one massive PR if it can be broken up into smaller PRs.

### What projects can I contribute to?

- [`carbon-components`](https://github.com/carbon-design-system/carbon/tree/master/packages/components)
- [`carbon-components-react`](https://github.com/carbon-design-system/carbon/tree/master/packages/react)
- [`carbon-website`](https://github.com/carbon-design-system/carbon-website)
- [`gatsby-theme-carbon`](https://github.com/carbon-design-system/gatsby-theme-carbon)
- [`carbon-design-kit`](https://github.com/carbon-design-system/carbon-design-kit)
- [`@carbon/elements`](https://github.com/carbon-design-system/carbon/tree/master/packages/elements)
- [`@carbon/type`](https://github.com/carbon-design-system/carbon/tree/master/packages/type)
- [`@carbon/colors`](https://github.com/carbon-design-system/carbon/tree/master/packages/colors)
- [`@carbon/grid`](https://github.com/carbon-design-system/carbon/tree/master/packages/grid)
- [`@carbon/icons`](https://github.com/carbon-design-system/carbon/tree/master/packages/icons)
- [`@carbon/layout`](https://github.com/carbon-design-system/carbon/tree/master/packages/layout)
- [`@carbon/motion`](https://github.com/carbon-design-system/carbon/tree/master/packages/motion)
- [`@carbon/themes`](https://github.com/carbon-design-system/carbon/tree/master/packages/themes)
- [`@carbon/icons-react`](https://github.com/carbon-design-system/carbon/tree/master/packages/icons-react)

And more! You can view a complete list of our packages
[here](https://github.com/carbon-design-system/carbon/tree/master/packages).

### Besides some of the obvious contributions mentioned above, how else can I contribute?

Great question! Contribution does not require creating or maintaining our
assets. Here are some other ways you can contribute, which don't require much
work:

- **Join our slack community and interact with other users.** We have hundreds
  of users world wide, and quite a small team in comparison. While we try our
  best to answer questions on slack, it's not always possible to answer
  everything. One of the easiest ways to help us it to jump in on slack
  conversations if there's something you know the answer to! Some of our most
  popular slack channels include `#carbon-components`, `#carbon-react`,
  `#carbon-design-system`.
- **Report bugs.** Even if you don't have the time to contribute a bug fix,
  opening an issue alone makes a big difference! Be sure to completely fill out
  the issue template to best help us understand what is going wrong.

### What if I want to contribute a new feature or custom component?

If you're contributing code to Carbon Components, we will only accept bug fixes.
If you want to contribute a custom component, new feature, or a variation of an
existing component, our new community components package is the way to go. For
more details on this, checkout our community components section below.

### If I'm contributing code, am I required to contribute it for all frameworks?

If you've been working with Carbon for a while, you know that we have code
assets in vanilla JS, React, Vue and Angular. While the core team only maintains
the vanilla and React components, we work closely with the Vue and Angular teams
to maintain parity. The core team also develops with a React first approach,
which means that our vanilla components will never be ahead of React, though it
may not be true for the other way around. If you're contributing a bug fix in a
vanilla component which also exists in the React version, you can either
contribute a fix for the React version as well or open an issue so that we can
update the React component accordingly.

## Community components

### What are community components?

Community components are our new model for Carbon "add-ons", or custom component
libaries which teams created on an as-needed basis. Our new model is different
in a few ways:

- **Development environment:** Unlike the old "add-on" model, community
  components will no longer live in individual, per-team repos. Instead, they
  will all live in the same `@carbon/community` package. This allows us to
  provide a consistent API and a single workspace that is the source of truth
  for community components, not just for development purposes but also for
  consuming purposes. By having community components live in the same package,
  we will be able to better surface your contributions.
- **Tiered system:** We want to make contributing easy, but want to encourage
  improvement, maintenance and contribution. Thus, we've created a 3-tiered
  system for contributing community components. In order to contribute a
  community component, your component must at least meet our lowest tier
  requirements.

  _If we're only required to meet the bottom tier requirements, why would we
  want to create more work for ourselves by trying to meet the mid or top tier
  requirements, though?_

  Good question. Carbon will be endorsing top tier components as being on the
  same design and development level as core Carbon components. This means that
  we will prioritize them when we surface these components on our website. It is
  our goal that by endorsing these and surfacing them more notably, more users
  will use and contribute to your component and make it easier for you to
  maintain it.

### Tier requirements

#### Bottom tier

- [ ] Must pass
      [WCAG A rating](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0&currentsidebar=%23col_customize&levels=aa%2Caaa&techniques=advisory&technologies=pdf)
- [ ] Browser support for Chrome, Safari and Firefox
- [ ] Should be using SASS
- [ ] Should be using design tokens
- [ ] Include component documentation
- [ ] Must be v10 or later version of Carbon

#### Mid tier

- [ ] Meet all tier 1 requirements
- [ ] Pass AVT 1 and 2 testing
- [ ] Should be responsive
- [ ] Should use `${$prefix}`
- [ ] Should be using our class naming methodology

#### Top tier

- [ ] Meet all tier 1 and 2 requirements
- [ ] Must pass
      [WCAG AA rating](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0&currentsidebar=%23col_customize&levels=aaa&techniques=advisory&technologies=pdf&showtechniques=312)
- [ ] Pass AVT 1, 2 & 3 testing
- [ ] Browser support for Edge and IE11
- [ ] Theming capabilities
- [ ] Must include unit tests
- [ ] Should have motion
- [ ] Must have a React version

### How do I contribute a community component?

### Why should I contribute a community component?

### What happens if my community component is used enough to be part of "core" Carbon?

## GitHub labels
