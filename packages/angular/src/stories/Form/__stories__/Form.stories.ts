/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { JsonPipe, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { FormComponent } from '@carbon/angular/form';
import { StackComponent } from '@carbon/angular/stack';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { IconButtonComponent } from '@carbon/angular/icon-button';
import {
  RadioButtonComponent,
  RadioButtonGroupComponent,
} from '@carbon/angular/radio-button';
import { CheckboxComponent } from '@carbon/angular/checkbox';
import { FormGroupComponent } from '@carbon/angular/form-group';
import {
  NumberInputComponent,
  NumberInputSkeletonComponent,
} from '@carbon/angular/number-input';
import {
  SelectComponent,
  SelectItemComponent,
  SelectSkeletonComponent,
} from '@carbon/angular/select';
import {
  FileUploaderComponent,
  FileUploaderButtonComponent,
} from '@carbon/angular/file-uploader';
import {
  SearchComponent,
  SearchSkeletonComponent,
} from '@carbon/angular/search';
import {
  TextInputComponent,
  TextInputSkeletonComponent,
} from '@carbon/angular/text-input';
import {
  PasswordInputComponent,
  PasswordInputSkeletonComponent,
} from '@carbon/angular/password-input';
import {
  TextareaComponent,
  TextareaSkeletonComponent,
} from '@carbon/angular/textarea';
import { ButtonComponent } from '@carbon/angular/button';
import {
  PreviewDatePickerComponent,
  PreviewDatePickerInputComponent,
  PreviewDatePickerInputSkeletonComponent,
} from '@carbon/angular/date-picker';
import {
  DropdownComponent,
  DropdownItemComponent,
  DropdownSkeletonComponent,
} from '@carbon/angular/dropdown';
import {
  MultiSelectComponent,
  MultiSelectItemComponent,
} from '@carbon/angular/multi-select';
import {
  ComboBoxComponent,
  ComboBoxItemComponent,
} from '@carbon/angular/combo-box';
import {
  ModalComponent,
  ModalBodyComponent,
  ModalCloseButtonComponent,
  ModalFooterComponent,
  ModalFooterButtonComponent,
  ModalHeaderComponent,
  ModalHeadingComponent,
} from '@carbon/angular/modal';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components Form) ─────────

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
          Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
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

const dateHelper = (text: string) =>
  `<span *ngIf="!invalid && !warn" slot="helper-text">${text}</span>`;

const row = (children: string) => `
  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">${children}</div>
`;

const col = (children: string) => `
  <div style="flex: 1 1 12rem; min-width: 0;">${children}</div>
`;

const dateRow = (children: string) => `
  <div
    style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
    ${children}
  </div>
`;

const dateRangeCol = (children: string) => `
  <div style="flex: 0 1 auto;">${children}</div>
`;

const dateSimpleCol = (children: string) => `
  <div style="flex: 0 1 auto;">${children}</div>
`;

const sharedArgs = {
  onSubmit: () => {},
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
};

const sharedArgTypes: ArgTypes = {
  onSubmit: {
    action: 'onSubmit',
  },
  skeleton: {
    control: { type: 'boolean' },
    description: 'Render all form inputs as skeleton loaders simultaneously',
  },
  aiLabel: {
    control: { type: 'boolean' },
    description: 'Attach an AI Label decorator to all inputs that support it',
    table: { category: 'AILabel' },
  },
  revertActive: {
    control: { type: 'boolean' },
    table: { category: 'AILabel' },
  },
  showInModal: {
    control: { type: 'boolean' },
    description:
      'Render the entire form inside a ComposedModal with a trigger button',
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Specify whether the form inputs should be disabled',
  },
  readOnly: {
    control: { type: 'boolean' },
    description: 'Specify whether the form inputs should be read-only',
  },
  invalid: {
    control: { type: 'boolean' },
    description: 'Specify whether the form inputs are in an invalid state',
  },
  invalidText: {
    control: { type: 'text' },
    description: 'Provide the text for the invalid state',
  },
  warn: {
    control: { type: 'boolean' },
    description: 'Specify whether the form inputs should display a warning',
  },
  warnText: {
    control: { type: 'text' },
    description: 'Provide the text for the warning state',
  },
};

