/**
 * Copyright IBM Corp. 2019, 2026
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
import '../button/index';
import { iconLoader } from '../../globals/internal/icon-loader';
import { withLayers } from '../../../.storybook/decorators/with-layers';

const items = [
  {
    value: 'option-0',
    text: 'North America (United States, Canada, and Mexico)',
  },
  {
    value: 'option-1',
    text: 'Europe',
  },
  {
    value: 'option-2',
    text: 'Asia Pacific',
  },
  {
    value: 'option-3',
    text: 'South America',
    disabled: true,
  },
  {
    value: 'option-4',
    text: 'Middle East',
  },
  {
    value: 'option-5',
    text: 'Africa',
  },
];

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const sizes = {
  [`Extra small size (${DROPDOWN_SIZE.EXTRA_SMALL})`]:
    DROPDOWN_SIZE.EXTRA_SMALL,
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  'Regular size': null,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const defaultArgs = {
  direction: DROPDOWN_DIRECTION.BOTTOM,
  autoalign: false,
  allowCustomValue: false,
  disabled: false,
  helperText: 'Choose the region where your resources will be hosted.',
  invalid: false,
  invalidText: 'Select a deployment region.',
  label: 'Select a region',
  readOnly: false,
  size: null,
  titleText: 'Deployment region',
  typeahead: false,
  value: '',
  warn: false,
  warnText: 'Confirm that this region meets your data residency requirements.',
  inputProps: undefined,
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
  inputProps: {
    control: 'object',
    description: `Specify native input attributes to place on the internal input, for example \`{ maxlength: 5, autocomplete: 'off'}\`.`,
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
    inputProps: {},
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
      inputProps,
    } = args ?? {};
    return html`
      <cds-combo-box
        .inputProps=${inputProps}
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
      This recommendation is based on service availability, latency, and your
      organization&apos;s data residency requirements.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Regional placement model</p>
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
  argTypes: {
    ...controls,
    allowCustomValue: {
      ...controls.allowCustomValue,
      table: {
        readonly: true,
      },
    },
  },
  args: {
    ...defaultArgs,
    allowCustomValue: true,
    helperText: 'Enter a fruit or choose one from the list.',
    label: 'Select or enter a fruit',
    titleText: 'Favorite fruit',
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
      inputProps,
    } = args ?? {};
    return html`
      <cds-combo-box
        .inputProps=${inputProps}
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

export const AutocompleteWithTypeahead = {
  argTypes: {
    ...controls,
    typeahead: {
      ...controls.typeahead,
      table: {
        readonly: true,
      },
    },
  },
  args: {
    ...defaultArgs,
    helperText: 'Start typing to narrow the available fruits.',
    label: 'Search fruits',
    titleText: 'Fruit',
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
      inputProps,
    } = args ?? {};
    return html`
      <cds-combo-box
        .inputProps=${inputProps}
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

export const ExperimentalAutoAlign = {
  argTypes: {
    ...controls,
    autoalign: {
      ...controls.autoalign,
      table: {
        readonly: true,
      },
    },
  },
  args: {
    ...defaultArgs,
    autoalign: true,
    direction: DROPDOWN_DIRECTION.BOTTOM,
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
      inputProps,
    } = args ?? {};
    return html`
      <div style="width:400px">
        <div style="height: 300px"></div>
        <cds-combo-box
          .inputProps=${inputProps}
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

export const Controlled = {
  argTypes: controls,
  args: {
    ...defaultArgs,
    value: 'option-1',
  },
  render: (args) => {
    const {
      autoalign,
      allowCustomValue,
      disabled,
      direction,
      helperText,
      invalid,
      invalidText,
      label,
      readOnly,
      size,
      titleText,
      type,
      typeahead,
      inputProps,
      value,
      warn,
      warnText,
    } = args ?? {};

    const setValue = (nextValue: string) => {
      const comboBox = document.querySelector('cds-combo-box[controlled]') as
        | (HTMLElement & { value: string })
        | null;
      if (comboBox) {
        comboBox.value = nextValue;
      }
    };

    const handleBeforeSelected = (event: CustomEvent) => {
      event.preventDefault();

      const { item } = event?.detail ?? {};
      const nextValue = item?.getAttribute?.('value') ?? item?.value ?? '';

      const comboBox = event.currentTarget as
        | (HTMLElement & { value: string; open: boolean })
        | null;
      if (comboBox) {
        comboBox.value = nextValue;
        comboBox.open = false;
      }
    };

    const handleSelected = (event: CustomEvent) => {
      const { item, value: detailValue } = event?.detail ?? {};
      if (item) return;
      const comboBox = event.currentTarget as
        | (HTMLElement & { value: string })
        | null;
      if (comboBox) {
        comboBox.value = typeof detailValue === 'string' ? detailValue : '';
      }
    };

    return html`
      <cds-combo-box
        .inputProps=${inputProps}
        controlled
        direction=${ifDefined(direction)}
        ?autoalign=${autoalign}
        ?disabled=${disabled}
        helper-text=${ifDefined(helperText)}
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
        @cds-combo-box-beingselected=${handleBeforeSelected}
        @cds-combo-box-selected=${handleSelected}>
        <cds-combo-box-item value="option-1">Europe</cds-combo-box-item>
        <cds-combo-box-item value="option-2">Asia Pacific</cds-combo-box-item>
        <cds-combo-box-item value="option-3">Middle East</cds-combo-box-item>
      </cds-combo-box>

      <div
        style="display: flex; align-items: center; justify-content: space-between;">
        <cds-button @click=${() => setValue('')}> Clear </cds-button>
        <cds-button @click=${() => setValue('option-1')}> Europe </cds-button>
        <cds-button @click=${() => setValue('option-2')}>
          Asia Pacific
        </cds-button>
        <cds-button @click=${() => setValue('option-3')}>
          Middle East
        </cds-button>
      </div>
    `;
  },
};

export const WithAILabel = {
  argTypes: controls,
  args: {
    ...defaultArgs,
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
      inputProps,
    } = args ?? {};
    return html`
      <cds-combo-box
        .inputProps=${inputProps}
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
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: controls,
  args: {
    ...defaultArgs,
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
      inputProps,
    } = args ?? {};
    return html`
      <div style="width:300px">
        <cds-combo-box
          .inputProps=${inputProps}
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
    `;
  },
};

const meta = {
  title: 'Components/Combo box',
  decorators: [
    (story, { name }) => {
      const storyName = name.toLowerCase();
      const width =
        !storyName.includes('layer') && !storyName.includes('controlled')
          ? `width:300px`
          : ``;
      return html` <div style="${width}">${story()}</div> `;
    },
  ],
};

export default meta;
