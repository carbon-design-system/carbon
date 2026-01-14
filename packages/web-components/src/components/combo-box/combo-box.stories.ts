/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DROPDOWN_DIRECTION, DROPDOWN_SIZE } from './combo-box';
import './index';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../ai-label/index';
import { iconLoader } from '../../globals/internal/icon-loader';

const items = [
  {
    value: 'option-0',
    text: 'An example option that is really long to show what should be done to handle long text',
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
    text: 'Option 3',
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
];

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  'Regular size': null,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const defaultArgs = {
  direction: DROPDOWN_DIRECTION.BOTTOM,
  autoalign: false,
  allowCustomValue: false,
  disabled: false,
  helperText: 'Helper text',
  invalid: false,
  invalidText: 'Error message goes here',
  label: '',
  readOnly: false,
  size: null,
  titleText: 'Label',
  typeahead: false,
  value: '',
  warn: false,
  warnText: 'Warning message goes here',
};

const controls = {
  autoalign: {
    control: 'boolean',
    description:
      'Will auto-align the combo box. This attribute is currently experimental and is subject to future changes.',
  },
  allowCustomValue: {
    control: 'boolean',
    description: `Specify whether or not the ComboBox should allow a value that is not in the list to be entered in the input.`,
  },
  disabled: {
    control: 'boolean',
    description: `Specify if the control should be disabled, or not.`,
  },
  direction: {
    control: 'select',
    options: directionOptions,
    description: `Specify the direction of the combobox dropdown. Can be either top or bottom.`,
  },
  helperText: {
    control: 'text',
    description: `Provide helper text that is used alongside the control label for additional help.`,
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
  readOnly: {
    control: 'boolean',
    description: `Specify whether or not the component is read-only.`,
  },
  size: {
    control: 'select',
    options: sizes,
    description: `Specify the size of the ListBox. Currently supports either \`sm\`, \`md\` or \`lg\` as an option.`,
  },
  titleText: {
    control: 'text',
    description: `Provide text to be used in a <label> element that is tied to the combobox via ARIA attributes.`,
  },
  typeahead: {
    control: 'boolean',
    description: `**Experimental**: will enable autocomplete and typeahead for the input field.`,
  },
  value: {
    control: 'text',
    description: `The value of the selected item.`,
  },
  warn: {
    control: 'boolean',
    description: `Specify whether the control is currently in warning state.`,
  },
  warnText: {
    control: 'text',
    description: `Provide the text that is displayed when the control is in warning state.`,
  },
};

export const Default = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
  },
  render: (args) => {
    const {
      autoalign,
      allowCustomValue,
      disabled,
      helperText,
      invalid,
      titleText,
      direction,
      readOnly,
      warn,
      warnText,
      size,
      label,
      type,
      invalidText,
      value,
      typeahead,
    } = args ?? {};
    return html`
      <cds-combo-box
        ?disabled=${disabled}
        ?autoalign=${autoalign}
        helper-text=${ifDefined(helperText)}
        ?invalid=${invalid}
        invalid-text=${ifDefined(invalidText)}
        direction=${ifDefined(direction)}
        ?read-only=${readOnly}
        ?allow-custom-value=${allowCustomValue}
        title-text=${ifDefined(titleText)}
        size=${ifDefined(size)}
        type=${ifDefined(type)}
        value=${ifDefined(value)}
        label=${ifDefined(label)}
        ?warn=${warn}
        warn-text=${ifDefined(warnText)}
        ?typeahead=${typeahead}>
        ${items.map(
          (elem) => html`
            <cds-combo-box-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-combo-box-item
            >
          `
        )}
      </cds-combo-box>
    `;
  },
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

export const AllowCustomValue = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
    allowCustomValue: true,
  },
  render: (args) => {
    const {
      allowCustomValue,
      autoalign,
      disabled,
      helperText,
      invalid,
      titleText,
      hideLabel,
      direction,
      readOnly,
      warn,
      warnText,
      size,
      label,
      type,
      invalidText,
      value,
      typeahead,
    } = args ?? {};
    return html`
      <cds-combo-box
        allow-custom-value="true"
        direction=${ifDefined(direction)}
        ?disabled=${disabled}
        ?autoalign=${autoalign}
        helper-text=${ifDefined(helperText)}
        ?hide-label=${hideLabel}
        ?invalid=${invalid}
        invalid-text=${ifDefined(invalidText)}
        ?read-only=${readOnly}
        ?allow-custom-value=${allowCustomValue}
        title-text=${ifDefined(titleText)}
        size=${ifDefined(size)}
        type=${ifDefined(type)}
        value=${ifDefined(value)}
        label=${ifDefined(label)}
        ?warn=${warn}
        warn-text=${ifDefined(warnText)}
        ?typeahead=${typeahead}
        should-filter-item>
        <cds-combo-box-item value="Apple">Apple</cds-combo-box-item>
        <cds-combo-box-item value="Orange">Orange</cds-combo-box-item>
        <cds-combo-box-item value="Banana">Banana</cds-combo-box-item>
        <cds-combo-box-item value="Pineapple">Pineapple</cds-combo-box-item>
        <cds-combo-box-item value="Raspberry">Raspberry</cds-combo-box-item>
        <cds-combo-box-item value="Lime">Lime</cds-combo-box-item>
      </cds-combo-box>
    `;
  },
};

