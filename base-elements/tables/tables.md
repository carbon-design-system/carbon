# Table

![table](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/7451/3399073a-c07c-11e5-9345-35b0abd5184a.png)

## Dependencies

```scss
// Path to bower_components
// (edit according to your file structure)
$path: 'bower_components/bluemix-components';

// Global
@import '#{path}/global/colors/colors';
@import '#{path}/global/fonts/font-face';
@import '#{path}/global/typography/typography';

// Base Elements
@import '#{path}/base-elements/tables/tables';
```

## Configurations

### Attributes

`data-sortable="true"`: use to modify `<th>` elements as a javascript hook for sorting columns of data.

```html
<tr class="table__row">
  <th class="table__column-title" data-sortable="true">Header Title</th>
  <th class="table__column-title">Header Title</th>
</tr>
```

`.table .cta`: makes a `<th>` or `<td>` element to become a container for a call-to-action (i.e. checkbox, status icon, etc).

`.table__main-title`: use to add a top-level title to your table.

![table main-title](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/7475/c4f02540-c0ec-11e5-9c20-cd38d715d403.png)

```html
<tr class="table__row">
  <th class="table__main-title">
    <strong>Table Title</strong>
    <a href="#" class="link">Link</a>
  </th>
</tr>
```
