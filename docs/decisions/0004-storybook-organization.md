# 4. Storybook Organization Standards

Date: 2026-02-12

## Status

Proposed

## Context

Storybook serves as the primary documentation and development environment for
Carbon components across both React and Web Components packages. However, the
current organization and implementation patterns have several challenges:

- **Developer experience**: The code tab in Storybook often shows irrelevant
  wrapper code or multiple component instances, or wrongly formatted code.
  making it difficult to copy and use examples directly.
- **Control panel clutter**: All component props are shown in controls
  regardless of story relevance, creating confusion about which props apply to
  specific use cases.

These issues impact both maintainer and consumer developers trying to document,
understand, and use components.

## Decision

We will adopt the following standards for organizing and writing Storybook
stories, organized around two primary goals:

## 1. Every Story Should Have Operable Controls

**Goal**: Maximize the utility of Storybook's interactive controls to help
developers understand and experiment with component behavior.

### Default Stories: Maximum Control Availability

Default stories should expose as many controls as possible to give developers
full flexibility to explore component capabilities. this includes all the props
that are relevant to the component.

### Variant Stories: Focused, Relevant Controls

Non-default variant stories should limit controls to only those relevant to the
specific variant being demonstrated. we have to mark them as `readonly` to
prevent accidental changes to the component's behavior. but still convey the
intent of making the props non-modifiable.

```typescript
Default.argTypes = {
  ...sharedArgTypes,
  kind: {
    table: { readonly: true }, // prefer to use `readonly` to still convey the variant prop requirement
  },
};
```

**Rationale**: Default stories serve as the primary exploration point, so
maximum control availability helps developers understand the full component API.
Variant stories demonstrate specific use cases, so limiting controls to relevant
props reduces cognitive load and prevents confusion about which props apply to
that variant.

### Optionally, use control categories for clarity (compound components)

For compound components with multiple sub-components, categories can be used to
organize controls clearly.

```typescript
argTypes: {
  ...sharedArgTypes,
  childProp: {
    control: 'text',
    table: {
      category: 'sub-component',
    },
  },
};
```

**Rationale**: Categorization maintains clarity while keeping all relevant
controls accessible, helping developers understand the relationship between
parent and child component props.

### Only Use argType Overrides When Necessary

Leverage Storybook's automatic type inference from TypeScript definitions and
JSDoc comments.

**React Components**:

```typescript
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button, // ✅ Enables automatic TypeDoc extraction
  argTypes: sharedArgTypes, // For overrides/additions
};
```

**Web Components**:

```typescript
export default {
  title: 'Components/Button',
  component: 'cds-button', // ✅ Enables automatic TypeDoc extraction
  tags: ['autodocs'],
};
```

Manual argTypes should only be added when you need to:

- **Hide any internal/unwanted controls from the table**:
  `table: { disable: true }`
- **Making controls readonly for variant stories**: `table: { readonly: true }`
- **Specify action handlers**: `action: 'onClick'`
- **Provide default values for the docs table if not auto inferred**:
  `table: { defaultValue: { summary: 'value' } }`
- **Override inferred control types**: When automatic inference doesn't match
  the desired control
- **Add additional descriptions not in TypeScript**: When additional context is
  needed beyond TSDoc comments.
- ...etc

Note: in web-components, the component parameter in the default meta may have
not been purposefully defined in some components. as enabling them puts the
props in separate categories for attributes and properties inconsistently.

Note: Make sure the types and defaultValues are correct. Sometimes they may be
displayed incorrectly. in such cases, they need to be manually verified and
updated in the Args table.

**Example**:

```typescript
argTypes: {
  // Hide internal prop from controls
  internalState: {
    table: { disable: true },
  },
  // Make prop readonly for variant stories
  kind: {
    table: { readonly: true },
  },
  // Specify action for event handler
  onClick: {
    action: 'clicked',
  },
  // Provide default value for documentation if needed
  size: {
    table: {
      defaultValue: { summary: 'md' },
    },
  },
};
```

**Rationale**: TypeScript definitions already contain comprehensive type
information. By referencing the component in meta, Storybook automatically
extracts this information for controls and documentation. Minimizing manual
argTypes reduces duplication and maintenance burden while still allowing
necessary customization.

