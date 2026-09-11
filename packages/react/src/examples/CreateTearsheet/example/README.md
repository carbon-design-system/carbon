# CreateTearsheet Pattern Example

This example demonstrates the CreateTearsheet pattern using the new Tearsheet
architecture with StepFlow from `@carbon/utilities-react`.

## Structure

```
/example
  /components        ← Pattern implementation (private, not exported)
    CreateTearsheet.tsx
    CreateTearsheetStep.tsx
    CreateTearsheetDivider.tsx
  /styles
    _create-tearsheet.scss
  /assets
    create_tearsheet_anatomy.jpg
  index.html
  main.tsx
  App.tsx
  package.json
  README.md
```

## Running the Example

### Local Development

1. Install dependencies:

```bash
yarn install
```

2. Run the development server:

```bash
yarn dev
```

3. Open your browser to the URL shown in the terminal (typically
   `http://localhost:5173`)

### StackBlitz

This example is configured to run on StackBlitz. You can open it directly from
the Storybook documentation.

## Key Features

- **New Tearsheet Architecture**: Uses the new Tearsheet component from
  `@carbon/ibm-products/es/components/Tearsheet/next`
- **StepFlow Integration**: Leverages `@carbon/utilities-react` for step
  management
- **Progress Indicators**: Supports both vertical and horizontal progress
  indicators
- **Flexible Layout**: Wide and narrow variants available
- **Form State Management**: Built-in state management across steps

## License

Apache-2.0
