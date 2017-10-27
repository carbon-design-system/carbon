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

Or you can add `.bx--breadcrumb--no-trailing-slash` to `.bx--breadcrumb` to remove leading slashes. 

```html
/* Removes the slash from the last breadcrumb-item */
<div class="bx--breadcrumb bx--breadcrumb--no-trailing-slash">
  <div class="bx--breadcrumb-item">
    <a href="#" class="bx--link">Breadcrumb 1</a>
  </div>
  <div class="bx--breadcrumb-item">
    <a href="#" class="bx--link">Breadcrumb 2</a>
  </div>
  <div class="bx--breadcrumb-item">
    <span>Breadcrumb 3</span>
  </div>
</div>
```
