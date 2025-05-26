# dateTimeFormat

A wrapper utility around `Intl.RelativeTimeFormat` and `Intl.DateTimeFormat`.
See the
[Date and time guidance](https://pages.github.ibm.com/carbon/ibm-products/guidelines/content/date-and-time/)
provided on the Carbon for IBM Products site.

## Relative

- Supported styles: `"long" | "short" | "narrow"`
- Default style: `"long"`

```js
import { dateTimeFormat } from '@carbon/utilities';

dateTimeFormat.relative.format(timestamp);
// 3 minutes ago

dateTimeFormat.relative.format(timestamp, { locale: 'de-DE' });
// vor 3 Minuten

dateTimeFormat.relative.format(timestamp, { style: 'short' });
// 3 min. ago
```

## Absolute

### Time

- Supported styles: `"full" | "long" | "medium" | "short"`
- Default style: `"short"`

```js
import { dateTimeFormat } from '@carbon/utilities';

dateTimeFormat.absolute.formatTime(timestamp);
// 3:47 PM

dateTimeFormat.absolute.formatTime(timestamp, { locale: 'de-DE' });
// 15:47

dateTimeFormat.absolute.formatTime(timestamp, { style: 'long' });
// 3:47:12 PM
```

### Date

- Supported styles: `"full" | "long" | "medium" | "short"`
- Default style: `"medium"`

```js
import { dateTimeFormat } from '@carbon/utilities';

dateTimeFormat.absolute.formatDate(timestamp);
// Apr 4, 2024

dateTimeFormat.absolute.formatDate(timestamp, { locale: 'de-DE' });
// 04.04.2024

dateTimeFormat.absolute.formatDate(timestamp, { style: 'full' });
// Thursday, April 4, 2024
```

### Date and time

- Supported styles: `"full" | "long" | "medium" | "short" | "tooltip"`
  - `"tooltip"` is a shortand for `timeStyle: "long", dateStyle: "full"`
- Supported time styles: `"full" | "long" | "medium" | "short"`
- Supported date styles: `"full" | "long" | "medium" | "short"`
- Default time style: `"short"`
- Default date style: `"medium"`

```js
import { dateTimeFormat } from '@carbon/utilities';

dateTimeFormat.absolute.format(timestamp);
// Apr 4, 2024 at 3:47 PM

dateTimeFormat.absolute.format(timestamp, { locale: 'de-DE' });
// 04.04.2024, 15:47

dateTimeFormat.absolute.format(timestamp, {
  timeStyle: 'medium',
  dateStyle: 'short',
});
// April 4, 2024 at 3:47:12 PM

dateTimeFormat.absolute.format(timestamp, { style: 'short' });
// 4/4/24, 3:47 PM

dateTimeFormat.absolute.format(timestamp, { style: 'tooltip' });
// Thursday, April 4, 2024 at 3:47:12 PM GMT+2
```

### Range

- Supported styles: `"full" | "long" | "medium" | "short"`
- Supported time styles: `"full" | "long" | "medium" | "short" | null`
- Supported date styles: `"full" | "long" | "medium" | "short" | null`
- Default time style: `"short"`
- Default date style: `"medium"`

```js
import { dateTimeFormat } from '@carbon/utilities';

dateTimeFormat.absolute.formatRange(startDate, endDate);
// Apr 4, 2024, 3:47 PM – Apr 25, 2024, 4:29 PM

dateTimeFormat.absolute.formatRange(startDate, endDate, { locale: 'de-DE' });
// 04.04.2024, 15:47 – 25.04.2024, 16:29

dateTimeFormat.absolute.formatRange(startDate, endDate, {
  timeStyle: 'medium',
  dateStyle: 'short',
});
// 4/4/24, 3:47:12 PM – 4/25/24, 4:29:38 PM

dateTimeFormat.absolute.formatRange(startDate, endDate, { style: 'short' });
// 4/4/24, 3:47 PM – 4/25/24, 4:29 PM
```

#### Date only

The time can be omitted to only display the date range.

```js
import { dateTimeFormat } from '@carbon/utilities';

dateTimeFormat.absolute.formatRange(startDate, endDate, { timeStyle: null });
// Apr 28, 2016 – Jul 1, 2018
```

#### Time only

The date can only be omitted if the day is the same between start and end.

```js
import { dateTimeFormat } from '@carbon/utilities';

dateTimeFormat.absolute.formatRange(startDate, sameDayEndDate, {
  dateStyle: null,
});
// 3:47 – 4:29 PM
```

#### Timezone

For `absolute` functions, you can provide `timeZone` as an optional property.
This is useful when (for example) you want to display utc time instead of a
local timezone.

```js
import { dateTimeFormat } from '@carbon/utilities';

dateTimeFormat.absolute.format(timestamp);
// Apr 4, 2024 at 3:47 PM

dateTimeFormat.absolute.format(timestamp, { timeZone: 'UTC' });
// Apr 4, 2024 at 10:47 PM
```

Timezone options are according to
[ECMAScript® 2026 Internationalization API Specification](https://tc39.es/ecma402/#datetimeformat-objects)
