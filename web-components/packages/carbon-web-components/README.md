A Carbon Design System variant that's as easy to use as native HTML elements,
with no framework tax, no framework silo.

<p align="center">
  <a href="https://www.carbondesignsystem.com">
    <img alt="Carbon Design System" src="https://user-images.githubusercontent.com/3901764/57545698-ce5f2380-7320-11e9-8682-903df232d7b0.png" width="100%" />
  </a>
</p>

> Carbon is an open-source design system built by IBM. With the IBM Design
> Language as its foundation, the system consists of working code, design tools
> and resources, human interface guidelines, and a vibrant community of
> contributors.

<p align="center">
  <a href="https://github.com/carbon-design-system/carbon-for-ibm-dotcom/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="Carbon is released under the Apache-2.0 license" />
  </a>
</p>
<p align="center">
  <a href="https://percy.io/538fc19a/Carbon-Web-Components">
    <img src="https://percy.io/static/images/percy-badge.svg" alt="This project is using Percy.io for visual regression testing" />
  </a>
</p>

# `@carbon/web-components`

`@carbon/web-components` is a variant of Carbon Design System with Custom
Elements v1 and Shadow DOM v1 specs.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting started](#getting-started)
  - [Using CDN](#using-cdn)
    - [How to install](#how-to-install)
    - [Basic usage](#basic-usage)
  - [Using ES imports](#using-es-imports)
    - [How to install](#how-to-install-1)
    - [Basic usage](#basic-usage-1)
  - [Other usage guides](#other-usage-guides)
- [JavaScript framework support](#javascript-framework-support)
  - [Angular](#angular)
  - [React](#react)
  - [Vue](#vue)
- [Getting started with development](#getting-started-with-development)
- [Running React/Angular/Vue Storybook demo](#running-reactangularvue-storybook-demo)
- [List of available components](#list-of-available-components)
- [Browser support](#browser-support)
- [Coding conventions](#coding-conventions)
- [Creating build](#creating-build)
- [Running unit test](#running-unit-test)
- [Running build integration test](#running-build-integration-test)
- [Running UI integration test](#running-ui-integration-test)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting started

### Using CDN

#### How to install

All components are available via CDN. This means that they can be added to your
application without the need of any bundler configuration. Each component is
available by the `latest` tag, or referencing a specific version (starting at
version `v1.16.0`):

```html
<!-- By `latest` tag -->
<script
  type="module"
  src="https://1.www.s81c.com/common/carbon/web-components/tag/v2/latest/accordion.min.js"></script>

<!-- By specific version -->
<script
  type="module"
  src="https://1.www.s81c.com/common/carbon/web-components/version/v2.0.0/accordion.min.js"></script>
```

<details>
  <summary>See full list of available components via CDN</summary>

- accordion.min.js
- breadcrumb.min.js
- button.min.js
- checkbox.min.js
- code-snippet.min.js
- combo-box.min.js
- content-switcher.min.js
- copy-button.min.js
- data-table.min.js
- date-picker.min.js
- dropdown.min.js
- file-uploader.min.js
- floating-menu.min.js
- form.min.js
- inline-loading.min.js
- input.min.js
- link.min.js
- list.min.js
- loading.min.js
- modal.min.js
- multi-select.min.js
- notification.min.js
- number-input.min.js
- overflow-menu.min.js
- pagination.min.js
- progress-indicator.min.js
- radio-button.min.js
- search.min.js
- select.min.js
- skeleton-icon.min.js
- skeleton-placeholder.min.js
- skeleton-text.min.js
- skip-to-content.min.js
- slider.min.js
- structured-list.min.js
- tabs.min.js
- tag.min.js
- textarea.min.js
- tile.min.js
- toggle.min.js
- tooltip.min.js
- ui-shell.min.js
</details>

#### Basic usage

The CDN artifacts define the custom elements for the browser, so they can be
directly used once the script tag has been added to the page. For example:

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="module"
      src="https://1.www.s81c.com/common/carbon/web-components/tag/v2/latest/dropdown.min.js"></script>
    <style type="text/css">
      // Suppresses the custom element until it has been defined
      cds-dropdown:not(:defined),
      cds-dropdown-item:not(:defined) {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <cds-dropdown trigger-content="Select an item">
        <cds-dropdown-item value="all">Option 1</cds-dropdown-item>
        <cds-dropdown-item value="cloudFoundry">Option 2</cds-dropdown-item>
        <cds-dropdown-item value="staging">Option 3</cds-dropdown-item>
        <cds-dropdown-item value="dea">Option 4</cds-dropdown-item>
        <cds-dropdown-item value="router">Option 5</cds-dropdown-item>
      </cds-dropdown>
    </div>
  </body>
</html>
```

Our example at [CodeSandbox](https://codesandbox.io) shows usage with only CDN
artifacts:

[![Edit carbon-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/carbon-web-components/examples/codesandbox/cdn)

### Using ES imports

#### How to install

To install `@carbon/web-components` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install --save @carbon/web-components
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/web-components
```

#### Basic usage

Our example at [CodeSandbox](https://codesandbox.io) shows the most basic usage:

[![Edit carbon-web-components](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/carbon-web-components/examples/codesandbox/basic)

The first thing you need is **setting up a module bundler** to resolve
ECMAScript `import`s. The above example uses [Webpack](https://webpack.js.org),
but you can use other bundlers like [Rollup](https://rollupjs.org/) too.

Once you set up a module bundler, you can start importing our component modules,
for example:

```javascript
import '@carbon/web-components/es/components/dropdown/dropdown.js';
import '@carbon/web-components/es/components/dropdown/dropdown-item.js';
```

Once you've imported the component modules, you can use our components in the
same manner as native HTML tags, for example:

```html
<cds-dropdown trigger-content="Select an item">
  <cds-dropdown-item value="all">Option 1</cds-dropdown-item>
  <cds-dropdown-item value="cloudFoundry">Option 2</cds-dropdown-item>
  <cds-dropdown-item value="staging">Option 3</cds-dropdown-item>
  <cds-dropdown-item value="dea">Option 4</cds-dropdown-item>
  <cds-dropdown-item value="router">Option 5</cds-dropdown-item>
</cds-dropdown>
```

### Other usage guides

- [Having components participate in form](./docs/form.md)
- [Using custom styles in components](./docs/styling.md)
- [Using `carbon-web-components` with old build toolchain](./docs/old-build-toolchain.md)

## JavaScript framework support

This package also supports integration with other JavaScript frameworks like
Angular and Vue. This is achievable since Web Components is the modern browser
standard, and works well with other front-end frameworks that exist in the
application. In turn, this also comes with the benefits of encapsulation within
the Shadow DOM:

### Angular

Angular users can use our components in the same manner as native HTML tags,
too, once you add
[`CUSTOM_ELEMENTS_SCHEMA`](https://angular.io/api/core/CUSTOM_ELEMENTS_SCHEMA)
schema to your Angular module, for example:

```javascript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

The `.d.ts` files in `@carbon/web-components` package are compiled with
TypeScript 3.7. You can use TypeScript 3.7 in your Angular application with
upcoming Angular `9.0` release, or with the following instructions, so your
application can use those `.d.ts` files:

- Set `true` to
  [`angularCompilerOptions.disableTypeScriptVersionCheck`](https://angular.io/guide/angular-compiler-options#disabletypescriptversioncheck)
  in `tsconfig.json`
- In `polyfills.ts`, change
  [`__importDefault` TypeScript helper](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#example-8)
  as follows:
  `window.__importDefault = mod => (mod?.__esModule ? mod : { default: mod })`

### Vue

[![Edit carbon-web-components with Vue](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/carbon-web-components/examples/codesandbox/vue)

Vue users can use our components in the same manner as native HTML tags, without
any additional steps!

## Getting started with development

1. Fork this repository and clone it
2. `yarn install`
3. `cd packages/carbon-web-components`
4. `yarn wca && yarn storybook`

## List of available components

View available web components at:
https://www.ibm.com/standards/carbon/carbon-web-components. You can see usage
information in several ways:

1. Going to Docs tab, where it shows the usage and available attributes,
   properties and custom events.
2. Clicking the **KNOBS** tab at the bottom and changing values there. Most
   knobs are shown as something like `Button kind (kind)`, where `kind` is the
   attribute name
3. Clicking the **ACTION LOGGER** tab at the bottom and interacting with the
   selected component. You may see something like `cds-modal-closed` which
   typically indicates that an event with such event type is fired. You can also
   expand the twistie to see the details of the event

## Browser support

- Latest Chrome/Safari/FF

## Coding conventions

Can be found at [here](./src/coding-conventions.md).

## Creating build

```
> yarn clean
> yarn build
```

You'll see the build artifacts in `/path/to/carbon-web-components/es` directory.

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this
package as a dependency you are agreeing to telemetry collection. To opt out,
see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
