# Props

`<Icon>`

| Prop   | v9                      | v10                 |
| ------ | ----------------------- | ------------------- |
| `name` | Points to the icon name | Removed (See below) |

## Notes for `v10`

`<Icon>` component is for using `carbon-icons` library which hosts older icons,
and our React components in `v10` uses `@carbon/icons-react` library which hosts
newer icons introduced in `v10` and works right as React components.

You can still use `<Icon>`, but `name` prop of `<Icon>` has been removed in
`v10`, given the name-lookup approach loses the ability of pick and choose icons
to be included in application's build. The alternative is `icon` prop, which
takes a
[data structure](https://github.com/carbon-design-system/carbon/blob/v10.3.0/packages/react/src/components/Icon/Icon.js#L189-L194)
seen in
[named exports of `carbon-icons` library](https://unpkg.com/browse/carbon-icons@7.0.1/dist/carbon-icons-list.js).
