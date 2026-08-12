/**
 * Copyright IBM Corp. 2024, 2026
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
    // ── Hidden: inherited HTML attrs not relevant to this component ──────────
    style: { table: { disable: true } },

    className: {
      control: false,
      description:
        'Provide an optional class to be applied to the containing node.',
      table: {
        category: 'HTML attributes',
        type: { summary: 'string' },
      },
    },

    // ── Appearance ───────────────────────────────────────────────────────────
    color: {
      control: 'color',
      description:
        'Fade-out color. Any valid CSS color value. Defaults to the current layer-01 token so the gradient blends with the page background.',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },
    hideStartGradient: {
      control: 'boolean',
      description:
        'Set to true to hide the gradient on the start side (top for vertical scroll, left for horizontal scroll).',
      table: {
        category: 'Appearance',
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    scrollElementClassName: {
      control: 'text',
      description:
        'Optional className applied to the inner scrollable element.',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },

    // ── Content ──────────────────────────────────────────────────────────────
    children: {
      control: false,
      description: 'Provide the contents of the ScrollGradient.',
      table: {
        category: 'Content',
        type: { summary: 'React.ReactNode' },
      },
    },

    // ── Callbacks ────────────────────────────────────────────────────────────
    getScrollElementRef: {
      control: false,
      description:
        'Optional function to get a reference to the scrollable DOM element.',
      table: {
        category: 'Callbacks',
        type: { summary: '(element: HTMLDivElement | null) => void' },
      },
    },
    onScroll: {
      control: false,
      description: 'Optional scroll handler.',
      table: {
        category: 'Callbacks',
        type: { summary: 'React.UIEventHandler<HTMLDivElement>' },
      },
    },
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
