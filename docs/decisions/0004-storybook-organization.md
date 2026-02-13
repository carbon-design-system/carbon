# 4. Organize Storybook for Human & MCP Friendliness

Date: 2026-02-12

## Status

Proposed

## Context

Storybook serves as the primary documentation and development environment for
Carbon components across both React and Web Components packages. However, the
current organization and implementation patterns have several challenges:

- **Inconsistent documentation**: Component properties and behaviors are
  documented in multiple places (TypeScript definitions, JSDoc comments, and
  Storybook argTypes), leading to maintenance overhead and potential
  inconsistencies.
- **Developer experience**: The code tab in Storybook often shows irrelevant
  wrapper code or multiple component instances, making it difficult to copy and
  use examples directly.
- **Limited AI/MCP accessibility**: Model Context Protocol (MCP) agents and AI
  assistants struggle to understand and generate appropriate Storybook stories
  due to inconsistent patterns and formats.
- **Control panel clutter**: All component props are shown in controls
  regardless of story relevance, creating confusion about which props apply to
  specific use cases.
- **Duplicate maintenance**: Documentation must be maintained separately in
  TypeScript definitions and Storybook configurations.

These issues impact both human developers trying to understand and use
components, and automated tools (like MCP agents) attempting to generate or
modify stories programmatically.

## Decision

We will adopt the following standards for organizing and writing Storybook
stories:

### 1. Single Source of Truth for Documentation

**Decision**: Use TypeScript definitions and JSDoc comments as the single source
of truth for component documentation. Leverage Storybook's automatic type
inference to populate argTypes.

**React Components**:

```typescript
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button, // ✅ Enables automatic TypeDoc extraction
  argTypes: sharedArgTypes, // Only for overrides/additions
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

**Rationale**: This eliminates duplicate documentation maintenance. TypeScript
definitions already contain comprehensive type information and JSDoc comments.
By referencing the component in meta, Storybook automatically extracts this
information for controls and documentation. Manual argTypes should only be added
when additional context is needed beyond what TypeScript provides.

### 2. Read-Only Props for Focused Stories

**Decision**: When a story demonstrates a specific prop or feature in a
dedicated story, make any irrelevant props read-only in other stories to prevent
confusion.

**Rationale**: High-emphasis props that warrant dedicated stories (like `kind`
having dedicated story for each) should not be modifiable in stories where
they're not relevant. This prevents users from accidentally enabling features
that aren't demonstrated in that particular story, reducing confusion and
maintaining story focus.

### 3. One Component Per Story with Shared Controls

**Decision**: Each story should render only one component instance (or multiple
instances of the same component sharing state from controls ex: layers). For
compound components, separate child component controls using categories.

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

**Rationale**: The code tab's copy functionality is most useful when it shows
only the component code users need. Multiple unrelated components or complex
wrapper code reduces utility. make use of decorator parameter for any kind of
wrapper to avoid rendering in code tab. When showing multiple instances (e.g.,
layers, themes), they should share the same control state to demonstrate
consistency. For compound components, categorizing child controls maintains
clarity while keeping all relevant controls accessible.

### 4. Contextual Control Visibility

**Decision**: Only show relevant controls for each story. Hide props that don't
apply to the story's specific use case.

**Rationale**: A Button story demonstrating icon buttons should show
icon-related props (tooltip-position, auto-align etc.), but a basic button story
should hide these. This reduces cognitive load and helps users understand which
props are relevant for each use case. It also improves the generated code in the
code tab by excluding irrelevant attributes.

### 5. Live Code Generation with Public Props

**Decision**: All stories must use public-facing props as controls to enable
live code generation in the code tab. For Web Components, create reusable
templates to avoid repetition while maintaining CSF3 format.

**Web Components Template Example**:

```typescript
const baseButtonTemplate = (args) => html`
  <cds-button
    @click=${args.onClick}
    danger-description=${ifDefined(args.dangerDescription)}
    ?disabled=${args.disabled}
    href=${ifDefined(args.href)}
    ?isExpressive=${args.isExpressive}
    kind=${ifDefined(args.kind)}
    rel=${ifDefined(args.rel)}
    link-role=${ifDefined(args.linkRole)}
    target=${ifDefined(args.target)}
    tabindex=${ifDefined(args.tabindex)}
    size=${ifDefined(args.size)}
    type=${ifDefined(args.type)}>
    Button ${args.iconSlot?.({ slot: 'icon' })}
  </cds-button>
`;

export const Default = {
  render: baseButtonTemplate,
  args: {
    disabled: false,
    // ... other args
  },
};
```

**Rationale**: Live code generation is crucial for developer experience - users
should be able to modify controls and see the resulting code update in
real-time. This is equally important for Web Components as it is for React.
Templates allow code reuse while maintaining the CSF3 object format and enabling
live code generation. The exception is stateful examples in Web Components,
where state management limitations may require different approaches (unlike
React stories which can use `useState` inside stories).

### 6. CSF3 Object-Based Stories Format

**Decision**: All stories must follow the Component Story Format 3.0 (CSF3)
object-based format.

```typescript
export const Default = {
  argTypes: {
    // ... argTypes
  },
  args: {
    disabled: false,
    size: 'md',
  },
  controls: {
    include: baseButtonControls,
  },
};

export const WithIcon = {
  argTypes: {
    // ... argTypes
  },
  args: {
    ...Default.args,
    hasIcon: true,
  },
  controls: {
    include: iconButtonControls,
  },
};
```

**Rationale**: CSF3's object-based format is more structured and declarative
than function-based stories. This makes it significantly easier for MCP agents
and AI assistants to parse, understand, and generate stories programmatically.
The clear separation of args, render functions, and other story properties
provides a predictable structure that both humans and machines can work with
effectively.

## Consequences

### Positive

- **Reduced maintenance burden**: Documentation only needs to be updated in
  TypeScript definitions, automatically flowing to Storybook.
- **Improved developer experience**: Cleaner code tab output, focused controls,
  and live code generation make it easier to understand and use components.
- **Better AI/MCP integration**: Consistent, structured story format enables
  automated tools to generate and modify stories more reliably.
- **Clearer component usage**: Story-specific control visibility helps users
  understand which props are relevant for each use case.
- **Consistent patterns**: Standardized approach across React and Web Components
  packages.

### Negative

- **Migration effort**: Existing stories need to be updated to follow these
  patterns, requiring significant refactoring work.
- **Learning curve**: Team members need to understand when to use templates vs.
  inline renders, and how to properly configure control visibility.

### Neutral

- **TypeScript requirement**: This approach requires well-maintained TypeScript
  definitions and JSDoc comments, which should already be a best practice.
- **Storybook version dependency**: Automatic type inference requires recent
  Storybook versions with proper TypeScript support.
