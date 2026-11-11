/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './_story-styles.scss';
import DocsPage from './CoachmarkOverlayElements.mdx';
import { CoachmarkOverlayElementsExample } from './example/components/CoachmarkOverlayElementsExample.tsx';

export default {
  title: 'Examples/Coachmark/Coachmark Overlay Elements',
  component: () => {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: DocsPage,
    },
  },
};

const CoachmarkOverlayPattern = (args) => {
  return <CoachmarkOverlayElementsExample {...args} />;
};

export const CoachmarkOverlay = CoachmarkOverlayPattern.bind({});
CoachmarkOverlay.args = {};
