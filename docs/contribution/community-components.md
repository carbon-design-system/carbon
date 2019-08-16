# Community components

### What are community components?

Community Components is our new library of custom components contributed by you.
It is based off of our new contribution model.

- **Development environment:** Unlike our old "add-on" model, community
  components will no longer live in individual, per-team repos. Instead, they
  will all live in the same `carbon-community-components` monorepo. This allows
  us to provide a consistent API and a single workspace that is the source of
  truth for community components, not just for development purposes but also for
  consuming purposes. By having community components live in the same package,
  we will be able to better surface your contributions.

- **Website documentation:** Unlike before, when "add-ons" weren't really
  surfaced in any of our documentation, community components will have a
  gallery, coupled with component specific documentation, on our website. This
  will allow the rest of the community to find and consume custom components
  easier and thus reduce design and development effort. We also want to
  encourage community members to contribute back, not just to Carbon, but to the
  community components they're using as well. Just because core Carbon won't be
  maintaining these, doesn't mean you can't contribute to them!

- **Quality control:** We want to make contributing easy, but want to encourage
  improvement, maintenance and contribution. We've created a recommended
  checklist of comprehensive design and development guidelines. While there is
  no requirement to meet any or all of these guidelines, component quality will
  be displayed based off of how many guidelines you meet. Evaluation of level of
  completeness is based on your assessment.

  _If we're not required to meet any of the guidelines, why would we want to
  create more work for ourselves by trying to meet most of them?_

  Good question. Carbon will be endorsing components that meet 80% or more of
  the guidelines as being on the same design and development level as core
  Carbon components. This means that we will prioritize them when we surface
  these components on our website. It is our goal that by endorsing these and
  surfacing them more notably, more users will use and contribute to your
  component and make it easier for you to maintain it.

- **Maintainers:** The core Carbon team will not be responsible for maintaining
  community components. The responsibility to maintain them will fall on the
  team who contributed the component.

### Component checklist

In order to contribute a community component, the only _truly_ required items
are the basic guidelines. This allows us to give you a unique package directory
in the monorepo. Reaching 100% completeness means meeting all of the design and
development guidelines on this list.

**Basic (always required)**

- [ ] Unique design or feature (not a feature/functionality that our components
      have)
- [ ] Unique component name

**Artifact (added in [community box folder](link here))**

- [ ] Component drawing (in Sketch / XD / Sigma) template link
- [ ] States: default, hover, active, disabled, etc
- [ ] Component in-situ product screens
- [ ] Component in-situ flows detailing the job-to-be-done
- [ ] Responsive design on all breakpoints
- [ ] Component redline / spec (template link)
- [ ] Component Usage guidance (writing)
- [ ] Design explorations, audit, and research

**Visual**

- [ ] Using IBM type styles
- [ ] Using IBM colors
- [ ] Using IBM icons
- [ ] Using IBM grid & layout guidance
- [ ] Design in all 4 color themes
- [ ] Satisfy basic accessibility contrast requirements (text readability 4.5:1,
      info graphics 3:1)

**Code**

- [ ] Built with Carbon v10+
- [ ] SASS
- [ ] Using Carbon design tokens (color, type, motion, spacing)
- [ ] `#{$prefix}` class naming
- [ ] Semantic HTML
- [ ] Code documentation (props, class/selectors)
- [ ] Include different states (hover, focus, disabled)
- [ ] Unit testing
- [ ] Should have motion (CSS transition)
- [ ] Theming functionality

**Responsiveness**

- [ ] Mobile (sm, md)
- [ ] Desktop (lg, xlg)
- [ ] Large format (max)

**Accessibility**

- [ ] Pass AVT 1 test
- [ ] Pass AVT 2 test
- [ ] Pass AVT 3 test

**Frameworks**

- [ ] Vanilla JS
- [ ] React
- [ ] Angular
- [ ] Vue

**Browser support**

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] IE11
- [ ] Edge

_**What happens if I don't have a designer or developer to meet all of the
guidelines?**_

Our hope with community components is that we create a path that allows anyone
to contribute regardless of the completion. By creating a single environment for
this we hope to connect contributors who need a designer or developer to help
out. Part of our effort in helping contributors who don't have the means to
complete the checklist includes displaying these contribution on our website
gallery as `code only` or `design only` assets.

_**Can I contribute to `code only` or `design only` assets?**_

YES! We encourage you to combine efforts on these components. Our main goal is
to have a community lead library.

### Process

1. **Contributor License Agreement:** Before you can contribute any code, we
   need you to sign a Contributor License Agreement (CLA).
2. **Development environment:** If you haven't already, fork and clone the
   community components monorepo. Checkout our
   [Developer Handbook](../developer-handbook.md) to read up on our best coding
   practices and proper commit messages.
3. **Issue:** Check repo for an _existing_ issue related to your contribution
   first. If none exist, open a new issue.
4. **Package directory:** Once you open an issue, we will review that you have a
   unique name and create a directory for your package. We will then make you a
   maintainer of the monorepo and codeowner of your package.
5. **Website draft status:** Once we've added your package directory, it is your
   job to add a card to our website gallery with a placeholder image and draft
   status.
6. **Pull request:** Create a new branch and add your component assets. Submit a
   PR and merge when you're ready.
7. **Website final status:** Once you've completed and merged your component,
   update your website card to the final status.

### Why should I contribute a community component?

The purpose of community components is to reduce the design and development
effort for Carbon users. By creating a path for contributing and surfacing
custom components, users can then collaborate on work with teams who are using
similar components, as well as focus on developing other assets that haven't
been contributed.

The short and sweet is:

- You'll save time creating new assets since you can use and contribute to
  existing community components
- If you're building a community component, you'll have a way to surface it and
  thus get more users and contributors to help maintain it

### What happens if my community component is used enough to be part of "core" Carbon?
