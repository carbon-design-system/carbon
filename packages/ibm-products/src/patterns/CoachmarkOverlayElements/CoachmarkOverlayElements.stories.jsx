/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import styles from './_story-styles.scss?inline';
import DocsPage from './CoachmarkOverlayElements.mdx';
import { CoachmarkOverlayElementsExample } from './example/components/CoachmarkOverlayElementsExample.tsx';

export default {
  title: 'Patterns/Coachmark Overlay Elements',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    styles,
    docs: {
      page: DocsPage,
    },
  },
};

export const CoachmarkOverlay = CoachmarkOverlayElementsExample.bind({});
CoachmarkOverlay.args = {};
