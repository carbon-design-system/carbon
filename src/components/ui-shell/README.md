# UI Shell

## Platform Navigation

Platform Navigation has the following cases for configuration:

- Can have one or more sections. A section is a collection of links or categories.
- A link will have to have an href and title, and optionally an icon.
- A category will have a collection of links, and optionally an icon.
- State variations:
  - Item link
  - Item link selected
  - Item link with icon
  - Item link with icon and selected
  - Category collapsed
  - Category expanded
  - Category with icon and collapsed
  - Category with icon and expanded
  - Category item
  - Category item selected
  - Category with icon and category item
  - Category with icon and category item selected

## Side navigation

### Title bar

![Spec](https://user-images.githubusercontent.com/3901764/45775998-1b1daf00-bc17-11e8-95a0-a0d9ca5d1f2a.png)

## Tokens

## Header & header-panel

| `#` | Variable/token        | Role                                                    | Experimental theme value |
| --- | --------------------- | ------------------------------------------------------- | ------------------------ |
| 1   | $shell-header-bg-01   | Header bar background                                   | $gray-90                 |
| 2   | $shell-header-bg-02   | Header-panel background                                 | $gray-10                 |
| 3   | $shell-header-bg-03   | Panel Item hover                                        | $gray-20                 |
| 4   | $shell-header-text-01 | Primary text in header <br> Tab text <br> Product label | $gray-10                 |
| 5   | $shell-header-text-02 | Primary text in header-panel <br> item text             | $gray-90                 |
| 6   | $shell-header-text-03 | Secondary text in header-panel <br> Category label      | $gray-70                 |
| 7   | $shell-header-icon-01 | header bar icons                                        | $gray-10                 |
| 8   | $shell-header-icon-02 | icons in header-panel                                   | $gray-90                 |
| 9   | $shell-header-link    | item link                                               | $blue-60                 |
| 10  | $shell-header-icon-03 | Header icon <br> selected state background              | $blue-60                 |

## Side-nav

| `#` | Variable/token            | Role                                                                                                                      | Experimental theme value |
| --- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 1   | $shell-side-nav-bg-01     | Side-nav panel background                                                                                                 | $gray-90                 |
| 2   | $shell-side-nav-bg-02     | Selected category background <br> Select L2 flatted item background <br> Item hover background <br> Footer-bar background | $gray-80                 |
| 3   | $shell-side-nav-bg-03     | Selected L2 nested item                                                                                                   | $gray-70                 |
| 4   | $shell-side-nav-text-01   | Primary text in side-nav <br> L2 Flatten item text <br> L2 Nested item text <br> L1 title text                            | $gray-10                 |
| 5   | $shell-side-nav-text-02   | Secondary text in side nav <br> L2 Category label                                                                         | $gray-30                 |
| 6   | $shell-side-nav-icon-01   | side-nav icon color                                                                                                       | $gray-10                 |
| 7   | $shell-side-nav-accent-01 | item highlight bar                                                                                                        | $blue-60                 |
