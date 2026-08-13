/**
 * Copyright IBM Corp. 2025, 2026
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
import '../radio-button/index';
import '../checkbox/index';
import '../form-group/index';
import '../number-input/index';
import '../select/index';
import '../file-uploader/index';
import '../search/index';
import '../text-input/index';
import '../textarea/index';
import '../button/index';
import '../date-picker/index';
import '../dropdown/index';
import '../multi-select/index';
import '../combo-box/index';
import '../modal/index';
import '../fluid-form/index';
import '../fluid-text-input/index';
import '../fluid-textarea/index';
import '../fluid-number-input/index';
import '../fluid-select/index';
import '../fluid-search/index';
import '../fluid-dropdown/index';
import '../fluid-combo-box/index';
import '../fluid-multi-select/index';
import '../fluid-date-picker/index';

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

const dateRow = (children) => html`
  <div
    style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
    ${children}
  </div>
`;

const dateRangeCol = (children) => html`
  <div style="flex: 0 1 auto;">${children}</div>
`;

const dateSimpleCol = (children) => html`
  <div style="flex: 0 1 auto;">${children}</div>
`;

const sharedArgs = {
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

const sharedArgTypes = {
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
  },
  readOnly: {
    control: { type: 'boolean' },
  },
  invalid: {
    control: { type: 'boolean' },
  },
  invalidText: {
    control: { type: 'text' },
  },
  warn: {
    control: { type: 'boolean' },
  },
  warnText: {
    control: { type: 'text' },
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

const renderDefaultForm = (args) => {
  const {
    skeleton,
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
  } = args ?? {};

  const listBoxSize = size === 'xs' ? 'sm' : size;
  const decorator = () => (aiLabel ? renderAILabel(revertActive) : nothing);
  const dateHelper = (text) =>
    invalid || warn ? nothing : html`<span slot="helper-text">${text}</span>`;

  if (skeleton) {
    return wrapForm(
      html`
        <cds-form aria-label="new project setup">
          <cds-stack gap="5">
            <cds-search-skeleton></cds-search-skeleton>
            ${row(html`
              ${col(html`<cds-text-input-skeleton></cds-text-input-skeleton>`)}
              ${col(html`<cds-text-input-skeleton></cds-text-input-skeleton>`)}
            `)}
            ${row(html`
              ${col(html`<cds-dropdown-skeleton></cds-dropdown-skeleton>`)}
              ${col(html`<cds-dropdown-skeleton></cds-dropdown-skeleton>`)}
            `)}
            <cds-dropdown-skeleton></cds-dropdown-skeleton>
            ${dateRow(html`
              ${dateRangeCol(
                html`<cds-date-picker-input-skeleton
                  range></cds-date-picker-input-skeleton>`
              )}
              ${dateSimpleCol(
                html`<cds-date-picker-input-skeleton></cds-date-picker-input-skeleton>`
              )}
            `)}
            ${row(html`
              ${col(
                html`<cds-number-input-skeleton></cds-number-input-skeleton>`
              )}
              ${col(html`<cds-select-skeleton></cds-select-skeleton>`)}
            `)}
            <cds-dropdown-skeleton></cds-dropdown-skeleton>
            <cds-dropdown-skeleton></cds-dropdown-skeleton>
            <cds-textarea-skeleton></cds-textarea-skeleton>
            <cds-text-input-skeleton></cds-text-input-skeleton>
          </cds-stack>
        </cds-form>
      `,
      { showInModal, modalId: 'form-default-modal' }
    );
  }

  return wrapForm(
    html`
      <cds-form aria-label="new project setup">
        <cds-stack gap="5">
          <cds-search
            size="${ifDefined(size)}"
            id="search-members"
            label-text="Search members"
            placeholder="e.g. Jane Smith"
            ?disabled="${disabled}"></cds-search>

          ${row(html`
            ${col(html`
              <cds-text-input
                id="project-name"
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
              </cds-text-input>
            `)}
            ${col(html`
              <cds-text-input
                id="project-id"
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
              </cds-text-input>
            `)}
          `)}
          ${row(html`
            ${col(html`
              <cds-dropdown
                id="workspace"
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
              </cds-dropdown>
            `)}
            ${col(html`
              <cds-combo-box
                id="project-lead"
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
              </cds-combo-box>
            `)}
          `)}

          <cds-multi-select
            id="team-members"
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
          </cds-multi-select>

          ${dateRow(html`
            ${dateRangeCol(html`
              <cds-date-picker ?disabled="${disabled}" ?readonly="${readOnly}">
                <cds-date-picker-input
                  kind="from"
                  id="start-date"
                  placeholder="mm/dd/yyyy"
                  label-text="Start date"
                  size="${ifDefined(size)}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()} ${dateHelper('Active work begins.')}
                </cds-date-picker-input>
                <cds-date-picker-input
                  kind="to"
                  id="end-date"
                  placeholder="mm/dd/yyyy"
                  label-text="End date"
                  size="${ifDefined(size)}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()} ${dateHelper('Active work ends.')}
                </cds-date-picker-input>
              </cds-date-picker>
            `)}
            ${dateSimpleCol(html`
              <cds-date-picker ?disabled="${disabled}" ?readonly="${readOnly}">
                <cds-date-picker-input
                  kind="simple"
                  id="deadline"
                  placeholder="mm/dd/yyyy"
                  label-text="Deadline"
                  size="${ifDefined(size)}"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()} ${dateHelper('Final delivery date.')}
                </cds-date-picker-input>
              </cds-date-picker>
            `)}
          `)}
          ${row(html`
            ${col(html`
              <cds-number-input
                id="budget"
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
              </cds-number-input>
            `)}
            ${col(html`
              <cds-select
                id="currency"
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
              </cds-select>
            `)}
          `)}

          <cds-radio-button-group
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
          </cds-radio-button-group>

          <cds-dropdown
            id="project-type"
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
          </cds-dropdown>

          <cds-multi-select
            id="tags"
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
          </cds-multi-select>

          <cds-form-group legend-text="Features">
            <cds-checkbox
              id="feat-issues"
              default-checked
              ?disabled="${disabled}"
              >Issue tracking</cds-checkbox
            >
            <cds-checkbox id="feat-wiki" default-checked ?disabled="${disabled}"
              >Wiki</cds-checkbox
            >
            <cds-checkbox id="feat-ci" ?disabled="${disabled}"
              >CI / CD pipeline</cds-checkbox
            >
            <cds-checkbox id="feat-releases" ?disabled="${disabled}"
              >Releases</cds-checkbox
            >
          </cds-form-group>

          <cds-textarea
            id="project-description"
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
          </cds-textarea>

          <cds-text-input
            id="repo-url"
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
          </cds-text-input>

          <cds-form-group legend-text="Project assets">
            <cds-file-uploader
              id="file-assets"
              label-description="Max 25 MB per file."
              icon-description="Remove file"
              ?disabled="${disabled}">
              <cds-file-uploader-button
                accept=".pdf,.png,.jpg,.fig,.sketch"
                button-kind="primary"
                size="md"
                multiple>
                Add files
              </cds-file-uploader-button>
            </cds-file-uploader>
          </cds-form-group>

          <cds-button type="submit">Create project</cds-button>
        </cds-stack>
      </cds-form>
    `,
    { showInModal, modalId: 'form-default-modal' }
  );
};

const renderFluidForm = (args) => {
  const {
    skeleton,
    showInModal,
    aiLabel,
    revertActive,
    disabled,
    readOnly,
    invalid,
    invalidText,
    warn,
    warnText,
  } = args ?? {};

  const decorator = () => (aiLabel ? renderAILabel(revertActive) : nothing);

  if (skeleton) {
    return wrapForm(
      html`
        <cds-fluid-form aria-label="new project setup">
          <cds-stack gap="5">
            <cds-fluid-search-skeleton></cds-fluid-search-skeleton>
            ${row(html`
              ${col(
                html`<cds-fluid-text-input-skeleton></cds-fluid-text-input-skeleton>`
              )}
              ${col(
                html`<cds-fluid-text-input-skeleton></cds-fluid-text-input-skeleton>`
              )}
            `)}
            ${row(html`
              ${col(
                html`<cds-fluid-dropdown-skeleton></cds-fluid-dropdown-skeleton>`
              )}
              ${col(
                html`<cds-fluid-combo-box-skeleton></cds-fluid-combo-box-skeleton>`
              )}
            `)}
            <cds-fluid-multi-select-skeleton></cds-fluid-multi-select-skeleton>
            ${dateRow(html`
              ${dateRangeCol(
                html`<cds-fluid-date-picker-skeleton
                  date-picker-type="range"></cds-fluid-date-picker-skeleton>`
              )}
              ${dateSimpleCol(
                html`<cds-fluid-date-picker-skeleton
                  date-picker-type="simple"></cds-fluid-date-picker-skeleton>`
              )}
            `)}
            ${row(html`
              ${col(
                html`<cds-fluid-number-input-skeleton></cds-fluid-number-input-skeleton>`
              )}
              ${col(
                html`<cds-fluid-select-skeleton></cds-fluid-select-skeleton>`
              )}
            `)}
            <cds-fluid-dropdown-skeleton></cds-fluid-dropdown-skeleton>
            <cds-fluid-multi-select-skeleton></cds-fluid-multi-select-skeleton>
            <cds-fluid-textarea-skeleton></cds-fluid-textarea-skeleton>
            <cds-fluid-text-input-skeleton></cds-fluid-text-input-skeleton>
          </cds-stack>
        </cds-fluid-form>
      `,
      { showInModal, modalId: 'form-fluid-modal' }
    );
  }

  return wrapForm(
    html`
      <cds-fluid-form aria-label="new project setup">
        <cds-stack gap="5">
          <cds-fluid-search
            id="f-search-members"
            label-text="Search members"
            placeholder="e.g. Jane Smith"
            ?disabled="${disabled}"></cds-fluid-search>

          ${row(html`
            ${col(html`
              <cds-fluid-text-input
                id="f-project-name"
                label="Project name"
                placeholder="e.g. Carbon Design System"
                ?disabled="${disabled}"
                ?readonly="${readOnly}"
                ?invalid="${invalid}"
                invalid-text="${ifDefined(invalidText)}"
                ?warn="${warn}"
                warn-text="${ifDefined(warnText)}">
                ${decorator()}
              </cds-fluid-text-input>
            `)}
            ${col(html`
              <cds-fluid-text-input
                id="f-project-id"
                label="Project ID"
                placeholder="e.g. carbon-design-system"
                ?disabled="${disabled}"
                ?readonly="${readOnly}"
                ?invalid="${invalid}"
                invalid-text="${ifDefined(invalidText)}"
                ?warn="${warn}"
                warn-text="${ifDefined(warnText)}">
                ${decorator()}
              </cds-fluid-text-input>
            `)}
          `)}
          ${row(html`
            ${col(html`
              <cds-fluid-dropdown
                id="f-workspace"
                title-text="Workspace"
                label="Select workspace"
                value="option-1"
                ?disabled="${disabled}"
                ?read-only="${readOnly}"
                ?invalid="${invalid}"
                invalid-text="${ifDefined(invalidText)}"
                ?warn="${warn}"
                warn-text="${ifDefined(warnText)}">
                ${decorator()} ${dropdownItems()}
              </cds-fluid-dropdown>
            `)}
            ${col(html`
              <cds-fluid-combo-box
                id="f-project-lead"
                title-text="Project lead"
                placeholder="Search members..."
                ?disabled="${disabled}"
                ?read-only="${readOnly}"
                ?invalid="${invalid}"
                invalid-text="${ifDefined(invalidText)}"
                ?warn="${warn}"
                warn-text="${ifDefined(warnText)}">
                ${decorator()} ${comboBoxItems()}
              </cds-fluid-combo-box>
            `)}
          `)}

          <cds-fluid-multi-select
            id="f-team-members"
            title-text="Team members"
            label="Select members"
            selection-feedback="top-after-reopen"
            ?disabled="${disabled}"
            ?read-only="${readOnly}"
            ?invalid="${invalid}"
            invalid-text="${ifDefined(invalidText)}"
            ?warn="${warn}"
            warn-text="${ifDefined(warnText)}">
            ${decorator()} ${multiSelectItems()}
          </cds-fluid-multi-select>

          ${dateRow(html`
            ${dateRangeCol(html`
              <cds-fluid-date-picker
                ?disabled="${disabled}"
                ?readonly="${readOnly}">
                <cds-fluid-date-picker-input
                  kind="from"
                  id="f-start-date"
                  placeholder="mm/dd/yyyy"
                  label-text="Start date"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()}
                </cds-fluid-date-picker-input>
                <cds-fluid-date-picker-input
                  kind="to"
                  id="f-end-date"
                  placeholder="mm/dd/yyyy"
                  label-text="End date"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()}
                </cds-fluid-date-picker-input>
              </cds-fluid-date-picker>
            `)}
            ${dateSimpleCol(html`
              <cds-fluid-date-picker
                ?disabled="${disabled}"
                ?readonly="${readOnly}">
                <cds-fluid-date-picker-input
                  kind="simple"
                  id="f-deadline"
                  placeholder="mm/dd/yyyy"
                  label-text="Deadline"
                  ?invalid="${invalid}"
                  invalid-text="${ifDefined(invalidText)}"
                  ?warn="${warn}"
                  warn-text="${ifDefined(warnText)}">
                  ${decorator()}
                </cds-fluid-date-picker-input>
              </cds-fluid-date-picker>
            `)}
          `)}
          ${row(html`
            ${col(html`
              <cds-fluid-number-input
                id="f-budget"
                label="Budget"
                min="0"
                max="10000000"
                value="5000"
                step="500"
                icon-description="Adjust budget"
                ?disabled="${disabled}"
                ?readonly="${readOnly}"
                ?invalid="${invalid}"
                invalid-text="${ifDefined(invalidText)}"
                ?warn="${warn}"
                warn-text="${ifDefined(warnText)}">
                ${decorator()}
              </cds-fluid-number-input>
            `)}
            ${col(html`
              <cds-fluid-select
                id="f-currency"
                label-text="Currency"
                value="usd"
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
              </cds-fluid-select>
            `)}
          `)}

          <cds-radio-button-group
            name="f-project-visibility"
            value="private"
            legend-text="Visibility"
            helper-text="Who can see and access this project."
            ?disabled="${disabled}"
            ?readonly="${readOnly}">
            <cds-radio-button
              value="private"
              id="f-vis-private"
              label-text="Private – only invited members"></cds-radio-button>
            <cds-radio-button
              value="internal"
              id="f-vis-internal"
              label-text="Internal – everyone in the org"></cds-radio-button>
            <cds-radio-button
              value="public"
              id="f-vis-public"
              label-text="Public – anyone with the link"></cds-radio-button>
          </cds-radio-button-group>

          <cds-fluid-dropdown
            id="f-project-type"
            title-text="Project type"
            label="Select type"
            value="option-2"
            ?disabled="${disabled}"
            ?read-only="${readOnly}"
            ?invalid="${invalid}"
            invalid-text="${ifDefined(invalidText)}"
            ?warn="${warn}"
            warn-text="${ifDefined(warnText)}">
            ${decorator()} ${dropdownItems()}
          </cds-fluid-dropdown>

          <cds-fluid-multi-select
            id="f-tags"
            filterable
            title-text="Tags"
            placeholder="Filter"
            selection-feedback="top-after-reopen"
            ?disabled="${disabled}"
            ?read-only="${readOnly}"
            ?invalid="${invalid}"
            invalid-text="${ifDefined(invalidText)}"
            ?warn="${warn}"
            warn-text="${ifDefined(warnText)}">
            ${decorator()} ${multiSelectItems()}
          </cds-fluid-multi-select>

          <cds-form-group legend-text="Features">
            <cds-checkbox
              id="f-feat-issues"
              default-checked
              ?disabled="${disabled}"
              >Issue tracking</cds-checkbox
            >
            <cds-checkbox
              id="f-feat-wiki"
              default-checked
              ?disabled="${disabled}"
              >Wiki</cds-checkbox
            >
            <cds-checkbox id="f-feat-ci" ?disabled="${disabled}"
              >CI / CD pipeline</cds-checkbox
            >
            <cds-checkbox id="f-feat-releases" ?disabled="${disabled}"
              >Releases</cds-checkbox
            >
          </cds-form-group>

          <cds-fluid-textarea
            id="f-project-description"
            label="Description"
            placeholder="What is this project about?"
            rows="4"
            ?disabled="${disabled}"
            ?readonly="${readOnly}"
            ?invalid="${invalid}"
            invalid-text="${ifDefined(invalidText)}"
            ?warn="${warn}"
            warn-text="${ifDefined(warnText)}">
            ${decorator()}
          </cds-fluid-textarea>

          <cds-fluid-text-input
            id="f-repo-url"
            label="Repository URL"
            placeholder="https://github.com/org/repo"
            ?disabled="${disabled}"
            ?readonly="${readOnly}"
            ?invalid="${invalid}"
            invalid-text="${ifDefined(invalidText)}"
            ?warn="${warn}"
            warn-text="${ifDefined(warnText)}">
            ${decorator()}
          </cds-fluid-text-input>

          <cds-form-group legend-text="Project assets">
            <cds-file-uploader
              id="f-file-assets"
              label-description="Max 25 MB per file."
              icon-description="Remove file"
              ?disabled="${disabled}">
              <cds-file-uploader-button
                accept=".pdf,.png,.jpg,.fig,.sketch"
                button-kind="primary"
                size="md"
                multiple>
                Add files
              </cds-file-uploader-button>
            </cds-file-uploader>
          </cds-form-group>

          <cds-button type="submit">Create project</cds-button>
        </cds-stack>
      </cds-fluid-form>
    `,
    { showInModal, modalId: 'form-fluid-modal' }
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
  },
  render: renderDefaultForm,
};

export const Fluid = {
  args: {
    ...sharedArgs,
  },
  argTypes: {
    ...sharedArgTypes,
    size: {
      table: { disable: true },
    },
  },
  render: renderFluidForm,
};

export const withAILabel = {
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
  render: (args) => html`
    <div
      style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); gap: 2rem; align-items: start;">
      <div style="min-width: 0; max-width: 100%;">
        <p style="margin-block-end: 1rem; font-weight: 600;">Default</p>
        ${renderDefaultForm(args)}
      </div>
      <div style="min-width: 0; max-width: 100%;">
        <p style="margin-block-end: 1rem; font-weight: 600;">Fluid</p>
        ${renderFluidForm(args)}
      </div>
    </div>
  `,
};

const meta = {
  title: 'Components/Form',
};

export default meta;
