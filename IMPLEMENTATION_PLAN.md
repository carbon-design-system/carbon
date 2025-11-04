# Implementation Plan: Marker Type Support for Unordered Lists

## Overview
Add support for different list marker types (`disc`, `circle`, `square`, `hyphen`, `custom`) to the unordered list component across both React (`@carbon/react`) and Web Components (`@carbon/web-components`).

## Requirements Checklist
- ✅ Prop name: `type` accepting `'disc' | 'circle' | 'square' | 'hyphen' | 'custom'`
- ✅ Custom marker prop: `customMarker` (string)
- ✅ Default: hyphen for top-level, square for level-2 (with deprecation warning)
- ⚠️ Nesting: child lists inherit parent's type unless overridden (Web Components ✅, React needs improvement)
- ✅ CSS approach: use `list-style-type` for disc/circle/square, `::before` for hyphen/custom
- ✅ Backward compatible

---

## 1. SCSS/CSS Changes

### File: `packages/styles/scss/components/list/_list.scss`

#### Current State (Before Changes)
```scss
// Unordered list - original implementation
.#{$prefix}--list--unordered > .#{$prefix}--list__item {
  position: relative;

  &::before {
    position: absolute;
    // – en dash
    content: '\002013';
    inset-inline-start: calc(-1 * #{$spacing-05});
  }
}

.#{$prefix}--list--unordered.#{$prefix}--list--nested
  > .#{$prefix}--list__item::before {
  // ▪ square
  content: '\0025AA';
  // offset to account for smaller ▪ vs –
  inset-inline-start: calc(-1 * #{$spacing-04});
}
```

#### Changes to Add

**Step 1.1:** Add native list-style-type overrides at the top of the mixin (after line 31)
```scss
  // Allow native list-style-type for disc, circle, square markers
  // Override list-style: none for these marker types
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-disc {
    list-style-type: disc;
  }

  .#{$prefix}--list--unordered.#{$prefix}--list--marker-circle {
    list-style-type: circle;
  }

  .#{$prefix}--list--unordered.#{$prefix}--list--marker-square {
    list-style-type: square;
  }
```

**Step 1.2:** Update existing unordered list styles (around line 94-113) with comments
```scss
  // Unordered list marker types
  // Default behavior (backward compatible): hyphen for top-level, square for nested
  .#{$prefix}--list--unordered > .#{$prefix}--list__item {
    position: relative;

    &::before {
      position: absolute;
      // – en dash (default for top-level)
      content: '\002013';
      inset-inline-start: calc(-1 * #{$spacing-05});
    }
  }

  .#{$prefix}--list--unordered.#{$prefix}--list--nested
    > .#{$prefix}--list__item::before {
    // ▪ square (default for nested, backward compatible)
    content: '\0025AA';
    // offset to account for smaller ▪ vs –
    inset-inline-start: calc(-1 * #{$spacing-04});
  }
```

**Step 1.3:** Add marker type classes (after line 113)
```scss
  // Marker type: disc
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-disc {
    > .#{$prefix}--list__item {
      &::before {
        content: none;
      }
    }
  }

  // Marker type: circle
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-circle {
    > .#{$prefix}--list__item {
      &::before {
        content: none;
      }
    }
  }

  // Marker type: square
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-square {
    > .#{$prefix}--list__item {
      &::before {
        content: none;
      }
    }
  }

  // Marker type: hyphen (explicit)
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-hyphen
    > .#{$prefix}--list__item {
    &::before {
      position: absolute;
      // – en dash
      content: '\002013';
      inset-inline-start: calc(-1 * #{$spacing-05});
    }
  }

  // Marker type: custom
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-custom
    > .#{$prefix}--list__item {
    position: relative;

    &::before {
      position: absolute;
      // Custom marker content will be set via CSS custom property
      content: var(--#{$prefix}--list--marker-content, '\002013');
      inset-inline-start: calc(-1 * #{$spacing-05});
    }
  }

  // Nested lists with marker types
  // When nested and marker type is specified, adjust spacing for pseudo-elements
  .#{$prefix}--list--unordered.#{$prefix}--list--nested.#{$prefix}--list--marker-hyphen
    > .#{$prefix}--list__item::before {
    inset-inline-start: calc(-1 * #{$spacing-05});
  }

  .#{$prefix}--list--unordered.#{$prefix}--list--nested.#{$prefix}--list--marker-custom
    > .#{$prefix}--list__item::before {
    inset-inline-start: calc(-1 * #{$spacing-05});
  }

  // For nested lists with disc/circle/square, use smaller offset if needed
  .#{$prefix}--list--unordered.#{$prefix}--list--nested.#{$prefix}--list--marker-disc,
  .#{$prefix}--list--unordered.#{$prefix}--list--nested.#{$prefix}--list--marker-circle,
  .#{$prefix}--list--unordered.#{$prefix}--list--nested.#{$prefix}--list--marker-square {
    // These use native list-style-type, so no special spacing needed
  }
```

