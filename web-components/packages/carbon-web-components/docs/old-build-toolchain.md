# Using `carbon-web-components` with old build toolchain

`carbon-web-components` package ships with code that is optimized for modern browsers.

We have seen that old Webpack, old Babel or UglifyJS2 cannot parse object rest operator in our code unless our code is transpiled with `transform-object-rest-spread` Babel plugin. Here are some details:

- https://github.com/webpack/webpack/issues/5548
- https://github.com/babel/babel-loader/issues/170
- https://github.com/mishoo/UglifyJS2/issues/448

We recommend upgrading build toolchain that will solve the problem. In case you still like to keep using older build toolchain, make sure our code is transpiled with appropriate set of Babel plugins, including `transform-object-rest-spread`. Here's an example with Webpack2/Babel6:

```javascript
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [
        path.dirname(require.resolve('@carbon/web-components/es')),
      ],
      use: [
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            plugins: ['transform-object-rest-spread']
          }
        }
      ]
    },
    ...
  ]
}
```
