/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';
import React from 'react';
import { ScrollGradient } from './ScrollGradient';
import mdx from './docs/overview.mdx';

const storyCopy =
  'Use case specific content to display in the ScrollGradient component. Use case specific content to display in the ScrollGradient component. Use case specific content to display in the ScrollGradient component. ';

const storyChildren = (
  <div style={{ padding: 16 }}>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
    <p>{storyCopy}</p>
  </div>
);

export default {
  title: 'Utilities/ScrollGradient',
  component: ScrollGradient,
  tags: ['autodocs'],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    // Component-specific props
    color: {
      control: 'color',
      description:
        'Fade-out color. Any valid CSS color value. Defaults to the current layer-01 token so the gradient blends with the page background.',
    },
    hideStartGradient: {
      control: 'boolean',
      description:
        'Set to true to hide the gradient on the start side (top for vertical scroll, left for horizontal scroll).',
    },
    scrollElementClassName: {
      control: 'text',
      description:
        'Optional className applied to the inner scrollable element.',
    },
    // Node/function props — no useful interactive control
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    getScrollElementRef: { table: { disable: true } },
    onScroll: { table: { disable: true } },
    // Inherited HTML attributes — hide to keep the panel clean
    style: { table: { disable: true } },
  },
};

export const Default = {
  args: {},
  render: (args) => (
    <div className="scroll-gradient-story-container">
      <ScrollGradient style={{ width: '100%', height: '100%' }} {...args}>
        {storyChildren}
      </ScrollGradient>
    </div>
  ),
};
Default.storyName = 'Default (vertical)';

export const WithXAndYAxis = {
  args: {},
  render: (args) => (
    <div className="scroll-gradient-story-container--sm">
      <ScrollGradient style={{ width: '100%', height: '100%' }} {...args}>
        <div style={{ width: '1500px' }}>{storyChildren}</div>
      </ScrollGradient>
    </div>
  ),
};
WithXAndYAxis.storyName = 'With x and y axis';
