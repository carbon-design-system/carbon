<div align="center">
  <a href="https://www.carbondesignsystem.com">
    <img
      alt="Carbon Design System"
      src="https://user-images.githubusercontent.com/3901764/57545698-ce5f2380-7320-11e9-8682-903df232d7b0.png"
      width="720"
    />
  </a>

  <h1>Carbon Design System</h1>

  <p>
    <a href="https://www.carbondesignsystem.com">Website</a> ·
    <a href="https://carbondesignsystem.com/designing/get-started/">Design</a> ·
    <a href="https://carbondesignsystem.com/developing/get-started/">Develop</a> ·
    <a href="https://carbondesignsystem.com/contributing/get-started/overview/">Contribute</a> ·
    <a href="https://carbondesignsystem.com/migrating/guide/overview/">Migrate</a>
  </p>

  <p>
    <a href="https://github.com/carbon-design-system/carbon/actions/workflows/ci.yml">
      <img alt="CI" src="https://github.com/carbon-design-system/carbon/actions/workflows/ci.yml/badge.svg" />
    </a>
    <a href="https://bestpractices.coreinfrastructure.org/projects/7034">
      <img alt="OpenSSF Best Practices" src="https://bestpractices.coreinfrastructure.org/projects/7034/badge" />
    </a>
    <a href="./LICENSE">
      <img alt="GitHub License" src="https://img.shields.io/github/license/carbon-design-system/carbon">
    </a>
    <a href="https://discord.gg/J7JEUEkTRX">
      <img alt="Discord" src="https://img.shields.io/discord/689212587170201628?label=chat&logo=discord&logoColor=white&color=5865F2" />
    </a>
  </p>
</div>

Carbon is IBM's open-source design system for products and experiences. This
monorepo includes the React and web components libraries, Sass styles, design
tokens, icons, pictograms, and tooling used to build with Carbon.

## Packages

| Package                                   | Version                                                                                                                 | Downloads                                                                  | Description                                                   | Links                                                                          |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@carbon/react`][react-source]           | [![npm](https://img.shields.io/npm/v/%40carbon%2Freact)](https://www.npmjs.com/package/@carbon/react)                   | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Freact)          | React components and styles.                                  | [Docs][react-docs] · [Storybook][react-storybook] · [Source][react-source]     |
| [`@carbon/web-components`][wc-source]     | [![npm](https://img.shields.io/npm/v/%40carbon%2Fweb-components)](https://www.npmjs.com/package/@carbon/web-components) | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Fweb-components) | Standards-based web components.                               | [Docs][wc-docs] · [Storybook][wc-storybook] · [Source][wc-source]              |
| [`@carbon/colors`][colors-source]         | [![npm](https://img.shields.io/npm/v/%40carbon%2Fcolors)](https://www.npmjs.com/package/@carbon/colors)                 | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Fcolors)         | Color scales and color token utilities.                       | [Source][colors-source]                                                        |
| [`@carbon/elements`][elements-source]     | [![npm](https://img.shields.io/npm/v/%40carbon%2Felements)](https://www.npmjs.com/package/@carbon/elements)             | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Felements)       | IBM Design Language foundations, including tokens and assets. | [Source][elements-source]                                                      |
| [`@carbon/grid`][grid-source]             | [![npm](https://img.shields.io/npm/v/%40carbon%2Fgrid)](https://www.npmjs.com/package/@carbon/grid)                     | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Fgrid)           | Layouts built on Carbon's grid.                               | [Source][grid-source]                                                          |
| [`@carbon/icons`][icons-source]           | [![npm](https://img.shields.io/npm/v/%40carbon%2Ficons)](https://www.npmjs.com/package/@carbon/icons)                   | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Ficons)          | Icon assets and framework packages.                           | [React][icons-react-source] · [Vue][icons-vue-source] · [Source][icons-source] |
| [`@carbon/layout`][layout-source]         | [![npm](https://img.shields.io/npm/v/%40carbon%2Flayout)](https://www.npmjs.com/package/@carbon/layout)                 | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Flayout)         | Layout units and spacing scale tokens.                        | [Source][layout-source]                                                        |
| [`@carbon/motion`][motion-source]         | [![npm](https://img.shields.io/npm/v/%40carbon%2Fmotion)](https://www.npmjs.com/package/@carbon/motion)                 | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Fmotion)         | Productive and expressive motion curves.                      | [Source][motion-source]                                                        |
| [`@carbon/pictograms`][pictograms-source] | [![npm](https://img.shields.io/npm/v/%40carbon%2Fpictograms)](https://www.npmjs.com/package/@carbon/pictograms)         | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Fpictograms)     | Pictogram assets.                                             | [React][pictograms-react-source] · [Source][pictograms-source]                 |
| [`@carbon/styles`][styles-source]         | [![npm](https://img.shields.io/npm/v/%40carbon%2Fstyles)](https://www.npmjs.com/package/@carbon/styles)                 | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Fstyles)         | Sass styles for Carbon components.                            | [Source][styles-source]                                                        |
| [`@carbon/themes`][themes-source]         | [![npm](https://img.shields.io/npm/v/%40carbon%2Fthemes)](https://www.npmjs.com/package/@carbon/themes)                 | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Fthemes)         | Theme tokens for Carbon color systems.                        | [Source][themes-source]                                                        |
| [`@carbon/type`][type-source]             | [![npm](https://img.shields.io/npm/v/%40carbon%2Ftype)](https://www.npmjs.com/package/@carbon/type)                     | ![NPM Downloads](https://img.shields.io/npm/dw/%40carbon%2Ftype)           | Type tokens designed to pair with IBM Plex.                   | [Source][type-source]                                                          |

[colors-source]: ./packages/colors
[elements-source]: ./packages/elements
[grid-source]: ./packages/grid
[icons-react-source]: ./packages/icons-react
[icons-source]: ./packages/icons
[icons-vue-source]: ./packages/icons-vue
[layout-source]: ./packages/layout
[motion-source]: ./packages/motion
[pictograms-react-source]: ./packages/pictograms-react
[pictograms-source]: ./packages/pictograms
[react-docs]: https://carbondesignsystem.com/developing/frameworks/react/
[react-source]: ./packages/react
[react-storybook]: https://react.carbondesignsystem.com/
[styles-source]: ./packages/styles
[themes-source]: ./packages/themes
[type-source]: ./packages/type
[wc-docs]: https://carbondesignsystem.com/developing/frameworks/web-components/
[wc-source]: ./packages/web-components
[wc-storybook]: https://web-components.carbondesignsystem.com

Community-maintained packages are also available for
[Angular](https://github.com/IBM/carbon-components-angular),
[Svelte](https://github.com/IBM/carbon-components-svelte), and
[Vue](https://github.com/carbon-design-system/carbon-components-vue).

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./.github/CONTRIBUTING.md) for
contribution guidelines and repository expectations.

## Community

The Carbon community can be found on
[GitHub Discussions](https://github.com/carbon-design-system/carbon/discussions),
where you can ask questions, share ideas, and connect with other contributors.

To chat with other community members, join the
[Carbon Discord server](https://discord.gg/J7JEUEkTRX).

Note that our [Code of Conduct](./.github/CODE_OF_CONDUCT.md) applies to all
Carbon community channels.

## License

Licensed under the [Apache 2.0 License](./LICENSE).

## Contributors

[![Contributors](https://contrib.rocks/image?repo=carbon-design-system/carbon&columns=20&max=240)](https://github.com/carbon-design-system/carbon/graphs/contributors)
