/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { SEARCH_SIZE } from './defs';
import './search-skeleton';
import '../layer';
import './index';
import { withLayers } from '../../../.storybook/decorators/with-layers';

const sizes = {
  [`Extra small size (${SEARCH_SIZE.EXTRA_SMALL})`]: SEARCH_SIZE.EXTRA_SMALL,
  [`Small size (${SEARCH_SIZE.SMALL})`]: SEARCH_SIZE.SMALL,
  [`Medium size (${SEARCH_SIZE.MEDIUM})`]: SEARCH_SIZE.MEDIUM,
  [`Large size (${SEARCH_SIZE.LARGE})`]: SEARCH_SIZE.LARGE,
};

const args = {
  autoComplete: 'off',
  closeButtonLabelText: 'Clear search input',
  defaultWidth: 800,
  disabled: false,
  labelText: 'Search',
  placeholder: 'Placeholder text',
  role: 'searchbox',
  size: SEARCH_SIZE.MEDIUM,
  type: 'text',
  value: '',
};

const argTypes = {
  autoComplete: {
    control: 'text',
    description:
      'Specify an optional value for the <code>autocomplete</code> property on the underlying <code>&lt;input&gt;</code>, defaults to "off".',
  },
  closeButtonLabelText: {
    control: 'text',
    description:
      'Specify a label to be read by screen readers on the "close" button.',
  },
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  disabled: {
    control: 'boolean',
    description:
      'Specify whether the <code>&lt;input&gt;</code> should be disabled.',
  },
  expanded: {
    control: 'boolean',
    description: 'Specify whether the Expandable Search should be expanded',
  },
  labelText: {
    control: 'text',
    description: 'Provide the label text for the Search icon.',
  },
  placeholder: {
    control: 'text',
    description:
      'Provide an optional placeholder text for the Search. Note: if the label and placeholder differ, VoiceOver on Mac will read both.',
  },
  role: {
    control: 'text',
    description:
      'Specify the role for the underlying <code>&lt;input&gt;</code>, defaults to <code>searchbox</code>.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Search.',
    options: sizes,
  },
  type: {
    control: 'text',
    description:
      'Optional prop to specify the type of the <code>&lt;input&gt;</code>.',
  },
  value: {
    control: 'text',
    description: 'Specify the value of the <code>&lt;input&gt;</code>.',
  },
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const {
      autoComplete,
      closeButtonLabelText,
      colorScheme,
      disabled,
      labelText,
      placeholder,
      defaultWidth,
      size,
      role,
      type,
      value,
      onInput,
    } = args ?? {};
    return html`
      <div style="width: ${defaultWidth}px;">
        <cds-search
          autocomplete="${autoComplete}"
          close-button-label-text="${ifDefined(closeButtonLabelText)}"
          color-scheme="${ifDefined(colorScheme)}"
          ?disabled="${disabled}"
          label-text="${ifDefined(labelText)}"
          placeholder="${ifDefined(placeholder)}"
          size="${ifDefined(size)}"
          type="${ifDefined(type)}"
          role=${role}
          value="${ifDefined(value)}"
          @cds-search-input="${onInput}"></cds-search>
      </div>
    `;
  },
};

export const Expandable = {
  args: { ...args, expanded: false },
  argTypes,
  render: (args) => {
    const {
      autoComplete,
      closeButtonLabelText,
      colorScheme,
      disabled,
      labelText,
      placeholder,
      defaultWidth,
      expanded,
      size,
      role,
      type,
      value,
      onInput,
    } = args ?? {};
    return html`
      <div style="width: ${defaultWidth}px;">
        <cds-search
          autocomplete="${autoComplete}"
          close-button-label-text="${ifDefined(closeButtonLabelText)}"
          color-scheme="${ifDefined(colorScheme)}"
          ?disabled="${disabled}"
          label-text="${ifDefined(labelText)}"
          placeholder="${ifDefined(placeholder)}"
          size="${ifDefined(size)}"
          type="${ifDefined(type)}"
          role=${role}
          value="${ifDefined(value)}"
          @cds-search-input="${onInput}"
          expandable
          ?expanded=${expanded}></cds-search>
      </div>
    `;
  },
};

export const ExpandableWithLayer = {
  args: { ...args, expanded: false },
  argTypes,
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => {
    const {
      autoComplete,
      closeButtonLabelText,
      colorScheme,
      disabled,
      labelText,
      placeholder,
      defaultWidth,
      expanded,
      size,
      role,
      type,
      value,
      onInput,
    } = args ?? {};
    return html`
      <div style="width: ${defaultWidth}px;">
        <cds-search
          autocomplete="${autoComplete}"
          close-button-label-text="${ifDefined(closeButtonLabelText)}"
          color-scheme="${ifDefined(colorScheme)}"
          ?disabled="${disabled}"
          label-text="${ifDefined(labelText)}"
          placeholder="${ifDefined(placeholder)}"
          size="${ifDefined(size)}"
          type="${ifDefined(type)}"
          role=${role}
          value="${ifDefined(value)}"
          @cds-search-input="${onInput}"
          expandable
          ?expanded=${expanded}></cds-search>
      </div>
    `;
  },
};

export const Skeleton = {
  args,
  argTypes: {
    ...argTypes,
    size: {
      ...argTypes.size,
      description: 'Specify the size of the Search Skeleton.',
    },
  },
  parameters: {
    controls: {
      include: ['size', 'defaultWidth'],
    },
  },
  render: (args) => {
    const { size, defaultWidth } = args ?? {};
    return html` <div style="width: ${defaultWidth}px;">
      <cds-search-skeleton size="${size}"></cds-search-skeleton>
    </div>`;
  },
};

export const WithLayer = {
  args,
  argTypes,
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => {
    const {
      autoComplete,
      closeButtonLabelText,
      colorScheme,
      disabled,
      labelText,
      placeholder,
      defaultWidth,
      size,
      role,
      type,
      value,
      onInput,
    } = args ?? {};
    return html`
      <div style="width: ${defaultWidth}px;">
        <cds-search
          autocomplete="${autoComplete}"
          close-button-label-text="${ifDefined(closeButtonLabelText)}"
          color-scheme="${ifDefined(colorScheme)}"
          ?disabled="${disabled}"
          label-text="${ifDefined(labelText)}"
          placeholder="${ifDefined(placeholder)}"
          size="${ifDefined(size)}"
          type="${ifDefined(type)}"
          role=${role}
          value="${ifDefined(value)}"
          @cds-search-input="${onInput}"></cds-search>
      </div>
    `;
  },
};

const meta = {
  title: 'Components/Search',
};

export default meta;
