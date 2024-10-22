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
import View16 from '@carbon/icons/lib/view/16.js';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16.js';
import Folders16 from '@carbon/icons/lib/folders/16.js';
import {
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
  DROPDOWN_DIRECTION,
  SELECTION_FEEDBACK_OPTION,
} from './multi-select';
import './multi-select-item';
import '../layer/index';
import '../ai-label';
import '../icon-button';
import '../../../.storybook/templates/with-layer';

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h1>84%</h1>
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
    ${View16({ slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${FolderOpen16({ slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${Folders16({ slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Medium size (${DROPDOWN_SIZE.MEDIUM})`]: DROPDOWN_SIZE.MEDIUM,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const types = {
  Default: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const selectionFeedbackOptions = {
  [`Top (${SELECTION_FEEDBACK_OPTION.TOP})`]: SELECTION_FEEDBACK_OPTION.TOP,
  [`Fixed (${SELECTION_FEEDBACK_OPTION.FIXED})`]:
    SELECTION_FEEDBACK_OPTION.FIXED,
  [`Top-after-reopen (${SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN})`]:
    SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN,
};

const args = {
  clearSelectionDescription: 'Total items selected: ',
  clearSelectionText: 'To clear selection, press Delete or Backspace.',
  disabled: false,
  direction: DROPDOWN_DIRECTION.BOTTOM,
  helperText: 'Optional helper text',
  hideLabel: false,
  locale: 'en',
  invalid: false,
  invalidText: 'whoopsie!',
  titleText: 'This is a MultiSelect Title',
  label: 'This is a label',
  size: DROPDOWN_SIZE.MEDIUM,
  selectionFeedback: SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN,
  readOnly: false,
  type: null,
  warn: false,
  warnText: 'whoopsie!',
};

const argTypes = {
  clearSelectionDescription: {
    control: 'text',
    description:
      'Specify the text that should be read for screen readers that describes total items selected.',
  },
  clearSelectionText: {
    control: 'text',
    description:
      'Specify the text that should be read for screen readers to clear selection.',
  },
  disabled: {
    control: 'boolean',
    description: 'Disable the control.',
  },
  direction: {
    control: 'select',
    description:
      'Specify the direction of the multiselect dropdown. Can be either top or bottom.',
    options: directionOptions,
  },
  helperText: {
    control: 'text',
    description:
      'Provide helper text that is used alongside the control label for additional help.',
  },
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the title text should be hidden or not.',
  },
  locale: {
    control: 'text',
    description:
      'Specify the locale of the control. Used for the default <code>compareItems</code> used for sorting the list of items in the control.',
  },
  invalid: {
    control: 'boolean',
    description: 'Is the current selection invalid?',
  },
  invalidText: {
    control: 'text',
    description: 'If invalid, what is the error?',
  },
  titleText: {
    control: 'text',
    description:
      'Provide text to be used in a <code>&lt;label&gt;</code> element that is tied to the multiselect via ARIA attributes.',
  },
  label: {
    control: 'text',
    description:
      'Generic <code>label</code> that will be used as the textual representation of what this field is for.',
  },
  size: {
    control: 'select',
    description:
      'Specify the size of the ListBox. Currently supports either <code>sm</code>, <code>md</code> or <code>lg</code> as an option.',
    options: sizes,
  },
  selectionFeedback: {
    control: 'select',
    description:
      "Specify feedback (mode) of the selection. <code>top</code>: selected item jumps to top <code>fixed</code>: selected item stays at it's position <code>top-after-reopen</code>: selected item jump to top after reopen dropdown.",
    options: selectionFeedbackOptions,
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether or not the Dropdown is readonly.',
  },
  type: {
    control: 'select',
    description: "Specify 'inline' to create an inline multi-select.",
    options: types,
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
};

export const Default = {
  decorators: [(story) => html` <div style="width:300px">${story()}</div> `],
  render: () => {
    return html`
      <cds-multi-select
        title-text="Multiselect title"
        label="Multiselect label"
        helper-text="This is helper text">
        <cds-multi-select-item value="example"
          >An example option that is really long to show what should be done to
          handle long text</cds-multi-select-item
        >
        <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
        <cds-multi-select-item value="cloudFoundry"
          >Option 2</cds-multi-select-item
        >
        <cds-multi-select-item disabled value="staging"
          >Option 3 - a disabled item</cds-multi-select-item
        >
        <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
        <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
      </cds-multi-select>
    `;
  },
};

export const Filterable = {
  decorators: [(story) => html` <div style="width:300px">${story()}</div> `],
  render: () => {
    return html`
      <cds-multi-select
        filterable="true"
        title-text="Multiselect title"
        helper-text="This is helper text">
        <cds-multi-select-item value="example"
          >An example option that is really long to show what should be done to
          handle long text</cds-multi-select-item
        >
        <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
        <cds-multi-select-item value="cloudFoundry"
          >Option 2</cds-multi-select-item
        >
        <cds-multi-select-item disabled value="staging"
          >Option 3 - a disabled item</cds-multi-select-item
        >
        <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
        <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
      </cds-multi-select>
    `;
  },
};

export const FilterableWithAILabel = {
  render: () => {
    return html`
      <div style="width: 400px">
        <cds-multi-select
          filterable="true"
          title-text="FilterableMultiselect title"
          helper-text="This is helper text">
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
          <cds-multi-select-item value="example"
            >An example option that is really long to show what should be done
            to handle long text</cds-multi-select-item
          >
          <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="cloudFoundry"
            >Option 2</cds-multi-select-item
          >
          <cds-multi-select-item disabled value="staging"
            >Option 3 - a disabled item</cds-multi-select-item
          >
          <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
          <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
        </cds-multi-select>
      </div>
    `;
  },
};

export const FilterableWithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <div style="width:300px">
          <cds-multi-select
            filterable="true"
            title-text="Multiselect title"
            helper-text="This is helper text">
            <cds-multi-select-item value="example"
              >An example option that is really long to show what should be done
              to handle long text</cds-multi-select-item
            >
            <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
            <cds-multi-select-item value="cloudFoundry"
              >Option 2</cds-multi-select-item
            >
            <cds-multi-select-item disabled value="staging"
              >Option 3 - a disabled item</cds-multi-select-item
            >
            <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
            <cds-multi-select-item value="router"
              >Option 5</cds-multi-select-item
            >
          </cds-multi-select>
        </div>
      </sb-template-layers>
    `;
  },
};

export const WithInitialSelectedItems = {
  decorators: [(story) => html` <div style="width:300px">${story()}</div> `],
  render: () => {
    return html`
      <cds-multi-select
        title-text="Multiselect title"
        label="Multiselect label"
        helper-text="This is helper text">
        <cds-multi-select-item value="example"
          >An example option that is really long to show what should be done to
          handle long text</cds-multi-select-item
        >
        <cds-multi-select-item selected value="all"
          >Option 1</cds-multi-select-item
        >
        <cds-multi-select-item selected value="cloudFoundry"
          >Option 2</cds-multi-select-item
        >
        <cds-multi-select-item disabled value="staging"
          >Option 3 - a disabled item</cds-multi-select-item
        >
        <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
        <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
      </cds-multi-select>
    `;
  },
};

export const WithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <div style="width:300px">
          <cds-multi-select
            title-text="Multiselect title"
            label="Multiselect label"
            helper-text="This is helper text">
            <cds-multi-select-item value="example"
              >An example option that is really long to show what should be done
              to handle long text</cds-multi-select-item
            >
            <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
            <cds-multi-select-item value="cloudFoundry"
              >Option 2</cds-multi-select-item
            >
            <cds-multi-select-item disabled value="staging"
              >Option 3 - a disabled item</cds-multi-select-item
            >
            <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
            <cds-multi-select-item value="router"
              >Option 5</cds-multi-select-item
            >
          </cds-multi-select>
        </div>
      </sb-template-layers>
    `;
  },
};

export const WithAILabel = {
  render: () => {
    return html`
      <div style="width: 400px">
        <cds-multi-select
          title-text="Multiselect title"
          label="Multiselect label"
          helper-text="This is helper text">
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
          <cds-multi-select-item value="example">
            An example option that is really long to show what should be done to
            handle long text</cds-multi-select-item
          >
          <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="cloudFoundry"
            >Option 2</cds-multi-select-item
          >
          <cds-multi-select-item disabled value="staging"
            >Option 3 - a disabled item</cds-multi-select-item
          >
          <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
          <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
        </cds-multi-select>
      </div>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  decorators: [(story) => html` <div style="width:300px">${story()}</div> `],
  render: (args) => {
    const {
      clearSelectionLabel,
      direction,
      disabled,
      helperText,
      hideLabel,
      locale,
      invalid,
      invalidText,
      readOnly,
      titleText,
      selectionFeedback,
      size,
      label,
      type,
      value,
      warn,
      warnText,
    } = args ?? {};
    return html`
      <cds-multi-select
        direction=${ifDefined(direction)}
        ?disabled=${disabled}
        ?invalid=${invalid}
        invalid-text=${ifDefined(invalidText)}
        clear-selection-label=${ifDefined(clearSelectionLabel)}
        helper-text=${ifDefined(helperText)}
        ?hide-label=${hideLabel}
        locale=${ifDefined(locale)}
        ?read-only=${readOnly}
        title-text=${ifDefined(titleText)}
        selection-feedback=${ifDefined(selectionFeedback)}
        size=${ifDefined(size)}
        ?warn=${warn}
        warn-text=${ifDefined(warnText)}
        label=${ifDefined(label)}
        type=${ifDefined(type)}
        value="${ifDefined(value)}">
        <cds-multi-select-item value="example"
          >An example option that is really long to show what should be done to
          handle long text</cds-multi-select-item
        >
        <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
        <cds-multi-select-item value="cloudFoundry"
          >Option 2</cds-multi-select-item
        >
        <cds-multi-select-item disabled value="staging"
          >Option 3 - a disabled item</cds-multi-select-item
        >
        <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
        <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
      </cds-multi-select>
    `;
  },
};

const meta = {
  title: 'Components/Multi Select',
};

export default meta;
