# Dist

For users consuming Bluemix Components:

This folder is for getting access to `CSS` and `JavaScript (ES5)` for **prototyping only**.

### CSS

`bluemix-components.css` and `bluemix-components.min.css` are compiled from [styles.scss](https://github.ibm.com/Bluemix/bluemix-components/blob/master/styles.scss) -- these are used in [index.dust](https://github.ibm.com/Bluemix/bluemix-components/blob/master/views/index.dust) and can be used for prototyping.

```html
<link rel="stylesheet" href="bluemix-components.css" charset="utf-8">
```

These CSS files assume that you follow the same file structure to reference the relative paths for font files.

```
─ assets
  └── fonts
─ css
  ├── bluemix-components.css
  └── bluemix-components.min.css
```

### Assets

These are where we keep and manage media files like fonts,  images and icons.

The [font-face.scss](https://github.ibm.com/Bluemix/bluemix-components/blob/master/global/typography/font-face.scss) file sets up the font file using `@font-face`, then compiled into CSS by way of the [styles.scss](https://github.ibm.com/Bluemix/bluemix-components/blob/master/styles.scss).

These font files are also used on [index.dust](https://github.ibm.com/Bluemix/bluemix-components/blob/master/views/index.dust)

### JS

`bluemix-components.js` and `bluemix-components.min.js` are ES5-compatible files that are transpiled from [index.js](https://github.ibm.com/Bluemix/bluemix-components/blob/master/js/index.js) -- use this for prototyping.

```html
<script type="text/javascript" src="bluemix-components.js"></script>
```