export const ExperimentalAutoAlign = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    autoalign: true,
    direction: DROPDOWN_DIRECTION.BOTTOM,
    helperText: 'Combobox helper text',
    titleText: 'ComboBox title',
  },
  render: (args) => {
    const {
      autoalign,
      allowCustomValue,
      disabled,
      helperText,
      invalid,
      titleText,
      hideLabel,
      direction,
      readOnly,
      warn,
      warnText,
      size,
      label,
      type,
      invalidText,
      value,
      typeahead,
    } = args ?? {};
    return html`
      <div style="width:400px">
        <div style="height: 300px"></div>
        <cds-combo-box
          ?autoalign=${autoalign}
          direction=${ifDefined(direction)}
          ?disabled=${disabled}
          helper-text=${ifDefined(helperText)}
          ?hide-label=${hideLabel}
          ?invalid=${invalid}
          invalid-text=${ifDefined(invalidText)}
          ?read-only=${readOnly}
          ?allow-custom-value=${allowCustomValue}
          title-text=${ifDefined(titleText)}
          size=${ifDefined(size)}
          type=${ifDefined(type)}
          value=${ifDefined(value)}
          label=${ifDefined(label)}
          ?warn=${warn}
          warn-text=${ifDefined(warnText)}
          ?typeahead=${typeahead}>
          ${items.map(
            (elem) => html`
              <cds-combo-box-item
                ?disabled=${elem.disabled}
                value="${elem.value}"
                >${elem.text}</cds-combo-box-item
              >
            `
          )}
        </cds-combo-box>
        <div style="height: 800px"></div>
      </div>
    `;
  },
};

export const AutocompleteWithTypeahead = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
    typeahead: true,
  },
  render: (args) => {
    const {
      allowCustomValue,
      autoalign,
      disabled,
      helperText,
      invalid,
      titleText,
      hideLabel,
      direction,
      readOnly,
      warn,
      warnText,
      size,
      label,
      type,
      invalidText,
      value,
      typeahead,
    } = args ?? {};
    return html`
      <cds-combo-box
        direction=${ifDefined(direction)}
        ?disabled=${disabled}
        ?autoalign=${autoalign}
        helper-text=${ifDefined(helperText)}
        ?hide-label=${hideLabel}
        ?invalid=${invalid}
        invalid-text=${ifDefined(invalidText)}
        ?read-only=${readOnly}
        ?allow-custom-value=${allowCustomValue}
        title-text=${ifDefined(titleText)}
        size=${ifDefined(size)}
        type=${ifDefined(type)}
        value=${ifDefined(value)}
        label=${ifDefined(label)}
        ?warn=${warn}
        warn-text=${ifDefined(warnText)}
        ?typeahead=${typeahead}>
        <cds-combo-box-item value="apple">Apple</cds-combo-box-item>
        <cds-combo-box-item value="apricot">Apricot</cds-combo-box-item>
        <cds-combo-box-item value="avocado">Avocado</cds-combo-box-item>
        <cds-combo-box-item value="banana">Banana</cds-combo-box-item>
        <cds-combo-box-item value="blackberry">Blackberry</cds-combo-box-item>
        <cds-combo-box-item value="blueberry">Blueberry</cds-combo-box-item>
        <cds-combo-box-item value="cantaloupe">Cantaloupe</cds-combo-box-item>
      </cds-combo-box>
    `;
  },
};

export const WithAILabel = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
  },
  render: (args) => {
    const {
      allowCustomValue,
      autoalign,
      disabled,
      helperText,
      invalid,
      titleText,
      hideLabel,
      direction,
      readOnly,
      warn,
      warnText,
      size,
      label,
      type,
      invalidText,
      value,
      typeahead,
    } = args ?? {};
    return html`
      <cds-combo-box
        ?disabled=${disabled}
        ?autoalign=${autoalign}
        ?hide-label=${hideLabel}
        helper-text=${ifDefined(helperText)}
        ?invalid=${invalid}
        invalid-text=${ifDefined(invalidText)}
        direction=${ifDefined(direction)}
        ?read-only=${readOnly}
        ?allow-custom-value=${allowCustomValue}
        title-text=${ifDefined(titleText)}
        size=${ifDefined(size)}
        type=${ifDefined(type)}
        value=${ifDefined(value)}
        label=${ifDefined(label)}
        ?warn=${warn}
        warn-text=${ifDefined(warnText)}
        ?typeahead=${typeahead}>
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >

        ${items.map(
          (elem) => html`
            <cds-combo-box-item ?disabled=${elem.disabled} value="${elem.value}"
              >${elem.text}</cds-combo-box-item
            >
          `
        )}
      </cds-combo-box>
    `;
  },
};

