# Experimental

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Running our Storybook](#running-our-storybook)
- [Application usage](#application-usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Running our Storybook

You can try out `v10` design in our Storybook, by setting `CARBON_USE_EXPERIMENTAL_FEATURES` environment variable before running our Storybook server. Some experimental features also require `CARBON_USE_BREAKING_CHANGES` environment variable. See [here](../README.md#using-the-server) for more details.

## Application usage

Applications can try out `v10` design by building our latest `v9` release with feature flags changed. (Note: Given this involves build process, below technique is _not_ applied to pre-built bundles, e.g. `carbon-components-react.js`)

It can be done via build toolchain, e.g. in `webpack.config.js`:

```javascript
const replaceTable = {
  breakingChangesX: true,
  componentsX: true,
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
        test: /(\/|\\)FeatureFlags\.js$/,
        loader: 'string-replace-loader',
        options: {
          multiple: Object.keys(replaceTable).map(key => ({
            search: `export\\s+var\\s+${key}\\s*=\\s*false`,
            replace: `export var ${key} = ${replaceTable[key]}`,
            flags: 'i',
          })),
        },
      },
    ],
    ...
  },
};

```
