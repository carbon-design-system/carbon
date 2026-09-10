/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { iconLoader } from '../../globals/internal/icon-loader';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import './index';
import '../stack/index';
import '../ai-label/index';
import '../icon-button/index';
import '../form-group/index';
import '../button/index';
import '../modal/index';
// Preview form controls. Each `next` barrel also registers everything its v2
// barrel does, so items and skeletons come along.
import '../text-input/next/index';
import '../textarea/next/index';
import '../number-input/next/index';
import '../password-input/next/index';
import '../checkbox/next/index';
import '../select/next/index';
import '../dropdown/next/index';
import '../multi-select/next/index';
import '../combo-box/next/index';
import '../search/next/index';
import '../radio-button/next/index';

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

const renderAILabelContent = () => html`
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

const renderAILabelActions = () => html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open Folder </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

const renderAILabel = (revertActive) =>
  html`<cds-ai-label
    alignment="bottom-left"
    autoalign
    ?revert-active="${revertActive}">
    ${renderAILabelContent()}${renderAILabelActions()}
  </cds-ai-label>`;

const dropdownItems = () =>
  items.map(
    (item) => html`
      <cds-dropdown-item
        value="${item.value}"
        ?disabled="${Boolean(item.disabled)}"
        >${item.text}</cds-dropdown-item
      >
    `
  );

const comboBoxItems = () =>
  items.map(
    (item) => html`
      <cds-combo-box-item
        value="${item.value}"
        ?disabled="${Boolean(item.disabled)}"
        >${item.text}</cds-combo-box-item
      >
    `
  );

const multiSelectItems = () =>
  items.map(
    (item) => html`
      <cds-multi-select-item
        value="${item.value}"
        ?disabled="${Boolean(item.disabled)}"
        >${item.text}</cds-multi-select-item
      >
    `
  );

const row = (children) => html`
  <div style="display: flex; flex-wrap: wrap; gap: 1rem;">${children}</div>
`;

const col = (children) => html`
  <div style="flex: 1 1 12rem; min-width: 0;">${children}</div>
`;

const sharedArgs = {
  onSubmit: () => {},
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

const sharedArgTypes = {
  onSubmit: {
    action: 'onSubmit',
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
  cds-ai-label p {
    font-size: var(--cds-body-compact-01-font-size, 0.875rem);
    font-weight: var(--cds-body-compact-01-font-weight, 400);
    line-height: var(--cds-body-compact-01-line-height, 1.28572);
    letter-spacing: var(--cds-body-compact-01-letter-spacing, 0.16px);
  }

  cds-ai-label .bold {
    font-weight: 600;
  }

  cds-ai-label .secondary {
    color: var(--cds-text-secondary, #525252);
  }

  cds-ai-label .ai-label-heading {
    font-size: 2.625rem;
    font-weight: 300;
    margin-block-end: 1rem;
  }

  cds-ai-label hr {
    border: 0;
    background: var(--cds-border-subtle, #c6c6c6);
    block-size: 1px;
    margin-block: 2rem;
  }
`;

const wrapForm = (content, { showInModal, modalId }) => {
  if (!showInModal) {
    return html`<div style="width: 100%; max-width: 600px; min-width: 0;">
      <style>
        ${aiLabelStoryStyles}
      </style>
      ${content}
    </div>`;
  }

  const openModal = () => {
    document.getElementById(modalId)?.toggleAttribute('open');
  };

  return html`
    <style>
      ${aiLabelStoryStyles}
    </style>
    <cds-button @click="${openModal}">Open form</cds-button>
    <cds-modal id="${modalId}" size="md" prevent-close-on-click-outside>
      <cds-modal-header>
        <cds-modal-close-button></cds-modal-close-button>
        <cds-modal-heading>Create project</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body has-scrolling-content>
        <div style="padding: 1rem;">${content}</div>
      </cds-modal-body>
      <cds-modal-footer>
        <cds-modal-footer-button kind="secondary" data-modal-close>
          Cancel
        </cds-modal-footer-button>
        <cds-modal-footer-button kind="primary" data-modal-close>
          Create project
        </cds-modal-footer-button>
      </cds-modal-footer>
    </cds-modal>
  `;
};

/**
 * Writes the submitted entries into the story, so the form shows what the
 * browser actually sends.
 */
const serialize = (form) => {
  const output = form.querySelector('[data-output]');
  if (!output) {
    return;
  }
  const entries = [...new FormData(form)]
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  output.textContent = entries || '(no entries)';
};

