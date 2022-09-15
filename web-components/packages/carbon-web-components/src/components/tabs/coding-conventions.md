# Implementation notes for `<bx-tabs>`

## Relationship with the narrow mode with `<bx-dropdown>`

`<bx-tabs>` contains lots of code originated from `<bx-dropdown>`, to support its narrow screen UI.
Moving such code to a mixin to share the code between those two components is in consideration, but not happening for now, from the following reasons:

- `<bx-dropdown>` code has lots of portions to support its derived class (`<bx-combo-box>` and `<bx-multi-select>`) that `<bx-tabs>` doesn't need
- `<bx-dropdown>` allows programmatic control of its open state, whereas `<bx-tabs>` doesn't (saw less need to support that feature)
- `<bx-tabs>` code has several portions to seamlessly switch between narrow mode and wide mode, that caused difference in markup from `<bx-dropdown>`

## Keyboard navigation model

`<bx-tabs>` uses the same keyboard navigation model (virtual focus) as `<bx-dropdown>`, due to the following reasons:

- To align narrow mode's user interaction model to `<bx-dropdown>`
- To avoid scenarios like:
  1. User focuses on 2nd tab
  2. User shrinks the screen size
  3. The dropdown body, where the focused 2nd tab is, is hidden

## Tab styles in wide mode with different states

**Note**: Arrow keys in wide mode changes selection, whereas arrow keys in narrow mode requires space/enter to select an item. And thus no `highlighted` state.

|          | Normal                                                                               | Hover                                                         | Focus                                                     |
| -------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------- | --------------------------------------------------------- |
| Normal   | Light text (`$text-02`), light gray thick underline (`$ui-03`)                       | Light text (`$text-02`), dark gray thick underline (`$ui-04`) | (Focused means selected)                                  |
| Disabled | Ultra-light text (`$disabled-01`), ultra-light gray thick underline (`$disabled-02`) | (No reaction to hover)                                        | (No reaction to focus)                                    |
| Selected | Blue thick underline (`$interactive-01`/`$focus`), dark bold text                    | (No reaction to hover)                                        | Blue outline (`$interactive-01`/`$focus`), dark bold text |
