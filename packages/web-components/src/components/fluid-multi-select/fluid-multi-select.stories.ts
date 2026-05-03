/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import '../form/form-item';
import '../ai-label';
import '../icon-button';
import { iconLoader } from '../../globals/internal/icon-loader';
import '../select/select-item';
import '../toggle-tip/toggletip';
import {
  DROPDOWN_DIRECTION,
  SELECTION_FEEDBACK_OPTION,
} from '../multi-select/multi-select';
import '../multi-select/index';
import { withLayers } from '../../../.storybook/decorators/with-layers';

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

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const selectionFeedbackOptions = {
  [`Top (${SELECTION_FEEDBACK_OPTION.TOP})`]: SELECTION_FEEDBACK_OPTION.TOP,
  [`Fixed (${SELECTION_FEEDBACK_OPTION.FIXED})`]:
    SELECTION_FEEDBACK_OPTION.FIXED,
  [`Top-after-reopen (${SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN})`]:
    SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN,
};

const args = {
  defaultWidth: 400,
  clearSelectionDescription: 'Total items selected: ',
  clearSelectionText: 'To clear selection, press Delete or Backspace.',
  disabled: false,
  direction: DROPDOWN_DIRECTION.BOTTOM,
  locale: 'en',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  titleText: 'Label',
  label: 'Choose an option',
  selectionFeedback: SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN,
  readOnly: false,
  isCondensed: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
};

const filterableArgs = {
  defaultWidth: 400,
  clearSelectionDescription: 'Total items selected: ',
  clearSelectionText: 'To clear selection, press Delete or Backspace.',
  disabled: false,
  direction: DROPDOWN_DIRECTION.BOTTOM,
  locale: 'en',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  titleText: 'Label',
  label: '',
  selectionFeedback: SELECTION_FEEDBACK_OPTION.TOP_AFTER_REOPEN,
  readOnly: false,
  isCondensed: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
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
    control: 'radio',
    description:
      'Specify the direction of the multiselect dropdown. Can be either top or bottom.',
    options: directionOptions,
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
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
  defaultWidth: {
    control: { type: 'range', min: 300, max: 800, step: 50 },
  },
  isCondensed: {
    control: 'boolean',
    description:
      'Specify if the multiselect should render its menu items in condensed mode.',
  },
};

export const Default = {
  args,
  argTypes,
  render: (args) => {
    const {
      clearSelectionLabel,
      defaultWidth,
      direction,
      disabled,
      locale,
      invalid,
      invalidText,
      isCondensed,
      readOnly,
      titleText,
      selectionFeedback,
      size,
      label,
      value,
      warn,
      warnText,
    } = args ?? {};
    return html`
      <div style="width:${defaultWidth}px">
        <cds-fluid-multi-select
          direction=${ifDefined(direction)}
          ?disabled=${disabled}
          ?invalid=${invalid}
          ?is-condensed=${isCondensed}
          invalid-text=${ifDefined(invalidText)}
          clear-selection-label=${ifDefined(clearSelectionLabel)}
          locale=${ifDefined(locale)}
          ?read-only=${readOnly}
          title-text=${ifDefined(titleText)}
          selection-feedback=${ifDefined(selectionFeedback)}
          size=${ifDefined(size)}
          ?warn=${warn}
          warn-text=${ifDefined(warnText)}
          label=${ifDefined(label)}
          value="${ifDefined(value)}">
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
        </cds-fluid-multi-select>
      </div>
    `;
  },
};

export const Condensed = {
  args: {
    ...args,
    isCondensed: true,
  },
  argTypes,
  render: (args) => {
    const {
      clearSelectionLabel,
      direction,
      defaultWidth,
      disabled,
      locale,
      invalid,
      invalidText,

      readOnly,
      titleText,
      selectionFeedback,
      isCondensed,
      size,
      label,
      value,
      warn,
      warnText,
    } = args ?? {};
    return html`
      <div style="width:${defaultWidth}px">
        <cds-fluid-multi-select
          direction=${ifDefined(direction)}
          ?is-condensed="${isCondensed}"
          ?disabled=${disabled}
          ?invalid=${invalid}
          invalid-text=${ifDefined(invalidText)}
          clear-selection-label=${ifDefined(clearSelectionLabel)}
          locale=${ifDefined(locale)}
          ?read-only=${readOnly}
          title-text=${ifDefined(titleText)}
          selection-feedback=${ifDefined(selectionFeedback)}
          size=${ifDefined(size)}
          ?warn=${warn}
          warn-text=${ifDefined(warnText)}
          label=${ifDefined(label)}
          value="${ifDefined(value)}">
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
        </cds-fluid-multi-select>
      </div>
    `;
  },
};