const aiLabelStoryStyles = `
  cds-ng-ai-label p {
    font-size: var(--cds-body-compact-01-font-size, 0.875rem);
    font-weight: var(--cds-body-compact-01-font-weight, 400);
    line-height: var(--cds-body-compact-01-line-height, 1.28572);
    letter-spacing: var(--cds-body-compact-01-letter-spacing, 0.16px);
  }

  cds-ng-ai-label .bold {
    font-weight: 600;
  }

  cds-ng-ai-label .secondary {
    color: var(--cds-text-secondary, #525252);
  }

  cds-ng-ai-label .ai-label-heading {
    font-size: 2.625rem;
    font-weight: 300;
    margin-block-end: 1rem;
  }

  cds-ng-ai-label hr {
    border: 0;
    background: var(--cds-border-subtle, #c6c6c6);
    block-size: 1px;
    margin-block: 2rem;
  }
`;

const stateBindings = `
  [disabled]="disabled"
  [invalid]="invalid"
  [invalidText]="invalidText"
  [warn]="warn"
  [warnText]="warnText"
`;

// TODO(parity): the WC story renders the classic `cds-date-picker` and
// `cds-date-picker-input-skeleton`, which `@carbon/angular` does not wrap
// (ADR 0021). The Preview Date Picker stands in for them in both the skeleton
// and the field form below.
const skeletonForm = `
  <cds-ng-form id="test-form" aria-label="new project setup">
    <cds-ng-stack gap="5">
      <cds-ng-search-skeleton></cds-ng-search-skeleton>
      ${row(`
        ${col(`<cds-ng-text-input-skeleton></cds-ng-text-input-skeleton>`)}
        ${col(`<cds-ng-text-input-skeleton></cds-ng-text-input-skeleton>`)}
      `)}
      ${row(`
        ${col(`<cds-ng-dropdown-skeleton></cds-ng-dropdown-skeleton>`)}
        ${col(`<cds-ng-dropdown-skeleton></cds-ng-dropdown-skeleton>`)}
      `)}
      <cds-ng-dropdown-skeleton></cds-ng-dropdown-skeleton>
      ${dateRow(`
        ${dateRangeCol(`<cds-ng-preview-date-picker-input-skeleton [range]="true"></cds-ng-preview-date-picker-input-skeleton>`)}
        ${dateSimpleCol(`<cds-ng-preview-date-picker-input-skeleton></cds-ng-preview-date-picker-input-skeleton>`)}
      `)}
      ${row(`
        ${col(`<cds-ng-number-input-skeleton></cds-ng-number-input-skeleton>`)}
        ${col(`<cds-ng-select-skeleton></cds-ng-select-skeleton>`)}
      `)}
      <cds-ng-dropdown-skeleton></cds-ng-dropdown-skeleton>
      <cds-ng-dropdown-skeleton></cds-ng-dropdown-skeleton>
      <cds-ng-textarea-skeleton></cds-ng-textarea-skeleton>
      ${row(`
        ${col(`<cds-ng-text-input-skeleton></cds-ng-text-input-skeleton>`)}
        ${col(`<cds-ng-password-input-skeleton></cds-ng-password-input-skeleton>`)}
      `)}
    </cds-ng-stack>
  </cds-ng-form>
`;

