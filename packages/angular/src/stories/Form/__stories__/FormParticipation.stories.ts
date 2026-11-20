/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { fn } from 'storybook/test';
import { FormComponent } from '@carbon/angular/form';
import { StackComponent } from '@carbon/angular/stack';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';
import { IconButtonComponent } from '@carbon/angular/icon-button';
import { FormGroupComponent } from '@carbon/angular/form-group';
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
import { TextInputComponent } from '@carbon/angular/text-input';
import { TextareaComponent } from '@carbon/angular/textarea';
import { NumberInputComponent } from '@carbon/angular/number-input';
import { PasswordInputComponent } from '@carbon/angular/password-input';
import { CheckboxComponent } from '@carbon/angular/checkbox';
import { SelectComponent, SelectItemComponent } from '@carbon/angular/select';
import {
  DropdownComponent,
  DropdownItemComponent,
} from '@carbon/angular/dropdown';
import {
  MultiSelectComponent,
  MultiSelectItemComponent,
} from '@carbon/angular/multi-select';
import {
  ComboBoxComponent,
  ComboBoxItemComponent,
} from '@carbon/angular/combo-box';
import { SearchComponent } from '@carbon/angular/search';
import {
  RadioButtonComponent,
  RadioButtonGroupComponent,
} from '@carbon/angular/radio-button';
import {
  PreviewDatePickerComponent,
  PreviewDatePickerInputComponent,
} from '@carbon/angular/date-picker';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import { iconToSvg } from '../../../../.storybook/helpers/icon-to-svg';

// ─── WC-parity stories (one-for-one with @carbon/web-components Form
// participation) ─────────────────────────────────────────────────────────────

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

const row = (children: string) => `
  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">${children}</div>
`;

const col = (children: string) => `
  <div style="flex: 1 1 12rem; min-width: 0;">${children}</div>
`;

