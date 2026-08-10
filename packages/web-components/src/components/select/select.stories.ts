/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
// @ts-ignore
import { prefix } from '../../globals/settings';
import { INPUT_SIZE } from '../text-input/text-input';
import './index';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../form/form-item';
import '../layer';
import '../ai-label';
import '../icon-button';
import { iconLoader } from '../../globals/internal/icon-loader';
import { withLayers } from '../../../.storybook/decorators/with-layers';

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      This recommendation is based on current service availability and the
      location of your existing resources.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

const sizes = {
  [`Extra small size (${INPUT_SIZE.EXTRA_SMALL})`]: INPUT_SIZE.EXTRA_SMALL,
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const sharedArgs = {
  disabled: false,
  helperText: 'Select the region where your resources will be hosted.',
  hideLabel: false,
  id: 'select',
  inline: false,
  invalid: false,
  invalidText: 'Select a deployment region.',
  labelStylesDisable: false,
  labelText: 'Deployment region',
  name: 'deployment-region',
  placeholder: '',
  size: INPUT_SIZE.MEDIUM,
  readOnly: false,
  warn: false,
  warnText: 'This region has limited availability.',
  value: '',
};

const sharedArgTypes = {
  disabled: {
    control: 'boolean',
    description: 'Specify whether the control is disabled.',
  },
  helperText: {
    control: 'text',
    description:
      'Provide text that is used alongside the control label for additional help.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the label should be hidden, or not.',
  },
  inline: {
    control: 'boolean',
    description: 'Specify whether you want the inline version of this control.',
  },
  id: {
    control: 'text',
    description: 'Specify the id for the label.',
  },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  labelStylesDisable: {
    control: 'boolean',
    description: 'Specify if you want to disable the default label styling',
  },
  labelText: {
    control: 'text',
    description:
      'Provide label text to be read by screen readers when interacting with the control.',
  },
  name: {
    control: 'text',
    description: 'Specify the name used when submitting form data.',
  },
  placeholder: {
    control: 'text',
    description:
      'Placeholder text to be used with the <code>&lt;input&gt;</code>.',
  },
  size: {
    control: 'select',
    description: 'Specify the size of the Select Input.',
    options: sizes,
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether the select should be read-only.',
  },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
  value: {
    control: 'text',
    description: 'The value of the selected item.',
  },
  onInput: {
    action: `${prefix}-select-selected`,
  },
};

const sharedControls = Object.keys(sharedArgTypes);
const nonInlineArgTypes = {
  ...sharedArgTypes,
  inline: {
    ...sharedArgTypes.inline,
    table: { readonly: true },
  },
};

const selectItems = html`
  <cds-select-item value="">Choose a region</cds-select-item>
  <cds-select-item value="us-south">Dallas (us-south)</cds-select-item>
  <cds-select-item value="us-east">Washington, DC (us-east)</cds-select-item>
  <cds-select-item value="eu-de">Frankfurt (eu-de)</cds-select-item>
  <cds-select-item value="au-syd">Sydney (au-syd)</cds-select-item>
`;

export const Default = {
  args: sharedArgs,
  argTypes: sharedArgTypes,
  parameters: {
    controls: { include: sharedControls },
  },
  render: (args) => {
    const {
      disabled,
      helperText,
      hideLabel,
      id,
      inline,
      invalid,
      invalidText,
      labelStylesDisable,
      labelText,
      name,
      placeholder,
      size,
      readOnly,
      warn,
      warnText,
      value,
      onInput,
    } = args ?? {};
    return html`
      <cds-form-item>
        <cds-select
          id="${id}"
          ?inline="${inline}"
          ?disabled="${disabled}"
          helper-text="${ifDefined(helperText)}"
          ?hide-label="${hideLabel}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          ?label-styles-disable="${labelStylesDisable}"
          label-text="${ifDefined(labelText)}"
          name="${ifDefined(name)}"
          placeholder="${ifDefined(placeholder)}"
          size="${ifDefined(size)}"
          ?readonly="${readOnly}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}"
          value="${ifDefined(value)}"
          @cds-select-selected="${onInput}">
          ${selectItems}
        </cds-select>
      </cds-form-item>
    `;
  },
};

export const Inline = {
  args: {
    ...sharedArgs,
    inline: true,
  },
  argTypes: {
    ...sharedArgTypes,
    inline: {
      ...sharedArgTypes.inline,
      table: { readonly: true },
    },
  },
  parameters: {
    controls: { include: sharedControls },
  },
  render: (args) => {
    const {
      disabled,
      helperText,
      hideLabel,
      id,
      inline,
      invalid,
      invalidText,
      labelStylesDisable,
      labelText,
      name,
      placeholder,
      size,
      readOnly,
      warn,
      warnText,
      value,
      onInput,
    } = args ?? {};
    return html`
      <cds-form-item>
        <cds-select
          id="${id}"
          ?inline="${inline}"
          ?disabled="${disabled}"
          helper-text="${ifDefined(helperText)}"
          ?hide-label="${hideLabel}"
          ?invalid="${invalid}"
          invalid-text="${ifDefined(invalidText)}"
          ?label-styles-disable="${labelStylesDisable}"
          label-text="${ifDefined(labelText)}"
          name="${ifDefined(name)}"
          placeholder="${ifDefined(placeholder)}"
          size="${ifDefined(size)}"
          ?readonly="${readOnly}"
          ?warn="${warn}"
          warn-text="${ifDefined(warnText)}"
          value="${ifDefined(value)}"
          @cds-select-selected="${onInput}">
          ${selectItems}
        </cds-select>
      </cds-form-item>
    `;
  },
};

export const Skeleton = {
  args: {
    hideLabel: false,
  },
  argTypes: {
    hideLabel: sharedArgTypes.hideLabel,
  },
  parameters: {
    controls: { include: ['hideLabel'] },
  },
  render: ({ hideLabel }) => html`
    <cds-select-skeleton ?hide-label="${hideLabel}"></cds-select-skeleton>
  `,
};

export const WithAILabel = {
  args: sharedArgs,
  argTypes: nonInlineArgTypes,
  parameters: {
    controls: { include: sharedControls },
  },
  render: (args) => {
    const {
      disabled,
      helperText,
      hideLabel,
      id,
      invalid,
      invalidText,
      labelStylesDisable,
      labelText,
      name,
      placeholder,
      size,
      readOnly,
      warn,
      warnText,
      value,
      onInput,
    } = args ?? {};

    return html` <div style="width: 400px">
      <cds-select
        id="${id}"
        ?inline="${false}"
        ?disabled="${disabled}"
        helper-text="${ifDefined(helperText)}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        ?label-styles-disable="${labelStylesDisable}"
        label-text="${ifDefined(labelText)}"
        name="${ifDefined(name)}"
        placeholder="${ifDefined(placeholder)}"
        size="${ifDefined(size)}"
        ?readonly="${readOnly}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        value="${ifDefined(value)}"
        @cds-select-selected="${onInput}">
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
        ${selectItems}
      </cds-select>
    </div>`;
  },
};

export const WithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
    controls: { include: sharedControls },
  },
  args: sharedArgs,
  argTypes: nonInlineArgTypes,
  render: (args) => {
    const {
      disabled,
      helperText,
      hideLabel,
      id,
      invalid,
      invalidText,
      labelStylesDisable,
      labelText,
      name,
      placeholder,
      size,
      readOnly,
      warn,
      warnText,
      value,
      onInput,
    } = args ?? {};

    return html`
      <cds-select
        id="${id}"
        ?inline="${false}"
        ?disabled="${disabled}"
        helper-text="${ifDefined(helperText)}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        ?label-styles-disable="${labelStylesDisable}"
        label-text="${ifDefined(labelText)}"
        name="${ifDefined(name)}"
        placeholder="${ifDefined(placeholder)}"
        size="${ifDefined(size)}"
        ?readonly="${readOnly}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        value="${ifDefined(value)}"
        @cds-select-selected="${onInput}">
        ${selectItems}
      </cds-select>
    `;
  },
};

const meta = {
  decorators: [
    (story) => {
      return html`<div style="width: 400px">${story()}</div>`;
    },
  ],
  title: 'Components/Select',
};

export default meta;
