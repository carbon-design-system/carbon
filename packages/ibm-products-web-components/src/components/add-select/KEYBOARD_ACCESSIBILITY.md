# Add Select List - Keyboard Accessibility

This document describes the keyboard accessibility implementation for the
add-select-list component.

## Overview

The add-select-list component implements full keyboard accessibility following
ARIA best practices for treegrid navigation patterns. Users can navigate and
interact with the list using only the keyboard.

## Keyboard Interactions

### Navigation Between Items

| Key              | Action                                      |
| ---------------- | ------------------------------------------- |
| `↓` (Arrow Down) | Move focus to the next item in the list     |
| `↑` (Arrow Up)   | Move focus to the previous item in the list |
| `Ctrl + Home`    | Move focus to the first item in the list    |
| `Ctrl + End`     | Move focus to the last item in the list     |

### Selection

| Key     | Action                                                          |
| ------- | --------------------------------------------------------------- |
| `Enter` | Toggle selection of the focused item (radio button or checkbox) |
| `Space` | Toggle selection of the focused item (radio button or checkbox) |

### Hierarchical Navigation

| Key               | Action                                                          |
| ----------------- | --------------------------------------------------------------- |
| `→` (Arrow Right) | Navigate into children of the focused item (if it has children) |

### Tearsheet Interactions

When the add-select component is used within a tearsheet (as in the
single-add-select example):

| Key   | Action                                                                     |
| ----- | -------------------------------------------------------------------------- |
| `Esc` | Close the tearsheet without making a selection                             |
| `Tab` | Navigate between interactive elements (search, list items, action buttons) |

**Note**: The close button in the tearsheet header may be hidden in some
implementations. Users can always close the tearsheet using the `Esc` key or the
Cancel button in the footer.

## Implementation Details

### Single Tab Stop (Roving Tabindex)

The component implements a "roving tabindex" pattern where:

- Only ONE item in the list has `tabindex="0"` at any time
- All other items have `tabindex="-1"`
- When the user navigates with arrow keys, the `tabindex="0"` moves to the newly
  focused item
- This ensures there is only one tab stop in the entire list, improving keyboard
  navigation efficiency

### Focus Management

The `add-select-list` component manages focus automatically:

- When items are added or removed, focus is maintained on the appropriate item
- If the focused item is removed, focus moves to the first item
- The list automatically updates tabindex attributes as focus changes

### Event Handling

- **Keyboard events on items**: Enter, Space, and Right Arrow are handled at the
  item level
- **Navigation events**: Arrow keys, Ctrl+Home, and Ctrl+End bubble up to the
  list level for navigation
- **Selection events**: Items emit custom events when selected/deselected

## Usage Example

```typescript
// The list automatically manages keyboard navigation
<c4p-add-select-list ?multi=${false}>
  <c4p-add-select-row
    item-id="1"
    title="Item 1"
    value="item-1"
  ></c4p-add-select-row>
  <c4p-add-select-row
    item-id="2"
    title="Item 2"
    value="item-2"
    ?has-children=${true}
  ></c4p-add-select-row>
</c4p-add-select-list>
```

**Note**: Do NOT add `tabindex` attributes to individual items. The list
component manages this automatically.

## Testing Keyboard Accessibility

To test keyboard accessibility:

1. Open the component in Storybook
2. Press `Tab` to focus the list (you should only need to press Tab once)
3. Use arrow keys to navigate between items
4. Press `Enter` or `Space` to select items
5. Press `Ctrl+Home` to jump to the first item
6. Press `Ctrl+End` to jump to the last item
7. For items with children, press `→` (Right Arrow) to navigate into them

## Accessibility Compliance

This implementation follows:

- WCAG 2.1 Level AA guidelines
- ARIA 1.2 treegrid pattern
- Carbon Design System accessibility standards

## Browser Support

Keyboard navigation is supported in:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- All modern browsers with JavaScript enabled
