# `demo`

These are files specifically used for demonstration purposes.
Contributors and users can ignore this folder -- this is only for project maintainers.

```
demo
├── README.md
├── carbon-components.js
├── carbon-components.js.map
├── carbon-components.min.js
├── carbon-components.min.js.map
├── demo.css
├── scss
│   ├── _demo-colors.scss
│   ├── _demo-major-second.scss
│   ├── _demo-typography.scss
│   └── demo.scss
└── views
    ├── colors.html
    ├── demo-all.dust
    ├── demo-es5.html
    ├── typography-major-second.html
    └── typography.html
```

`views`: HTML files that are rendered when running `npm run dev` or `npm run serve`

`demo.css`: extra styles for showing typography, color swatches and major-second scale.

`demo.js`: a ready-built script that's transpiled from `app.js`

`demo.js.map`: sourcemap file for `demo.js`, used for debugging
