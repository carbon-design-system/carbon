# Implementation notes for `<cds-tabs>`

## Relationship with the narrow mode with `<cds-dropdown>`

`<cds-tabs>` contains lots of code originated from `<cds-dropdown>`, to support
its narrow screen UI. Moving such code to a mixin to share the code between
those two components is in consideration, but not happening for now, from the
following reasons:

- `<cds-dropdown>` code has lots of portions to support its derived class
  (`<cds-combo-box>` and `<cds-multi-select>`) that `<cds-tabs>` doesn't need
- `<cds-dropdown>` allows programmatic control of its open state, whereas
  `<cds-tabs>` doesn't (saw less need to support that feature)
- `<cds-tabs>` code has several portions to seamlessly switch between narrow
  mode and wide mode, that caused difference in markup from `<cds-dropdown>`

## Keyboard navigation model

`<cds-tabs>` uses the same keyboard navigation model (virtual focus) as
`<cds-dropdown>`, due to the following reasons:

- To align narrow mode's user interaction model to `<cds-dropdown>`
- To avoid scenarios like:
  1. User focuses on 2nd tab
  2. User shrinks the screen size
  3. The dropdown body, where the focused 2nd tab is, is hidden

## Tab styles in wide mode with different states

**Note**: Arrow keys in wide mode changes selection, whereas arrow keys in
narrow mode requires space/enter to select an item. And thus no `highlighted`
state.

|          | Normal                                                                           | Hover                                                                           | Focus                                                     |
| -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Normal   | Light text (`$text-secondary`), light gray thick underline (`$border-subtle-01`) | Light text (`$text-secondary`), dark gray thick underline (`$border-strong-01`) | (Focused means selected)                                  |
| Disabled | Ultra-light gray thick underline (`$text-disabledx`)                             | (No reaction to hover)                                                          | (No reaction to focus)                                    |
| Selected | Blue thick underline (`$interactive-01`/`$focus`), dark bold text                | (No reaction to hover)                                                          | Blue outline (`$interactive-01`/`$focus`), dark bold text |
