/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { FluidFormComponent } from '@carbon/angular/fluid-form';
import {
  FluidTextInputComponent,
  FluidTextInputSkeletonComponent,
} from '@carbon/angular/fluid-text-input';
import { FluidPasswordInputComponent } from '@carbon/angular/fluid-password-input';
import {
  FluidTextareaComponent,
  FluidTextareaSkeletonComponent,
} from '@carbon/angular/fluid-textarea';
import {
  FluidNumberInputComponent,
  FluidNumberInputSkeletonComponent,
} from '@carbon/angular/fluid-number-input';
import {
  FluidSelectComponent,
  FluidSelectSkeletonComponent,
} from '@carbon/angular/fluid-select';
import { SelectItemComponent } from '@carbon/angular/select';
import {
  FluidSearchComponent,
  FluidSearchSkeletonComponent,
} from '@carbon/angular/fluid-search';
import {
  FluidDropdownComponent,
  FluidDropdownSkeletonComponent,
} from '@carbon/angular/fluid-dropdown';
import { DropdownItemComponent } from '@carbon/angular/dropdown';
import {
  FluidComboBoxComponent,
  FluidComboBoxSkeletonComponent,
} from '@carbon/angular/fluid-combo-box';
import { ComboBoxItemComponent } from '@carbon/angular/combo-box';
import {
  FluidMultiSelectComponent,
  FluidMultiSelectSkeletonComponent,
} from '@carbon/angular/fluid-multi-select';
import { MultiSelectItemComponent } from '@carbon/angular/multi-select';
import { StackComponent } from '@carbon/angular/stack';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { IconButtonComponent } from '@carbon/angular/icon-button';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import {
  RadioButtonComponent,
  RadioButtonGroupComponent,
} from '@carbon/angular/radio-button';
import { CheckboxComponent } from '@carbon/angular/checkbox';
import { FormGroupComponent } from '@carbon/angular/form-group';
import {
  FileUploaderComponent,
  FileUploaderButtonComponent,
} from '@carbon/angular/file-uploader';
import { ButtonComponent } from '@carbon/angular/button';
import {
  ModalComponent,
  ModalBodyComponent,
  ModalCloseButtonComponent,
  ModalFooterComponent,
  ModalFooterButtonComponent,
  ModalHeaderComponent,
  ModalHeadingComponent,
} from '@carbon/angular/modal';

// ─── WC-parity stories (one-for-one with @carbon/web-components Fluid Form) ───

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
];

// Equivalent of the WC `renderAILabel(revertActive)` helper. Rendered through
// `ngTemplateOutlet` wherever the WC story calls `decorator()`.
const aiLabelTemplate = `
  <ng-template #aiLabelTpl>
    <cds-ng-ai-label
      alignment="bottom-left"
      [autoalign]="true"
      [revertActive]="revertActive">
      <div slot="body-text">
        <p class="secondary">AI Explained</p>
        <h2 class="ai-label-heading">84%</h2>
        <p class="secondary bold">Confidence score</p>
        <p class="secondary">
          Lorem ipsum dolor sit amet, di os consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
        </p>
        <hr />
        <p class="secondary">Model type</p>
        <p class="bold">Foundation model</p>
      </div>
      <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
        ${iconToSvg(View16, { slot: 'icon' })}
        <span slot="tooltip-content"> View </span>
      </cds-ng-icon-button>
      <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
        ${iconToSvg(FolderOpen16, { slot: 'icon' })}
        <span slot="tooltip-content"> Open Folder </span>
      </cds-ng-icon-button>
      <cds-ng-icon-button kind="ghost" slot="actions" size="lg">
        ${iconToSvg(Folders16, { slot: 'icon' })}
        <span slot="tooltip-content"> Folders </span>
      </cds-ng-icon-button>
      <cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>
    </cds-ng-ai-label>
  </ng-template>
`;

const decorator = `<ng-container *ngTemplateOutlet="aiLabel ? aiLabelTpl : null"></ng-container>`;

const row = (children: string) => `
  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">${children}</div>
`;

const col = (children: string) => `
  <div style="flex: 1 1 12rem; min-width: 0;">${children}</div>
`;

