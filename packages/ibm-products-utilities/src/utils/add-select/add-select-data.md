# AddSelectData Utility

A lightweight, framework-agnostic JavaScript library for manipulating and
processing hierarchical data. This utility provides standard APIs for common
operations such as setting, selecting, traversing, searching, and sorting
hierarchical data structures.

## Purpose

The AddSelectData utility encapsulates data logic separate from UI components,
allowing both React and Web Components to reuse the same data management
functions. This promotes code reusability and maintainability across different
frameworks.

## Installation

**⚠️ Important:** This is a private package not published to npm. Always import
from the main consumer packages:

```typescript
// For React projects
import { AddSelectData, AddSelectItem } from '@carbon/ibm-products';

// For Web Components projects
import {
  AddSelectData,
  AddSelectItem,
} from '@carbon/ibm-products-web-components';
```

## Data Structure

The utility works with hierarchical items that follow these interfaces:

```typescript
/**
 * Status types for items in the hierarchical data structure
 */
type ItemStatus = 'checked' | 'unchecked' | 'indeterminate';

/**
 * Interface for item details metadata
 */
interface ItemDetails {
  [key: string]: unknown;
}

/**
 * Interface for hierarchical data items
 */
interface AddSelectItem {
  /** Unique identifier for the item */
  id: string;
  /** Display title for the item */
  title?: string;
  /** Value associated with the item */
  value?: string;
  /** Subtitle or secondary text */
  subtitle?: string;
  /** Whether the item is currently selected */
  selected?: boolean;
  /** Selection status (checked, unchecked, or indeterminate for parent nodes) */
  status?: ItemStatus;
  /** Whether the item is disabled and cannot be selected */
  disabled?: boolean;
  /** Icon or visual element to display with the item */
  icon?: ReactNode;
  /** Nested children items */
  children?: {
    entries: AddSelectItem[];
  };
  /** Additional metadata and details about the item */
  itemDetails?: ItemDetails;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Options for search functionality
 */
interface SearchOptions {
  caseSensitive?: boolean;
  searchFields?: string[]; // Fields to search in (default: ['title', 'value'])
  maxResults?: number; // Maximum number of results to return
}
```

## API Reference

### Core Methods

#### `setItems(items: AddSelectItem[]): void`

Initialize or replace the hierarchical data.

```typescript
const dataManager = new AddSelectData();
dataManager.setItems([
  { id: '1', title: 'Item 1', value: 'item1' },
  { id: '2', title: 'Item 2', value: 'item2' },
]);
```

#### `getItems(): AddSelectItem[]`

Get the full list of items.

```typescript
const allItems = dataManager.getItems();
```

#### `getItem(id: string): AddSelectItem | undefined`

Retrieve a single item by its id.

```typescript
const item = dataManager.getItem('1');
```

#### `setItem(id: string, newProperties: Partial<AddSelectItem>): boolean`

Update a given item with new properties. Returns `true` if successful, `false`
if item not found.

```typescript
const updated = dataManager.setItem('1', { title: 'Updated Title' });
```

### Selection Methods

#### `getSelectedItems(): AddSelectItem[]`

Returns an array of items marked as selected. This method is memoized for
performance.

```typescript
const selected = dataManager.getSelectedItems();
```

#### `setSelectedItems(ids: string | string[], exclusive?: boolean): void`

Mark one or more items (by id) as selected. If `exclusive` is true, deselects
all other items (single-select mode).

```typescript
// Single selection
dataManager.setSelectedItems('1');

// Multiple selection
dataManager.setSelectedItems(['1', '2']);

// Exclusive selection (single-select mode)
dataManager.setSelectedItems('3', true);
```

#### `isSelected(id: string): boolean`

Check whether an item is selected. Uses O(1) lookup for performance.

```typescript
if (dataManager.isSelected('1')) {
  console.log('Item 1 is selected');
}
```

#### `clearSelections(): void`

Clear all selections efficiently.

