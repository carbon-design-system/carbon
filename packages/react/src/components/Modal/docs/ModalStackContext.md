# Modal Stack Context

The `ModalStackContext` provides a React Context-based solution for managing
nested modals and ensuring proper ESC key handling.

## Problem

When modals are nested (one modal inside another), pressing ESC should only
close the topmost (most recently opened) modal, not all modals at once.

## Solution

The `ModalStackProvider` tracks which modals are currently open and ensures only
the topmost modal handles the ESC key.

## Usage

### 1. Wrap your application with ModalStackProvider

```tsx
import { ModalStackProvider } from '@carbon/react';

function App() {
  return (
    <ModalStackProvider>
      <YourApp />
    </ModalStackProvider>
  );
}
```

### 2. Use modals normally

```tsx
import { Modal, ComposedModal } from '@carbon/react';

function MyComponent() {
  const [outerOpen, setOuterOpen] = useState(false);
  const [innerOpen, setInnerOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOuterOpen(true)}>Open Modal</Button>

      <Modal
        open={outerOpen}
        onRequestClose={() => setOuterOpen(false)}
        modalHeading="Outer Modal">
        <p>This is the outer modal</p>
        <Button onClick={() => setInnerOpen(true)}>Open Nested Modal</Button>

        <Modal
          open={innerOpen}
          onRequestClose={() => setInnerOpen(false)}
          modalHeading="Inner Modal"
          size="sm">
          <p>Press ESC to close only this modal</p>
        </Modal>
      </Modal>
    </>
  );
}
```

## How It Works

1. When a modal opens, it registers itself in the modal stack
2. When ESC is pressed, each modal checks if it's the topmost modal
3. Only the topmost modal handles the ESC key and closes
4. When a modal closes, it unregisters itself from the stack

## Backward Compatibility

If `ModalStackProvider` is not used, modals will still work but will fall back
to the default behavior where each modal handles ESC independently. A warning
will be logged in development mode.

## Benefits

- ✅ **React-native**: Uses Context API instead of module-level state
- ✅ **SSR-safe**: No global state that could leak between requests
- ✅ **Testable**: Easy to mock and test
- ✅ **Type-safe**: Full TypeScript support
- ✅ **Memory-safe**: Automatic cleanup with development warnings
- ✅ **Works with both Modal and ComposedModal**: Unified solution

## API

### ModalStackProvider

Provider component that should wrap your application.

**Props:** None

### useModalStack

Hook to access the modal stack context (primarily for internal use).

**Returns:**

```typescript
{
  register: (id: string) => void;
  unregister: (id: string) => void;
  isTopmost: (id: string) => boolean;
  getStack?: () => string[]; // Development only
}
```

## Development Features

In development mode, the provider will:

- Warn if the modal stack grows beyond 10 items (potential memory leak)
- Provide a `getStack()` method for debugging
- Log warnings if `useModalStack` is used without a provider