// TODO(parity): Default - the WC story also renders `cds-fluid-date-picker` /
// `cds-fluid-date-picker-input` (range and simple "Start date", "End date",
// "Deadline" fields) and `cds-fluid-date-picker-skeleton`, but @carbon/angular
// does not wrap the fluid date picker (ADR 0021 lists `cds-fluid-date-picker*`
// in SKIPPED_TAGS because it brings in flatpickr), so those rows are omitted.
const skeletonForm = `
  <cds-ng-fluid-form aria-label="new project setup">
    <cds-ng-stack gap="5">
      <cds-ng-fluid-search-skeleton></cds-ng-fluid-search-skeleton>
      ${row(`
        ${col(`<cds-ng-fluid-text-input-skeleton></cds-ng-fluid-text-input-skeleton>`)}
        ${col(`<cds-ng-fluid-text-input-skeleton></cds-ng-fluid-text-input-skeleton>`)}
      `)}
      ${row(`
        ${col(`<cds-ng-fluid-dropdown-skeleton></cds-ng-fluid-dropdown-skeleton>`)}
        ${col(`<cds-ng-fluid-combo-box-skeleton></cds-ng-fluid-combo-box-skeleton>`)}
      `)}
      <cds-ng-fluid-multi-select-skeleton></cds-ng-fluid-multi-select-skeleton>
      ${row(`
        ${col(`<cds-ng-fluid-number-input-skeleton></cds-ng-fluid-number-input-skeleton>`)}
        ${col(`<cds-ng-fluid-select-skeleton></cds-ng-fluid-select-skeleton>`)}
      `)}
      <cds-ng-fluid-dropdown-skeleton></cds-ng-fluid-dropdown-skeleton>
      <cds-ng-fluid-multi-select-skeleton></cds-ng-fluid-multi-select-skeleton>
      <cds-ng-fluid-textarea-skeleton></cds-ng-fluid-textarea-skeleton>
      <cds-ng-fluid-text-input-skeleton></cds-ng-fluid-text-input-skeleton>
      <cds-ng-fluid-text-input-skeleton></cds-ng-fluid-text-input-skeleton>
    </cds-ng-stack>
  </cds-ng-fluid-form>
`;

const stateBindings = `
  [disabled]="disabled"
  [invalid]="invalid"
  [invalidText]="invalidText"
  [warn]="warn"
  [warnText]="warnText"
`;