const sharedArgs = {
  onSubmit: fn(),
  onInvalid: fn(),
  onReset: fn(),
  onChange: fn(),
  onFormData: fn(),
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
    description:
      'Native `submit`, with the entries the browser collected. Fires only once every control passes constraint validation.',
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

const fieldForm = `
  <cds-ng-form>
    <form
      id="preview-form"
      aria-label="new project setup"
      (submit)="handleFormSubmit($event)"
      (reset)="handleReset($event)"
      (change)="handleChange($event)">
      <cds-ng-stack gap="5">
        <cds-ng-search
          [size]="size"
          id="search-members"
          name="search-members"
          labelText="Search members"
          placeholder="e.g. Jane Smith"
          [disabled]="disabled"></cds-ng-search>

        ${row(`
          ${col(`
            <cds-ng-text-input
              id="project-name"
              name="project-name"
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
              name="project-id"
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
              name="workspace"
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
              name="project-lead"
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
          name="team-members"
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
            <cds-ng-preview-date-picker
              name="project-dates"
              [disabled]="disabled"
              [readonly]="readOnly">
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
            <cds-ng-preview-date-picker
              name="deadline"
              [disabled]="disabled"
              [readonly]="readOnly">
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
              name="budget"
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
              name="currency"
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
          name="project-type"
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
          name="tags"
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
          <cds-ng-checkbox
            id="feat-issues"
            name="feat-issues"
            defaultChecked
            [disabled]="disabled">Issue tracking</cds-ng-checkbox>
          <cds-ng-checkbox
            id="feat-wiki"
            name="feat-wiki"
            defaultChecked
            [disabled]="disabled">Wiki</cds-ng-checkbox>
          <cds-ng-checkbox
            id="feat-ci"
            name="feat-ci"
            [disabled]="disabled">CI / CD pipeline</cds-ng-checkbox>
          <cds-ng-checkbox
            id="feat-releases"
            name="feat-releases"
            [disabled]="disabled">Releases</cds-ng-checkbox>
        </cds-ng-form-group>

        <cds-ng-textarea
          id="project-description"
          name="project-description"
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
          name="repo-url"
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
          name="repo-password"
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

        <cds-ng-button type="submit" (click)="handleSubmit()">Create project</cds-ng-button>
        <cds-ng-button kind="secondary" type="reset" (click)="handleResetClick()">Reset</cds-ng-button>
      </cds-ng-stack>
      <pre
        data-output
        aria-live="polite"
        style="margin-block-start: 1rem; white-space: pre-wrap;"></pre>

    </form>
  </cds-ng-form>
`;

// Equivalent of the WC `wrapForm` helper: the form is either rendered inline
// or inside a modal that is opened by a trigger button.
const template = `
  ${aiLabelTemplate}
  <ng-template #formTpl>${fieldForm}</ng-template>

  <div *ngIf="!showInModal" style="width: 100%; max-width: 600px; min-width: 0;">
    <ng-container *ngTemplateOutlet="formTpl"></ng-container>
  </div>

  <ng-container *ngIf="showInModal">
    <cds-ng-button (click)="modalOpen = !modalOpen">Open form</cds-ng-button>
    <cds-ng-modal
      id="preview-form-modal"
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

type Callback = (...callbackArgs: unknown[]) => void;

/**
 * Writes the submitted entries into the story, so the form shows what the
 * browser actually sends.
 */
const entriesOf = (form: HTMLFormElement) => {
  const out: string[] = [];
  new FormData(form).forEach((value, name) => out.push(`${name}=${value}`));
  return out;
};

const serialize = (form: HTMLFormElement) => {
  const output = form.querySelector('[data-output]');
  if (!output) {
    return;
  }
  output.textContent = entriesOf(form).join('\n') || '(no entries)';
};

// SB renders twice on arg changes; suppress dupes
let lastFormData = '';

// constraints flags the browser set on a controls
const failedConstraints = (el: HTMLElement & { validity?: ValidityState }) => {
  const out: string[] = [];
  for (const flag in el.validity) {
    if (flag !== 'valid' && (el.validity as never)[flag]) {
      out.push(flag);
    }
  }
  return out;
};

const renderPreviewForm = (args: Record<string, unknown>) => {
  const { size = 'md' } = (args ?? {}) as { size?: string };
  const {
    disabled,
    readOnly,
    invalid,
    onSubmit,
    onInvalid,
    onReset,
    onChange,
    onFormData,
  } = (args ?? {}) as Record<string, Callback & unknown>;

  const getForm = () =>
    document.querySelector('#preview-form') as HTMLFormElement | null;

  const handleSubmit = () => {
    const form = getForm();
    if (!form) return;
    // No manual validation loop. `requestSubmit()` runs constraint validation
    // itself, because these controls are real form controls.
    form.requestSubmit();
  };

  // set up controls/actions
  requestAnimationFrame(() => {
    const form = getForm();
    if (!form) {
      return;
    }
    // `invalid` does not bubble, so listen during the capture phase.
    form.addEventListener(
      'invalid',
      (event) => {
        const el = event.target as HTMLElement & { validationMessage?: string };
        (onInvalid as Callback | undefined)?.({
          control: el.tagName.toLowerCase(),
          name: el.getAttribute('name'),
          failed: failedConstraints(el),
          message: el.validationMessage,
        });
      },
      true
    );
    const payload = {
      disabled,
      readOnly,
      invalid,
      size,
      entries: entriesOf(form),
    };
    const fingerprint = JSON.stringify(payload);
    if (fingerprint === lastFormData) {
      return;
    }
    lastFormData = fingerprint;
    (onFormData as Callback | undefined)?.(payload);
  });

  const handleFormSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    serialize(form);
    (onSubmit as Callback | undefined)?.(entriesOf(form));
  };

  const handleReset = (event: Event) => {
    const form = event.target as HTMLFormElement;
    requestAnimationFrame(() => {
      serialize(form);
      (onReset as Callback | undefined)?.(entriesOf(form));
    });
  };

  const handleChange = (event: Event) => {
    const el = event.target as HTMLElement & {
      checked?: boolean;
      value?: string;
    };
    (onChange as Callback | undefined)?.({
      control: el.tagName.toLowerCase(),
      name: el.getAttribute('name'),
      value: el.checked !== undefined ? el.checked : el.value,
    });
  };

  return {
    props: {
      ...args,
      size,
      listBoxSize: size === 'xs' ? 'sm' : size,
      items,
      modalOpen: false,
      handleSubmit,
      handleFormSubmit,
      handleReset,
      handleChange,
      handleResetClick: () => getForm()?.reset(),
    },
    styles: [aiLabelStoryStyles],
    template,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Preview/Form participation',
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
        FormGroupComponent,
        ButtonComponent,
        ModalComponent,
        ModalBodyComponent,
        ModalCloseButtonComponent,
        ModalFooterComponent,
        ModalFooterButtonComponent,
        ModalHeaderComponent,
        ModalHeadingComponent,
        TextInputComponent,
        TextareaComponent,
        NumberInputComponent,
        PasswordInputComponent,
        CheckboxComponent,
        SelectComponent,
        SelectItemComponent,
        DropdownComponent,
        DropdownItemComponent,
        MultiSelectComponent,
        MultiSelectItemComponent,
        ComboBoxComponent,
        ComboBoxItemComponent,
        SearchComponent,
        RadioButtonComponent,
        RadioButtonGroupComponent,
        PreviewDatePickerComponent,
        PreviewDatePickerInputComponent,
      ],
    }),
  ],
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
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
    onInvalid: {
      description:
        'Native `invalid`, dispatched by the browser at a control that blocks submission.',
    },
    onReset: {
      action: 'reset',
      description: 'Native `reset` on the `<form>`.',
    },
  },
  render: renderPreviewForm,
};
