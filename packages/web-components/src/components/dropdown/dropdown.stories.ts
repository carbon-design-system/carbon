/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DROPDOWN_DIRECTION, DROPDOWN_SIZE, DROPDOWN_TYPE } from './dropdown';
import { iconLoader } from '../../globals/internal/icon-loader';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import './dropdown-item';
import './dropdown-skeleton';
import '../ai-label';
import '../toggle-tip';
import '../link';
import '../button';

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Medium size (${DROPDOWN_SIZE.MEDIUM})`]: DROPDOWN_SIZE.MEDIUM,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const types = {
  Default: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const items = [
  {
    value: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    value: 'option-4',
    text: 'Option 4',
  },
  {
    value: 'option-5',
    text: 'Option 5',
  },
  {
    value: 'option-6',
    text: 'Option 6',
  },
  {
    value: 'option-7',
    text: 'Option 7',
  },
  {
    value: 'option-8',
    text: 'Option 8',
  },
];

const defaultArgs = {
  ariaLabel: '',
  direction: DROPDOWN_DIRECTION.BOTTOM,
  disabled: false,
  hideLabel: false,
  helperText: '',
  invalid: false,
  invalidText: '',
  label: 'This is an example label',
  open: false,
  readOnly: false,
  size: null,
  titleText: 'This is an example title',
  type: null,
  value: '',
  warn: false,
  warnText: '',
};

const controls = {
  ariaLabel: {
    control: 'text',
    description:
      'Specify a label to be read by screen readers on the container node.',
  },
  direction: {
    control: 'select',
    options: directionOptions,
    description: `Specify the direction of the dropdown. Can be either 'top' or 'bottom'.`,
  },
  disabled: {
    control: 'boolean',
    description: `Disable the control.`,
  },
  helperText: {
    control: 'text',
    description: `Provide helper text that is used alongside the control label for additional help.`,
  },
  hideLabel: {
    control: 'boolean',
    description: `Specify whether the title text should be hidden or not.`,
  },
  invalid: {
    control: 'boolean',
    description: `Specify if the currently selected value is invalid.`,
  },
  invalidText: {
    control: 'text',
    description: `Message which is displayed if the value is invalid.`,
  },
  label: {
    control: 'text',
    description: `The default content of the trigger button.`,
  },
  open: {
    control: 'boolean',
    description: `Specify if the dropdown should be open, or not.`,
  },
  readOnly: {
    control: 'boolean',
    description: `Whether or not the Dropdown is readonly.`,
  },
  size: {
    control: 'select',
    options: sizes,
    description: `Specify the size of the ListBox. Currently supports either 'sm', 'md' or 'lg' as an option.`,
  },
  titleText: {
    control: 'text',
    description: `Text that will be read by a screen reader when visiting this control.`,
  },
  type: {
    control: 'select',
    options: types,
    description: `The dropdown type, 'default' or 'inline'`,
  },
  value: {
    control: 'text',
    description: `The value of the selected item.`,
  },
  warn: {
    control: 'boolean',
    description: `Specify whether the control is currently in warning state`,
  },
  warnText: {
    control: 'text',
    description: `Provide the text that is displayed when the control is in warning state`,
  },
};

export const Default = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'This is some helper text',
    invalidText: 'invalid selection',
    warnText: 'please notice the warning',
  },
  render: ({
    ariaLabel,
    open,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  }) => html`
    <cds-dropdown
      aria-label=${ariaLabel}
      ?open=${open}
      ?disabled="${disabled}"
      ?hide-label=${hideLabel}
      helper-text=${helperText}
      ?invalid=${invalid}
      ?read-only=${readOnly}
      invalid-text=${invalidText}
      direction="${direction}"
      title-text=${ifDefined(titleText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?warn=${warn}
      warn-text=${warnText}>
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `,
};

export const ExperimentalAutoAlign = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    direction: DROPDOWN_DIRECTION.TOP,
    helperText: 'This is some helper text',
    label: 'Option 1',
    titleText: 'Dropdown label',
    value: 'option-1',
  },
  render: ({
    ariaLabel,
    open,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  }) => html`
    <div style="width:400px">
      <div style="height: 300px"></div>
      <cds-dropdown
        aria-label=${ariaLabel}
        ?open=${open}
        ?disabled="${disabled}"
        ?hide-label=${hideLabel}
        helper-text=${helperText}
        ?invalid=${invalid}
        ?read-only=${readOnly}
        invalid-text=${invalidText}
        direction="${direction}"
        title-text=${ifDefined(titleText)}
        size="${ifDefined(size)}"
        type="${ifDefined(type)}"
        value=${ifDefined(value)}
        label=${ifDefined(label)}
        ?warn=${warn}
        warn-text=${warnText}>
        ${items.map(
          (elem) => html`
            <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-dropdown-item
            >
          `
        )}
      </cds-dropdown>
      <div style="height: 800px"></div>
    </div>
  `,
};

export const Inline = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    label: 'Option 1',
    titleText: 'Inline dropdown label',
    type: DROPDOWN_TYPE.INLINE,
    value: 'option-1',
  },
  render: ({
    ariaLabel,
    open,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  }) => html`
    <cds-dropdown
      aria-label=${ariaLabel}
      ?open=${open}
      ?disabled="${disabled}"
      ?hide-label=${hideLabel}
      helper-text=${helperText}
      ?invalid=${invalid}
      ?read-only=${readOnly}
      invalid-text=${invalidText}
      direction="${direction}"
      title-text=${ifDefined(titleText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?warn=${warn}
      warn-text=${warnText}>
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `,
};

export const InlineWithLayer = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    label: 'Option 1',
    titleText: 'Inline dropdown label',
    type: DROPDOWN_TYPE.INLINE,
    value: 'option-1',
  },
  render: ({
    ariaLabel,
    open,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  }) => html`
    <sb-template-layers>
      <div style="width:400px">
        <cds-dropdown
          aria-label=${ariaLabel}
          ?open=${open}
          ?disabled="${disabled}"
          ?hide-label=${hideLabel}
          helper-text=${helperText}
          ?invalid=${invalid}
          ?read-only=${readOnly}
          invalid-text=${invalidText}
          direction="${direction}"
          title-text=${ifDefined(titleText)}
          size="${ifDefined(size)}"
          type="${ifDefined(type)}"
          value=${ifDefined(value)}
          label=${ifDefined(label)}
          ?warn=${warn}
          warn-text=${warnText}>
          ${items.map(
            (elem) => html`
              <cds-dropdown-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-dropdown-item
              >
            `
          )}
        </cds-dropdown>
      </div>
    </sb-template-layers>
  `,
};

export const Skeleton = {
  argTypes: controls,
  args: defaultArgs,
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => html` <cds-dropdown-skeleton></cds-dropdown-skeleton> `,
};

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
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

export const WithAILabel = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'This is some helper text',
    label: 'Option 1',
    titleText: 'Dropdown title',
    value: 'option-1',
  },
  render: ({
    ariaLabel,
    open,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  }) => html`
    <cds-dropdown
      aria-label=${ariaLabel}
      ?open=${open}
      ?disabled="${disabled}"
      ?hide-label=${hideLabel}
      helper-text=${helperText}
      ?invalid=${invalid}
      ?read-only=${readOnly}
      invalid-text=${invalidText}
      direction="${direction}"
      title-text=${ifDefined(titleText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?warn=${warn}
      warn-text=${warnText}>
      <cds-ai-label alignment="bottom-left"> ${content}${actions}</cds-ai-label>
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  `,
};

export const WithLayer = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'This is some helper text',
    label: 'Option 1',
    titleText: 'Dropdown label',
    value: 'option-1',
  },
  render: ({
    ariaLabel,
    open,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  }) => html`
    <sb-template-layers>
      <div style="width:400px">
        <cds-dropdown
          aria-label=${ariaLabel}
          ?open=${open}
          ?disabled="${disabled}"
          ?hide-label=${hideLabel}
          helper-text=${helperText}
          ?invalid=${invalid}
          ?read-only=${readOnly}
          invalid-text=${invalidText}
          direction="${direction}"
          title-text=${ifDefined(titleText)}
          size="${ifDefined(size)}"
          type="${ifDefined(type)}"
          value=${ifDefined(value)}
          label=${ifDefined(label)}
          ?warn=${warn}
          warn-text=${warnText}>
          ${items.map(
            (elem) => html`
              <cds-dropdown-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-dropdown-item
              >
            `
          )}
        </cds-dropdown>
      </div>
    </sb-template-layers>
  `,
};

export const WithToggletipLabel = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    label: 'placeholder',
    titleText: 'Dropdown title',
    value: 'placeholder',
  },
  render: ({
    ariaLabel,
    open,
    direction,
    disabled,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    readOnly,
    size,
    type,
    value,
    label,
    warn,
    warnText,
  }) => html`
    <cds-dropdown
      aria-label=${ariaLabel}
      ?open=${open}
      ?disabled="${disabled}"
      ?hide-label=${hideLabel}
      ?invalid=${invalid}
      ?read-only=${readOnly}
      invalid-text=${invalidText}
      direction="${direction}"
      title-text=${ifDefined(titleText)}
      size="${ifDefined(size)}"
      type="${ifDefined(type)}"
      value=${ifDefined(value)}
      label=${ifDefined(label)}
      ?warn=${warn}
      warn-text=${warnText}>
      <span slot="title-text" style="display: flex; align-items: center;">
        ${titleText}
        <cds-toggletip alignment="bottom">
          <p slot="body-text">
            Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
          </p>
          <cds-link href="#" slot="actions">Link action</cds-link>
          <cds-button size="sm" slot="actions">Button</cds-button>
        </cds-toggletip>
      </span>
      ${[]}
    </cds-dropdown>
  `,
};

const meta = {
  title: 'Components/Dropdown',
  decorators: [
    (story, { name }) => {
      const isLayerStory = name.toLowerCase().includes('layer');
      const isSkeletonStory = name.toLowerCase().includes('skeleton');

      const width = isLayerStory
        ? ''
        : isSkeletonStory
          ? 'width:300px'
          : 'width:400px';

      return html` <div style="${width}">${story()}</div> `;
    },
  ],
};

export default meta;
