# preview\_\_DatePicker — React migration guide

The **preview\_\_DatePicker** is a preview of the new `DatePicker` for
`@carbon/react`, built on the **Temporal API** and a framework-agnostic **state
machine** shared with `@carbon/web-components`
(`@carbon/utilities/date-picker`), replacing the Flatpickr-based implementation.

The prop surface stays close to the classic component, so most migrations are
just an import change. This guide covers what to check.

> **Preview:** APIs and behavior may change before general availability. Some
> classic features are not implemented yet.

## Import path

Import the namespace (`preview__DatePicker`) from `@carbon/react` and
destructure — the JSX stays the same.

```diff
- import { DatePicker, DatePickerInput } from '@carbon/react';
+ import { preview__DatePicker } from '@carbon/react';
+
+ const { DatePicker, DatePickerInput, DatePickerSkeleton } = preview__DatePicker;
```

Once destructured, usage is identical to the v11 component:

```tsx
<DatePicker datePickerType="single" onChange={handleChange}>
  <DatePickerInput id="date" labelText="Date" placeholder="mm/dd/yyyy" />
</DatePicker>
```

## Behavioral differences

1. **`onChange` signature.** Classic called
   `onChange(selectedDates, dateStr, instance)`. preview\_\_DatePicker calls
   **`onChange(dates: Date[])`** — just an array of `Date` objects.

   ```diff
   - const handleChange = (selectedDates, dateStr, instance) => setValue(dateStr);
   + const handleChange = (dates) => {
   +   const [start, end] = dates; // format yourself, e.g. Intl.DateTimeFormat
   + };
   ```

2. **`onClose` signature.** Classic passed `(selectedDates, dateStr, instance)`;
   preview\_\_DatePicker calls **`onClose()`** with no arguments. Read the value
   from your state.

3. **No Flatpickr APIs.** preview\_\_DatePicker isn't backed by Flatpickr, so
   nothing Flatpickr-specific carries over.

Otherwise the props match the classic component. `minDate` / `maxDate` use
`mm/dd/yyyy`; `locale` takes a BCP 47 tag for month/weekday text.

## Migration checklist

- [ ] Import from the `preview__DatePicker` namespace
- [ ] Verify you've accounted for the new behavioral differences
- [ ] No reliance on FlatPickr APIs

## Feedback

This component is in preview, and your feedback shapes what ships. If you hit a
bug or unexpected behavior, or have any related feedback please
[open an issue](https://github.com/carbon-design-system/carbon/issues/new/choose)
or reach out to us on Slack.
