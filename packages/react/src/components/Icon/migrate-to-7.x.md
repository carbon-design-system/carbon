# Props

`<Icon>`

| Prop   | v9                      | v10                 |
| ------ | ----------------------- | ------------------- |
| `name` | Points to the icon name | Removed (See below) |

## Notes for `v10`

The `<Icon>` component uses the `carbon-icons` library, which hosts a set of
icons built for v9 of the Carbon Design System. In v10, we introduced
`@carbon/icons-react` which offers an updated set of icons built for consumption
as React components. However, we will still support both `carbon-icons` and
`@carbon/icons-react` through v11.

While you can still use the `<Icon>` component, the `name` prop has been removed
in `v10`. We removed the `name` prop in preference of the `icon` prop which will
allow you to tree-shake icons in your build. You can use the `icon` prop by
directly importing icons from `carbon-icons` and supplying them as the `icon`
prop. For example:

```js
import { Icon } from 'carbon-components-react';
import { iconAdd } from 'carbon-icons';

<Icon icon={iconAdd} />;
```

This `icon` prop is a data structure that we use to represent an icon in code.
You can pass in your own icons if they follow this data structure. For more
information, you can view the
[`icon` prop type](https://github.com/carbon-design-system/carbon/blob/v10.3.0/packages/react/src/components/Icon/Icon.js#L189-L194)
in addition to the exports from
[`carbon-icons`](https://unpkg.com/browse/carbon-icons@7.0.7/dist/carbon-icons-list.js).