const fieldForm = `
  <cds-ng-fluid-form aria-label="new project setup">
    <cds-ng-stack gap="5">
      <cds-ng-fluid-search
        id="search-members"
        labelText="Search members"
        placeholder="e.g. Jane Smith"
        [disabled]="disabled"></cds-ng-fluid-search>

      ${row(`
        ${col(`
          <cds-ng-fluid-text-input
            id="project-name"
            label="Project name"
            placeholder="e.g. Carbon Design System"
            [readonly]="readOnly"
            ${stateBindings}>
            ${decorator}
          </cds-ng-fluid-text-input>
        `)}
        ${col(`
          <cds-ng-fluid-text-input
            id="project-id"
            label="Project ID"
            placeholder="e.g. carbon-design-system"
            [readonly]="readOnly"
            ${stateBindings}>
            ${decorator}
          </cds-ng-fluid-text-input>
        `)}
      `)}
      ${row(`
        ${col(`
          <cds-ng-fluid-dropdown
            id="workspace"
            titleText="Workspace"
            label="Select workspace"
            value="option-1"
            [readOnly]="readOnly"
            ${stateBindings}>
            ${decorator}
            <cds-ng-dropdown-item
              *ngFor="let item of items"
              [value]="item.value"
              [disabled]="!!item.disabled">{{ item.text }}</cds-ng-dropdown-item>
          </cds-ng-fluid-dropdown>
        `)}
        ${col(`
          <cds-ng-fluid-combo-box
            id="project-lead"
            titleText="Project lead"
            placeholder="Search members..."
            [readOnly]="readOnly"
            ${stateBindings}>
            ${decorator}
            <cds-ng-combo-box-item
              *ngFor="let item of items"
              [value]="item.value"
              [disabled]="!!item.disabled">{{ item.text }}</cds-ng-combo-box-item>
          </cds-ng-fluid-combo-box>
        `)}
      `)}

      <cds-ng-fluid-multi-select
        id="team-members"
        titleText="Team members"
        label="Select members"
        selectionFeedback="top-after-reopen"
        [readOnly]="readOnly"
        ${stateBindings}>
        ${decorator}
        <cds-ng-multi-select-item
          *ngFor="let item of items"
          [value]="item.value"
          [disabled]="!!item.disabled">{{ item.text }}</cds-ng-multi-select-item>
      </cds-ng-fluid-multi-select>

      ${row(`
        ${col(`
          <cds-ng-fluid-number-input
            id="budget"
            label="Budget"
            min="0"
            max="10000000"
            value="5000"
            step="500"
            iconDescription="Adjust budget"
            [readonly]="readOnly"
            ${stateBindings}>
            ${decorator}
          </cds-ng-fluid-number-input>
        `)}
        ${col(`
          <cds-ng-fluid-select
            id="currency"
            labelText="Currency"
            value="usd"
            [readonly]="readOnly"
            ${stateBindings}>
            ${decorator}
            <cds-ng-select-item value="usd">USD – US Dollar</cds-ng-select-item>
            <cds-ng-select-item value="eur">EUR – Euro</cds-ng-select-item>
            <cds-ng-select-item value="gbp">GBP – British Pound</cds-ng-select-item>
            <cds-ng-select-item value="jpy">JPY – Japanese Yen</cds-ng-select-item>
          </cds-ng-fluid-select>
        `)}
      `)}

      <cds-ng-radio-button-group
        name="project-visibility"
        value="private"
        legendText="Visibility"
        helperText="Who can see and access this project."
        [disabled]="disabled"
        [readOnly]="readOnly">
        <cds-ng-radio-button
          value="private"
          id="vis-private"
          labelText="Private – only invited members"></cds-ng-radio-button>
        <cds-ng-radio-button
          value="internal"
          id="vis-internal"
          labelText="Internal – everyone in the org"></cds-ng-radio-button>
        <cds-ng-radio-button
          value="public"
          id="vis-public"
          labelText="Public – anyone with the link"></cds-ng-radio-button>
      </cds-ng-radio-button-group>

      <cds-ng-fluid-dropdown
        id="project-type"
        titleText="Project type"
        label="Select type"
        value="option-2"
        [readOnly]="readOnly"
        ${stateBindings}>
        ${decorator}
        <cds-ng-dropdown-item
          *ngFor="let item of items"
          [value]="item.value"
          [disabled]="!!item.disabled">{{ item.text }}</cds-ng-dropdown-item>
      </cds-ng-fluid-dropdown>

      <cds-ng-fluid-multi-select
        id="tags"
        filterable
        titleText="Tags"
        placeholder="Filter"
        selectionFeedback="top-after-reopen"
        [readOnly]="readOnly"
        ${stateBindings}>
        ${decorator}
        <cds-ng-multi-select-item
          *ngFor="let item of items"
          [value]="item.value"
          [disabled]="!!item.disabled">{{ item.text }}</cds-ng-multi-select-item>
      </cds-ng-fluid-multi-select>

      <cds-ng-form-group legendText="Features">
        <cds-ng-checkbox id="feat-issues" defaultChecked [disabled]="disabled">Issue tracking</cds-ng-checkbox>
        <cds-ng-checkbox id="feat-wiki" defaultChecked [disabled]="disabled">Wiki</cds-ng-checkbox>
        <cds-ng-checkbox id="feat-ci" [disabled]="disabled">CI / CD pipeline</cds-ng-checkbox>
        <cds-ng-checkbox id="feat-releases" [disabled]="disabled">Releases</cds-ng-checkbox>
      </cds-ng-form-group>

      <cds-ng-fluid-textarea
        id="project-description"
        label="Description"
        placeholder="What is this project about?"
        [rows]="4"
        [readonly]="readOnly"
        ${stateBindings}>
        ${decorator}
      </cds-ng-fluid-textarea>

      <cds-ng-fluid-text-input
        id="repo-url"
        label="Repository URL"
        placeholder="https://github.com/org/repo"
        [readonly]="readOnly"
        ${stateBindings}>
        ${decorator}
      </cds-ng-fluid-text-input>

      <cds-ng-fluid-password-input
        id="repo-password"
        label="Password"
        placeholder="Enter password"
        required
        pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
        [disabled]="disabled"
        [readonly]="readOnly"
        [invalid]="invalid"
        invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
        [warn]="warn"
        [warnText]="warnText"></cds-ng-fluid-password-input>

      <cds-ng-form-group legendText="Project assets">
        <cds-ng-file-uploader
          id="file-assets"
          labelDescription="Max 25 MB per file."
          [disabled]="disabled">
          <cds-ng-file-uploader-button
            accept=".pdf,.png,.jpg,.fig,.sketch"
            buttonKind="primary"
            size="md"
            multiple>
            Add files
          </cds-ng-file-uploader-button>
        </cds-ng-file-uploader>
      </cds-ng-form-group>

      <cds-ng-button type="submit">Create project</cds-ng-button>
    </cds-ng-stack>
  </cds-ng-fluid-form>
`;

