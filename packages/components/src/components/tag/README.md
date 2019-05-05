### SCSS

#### Mixins

Mixins specific to tag are located in [src/components/tag/\_mixins.scss]().

| Name        | Params                     | Description                                |
| ----------- | -------------------------- | ------------------------------------------ |
| `tag-theme` | `$bg-color`, `$text-color` | Adds given background-color and text color |

#### Modifiers

Use these modifiers with `.bx--tag` class.

| Selector                 | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `.bx--tag--ibm`          | Apply the colors for an IBM branded service tag.     |
| `.bx--tag--beta`         | Apply the colors for a beta service tag.             |
| `.bx--tag--third-party`  | Apply the colors for a third-party vendor tag.       |
| `.bx--tag--local`        | Apply the colors for a local tag.                    |
| `.bx--tag--dedicated`    | Apply the colors for a dedicated tag.                |
| `.bx--tag--custom`       | Apply the colors for a custom tag.                   |
| `.bx--tag--experimental` | Apply the colors for an experimental tag.            |
| `.bx--tag--community`    | Apply the colors for a community-driven service tag. |
| `.bx--tag--private`      | Apply the colors for a private tag.                  |
| `.bx--tag--deprecated`   | Apply the colors for a deprecated tag.               |