export const WithLayer = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Helper text',
    titleText: 'Label',
  },
  render: (args) => {
    const {
      allowCustomValue,
      autoalign,
      disabled,
      helperText,
      invalid,
      titleText,
      hideLabel,
      direction,
      readOnly,
      warn,
      warnText,
      size,
      label,
      type,
      invalidText,
      value,
      typeahead,
    } = args ?? {};
    return html`
      <sb-template-layers>
        <div style="width:300px">
          <cds-combo-box
            direction=${ifDefined(direction)}
            ?autoalign=${autoalign}
            ?disabled=${disabled}
            helper-text=${ifDefined(helperText)}
            ?hide-label=${hideLabel}
            ?invalid=${invalid}
            invalid-text=${ifDefined(invalidText)}
            ?read-only=${readOnly}
            ?allow-custom-value=${allowCustomValue}
            title-text=${ifDefined(titleText)}
            size=${ifDefined(size)}
            type=${ifDefined(type)}
            value=${ifDefined(value)}
            label=${ifDefined(label)}
            ?warn=${warn}
            warn-text=${ifDefined(warnText)}
            ?typeahead=${typeahead}>
            ${items.map(
              (elem) => html`
                <cds-combo-box-item
                  ?disabled=${elem.disabled}
                  value="${elem.value}"
                  >${elem.text}</cds-combo-box-item
                >
              `
            )}
          </cds-combo-box>
        </div>
      </sb-template-layers>
    `;
  },
};

const meta = {
  title: 'Components/Combo box',
  decorators: [
    (story, { name }) => {
      const width = !name.toLowerCase().includes('layer') ? `width:300px` : ``;
      return html` <div style="${width}">${story()}</div> `;
    },
  ],
};

export const AllowCustomValueTest = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    helperText: 'Combobox helper text',
    titleText: 'ComboBox title',
    allowCustomValue: true,
  },
  render: (args) => {
    const {
      allowCustomValue,
      disabled,
      helperText,
      invalid,
      titleText,
      hideLabel,
      direction,
      readOnly,
      warn,
      warnText,
      size,
      label,
      type,
      invalidText,
      value,
    } = args ?? {};

    const debugId = `debug-console-${Math.random().toString(36).substr(2, 9)}`;

    const handleSelected = (event) => {
      const outputDiv = document.getElementById(debugId);
      if (!outputDiv) return;

      let selectedValue = event.detail.value;
      let selectionType = 'Custom Value (String)';

      if (selectedValue === undefined || selectedValue === null) {
        if (event.detail.item) {
          selectedValue =
            event.detail.item.getAttribute('value') ||
            event.detail.item.textContent;
          selectionType = 'Standard Item (DOM Element)';
        } else {
          selectedValue = 'Cleared (null)';
          selectionType = 'Clear Event';
        }
      }

      outputDiv.innerHTML = `
        <div style="padding: 1rem; background-color: #f4f4f4; border: 1px solid #e0e0e0; border-radius: 4px;">
          <div style="margin-bottom: 0.5rem;"><strong>Event:</strong> <code>cds-combo-box-selected</code></div>
          <div style="margin-bottom: 0.5rem;"><strong>Type:</strong> ${selectionType}</div>
          <div><strong>Value:</strong> <span style="color: #0f62fe; font-weight: bold;">"${selectedValue}"</span></div>
        </div>
      `;
    };

    return html`
      <div
        style="display: flex; flex-direction: column; gap: 2rem; max-width: 400px;">
        <cds-combo-box
          ?allow-custom-value=${allowCustomValue}
          @cds-combo-box-selected=${handleSelected}
          direction=${ifDefined(direction)}
          ?disabled=${disabled}
          helper-text=${ifDefined(helperText)}
          ?hide-label=${hideLabel}
          ?invalid=${invalid}
          invalid-text=${ifDefined(invalidText)}
          ?read-only=${readOnly}
          title-text=${ifDefined(titleText)}
          size=${ifDefined(size)}
          type=${ifDefined(type)}
          value=${ifDefined(value)}
          label=${ifDefined(label)}
          ?warn=${warn}
          warn-text=${ifDefined(warnText)}
          should-filter-item>
          <cds-combo-box-item value="Apple">Apple</cds-combo-box-item>
          <cds-combo-box-item value="Orange">Orange</cds-combo-box-item>
          <cds-combo-box-item value="Banana">Banana</cds-combo-box-item>
          <cds-combo-box-item value="Pineapple">Pineapple</cds-combo-box-item>
          <cds-combo-box-item value="Raspberry">Raspberry</cds-combo-box-item>
          <cds-combo-box-item value="Lime">Lime</cds-combo-box-item>
        </cds-combo-box>

        <div id="${debugId}">
          <div
            style="padding: 1rem; border: 1px dashed #c6c6c6; color: #6f6f6f; font-size: 0.875rem;">
            Interact with the combobox to see selection data here.
          </div>
        </div>
      </div>
    `;
  },
};

export default meta;