## 2. The Code Tab Should Be Copy-Pastable

**Goal**: Ensure the code shown in Storybook's code tab is clean, practical, and
ready to use in real applications.

### Avoid Wrapper Code When Practical

Minimize wrapper code in story renders to keep the code tab focused on the
component itself. Use decorators for necessary wrappers to prevent them from
appearing in the code tab.

use [source type](https://storybook.js.org/docs/api/doc-blocks/doc-block-source)
to format the source code in code tab if necessary.

```typescript
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
```

**When to use decorators**:

- Layout containers that aren't part of the component's actual usage
- Theme providers or context wrappers needed for the story to function
- Styling wrappers purely for Storybook presentation

**When wrapper code is acceptable**:

- The wrapper is part of the actual component usage pattern (e.g., form
  elements)
- The wrapper provides essential context that developers need to understand
  (e.g., data providers)

**Example using decorators**:

```typescript
export const Default = {
  args: {
    // ...
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};
```

**Rationale**: The code tab is most valuable when it shows exactly what
developers need to implement. Excessive wrapper code reduces this utility, but
some wrappers provide important context about how components should be used.

### Avoid Multiple Single-Component Instances

Each story should render only one component instance, unless showing multiple
instances is the point of the story (e.g., demonstrating consistency across
layers or themes).

**Acceptable multiple instances**:

```typescript
// ✅ Multiple instances sharing controls to demonstrate consistency
export const Layers = {
  render: (args) => (
    <>
      <Button {...args} />
      <Button {...args} />
    </>
  ),
};
```

**Avoid**:

```typescript
// ❌ Multiple unrelated component instances
export const Example = {
  render: () => (
    <>
      <Button>Primary</Button>
      <Button kind="secondary">Secondary</Button>
      <Button kind="tertiary">Tertiary</Button>
    </>
  ),
};
```

**Exception for compound components**: Components like Tabs that require
multiple child components to function are acceptable and expected.

**Rationale**: Single-instance stories produce cleaner, more focused code in the
code tab. When multiple instances are needed to demonstrate a concept (like
consistency), they should share control state to make the demonstration clear.

### Prefer Controls Over Hardcoded Props

Use control args instead of hardcoding prop values to enable live code
generation and interactive exploration. for developers.

Also make sure to map actions to every interactive elements.

**Preferred**:

```typescript
export const Default = {
  args: {
    disabled: false,
    size: 'md',
  },
};
```

**Avoid**:

```typescript
export const Default = {
  render: () => <Button disabled={false} size="md" />,
};
```

**Rationale**: Live code generation is crucial for developer experience. When
users modify controls, they should see the resulting code update in real-time.
This is particularly important for Web Components where this pattern may be more
established in React stories.

### Miscellaneous

Always wrap any components on the Docs page with the **Storybook Unstyled
block**. Rendering stories directly can cause Storybook styles to bleed into
components and break their appearance.
https://storybook.js.org/docs/api/doc-blocks/doc-block-unstyled This wrapper
ensures clean, isolated, and accurate component previews.

## Consequences

### Positive

- **Improved developer experience**: Cleaner code tab output, focused controls,
  and live code generation make it easier to understand and use components.
- **Reduced maintenance burden**: Leveraging automatic type inference minimizes
  duplicate documentation while still allowing necessary customization.
- **Clearer component usage**: Story-specific control visibility helps users
  understand which props are relevant for each use case.
- **More practical examples**: Copy-pastable code reduces friction in adopting
  and implementing components.
- **Consistent patterns**: Standardized approach across React and Web Components
  packages improves maintainability.

### Negative

- **Migration effort**: Existing stories need to be updated to follow these
  patterns, requiring refactoring work.
- **Judgment calls required**: Team members need to understand when to use
  decorators vs. inline wrappers, and which controls to show for each variant.

### Neutral

- **TypeScript requirement**: This approach works best with well-maintained
  TypeScript definitions and JSDoc comments, which should already be a best
  practice.
- **Storybook version dependency**: Automatic type inference requires recent
  Storybook versions with proper TypeScript support.
