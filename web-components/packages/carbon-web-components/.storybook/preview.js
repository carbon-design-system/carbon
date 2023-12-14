import {  setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../custom-elements.json';
import container from './container';
import theme from './theme';


setCustomElementsManifest(customElements);

// export const Preview = {
//   parameters: {
//     controls: { expanded: true },
//   },
// };

export const decorators = [
  function decoratorContainer(story, context) {
    const result = story();
    const { hasMainTag } = result;
    const { theme } = context.globals;

    document.documentElement.setAttribute('storybook-carbon-theme', theme);

    return container({ hasMainTag, children: result });
  },
];
