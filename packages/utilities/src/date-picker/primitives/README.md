# Date Picker State Machine

A lightweight, framework-agnostic state machine for managing date picker logic
including focus management, range selection, calendar toggling, and date
navigation.

## Architecture

The state machine is designed with the following principles:

- **Zero Dependencies**: Uses only TypeScript standard library
- **Framework Agnostic**: Core logic is pure TypeScript, easily portable to
  React/Angular/Vue
- **Immutable Updates**: All state changes return new context objects
- **Type Safe**: Full TypeScript coverage with strict mode
- **Testable**: Easy to unit test without DOM dependencies

## Directory Structure

```
state-machine/
├── types.ts                      # Type definitions
├── states.ts                     # State and event enums
├── guards.ts                     # Transition guards (validation)
├── actions.ts                    # State update actions
├── effects.ts                    # Side effects
├── machine.ts                    # Core state machine
├── temporal-utils.ts             # Temporal API utilities for date operations
├── index.ts                      # Public API
└── adapters/
    └── web-component-adapter.ts  # Web Component integration
```

## States

The date picker has the following states:

- `IDLE` - Initial state, calendar closed, no focus
- `FOCUSED` - Input has focus, calendar closed
- `CALENDAR_OPEN` - Calendar dropdown is open
- `SELECTING_START` - User is selecting start date (range mode)
- `SELECTING_END` - User is selecting end date (range mode)
- `DATE_SELECTED` - Date(s) have been selected
- `DISABLED` - Component is disabled
- `READONLY` - Component is read-only
- `ERROR` - Component is in an error state

## Events

Key events that trigger state transitions:

- `INPUT_FOCUS` / `INPUT_BLUR` - Input focus changes
- `CALENDAR_OPEN` / `CALENDAR_CLOSE` - Calendar visibility changes
- `CALENDAR_ICON_CLICK` - Calendar icon clicked
- `DATE_SELECT` - Single date selected
- `RANGE_START_SELECT` / `RANGE_END_SELECT` - Range dates selected
- `NEXT_MONTH` / `PREV_MONTH` - Navigate between months
- `OUTSIDE_CLICK` - Click outside component (closes calendar)
- `ESCAPE_KEY` / `TAB_KEY` / `ENTER_KEY` - Keyboard events
- `DISABLE` / `ENABLE` - Disabled state changes
- `SET_READONLY` / `UNSET_READONLY` - Readonly state changes

## Usage

### Basic Usage

```typescript
import { DatePickerStateMachine, DatePickerEvent } from './state-machine';

// Create a new state machine
const machine = new DatePickerStateMachine({
  mode: 'single',
  dateFormat: 'm/d/Y',
  closeOnSelect: true,
});

// Send events
machine.send(DatePickerEvent.INPUT_FOCUS);
machine.send(DatePickerEvent.CALENDAR_OPEN);
machine.send(DatePickerEvent.DATE_SELECT, { date: new Date() });

// Get current state and context
const state = machine.getState();
const context = machine.getContext();

// Subscribe to state changes
const unsubscribe = machine.subscribe((transition) => {
  console.log('State changed:', transition.from, '->', transition.to);
  console.log('New context:', transition.context);
});

// Cleanup
unsubscribe();
```

### With Web Component Adapter

```typescript
import { WebComponentAdapter } from './state-machine/adapters/web-component-adapter';

// In your Web Component
class CDSDatePicker extends LitElement {
  private adapter?: WebComponentAdapter;

  connectedCallback() {
    super.connectedCallback();

    this.adapter = new WebComponentAdapter({
      component: this,
      initialContext: {
        mode: this._mode,
        dateFormat: this.dateFormat,
        minDate: this.minDate ? new Date(this.minDate) : null,
        maxDate: this.maxDate ? new Date(this.maxDate) : null,
      },
      onStateChange: (transition) => {
        // Handle state changes
      },
      onCalendarOpen: () => {
        // Handle calendar opening
      },
      onDateSelect: (context) => {
        // Handle date selection
      },
    });
  }

  disconnectedCallback() {
    this.adapter?.destroy();
    super.disconnectedCallback();
  }

  // Handle calendar events
  private setupCalendar() {
    this.calendar = createCalendar(input, {
      onChange: (selectedDates) => {
        this.adapter?.handleCalendarChange(selectedDates);
      },
      onOpen: () => {
        this.adapter?.handleCalendarOpen();
      },
      onClose: () => {
        this.adapter?.handleCalendarClose();
      },
    });
  }
}
```

## Range Selection Logic

The state machine handles range selection with the following flow:

1. User opens calendar → `CALENDAR_OPEN` state
2. User selects first date → `RANGE_START_SELECT` event → `SELECTING_END` state
3. User selects second date → `RANGE_END_SELECT` event → `DATE_SELECTED` state
4. If end date < start date, dates are automatically swapped
5. Calendar closes (if `closeOnSelect` is true)

### Example

```typescript
// Range mode
const machine = new DatePickerStateMachine({
  mode: 'range',
  closeOnSelect: true,
});

// Open calendar
machine.send(DatePickerEvent.CALENDAR_OPEN);
// State: CALENDAR_OPEN

// Select start date
machine.send(DatePickerEvent.RANGE_START_SELECT, {
  date: new Date('2024-01-15'),
});
// State: SELECTING_END
// Context: { startDate: 2024-01-15, endDate: null }

// Select end date
machine.send(DatePickerEvent.RANGE_END_SELECT, {
  date: new Date('2024-01-20'),
});
// State: DATE_SELECTED
// Context: { startDate: 2024-01-15, endDate: 2024-01-20, value: '2024-01-15/2024-01-20' }
// Calendar closes automatically
```

## Guards

Guards determine if a transition is allowed:

```typescript
// Example: Only allow date selection if date is in range
{
  DATE_SELECT: (context, event) => {
    const date = event.payload?.date;
    if (!date) return false;

    if (context.minDate && date < context.minDate) return false;
    if (context.maxDate && date > context.maxDate) return false;

    return true;
  };
}
```

## Actions

Actions update the context during transitions:

```typescript
// Example: Update context when range end is selected
{
  RANGE_END_SELECT: (context, event) => {
    const endDate = event.payload?.date;
    const { startDate } = context;

    // Swap if needed
    if (endDate < startDate) {
      return {
        startDate: endDate,
        endDate: startDate,
        value: `${formatDate(endDate)}/${formatDate(startDate)}`,
      };
    }

    return {
      endDate,
      value: `${formatDate(startDate)}/${formatDate(endDate)}`,
    };
  };
}
```

## Testing

The state machine is designed to be easily testable:

```typescript
import {
  DatePickerStateMachine,
  DatePickerState,
  DatePickerEvent,
} from './state-machine';

describe('DatePickerStateMachine', () => {
  it('should transition from IDLE to FOCUSED on INPUT_FOCUS', () => {
    const machine = new DatePickerStateMachine();

    expect(machine.getState()).toBe(DatePickerState.IDLE);

    machine.send(DatePickerEvent.INPUT_FOCUS);

    expect(machine.getState()).toBe(DatePickerState.FOCUSED);
    expect(machine.getContext().isFocused).toBe(true);
  });

  it('should handle range selection correctly', () => {
    const machine = new DatePickerStateMachine({ mode: 'range' });

    machine.send(DatePickerEvent.CALENDAR_OPEN);
    machine.send(DatePickerEvent.RANGE_START_SELECT, {
      date: new Date('2024-01-15'),
    });

    expect(machine.getState()).toBe(DatePickerState.SELECTING_END);

    machine.send(DatePickerEvent.RANGE_END_SELECT, {
      date: new Date('2024-01-20'),
    });

    expect(machine.getState()).toBe(DatePickerState.DATE_SELECTED);

    const context = machine.getContext();
    expect(context.startDate).toEqual(new Date('2024-01-15'));
    expect(context.endDate).toEqual(new Date('2024-01-20'));
  });
});
```

## Calendar Integration

The state machine now includes full calendar integration with the following
features:

### Calendar Rendering

The calendar is rendered using the `calendar-renderer.ts` component, which
provides:

- Month/year navigation with previous/next buttons
- Weekday headers (localized)
- 7-column grid layout for days
- Visual indicators for:
  - Selected dates (highlighted in brand color)
  - Today's date (bold with link color)
  - Disabled dates (grayed out, not clickable)
  - Previous/next month days (secondary text color)

### Date Selection Flow

1. User clicks calendar icon or focuses input → `CALENDAR_ICON_CLICK` or
   `INPUT_FOCUS` event
2. Calendar opens → `CALENDAR_OPEN` state
3. User clicks a date → `DATE_SELECT` event
4. Date is validated against min/max constraints
5. Input field is populated with formatted date (MM/DD/YYYY)
6. Calendar closes (if `closeOnSelect` is true)

### Month Navigation

```typescript
// Navigate to next month
machine.send(DatePickerEvent.NEXT_MONTH);
// Context updated: { currentMonth: Temporal.PlainDate }

// Navigate to previous month
machine.send(DatePickerEvent.PREV_MONTH);
// Context updated: { currentMonth: Temporal.PlainDate }
```

