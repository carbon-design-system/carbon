#### Javascript

##### Public Methods

| Name       | Params                                 | Description                                                                                                                                                                                                                                                       |
|------------|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setState` | `state`: String, `selectIndex`: number | After files are added, call this method to change `state` of the filenames (`'upload'`, `'complete'`, `'edit'`). State is changed on all filenames when `selectIndex` is `undefined`. Give a `selectIndex` to select the index of the filename you want to change |

##### Options

| Option                | Default Selector                      | Description                                           |
|-----------------------|---------------------------------------|-------------------------------------------------------|
| `selectorInit`        | `[data-file]`                         | Element for initializing instance                     |
| `selectorInput`       | `[input[type="file"].bx--file-input]` | Input element                                         |
| `selectorContainer`   | `[data-file-container]`               | Element for injecting HTML for upload and edit states |
| `selectorCloseButton` | `.bx--file-close`                     | Close button for removing filename nodes              |

##### Events

| Event Name                              | Description                                                                                                                                                                          |
|-----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `change`                                | When files are added to File Uploader, a change event is fired. This also triggers custom events; see `eventBeforeDisplayFilesFileuploader` and `eventAfterDisplayFilesFileuploader` |
| `eventBeforeDeleteFilenameFileuploader` | Triggered before clicking on close button(s) inside filename node(s).                                                                                                                |
| `eventAfterDeleteFilenameFileuploader`  | Triggered after clicking on close button(s) inside filename node(s).                                                                                                                 |

### FAQ 

#### Using and understanding File Uploader

When files are added to File Uploader, a `change` event is fired.
The `change` event triggers a private method to inject HTML into the `selectorContainer` element displaying all added filenames.

![file-uploader-flow](https://media.github.ibm.com/user/76/files/5e736240-ec52-11e6-9251-32ffed4bc70b)

Trigger additional states using `setState()` public method. 
Additional states are **edit**, **complete** and **upload**.

**Edit** injects close icons into each filename state container. A `click` event listener is also added to remove the filename when close button is clicked.

---
***
> 
![file-uploader-flow-edit](https://media.github.ibm.com/user/76/files/f2abbdcc-ec52-11e6-938c-535458ffee6d)

```scss
.bx--file__state-container .bx--file-close {
  width: 1rem;
  height: 1rem;
  fill: $text-01;
  cursor: pointer;
}
```

**Upload** injects Loading components into each filename state container.

Developers using File Uploader will be able to use JavaScript to inject a Loading component when selected files are _actually_ being uploaded. 
Users can select a __single__ file or __multiple__ files.
By default, any file type is accepted.
It's up to the developer and their design team to specify and implement validations for which file types are acceptable.

---
***
> 
![file-uploader-flow-upload](https://media.github.ibm.com/user/76/files/ae239d28-ec52-11e6-8aff-03cd541a1003)

**Complete** injects checkmark icons into each filename state container.

---
***
> 
![complete](https://media.github.ibm.com/user/76/files/cf833552-000a-11e7-953c-89152f30046b)

```css
.bx--loading {
  width: 2rem;
  height: 2rem;
  margin-right: -7px;
}

.bx--loading__svg {
  stroke: $ui-05;
}
```

#### WCAG AA Color Accessibility

File Uploader color contrast ratios are accessible.
Since File Uploader (specifically filename elements) low-opacity colors, 
verifying color ratios with IBM a11y tool may not yield passing results.

However, evaluating resulting background colors as solid colors will pass.

| Opacity + UI background color | Actual background color | Text color | WCAG AA Color Ratio | Passes 4.5?        |
|-------------------------------|-------------------------|------------|---------------------|--------------------|
| `#5a6872` at 10% on `#ffffff` | `#cedbec`               | `#152935`  | 10.70               | :white_check_mark: |
| `#5a6872` at 10% on `#f5f7fa` | `#c6d5e8`               | `#152935`  | 10.07               | :white_check_mark: |

#### Truncating long filenames

By default, filenames are truncated so that any filename that goes beyond `300px` will be cutoff.


![image](https://media.github.ibm.com/user/76/files/9e8debe0-ed36-11e6-818f-e1efccb253cd)

Truncating filenames is enabled through the use of `@mixin text-overflow($size)`.

You can override this behavior with SCSS by giving the `@mixin` a new `width` by overriding this `@mixin`.

```scss
// Using mixin, override initial styles in _file-uploader.scss
.bx--file-filename {
  @include text-overflow(768px);
}
```

You can also use plain CSS by setting a new `width`.

```scss
.bx--file-filename {
  width: 768px;
}
```
