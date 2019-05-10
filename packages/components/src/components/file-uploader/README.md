### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { FileUploader } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var FileUploader = CarbonComponents.FileUploader;
```

#### Instantiating

```javascript
// `#my-file` is an element with `[data-file]` attribute
FileUploader.create(document.getElementById('my-file'));
```

#### Public Methods

| Name       | Params                                     | Description                                                                                                      |
| ---------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `setState` | `state`: `String`, `selectIndex`: `Number` | After files are added, call this method to change `state` of the filenames (`'upload'`, `'complete'`, `'edit'`). |
| `release`  |                                            | Deletes the instance                                                                                             |

##### Example - Changing the uploading state

```javascript
// `#my-file` is an element with `[data-file]` attribute
var fileUploaderInstance = FileUploader.create(
  document.getElementById('my-file')
);
// Makes the 2nd file shown as its uploading complete
fileUploaderInstance.setState('complete', 1);
```

#### Options

| Option                | Default Selector                      | Description                                           |
| --------------------- | ------------------------------------- | ----------------------------------------------------- |
| `selectorInit`        | `[data-file]`                         | Element for initializing instance                     |
| `selectorInput`       | `[input[type="file"].bx--file-input]` | Input element                                         |
| `selectorContainer`   | `[data-file-container]`               | Element for injecting HTML for upload and edit states |
| `selectorCloseButton` | `.bx--file-close`                     | Close button for removing filename nodes              |

#### Events

| Event Name                              | Description                                                                                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `change`                                | When files are added to File Uploader, a change event is fired. This also triggers custom events; see eventBeforeDisplayFilesFileuploader and eventAfterDisplayFilesFileuploader` |
| `eventBeforeDeleteFilenameFileuploader` | Triggered before clicking on close button(s) inside filename node(s).                                                                                                             |
| `eventAfterDeleteFilenameFileuploader`  | Triggered after clicking on close button(s) inside filename node(s).                                                                                                              |

### FAQ

#### Using and understanding File Uploader

When files are added to File Uploader, a `change` event is fired. The `change`
event triggers a private method to inject HTML into the `selectorContainer`
element displaying all added filenames.

![file](https://cloud.githubusercontent.com/assets/4185382/24562175/7fcb4502-160f-11e7-8d9c-5ef4bdd67194.gif)

Trigger additional states using `setState()` public method. Additional states
are **edit**, **complete** and **upload**.

**Edit** injects close icons into each filename state container. A `click` event
listener is also added to remove the filename when close button is clicked.

![edit](https://cloud.githubusercontent.com/assets/4185382/24562305/f3660b28-160f-11e7-9c67-c47829597931.gif)

```scss
.bx--file__state-container .bx--file-close {
  width: 1rem;
  height: 1rem;
  fill: $text-01;
  cursor: pointer;
}
```

**Upload** injects Loading components into each filename state container.

Developers using File Uploader will be able to use JavaScript to inject a
Loading component when selected files are _actually_ being uploaded. Users can
select a **single** file or **multiple** files. By default, any file type is
accepted. It's up to the developer and their design team to specify and
implement validations for which file types are acceptable.

![upload](https://cloud.githubusercontent.com/assets/4185382/24562332/114feabe-1610-11e7-9aba-3ca74ef9e8cc.gif)

**Complete** injects checkmark icons into each filename state container.

![complete](https://cloud.githubusercontent.com/assets/4185382/24562373/2f901fbc-1610-11e7-97f4-153f16bcbcfc.pngtrun)

```scss
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

File Uploader color contrast ratios are accessible. Since File Uploader
(specifically filename elements) low-opacity colors, verifying color ratios with
IBM a11y tool may not yield passing results.

However, evaluating resulting background colors as solid colors will pass.

| Opacity + UI background color | Actual background color | Text color | WCAG AA Color Ratio | Passes 4.5?        |
| ----------------------------- | ----------------------- | ---------- | ------------------- | ------------------ |
| `#5a6872` at 10% on `#ffffff` | `#cedbec`               | `#152935`  | 10.70               | :white_check_mark: |
| `#5a6872` at 10% on `#f5f7fa` | `#c6d5e8`               | `#152935`  | 10.07               | :white_check_mark: |

#### Truncating long filenames

By default, filenames are truncated so that any filename that goes beyond
`300px` will be cutoff.

![image](https://cloud.githubusercontent.com/assets/4185382/24562399/4a00f560-1610-11e7-97c1-9113fb299160.png)

Truncating filenames is enabled through the use of
`@mixin text-overflow($size)`.

You can override this behavior with SCSS by giving the `@mixin` a new `width` by
overriding this `@mixin`.

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
