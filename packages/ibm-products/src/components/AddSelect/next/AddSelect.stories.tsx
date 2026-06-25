/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { Button, Dropdown, IconButton, Tag, Toggle } from '@carbon/react';
import { AddSelect } from '.';
import type { AddSelectItem } from '@carbon/ibm-products';
import { NoDataEmptyState } from '../../EmptyStates';
import styles from './_storybook-styles.scss?inline';
import mdx from './AddSelect.mdx';
import { Document, Filter, Popup } from '@carbon/react/icons';

const storyClass = 'add-select-next-stories';

type FilterOption = {
  id: string;
  text: string;
};

const filterOptions: FilterOption[] = [
  { id: 'all', text: 'All items' },
  { id: 'folder', text: 'Folders' },
  { id: 'file', text: 'Files' },
];

const sampleItems: AddSelectItem[] = [
  {
    id: '1',
    value: '1',
    title: 'item 1',
    subtitle: 'item 1 subtitle',
    itemDetails: {
      id: 'description',
      title: 'Description',
      value: 'Description text for item 1',
    },
  },
  {
    id: '2',
    value: '2',
    title: 'item 2',
    subtitle: 'item 2 subtitle',
    itemDetails: {
      id: 'description',
      title: 'Description',
      value: 'Description text for item 2',
    },
  },
  {
    id: '3',
    value: '3',
    title: 'item 3',
    subtitle: 'item 3 subtitle',
  },
  {
    id: '4',
    value: '4',
    title: 'item 4',
    subtitle: 'item 4 subtitle',
  },
  {
    id: '5',
    value: '5',
    title: 'item 5',
    subtitle: 'item 5 subtitle',
  },
];

const hierarchicalItems: AddSelectItem[] = [
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

const summaryItems: AddSelectItem[] = sampleItems.slice(1, 4);

const PlaceholderShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        border: '1px dashed var(--cds-border-subtle)',
        padding: '1rem',
        background: 'var(--cds-layer)',
      }}
    >
      {children}
    </div>
  );
};

const PlaceholderRows = () => {
  return (
    <div
      style={{
        display: 'grid',
        gap: '0.25rem',
      }}
    >
      {sampleItems.slice(0, 3).map((item) => (
        <div
          key={item.id}
          style={{
            padding: '0.25rem',
            background: 'var(--cds-layer-accent)',
          }}
        >
          <p style={{ margin: 0 }}>AddSelect.Row</p>
        </div>
      ))}
    </div>
  );
};

