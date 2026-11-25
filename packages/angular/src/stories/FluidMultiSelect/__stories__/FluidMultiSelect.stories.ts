/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  FluidMultiSelectComponent,
  FluidMultiSelectSkeletonComponent,
} from '@carbon/angular/fluid-multi-select';
import { MultiSelectItemComponent } from '@carbon/angular/multi-select';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { withLayers } from '../../../../.storybook/decorators/with-layers';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Multi Select) ───

const aiLabelContent = `
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

const aiLabelActions = `<cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>`;

const multiSelectItemsTemplate = `
  <cds-ng-multi-select-item value="example">
    An example option that is really long to show what should be done to
    handle long text
  </cds-ng-multi-select-item>
  <cds-ng-multi-select-item value="all">Option 1</cds-ng-multi-select-item>
  <cds-ng-multi-select-item value="cloudFoundry">Option 2</cds-ng-multi-select-item>
  <cds-ng-multi-select-item [disabled]="true" value="staging">
    Option 3 - a disabled item
  </cds-ng-multi-select-item>
  <cds-ng-multi-select-item value="dea">Option 4</cds-ng-multi-select-item>
  <cds-ng-multi-select-item value="router">Option 5</cds-ng-multi-select-item>
`;

const directionOptions = {
  'Top (top)': 'top',
  'Bottom (bottom)': 'bottom',
};

const selectionFeedbackOptions = {
  'Top (top)': 'top',
  'Fixed (fixed)': 'fixed',
  'Top-after-reopen (top-after-reopen)': 'top-after-reopen',
};

const args = {
  clearSelectionLabel: 'Clear all selected items',
  clearSelectionDescription: 'Total items selected: ',
  clearSelectionText: 'To clear selection, press Delete or Backspace.',
  disabled: false,
  direction: 'bottom',
  locale: 'en',
  invalid: false,
  invalidText:
    'Error message that is really long can wrap to more lines but should not be excessively long.',
  titleText: 'Label',
  label: 'Choose an option',
  selectionFeedback: 'top-after-reopen',
  readOnly: false,
  isCondensed: false,
  warn: false,
  warnText:
    'Warning message that is really long can wrap to more lines but should not be excessively long.',
  value: '',
};

const filterableArgs = {
  ...args,
  label: '',
};

const argTypes: ArgTypes = {
  autoalign: {
    control: 'boolean',
    description:
      'Will auto-align the multi-select to avoid viewport collisions.',
  },
  clearSelectionLabel: {
    control: 'text',
    description: 'Specify the label for the button that clears selection.',
  },
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
    options: Object.values(directionOptions),
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
    options: Object.values(selectionFeedbackOptions),
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
  isCondensed: {
    control: 'boolean',
    description:
      'Specify if the multiselect should render its menu items in condensed mode.',
  },
  value: {
    control: 'text',
    description: 'The value of the selected items.',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidMultiSelect',
  decorators: [
    moduleMetadata({
      imports: [
        FluidMultiSelectComponent,
        FluidMultiSelectSkeletonComponent,
        MultiSelectItemComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-multi-select
          [autoalign]="autoalign"
          [direction]="direction"
          [disabled]="disabled"
          [invalid]="invalid"
          [isCondensed]="isCondensed"
          [invalidText]="invalidText"
          [clearSelectionLabel]="clearSelectionLabel"
          [clearSelectionDescription]="clearSelectionDescription"
          [clearSelectionText]="clearSelectionText"
          [locale]="locale"
          [readOnly]="readOnly"
          [titleText]="titleText"
          [selectionFeedback]="selectionFeedback"
          [warn]="warn"
          [warnText]="warnText"
          [label]="label"
          [value]="value">
          ${multiSelectItemsTemplate}
        </cds-ng-fluid-multi-select>
      </div>
    `,
  }),
};

// WC: Condensed
export const Condensed: Story = {
  args: {
    ...args,
    isCondensed: true,
  },
  argTypes: {
    ...argTypes,
    isCondensed: {
      ...argTypes.isCondensed,
      table: { readonly: true },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-multi-select
          [autoalign]="autoalign"
          [direction]="direction"
          [isCondensed]="isCondensed"
          [disabled]="disabled"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [clearSelectionLabel]="clearSelectionLabel"
          [clearSelectionDescription]="clearSelectionDescription"
          [clearSelectionText]="clearSelectionText"
          [locale]="locale"
          [readOnly]="readOnly"
          [titleText]="titleText"
          [selectionFeedback]="selectionFeedback"
          [warn]="warn"
          [warnText]="warnText"
          [label]="label"
          [value]="value">
          ${multiSelectItemsTemplate}
        </cds-ng-fluid-multi-select>
      </div>
    `,
  }),
};

// WC: Filterable
export const Filterable: Story = {
  args: filterableArgs,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-multi-select
          [autoalign]="autoalign"
          [direction]="direction"
          [filterable]="true"
          [isCondensed]="isCondensed"
          [disabled]="disabled"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [clearSelectionLabel]="clearSelectionLabel"
          [clearSelectionDescription]="clearSelectionDescription"
          [clearSelectionText]="clearSelectionText"
          [locale]="locale"
          [readOnly]="readOnly"
          [titleText]="titleText"
          [selectionFeedback]="selectionFeedback"
          [warn]="warn"
          [warnText]="warnText"
          [label]="label"
          [value]="value">
          ${multiSelectItemsTemplate}
        </cds-ng-fluid-multi-select>
      </div>
    `,
  }),
};

// WC: FilterableWithLayer
export const FilterableWithLayer: Story = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  args: filterableArgs,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px;">
        <cds-ng-fluid-multi-select
          [autoalign]="autoalign"
          [direction]="direction"
          [disabled]="disabled"
          [isCondensed]="isCondensed"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [clearSelectionLabel]="clearSelectionLabel"
          [clearSelectionDescription]="clearSelectionDescription"
          [clearSelectionText]="clearSelectionText"
          [locale]="locale"
          [readOnly]="readOnly"
          [titleText]="titleText"
          [selectionFeedback]="selectionFeedback"
          [warn]="warn"
          [warnText]="warnText"
          [label]="label"
          [value]="value"
          [filterable]="true">
          ${multiSelectItemsTemplate}
        </cds-ng-fluid-multi-select>
      </div>
    `,
  }),
};

// WC: Skeleton
export const Skeleton: StoryObj<Record<string, unknown>> = {
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: () => ({
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-multi-select-skeleton></cds-ng-fluid-multi-select-skeleton>
      </div>
    `,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-fluid-multi-select
          [autoalign]="autoalign"
          [clearSelectionDescription]="clearSelectionDescription"
          [clearSelectionLabel]="clearSelectionLabel"
          [clearSelectionText]="clearSelectionText"
          [direction]="direction"
          [disabled]="disabled"
          [isCondensed]="isCondensed"
          [titleText]="titleText"
          [invalid]="invalid"
          [invalidText]="invalidText"
          [label]="label"
          [locale]="locale"
          [readOnly]="readOnly"
          [selectionFeedback]="selectionFeedback"
          [value]="value"
          [warn]="warn"
          [warnText]="warnText">
          <cds-ng-ai-label alignment="bottom-left">
            ${aiLabelContent}
            ${aiLabelActions}
          </cds-ng-ai-label>
          ${multiSelectItemsTemplate}
        </cds-ng-fluid-multi-select>
      </div>
    `,
  }),
};
