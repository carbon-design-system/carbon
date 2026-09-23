/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, nothing } from 'lit';
import { action } from 'storybook/actions';
import { useState } from 'storybook/preview-api';
import '../toggle/index';
import './index';
import '../user-avatar/index';
import styles from './story-styles.scss?lit';
import type { AddSelectItem } from '@carbon/utilities';
import { iconLoader } from '../../globals/internal/icon-loader';
import ArrowsVertical16 from '@carbon/icons/es/arrows--vertical/16';
import Filter16 from '@carbon/icons/es/filter/16';
import Launch16 from '@carbon/icons/es/launch/16';
import Draggable16 from '@carbon/icons/es/draggable/16';

const storyClass = 'add-select-next-stories';

const sampleItems: AddSelectItem[] = [
  {
    id: '1',
    value: '1',
    title: 'Item 1',
    subtitle: 'Item 1 subtitle',
    itemDetails: [
      { label: 'Description', value: 'First item in the list' },
      { label: 'Category', value: 'Type A' },
      { label: 'Owner', value: 'Team Alpha' },
    ],
  },
  {
    id: '2',
    value: '2',
    title: 'Item 2',
    subtitle: 'Item 2 subtitle',
    itemDetails: [
      { label: 'Description', value: 'Second item in the list' },
      { label: 'Category', value: 'Type B' },
      { label: 'Owner', value: 'Team Beta' },
    ],
  },
  {
    id: '3',
    value: '3',
    title: 'Item 3',
    subtitle: 'Item 3 subtitle',
    itemDetails: [
      { label: 'Description', value: 'Third item in the list' },
      { label: 'Category', value: 'Type A' },
      { label: 'Owner', value: 'Team Alpha' },
    ],
  },
  {
    id: '4',
    value: '4',
    title: 'Item 4',
    subtitle: 'Item 4 subtitle',
    itemDetails: [
      { label: 'Description', value: 'Fourth item in the list' },
      { label: 'Category', value: 'Type C' },
      { label: 'Owner', value: 'Team Gamma' },
    ],
  },
  {
    id: '5',
    value: '5',
    title: 'Item 5',
    subtitle: 'Item 5 subtitle',
    itemDetails: [
      { label: 'Description', value: 'Fifth item in the list' },
      { label: 'Category', value: 'Type B' },
      { label: 'Owner', value: 'Team Beta' },
    ],
  },
];

const summaryItems: AddSelectItem[] = sampleItems.slice(1, 4);

// ─── AddSelectBody ────────────────────────────────────────────────────────────

const AddSelectBodyTemplate = (args) => {
  const {
    itemsLabel,
    globalSearchLabel,
    globalSearchPlaceholder,
    searchResultsTitle,
    itemCount,
    hideSearch,
    showActionsSlot,
    showSubHeaderActions,
    showPath,
    path,
  } = args;

  return html`
    <style>
      ${styles}
    </style>
    <div class="${storyClass}__body-story">
      <cds-add-select>
        <div class="${storyClass}__placeholder-shell">
          <cds-add-select-body
            items-label=${itemsLabel}
            global-search-label=${globalSearchLabel}
            global-search-placeholder=${globalSearchPlaceholder}
            search-results-title=${searchResultsTitle}
            .itemCount=${itemCount}
            .path=${showPath ? path : []}
            ?hide-search=${hideSearch}
            @cds-add-select-body-search=${action('cds-add-select-body-search')}
            @cds-add-select-body-breadcrumb-click=${action(
              'cds-add-select-body-breadcrumb-click'
            )}>
            ${showActionsSlot
              ? html`
                  <cds-icon-button
                    slot="actions"
                    tooltip-text="Sort"
                    autoalign
                    kind="ghost"
                    size="lg">
                    ${iconLoader(ArrowsVertical16, { slot: 'icon' })}
                  </cds-icon-button>
                  <cds-icon-button
                    slot="actions"
                    tooltip-text="Filter"
                    autoalign
                    kind="ghost"
                    size="lg">
                    ${iconLoader(Filter16, { slot: 'icon' })}
                  </cds-icon-button>
                `
              : nothing}
            ${showSubHeaderActions
              ? html`
                  <cds-toggle
                    slot="sub-header-actions"
                    id="body-subheader-toggle"
                    label-a="Placeholder action"
                    label-b="Placeholder action"
                    size="sm"
                    hide-label></cds-toggle>
                `
              : nothing}
            <div class="${storyClass}__placeholder-rows">
              ${sampleItems.slice(0, 3).map(
                () => html`
                  <div class="${storyClass}__placeholder-row">
                    <p>AddSelect.Row</p>
                  </div>
                `
              )}
            </div>
          </cds-add-select-body>
        </div>
      </cds-add-select>
    </div>
  `;
};