const fieldForm = `
  <cds-ng-form id="test-form" aria-label="new project setup">
    <cds-ng-stack gap="5">
      <cds-ng-search
        [size]="size"
        id="search-members"
        labelText="Search members"
        placeholder="e.g. Jane Smith"
        [disabled]="disabled"></cds-ng-search>

      ${row(`
        ${col(`
          <cds-ng-text-input
            id="project-name"
            label="Project name"
            helperText="Short, descriptive project name."
            placeholder="e.g. Carbon Design System"
            [size]="size"
            [readonly]="readOnly"
            ${stateBindings}>
            ${decorator}
          </cds-ng-text-input>
        `)}
        ${col(`
          <cds-ng-text-input
            id="project-id"
            label="Project ID"
            helperText="Lowercase letters, numbers, hyphens only."
            placeholder="e.g. carbon-design-system"
            [size]="size"
            [readonly]="readOnly"
            ${stateBindings}>
            ${decorator}
          </cds-ng-text-input>
        `)}
      `)}
      ${row(`
        ${col(`
          <cds-ng-dropdown
            id="workspace"
            titleText="Workspace"
            helperText="Workspace this project belongs to."
            label="Select workspace"
            value="option-1"
            [size]="listBoxSize"
            [readOnly]="readOnly"
            ${stateBindings}>
            ${decorator}
            <cds-ng-dropdown-item
              *ngFor="let item of items"
              [value]="item.value"
              [disabled]="!!item.disabled">{{ item.text }}</cds-ng-dropdown-item>
          </cds-ng-dropdown>
        `)}
        ${col(`
          <cds-ng-combo-box
            id="project-lead"
            titleText="Project lead"
            helperText="Start typing to find a team member."
            placeholder="Search members..."
            [size]="listBoxSize"
            [readOnly]="readOnly"
            ${stateBindings}>
            ${decorator}
            <cds-ng-combo-box-item
              *ngFor="let item of items"
              [value]="item.value"
              [disabled]="!!item.disabled">{{ item.text }}</cds-ng-combo-box-item>
          </cds-ng-combo-box>
        `)}
      `)}

      <cds-ng-multi-select
        id="team-members"
        titleText="Team members"
        label="Select members"
        helperText="Everyone who will have access."
        selectionFeedback="top-after-reopen"
        [size]="listBoxSize"
        [readOnly]="readOnly"
        ${stateBindings}>
        ${decorator}
        <cds-ng-multi-select-item
          *ngFor="let item of items"
          [value]="item.value"
          [disabled]="!!item.disabled">{{ item.text }}</cds-ng-multi-select-item>
      </cds-ng-multi-select>

      ${dateRow(`
        ${dateRangeCol(`
          <cds-ng-preview-date-picker [disabled]="disabled" [readonly]="readOnly">
            <cds-ng-preview-date-picker-input
              kind="from"
              id="start-date"
              placeholder="mm/dd/yyyy"
              labelText="Start date"
              [size]="size"
              [readonly]="readOnly"
              ${stateBindings}>
              ${decorator}
              ${dateHelper('Active work begins.')}
            </cds-ng-preview-date-picker-input>
            <cds-ng-preview-date-picker-input
              kind="to"
              id="end-date"
              placeholder="mm/dd/yyyy"
              labelText="End date"
              [size]="size"
              [readonly]="readOnly"
              ${stateBindings}>
              ${decorator}
              ${dateHelper('Active work ends.')}
            </cds-ng-preview-date-picker-input>
          </cds-ng-preview-date-picker>
        `)}
        ${dateSimpleCol(`
          <cds-ng-preview-date-picker [disabled]="disabled" [readonly]="readOnly">
            <cds-ng-preview-date-picker-input
              kind="simple"
              id="deadline"
              placeholder="mm/dd/yyyy"
              labelText="Deadline"
              [size]="size"
              [readonly]="readOnly"
              ${stateBindings}>
              ${decorator}
              ${dateHelper('Final delivery date.')}
            </cds-ng-preview-date-picker-input>
          </cds-ng-preview-date-picker>
        `)}
      `)}
      ${row(`
        ${col(`
          <cds-ng-number-input
            id="budget"
            label="Budget"
            helperText="Total allocated budget."
            min="0"
            max="10000000"
            value="5000"
            step="500"
            iconDescription="Adjust budget"
            [size]="listBoxSize"
            [readonly]="readOnly"
            ${stateBindings}>
            ${decorator}
          </cds-ng-number-input>
        `)}
        ${col(`
          <cds-ng-select
            id="currency"
            labelText="Currency"
            helperText="Currency for the budget above."
            value="usd"
            [size]="size"
            [readonly]="readOnly"
            ${stateBindings}>
            ${decorator}
            <cds-ng-select-item value="usd">USD – US Dollar</cds-ng-select-item>
            <cds-ng-select-item value="eur">EUR – Euro</cds-ng-select-item>
            <cds-ng-select-item value="gbp">GBP – British Pound</cds-ng-select-item>
            <cds-ng-select-item value="jpy">JPY – Japanese Yen</cds-ng-select-item>
          </cds-ng-select>
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

      <cds-ng-dropdown
        id="project-type"
        titleText="Project type"
        helperText="Methodology used for this project."
        label="Select type"
        value="option-2"
        [size]="listBoxSize"
        [readOnly]="readOnly"
        ${stateBindings}>
        ${decorator}
        <cds-ng-dropdown-item
          *ngFor="let item of items"
          [value]="item.value"
          [disabled]="!!item.disabled">{{ item.text }}</cds-ng-dropdown-item>
      </cds-ng-dropdown>

      <cds-ng-multi-select
        id="tags"
        filterable
        titleText="Tags"
        helperText="Labels to categorise and filter this project."
        placeholder="Filter"
        selectionFeedback="top-after-reopen"
        [size]="listBoxSize"
        [readOnly]="readOnly"
        ${stateBindings}>
        ${decorator}
        <cds-ng-multi-select-item
          *ngFor="let item of items"
          [value]="item.value"
          [disabled]="!!item.disabled">{{ item.text }}</cds-ng-multi-select-item>
      </cds-ng-multi-select>

      <cds-ng-form-group legendText="Features">
        <cds-ng-checkbox id="feat-issues" defaultChecked [disabled]="disabled">Issue tracking</cds-ng-checkbox>
        <cds-ng-checkbox id="feat-wiki" defaultChecked [disabled]="disabled">Wiki</cds-ng-checkbox>
        <cds-ng-checkbox id="feat-ci" [disabled]="disabled">CI / CD pipeline</cds-ng-checkbox>
        <cds-ng-checkbox id="feat-releases" [disabled]="disabled">Releases</cds-ng-checkbox>
      </cds-ng-form-group>

      <cds-ng-textarea
        id="project-description"
        label="Description"
        helperText="Goals and scope of this project."
        placeholder="What is this project about?"
        [rows]="4"
        [readonly]="readOnly"
        ${stateBindings}>
        ${decorator}
      </cds-ng-textarea>

      <cds-ng-text-input
        id="repo-url"
        label="Repository URL"
        helperText="Link to an existing Git repository."
        placeholder="https://github.com/org/repo"
        [size]="size"
        [readonly]="readOnly"
        ${stateBindings}>
        ${decorator}
      </cds-ng-text-input>

      <cds-ng-password-input
        id="repo-password"
        label="Password"
        helperText="Must be at least 6 characters and include an uppercase letter, a lowercase letter, and a number."
        placeholder="Enter password"
        required
        pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
        [size]="size"
        [disabled]="disabled"
        [readonly]="readOnly"
        [invalid]="invalid"
        invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
        [warn]="warn"
        [warnText]="warnText"></cds-ng-password-input>

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

      <cds-ng-button type="submit" (click)="handleSubmit()">Create project</cds-ng-button>
    </cds-ng-stack>
  </cds-ng-form>
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
      id="form-default-modal"
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

const renderDefaultForm = (args: Record<string, unknown>) => {
  const { size = 'md', onSubmit } = args ?? {};

  const handleSubmit = () => {
    const form =
      (document
        .getElementById('test-form')
        ?.shadowRoot?.querySelector('form') as HTMLFormElement) || null;
    if (!form) return;

    const hasInvalidRequired = Array.from(
      document.querySelectorAll('[required]')
    ).some((el: Element) => {
      const input = el.shadowRoot?.querySelector('input');
      return input ? !input.reportValidity() : false;
    });
    if (hasInvalidRequired) return;

    form.requestSubmit();
    (onSubmit as (() => void) | undefined)?.();
  };

  return {
    props: {
      ...args,
      size,
      listBoxSize: size === 'xs' ? 'sm' : size,
      items,
      modalOpen: false,
      handleSubmit,
    },
    styles: [aiLabelStoryStyles],
    template,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Form',
  decorators: [
    moduleMetadata({
      imports: [
        NgFor,
        NgIf,
        NgTemplateOutlet,
        FormComponent,
        StackComponent,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        IconButtonComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        CheckboxComponent,
        FormGroupComponent,
        NumberInputComponent,
        NumberInputSkeletonComponent,
        SelectComponent,
        SelectItemComponent,
        SelectSkeletonComponent,
        FileUploaderComponent,
        FileUploaderButtonComponent,
        SearchComponent,
        SearchSkeletonComponent,
        TextInputComponent,
        TextInputSkeletonComponent,
        PasswordInputComponent,
        PasswordInputSkeletonComponent,
        TextareaComponent,
        TextareaSkeletonComponent,
        ButtonComponent,
        PreviewDatePickerComponent,
        PreviewDatePickerInputComponent,
        PreviewDatePickerInputSkeletonComponent,
        DropdownComponent,
        DropdownItemComponent,
        DropdownSkeletonComponent,
        MultiSelectComponent,
        MultiSelectItemComponent,
        ComboBoxComponent,
        ComboBoxItemComponent,
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
    ...sharedArgs,
    size: 'md',
  },
  argTypes: {
    ...sharedArgTypes,
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description:
        'Size of all form inputs. xs is supported by TextInput, Select and Search; other components clamp to sm.',
    },
  },
  render: renderDefaultForm,
};

// WC: withAILabel
export const WithAILabel: Story = {
  name: 'With AI Label',
  args: {
    ...sharedArgs,
    aiLabel: true,
    size: 'md',
  },
  argTypes: {
    ...sharedArgTypes,
    size: {
      table: { disable: true },
    },
  },
  render: renderDefaultForm,
};

// ─── Angular-only stories ─────────────────────────────────────────────────────

// Reactive forms: `formControlName` on the form-associated wrappers, with the
// whole group bound to `cds-ng-form` through `[formGroup]`.
export const ReactiveForm: Story = {
  tags: ['!dev', '!autodocs'],
  decorators: [moduleMetadata({ imports: [ReactiveFormsModule, JsonPipe] })],
  render: () => {
    const form = new FormBuilder().group({
      projectName: ['Carbon Design System'],
      currency: ['usd'],
      issues: [true],
    });
    return {
      props: { form },
      template: `
        <div style="width: 100%; max-width: 600px; min-width: 0;">
          <cds-ng-form [formGroup]="form" aria-label="reactive form">
            <cds-ng-stack gap="5">
              <cds-ng-text-input
                label="Project name"
                formControlName="projectName"></cds-ng-text-input>
              <cds-ng-select labelText="Currency" formControlName="currency">
                <cds-ng-select-item value="usd">USD – US Dollar</cds-ng-select-item>
                <cds-ng-select-item value="eur">EUR – Euro</cds-ng-select-item>
              </cds-ng-select>
              <cds-ng-checkbox formControlName="issues">Issue tracking</cds-ng-checkbox>
              <p>Form value: {{ form.value | json }}</p>
            </cds-ng-stack>
          </cds-ng-form>
        </div>
      `,
    };
  },
};