### Outside Click Handling

The date picker automatically closes the calendar when clicking outside:

```typescript
// Implemented in date-picker.ts
private _handleOutsideClick = (event: MouseEvent) => {
  if (!this.open) return;

  const target = event.target as Node;
  if (!this.contains(target) && !this.shadowRoot?.contains(target)) {
    this.open = false;
    this._machine?.send(DatePickerEvent.OUTSIDE_CLICK);
  }
};
```

### Temporal API Integration

The state machine uses the Temporal API for robust date handling:

```typescript
// temporal-utils.ts provides utilities for:
- dateToPlainDate(date: Date): Temporal.PlainDate
- plainDateToDate(date: Temporal.PlainDate): Date
- parseDateToPlainDate(input: string | Date | Temporal.PlainDate): Temporal.PlainDate
- formatDate(date: Temporal.PlainDate, format: string): string
- isDateInRange(date: Temporal.PlainDate, min?: Date, max?: Date): boolean
```

### Min/Max Date Constraints

Dates outside the min/max range are automatically disabled:

```typescript
const machine = new DatePickerStateMachine({
  mode: 'single',
  minDate: new Date('2024-01-01'),
  maxDate: new Date('2024-12-31'),
});

// Dates before 2024-01-01 or after 2024-12-31 will be:
// - Visually disabled (grayed out)
// - Not clickable
// - Prevented from selection by guards
```

## Recent Fixes and Improvements

### Date Selection Input Population

- Fixed issue where selecting a date in the calendar didn't populate the input
  field
- Input now correctly displays selected date in MM/DD/YYYY format
- Implemented in `_handleStateChange` method of date-picker.ts

### Min/Max Date Parsing

- Fixed off-by-one month error in date conversions
- Corrected Temporal.PlainDate to JavaScript Date conversions (month offset
  handling)
- Added `parseDateToPlainDate` utility for robust date parsing from multiple
  formats

### AI Label Positioning

- Adjusted AI label spacing from `$spacing-10` (48px) to `$spacing-08` (32px)
- Improved visual alignment with calendar icon
- Proper vertical centering using `transform: translateY(-50%)`

### Outside Click Detection

- Added document-level click listener to detect clicks outside the date picker
- Calendar automatically closes when clicking outside
- Proper cleanup of event listeners in `disconnectedCallback`

## Current Implementation Status

### ✅ Completed Features

- Calendar rendering with Carbon Design System styling
- Month navigation (previous/next)
- Date selection (single mode)
- Input field population on date selection
- Min/max date constraints (visual and functional)
- Outside click detection and calendar closing
- Proper Temporal API integration
- AI label positioning

### 🚧 Pending Features

- Keyboard navigation (arrow keys, Enter, Escape, Tab)
- Range selection mode
- Localization support (date formats, RTL languages)
- Accessibility enhancements (ARIA labels, screen reader support)
- Performance optimizations for large date ranges

## Testing

The state machine is designed to be easily testable:

```typescript
import {
  DatePickerStateMachine,
  DatePickerState,
  DatePickerEvent,
} from './state-machine';

describe('DatePickerStateMachine', () => {
  it('should transition from IDLE to FOCUSED on INPUT_FOCUS', () => {
    const machine = new DatePickerStateMachine();

    expect(machine.getState()).toBe(DatePickerState.IDLE);

    machine.send(DatePickerEvent.INPUT_FOCUS);

    expect(machine.getState()).toBe(DatePickerState.FOCUSED);
    expect(machine.getContext().isFocused).toBe(true);
  });

  it('should handle calendar opening and date selection', () => {
    const machine = new DatePickerStateMachine({ mode: 'single' });

    machine.send(DatePickerEvent.CALENDAR_OPEN);
    expect(machine.getState()).toBe(DatePickerState.CALENDAR_OPEN);

    machine.send(DatePickerEvent.DATE_SELECT, {
      date: new Date('2024-01-15'),
    });

    expect(machine.getState()).toBe(DatePickerState.DATE_SELECTED);
    expect(machine.getContext().selectedDate).toBeDefined();
  });

  it('should close calendar on outside click', () => {
    const machine = new DatePickerStateMachine({ mode: 'single' });

    machine.send(DatePickerEvent.CALENDAR_OPEN);
    expect(machine.getState()).toBe(DatePickerState.CALENDAR_OPEN);

    machine.send(DatePickerEvent.OUTSIDE_CLICK);
    expect(machine.getState()).toBe(DatePickerState.IDLE);
  });
});
```