export const AddSelectBody = {
  name: 'add-select-body',
  render: AddSelectBodyTemplate,
  args: {
    itemsLabel: 'All items',
    globalSearchLabel: 'Search items',
    globalSearchPlaceholder: 'Search by name',
    searchResultsTitle: 'Search results',
    itemCount: 3,
    hideSearch: false,
    showActionsSlot: true,
    showSubHeaderActions: false,
    showPath: false,
    path: [
      { id: 'root', title: 'Category' },
      { id: 'folders', title: 'Folders' },
      { id: 'files', title: 'Files' },
    ],
  },
  argTypes: {
    itemsLabel: {
      control: 'text',
      description: 'Label shown when breadcrumbs are not used',
    },
    globalSearchLabel: {
      control: 'text',
      description: 'Accessible label for the global search input',
    },
    globalSearchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the global search input',
    },
    searchResultsTitle: {
      control: 'text',
      description: 'Title shown when search returns filtered results',
    },
    itemCount: {
      control: { type: 'number', min: 0 },
      description: 'Item count for display in tag badge',
    },
    hideSearch: {
      control: 'boolean',
      description: 'Whether to hide the search input',
    },
    showActionsSlot: {
      control: 'boolean',
      description: 'Toggle example content for the actions slot',
      table: { category: 'Story controls' },
    },
    showSubHeaderActions: {
      control: 'boolean',
      description: 'Toggle example content for the sub-header-actions slot',
      table: { category: 'Story controls' },
    },
    showPath: {
      control: 'boolean',
      description: 'Toggle breadcrumb path usage',
      table: { category: 'Story controls' },
    },
    path: {
      control: 'object',
      description:
        'Breadcrumb entries used for hierarchical navigation. Array of objects with id and title properties.',
    },
  },
};

// ─── AddSelectColumn ──────────────────────────────────────────────────────────

