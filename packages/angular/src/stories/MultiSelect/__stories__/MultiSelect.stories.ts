/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgFor } from '@angular/common';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import {
  MultiSelectComponent,
  MultiSelectItemComponent,
} from '@carbon/angular/multi-select';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { ButtonComponent, ButtonSetComponent } from '@carbon/angular/button';
import { IconButtonComponent } from '@carbon/angular/icon-button';
import { withLayers } from '../../../../.storybook/decorators/with-layers';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import { LinkComponent } from '@carbon/angular/link';
import { ToggletipComponent } from '@carbon/angular/toggle-tip';

// ─── WC-parity stories (one-for-one with @carbon/web-components Multi Select) ───

const content = `
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

const actions = `
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-ng-icon-button>
  <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
    ${iconToSvg(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-ng-icon-button>
  <cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>
`;

const args = {
  clearSelectionDescription: 'Total items selected: ',
  clearSelectionText: 'To clear selection, press Delete or Backspace.',
  disabled: false,
  direction: 'bottom',
  helperText: 'This is helper text',
  hideLabel: false,
  locale: 'en',
  invalid: false,
  invalidText: 'Error message goes here',
  warnText: 'Warning message goes here',
  titleText: 'Label',
  label: 'This is a label',
  size: 'md',
  selectionFeedback: 'top-after-reopen',
  readOnly: false,
  type: null,
  warn: false,
};

const filterableArgs = {
  autocomplete: 'off',
  clearSelectionDescription: 'Total items selected: ',
  clearSelectionText: 'To clear selection, press Delete or Backspace.',
  disabled: false,
  direction: 'bottom',
  helperText: 'This is helper text',
  hideLabel: false,
  locale: 'en',
  invalid: false,
  invalidText: 'Error message goes here',
  warnText: 'Warning message goes here',
  titleText: 'FilterableMultiSelect title',
  label: '',
  size: 'md',
  selectionFeedback: 'top-after-reopen',
  readOnly: false,
  type: null,
  warn: false,
};

const argTypes: ArgTypes = {
  autocomplete: {
    control: 'text',
    description:
      'Specify the autocomplete behavior of the filterable input. Defaults to "off".',
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
    control: 'select',
    description:
      'Specify the direction of the multiselect dropdown. Can be either top or bottom.',
    options: ['top', 'bottom'],
    labels: { top: 'Top', bottom: 'Bottom' },
  },
  helperText: {
    control: 'text',
    description:
      'Provide helper text that is used alongside the control label for additional help.',
  },
  autoalign: {
    control: 'boolean',
    description:
      'Specify whether the dropdown should be auto-aligned relative to its trigger.',
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
    options: ['xs', 'sm', 'md', 'lg'],
    labels: {
      xs: 'Extra small size (xs)',
      sm: 'Small size (sm)',
      md: 'Medium size (md)',
      lg: 'Large size (lg)',
    },
  },
  selectionFeedback: {
    control: 'select',
    description:
      "Specify feedback (mode) of the selection. <code>top</code>: selected item jumps to top <code>fixed</code>: selected item stays at it's position <code>top-after-reopen</code>: selected item jump to top after reopen dropdown.",
    options: ['top', 'fixed', 'top-after-reopen'],
    labels: {
      top: 'Top (top)',
      fixed: 'Fixed (fixed)',
      'top-after-reopen': 'Top-after-reopen (top-after-reopen)',
    },
  },
  readOnly: {
    control: 'boolean',
    description: 'Whether or not the Dropdown is readonly.',
  },
  type: {
    control: 'select',
    description: "Specify 'inline' to create an inline multi-select.",
    options: ['', 'inline'],
    labels: { '': 'Default', inline: 'Inline (inline)' },
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

/** Stories without `filterable`: omit `autocomplete` from the Controls panel. */
const nonFilterableParameters = {
  controls: {
    exclude: ['autocomplete'],
  },
};

// Bindings shared by every `cds-ng-multi-select` in this file. `value` is
// deliberately not bound: the story args do not define it, and binding
// `undefined` would overwrite selections made through `selected` items.
const bindings = `
  [direction]="direction"
  [disabled]="disabled"
  [autoalign]="autoalign"
  [invalid]="invalid"
  [invalidText]="invalidText"
  [helperText]="helperText"
  [hideLabel]="hideLabel"
  [locale]="locale"
  [readOnly]="readOnly"
  [titleText]="titleText"
  [selectionFeedback]="selectionFeedback"
  [size]="size"
  [warn]="warn"
  [warnText]="warnText"
  [type]="type || null"
`;

const labelBinding = `[label]="label"`;
const autocompleteBinding = `[autocomplete]="autocomplete"`;

const items = `
  <cds-ng-multi-select-item value="example"
    >An example option that is really long to show what should be done to
    handle long text</cds-ng-multi-select-item
  >
  <cds-ng-multi-select-item value="all">Option 1</cds-ng-multi-select-item>
  <cds-ng-multi-select-item value="cloudFoundry"
    >Option 2</cds-ng-multi-select-item
  >
  <cds-ng-multi-select-item [disabled]="true" value="staging"
    >Option 3 - a disabled item</cds-ng-multi-select-item
  >
  <cds-ng-multi-select-item value="dea">Option 4</cds-ng-multi-select-item>
  <cds-ng-multi-select-item value="router">Option 5</cds-ng-multi-select-item>
`;

const selectAllItems = (disabledValue: string) => `
  <cds-ng-multi-select-item [isSelectAll]="true">All roles</cds-ng-multi-select-item>
  <cds-ng-multi-select-item value="editor">Editor</cds-ng-multi-select-item>
  <cds-ng-multi-select-item value="owner">Owner</cds-ng-multi-select-item>
  <cds-ng-multi-select-item [disabled]="true" value="${disabledValue}"
    >Reader - a disabled item</cds-ng-multi-select-item
  >
  <cds-ng-multi-select-item value="uploader">Uploader</cds-ng-multi-select-item>
`;

type MultiSelectElement = HTMLElement & { value: string; label: string };

const toggleSelectAll = (selectAll: boolean) => {
  const multiSelect = document.getElementById(
    'controlled-multi-select'
  ) as MultiSelectElement | null;
  if (!multiSelect) {
    return;
  }
  const selectItems = Array.from(
    multiSelect.querySelectorAll('cds-ng-multi-select-item')
  );
  selectItems.forEach((item) => {
    if (item.hasAttribute('disabled')) {
      return;
    }
    if (selectAll) {
      item.setAttribute('selected', '');
    } else {
      item.removeAttribute('selected');
    }
  });
  multiSelect.value = selectItems
    .filter((item) => item.hasAttribute('selected'))
    .map((item) => item.getAttribute('value'))
    .join(',');
};

const updateLabel = (event: Event) => {
  const multiSelect = event.target as MultiSelectElement;
  multiSelect.label =
    multiSelect.value && multiSelect.value.length > 0
      ? 'Options Selected'
      : 'Choose Options';
};

const getItemValue = (item: Node) =>
  item instanceof Element ? (item.getAttribute('value') ?? '') : '';

const customSortItems = (
  menuItems: NodeList,
  {
    values,
    compareItems,
    locale,
  }: {
    values: string[];
    compareItems: (
      itemA: string,
      itemB: string,
      options: { locale: string }
    ) => number;
    locale: string;
  }
) => {
  const menuItemsArray = Array.from(menuItems);

  return menuItemsArray.sort((itemA, itemB) => {
    const hasItemA = values.includes(getItemValue(itemA));
    const hasItemB = values.includes(getItemValue(itemB));

    if (hasItemA && !hasItemB) {
      return 1;
    }
    if (hasItemB && !hasItemA) {
      return -1;
    }

    return compareItems(
      itemA.textContent?.trim() ?? '',
      itemB.textContent?.trim() ?? '',
      { locale }
    );
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Multi Select',
  decorators: [
    moduleMetadata({
      imports: [
        MultiSelectComponent,
        MultiSelectItemComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        ButtonComponent,
        ButtonSetComponent,
        IconButtonComponent,
        LinkComponent,
        ToggletipComponent,
        NgFor,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  parameters: nonFilterableParameters,
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width:300px">
        <cds-ng-multi-select ${bindings} ${labelBinding}>
          ${items}
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: Controlled
export const Controlled: Story = {
  parameters: nonFilterableParameters,
  args,
  argTypes,
  render: (args) => ({
    props: { ...args, toggleSelectAll },
    template: `
      <div style="width:300px">
        <cds-ng-multi-select id="controlled-multi-select" ${bindings} ${labelBinding}>
          <cds-ng-multi-select-item value="example"
            >An example option that is really long to show what should be done to
            handle long text</cds-ng-multi-select-item
          >
          <cds-ng-multi-select-item value="all" selected
            >Option 1</cds-ng-multi-select-item
          >
          <cds-ng-multi-select-item value="cloudFoundry"
            >Option 2</cds-ng-multi-select-item
          >
          <cds-ng-multi-select-item [disabled]="true" value="staging"
            >Option 3 - a disabled item</cds-ng-multi-select-item
          >
          <cds-ng-multi-select-item value="dea">Option 4</cds-ng-multi-select-item>
          <cds-ng-multi-select-item value="router">Option 5</cds-ng-multi-select-item>
        </cds-ng-multi-select>

        <br />
        <cds-ng-button-set>
          <cds-ng-button kind="primary" id="all" (click)="toggleSelectAll(true)">
            Select All
          </cds-ng-button>
          <cds-ng-button kind="secondary" id="clear" (click)="toggleSelectAll(false)">
            Clear
          </cds-ng-button>
        </cds-ng-button-set>
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
      <div style="width:300px">
        <cds-ng-multi-select ${bindings} ${labelBinding} ${autocompleteBinding} [filterable]="true">
          ${items}
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: FilterableWithSelectAll
export const FilterableWithSelectAll: Story = {
  args: filterableArgs,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width:300px">
        <cds-ng-multi-select ${bindings} ${labelBinding} ${autocompleteBinding} [filterable]="true" [selectAll]="true">
          ${selectAllItems('staging')}
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: FilterableWithAILabel
export const FilterableWithAILabel: Story = {
  args: filterableArgs,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-multi-select ${bindings} ${labelBinding} ${autocompleteBinding} [filterable]="true">
          <cds-ng-ai-label alignment="bottom-left">
            ${content}${actions}
          </cds-ng-ai-label>
          ${items}
        </cds-ng-multi-select>
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
      <div style="width:300px">
        <cds-ng-multi-select ${bindings} ${labelBinding} ${autocompleteBinding} [filterable]="true">
          ${items}
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: SelectAll
export const SelectAll: Story = {
  parameters: nonFilterableParameters,
  args,
  argTypes,
  render: (args) => ({
    props: { ...args, updateLabel },
    template: `
      <div style="width:400px">
        <cds-ng-multi-select
          id="multiselect-selectall"
          ${bindings}
          label="Choose Options"
          [selectAll]="true"
          (multiSelectSelected)="updateLabel($event)">
          ${selectAllItems('Reader')}
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: SelectAllWithDynamicItems
export const SelectAllWithDynamicItems: Story = {
  parameters: nonFilterableParameters,
  args,
  argTypes,
  render: (args) => {
    const dynamicItems: string[] = [];
    const addItems = () => {
      const now = Date.now();
      dynamicItems.push(
        `item-added-via-button-1-${now}`,
        `item-added-via-button-2-${now}`
      );
    };
    return {
      props: { ...args, updateLabel, dynamicItems, addItems },
      template: `
        <div style="width:400px">
          <cds-ng-multi-select
            ${bindings}
            label="Choose Options"
            [selectAll]="true"
            (multiSelectSelected)="updateLabel($event)">
            ${selectAllItems('Reader')}
            <cds-ng-multi-select-item
              *ngFor="let dynamicItem of dynamicItems"
              [value]="dynamicItem"
            >{{dynamicItem}}</cds-ng-multi-select-item>
          </cds-ng-multi-select>
          <cds-ng-button kind="primary" id="all" (click)="addItems()">
            Add 2 items to the list
          </cds-ng-button>
        </div>
      `,
    };
  },
};

// WC: WithAILabel
export const WithAILabel: Story = {
  parameters: nonFilterableParameters,
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-multi-select ${bindings} ${labelBinding}>
          <cds-ng-ai-label alignment="bottom-left">
            ${content}${actions}
          </cds-ng-ai-label>
          ${items}
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: WithInitialSelectedItems
export const WithInitialSelectedItems: Story = {
  parameters: nonFilterableParameters,
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width:300px">
        <cds-ng-multi-select ${bindings} ${labelBinding}>
          <cds-ng-multi-select-item value="example"
            >An example option that is really long to show what should be done to
            handle long text</cds-ng-multi-select-item
          >
          <cds-ng-multi-select-item selected value="all"
            >Option 1</cds-ng-multi-select-item
          >
          <cds-ng-multi-select-item selected value="cloudFoundry"
            >Option 2</cds-ng-multi-select-item
          >
          <cds-ng-multi-select-item [disabled]="true" value="staging"
            >Option 3 - a disabled item</cds-ng-multi-select-item
          >
          <cds-ng-multi-select-item value="dea">Option 4</cds-ng-multi-select-item>
          <cds-ng-multi-select-item value="router">Option 5</cds-ng-multi-select-item>
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: WithLayer
export const WithLayer: Story = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
    ...nonFilterableParameters,
  },
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width:300px">
        <cds-ng-multi-select ${bindings} ${labelBinding}>
          ${items}
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: WithToggletipLabel
export const WithToggletipLabel: Story = {
  parameters: nonFilterableParameters,
  args,
  argTypes,
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 400px">
        <cds-ng-multi-select ${bindings} ${labelBinding}>
          <span
            slot="title-text"
            style="display: inline-flex; align-items: center; gap: 0.25rem;">
            Multiselect title
            <cds-ng-toggletip [autoalign]="true" alignment="top">
              <p slot="body-text">
                Lorem ipsum dolor sit amet, di os consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut fsil labore et dolore magna
                aliqua.
              </p>
              <cds-ng-link href="#" slot="actions">Test</cds-ng-link>
              <cds-ng-button slot="actions">Button</cds-ng-button>
            </cds-ng-toggletip>
          </span>

          ${items}
        </cds-ng-multi-select>
      </div>
    `,
  }),
};

// WC: WithCustomSorting
export const WithCustomSorting: Story = {
  parameters: nonFilterableParameters,
  args: {
    ...args,
    titleText: 'With Custom Sorting',
    helperText: 'Selected items appear at the bottom',
  },
  argTypes,
  render: (args) => ({
    props: { ...args, customSortItems },
    template: `
      <div style="width:300px">
        <cds-ng-multi-select ${bindings} ${labelBinding} [sortItems]="customSortItems">
          <cds-ng-multi-select-item value="5">Option 5</cds-ng-multi-select-item>
          <cds-ng-multi-select-item value="2">Option 2</cds-ng-multi-select-item>
          <cds-ng-multi-select-item value="1">Option 1</cds-ng-multi-select-item>
          <cds-ng-multi-select-item value="4">Option 4</cds-ng-multi-select-item>
          <cds-ng-multi-select-item value="3">Option 3</cds-ng-multi-select-item>
        </cds-ng-multi-select>
      </div>
    `,
  }),
};
