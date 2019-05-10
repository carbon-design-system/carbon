# `ListBox` component

`ListBox` is responsible for powering a variety of dropdown-flavored components
in Carbon. This list includes components like: Dropdown, Combobox, MultiSelect,
and more!

Currently, a `ListBox` is broken up into the following pieces:

- `ListBox`: container component that wraps all `ListBox*`-related components
  - `ListBoxField`: component used for handling input and displaying selections
    in components like Combobox and MultiSelect
    - `ListBoxMenuIcon`: indicates the status of the menu, e.g. whether it is
      open or closed.
    - `ListBoxSelection`: indicates the status of the selection for the control,
      works for both single selection and multi-selection components
  - `ListBoxMenu`: container component for the menu of options available in a
    `ListBox`
    - `ListBoxMenuItem`: container component for an option in a `ListBoxMenu`

In addition, we have `ListBox`-specific `prop` types in `ListBoxPropTypes`.