const AddSelectColumnTemplate = (args) => {
  const {
    title,
    searchLabel,
    searchPlaceholder,
    showSearch,
    showActionsSlot,
    multi,
    showSelectAll,
    enableNavigation,
  } = args;

  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set(['1', '4'])
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = sampleItems.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allSelected =
    filteredItems.length > 0 &&
    filteredItems.every((item) => selectedItems.has(item.id));

  const allIndeterminate =
    selectedItems.size > 0 &&
    selectedItems.size < filteredItems.length &&
    !allSelected;

  const handleItemSelect = (e: CustomEvent) => {
    action('cds-add-select-row-select')(e);
    const { itemId, selected } = e.detail;
    const next = multi ? new Set(selectedItems) : new Set<string>();
    if (selected) {
      next.add(itemId);
    } else {
      next.delete(itemId);
    }
    setSelectedItems(next);
  };

  const handleSearch = (e: CustomEvent) => {
    action('cds-add-select-column-search')(e);
    setSearchTerm(e.detail.searchTerm);
  };

  const handleSelectAll = (e: CustomEvent) => {
    action('cds-add-select-column-select-all')(e);
    const { checked } = e.detail;
    setSelectedItems(
      checked ? new Set(filteredItems.map((item) => item.id)) : new Set()
    );
  };

  return html`
    <style>
      ${styles}
    </style>
    <div class="${storyClass}-column-container">
      <cds-add-select ?multi=${multi}>
        <cds-add-select-body ?hide-search=${true}>
          <cds-add-select-column
            title=${title}
            search-label=${searchLabel}
            search-placeholder=${searchPlaceholder}
            ?hide-search=${!showSearch}
            ?multi=${multi}
            ?show-select-all=${showSelectAll}
            .itemCount=${filteredItems.length}
            ?all-selected=${allSelected}
            ?all-indeterminate=${allIndeterminate}
            @cds-add-select-column-search=${handleSearch}
            @cds-add-select-column-select-all=${handleSelectAll}>
            ${showActionsSlot
              ? html`
                  <cds-icon-button
                    slot="actions"
                    tooltip-text="Sort"
                    autoalign
                    kind="ghost"
                    size="sm">
                    ${iconLoader(ArrowsVertical16, { slot: 'icon' })}
                  </cds-icon-button>
                  <cds-icon-button
                    slot="actions"
                    tooltip-text="Filter"
                    autoalign
                    kind="ghost"
                    size="sm">
                    ${iconLoader(Filter16, { slot: 'icon' })}
                  </cds-icon-button>
                `
              : nothing}
            ${filteredItems.map(
              (item) => html`
                <cds-add-select-row
                  item-id=${item.id}
                  title=${item.title}
                  value=${item.value}
                  ?selected=${selectedItems.has(item.id)}
                  ?has-children=${enableNavigation && item.id === '1'}
                  @cds-add-select-row-select=${handleItemSelect}
                  @cds-add-select-row-navigate=${action(
                    'cds-add-select-row-navigate'
                  )}></cds-add-select-row>
              `
            )}
          </cds-add-select-column>
        </cds-add-select-body>
      </cds-add-select>
    </div>
  `;
};

export const AddSelectColumn = {
  name: 'add-select-column',
  render: AddSelectColumnTemplate,
  args: {
    title: 'Available items',
    searchLabel: 'Search within column',
    searchPlaceholder: 'Search items',
    showSearch: true,
    showActionsSlot: true,
    multi: true,
    showSelectAll: false,
    enableNavigation: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Header title for the column',
    },
    searchLabel: {
      control: 'text',
      description: 'Accessible label for the column search input',
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the column search input',
    },
    showSearch: {
      control: 'boolean',
      description: 'Toggle the hideSearch behavior',
      table: { category: 'Story controls' },
    },
    showActionsSlot: {
      control: 'boolean',
      description: 'Toggle example content for the actions slot',
      table: { category: 'Story controls' },
    },
    multi: {
      control: 'boolean',
      description: 'Switch between checkbox and radio row selection',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Show the Select all checkbox when multi is enabled',
    },
    enableNavigation: {
      control: 'boolean',
      description: 'Show how the column can pass navigation callbacks to rows',
      table: { category: 'Story controls' },
    },
    hideSearch: { table: { disable: true } },
    itemCount: { table: { disable: true } },
    allSelected: { table: { disable: true } },
    allIndeterminate: { table: { disable: true } },
    onSelectAll: { table: { disable: true } },
    onNavigate: { table: { disable: true } },
    className: { table: { disable: true } },
    searchProps: { table: { disable: true } },
    tagProps: { table: { disable: true } },
    selectAllCheckboxProps: { table: { disable: true } },
  },
};

// ─── AddSelectRow ─────────────────────────────────────────────────────────────

