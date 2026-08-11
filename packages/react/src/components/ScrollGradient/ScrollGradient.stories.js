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

const style = { width: '100%', height: '100%' };

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
    children: { table: { disable: true } },
    className: { table: { disable: true } },
    color: {
      control: 'color',
      description:
        'Fade-out color. Any valid CSS color value. Defaults to the current layer-01 token.',
    },
    getScrollElementRef: { table: { disable: true } },
    hideStartGradient: { control: 'boolean' },
    onScroll: { table: { disable: true } },
    scrollElementClassName: { table: { disable: true } },
  },
};

export const Default = {
  args: {
    style,
  },
  render: (args) => (
    <div className="scroll-gradient-story-container">
      <ScrollGradient {...args}>{storyChildren}</ScrollGradient>
    </div>
  ),
};
Default.storyName = 'Default (vertical)';

export const WithXAndYAxis = {
  args: {
    style,
  },
  render: (args) => (
    <div className="scroll-gradient-story-container--sm">
      <ScrollGradient {...args}>
        <div style={{ width: '1500px' }}>{storyChildren}</div>
      </ScrollGradient>
    </div>
  ),
};
WithXAndYAxis.storyName = 'With x and y axis';
