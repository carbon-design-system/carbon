/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import styles from './_story-styles.scss?inline';
import DocsPage from './CoachmarkFixed.mdx';
import { CoachmarkFixedExample } from './example/components/CoachmarkFixedExample';

export default {
  title: 'Patterns/Coachmark Fixed',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
};

export const CoachmarkFixed = CoachmarkFixedExample.bind({});
CoachmarkFixed.args = {};