#### Nesting Handling in CSS
- **Native markers (disc/circle/square):** Use `list-style-type` - browser handles nesting automatically
- **Pseudo-element markers (hyphen/custom):** Need explicit spacing adjustments for nested lists
- **Default behavior:** Maintains backward compatibility (hyphen for top-level, square for nested)

---

## 2. React Component Changes

### File: `packages/react/src/components/UnorderedList/UnorderedList.tsx`

#### Current State (Before Changes)
```typescript
export interface UnorderedListProps extends ComponentProps<'ul'> {
  nested?: boolean | undefined;
  isExpressive?: boolean | undefined;
}

export default function UnorderedList({
  className,
  nested = false,
  isExpressive = false,
  ...other
}: UnorderedListProps) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--list--unordered`, className, {
    [`${prefix}--list--nested`]: nested,
    [`${prefix}--list--expressive`]: isExpressive,
  });
  return <ul className={classNames} {...other} />;
}
```

#### Changes to Add

**Step 2.1:** Add TypeScript type definition (after line 12, before interface)
```typescript
export type UnorderedListMarkerType =
  | 'disc'
  | 'circle'
  | 'square'
  | 'hyphen'
  | 'custom';
```

**Step 2.2:** Update interface to include new props
```typescript
export interface UnorderedListProps extends ComponentProps<'ul'> {
  nested?: boolean | undefined;
  isExpressive?: boolean | undefined;
  type?: UnorderedListMarkerType | undefined;
  customMarker?: string | undefined;
}
```

**Step 2.3:** Import necessary hooks and utilities
```typescript
import React, { type ComponentProps, useEffect, useRef } from 'react';
import { warning } from '../../internal/warning';
```

**Step 2.4:** Update component function signature
```typescript
export default function UnorderedList({
  className,
  nested = false,
  isExpressive = false,
  type,
  customMarker,
  style,
  ...other
}: UnorderedListProps) {
```

**Step 2.5:** Add marker type logic and deprecation warning
```typescript
  const prefix = usePrefix();
  const hasWarnedRef = useRef(false);

  // Determine marker type: use provided type, or default based on nesting
  const markerType: UnorderedListMarkerType | undefined =
    type ||
    (nested ? 'square' : 'hyphen');

  // Show deprecation warning for nested lists without explicit type
  useEffect(() => {
    if (
      nested &&
      !type &&
      !hasWarnedRef.current &&
      process.env.NODE_ENV !== 'production'
    ) {
      warning(
        false,
        'Nested unordered lists without an explicit `type` prop will default to ' +
          'square markers. This behavior is deprecated. Please explicitly set ' +
          '`type="square"` (or another marker type) for nested lists. ' +
          'In the next major release, nested lists will inherit the parent list\'s marker type.'
      );
      hasWarnedRef.current = true;
    }
  }, [nested, type]);

  // Build class names
  const classNames = classnames(
    `${prefix}--list--unordered`,
    className,
    {
      [`${prefix}--list--nested`]: nested,
      [`${prefix}--list--expressive`]: isExpressive,
      [`${prefix}--list--marker-${markerType}`]: markerType,
    }
  );

  // Build styles for custom marker
  const customStyles: React.CSSProperties = {
    ...style,
    ...(markerType === 'custom' && customMarker
      ? {
          [`--${prefix}--list--marker-content`]: `'${customMarker}'`,
        }
      : {}),
  };

  return (
    <ul className={classNames} style={customStyles} {...other} />
  );
}
```

**Step 2.6:** Update PropTypes
```typescript
UnorderedList.propTypes = {
  // ... existing propTypes ...
  
  /**
   * Specify the marker type for the list items.
   * - `disc`: filled circle (•)
   * - `circle`: hollow circle (○)
   * - `square`: filled square (▪)
   * - `hyphen`: en dash (default for top-level lists) (–)
   * - `custom`: custom marker (requires `customMarker` prop)
   *
   * When not specified:
   * - Top-level lists default to `hyphen`
   * - Nested lists default to `square` (deprecated - will inherit parent type in next major release)
   */
  type: PropTypes.oneOf(['disc', 'circle', 'square', 'hyphen', 'custom']),

  /**
   * Specify a custom marker character/content.
   * Only used when `type="custom"`.
   * The value will be used as the CSS content for the marker.
   */
  customMarker: PropTypes.string,
};
```

#### Notes on React Implementation
- **Parent inheritance:** Currently defaults to `'square'` for nested lists. Future enhancement: Use React Context to pass parent's `type` down.
- **Deprecation warning:** Only shown in development mode, once per component instance.

---

## 3. Web Components Changes

### File: `packages/web-components/src/components/list/unordered-list.ts`

#### Current State (Before Changes)
```typescript
@customElement(`${prefix}-unordered-list`)
class CDSUnorderedList extends LitElement {
  @property({ type: Boolean, reflect: true, attribute: 'is-expressive' })
  isExpressive = false;

