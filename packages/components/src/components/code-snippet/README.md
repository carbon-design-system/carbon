### SCSS

#### Mixins

Mixins specific to Code Snippet are located in
[src/components/code-snippet/\_mixins.scss]().

| Name          | Params | Description               |
| ------------- | ------ | ------------------------- |
| `bx--snippet` |        | Common styles for Snippet |

#### Modifiers

Use these modifiers with `.bx--snippet` class.

| Selector               | Description                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `.bx--snippet--single` | Selector for single lines of code                                                                                |
| `.bx--snippet--multi`  | Selector for multiple lines of code                                                                              |
| `.bx--snippet--inline` | Selector for inline code inside text                                                                             |
| `.bx--snippet--light`  | Selector for inline code inside text with a light background. Can only be used with .bx--snippet-inline selector |
