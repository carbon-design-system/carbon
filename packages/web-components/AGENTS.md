# `packages/web-components`

This package houses the canonical web component implementation of the design
system components.

## Guidelines

- Follow best practices and common conventions for Web Components

## Component folder structure

For `packages/web-components/src/components/`:

```
component-name/
├── index.ts                   // Re-exports
├── component-name.ts          // Main component
├── component-name.scss        // Web-component-specific styling
├── component-name.stories.ts  // Storybook stories
├── component-name-story.scss  // Styling for storybook stories
├── component-name.mdx         // Storybook mdx docs
└── __tests__/
│   └── component-name-test.ts // Unit tests
```
