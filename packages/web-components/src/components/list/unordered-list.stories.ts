/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import storyDocs from './unordered-list.mdx';
import './index';

const defaultArgs = {
  isExpressive: false,
  nested: false,
};

const controls = {
  isExpressive: {
    control: 'boolean',
    description: 'Specify whether this ordered list expressive or not.',
  },
  type: {
    control: 'select',
    options: ['disc', 'circle', 'square', 'hyphen', 'custom'],
    description: 'Specify the marker type for the list items.',
  },
  customMarker: {
    control: 'text',
    description: 'Specify a custom marker character/content (only used when type="custom").',
    if: { arg: 'type', eq: 'custom' },
  },
};

export const Default = {
  args: {
    ...defaultArgs,
    type: undefined,
  },
  argTypes: {
    ...controls,
    nested: {
      control: 'boolean',
      description: 'Specify whether to use nested styling for child lists.',
    },
  },
  render: ({ isExpressive, nested, type, customMarker }) =>
    html`<cds-unordered-list
      ?is-expressive="${isExpressive}"
      ?nested=${nested}
      ${type ? `type="${type}"` : ''}
      ${customMarker ? `custom-marker="${customMarker}"` : ''}
    >
      <cds-list-item>Unordered List level 1</cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
    </cds-unordered-list>`,
};

export const Nested = {
  render: () =>
    html`<cds-unordered-list>
      <cds-list-item>
        Unordered List level 1
        <cds-unordered-list>
          <cds-list-item>Unordered List level 2</cds-list-item>
          <cds-list-item>
            Unordered List level 2
            <cds-unordered-list>
              <cds-list-item>Unordered List level 3</cds-list-item>
              <cds-list-item>Unordered List level 3</cds-list-item>
            </cds-unordered-list>
          </cds-list-item>
        </cds-unordered-list>
      </cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
      <cds-list-item>Unordered List level 1</cds-list-item>
    </cds-unordered-list>`,
};

export const MarkerTypes = {
  render: () =>
    html`<div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <h3>Disc (default filled circle)</h3>
        <cds-unordered-list type="disc">
          <cds-list-item>Item with disc marker</cds-list-item>
          <cds-list-item>Item with disc marker</cds-list-item>
          <cds-list-item>Item with disc marker</cds-list-item>
        </cds-unordered-list>
      </div>
      <div>
        <h3>Circle (hollow circle)</h3>
        <cds-unordered-list type="circle">
          <cds-list-item>Item with circle marker</cds-list-item>
          <cds-list-item>Item with circle marker</cds-list-item>
          <cds-list-item>Item with circle marker</cds-list-item>
        </cds-unordered-list>
      </div>
      <div>
        <h3>Square</h3>
        <cds-unordered-list type="square">
          <cds-list-item>Item with square marker</cds-list-item>
          <cds-list-item>Item with square marker</cds-list-item>
          <cds-list-item>Item with square marker</cds-list-item>
        </cds-unordered-list>
      </div>
      <div>
        <h3>Hyphen (default for top-level)</h3>
        <cds-unordered-list type="hyphen">
          <cds-list-item>Item with hyphen marker</cds-list-item>
          <cds-list-item>Item with hyphen marker</cds-list-item>
          <cds-list-item>Item with hyphen marker</cds-list-item>
        </cds-unordered-list>
      </div>
      <div>
        <h3>Custom marker</h3>
        <cds-unordered-list type="custom" custom-marker="→">
          <cds-list-item>Item with custom arrow marker</cds-list-item>
          <cds-list-item>Item with custom arrow marker</cds-list-item>
          <cds-list-item>Item with custom arrow marker</cds-list-item>
        </cds-unordered-list>
      </div>
    </div>`,
};

export const NestedWithMarkerTypes = {
  render: () =>
    html`<cds-unordered-list type="disc">
      <cds-list-item>
        Level 1 with disc
        <cds-unordered-list type="circle">
          <cds-list-item>Level 2 with circle</cds-list-item>
          <cds-list-item>
            Level 2 with circle
            <cds-unordered-list type="square">
              <cds-list-item>Level 3 with square</cds-list-item>
              <cds-list-item>Level 3 with square</cds-list-item>
            </cds-unordered-list>
          </cds-list-item>
        </cds-unordered-list>
      </cds-list-item>
      <cds-list-item>Level 1 with disc</cds-list-item>
      <cds-list-item>Level 1 with disc</cds-list-item>
    </cds-unordered-list>`,
};

const meta = {
  title: 'Components/Unordered list',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};

export default meta;
