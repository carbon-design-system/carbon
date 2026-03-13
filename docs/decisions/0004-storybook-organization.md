# 4. Storybook Organization Standards

Date: 2026-02-12

## Status

Proposed

## Context

Storybook serves as the primary documentation and development environment for
Carbon components across React and Web Components packages. Current
implementation patterns have several issues:

- Code tab shows irrelevant wrapper code or multiple component instances, making
  examples difficult to copy and use
- Control panel displays all props regardless of story relevance, creating
  confusion about which props apply to specific use cases

These issues impact both maintainers and consumers trying to document,
understand, and use components.

## Decision

We will adopt the following standards for organizing Storybook stories:

### 1. Every Story Should Have Operable Controls

**Default stories** expose maximum controls to give developers full flexibility
exploring component capabilities.

**Variant stories** limit controls to only those relevant to the specific
variant. Mark variant-defining props as `readonly`:

```typescript
Default.argTypes = {
  ...sharedArgTypes,
  kind: {
    table: { readonly: true },
  },
};
```

**Control categories** can organize props for compound components with multiple
sub-components:

```typescript
argTypes: {
  ...sharedArgTypes,
  childProp: {
    control: 'text',
    table: {
      category: 'sub-component-name',
    },
  },
};
```

**Leverage automatic type inference** from TypeScript definitions and JSDoc
comments wherever possible. Only add manual argTypes when needed to:

- Hide internal/unwanted controls: `table: { disable: true }`
- Make controls readonly for variants: `table: { readonly: true }`
- Specify action handlers: `action: 'onClick'`
- Provide default values if not auto-inferred
- Override inferred control types
- Add descriptions beyond TSDoc comments

```typescript
// React
export default {
  title: 'Components/Button',
  component: Button, // Enables automatic TypeDoc extraction
  argTypes: sharedArgTypes,
};

// Web Components
export default {
  title: 'Components/Button',
  component: 'cds-button', // Enables automatic TypeDoc extraction
  tags: ['autodocs'],
};
```

**Note:** In Web Components, the component parameter may not be defined in some
components, as enabling it can inconsistently categorize props into attributes
and properties. Verify types and defaultValues are correct in the Args table, as
they may display incorrectly and require manual updates.

### 2. The Code Tab Should Be Copy-Pastable

**Minimize wrapper code** in story renders. Use decorators for necessary
wrappers to prevent them appearing in the code tab. Use
[source type](https://storybook.js.org/docs/api/doc-blocks/doc-block-source)
`parameters.docs.source.type: 'code'` if needed to format source code.

```typescript
parameters: {
  docs: {
    source: {
      type: 'code',
    },
  },
},
```

**When to use decorators:**

- Layout containers not part of actual component usage
- Theme providers or context wrappers needed for story function
- Styling wrappers purely for Storybook presentation

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

**When wrapper code is acceptable:**

- The wrapper is part of actual component usage pattern (e.g., form elements)
- The wrapper provides essential context developers need to understand (e.g.,
  data providers)

**Single component instances** per story unless demonstrating consistency across
layers/themes:

```typescript
// ✅ Acceptable: Multiple instances sharing controls
export const Layers = {
  render: (args) => (
    <>
      <Button {...args} />
      <Button {...args} />
    </>
  ),
};

// ❌ Avoid: Multiple unrelated instances
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

Exception: compound components requiring multiple children (e.g., Tabs).

**Prefer controls over hardcoded props** to enable live code generation:

```typescript
// ✅ Preferred
export const Default = {
  args: {
    disabled: false,
    size: 'md',
  },
};

// ❌ Avoid
export const Default = {
  render: () => <Button disabled={false} size="md" />,
};
```

**Additional guidelines:**

- Wrap components on Docs page with
  [Storybook Unstyled block](https://storybook.js.org/docs/api/doc-blocks/doc-block-unstyled)
  to prevent style bleed. Add theme background to show component in theme
  context
- Map events to Storybook actions for Actions tab population instead of console
  logs

## Consequences

**Positive:**

- Cleaner code tab output and focused controls improve developer experience
- Automatic type inference reduces maintenance burden
- Story-specific control visibility clarifies relevant props for each use case
- Copy-pastable code reduces friction in component adoption
- Consistent patterns across React and Web Components improve maintainability

**Negative:**

- Existing stories require refactoring to follow these patterns
- Team members need judgment on when to use decorators vs. inline wrappers

**Neutral:**

- Requires well-maintained TypeScript definitions and JSDoc comments
- Depends on recent Storybook versions with proper TypeScript support
