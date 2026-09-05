/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import React, { useMemo, useState } from 'react';
import { IconButton, Tag, Toggle } from '../..';
import { AddSelect } from './AddSelect';
import mdx from './docs/overview.mdx';
import {
  ArrowsVertical,
  Document,
  Draggable,
  Filter,
  Popup,
} from '@carbon/icons-react';

const storyClass = 'add-select-next-stories';

const sampleItems = [
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

const hierarchicalItems = [
  {
    id: '1',
    value: 'folder 1',
    title: 'folder 1',
    children: {
      entries: [
        {
          id: '1-1',
          value: 'file1.pdf',
          title: 'file1.pdf',
          icon: (props) => <Document size={16} {...props} />,
          children: {
            entries: [
              {
                id: '1-1-1',
                value: 'nested.html',
                title: 'nested.html',
                icon: (props) => <Document size={16} {...props} />,
              },
            ],
          },
        },
        {
          id: '1-2',
          value: 'index.js',
          title: 'index.js',
          icon: (props) => <Document size={16} {...props} />,
        },
        {
          id: '1-3',
          value: 'sitemap.xml',
          title: 'sitemap.xml',
          icon: (props) => <Document size={16} {...props} />,
        },
      ],
    },
  },
  {
    id: '2',
    value: 'folder 2',
    title: 'folder 2',
    children: {
      entries: [
        {
          id: '2-1',
          value: 'document.html',
          title: 'document.html',
          icon: (props) => <Document size={16} {...props} />,
        },
      ],
    },
  },
  {
    id: '3',
    value: 'folder 3',
    title: 'folder 3',
    children: {
      entries: [
        {
          id: '3-1',
          value: 'readme.md',
          title: 'readme.md',
          icon: (props) => <Document size={16} {...props} />,
        },
        {
          id: '3-2',
          value: 'config.json',
          title: 'config.json',
          icon: (props) => <Document size={16} {...props} />,
        },
      ],
    },
  },
  {
    id: '4',
    value: 'folder 4',
    title: 'folder 4',
    children: {
      entries: [
        {
          id: '4-1',
          value: 'styles.css',
          title: 'styles.css',
          icon: (props) => <Document size={16} {...props} />,
        },
      ],
    },
  },
  {
    id: '5',
    value: 'folder 5',
    title: 'folder 5',
    children: {
      entries: [
        {
          id: '5-1',
          value: 'app.tsx',
          title: 'app.tsx',
          icon: (props) => <Document size={16} {...props} />,
        },
      ],
    },
  },
];

// Suppress unused variable warning — kept for story data completeness
void hierarchicalItems;

const summaryItems = sampleItems.slice(1, 4);

const PlaceholderShell = ({ children }) => {
  return <div className={`${storyClass}__placeholder-shell`}>{children}</div>;
};

const PlaceholderRows = () => {
  return (
    <div className={`${storyClass}__placeholder-rows`}>
      {sampleItems.slice(0, 3).map((item) => (
        <div key={item.id} className={`${storyClass}__placeholder-row`}>
          <p>AddSelect.Row</p>
        </div>
      ))}
    </div>
  );
};

export default {
  title: 'Components/AddSelect',
  component: AddSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return <div className={`${storyClass}__viewport`}>{Story()}</div>;
    },
  ],
  subcomponents: {
    'AddSelect.Body': AddSelect.Body,
    'AddSelect.Column': AddSelect.Column,
    'AddSelect.Row': AddSelect.Row,
    'AddSelect.SelectionSummary': AddSelect.SelectionSummary,
    'AddSelect.SelectionSummaryItem': AddSelect.SelectionSummaryItem,
    'AddSelect.ItemPanel': AddSelect.ItemPanel,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

// ─── AddSelect.Body ───────────────────────────────────────────────────────────

const AddSelectBodyStory = (args) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = useMemo(() => {
    return sampleItems.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const actionsSlot = args.showActionsSlot ? (
    <>
      <IconButton label="Sort" kind="ghost" size="lg">
        <ArrowsVertical />
      </IconButton>
      <IconButton label="Filter" kind="ghost" size="lg">
        <Filter />
      </IconButton>
    </>
  ) : undefined;

  const subHeaderActions = args.showSubHeaderActions ? (
    <Toggle
      id="body-subheader-toggle"
      labelA="Off"
      labelB="On"
      labelText="Placeholder action"
      size="sm"
      hideLabel
    />
  ) : undefined;

  return (
    <AddSelect selectedItems={new Set()} onItemSelect={() => {}}>
      <PlaceholderShell>
        <AddSelect.Body
          itemsLabel={args.itemsLabel}
          globalSearchLabel={args.globalSearchLabel}
          globalSearchPlaceholder={args.globalSearchPlaceholder}
          searchResultsTitle={args.searchResultsTitle}
          itemCount={args.itemCount ?? filteredItems.length}
          path={args.showPath ? args.path : []}
          onSearch={setSearchTerm}
          onBreadcrumbClick={() => {}}
          actionsSlot={actionsSlot}
          subHeaderActions={subHeaderActions}
          hideSearch={args.hideSearch}>
          <PlaceholderRows />
        </AddSelect.Body>
      </PlaceholderShell>
    </AddSelect>
  );
};

export const AddSelectBody = {
  name: 'AddSelect.Body',
  render: AddSelectBodyStory,
  args: {
    itemsLabel: 'All items',
    globalSearchLabel: 'Search items',
    globalSearchPlaceholder: 'Search by name',
    searchResultsTitle: 'Search results',
    itemCount: 3,
    showActionsSlot: true,
    showSubHeaderActions: false,
    showPath: false,
    path: [
      { id: 'root', title: 'Category' },
      { id: 'folders', title: 'Folders' },
      { id: 'files', title: 'Files' },
    ],
    hideSearch: false,
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
    showActionsSlot: {
      control: 'boolean',
      description: 'Toggle example content for the actionsSlot prop',
      table: { category: 'Story controls' },
    },
    showSubHeaderActions: {
      control: 'boolean',
      description: 'Toggle example content for the subHeaderActions prop',
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
    hideSearch: {
      control: 'boolean',
      description: 'Whether to hide the search input',
    },
    children: { table: { disable: true } },
    headerContent: { table: { disable: true } },
    actionsSlot: { table: { disable: true } },
    subHeaderActions: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    onBreadcrumbClick: { table: { disable: true } },
    searchProps: { table: { disable: true } },
    tagProps: { table: { disable: true } },
    breadcrumbProps: { table: { disable: true } },
    breadcrumbItemProps: { table: { disable: true } },
    linkProps: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

// ─── AddSelect.Column ─────────────────────────────────────────────────────────

const AddSelectColumnStory = (args) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set(['1', '4']));

  const filteredItems = useMemo(() => {
    return sampleItems.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleItemSelect = (itemId, selected) => {
    const nextSelection = args.multi ? new Set(selectedItems) : new Set();

    if (selected) {
      nextSelection.add(itemId);
    } else {
      nextSelection.delete(itemId);
    }

    setSelectedItems(nextSelection);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(new Set(filteredItems.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const allSelected =
    filteredItems.length > 0 &&
    filteredItems.every((item) => selectedItems.has(item.id));

  const allIndeterminate =
    selectedItems.size > 0 &&
    selectedItems.size < filteredItems.length &&
    !allSelected;

  const actionsSlot = args.showActionsSlot ? (
    <>
      <IconButton label="Sort" kind="ghost" size="sm">
        <ArrowsVertical />
      </IconButton>
      <IconButton label="Filter" kind="ghost" size="sm">
        <Filter />
      </IconButton>
    </>
  ) : undefined;

  return (
    <div className={`${storyClass}-column-container`}>
      <AddSelect selectedItems={selectedItems} onItemSelect={handleItemSelect}>
        <AddSelect.Body
          hideSearch
          className={`${storyClass}--no-header-border`}>
          <AddSelect.Column
            title={args.title}
            searchLabel={args.searchLabel}
            searchPlaceholder={args.searchPlaceholder}
            onSearch={setSearchTerm}
            hideSearch={!args.showSearch}
            actionsSlot={actionsSlot}
            multi={args.multi}
            showSelectAll={args.showSelectAll}
            itemCount={filteredItems.length}
            allSelected={allSelected}
            allIndeterminate={allIndeterminate}
            onSelectAll={handleSelectAll}
            onNavigate={args.enableNavigation ? () => {} : undefined}
            className="custom-column-class"
            searchProps={{
              closeButtonLabelText: 'Clear search',
            }}
            tagProps={{
              className: 'custom-tag-class',
            }}
            selectAllCheckboxProps={{
              hideLabel: false,
            }}>
            {filteredItems.map((item) => (
              <AddSelect.Row
                key={item.id}
                itemId={item.id}
                title={item.title || ''}
                value={item.value || ''}
                hasChildren={args.enableNavigation && item.id === '1'}
              />
            ))}
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    </div>
  );
};

export const AddSelectColumn = {
  name: 'AddSelect.Column',
  render: AddSelectColumnStory,
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
      description: 'Toggle example content for the actionsSlot prop',
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
    children: { table: { disable: true } },
    onSearch: { table: { disable: true } },
    actionsSlot: { table: { disable: true } },
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

// ─── AddSelect.Row ────────────────────────────────────────────────────────────

const AddSelectRowStory = (args) => {
  const [selectedItems, setSelectedItems] = useState(
    args.selected ? new Set(['1']) : new Set()
  );
  const [itemPanelOpen, setItemPanelOpen] = useState(args.itemPanelOpen);

  React.useEffect(() => {
    setSelectedItems(args.selected ? new Set(['1']) : new Set());
  }, [args.selected]);

  React.useEffect(() => {
    setItemPanelOpen(args.itemPanelOpen);
  }, [args.itemPanelOpen]);

  const handleItemSelect = (itemId, selected) => {
    const nextSelection = args.multi ? new Set(selectedItems) : new Set();

    if (selected) {
      nextSelection.add(itemId);
    } else {
      nextSelection.delete(itemId);
    }

    setSelectedItems(nextSelection);
  };

  return (
    <div className={`${storyClass}-container--single`}>
      <AddSelect selectedItems={selectedItems} onItemSelect={handleItemSelect}>
        <AddSelect.Body
          hideSearch
          className={`${storyClass}--no-header-border`}>
          <AddSelect.Column multi={args.multi} hideSearch>
            <AddSelect.Row
              itemId="1"
              title="Item title"
              subtitle={args.showSubtitle ? 'Item subtitle' : undefined}
              value="folder 1"
              selected={args.selected}
              indeterminate={args.indeterminate}
              disabled={args.disabled}
              hasChildren={args.hasChildren}
              hasItemPanel={args.hasItemPanel}
              onItemPanelClick={() => setItemPanelOpen(true)}
              itemPanelOpen={args.hasItemPanel && itemPanelOpen}
              icon={
                args.showIcon ? (
                  <span
                    className={`${storyClass}__avatar-placeholder`}
                    aria-label="user icon">
                    👤
                  </span>
                ) : undefined
              }
              skeleton={args.skeleton}
              rowContent={
                args.useRowContent ? (
                  <div className={`${storyClass}__row-content`}>
                    <strong>Custom row content</strong>
                    <Tag type="purple" size="sm">
                      Custom
                    </Tag>
                  </div>
                ) : undefined
              }>
              {args.showTag ? (
                <Tag type="blue" size="sm">
                  Folder
                </Tag>
              ) : null}
            </AddSelect.Row>
          </AddSelect.Column>
        </AddSelect.Body>
      </AddSelect>
    </div>
  );
};

export const AddSelectRow = {
  name: 'AddSelect.Row',
  render: AddSelectRowStory,
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
    showSubtitle: {
      control: 'boolean',
      description: 'Demonstrate the optional subtitle prop',
      table: { category: 'Story controls' },
    },
    showTag: {
      control: 'boolean',
      description: 'Render custom row children content',
      table: { category: 'Story controls' },
    },
    showIcon: {
      control: 'boolean',
      description: 'Demonstrate the optional icon prop',
      table: { category: 'Story controls' },
    },
    useRowContent: {
      control: 'boolean',
      description:
        'Demonstrate custom rowContent slot (replaces title/subtitle/children)',
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
    disabled: {
      control: 'boolean',
      description: 'Disable the example row',
    },
    skeleton: {
      control: 'boolean',
      description:
        'Render the row as a skeleton (loading state) with placeholder content',
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
    itemPanelOpen: {
      control: 'boolean',
      description: 'Whether the item panel is currently open for this item',
      table: { category: 'Story controls' },
    },
    itemId: { table: { disable: true } },
    title: { table: { disable: true } },
    subtitle: { table: { disable: true } },
    value: { table: { disable: true } },
    parentId: { table: { disable: true } },
    icon: { table: { disable: true } },
    children: { table: { disable: true } },
    rowContent: { table: { disable: true } },
    onItemPanelClick: { table: { disable: true } },
    itemPanelIconDescription: { table: { disable: true } },
    className: { table: { disable: true } },
    checkboxProps: { table: { disable: true } },
    radioButtonProps: { table: { disable: true } },
    itemPanelIconButtonProps: { table: { disable: true } },
  },
};

// ─── AddSelect.SelectionSummary ───────────────────────────────────────────────

const AddSelectSelectionSummaryStory = (args) => {
  const selectedItemsArray = args.showEmptyState ? [] : summaryItems;

  const renderCustomItem = (item) => (
    <div
      className={`${storyClass}__summary-item-row`}
      style={{
        borderBlockEnd: '1px solid var(--cds-border-subtle-01)',
      }}>
      <div className={`${storyClass}__summary-item-row-text`}>
        <p className={`${storyClass}__summary-item-row-text__title`}>
          {item.title}
        </p>
        {item.subtitle && (
          <p className={`${storyClass}__summary-item-row-text__subtitle`}>
            {item.subtitle}
          </p>
        )}
      </div>
      <span className={`${storyClass}__summary-item-row-modifier`}>
        Modifier
      </span>
    </div>
  );

  return (
    <div className={`${storyClass}-summary-container`}>
      <AddSelect.SelectionSummary
        title={args.title}
        selectedItemCount={selectedItemsArray.length}
        showEditIcon={args.showEditIcon}
        onEdit={args.showEditIcon ? () => {} : undefined}
        editIconDescription={args.editIconDescription}
        emptyState={
          args.showEmptyState ? (
            <div className={`${storyClass}__empty-state`}>
              <p
                style={{
                  padding: 'var(--cds-spacing-05)',
                  color: 'var(--cds-text-secondary)',
                }}>
                No selected items. Select items to see them here.
              </p>
            </div>
          ) : undefined
        }
        className={args.className}
        headerContent={
          args.useCustomHeader ? (
            <div className={`${storyClass}__summary-header-content`}>
              <h3>Custom Header</h3>
              <IconButton label="popup" kind="ghost" size="sm">
                <Popup />
              </IconButton>
            </div>
          ) : undefined
        }
        headerActions={
          args.showHeaderActions ? (
            <>
              <IconButton label="Filter" kind="ghost" size="sm">
                <Filter />
              </IconButton>
              <IconButton label="popup" kind="ghost" size="sm">
                <Popup />
              </IconButton>
            </>
          ) : undefined
        }>
        {selectedItemsArray
          .slice(0, 3)
          .map((item) =>
            args.useCustomChildren ? (
              <React.Fragment key={item.id}>
                {renderCustomItem(item)}
              </React.Fragment>
            ) : (
              <AddSelect.SelectionSummaryItem
                key={item.id}
                item={item}
                onRemove={() => {}}
                useAccordion
              />
            )
          )}
      </AddSelect.SelectionSummary>
    </div>
  );
};

export const AddSelectSelectionSummary = {
  name: 'AddSelect.SelectionSummary',
  render: AddSelectSelectionSummaryStory,
  args: {
    title: 'Selected items',
    showEditIcon: true,
    showHeaderActions: false,
    showEmptyState: false,
    editIconDescription: 'Edit selections',
    className: '',
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
      description: 'Show the edit icon button when onEdit is provided',
    },
    editIconDescription: {
      control: 'text',
      description: 'Edit icon aria-label',
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name',
    },
    useCustomChildren: {
      control: 'boolean',
      description:
        'Toggle example custom children (SelectionSummaryItem components)',
      table: { category: 'Story controls' },
    },
    useCustomHeader: {
      control: 'boolean',
      description: 'Toggle example custom header content (headerContent prop)',
      table: { category: 'Story controls' },
    },
    showHeaderActions: {
      control: 'boolean',
      description: 'Toggle example content for the headerActions prop',
      table: { category: 'Story controls' },
    },
    showEmptyState: {
      control: 'boolean',
      description: 'Show the emptyState slot usage',
      table: { category: 'Story controls' },
    },
    selectedItemCount: { table: { disable: true } },
    children: { table: { disable: true } },
    emptyState: { table: { disable: true } },
    onEdit: { table: { disable: true } },
    headerContent: { table: { disable: true } },
    headerActions: { table: { disable: true } },
    tagProps: { table: { disable: true } },
    editIconButtonProps: { table: { disable: true } },
  },
};

// ─── AddSelect.SelectionSummaryItem ───────────────────────────────────────────

const AddSelectSelectionSummaryItemStory = (args) => {
  const [visible, setVisible] = useState(true);
  const item = summaryItems[0];

  return (
    <div className={`${storyClass}__summary-item-wrapper`}>
      {visible ? (
        <AddSelect.SelectionSummaryItem
          item={item}
          useAccordion={args.useAccordion}
          onRemove={args.showRemoveButton ? () => setVisible(false) : undefined}
          removeButtonLabel={args.removeButtonLabel}
          renderAccordionTitle={
            args.useCustomTitle
              ? (currentItem) => (
                  <div className={`${storyClass}__accordion-title`}>
                    <div className={`${storyClass}__accordion-title-text`}>
                      <p
                        className={`${storyClass}__accordion-title-text__title`}>
                        {currentItem.title}
                      </p>
                      {currentItem.subtitle && (
                        <p
                          className={`${storyClass}__accordion-title-text__subtitle`}>
                          {currentItem.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                )
              : undefined
          }
          renderAccordionBody={
            args.useCustomContent
              ? (currentItem) => (
                  <div className={`${storyClass}__accordion-body`}>
                    <Tag type="blue" size="sm">
                      {currentItem.title}
                    </Tag>
                    <Tag type="cyan" size="sm">
                      Category A
                    </Tag>
                    <Tag type="teal" size="sm">
                      Active
                    </Tag>
                    <Tag type="purple" size="sm">
                      Priority
                    </Tag>
                  </div>
                )
              : undefined
          }
          renderItem={
            args.useCustomRenderer
              ? (currentItem) => (
                  <div className={`${storyClass}__summary-item-row`}>
                    <div className={`${storyClass}__summary-item-row-reorder`}>
                      <Draggable size={16} />
                      <div className={`${storyClass}__summary-item-row-text`}>
                        <p
                          className={`${storyClass}__summary-item-row-text__title`}>
                          {currentItem.title}
                        </p>
                        {currentItem.subtitle && (
                          <p
                            className={`${storyClass}__summary-item-row-text__subtitle`}>
                            {currentItem.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`${storyClass}__summary-item-row-modifier`}>
                      Modifier
                    </span>
                  </div>
                )
              : undefined
          }>
          {args.useChildren ? (
            <div className={`${storyClass}__summary-item-row`}>
              <div className={`${storyClass}__summary-item-row-text`}>
                <p className={`${storyClass}__summary-item-row-text__title`}>
                  {item.title}
                </p>
                {item.subtitle && (
                  <p
                    className={`${storyClass}__summary-item-row-text__subtitle`}>
                    {item.subtitle}
                  </p>
                )}
              </div>
              <span className={`${storyClass}__summary-item-row-modifier`}>
                Modifier
              </span>
            </div>
          ) : undefined}
        </AddSelect.SelectionSummaryItem>
      ) : (
        <p className={`${storyClass}__summary-item-removed`}>
          Item removed in story preview.
        </p>
      )}
    </div>
  );
};

export const AddSelectSelectionSummaryItem = {
  name: 'AddSelect.SelectionSummaryItem',
  render: AddSelectSelectionSummaryItemStory,
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
      description: 'Demonstrate renderAccordionTitle in accordion mode',
      table: { category: 'Story controls' },
    },
    useCustomContent: {
      control: 'boolean',
      description: 'Demonstrate renderAccordionBody in accordion mode',
      table: { category: 'Story controls' },
    },
    useCustomRenderer: {
      control: 'boolean',
      description:
        'Demonstrate renderItem prop with custom rendering (takes precedence over default rendering)',
      table: { category: 'Story controls' },
    },
    useChildren: {
      control: 'boolean',
      description:
        'Demonstrate custom children content (takes highest priority)',
      table: { category: 'Story controls' },
    },
    item: { table: { disable: true } },
    renderAccordionTitle: { table: { disable: true } },
    renderAccordionBody: { table: { disable: true } },
    renderItem: { table: { disable: true } },
    children: { table: { disable: true } },
    onRemove: { table: { disable: true } },
    className: { table: { disable: true } },
    accordionProps: { table: { disable: true } },
    accordionItemProps: { table: { disable: true } },
    removeIconButtonProps: { table: { disable: true } },
  },
};

// ─── AddSelect.ItemPanel ──────────────────────────────────────────────────────

const AddSelectItemPanelStory = (args) => {
  const panelItem = sampleItems[0];

  return (
    <div className={`${storyClass}-summary-container`}>
      <AddSelect.ItemPanel
        title={args.title}
        item={panelItem}
        open={args.open}
        onClose={args.showCloseButton ? () => {} : undefined}
        closeIconDescription={args.closeIconDescription}
        className={args.className}
        renderItem={
          args.useRenderItem
            ? (item) => (
                <div className={`${storyClass}__item-panel-content`}>
                  <p className={`${storyClass}__item-panel-content__title`}>
                    {item.title}
                  </p>
                  <p className={`${storyClass}__item-panel-content__body`}>
                    Custom rendered details for {item.value}
                  </p>
                </div>
              )
            : undefined
        }>
        {args.useChildren ? (
          <div className={`${storyClass}__item-panel-content`}>
            <p className={`${storyClass}__item-panel-content__title`}>
              Custom children content
            </p>
            <p className={`${storyClass}__item-panel-content__body`}>
              This content is passed as children and takes highest priority
            </p>
          </div>
        ) : undefined}
      </AddSelect.ItemPanel>
    </div>
  );
};

export const AddSelectItemPanel = {
  name: 'AddSelect.ItemPanel',
  render: AddSelectItemPanelStory,
  args: {
    title: 'Item details',
    open: true,
    showCloseButton: true,
    closeIconDescription: 'Close item details',
    className: '',
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
    className: {
      control: 'text',
      description: 'Optional CSS class name',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Toggle the close button by passing onClose',
      table: { category: 'Story controls' },
    },
    useChildren: {
      control: 'boolean',
      description: 'Demonstrate custom children content (highest priority)',
      table: { category: 'Story controls' },
    },
    useRenderItem: {
      control: 'boolean',
      description: 'Demonstrate custom renderItem for AddSelectItem data',
      table: { category: 'Story controls' },
    },
    item: { table: { disable: true } },
    onClose: { table: { disable: true } },
    children: { table: { disable: true } },
    renderItem: { table: { disable: true } },
    closeIconButtonProps: { table: { disable: true } },
  },
};