export default {
  title: 'Preview/Add and select',
  component: AddSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return <div className={`${storyClass}__viewport`}>{Story()}</div>;
    },
  ],
  subcomponents: {
    'AddSelect.Body': AddSelect.Body,
    'AddSelect.Content': AddSelect.Content,
    'AddSelect.Column': AddSelect.Column,
    'AddSelect.Row': AddSelect.Row,
    'AddSelect.SelectionSummary': AddSelect.SelectionSummary,
    'AddSelect.SelectionSummaryItem': AddSelect.SelectionSummaryItem,
    'AddSelect.ItemPanel': AddSelect.ItemPanel,
  },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const AddSelectBodyStory = (args) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredItems = useMemo(() => {
    return sampleItems.filter((item) => {
      const matchesSearch = item.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  const actionsSlot = args.showActionsSlot ? (
    <Dropdown
      id="add-select-body-filter"
      titleText=""
      label="Filter items"
      items={filterOptions}
      itemToString={(item) => (item ? item.text : '')}
      onChange={({ selectedItem }) => setFilterType(selectedItem?.id || 'all')}
      size="lg"
    />
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
          hideSearch={args.hideSearch}
        >
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
    showActionsSlot: false,
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
    children: {
      control: false,
      description: 'Child components (typically AddSelect.Content)',
      table: { disable: true },
    },
    headerContent: {
      control: false,
      description: 'Custom header content (slot) - replaces entire header',
      table: { disable: true },
    },
    actionsSlot: {
      control: false,
      description:
        'Actions slot - adds custom actions (filter/sort) next to default search',
      table: { disable: true },
    },
    subHeaderActions: {
      control: false,
      description:
        'Sub-header actions - custom content/actions rendered after breadcrumbs and item count',
      table: { disable: true },
    },
    onSearch: {
      control: false,
      description:
        'Callback when search term changes. Signature: (searchTerm: string) => void',
      table: { disable: true },
    },
    onBreadcrumbClick: {
      control: false,
      description:
        'Callback when breadcrumb is clicked. Signature: (index: number) => void',
      table: { disable: true },
    },
    searchProps: {
      control: false,
      description: 'Additional props to pass to the Search component',
      table: { disable: true },
    },
    tagProps: {
      control: false,
      description:
        'Additional props to pass to the Tag component (for item count)',
      table: { disable: true },
    },
    breadcrumbProps: {
      control: false,
      description: 'Additional props to pass to the Breadcrumb component',
      table: { disable: true },
    },
    breadcrumbItemProps: {
      control: false,
      description: 'Additional props to pass to BreadcrumbItem components',
      table: { disable: true },
    },
    linkProps: {
      control: false,
      description: 'Additional props to pass to Link components in breadcrumbs',
      table: { disable: true },
    },
    hideSearch: {
      control: 'boolean',
      description: 'Whether to hide the search input',
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name',
      table: { disable: true },
    },
  },
};

const AddSelectColumnStory = (args) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set(['1', '4'])
  );

  const filteredItems = useMemo(() => {
    return sampleItems.filter((item) => {
      const matchesSearch = item.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterType]);

  const handleItemSelect = (itemId, selected) => {
    const nextSelection = args.multi
      ? new Set(selectedItems)
      : new Set<string>();

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
    <Dropdown
      id="add-select-column-filter"
      titleText=""
      label="Filter items"
      items={filterOptions}
      itemToString={(item) => (item ? item.text : '')}
      onChange={({ selectedItem }) => setFilterType(selectedItem?.id || 'all')}
      size="md"
    />
  ) : undefined;

  return (
    <div className={`${storyClass}-column-container`}>
      <AddSelect selectedItems={selectedItems} onItemSelect={handleItemSelect}>
        <AddSelect.Content>
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
            }}
          >
            {filteredItems.map((item) => (
              <AddSelect.Row
                key={item.id}
                itemId={item.id}
                title={item.title || ''}
                subtitle={item.subtitle}
                value={item.value || ''}
                hasChildren={args.enableNavigation && item.id === '1'}
              />
            ))}
          </AddSelect.Column>
        </AddSelect.Content>
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
    showActionsSlot: false,
    multi: true,
    showSelectAll: true,
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

const AddSelectRowStory = (args) => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    args.selected ? new Set(['1']) : new Set()
  );
  const [itemPanelOpen, setItemPanelOpen] = useState(args.itemPanelOpen);

  // Sync selectedItems with args.selected control
  React.useEffect(() => {
    setSelectedItems(args.selected ? new Set(['1']) : new Set());
  }, [args.selected]);

  // Sync itemPanelOpen with args.itemPanelOpen control
  React.useEffect(() => {
    setItemPanelOpen(args.itemPanelOpen);
  }, [args.itemPanelOpen]);

  const handleItemSelect = (itemId, selected) => {
    const nextSelection = args.multi
      ? new Set(selectedItems)
      : new Set<string>();

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
        <AddSelect.Content>
          <AddSelect.Column multi={args.multi} hideSearch>
            <AddSelect.Row
              itemId="1"
              title="folder 1"
              subtitle={args.showSubtitle ? '3 files' : undefined}
              value="folder 1"
              selected={args.selected}
              indeterminate={args.indeterminate}
              disabled={args.disabled}
              hasChildren={args.hasChildren}
              hasItemPanel={args.hasItemPanel}
              onItemPanelClick={() => setItemPanelOpen(true)}
              itemPanelOpen={args.hasItemPanel && itemPanelOpen}
              icon={args.showIcon ? <Document size={24} /> : undefined}
              rowContent={
                args.useRowContent ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <strong>Custom row content</strong>
                    <Tag type="purple" size="sm">
                      Custom
                    </Tag>
                  </div>
                ) : undefined
              }
            >
              {args.showTag ? (
                <Tag type="blue" size="sm">
                  Folder
                </Tag>
              ) : null}
            </AddSelect.Row>
          </AddSelect.Column>
        </AddSelect.Content>
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
    itemId: {
      control: 'text',
      description: 'Unique identifier for the item (required)',
      table: { disable: true },
    },
    title: {
      control: 'text',
      description: 'Item title (required)',
      table: { disable: true },
    },
    subtitle: {
      control: 'text',
      description: 'Item subtitle (optional)',
      table: { disable: true },
    },
    value: {
      control: 'text',
      description: 'Item value (required)',
      table: { disable: true },
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
    parentId: {
      control: 'text',
      description: 'Parent ID for hierarchical navigation',
      table: { disable: true },
    },
    icon: {
      control: false,
      description:
        'Optional icon slot (ReactNode). Toggle with showIcon control.',
      table: { disable: true },
    },
    children: {
      control: false,
      description:
        'Custom content to render after the title/subtitle section (badges, tags, metadata)',
      table: { disable: true },
    },
    rowContent: {
      control: false,
      description:
        'Custom row content (slot) - replaces the entire row content section (title, subtitle, and children). When provided, only the selection control and navigation indicators remain. Toggle with useRowContent control.',
      table: { disable: true },
    },
    onItemPanelClick: {
      control: false,
      description:
        'Callback when item panel view icon is clicked. Signature: (itemId: string) => void',
      table: { disable: true },
    },
    itemPanelIconDescription: {
      control: 'text',
      description: 'Description for the item panel icon button',
      table: { disable: true },
    },
    itemPanelOpen: {
      control: 'boolean',
      description: 'Whether the item panel is currently open for this item',
      table: { category: 'Story controls' },
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name',
      table: { disable: true },
    },
    checkboxProps: {
      control: false,
      description:
        'Additional props to pass to the Checkbox component (when multi=true)',
      table: { disable: true },
    },
    radioButtonProps: {
      control: false,
      description:
        'Additional props to pass to the RadioButton component (when multi=false)',
      table: { disable: true },
    },
    itemPanelIconButtonProps: {
      control: false,
      description:
        'Additional props to pass to the IconButton component (info panel)',
      table: { disable: true },
    },
  },
};

const AddSelectSelectionSummaryStory = (args) => {
  const selectedItemsArray = args.showEmptyState ? [] : summaryItems;

  return (
    <div className={`${storyClass}-summary-container`}>
      <AddSelect.SelectionSummary
        title={args.title}
        selectedItems={selectedItemsArray}
        showCount={args.showCount}
        showEditIcon={args.showEditIcon}
        onEdit={args.showEditIcon ? () => {} : undefined}
        editIconDescription={args.editIconDescription}
        emptyState={
          args.showEmptyState ? (
            <div
              style={{
                padding: '1rem 0.5rem',
              }}
            >
              <NoDataEmptyState
                subtitle={
                  <>
                    No selected items.
                    <br />
                    Select items to see them here.
                  </>
                }
              />
            </div>
          ) : undefined
        }
        className={args.className}
        renderItem={
          args.useCustomRenderer
            ? (item) => (
                <div
                  style={{
                    padding: '0.5rem',
                    borderBottom: '1px solid var(--cds-border-subtle)',
                  }}
                >
                  <strong>{item.title}</strong>
                  {item.subtitle && (
                    <div
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--cds-text-secondary)',
                      }}
                    >
                      {item.subtitle}
                    </div>
                  )}
                </div>
              )
            : undefined
        }
        headerContent={
          args.useCustomHeader ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <h3 style={{ margin: 0, fontSize: '1rem' }}>Custom Header</h3>
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
        }
      >
        {args.useCustomChildren &&
          selectedItemsArray
            .slice(0, 3)
            .map((item) => (
              <AddSelect.SelectionSummaryItem
                key={item.id}
                item={item}
                onRemove={() => {}}
                useAccordion
              />
            ))}
      </AddSelect.SelectionSummary>
    </div>
  );
};

