### FAQ

#### How to remove a breadcrumb-item slash

Use CSS to override breadcrumb styles to hide any unwanted slashes.
Slashes are created using CSS pseudo elements (`::after`).
Setting this to `display: none` will remove the associated slash.

```scss
/* Removes the slash from the last breadcrumb-item */

.bx--breadcrumb-item:last-child::after {
  display: none;
}
```