  @property({ type: Boolean })
  nested = false;

  connectedCallback() {
    if (
      this.closest(
        (this.constructor as typeof CDSUnorderedList).selectorListItem
      ) ||
      this.nested
    ) {
      this.setAttribute('slot', 'nested');
    } else {
      this.removeAttribute('slot');
    }
    super.connectedCallback();
  }

  render() {
    const classes = classMap({
      [`${prefix}--list--unordered`]: true,
      [`${prefix}--list--nested`]:
        this.getAttribute('slot') === 'nested' || this.nested,
      [`${prefix}--list--expressive`]: this.isExpressive,
    });
    return html`
      <ul class="${classes}">
        <slot></slot>
      </ul>
    `;
  }
}
```

#### Changes to Add

**Step 3.1:** Add TypeScript type definition (after imports, before class)
```typescript
export type UnorderedListMarkerType =
  | 'disc'
  | 'circle'
  | 'square'
  | 'hyphen'
  | 'custom';
```

**Step 3.2:** Add new properties with decorators
```typescript
  /**
   * Specify the marker type for the list items.
   * - `disc`: filled circle (•)
   * - `circle`: hollow circle (○)
   * - `square`: filled square (▪)
   * - `hyphen`: en dash (default for top-level lists) (–)
   * - `custom`: custom marker (requires `customMarker` attribute)
   */
  @property({ reflect: true })
  type?: UnorderedListMarkerType;

  /**
   * Specify a custom marker character/content.
   * Only used when `type="custom"`.
   * The value will be used as the CSS content for the marker.
   */
  @property({ attribute: 'custom-marker' })
  customMarker?: string;

  private _hasWarnedAboutDeprecation = false;
