/**
 * Copyright IBM Corp.2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './fluid-search';
import './fluid-search-skeleton';

const args = {
  defaultWidth: 400,
  closeButtonLabelText: 'Clear search input',
  disabled: false,
  labelText: 'Search',
  placeholder: 'Prompt text',
};

const argTypes = {
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
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
  role: {
    control: 'text',
    description:
      'Specify the role for the underlying <code>&lt;input&gt;</code>, defaults to <code>searchbox</code>.',
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
  render: ({
    defaultWidth,
    autoComplete,
    closeButtonLabelText,
    disabled,
    labelText,
    placeholder,
    role,
    type,
    value,
    onInput,
  }) => html`
    <div style="width:${defaultWidth}px;">
      <cds-fluid-search
        autocomplete="${autoComplete}"
        close-button-label-text="${ifDefined(closeButtonLabelText)}"
        ?disabled="${disabled}"
        label-text="${ifDefined(labelText)}"
        placeholder="${ifDefined(placeholder)}"
        type="${ifDefined(type)}"
        role=${role}
        value="${ifDefined(value)}"
        @cds-search-input="${onInput}">
      </cds-fluid-search>
    </div>
  `,
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  args: {
    defaultWidth: 400,
  },
  argTypes: {
    defaultWidth: {
      control: { type: 'range', min: 300, max: 800, step: 50 },
    },
  },
  render: ({ defaultWidth }) => html`
    <div style="width: ${defaultWidth}px;">
      <cds-fluid-search-skeleton></cds-fluid-search-skeleton>
    </div>
  `,
};

export default {
  title: 'Components/Fluid Components/FluidSearch',
};
