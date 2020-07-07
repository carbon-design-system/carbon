# Experimental

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Publishing](#publishing)
- [Application usage](#application-usage)
- [Iconography](#iconography)
  - [Introduction](#introduction)
  - [FAQ](#faq)
    - [How do I know the name of an icon to use in the `carbon-icon` helper?](#how-do-i-know-the-name-of-an-icon-to-use-in-the-carbon-icon-helper)
    - [How do I add a class to an icon?](#how-do-i-add-a-class-to-an-icon)
    - [How do I add attributes to an icon?](#how-do-i-add-attributes-to-an-icon)
    - [How do I only use `carbon-icon` for experimental components?](#how-do-i-only-use-carbon-icon-for-experimental-components)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Publishing

Steps:

- Pull latest from `master` with `git pull upstream master`
- Update version field in `package.json` should be `v10.0.0-alpha.X` where X is
  the current number + 1
  - You can find the current alpha version number by visiting
    https://www.npmjs.com/package/carbon-components, under the Versions tab you
    should see the latest alpha version next to the `alpha` tag.
- Update feature flags in `_feature-flags.scss` and `feature-flags.js`.
- The output of running `git diff` at this point should give the following:

```
modified:   package.json
modified:   src/globals/js/feature-flags.js
modified:   src/globals/scss/_feature-flags.scss
```

- Run `npm publish . --tag alpha --dry-run` to verify the package builds
- Inspect build folders to verify feature flags are set to true
- Run `npm publish . --tag alpha`
- Run `git checkout -- src/globals package.json` to unstage changes

## Application usage

An alternate way for applications to try out `v10` design is building our latest
`v9` release with feature flags changed. (Note: Given this involves build
process, below technique is _not_ applied to pre-built bundles, e.g.
`carbon-components.css`)

One way to do it is via build toolchain, e.g. in `webpack.config.js`:

```javascript
const replaceTable = {
  breakingChangesX: true,
  componentsX: true,
  grid: true,
};

...

module.exports = {
  ...
  module: {
    rules: [
      ...
      {
        test: /\.scss$/,
        use: [
          ...
          {
            loader: 'sass-loader',
            options: {
              ...
              data: `
                $feature-flags: (
                  components-x: true,
                  breaking-changes-x: true,
                  grid: true,
                  ui-shell: true,
                );
              `,
            },
          },
        ],
      },
      {
        test: /(\/|\\)feature-flags\.js$/,
        loader: 'string-replace-loader',
        options: {
          multiple: Object.keys(replaceTable).map(key => ({
            search: `exports\.${key}\\s*=\\s*false`,
            replace: `exports.${key} = ${replaceTable[key]}`,
            flags: 'i',
          })),
        },
      },
    ],
    ...
  },
};

```

Another way, which is applicable only to our Sass code, is defining feature
flags before importing `carbon-components` Sass code, e.g.:

```scss
$feature-flags: (
  components-x: true,
  breaking-changes-x: true,
  grid: true,
  ui-shell: true,
);
@import '~carbon-components/scss/globals/scss/styles';
```

## Iconography

### Introduction

When using iconography in experimental components, we'll want to try and use
what is available through the
[Carbon Elements](https://github.com/IBM/carbon-elements) project. Specifically,
`@carbon/icons`. In order to do so, we can use the `@carbon/icons-handlebars`
and its accompanying helper.

This helper is registered under `tools/templates.js`, specifically by doing:

```js
iconHelper({ handlebars: Handlebars });
```

This will register a helper for us to use in our `hbs` files called
`carbon-icon`. You can incorporate an icon from `@carbon/icons` using this
helper by doing the following:

```hbs
{{ carbon-icon 'ChevronDownGlyph' }}
```

This will place in the icon named `ChevronDownGlyph` glyph from `@carbon/icons`
in the corresponding position where the mixin is called.

### FAQ

#### How do I know the name of an icon to use in the `carbon-icon` helper?

You can view all of the icons from `@carbon/icons` inside of
[this demo](https://ibm.github.io/carbon-elements/icons/examples/esm/). In the
future, this information will live at https://www.carbondesignsystem.com.

For now, you can click the "expanded" viewing mode option and see the module
name available for each icon in the second-to-last column. So if you are looking
for the glyph version of an icon, you might see `/chevron--down` and in the far
right-hand side of the table (when in expanded mode) you'd see
`ChevronDownGlyph`. You can use this identifier alongside the `carbon-icon`
helper by doing:

```hbs
{{ carbon-icon 'ChevronDownGlyph' }}
```

#### How do I add a class to an icon?

You can add in a class by passing in `class=''` at the end of the partial. For
example, in our dropdown we could do:

```hbs
{{ carbon-icon 'ChevronDownGlyph' class=(add @root.prefix '--dropdown__arrow') }}
```

This would take in the `@root.prefix` value and prepends the `--dropdown__arrow`
value to become, currently `bx--dropdown__arrow`. Anything that you set inside
of the string to `class` will be set as the class name for the `<svg>`
container.

#### How do I add attributes to an icon?

You can pass in any attributes, especially things like `aria-label` as a
`key='value'` pair to the `carbon-icon` helper. For example, if we wanted to set
`aria-label` we would do the following:

```hbs
{{ carbon-icon 'ChevronDownGlyph' aria-label='Aria label for icon' }}
```

#### How do I only use `carbon-icon` for experimental components?

There are a couple of steps in order to make incorporate the `carbon-icon` only
for experimental markup. These include:

1. Importing the feature flag in the component `.config.js` file

For most components, this path will look like:

```js
const featureFlags = require('../../globals/js/feature-flags');
```

2. Add `featureFlags` to the context of the component config

For most components, this will look like:

```js
module.exports = {
  context: {
    prefix,
    featureFlags,
  },
};
```

3. Conditionally include the icon using `{{#if }}`

For most components, this will look like:

```hbs
{{#if featureFlags.componentsX}}
  {{ carbon-icon 'ChevronDownGlyph' class=(add @root.prefix '--dropdown__arrow') }}
{{else}}
  <svg class="{{@root.prefix}}--dropdown__arrow" width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
    <path d="M10 0L5 5 0 0z"></path>
  </svg>
{{/if}}
```
