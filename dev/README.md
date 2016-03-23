# Dev

These are files that are only meant for demo purposes that are exclusively used on bluemix-components source code when running locally.

### File Structure

These files can be built out with:
```
npm run dev
```

```
dev
├── README.md
├── css
│   └── dev.css
├── js
│   ├── demo.js
│   └── demo.js.map
└── scss
    ├── _dev-colors.scss
    ├── _dev-major-second.scss
    ├── _dev-typography.scss
    └── dev.scss

3 directories, 8 files
```

### SCSS and CSS

These are temporary files that are only meant to be used in bluemix-components development.
Once Colors and Typography is documented on the [Design System website](http://design-system.stage1.mybluemix.net/), the following files can be removed:

```
─ css
  └── dev.css
─ scss
  ├── _dev-colors.scss
  ├── _dev-major-second.scss
  ├── _dev-typography.scss
  └── dev.scss
```

CSS files are part of `.gitignore`

### JavaScript

The only file here is:
* `demo.js`

This is a file that's specifically built out for demo purposes on bluemix-components that's only meant to be used with [index.dust](https://github.ibm.com/Bluemix/bluemix-components/blob/master/views/index.dust), which is viewable when running this source code locally.

This `demo.js` file is part of `.gitignore`