```

**Step 3.3:** Update `connectedCallback` to include deprecation warning
```typescript
  connectedCallback() {
    if (
      this.closest(
        (this.constructor as typeof CDSUnorderedList).selectorListItem
      ) ||
      this.nested
    ) {
      this.setAttribute('slot', 'nested');
    } else {
      this.removeAttribute('slot');
    }

    // Show deprecation warning for nested lists without explicit type
    if (
      (this.getAttribute('slot') === 'nested' || this.nested) &&
      !this.type &&
      !this._hasWarnedAboutDeprecation &&
      process.env.NODE_ENV !== 'production'
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        'Nested unordered lists without an explicit `type` attribute will default to ' +
          'square markers. This behavior is deprecated. Please explicitly set ' +
          '`type="square"` (or another marker type) for nested lists. ' +
          'In the next major release, nested lists will inherit the parent list\'s marker type.'
      );
      this._hasWarnedAboutDeprecation = true;
    }

    super.connectedCallback();
  }
```

**Step 3.4:** Add marker type inheritance method
```typescript
  /**
   * Get the effective marker type, considering inheritance from parent
   */
  private _getMarkerType(): UnorderedListMarkerType {
    if (this.type) {
      return this.type;
    }

    // Check if nested and try to inherit from parent
    const isNested =
      this.getAttribute('slot') === 'nested' || this.nested;
    
    if (isNested) {
      // Try to get parent's type
      const parentList = this.closest(
        (this.constructor as typeof CDSUnorderedList).selectorUnorderedList
      ) as CDSUnorderedList | null;
      
      if (parentList?.type) {
        return parentList.type;
      }
      
      // Default to square for nested (backward compatible)
      return 'square';
    }

    // Default to hyphen for top-level
    return 'hyphen';
  }
```

**Step 3.5:** Update `render` method
```typescript
  render() {
    const markerType = this._getMarkerType();
    const isNested =
      this.getAttribute('slot') === 'nested' || this.nested;

    const classes = classMap({
      [`${prefix}--list--unordered`]: true,
      [`${prefix}--list--nested`]: isNested,
      [`${prefix}--list--expressive`]: this.isExpressive,
      [`${prefix}--list--marker-${markerType}`]: markerType,
    });

    // Set custom marker CSS variable if needed
    const customStyle =
      markerType === 'custom' && this.customMarker
        ? {
            [`--${prefix}--list--marker-content`]: `'${this.customMarker}'`,
          }
        : {};

    return html`
      <ul
        class="${classes}"
        style="${Object.entries(customStyle)
          .map(([key, value]) => `${key}: ${value}`)
          .join('; ')}"
      >
        <slot></slot>
      </ul>
    `;
  }
```

**Step 3.6:** Add static selector for parent lookup
```typescript
  /**
   * A selector that will return unordered list.
   */
  static get selectorUnorderedList() {
    return `${prefix}-unordered-list`;
  }
```

#### Notes on Web Components Implementation
- **Parent inheritance:** ✅ Fully implemented using DOM traversal
- **Attribute reflection:** `type` property reflects to attribute for CSS selectors
- **Custom marker:** Uses CSS custom property set via inline style

---

## 4. Web Components SCSS Changes

### File: `packages/web-components/src/components/list/list.scss`

#### Current State (Before Changes)
```scss
// unordered list
:host(#{$prefix}-unordered-list) {
  // – en dash
  --#{$prefix}-ce--list-marker: '\002013';

  &[slot='nested'] {
    // ▪ square
    --#{$prefix}-ce--list-marker: '\0025AA';
  }
}