const AddSelectRowTemplate = (args) => {
  const {
    multi,
    selected,
    indeterminate,
    showSubtitle,
    showTag,
    showIcon,
    useRowContent,
    hasChildren,
    hasItemPanel,
    itemPanelOpen,
    disabled,
    skeleton,
  } = args;

  return html`
    <style>
      ${styles}
    </style>
    <div class="${storyClass}-container--single">
      <cds-add-select ?multi=${multi}>
        <cds-add-select-body ?hide-search=${true}>
          <cds-add-select-row
            item-id="1"
            title="Item title"
            subtitle=${showSubtitle ? 'Item subtitle' : ''}
            value="folder 1"
            ?selected=${selected}
            ?indeterminate=${indeterminate}
            ?disabled=${disabled}
            ?has-children=${hasChildren}
            ?has-item-panel=${hasItemPanel}
            ?item-panel-open=${hasItemPanel && itemPanelOpen}
            ?skeleton=${skeleton}
            @cds-add-select-row-select=${action('cds-add-select-row-select')}
            @cds-add-select-row-navigate=${action(
              'cds-add-select-row-navigate'
            )}
            @cds-add-select-row-item-panel-click=${action(
              'cds-add-select-row-item-panel-click'
            )}>
            ${showIcon
              ? html`
                  <cds-user-avatar
                    slot="icon"
                    size="md"
                    name="thomas j. watson"
                    tooltip-text="user profile image"
                    tooltip-alignment="right"></cds-user-avatar>
                `
              : nothing}
            ${useRowContent
              ? html`
                  <div slot="row-content" class="${storyClass}__row-content">
                    <strong>Custom row content</strong>
                    <cds-tag type="purple" size="sm">Custom</cds-tag>
                  </div>
                `
              : showTag
                ? html`<cds-tag type="blue" size="sm">Folder</cds-tag>`
                : nothing}
          </cds-add-select-row>
        </cds-add-select-body>
      </cds-add-select>
    </div>
  `;
};

