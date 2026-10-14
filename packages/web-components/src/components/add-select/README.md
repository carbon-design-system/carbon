# Add Select Web Components

This directory contains web component equivalents for the React AddSelect
pattern.

## Components

### cds-add-select

The main wrapper component that provides context for child components. This
component should wrap all other add-select components and manages the `multi`
prop that determines whether the selection mode is single (radio buttons) or
multi (checkboxes).

**Properties:**

- `multi` (Boolean) - Whether this is a multi-select (checkboxes) or
  single-select (radio buttons). Default: `false`

**Slots:**

- `default` - The main content area containing cds-add-select-body

**Usage:**

```html
<cds-add-select multi>
  <cds-add-select-body>
    <!-- content -->
  </cds-add-select-body>
</cds-add-select>
```

---

### cds-add-select-body

The container/body component that contains the search, breadcrumbs, and content
area. The `multi` mode is automatically inherited from the parent
`cds-add-select` component.

**Properties:**

- `items-label` (String) - Label for items section
- `global-search-label` (String) - Global search label
- `global-search-placeholder` (String) - Global search placeholder (default:
  "Search")
- `search-results-title` (String) - Search results title (default: "Search
  results")
- `item-count` (Number) - Item count for display
- `path` (Array) - Navigation path for breadcrumbs (array of
  `{id: string, title: string}`)

**Events:**

- `cds-add-select-body-search` - Fired when search term changes. Detail:
  `{searchTerm: string}`
- `cds-add-select-body-breadcrumb-click` - Fired when breadcrumb is clicked.
  Detail: `{index: number}`

**Slots:**

- `default` - The main content area containing cds-add-select-list
- `header` - Custom header content (replaces default search and breadcrumbs)

---

### cds-add-select-list

The list component that contains selectable items with full keyboard navigation
support. The `multi` mode is automatically inherited from the parent
`cds-add-select` component.

**Properties:**

None (inherits `multi` from parent)

**Keyboard Navigation:**

- `↓` Arrow Down - Move to next item
- `↑` Arrow Up - Move to previous item
- `→` Arrow Right - Navigate into children (if item has children)
- `Enter` or `Space` - Toggle selection
- `Ctrl+Home` - Jump to first item
- `Ctrl+End` - Jump to last item

**Slots:**

- `default` - Contains cds-add-select-row components

**Note:** The list implements a roving tabindex pattern for efficient keyboard
navigation.

---

### cds-add-select-row

A single selectable item component. The `multi` mode is automatically inherited
from the parent `cds-add-select` component.

**Properties:**

- `item-id` (String) - Unique identifier for the item (required)
- `title` (String) - Item title (required)
- `subtitle` (String) - Item subtitle (optional)
- `value` (String) - Item value (required)
- `selected` (Boolean) - Whether the item is selected
- `disabled` (Boolean) - Whether the item is disabled
- `has-children` (Boolean) - Whether the item has children (shows navigation
  indicator)
- `parent-id` (String) - Parent ID for hierarchical navigation

**Events:**

- `cds-add-select-row-select` - Fired when item is selected/deselected. Detail:
  `{itemId: string, selected: boolean, value: string}`
- `cds-add-select-row-navigate` - Fired when navigating to children. Detail:
  `{itemId: string, title: string, parentId: string}`

**Slots:**

- `icon` - Optional icon slot (displayed before title)
- `meta` - Optional metadata slot (displayed after title)
- `nav-icon` - Navigation icon for items with children (defaults to
  chevron-right)

**Note:** Do not manually set `tabindex` - it is managed automatically by the
parent list component.

---

## Usage Example

```html
<cds-add-select
  open
  title="Add items"
  description="Select items to add"
  multi
  items-label="Available items"
  global-search-label="Search items">
  <cds-add-select-body>
    <cds-add-select-list multi>
      <cds-add-select-row
        item-id="item-1"
        title="Item 1"
        subtitle="Description for item 1"
        value="item-1"></cds-add-select-row>
      <cds-add-select-row
        item-id="item-2"
        title="Item 2"
        subtitle="Description for item 2"
        value="item-2"></cds-add-select-row>
    </cds-add-select-list>
  </cds-add-select-body>
</cds-add-select>
```

## Architecture

These components are designed to work together in a hierarchical structure:

```
cds-add-select (wrapper)
  └── cds-add-select-body (container)
      └── cds-add-select-list (list container)
          └── cds-add-select-row (individual items)
```

Each component handles its own state and communicates with parent components
through custom events, following the web components best practices.

## Notes

- All components use LitElement as the base class
- Styling follows Carbon Design System patterns
- Components support both single and multi-select modes
- Keyboard navigation is supported for accessibility
- Events bubble up through the component hierarchy
