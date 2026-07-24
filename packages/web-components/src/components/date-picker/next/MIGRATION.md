# Preview DatePicker — Web Components migration guide

The **Preview DatePicker** (`<cds-preview-date-picker>`) is a preview of the new
date picker for `@carbon/web-components`, built on the **Temporal API** and a
framework-agnostic **state machine** shared with `@carbon/react`
(`@carbon/utilities/date-picker`), replacing the Flatpickr-based
`cds-date-picker`.

The preview elements register under distinct `cds-preview-date-picker` tags, so
classic and preview can coexist while you migrate.

> **Preview:** APIs and behavior may change before general availability. Some
> classic features are not implemented yet.

## Tag and event renames

| Classic v11               | Preview                           |
| ------------------------- | --------------------------------- |
| `<cds-date-picker>`       | `<cds-preview-date-picker>`       |
| `<cds-date-picker-input>` | `<cds-preview-date-picker-input>` |
| `cds-date-picker-changed` | `cds-preview-date-picker-changed` |
| `cds-date-picker...`      | `cds-preview-date-picker...`      |

## Import and markup

```diff
- import '@carbon/web-components/es/components/date-picker/index.js';
+ import '@carbon/web-components/es/components/date-picker/next/index.js';
```

```html
<cds-preview-date-picker date-format="m/d/Y">
  <cds-preview-date-picker-input
    kind="single"
    label-text="Date Picker label"
    placeholder="mm/dd/yyyy">
  </cds-preview-date-picker-input>
</cds-preview-date-picker>
```

## Behavioral differences

1. **Change event.** Listen for `cds-preview-date-picker-changed`. Its
   `event.detail` is `{ selectedDates, value }`, where `selectedDates` is an
   array of `Temporal.PlainDate` and `value` is the joined ISO string (range
   dates joined with `/`).

   ```diff
   - el.addEventListener('cds-date-picker-changed', (e) => { /* flatpickr detail */ });
   + el.addEventListener('cds-preview-date-picker-changed', (e) => {
   +   const { selectedDates, value } = e.detail;
   + });
   ```

2. **No Flatpickr.** The preview isn't backed by Flatpickr, so nothing
   Flatpickr-specific carries over — its format tokens, options, and API.
   `date-format` accepts basic numeric date tokens; stick to `m`, `d`, `Y`.

## Migration checklist

- [ ] Import from `date-picker/next/index.js`
- [ ] `<cds-date-picker>` → `<cds-preview-date-picker>`, inputs →
      `<cds-preview-date-picker-input>`
- [ ] Verify you've accounted for the new behavioral differences
- [ ] No reliance on FlatPickr APIs

## Feedback

This component is in preview, and your feedback shapes what ships. If you hit a
bug or unexpected behavior, or have any related feedback please
[open an issue](https://github.com/carbon-design-system/carbon/issues/new/choose)
or reach out to us on Slack.