```typescript
dataManager.clearSelections();
```

### Hierarchy Methods

#### `getItemChildren(id: string): AddSelectItem[]`

Get direct children of a node.

```typescript
const children = dataManager.getItemChildren('parent-id');
```

#### `getItemParent(id: string): AddSelectItem | undefined`

Get the parent of a node.

```typescript
const parent = dataManager.getItemParent('child-id');
```

#### `getItemParents(id: string): AddSelectItem[]`

Get all ancestors (parents up to the root) of a node.

```typescript
const ancestors = dataManager.getItemParents('deeply-nested-id');
```

#### `hasChildren(id: string): boolean`

Check if an item has children.

```typescript
if (dataManager.hasChildren('1')) {
  console.log('Item has children');
}
```

#### `getItemDepth(id: string): number`

Get the depth/level of an item in the hierarchy (0 for root level). Returns -1
if item not found. This method is cached for performance.

```typescript
const depth = dataManager.getItemDepth('nested-item');
```

#### `getItemDescendants(id: string): AddSelectItem[]`

Get all descendant items of a node (children, grandchildren, etc.).

```typescript
const descendants = dataManager.getItemDescendants('parent-id');
```

#### `hasSelectedDescendants(id: string, selectedIds?: Set<string>): boolean`

Check if an item has any selected descendants. Optimized for performance.

```typescript
if (dataManager.hasSelectedDescendants('parent-id')) {
  console.log('Parent has selected descendants');
}
```

#### `allDescendantsSelected(id: string, selectedIds?: Set<string>): boolean`

Check if all descendants of an item are selected. Optimized for performance.

```typescript
if (dataManager.allDescendantsSelected('parent-id')) {
  console.log('All descendants are selected');
}
```

#### `getAllDescendantIds(id: string): string[]`

Get all descendant IDs from an item (including the item itself).

```typescript
const allIds = dataManager.getAllDescendantIds('parent-id');
```

#### `getTopLevelSelectedItems(selectedIds?: Set<string>): AddSelectItem[]`

Get only top-level selected items (items without selected ancestors). Useful for
getting the minimal set of selected items.

```typescript
const topLevel = dataManager.getTopLevelSelectedItems();
```

### Status Methods

#### `getItemStatus(id: string): ItemStatus | undefined`

Retrieve the selected state status of an item. Status can be 'checked',
'unchecked', or 'indeterminate'.

```typescript
const status = dataManager.getItemStatus('1');
```

#### `setItemStatus(id: string, status: ItemStatus): boolean`

Set or update the status of an item. Returns `true` if successful, `false` if
item not found.

```typescript
const updated = dataManager.setItemStatus('1', 'checked');
```

### Search and Sort Methods

#### `search(query: string, options?: SearchOptions): AddSelectItem[]`

Search items based on a query and return matching items.

```typescript
// Basic search
const results = dataManager.search('search term');

// Case-sensitive search
const results = dataManager.search('Search Term', { caseSensitive: true });

// Search in specific fields
const results = dataManager.search('term', {
  searchFields: ['title', 'value', 'subtitle'],
});

// Limit results
const results = dataManager.search('term', { maxResults: 10 });
```

**SearchOptions:**

- `caseSensitive?: boolean` - Default: `false`
- `searchFields?: string[]` - Default: `['title', 'value']`
- `maxResults?: number` - Maximum number of results to return

#### `sort(compareFn: (a: AddSelectItem, b: AddSelectItem) => number, recursive?: boolean): void`

Sort items based on a comparator function.

```typescript
// Sort by title
dataManager.sort((a, b) => a.title!.localeCompare(b.title!));

// Sort recursively (including children)
dataManager.sort((a, b) => a.title!.localeCompare(b.title!), true);
```

## Complete Usage Example