// Equivalent of the WC `wrapForm` helper: the form is either rendered inline
// or inside a modal that is opened by a trigger button.
const template = `
  ${aiLabelTemplate}
  <ng-template #formTpl>
    <ng-container *ngIf="skeleton; else fields">${skeletonForm}</ng-container>
    <ng-template #fields>${fieldForm}</ng-template>
  </ng-template>

  <div *ngIf="!showInModal" style="width: 100%; max-width: 600px; min-width: 0;">
    <ng-container *ngTemplateOutlet="formTpl"></ng-container>
  </div>

  <ng-container *ngIf="showInModal">
    <cds-ng-button (click)="modalOpen = !modalOpen">Open form</cds-ng-button>
    <cds-ng-modal
      id="fluid-form-default-modal"
      size="md"
      preventCloseOnClickOutside
      hasScrollingContent
      [open]="modalOpen"
      (modalClosed)="modalOpen = false">
      <cds-ng-modal-header>
        <cds-ng-modal-close-button></cds-ng-modal-close-button>
        <cds-ng-modal-heading>Create project</cds-ng-modal-heading>
      </cds-ng-modal-header>
      <cds-ng-modal-body>
        <div style="padding: 1rem;">
          <ng-container *ngTemplateOutlet="formTpl"></ng-container>
        </div>
      </cds-ng-modal-body>
      <cds-ng-modal-footer>
        <cds-ng-modal-footer-button kind="secondary" data-modal-close>
          Cancel
        </cds-ng-modal-footer-button>
        <cds-ng-modal-footer-button kind="primary" data-modal-close>
          Create project
        </cds-ng-modal-footer-button>
      </cds-ng-modal-footer>
    </cds-ng-modal>
  </ng-container>
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Fluid Components/FluidForm',
  decorators: [
    moduleMetadata({
      imports: [
        NgFor,
        NgIf,
        NgTemplateOutlet,
        FluidFormComponent,
        FluidTextInputComponent,
        FluidTextInputSkeletonComponent,
        FluidPasswordInputComponent,
        FluidTextareaComponent,
        FluidTextareaSkeletonComponent,
        FluidNumberInputComponent,
        FluidNumberInputSkeletonComponent,
        FluidSelectComponent,
        FluidSelectSkeletonComponent,
        SelectItemComponent,
        FluidSearchComponent,
        FluidSearchSkeletonComponent,
        FluidDropdownComponent,
        FluidDropdownSkeletonComponent,
        DropdownItemComponent,
        FluidComboBoxComponent,
        FluidComboBoxSkeletonComponent,
        ComboBoxItemComponent,
        FluidMultiSelectComponent,
        FluidMultiSelectSkeletonComponent,
        MultiSelectItemComponent,
        StackComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        IconButtonComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        CheckboxComponent,
        FormGroupComponent,
        FileUploaderComponent,
        FileUploaderButtonComponent,
        ButtonComponent,
        ModalComponent,
        ModalBodyComponent,
        ModalCloseButtonComponent,
        ModalFooterComponent,
        ModalFooterButtonComponent,
        ModalHeaderComponent,
        ModalHeadingComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: {
    skeleton: false,
    aiLabel: false,
    revertActive: false,
    showInModal: false,
    disabled: false,
    readOnly: false,
    invalid: false,
    invalidText: 'Error message.',
    warn: false,
    warnText: 'Warning message.',
  },
  argTypes: {
    skeleton: {
      control: { type: 'boolean' },
      description: 'Render all form inputs as skeleton loaders simultaneously',
    },
    aiLabel: {
      table: { disable: true },
    },
    revertActive: {
      table: { disable: true },
    },
    showInModal: {
      control: { type: 'boolean' },
      description:
        'Render the entire form inside a ComposedModal with a trigger button',
    },
    disabled: {
      control: 'boolean',
      description: 'Specify whether the fluid form inputs should be disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Specify whether the fluid form inputs should be read-only',
    },
    invalid: {
      control: 'boolean',
      description:
        'Specify whether the fluid form inputs are in an invalid state',
    },
    invalidText: {
      control: 'text',
      description: 'Provide the text for the invalid state',
    },
    warn: {
      control: 'boolean',
      description:
        'Specify whether the fluid form inputs should display a warning',
    },
    warnText: {
      control: { type: 'text' },
      description: 'Provide the text for the warning state',
    },
  },
  render: (args) => ({
    props: { ...args, items, modalOpen: false },
    template,
  }),
};
