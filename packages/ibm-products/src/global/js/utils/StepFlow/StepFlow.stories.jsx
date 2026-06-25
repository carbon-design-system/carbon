/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mdx from './StepFlow.mdx';

import styles from './_storybook-styles.scss?inline';
import { Example as TearsheetExample } from './story-assets/Tearsheet/Example';
import { Example as SidePanelExample } from './story-assets/SidePanel/Example';
import { StepGroup } from './StepGroup';

export default {
  title: 'Utilities/Step flows',
  component: StepGroup,
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

export const tearsheetWithSteps = TearsheetExample.bind({});
tearsheetWithSteps.args = {};

export const sidePanelWithSteps = SidePanelExample.bind({});
sidePanelWithSteps.args = {};