export const Filterable = {
  args: filterableArgs,
  argTypes,
  render: (args) => {
    const {
      clearSelectionLabel,
      direction,
      disabled,
      locale,
      invalid,
      invalidText,
      readOnly,
      defaultWidth,
      isCondensed,
      titleText,
      selectionFeedback,
      size,
      label,
      value,
      warn,
      warnText,
    } = args ?? {};
    return html`
      <div style="width:${defaultWidth}px">
        <cds-fluid-multi-select
          direction=${ifDefined(direction)}
          filterable="true"
          ?is-condensed="${isCondensed}"
          ?disabled=${disabled}
          ?invalid=${invalid}
          invalid-text=${ifDefined(invalidText)}
          clear-selection-label=${ifDefined(clearSelectionLabel)}
          locale=${ifDefined(locale)}
          ?read-only=${readOnly}
          title-text=${ifDefined(titleText)}
          selection-feedback=${ifDefined(selectionFeedback)}
          size=${ifDefined(size)}
          ?warn=${warn}
          warn-text=${ifDefined(warnText)}
          label=${ifDefined(label)}
          value="${ifDefined(value)}">
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
        </cds-fluid-multi-select>
      </div>
    `;
  },
};

export const FilterableWithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  args: filterableArgs,
  argTypes,
  render: (args) => {
    const {
      clearSelectionLabel,
      direction,
      defaultWidth,
      disabled,
      helperText,
      locale,
      isCondensed,
      invalid,
      invalidText,
      readOnly,
      titleText,
      selectionFeedback,
      size,
      label,
      value,
      warn,
      warnText,
    } = args ?? {};
    return html`
      <div style="width:${defaultWidth}px">
        <cds-fluid-multi-select
          direction=${ifDefined(direction)}
          ?disabled=${disabled}
          ?is-condensed=${isCondensed}
          ?invalid=${invalid}
          invalid-text=${ifDefined(invalidText)}
          clear-selection-label=${ifDefined(clearSelectionLabel)}
          helper-text=${ifDefined(helperText)}
          locale=${ifDefined(locale)}
          ?read-only=${readOnly}
          title-text=${ifDefined(titleText)}
          selection-feedback=${ifDefined(selectionFeedback)}
          size=${ifDefined(size)}
          ?warn=${warn}
          warn-text=${ifDefined(warnText)}
          label=${ifDefined(label)}
          value="${ifDefined(value)}"
          filterable="true">
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
        </cds-fluid-multi-select>
      </div>
    `;
  },
};

export const Skeleton = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () =>
    html` <div style="width:400px;">
      <cds-fluid-multi-select-skeleton></cds-fluid-multi-select-skeleton>
    </div>`,
};

export const WithAILabel = {
  args,
  argTypes: {
    ...argTypes,
  },
  render: (args) => {
    const {
      disabled,
      invalid,
      invalidText,
      titleText,
      isCondensed,
      label,
      name,
      readOnly,
      warn,
      warnText,
      defaultWidth,
    } = args ?? {};

    return html` <div style="width:${defaultWidth}px;">
      <cds-fluid-multi-select
        ?disabled="${disabled}"
        ?is-condensed="${isCondensed}"
        title-text=${ifDefined(titleText)}
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label=${ifDefined(label)}
        name="${ifDefined(name)}"
        ?readonly="${readOnly}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}">
        <cds-ai-label alignment="bottom-left">
          ${content}${actions}</cds-ai-label
        >
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
      </cds-fluid-multi-select>
    </div>`;
  },
};

const meta = {
  title: 'Components/Fluid Components/FluidMultiSelect',
};

export default meta;
