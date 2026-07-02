# datePartsOrder

A wrapper utility around `Intl.DateTimeFormat().formatToParts()` that provides
the preferred order of parts of a date, like `month` and `year`, for a given
`locale`.

## getMonthYearOrder

Provide a `locale` and a string representation of the order will be returned.

```js
import { datePartsOrder } from '@carbon/utilities';

datePartsOrder.getMonthYearOrder('en-US');
// 'month-year'

datePartsOrder.getMonthYearOrder('ja-JP');
// 'year-month'
```

## isMonthFirst

Wrapper function that returns a boolean expression of `getMonthYearOrder` for
ergonomics.

```js
import { datePartsOrder } from '@carbon/utilities';

datePartsOrder.isMonthFirst('en-US');
// true

datePartsOrder.isMonthFirst('ja-JP');
// false
```