```typescript
// Import from main packages (not directly from utilities)
import { AddSelectData, AddSelectItem } from '@carbon/ibm-products';
// or
import {
  AddSelectData,
  AddSelectItem,
} from '@carbon/ibm-products-web-components';

// Initialize the data manager
const dataManager = new AddSelectData();

// Set up hierarchical data
const items: AddSelectItem[] = [
  {
    id: '1',
    title: 'California',
    value: 'ca',
    subtitle: 'West Coast',
    children: {
      entries: [
        { id: '1-1', title: 'Los Angeles', value: 'la' },
        { id: '1-2', title: 'San Francisco', value: 'sf' },
      ],
    },
  },
  {
    id: '2',
    title: 'Texas',
    value: 'tx',
    subtitle: 'South',
  },
];

dataManager.setItems(items);

// Select an item
dataManager.setSelectedItems('1-1', true);

// Search for items
const searchResults = dataManager.search('los');

// Navigate hierarchy
const children = dataManager.getItemChildren('1');
const parent = dataManager.getItemParent('1-1');
const ancestors = dataManager.getItemParents('1-1');

// Check selection
if (dataManager.isSelected('1-1')) {
  console.log('Los Angeles is selected');
}

// Get depth
const depth = dataManager.getItemDepth('1-1'); // Returns 1

// Check descendants
if (dataManager.hasSelectedDescendants('1')) {
  console.log('California has selected descendants');
}

// Get top-level selections
const topLevel = dataManager.getTopLevelSelectedItems();

// Sort items
dataManager.sort((a, b) => a.title!.localeCompare(b.title!), true);
```

## Integration with React

```typescript
import { useState, useEffect } from 'react';
import { AddSelectData, AddSelectItem } from '@carbon/ibm-products';

function MyComponent() {
  const [dataManager] = useState(() => new AddSelectData());
  const [items, setItems] = useState<AddSelectItem[]>([]);

  useEffect(() => {
    dataManager.setItems(items);
  }, [items, dataManager]);

  const handleSelect = (id: string) => {
    dataManager.setSelectedItems(id, true);
    // Trigger re-render if needed
  };

  const handleSearch = (query: string) => {
    const results = dataManager.search(query);
    setItems(results);
  };

  return (
    // Your component JSX
  );
}
```

## Integration with Web Components

The utility is designed to work seamlessly with Lit-based Web Components:

```typescript
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  AddSelectData,
  AddSelectItem,
} from '@carbon/ibm-products-web-components';

@customElement('my-component')
export class MyComponent extends LitElement {
  private dataManager = new AddSelectData();

  @state()
  private items: AddSelectItem[] = [];

  constructor() {
    super();
    this.dataManager.setItems(this.items);
  }

  private handleSearch(query: string) {
    this.items = this.dataManager.search(query);
  }

  private handleSelect(id: string) {
    this.dataManager.setSelectedItems(id, true);
    this.requestUpdate();
  }

  render() {
    return html` <!-- Your component template --> `;
  }
}
```

## Performance Optimizations

The AddSelectData utility includes several performance optimizations:

1. **O(1) Lookups**: Uses internal Maps for constant-time item retrieval
2. **Memoization**: Caches selected items to avoid repeated calculations
3. **Depth Caching**: Caches item depths for efficient hierarchy traversal
4. **Set-based Selection**: Uses Set for O(1) selection checks
5. **Early Termination**: Search can terminate early with `maxResults` option

## Benefits

1. **Framework Agnostic**: Works with any JavaScript framework or vanilla JS
2. **Type Safe**: Full TypeScript support with comprehensive type definitions
3. **Efficient**: Uses internal maps and caching for O(1) lookups
4. **Flexible**: Supports custom properties and extensible data structures
5. **Comprehensive**: Covers all common hierarchical data operations
6. **Well Tested**: Includes comprehensive unit tests
7. **Production Ready**: Optimized for performance with memoization and caching

## Testing

The utility includes comprehensive unit tests covering all methods. Run tests
with:

```bash
yarn test -- add-select-data.spec.ts
```