export const AddSelectRow = {
  name: 'add-select-row',
  render: AddSelectRowTemplate,
  args: {
    multi: false,
    selected: false,
    indeterminate: false,
    showSubtitle: true,
    showTag: false,
    showIcon: false,
    useRowContent: false,
    hasChildren: true,
    hasItemPanel: false,
    itemPanelOpen: false,
    disabled: false,
    skeleton: false,
  },
  argTypes: {
    multi: {
      control: 'boolean',
      description:
        'Toggle row rendering between checkbox and radio button mode',
      table: { category: 'Story controls' },
    },
    selected: {
      control: 'boolean',
      description: 'Set the row selection state',
      table: { category: 'Story controls' },
    },
    indeterminate: {
      control: 'boolean',
      description:
        'Whether the item is in an indeterminate state (for multi hierarchical selections)',
    },
    showSubtitle: {
      control: 'boolean',
      description: 'Demonstrate the optional subtitle attribute',
      table: { category: 'Story controls' },
    },
    showTag: {
      control: 'boolean',
      description: 'Render custom row children content (default slot)',
      table: { category: 'Story controls' },
    },
    showIcon: {
      control: 'boolean',
      description: 'Demonstrate the optional icon slot',
      table: { category: 'Story controls' },
    },
    useRowContent: {
      control: 'boolean',
      description:
        'Demonstrate custom row-content slot (replaces title/subtitle/children)',
      table: { category: 'Story controls' },
    },
    hasChildren: {
      control: 'boolean',
      description: 'Show the navigation indicator for hierarchical lists',
    },
    hasItemPanel: {
      control: 'boolean',
      description: 'Show the item details icon button',
    },
    itemPanelOpen: {
      control: 'boolean',
      description: 'Whether the item panel is currently open for this item',
      table: { category: 'Story controls' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the example row',
    },
    skeleton: {
      control: 'boolean',
      description:
        'Render the row as a skeleton (loading state) with placeholder content',
    },
    itemId: { table: { disable: true } },
    title: { table: { disable: true } },
    subtitle: { table: { disable: true } },
    value: { table: { disable: true } },
    parentId: { table: { disable: true } },
  },
};

// ─── AddSelectSelectionSummary ────────────────────────────────────────────────

const AddSelectSelectionSummaryTemplate = (args) => {
  const {
    title,
    showEditIcon,
    showHeaderActions,
    showEmptyState,
    editIconDescription,
    useCustomHeader,
    useCustomChildren,
  } = args;

  const selectedItemsArray = showEmptyState ? [] : summaryItems;

  return html`
    <style>
      ${styles}
    </style>
    <div class="${storyClass}-summary-container">
      <cds-add-select-selection-summary
        title=${title}
        .selectedItemCount=${selectedItemsArray.length}
        ?show-edit-icon=${showEditIcon}
        edit-icon-description=${editIconDescription}
        @cds-add-select-selection-summary-edit=${action(
          'cds-add-select-selection-summary-edit'
        )}>
        ${useCustomHeader
          ? html`
              <div slot="header" class="${storyClass}__summary-header-content">
                <h3>Custom Header</h3>
                <cds-icon-button
                  tooltip-text="Popup"
                  autoalign
                  kind="ghost"
                  size="sm">
                  ${iconLoader(Launch16, { slot: 'icon' })}
                </cds-icon-button>
              </div>
            `
          : nothing}
        ${showHeaderActions
          ? html`
              <cds-icon-button
                slot="header-actions"
                tooltip-text="Filter"
                autoalign
                kind="ghost"
                size="sm">
                ${iconLoader(Filter16, { slot: 'icon' })}
              </cds-icon-button>
              <cds-icon-button
                slot="header-actions"
                tooltip-text="Popup"
                autoalign
                kind="ghost"
                size="sm">
                ${iconLoader(Launch16, { slot: 'icon' })}
              </cds-icon-button>
            `
          : nothing}
        ${showEmptyState
          ? html`
              <div slot="empty-state" class="${storyClass}__empty-state">
                <p>No selected items.<br />Select items to see them here.</p>
              </div>
            `
          : nothing}
        ${selectedItemsArray.slice(0, 3).map((item) =>
          useCustomChildren
            ? html`
                <div
                  class="${storyClass}__summary-item-row"
                  style="border-block-end: 1px solid var(--cds-border-subtle-01)">
                  <div class="${storyClass}__summary-item-row-text">
                    <p class="${storyClass}__summary-item-row-text__title">
                      ${item.title}
                    </p>
                    ${item.subtitle
                      ? html`<p
                          class="${storyClass}__summary-item-row-text__subtitle">
                          ${item.subtitle}
                        </p>`
                      : nothing}
                  </div>
                  <span class="${storyClass}__summary-item-row-modifier"
                    >Modifier</span
                  >
                </div>
              `
            : html`
                <cds-add-select-selection-summary-item
                  .item=${item}
                  use-accordion
                  remove-button-label="Remove item"
                  @cds-add-select-selection-summary-item-remove=${action(
                    'cds-add-select-selection-summary-item-remove'
                  )}></cds-add-select-selection-summary-item>
              `
        )}
      </cds-add-select-selection-summary>
    </div>
  `;
};

export const AddSelectSelectionSummary = {
  name: 'add-select-selection-summary',
  render: AddSelectSelectionSummaryTemplate,
  args: {
    title: 'Selected items',
    showEditIcon: true,
    showHeaderActions: false,
    showEmptyState: false,
    editIconDescription: 'Edit selections',
    useCustomHeader: false,
    useCustomChildren: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Heading displayed above the selection summary list',
    },
    showEditIcon: {
      control: 'boolean',
      description: 'Show the edit icon button',
    },
    editIconDescription: {
      control: 'text',
      description: 'Edit icon aria-label',
    },
    selectedItemCount: {
      control: false,
      description:
        'Number of selected items — drives the count badge and empty-state visibility',
    },
    useCustomChildren: {
      control: 'boolean',
      description:
        'Toggle example custom children instead of SelectionSummaryItem components',
      table: { category: 'Story controls' },
    },
    useCustomHeader: {
      control: 'boolean',
      description: 'Toggle example custom header content (header slot)',
      table: { category: 'Story controls' },
    },
    showHeaderActions: {
      control: 'boolean',
      description: 'Toggle example content for the header-actions slot',
      table: { category: 'Story controls' },
    },
    showEmptyState: {
      control: 'boolean',
      description: 'Show the empty-state slot usage',
      table: { category: 'Story controls' },
    },
  },
};

