# UI Shell

## Accessibility

#### Header

> A menu that is visually persistent is a menubar. A menubar is typically horizontal and is often used to create a menu bar similar to those found near the top of the window in many desktop applications, offering the user quick access to a consistent set of commands.

Source: https://www.w3.org/TR/wai-aria-practices/#menu

Resources:

- https://www.w3.org/TR/wai-aria-practices/#menu
- https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html

Requirements:

- https://www.w3.org/TR/wai-aria-practices/#menu
- `nav` should have an `aria-label` that matches the label on the menubar since
  it is a site navigation system
- Verify that the icons are compatible in high contrast mode
- [Keyboard Support](https://www.w3.org/TR/wai-aria-practices/examples/menubar/menubar-1/menubar-1.html#kbd_label)
- When a menu opens, or when a menubar receives focus, keyboard focus is placed on the first item. All items are focusable as described in 5.6 Keyboard Navigation Inside Components.

## Side navigation

Our Side Navigation has approximately the following structure:

```html
<!-- Top level container -->
<aside class="bx--side-nav">
  <!-- Navigation wrapper for accessibility -->
  <nav class="bx--side-nav__navigation" role="navigation" aria-label="Navigation">
    <!-- Has the title and an optionaly select menu rendered at the top of the side nav -->
    <header class="bx--side-nav__header"></header>
    <!-- Renders all of our navigation items -->
    <ul class="bx--side-nav__items"></ul>
    <!-- Renders the button to collapse or expand the side nav -->
    <footer class="bx--side-nav__footer"></footer>
  </nav>
</aside>
```

### Header

The header is mostly just an icon and a title for the local context of a page.
For example, in IBM Cloud we would have IBM Cloud in the header and a product in
the side navigation, like Containers.

The header also can optionally have a select that acts as a sub-menu that adds
another navigation pattern to the page.

### Items

A side nav item is a `<li>` with the `bx--side-nav__item` class. Inside, we will have a link
or a category. Categories themselves have links inside of a menu.

Links can either be active, or in-active, and this status is reflected by using
an aria attribute `aria-current="page"` or by a class name.

Categories have a `<button>` as their target so that we can easily open/close
them using screen readers.

### Footer

The footer itself is primary just a `<button>` that should handle expanding and
closing the side nav.

## Tokens

## Header & header-panel

| `#` | Variable/token             | Role                                                                                                                      | Experimental theme value |
| --- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 1   | \$shell-header-bg-01       | Header bar background                                                                                                     | \$gray-90                |
| 2   | \$shell-header-bg-02       | Header-panel background                                                                                                   | \$gray-10                |
| 3   | \$shell-header-bg-03       | Panel Item hover                                                                                                          | \$gray-20                |
| 4   | \$shell-header-text-01     | Primary text in header <br> Tab text <br> Product label                                                                   | \$gray-10                |
| 5   | \$shell-header-text-02     | Primary text in header-panel <br> item text                                                                               | \$gray-90                |
| 6   | \$shell-header-text-03     | Secondary text in header-panel <br> Category label                                                                        | \$gray-70                |
| 7   | \$shell-header-icon-01     | header bar icons                                                                                                          | \$gray-10                |
| 8   | \$shell-header-icon-02     | icons in header-panel                                                                                                     | \$gray-90                |
| 9   | \$shell-header-link        | item link                                                                                                                 | \$blue-60                |
| 10  | \$shell-header-icon-03     | Header icon <br> selected state background                                                                                | \$blue-60                |
| --- | -------------------------  | ------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 11  | \$shell-side-nav-bg-01     | Side-nav panel background                                                                                                 | \$gray-90                |
| 12  | \$shell-side-nav-bg-02     | Selected category background <br> Select L2 flatted item background <br> Item hover background <br> Footer-bar background | \$gray-80                |
| 13  | \$shell-side-nav-bg-03     | Selected L2 nested item                                                                                                   | \$gray-70                |
| 14  | \$shell-side-nav-text-01   | Primary text in side-nav <br> L2 Flatten item text <br> L2 Nested item text <br> L1 title text                            | \$gray-10                |
| 15  | \$shell-side-nav-text-02   | Secondary text in side nav <br> L2 Category label                                                                         | \$gray-30                |
| 16  | \$shell-side-nav-icon-01   | side-nav icon color                                                                                                       | \$gray-10                |
| 17  | \$shell-side-nav-accent-01 | item highlight bar                                                                                                        | \$blue-60                |
