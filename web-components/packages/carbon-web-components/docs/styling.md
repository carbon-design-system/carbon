# Using custom styles in components

As Shadow DOM (one of the Web Components specs that `@carbon/web-components` uses) promises, styles that `@carbon/web-components` defines does not affect styles in your application, or vice versa.

However, in cases where your application or a Carbon-derived style guide wants to change the styles of our components, there are a few options.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Using CSS Custom Properties](#using-css-custom-properties)
- [Dependency injection](#dependency-injection)
- [Creating derived components with different style](#creating-derived-components-with-different-style)
- [CSS Shadow Parts](#css-shadow-parts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Using CSS Custom Properties

Changes to CSS Custom Properties of the Carbon theme are reflected in the color scheme of `carbon-web-components` components:

[![Edit carbon-web-components with custom style](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-web-components/tree/main/examples/codesandbox/styling/theme-zoning)

For example, if you add CSS like below:

```css
footer {
  --cds-interactive-02: #6f6f6f; /* `$interactive-02` token for `g100` theme */
}
```

The color of the button in the code below changes to the one in the `g100` theme:

```html
<footer>
  <bx-btn kind="secondary">Secondary button</bx-btn>
</footer>
```

The names of CSS Custom Properties you can use are the Carbon theme tokens prefixed with `--cds-`. The list of Carbon theme tokens can be found at [here](https://github.com/carbon-design-system/carbon/blob/v10.7.0/packages/themes/scss/generated/_themes.scss#L14-L454).

With CSS Custom Properties approach, you can switch the entire theme under the specific element by:

```css
@import 'carbon-components/scss/globals/scss/css--helpers';
@import 'carbon-components/scss/globals/scss/vendor/@carbon/elements/scss/themes/mixins';

footer {
  @include carbon--theme($carbon--theme--g100, true); // Emits all theme tokens in CSS Custom Properties
}
```

Some components such as `Notification` and `Tag` have specific tokens per theme that need to emitted in the styles. You can do this for example by adding the following:

```css
@import 'carbon-components/scss/globals/scss/vendor/@carbon/elements/scss/themes/mixins';
@import 'carbon-components/scss/globals/scss/component-tokens';
@import 'carbon-components/src/components/tag/tag';
.dds-theme-zone-g90 {
  @include carbon--theme($carbon--theme--g90, true) {
    @include emit-component-tokens($tag-colors);
  }
}
```

## Dependency injection

You can let our custom elements modules load alternate `CSSResult` module. Below example uses [Webpack `NormalModuleReplacementPlugin`](https://webpack.js.org/plugins/normal-module-replacement-plugin/) to let our custom elements modules load RTL version of `CSSResult` module that is shipped alongside with default `CSSResult` modules, instead of loading the default version:

[![Edit carbon-web-components with custom style](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-web-components/tree/main/examples/codesandbox/rtl)

```javascript
const reCssBundle = /\.css\.js$/i;

...

module.exports = {
  ...
  plugins: [
    ...
    new webpack.NormalModuleReplacementPlugin(reCssBundle, resource => {
      resource.request = resource.request.replace(reCssBundle, '.rtl.css.js');
    }),
  ],
  ...
};
```

## Creating derived components with different style

You can create a derived class of our component and override [static `styles` property](https://lit-element.polymer-project.org/guide/styles#static-styles), like:

[![Edit carbon-web-components with custom style](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon-web-components/tree/main/examples/codesandbox/styling/custom-style)

```javascript
import { css, customElement } from 'lit-element';
import BXDropdown from '@carbon/web-components/es/components/dropdown/dropdown';

@customElement('my-dropdown')
class MyDropdown extends BXDropdown {
  // Custom CSS to enforce `field-02` (light) style of the dropdown
  static styles = css`
    ${BXDropdown.styles}
    .bx--list-box {
      background-color: white;
    }
  `;
}
```

## CSS Shadow Parts

In the future, we'd like to support [CSS Shadow Parts](https://www.w3.org/TR/css-shadow-parts-1/) too, so you can use your application's CSS to affect `carbon-web-components` styles in a more flexible manner.