const renderPreviewForm = (args) => {
  const {
    size = 'md',
    showInModal,
    aiLabel,
    revertActive,
    disabled,
    readOnly,
    invalid,
    invalidText,
    warn,
    warnText,
    onSubmit,
    onInvalid,
    onReset,
  } = args ?? {};

  const listBoxSize = size === 'xs' ? 'sm' : size;
  const decorator = () => (aiLabel ? renderAILabel(revertActive) : nothing);

  const handleSubmit = () => {
    const form = document.querySelector('#preview-form');
    if (!form) return;
    // No manual validation loop. `requestSubmit()` runs constraint validation
    // itself, because these controls are real form controls.
    form.requestSubmit();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    serialize(event.target);
    onSubmit?.(event);
  };

  const handleReset = (event) => {
    const form = event.target;
    requestAnimationFrame(() => serialize(form));
    onReset?.(event);
  };

  return wrapForm(
    html`
      <cds-form>
        <form
          id="preview-form"
          aria-label="new project setup"
          @submit="${handleFormSubmit}"
          @reset="${handleReset}"
          @invalid="${onInvalid}">
          <cds-stack gap="5">
            <cds-preview-search
              size="${ifDefined(size)}"
              id="search-members"
              name="search-members"
              label-text="Search members"
              placeholder="e.g. Jane Smith"
              ?disabled="${disabled}"></cds-preview-search>

            ${row(html`
              ${col(html`
                <cds-preview-text-input
                  id="project-name"
                  name="project-name"
                  label="Project name"
                  helper-text="Short, descriptive project name."
                  placeholder="e.g. Carbon Design System"
                  size="${ifDefined(size)}"
                  ?disabled="${disabled}"
                  ?readonly="${readOnly}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()}
                </cds-preview-text-input>
              `)}
              ${col(html`
                <cds-preview-text-input
                  id="project-id"
                  name="project-id"
                  label="Project ID"
                  helper-text="Lowercase letters, numbers, hyphens only."
                  placeholder="e.g. carbon-design-system"
                  size="${ifDefined(size)}"
                  ?disabled="${disabled}"
                  ?readonly="${readOnly}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()}
                </cds-preview-text-input>
              `)}
            `)}
            ${row(html`
              ${col(html`
                <cds-preview-dropdown
                  id="workspace"
                  name="workspace"
                  title-text="Workspace"
                  helper-text="Workspace this project belongs to."
                  label="Select workspace"
                  value="option-1"
                  size="${ifDefined(listBoxSize)}"
                  ?disabled="${disabled}"
                  ?read-only="${readOnly}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()} ${dropdownItems()}
                </cds-preview-dropdown>
              `)}
              ${col(html`
                <cds-preview-combo-box
                  id="project-lead"
                  name="project-lead"
                  title-text="Project lead"
                  helper-text="Start typing to find a team member."
                  placeholder="Search members..."
                  size="${ifDefined(listBoxSize)}"
                  ?disabled="${disabled}"
                  ?read-only="${readOnly}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()} ${comboBoxItems()}
                </cds-preview-combo-box>
              `)}
            `)}

            <cds-preview-multi-select
              id="team-members"
              name="team-members"
              title-text="Team members"
              label="Select members"
              helper-text="Everyone who will have access."
              selection-feedback="top-after-reopen"
              size="${ifDefined(listBoxSize)}"
              ?disabled="${disabled}"
              ?read-only="${readOnly}"
              ?invalid="${invalid}"
              invalid-text="${ifDefined(invalidText)}"
              ?warn="${warn}"
              warn-text="${ifDefined(warnText)}">
              ${decorator()} ${multiSelectItems()}
            </cds-preview-multi-select>

            ${row(html`
              ${col(html`
                <cds-preview-number-input
                  id="budget"
                  name="budget"
                  label="Budget"
                  helper-text="Total allocated budget."
                  min="0"
                  max="10000000"
                  value="5000"
                  step="500"
                  icon-description="Adjust budget"
                  size="${ifDefined(listBoxSize)}"
                  ?disabled="${disabled}"
                  ?readonly="${readOnly}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()}
                </cds-preview-number-input>
              `)}
              ${col(html`
                <cds-preview-select
                  id="currency"
                  name="currency"
                  label-text="Currency"
                  helper-text="Currency for the budget above."
                  value="usd"
                  size="${ifDefined(size)}"
                  ?disabled="${disabled}"
                  ?readonly="${readOnly}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()}
                  <cds-select-item value="usd">USD – US Dollar</cds-select-item>
                  <cds-select-item value="eur">EUR – Euro</cds-select-item>
                  <cds-select-item value="gbp"
                    >GBP – British Pound</cds-select-item
                  >
                  <cds-select-item value="jpy"
                    >JPY – Japanese Yen</cds-select-item
                  >
                </cds-preview-select>
              `)}
            `)}

            <cds-preview-radio-button-group
              name="project-visibility"
              value="private"
              legend-text="Visibility"
              helper-text="Who can see and access this project."
              ?disabled="${disabled}"
              ?readonly="${readOnly}">
              <cds-radio-button
                value="private"
                id="vis-private"
                label-text="Private – only invited members"></cds-radio-button>
              <cds-radio-button
                value="internal"
                id="vis-internal"
                label-text="Internal – everyone in the org"></cds-radio-button>
              <cds-radio-button
                value="public"
                id="vis-public"
                label-text="Public – anyone with the link"></cds-radio-button>
            </cds-preview-radio-button-group>

            <cds-preview-dropdown
              id="project-type"
              name="project-type"
              title-text="Project type"
              helper-text="Methodology used for this project."
              label="Select type"
              value="option-2"
              size="${ifDefined(listBoxSize)}"
              ?disabled="${disabled}"
              ?read-only="${readOnly}"
              ?invalid="${invalid}"
              invalid-text="${ifDefined(invalidText)}"
              ?warn="${warn}"
              warn-text="${ifDefined(warnText)}">
              ${decorator()} ${dropdownItems()}
            </cds-preview-dropdown>

            <cds-preview-multi-select
              id="tags"
              name="tags"
              filterable
              title-text="Tags"
              helper-text="Labels to categorise and filter this project."
              placeholder="Filter"
              selection-feedback="top-after-reopen"
              size="${ifDefined(listBoxSize)}"
              ?disabled="${disabled}"
              ?read-only="${readOnly}"
              ?invalid="${invalid}"
              invalid-text="${ifDefined(invalidText)}"
              ?warn="${warn}"
              warn-text="${ifDefined(warnText)}">
              ${decorator()} ${multiSelectItems()}
            </cds-preview-multi-select>

            <cds-form-group legend-text="Features">
              <cds-preview-checkbox
                id="feat-issues"
                name="feat-issues"
                default-checked
                ?disabled="${disabled}"
                >Issue tracking</cds-preview-checkbox
              >
              <cds-preview-checkbox
                id="feat-wiki"
                name="feat-wiki"
                default-checked
                ?disabled="${disabled}"
                >Wiki</cds-preview-checkbox
              >
              <cds-preview-checkbox
                id="feat-ci"
                name="feat-ci"
                ?disabled="${disabled}"
                >CI / CD pipeline</cds-preview-checkbox
              >
              <cds-preview-checkbox
                id="feat-releases"
                name="feat-releases"
                ?disabled="${disabled}"
                >Releases</cds-preview-checkbox
              >
            </cds-form-group>

            <cds-preview-textarea
              id="project-description"
              name="project-description"
              label="Description"
              helper-text="Goals and scope of this project."
              placeholder="What is this project about?"
              rows="4"
              ?disabled="${disabled}"
              ?readonly="${readOnly}"
              ?invalid="${invalid}"
              invalid-text="${ifDefined(invalidText)}"
              ?warn="${warn}"
              warn-text="${ifDefined(warnText)}">
              ${decorator()}
            </cds-preview-textarea>

            <cds-preview-text-input
              id="repo-url"
              name="repo-url"
              label="Repository URL"
              helper-text="Link to an existing Git repository."
              placeholder="https://github.com/org/repo"
              size="${ifDefined(size)}"
              ?disabled="${disabled}"
              ?readonly="${readOnly}"
              ?invalid="${invalid}"
              invalid-text="${ifDefined(invalidText)}"
              ?warn="${warn}"
              warn-text="${ifDefined(warnText)}">
              ${decorator()}
            </cds-preview-text-input>

            <cds-preview-password-input
              id="repo-password"
              name="repo-password"
              label="Password"
              helper-text="Must be at least 6 characters and include an uppercase letter, a lowercase letter, and a number."
              placeholder="Enter password"
              required
              pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$"
              size="${ifDefined(size)}"
              ?disabled="${disabled}"
              ?readonly="${readOnly}"
              ?invalid="${invalid}"
              invalid-text="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
              ?warn="${warn}"
              warn-text="${ifDefined(warnText)}">
            </cds-preview-password-input>

            <cds-button type="submit" @click="${handleSubmit}"
              >Create project</cds-button
            >
            <cds-button
              kind="secondary"
              type="reset"
              @click="${() => document.querySelector('#preview-form')?.reset()}"
              >Reset</cds-button
            >
          </cds-stack>
        </form>
      </cds-form>
    `,
    { showInModal, modalId: 'preview-form-modal' }
  );
};

export const Default = {
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
      action: 'invalid',
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

const meta = {
  title: 'Preview/Form participation',
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};

export default meta;