:host(#{$prefix}-unordered-list) ::slotted(#{$prefix}-list-item) {
  position: relative;

  &::before {
    position: absolute;
    // – en dash
    content: '\002013';
    inset-inline-start: calc(-1 * #{$spacing-05});
  }
}

:host(#{$prefix}-unordered-list[nested]),
:host(#{$prefix}-unordered-list[slot='nested']) {
  ::slotted(#{$prefix}-list-item)::before {
    // ▪ square
    content: '\0025AA';
    // offset to account for smaller ▪ vs –
    inset-inline-start: calc(-1 * #{$spacing-04});
  }
}
```

#### Changes to Add

**Step 4.1:** Update comments (around line 50-81)
```scss
// unordered list
// Default behavior (backward compatible): hyphen for top-level, square for nested
:host(#{$prefix}-unordered-list) {
  // – en dash (default for top-level)
  --#{$prefix}-ce--list-marker: '\002013';

  &[slot='nested'] {
    // ▪ square (default for nested, backward compatible)
    --#{$prefix}-ce--list-marker: '\0025AA';
  }
}
```

**Step 4.2:** Add marker type styles (after line 81)
```scss
// Marker type: disc
:host(#{$prefix}-unordered-list[type='disc']) {
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-disc {
    list-style-type: disc;
  }

  ::slotted(#{$prefix}-list-item)::before {
    content: none;
  }
}

// Marker type: circle
:host(#{$prefix}-unordered-list[type='circle']) {
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-circle {
    list-style-type: circle;
  }

  ::slotted(#{$prefix}-list-item)::before {
    content: none;
  }
}

// Marker type: square
:host(#{$prefix}-unordered-list[type='square']) {
  .#{$prefix}--list--unordered.#{$prefix}--list--marker-square {
    list-style-type: square;
  }

  ::slotted(#{$prefix}-list-item)::before {
    content: none;
  }
}

// Marker type: hyphen (explicit)
:host(#{$prefix}-unordered-list[type='hyphen']) {
  --#{$prefix}-ce--list-marker: '\002013';

  ::slotted(#{$prefix}-list-item)::before {
    content: '\002013';
    inset-inline-start: calc(-1 * #{$spacing-05});
  }

  &[nested],
  &[slot='nested'] {
    ::slotted(#{$prefix}-list-item)::before {
      inset-inline-start: calc(-1 * #{$spacing-05});
    }
  }
}

// Marker type: custom
:host(#{$prefix}-unordered-list[type='custom']) {
  ::slotted(#{$prefix}-list-item)::before {
    // Custom marker content will be set via CSS custom property
    content: var(--#{$prefix}--list--marker-content, '\002013');
    inset-inline-start: calc(-1 * #{$spacing-05});
  }

  &[nested],
  &[slot='nested'] {
    ::slotted(#{$prefix}-list-item)::before {
      inset-inline-start: calc(-1 * #{$spacing-05});
    }
  }
}
```

---

## 5. Storybook Stories

### File: `packages/react/src/components/UnorderedList/UnorderedList.stories.js`

#### Changes to Add

**Step 5.1:** Update `Default.argTypes` to include new props
```javascript
Default.argTypes = {
  isExpressive: {
    control: {
      type: 'boolean',
    },
  },
  type: {
    control: {
      type: 'select',
    },
    options: ['disc', 'circle', 'square', 'hyphen', 'custom'],
  },
  customMarker: {
    control: {
      type: 'text',
    },
    if: { arg: 'type', eq: 'custom' },
  },
};
```

**Step 5.2:** Add new story for marker types
```javascript
export const MarkerTypes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Disc (default filled circle)</h3>
        <UnorderedList type="disc">
          <ListItem>Item with disc marker</ListItem>
          <ListItem>Item with disc marker</ListItem>
          <ListItem>Item with disc marker</ListItem>
        </UnorderedList>
      </div>
      <div>
        <h3>Circle (hollow circle)</h3>
        <UnorderedList type="circle">
          <ListItem>Item with circle marker</ListItem>
          <ListItem>Item with circle marker</ListItem>
          <ListItem>Item with circle marker</ListItem>
        </UnorderedList>
      </div>
      <div>
        <h3>Square</h3>
        <UnorderedList type="square">
          <ListItem>Item with square marker</ListItem>
          <ListItem>Item with square marker</ListItem>
          <ListItem>Item with square marker</ListItem>
        </UnorderedList>
      </div>
      <div>
        <h3>Hyphen (default for top-level)</h3>
        <UnorderedList type="hyphen">
          <ListItem>Item with hyphen marker</ListItem>
          <ListItem>Item with hyphen marker</ListItem>
          <ListItem>Item with hyphen marker</ListItem>
        </UnorderedList>
      </div>
      <div>
        <h3>Custom marker</h3>
        <UnorderedList type="custom" customMarker="→">
          <ListItem>Item with custom arrow marker</ListItem>
          <ListItem>Item with custom arrow marker</ListItem>
          <ListItem>Item with custom arrow marker</ListItem>
        </UnorderedList>
      </div>
    </div>
  );
};

MarkerTypes.storyName = 'marker types';
```

**Step 5.3:** Add nested with marker types story
```javascript
export const NestedWithMarkerTypes = () => {
  return (
    <UnorderedList type="disc">
      <ListItem>
        Level 1 with disc
        <UnorderedList nested type="circle">
          <ListItem>Level 2 with circle</ListItem>
          <ListItem>
            Level 2 with circle
            <UnorderedList nested type="square">
              <ListItem>Level 3 with square</ListItem>
              <ListItem>Level 3 with square</ListItem>
            </UnorderedList>
          </ListItem>
        </UnorderedList>
      </ListItem>
      <ListItem>Level 1 with disc</ListItem>
      <ListItem>Level 1 with disc</ListItem>
    </UnorderedList>
  );
};

NestedWithMarkerTypes.storyName = 'nested with marker types';
```

### File: `packages/web-components/src/components/list/unordered-list.stories.ts`

Similar changes as React, but using Lit template syntax:
```typescript
const controls = {
  // ... existing controls ...
  type: {
    control: 'select',
    options: ['disc', 'circle', 'square', 'hyphen', 'custom'],
    description: 'Specify the marker type for the list items.',
  },
  customMarker: {
    control: 'text',
    description: 'Specify a custom marker character/content (only used when type="custom").',
    if: { arg: 'type', eq: 'custom' },
  },
};

export const MarkerTypes = {
  render: () =>
    html`<div style="display: flex; flex-direction: column; gap: 2rem;">
      <!-- Similar structure as React version -->
    </div>`,
};
```

---

## 6. Tests

### File: `packages/react/src/components/UnorderedList/UnorderedList-test.js`

#### Tests to Add

```javascript
it('should render with disc marker type', () => {
  render(
    <UnorderedList type="disc" data-testid="list">
      <ListItem>Item</ListItem>
    </UnorderedList>
  );
  expect(screen.getByTestId('list')).toHaveClass(
    `${prefix}--list--marker-disc`
  );
});

it('should render with circle marker type', () => {
  // Similar test
});

it('should render with square marker type', () => {
  // Similar test
});

it('should render with hyphen marker type', () => {
  // Similar test
});

it('should render with custom marker type', () => {
  render(
    <UnorderedList type="custom" customMarker="→" data-testid="list">
      <ListItem>Item</ListItem>
    </UnorderedList>
  );
  expect(screen.getByTestId('list')).toHaveClass(
    `${prefix}--list--marker-custom`
  );
  expect(screen.getByTestId('list')).toHaveStyle({
    '--cds--list--marker-content': "'→'",
  });
});

it('should default to hyphen marker for top-level lists', () => {
  render(
    <UnorderedList data-testid="list">
      <ListItem>Item</ListItem>
    </UnorderedList>
  );
  expect(screen.getByTestId('list')).toHaveClass(
    `${prefix}--list--marker-hyphen`
  );
});

it('should default to square marker for nested lists', () => {
  render(
    <UnorderedList nested data-testid="list">
      <ListItem>Item</ListItem>
    </UnorderedList>
  );
  expect(screen.getByTestId('list')).toHaveClass(
    `${prefix}--list--marker-square`
  );
});
```

### File: `packages/web-components/src/components/list/__tests__/unordered-list-test.js`

Similar tests using `@open-wc/testing`:
```javascript
it('should render with disc marker type', async () => {
  const list = html` <cds-unordered-list type="disc">
    <cds-list-item>Item</cds-list-item>
  </cds-unordered-list>`;
  const el = await fixture(list);
  const ul = el.shadowRoot.querySelector('ul');
  expect(ul.classList.contains('cds--list--marker-disc')).to.be.true;
});
```

---

## 7. Documentation

### Files to Update

1. **`packages/react/src/components/UnorderedList/UnorderedList.mdx`**
   - Add "Marker Types" section
   - Document each marker type
   - Show examples
   - Note deprecation behavior

2. **`packages/web-components/src/components/list/unordered-list.mdx`**
   - Similar content as React version

### JSDoc Comments

Already included in PropTypes and component comments:
- ✅ Type definitions have JSDoc
- ✅ Props have descriptions
- ✅ Component class has element documentation

---

## 8. Backward Compatibility

### ✅ No Breaking Changes

- **Default behavior preserved:** Top-level lists default to hyphen, nested to square
- **Existing code continues to work:** No `type` prop needed
- **CSS classes:** New classes are additive, don't override existing behavior
- **Deprecation warnings:** Only shown in development, guide users to explicit types

### Migration Path

Users can gradually adopt:
1. Continue using default behavior (no changes needed)
2. Add explicit `type` prop when needed
3. Deprecation warnings guide toward explicit types
4. Future major release: nested lists will inherit parent type

---

## 9. Implementation Checklist

### SCSS Changes
- [ ] Add native list-style-type overrides to `packages/styles/scss/components/list/_list.scss`
- [ ] Add marker type classes (disc, circle, square, hyphen, custom)
- [ ] Add nested list handling for marker types
- [ ] Update Web Components SCSS with marker type selectors

### React Component
- [ ] Add TypeScript type definition
- [ ] Add `type` and `customMarker` props
- [ ] Add marker type logic
- [ ] Add deprecation warning
- [ ] Update PropTypes
- [ ] Add CSS custom property for custom markers

### Web Components
- [ ] Add TypeScript type definition
- [ ] Add `type` and `customMarker` properties with decorators
- [ ] Add parent inheritance logic
- [ ] Add deprecation warning
- [ ] Update render method

### Stories
- [ ] Update React stories with controls
- [ ] Add marker types story (React)
- [ ] Add nested with marker types story (React)
- [ ] Update Web Components stories
- [ ] Add marker types story (Web Components)
- [ ] Add nested with marker types story (Web Components)

### Tests
- [ ] Add tests for all marker types (React)
- [ ] Add tests for default behavior (React)
- [ ] Add tests for custom marker (React)
- [ ] Add tests for all marker types (Web Components)
- [ ] Add tests for default behavior (Web Components)
- [ ] Add tests for custom marker (Web Components)
- [ ] Add tests for parent inheritance (Web Components)

### Documentation
- [ ] Update React MDX with marker types section
- [ ] Update Web Components MDX with marker types section
- [ ] Verify JSDoc comments are complete

---

## 10. Future Enhancements

### React Parent Inheritance
- Use React Context API to pass parent's `type` down the component tree
- Create `UnorderedListContext` provider
- Update nested lists to consume context when no `type` prop provided

### Potential Additional Marker Types
- `none` - no marker
- `decimal-leading-zero`
- Custom numbered markers

---

## Questions for Review

1. **Should React parent inheritance be implemented now, or deferred?**
   - Current: Defaults to square for nested
   - Proposed: Use Context API for inheritance

2. **Should we add a `markerType` prop alias for backward compatibility?**
   - Current: Only `type` prop
   - Consider: Also support `markerType` for migration

3. **Should custom markers support HTML entities or only plain text?**
   - Current: Plain text only
   - Consider: Support `&rarr;` style entities

4. **Should we add a utility function to escape custom marker content?**
   - Current: Direct string interpolation
   - Consider: Escape function for special characters

---

## Summary

This implementation plan provides:
- ✅ Complete marker type support (disc, circle, square, hyphen, custom)
- ✅ Backward compatibility
- ✅ Deprecation warnings for future migration
- ✅ Comprehensive test coverage
- ✅ Storybook examples
- ✅ Documentation updates

**Ready for review and confirmation before implementation.**