export const AddSelectSelectionSummary = {
  name: 'AddSelect.SelectionSummary',
  render: AddSelectSelectionSummaryStory,
  args: {
    title: 'Selected items',
    showCount: true,
    showEditIcon: true,
    showHeaderActions: false,
    showEmptyState: false,
    editIconDescription: 'Edit selections',
    className: '',
    useCustomRenderer: false,
    useCustomHeader: false,
    useCustomChildren: false,
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Heading displayed above the selection summary list',
    },
    showCount: {
      control: 'boolean',
      description: 'Display a count badge for selected items',
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
    useCustomRenderer: {
      control: 'boolean',
      description: 'Toggle example custom item renderer (renderItem prop)',
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
    selectedItems: {
      control: false,
      description: 'Array of selected items (AddSelectItem[])',
    },
    children: {
      control: false,
      description: 'Custom content or SelectionSummaryItem components',
    },
    emptyState: {
      control: false,
      description: 'Custom empty state component',
    },
    onEdit: {
      control: false,
      description: 'Edit icon click handler. Signature: () => void',
    },
    renderItem: {
      control: false,
      description:
        'Custom item renderer. Signature: (item: AddSelectItem) => ReactNode',
    },
    headerContent: {
      control: false,
      description:
        'Custom header content (slot) - replaces entire header section',
    },
    headerActions: {
      control: false,
      description:
        'Header actions slot - adds custom actions alongside the edit icon',
    },
    tagProps: {
      control: false,
      description: 'Additional props to pass to the Tag component',
    },
    editIconButtonProps: {
      control: false,
      description: 'Additional props to pass to the edit IconButton',
    },
  },
};

const AddSelectSelectionSummaryItemStory = (args) => {
  const [visible, setVisible] = useState(true);

  const item = summaryItems[0];

  return (
    <div
      style={{
        width: '256px',
        display: 'grid',
        gap: '0.75rem',
        border: '1px dashed var(--cds-border-subtle)',
        padding: '1rem',
        background: 'var(--cds-layer)',
      }}
    >
      {visible ? (
        <AddSelect.SelectionSummaryItem
          item={item}
          useAccordion={args.useAccordion}
          onRemove={args.showRemoveButton ? () => setVisible(false) : undefined}
          removeButtonLabel={args.removeButtonLabel}
          renderAccordionTitle={
            args.useCustomTitle
              ? (currentItem) => (
                  <div>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                      {currentItem.title}
                    </p>
                    <p style={{ margin: '0.25rem 0 0' }}>
                      Custom title renderer
                    </p>
                  </div>
                )
              : undefined
          }
          renderAccordionBody={
            args.useCustomContent
              ? (currentItem) => (
                  <div>
                    <p style={{ margin: 0 }}>
                      Custom content for {currentItem.title}
                    </p>
                  </div>
                )
              : undefined
          }
          renderItem={
            args.useCustomRenderer
              ? (currentItem, onRemoveHandler) => (
                  <div
                    style={{
                      padding: '1rem',
                      border: '2px solid var(--cds-border-interactive)',
                      borderRadius: '4px',
                      background: 'var(--cds-layer-01)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: 700,
                            color: 'var(--cds-text-primary)',
                          }}
                        >
                          {currentItem.title}
                        </p>
                        {currentItem.subtitle && (
                          <p
                            style={{
                              margin: '0.25rem 0 0',
                              fontSize: '0.875rem',
                              color: 'var(--cds-text-secondary)',
                            }}
                          >
                            {currentItem.subtitle}
                          </p>
                        )}
                      </div>
                      {onRemoveHandler && (
                        <Button
                          kind="danger--ghost"
                          size="sm"
                          onClick={() => onRemoveHandler(currentItem.id)}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    <p
                      style={{
                        margin: '0.5rem 0 0',
                        fontSize: '0.75rem',
                        fontStyle: 'italic',
                      }}
                    >
                      Custom item rendering
                    </p>
                  </div>
                )
              : undefined
          }
        >
          {args.useChildren ? (
            <div
              style={{
                padding: '1rem',
                border: '2px solid var(--cds-support-success)',
                borderRadius: '4px',
                background: 'var(--cds-layer-01)',
              }}
            >
              <p style={{ margin: 0, fontWeight: 700 }}>{item.title}</p>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem' }}>
                Custom children content
              </p>
            </div>
          ) : undefined}
        </AddSelect.SelectionSummaryItem>
      ) : (
        <p style={{ margin: 0 }}>Item removed in story preview.</p>
      )}
    </div>
  );
};

export const AddSelectSelectionSummaryItem = {
  name: 'AddSelect.SelectionSummaryItem',
  render: AddSelectSelectionSummaryItemStory,
  args: {
    useAccordion: false,
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

const AddSelectItemPanelStory = (args) => {
  const panelItem = sampleItems[0];

  return (
    <div className={`${storyClass}-summary-container`}>
      <AddSelect.ItemPanel
        title={args.title}
        item={panelItem}
        onClose={args.showCloseButton ? () => {} : undefined}
        closeIconDescription={args.closeIconDescription}
        className={args.className}
        renderItem={
          args.useRenderItem
            ? (item) => (
                <div>
                  <p style={{ margin: 0, fontWeight: 600 }}>{item.title}</p>
                  <p style={{ margin: '0.25rem 0 0' }}>
                    Custom rendered details for {item.value}
                  </p>
                </div>
              )
            : undefined
        }
      >
        {args.useChildren ? (
          <div>
            <p style={{ margin: 0, fontWeight: 600 }}>
              Custom children content
            </p>
            <p style={{ margin: '0.25rem 0 0' }}>
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
    item: {
      control: false,
      description: 'Item data (AddSelectItem)',
      table: { disable: true },
    },
    onClose: {
      control: false,
      description: 'Close button handler. Signature: () => void',
      table: { disable: true },
    },
    closeIconDescription: {
      control: 'text',
      description: 'Close button aria-label',
    },
    className: {
      control: 'text',
      description: 'Optional CSS class name',
    },
    children: {
      control: false,
      description: 'Custom content - takes highest priority (ReactNode)',
      table: { disable: true },
    },
    renderItem: {
      control: false,
      description:
        'Custom template for rendering the entire panel body content. Signature: (item: AddSelectItem) => ReactNode',
      table: { disable: true },
    },
    closeIconButtonProps: {
      control: false,
      description: 'Additional props to pass to the close IconButton',
      table: { disable: true },
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
  },
};