// ─── AddSelectSelectionSummaryItem ────────────────────────────────────────────

const AddSelectSelectionSummaryItemTemplate = (args) => {
  const {
    useAccordion,
    showRemoveButton,
    removeButtonLabel,
    useCustomTitle,
    useCustomContent,
    useCustomRenderer,
    useChildren,
  } = args;

  const item = summaryItems[0];

  return html`
    <style>
      ${styles}
    </style>
    <div class="${storyClass}__summary-item-wrapper">
      <cds-add-select-selection-summary-item
        .item=${item}
        ?use-accordion=${useAccordion}
        ?hide-remove-button=${!showRemoveButton}
        remove-button-label=${removeButtonLabel}
        @cds-add-select-selection-summary-item-remove=${action(
          'cds-add-select-selection-summary-item-remove'
        )}>
        ${useChildren
          ? html`
              <div class="${storyClass}__summary-item-row">
                <div class="${storyClass}__summary-item-row-text">
                  <p class="${storyClass}__summary-item-row-text__title">
                    ${item.title}
                  </p>
                  ${item.subtitle
                    ? html`<p
                        class="${storyClass}__summary-item-row-text__subtitle">
                        ${item.subtitle}
                      </p>`
                    : nothing}
                </div>
                <span class="${storyClass}__summary-item-row-modifier"
                  >Modifier</span
                >
              </div>
            `
          : nothing}
        ${useCustomRenderer && !useChildren
          ? html`
              <div slot="render-item" class="${storyClass}__summary-item-row">
                <div class="${storyClass}__summary-item-row-reorder">
                  ${iconLoader(Draggable16, {})}
                  <cds-user-avatar
                    size="md"
                    name=${item.title}
                    tooltip-text=${item.title}
                    tooltip-alignment="right"></cds-user-avatar>
                  <div class="${storyClass}__summary-item-row-text">
                    <p class="${storyClass}__summary-item-row-text__title">
                      ${item.title}
                    </p>
                    ${item.subtitle
                      ? html`<p
                          class="${storyClass}__summary-item-row-text__subtitle">
                          ${item.subtitle}
                        </p>`
                      : nothing}
                  </div>
                </div>
                <span class="${storyClass}__summary-item-row-modifier"
                  >Modifier</span
                >
              </div>
            `
          : nothing}
        ${useCustomTitle && !useChildren && !useCustomRenderer
          ? html`
              <div
                slot="accordion-title"
                class="${storyClass}__accordion-title">
                <cds-user-avatar
                  size="md"
                  name=${item.title}
                  tooltip-text=${item.title}
                  tooltip-alignment="right"></cds-user-avatar>
                <div class="${storyClass}__accordion-title-text">
                  <p class="${storyClass}__accordion-title-text__title">
                    ${item.title}
                  </p>
                  ${item.subtitle
                    ? html`<p
                        class="${storyClass}__accordion-title-text__subtitle">
                        ${item.subtitle}
                      </p>`
                    : nothing}
                </div>
              </div>
            `
          : nothing}
        ${useCustomContent && !useChildren && !useCustomRenderer
          ? html`
              <div slot="accordion-body" class="${storyClass}__accordion-body">
                <cds-tag type="blue" size="sm">${item.title}</cds-tag>
                <cds-tag type="cyan" size="sm">Category A</cds-tag>
                <cds-tag type="teal" size="sm">Active</cds-tag>
                <cds-tag type="purple" size="sm">Priority</cds-tag>
              </div>
            `
          : nothing}
      </cds-add-select-selection-summary-item>
    </div>
  `;
};

