<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Carbon Elements Technical Preview](#carbon-elements-technical-preview)
  - [Why Carbon Elements](#why-carbon-elements)
  - [What to expect](#what-to-expect)
  - [Feedback](#feedback)
  - [What's next](#whats-next)
  - [Contributing](#contributing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Carbon Elements Technical Preview

Today, we're excited to introduce a new project to the Carbon Design System called Carbon Elements! <span aria-label="celebrate" role="img">🎉</span>

## Why Carbon Elements

We built this project to accompany upcoming updates to the [IBM Design Language](https://w3.ibm.com/design/language/), including:

- [An updated color palette](https://w3.ibm.com/design/language/elements/color/)
- [A brand new icon library](https://w3.ibm.com/design/language/elements/icon-library/)
- [An updated set of typography using IBM Plex](https://w3.ibm.com/design/language/elements/typeface/)
- [A new take on layout using the Mini Unit and 2x Grid](https://w3.ibm.com/design/language/elements/2x-grid-ui/)
- [An updated set of motion guidance](https://w3.ibm.com/design/language/elements/motion/)

The Carbon Elements project will be the code companion to these updates, allowing you to use any aspect of the IBM Design Language in code. In fact, we're starting to use this work in our own [experimental components](https://www.carbondesignsystem.com/experimental/about/overview) and [site](http://next.carbondesignsystem.com/). Over time, we're expecting all of this work to be fully integrated into Carbon components.

## What to expect

This Technical Preview is an opportunity for developers to try-out this new work. For most people using the Carbon Design System, these updates will all be automatic. However, if you're developing an add-on library or are curious about how we're building out the code counterparts of the IBM Design Language then you might be particularly interested in this work.

The Carbon Elements Technical Preview will include the following packages for you to try out:

| Name                    | Descripton                                                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@carbon/colors`        | Color hex values and color tokens used for building digital and software products in JavaScript and Sass                                                   |
| `@carbon/grid`          | A Flexbox-based set of CSS classes used for building 2x Grid layouts                                                                                       |
| `@carbon/icons`         | Optimized SVG assets and JavaScript assets for using icons in Vanilla JS, or to build a [framework icon package](/docs/guides/building-an-icon-library.md) |
| `@carbon/icons-angular` | A set of icon components for Angular                                                                                                                       |
| `@carbon/icons-react`   | A set of icon components for React.js                                                                                                                      |
| `@carbon/icons-vue`     | A set of icon components for Vue.js                                                                                                                        |
| `@carbon/layout`        | Utilities and helpers built in JavaScript and Sass to help layout a page in your product                                                                   |
| `@carbon/motion`        | Utilities and helpers for implementing motion in Sass                                                                                                      |
| `@carbon/type`          | Utilities and and helpers for using IBM Plex and its corresponding type styles in JavaScript and Sass                                                      |

All of these packages are available on [npm](http://npmjs.com) and the latest version of each can be installed with the `alpha` tag. For example, you can run the following command using [npm](http://npmjs.com) to get the `@carbon/type` package:

```bash
npm install @carbon/type@alpha --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/type@alpha
```

During this Technical Preview, we are using the `alpha.X` pattern to version our packages. This means that we do not respect [Semantic Versioning](https://semver.org/) (semver) during these updates, although we will try our best in order to follow it and cause minimal disruption.

When Carbon Elements is officially released, we will respect semver for each release.

## Feedback

We really appreciate any and all feedback during this Technical Preview! If you find something that feels off, or just need to report an annoying bug, please submit an issue over on our [GitHub Repository](https://github.com/IBM/carbon-elements/issues). Anything that you can do to help make this project better would be greatly appreciated! Especially if you can help contribute fixes.

## What's next

We're incredibly excited to be releasing this effort as a companion piece to the IBM Design Language! One of the most important reasons why we are decoupling ourselves from the language is to allow other design systems to build on top of these elements.

Over time, you can expect additional focus from Carbon in the following areas:

- Better insights into the performance impact of including each resource in your application, including:
  - Support for CSS Stats
  - Better insights into our internal build audits
- Examples for using packages in a variety of different projects, ranging from projects using Vanilla JavaScript to React, or even CSS to CSS-in-JS. We want to make sure that we're providing assets that work for you and your team
- Support for Modern Web tools, techniques, or technology. For example, leveraging CSS Grid in the `@carbon/grid` package
- A more open model for contributing custom packages that might help tackle common use-cases. A great example would be a solution to doing an efficient iconfont with our current icon set!

## Contributing

We're actively looking for core contributors from the community to help with maintaining Carbon Elements. The IBM Design Language is meant for more than just Carbon, and we want to make sure everyone has a seat at the table in order to feel comfortable with the decision making process for the project. If you're interested in helping out, please reach out at carbon@us.ibm.com!
