/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import addons from '@storybook/addons';
import containerStyles from '../_container.scss';
import '../../src/components/skip-to-content/skip-to-content';
import theme from './theme';

addons.setConfig({
  showRoots: true,
  theme,
});

export const parameters = {
  layout: 'fullscreen', // https://github.com/storybookjs/storybook/issues/12041
  options: {
    theme,
  },
};

export const decorators = [
  () => {
    // Vue doesn't allow `<style>` tag in its template
    const { cssText } = containerStyles;
    let containerStyleNode = document.getElementById('container-style');
    if (!containerStyleNode) {
      containerStyleNode = document.createElement('style');
      containerStyleNode.setAttribute('type', 'text/css');
      containerStyleNode.appendChild(document.createTextNode(cssText));
      document.head.appendChild(containerStyleNode);
    } else {
      containerStyleNode.textContent = cssText;
    }
    return {
      template: `
        <div id="main-content" data-floating-menu-container role="main" class="bx--body bx-ce-demo-devenv--container">
          <bx-skip-to-content href="#main-content"></bx-skip-to-content>
          <story/>
        </div>
      `,
    };
  },
];
