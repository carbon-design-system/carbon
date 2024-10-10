/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { INPUT_SIZE } from '../text-input/text-input';
import './search-skeleton';
import '../layer';
import '../../../.storybook/templates/with-layer';
import './index';

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const args = {
  autoComplete: 'off',
  closeButtonLabelText: 'Clear search input',
  disabled: false,
  labelText: 'Search',
  placeholder: 'Placeholder text',
  playgroundWidth: 300,
  role: 'searchbox',
  size: null,
  type: 'text',
  value: 'Default value',
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
  disabled: {
    control: 'boolean',
    description:
      'Specify whether the <code>&lt;input&gt;</code> should be disabled.',
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
  playgroundWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
    description: 'Playground width',
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
  render: () => {
    return html`
      <cds-search
        size="lg"
        close-button-label-text="Clear search input"
        label-text="Search"
        placeholder="Find your items"
        type="text"></cds-search>
    `;
  },
};

export const Disabled = {
  render: () => {
    return html`
      <cds-search
        size="lg"
        disabled
        close-button-label-text="Clear search input"
        label-text="Search"
        placeholder="Find your items"
        type="text"></cds-search>
    `;
  },
};

export const Expandable = {
  render: () => {
    return html`
      <cds-search
        size="lg"
        expandable
        close-button-assistive-text="Clear search input"
        label-text="Search"
        placeholder="Find your items"
        type="text"></cds-search>
    `;
  },
};

export const ExpandableWithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <cds-search size="lg" expandable placeholder="Layer two"></cds-search>
      </sb-template-layers>
    `;
  },
};

export const WithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <cds-search size="lg" placeholder="Find your items"></cds-search>
      </sb-template-layers>
    `;
  },
};

export const Playground = {
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
      playgroundWidth,
      size,
      role,
      type,
      value,
      onInput,
    } = args ?? {};

    const mainDiv = document.querySelector('#main-content');

    if (mainDiv) {
      (mainDiv as HTMLElement).style.width = `${playgroundWidth}px`;
    }

    return html`
      <cds-search
        autocomplete="${autoComplete}"
        close-button-assistive-text="${ifDefined(closeButtonLabelText)}"
        color-scheme="${ifDefined(colorScheme)}"
        ?disabled="${disabled}"
        label-text="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        size="${ifDefined(size)}"
        type="${ifDefined(type)}"
        role=${role}
        value="${ifDefined(value)}"
        @cds-search-input="${onInput}">
      </cds-search>
    `;
  },
};

const meta = {
  title: 'Components/Search',
};

export default meta;
