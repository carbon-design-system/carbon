# @carbon/ibm-products-utilities

> **Private internal package** - Framework-agnostic utilities for Carbon for IBM
> Products

## Overview

This package provides framework-agnostic JavaScript/TypeScript utilities shared
between `@carbon/ibm-products` (React) and `@carbon/ibm-products-web-components`
(Web Components).

**⚠️ Important:** This is a private package not published to npm. All utilities
are re-exported through the main consumer packages. Always import from
`@carbon/ibm-products` or `@carbon/ibm-products-web-components`, never directly
from this package.

## Purpose

The `@carbon/ibm-products-utilities` package serves as a shared foundation that:

- **Enables Code Reusability**: Common business logic shared between React and
  Web Components
- **Improves Maintainability**: Single source of truth for framework-agnostic
  logic
- **Ensures Framework Agnosticism**: Pure TypeScript/JavaScript with no
  framework dependencies
- **Provides Type Safety**: Full TypeScript support with comprehensive type
  definitions
- **Supports Selective Exposure**: Consumer packages re-export only appropriate
  utilities

## Available Utilities

### AddSelectData

A lightweight, framework-agnostic utility for managing hierarchical data
structures.

**Key Features:**

- Hierarchical data management with parent-child relationships
- Item selection (single and multi-select modes)
- Search functionality with customizable options
- Sorting with recursive support
- Status tracking (checked, unchecked, indeterminate)
- Efficient O(1) lookups using internal maps
- Full TypeScript support

**Quick Example:**

```typescript
// Import from the main packages
import { AddSelectData, AddSelectItem } from '@carbon/ibm-products';
// or
import {
  AddSelectData,
  AddSelectItem,
} from '@carbon/ibm-products-web-components';

const dataManager = new AddSelectData();
dataManager.setItems([
  { id: '1', title: 'Item 1', value: 'item1' },
  { id: '2', title: 'Item 2', value: 'item2' },
]);

// Select items
dataManager.setSelectedItems('1');

// Search
const results = dataManager.search('Item 1');

// Navigate hierarchy
const children = dataManager.getItemChildren('1');
```

**📖
[View full AddSelectData documentation](./src/utils/add-select/add-select-data.md)**

## Usage Guidelines

Always import from the consumer packages:

```typescript
// ✅ React Users
import { AddSelectData } from '@carbon/ibm-products';

// ✅ Web Components Users
import { AddSelectData } from '@carbon/ibm-products-web-components';

// ❌ Never import directly from utilities
import { AddSelectData } from '@carbon/ibm-products-utilities';
```

## Package Structure

```

@carbon/ibm-products-utilities/
 ├── es/ # ESM build output
 ├── lib/ # CommonJS build output
 ├── src/
 │ ├── utils/ # Utilities directory
 │ │ └── add-select/ #AddSelect utility
 │ │   ├── add-select-data.ts
 │ │   ├── add-select-data.spec.ts
 │ │   ├── add-select-data.md
 │ │   └── index.ts
 │ └── index.ts # Main entry point
 ├── package.json
 ├── tsconfig.json
 └── README.md

```

## Development

### Building

```bash
yarn build
```

### Testing

```bash
yarn test
```

### Adding New Utilities

When adding new utilities to this package:

1. Create a new directory under `src/utils/` (e.g., `src/utils/my-utility/`)
2. Add your implementation file (e.g., `my-utility.ts`)
3. Add tests (e.g., `my-utility.spec.ts`)
4. Add documentation (e.g., `my-utility.md`)
5. Create a barrel export (`index.ts`)
6. Export from the main `src/index.ts`

Example structure:

```
src/utils/my-utility/
├── index.ts
├── my-utility.ts
├── my-utility.spec.ts
└── my-utility.md
```

## Contributing

This package is part of the Carbon for IBM Products monorepo. Changes to this
package should be made with consideration for both consumer packages
(`@carbon/ibm-products` and `@carbon/ibm-products-web-components`).

Please follow the [contribution guidelines](../../docs/MAINTAINER_GUIDELINES.md)
when making changes.

### Guidelines for Maintainers

When working with this package:

1. **Keep it Framework-Agnostic**: Ensure all code remains free of
   framework-specific dependencies
2. **Consider Both Consumers**: Changes should work for both React and Web
   Components implementations
3. **Document Public APIs**: Clearly document which utilities are intended for
   public re-export
4. **Maintain Type Safety**: Provide comprehensive TypeScript types for all
   exports
5. **Test Thoroughly**: Ensure changes don't break either consumer package
6. **Coordinate Re-exports**: When adding new utilities, coordinate with
   maintainers of consumer packages to determine appropriate public exposure

## Related Packages

- [@carbon/ibm-products](../ibm-products) - React components
- [@carbon/ibm-products-web-components](../ibm-products-web-components) - Web
  Components
