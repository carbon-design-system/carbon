### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { DatePicker } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var DatePicker = CarbonComponents.DatePicker;
```

#### Instantiating

```javascript
// `#my-date-picker` is an element with `[data-date-picker]` attribute
DatePicker.create(document.getElementById('my-date-picker'));
```

#### Public Methods

| Name      | Params | Description          |
| --------- | ------ | -------------------- |
| `release` |        | Deletes the instance |

#### Options

| Option                        | Default Selector                | Description                                              |
| ----------------------------- | ------------------------------- | -------------------------------------------------------- |
| `selectorInit`                | `[data-date-picker]`            | Element for initializing instance                        |
| `selectorDatePickerInput`     | `[data-date-picker-input]`      | Input element                                            |
| `selectorDatePickerInputFrom` | `[data-date-picker-input-from]` | For ranged calendars only: The "From date" input element |
| `selectorDatePickerInputTo`   | `[data-date-picker-input-to]`   | For ranged calendars only: The "To date" input element   |
| `selectorDatePickerIcon`      | `[data-date-picker-icon]`       | Calendar icon                                            |
| `classCalendarContainer`      | `.bx--date-picker__calendar`    | Class selector for the calendar container                |
| `classMonth`                  | `.bx--date-picker__month`       | Class selector for the calendar month                    |
| `classWeekdays`               | `.bx--date-picker__weekdays`    | Class selector for the calendar weekdays                 |
| `classDays`                   | `.bx--date-picker__days`        | Class selector for the calendar days                     |
| `classWeekday`                | `.bx--date-picker__weekday`     | Class selector for a calendar weekday                    |
| `classDay`                    | `.bx--date-picker__day`         | Class selector for a calendar day                        |
| `attribType`                  | `data-date-picker-type`         | Specifies the calendar mode (single or range)            |
| `dateFormat`                  | `'m/d/Y'`                       | The date format given to the calendar instance           |

The date picker is built on top of
[Flatpickr](https://chmln.github.io/flatpickr/), so many of the
[events](https://chmln.github.io/flatpickr/events/) and
[config options](https://chmln.github.io/flatpickr/options/) that come with
Flatpickr is therefore available to the date picker options. This includes
methods for setting a min date, max date, disabling date(s), specifiying a range
of dates, and more.

##### Example - Getting notified of date picker dropdown being closed

```javascript
// `#my-date-picker` is an element with `[data-date-picker]` attribute
DatePicker.create(document.getElementById('my-date-picker'), {
  onClose() {
    console.log('Date picker dropdown closed!');
  },
});
```

### FAQ

#### Using and understanding Date Picker

There are 3 different date picker types:

| Type                                    | `data-date-picker-type`            |
| --------------------------------------- | ---------------------------------- |
| A simple date picker without a calendar | No data attributes needed          |
| A single date picker                    | `[data-date-picker-type="single"]` |
| A ranged date picker                    | `[data-date-picker-type="range"]`  |

**The simple date picker** is a text input without a calendar. You can specify
the pattern for the text input to make sure the user enters the correct date
format. The default regex pattern that ships with the simple date picker is
`\d{1,2}/\d{4}` ('dd/yyyy' for short date pickers) and `\d{1,2}/\d{1,2}/\d{4}`
('dd/mm/yyyy' or mm/dd/yyyy). The simple date picker does not require any
JavaScript.

**The single date picker** is a text input with a calendar instance attached to
it. It also ships with a calendar icon inside the input field. The calendar will
open when the input is focused, and the user can both type in a date or select a
day from the calendar. The single date picker requires JavaScript, so the data
attributes `data-date-picker` and `data-date-picker-type="single"` are required
on the parent div, and the data attribute `data-date-picker-input` is required
on the input field.

**The ranged date picker** has two text inputs with a ranged calendar instance
attached to them. The ranged date picker requires JavaScript, so the data
attributes `data-date-picker` and `data-date-picker-type="range"` are required
on the parent div, and the data attributes `data-date-picker-input-from` and
`data-date-picker-input-to` are required on the two input fields.

#### Localization

Date Picker supports localization, and you can specify the date format by
overriding the component option `dateFormat`. Supported date formats are listed
[here](https://chmln.github.io/flatpickr/formatting/).

To localize the date picker globally, please follow
[these instructions](https://chmln.github.io/flatpickr/localization/).