export const AddSelectSelectionSummaryItem = {
  name: 'add-select-selection-summary-item',
  render: AddSelectSelectionSummaryItemTemplate,
  args: {
    useAccordion: true,
    showRemoveButton: true,
    removeButtonLabel: 'Remove item',
    useCustomTitle: false,
    useCustomContent: false,
    useCustomRenderer: false,
    useChildren: false,
  },
  argTypes: {
    useAccordion: {
      control: 'boolean',
      description: 'Render the item with Carbon Accordion markup',
    },
    showRemoveButton: {
      control: 'boolean',
      description: 'Toggle the remove action button',
      table: { category: 'Story controls' },
    },
    removeButtonLabel: {
      control: 'text',
      description: 'Accessible label for the remove icon button',
    },
    useCustomTitle: {
      control: 'boolean',
      description: 'Demonstrate accordion-title slot in accordion mode',
      table: { category: 'Story controls' },
    },
    useCustomContent: {
      control: 'boolean',
      description: 'Demonstrate accordion-body slot in accordion mode',
      table: { category: 'Story controls' },
    },
    useCustomRenderer: {
      control: 'boolean',
      description:
        'Demonstrate render-item slot with custom rendering (takes precedence over default title/body)',
      table: { category: 'Story controls' },
    },
    useChildren: {
      control: 'boolean',
      description:
        'Demonstrate custom children content (default slot — takes highest priority)',
      table: { category: 'Story controls' },
    },
  },
};

// ─── AddSelectItemPanel ───────────────────────────────────────────────────────

const AddSelectItemPanelTemplate = (args) => {
  const {
    title,
    open,
    closeIconDescription,
    showCloseButton,
    useChildren,
    useRenderItem,
  } = args;

  const panelItem = sampleItems[0];

  return html`
    <style>
      ${styles}
    </style>
    <div class="${storyClass}-summary-container">
      <cds-add-select-item-panel
        title=${title}
        .item=${panelItem}
        ?open=${open}
        close-icon-description=${closeIconDescription}
        ?show-close-button=${showCloseButton}
        @cds-add-select-item-panel-close=${action(
          'cds-add-select-item-panel-close'
        )}>
        ${useChildren
          ? html`
              <div class="${storyClass}__item-panel-content">
                <p class="${storyClass}__item-panel-content__title">
                  Custom children content
                </p>
                <p class="${storyClass}__item-panel-content__body">
                  This content is passed as children and takes highest priority
                </p>
              </div>
            `
          : nothing}
        ${useRenderItem && !useChildren
          ? html`
              <div slot="render-item" class="${storyClass}__item-panel-content">
                <p class="${storyClass}__item-panel-content__title">
                  ${panelItem.title}
                </p>
                <p class="${storyClass}__item-panel-content__body">
                  Custom rendered details for ${panelItem.value}
                </p>
              </div>
            `
          : nothing}
      </cds-add-select-item-panel>
    </div>
  `;
};

export const AddSelectItemPanel = {
  name: 'add-select-item-panel',
  render: AddSelectItemPanelTemplate,
  args: {
    title: 'Item details',
    open: true,
    closeIconDescription: 'Close item details',
    showCloseButton: true,
    useChildren: false,
    useRenderItem: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Panel title',
    },
    open: {
      control: 'boolean',
      description:
        'Toggles the `--open` CSS modifier class. Use for CSS-driven slide-in/out transitions instead of conditional rendering.',
    },
    closeIconDescription: {
      control: 'text',
      description: 'Close button aria-label',
    },
    'close-icon-description': { table: { disable: true } },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
    'show-close-button': { table: { disable: true } },
    useChildren: {
      control: 'boolean',
      description: 'Demonstrate custom children content (highest priority)',
      table: { category: 'Story controls' },
    },
    useRenderItem: {
      control: 'boolean',
      description: 'Demonstrate custom render-item slot for AddSelectItem data',
      table: { category: 'Story controls' },
    },
  },
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/AddSelect',
  tags: ['autodocs', 'ibm-products-migrated'],
  decorators: [
    (story) => html`<div class="${storyClass}__viewport">${story()}</div>`,
  ],
  parameters: {
    styles,
  },
};

export default meta;
