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

const SORT_ORDER = ['introduction-welcome--page', 'introduction-form-paticipation--page'];

export const parameters = {
  layout: 'fullscreen', // https://github.com/storybookjs/storybook/issues/12041
  options: {
    storySort(lhs, rhs) {
      const [lhsId] = lhs;
      const [rhsId] = rhs;
      const lhsSortOrder = SORT_ORDER.indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER.indexOf(rhsId);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      return 0;
    },
    theme,
  },
};

export const decorators = [
  story => {
    const { template, ...rest } = story();
    // Makes the style global instead of letting Angular scope it
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
      ...rest,
      template: `
        <bx-skip-to-content href="#main-content"></bx-skip-to-content>
        <div id="main-content" data-floating-menu-container role="main" class="bx--body bx-ce-demo-devenv--container">
          ${template}
        </div>
      `,
    };
  },
];
