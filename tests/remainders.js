import './utils/es6-weak-map-global'; // For PhantomJS

// Ref: https://github.com/karma-runner/karma-coverage/issues/125#issuecomment-241229152
[
  require.context('../consumables/js/es2015', true, /^.(?![\\/](docs[\\/]|examples[\\/]|index)).*\.js$/),
  require.context('../consumables/js/misc', true, /\.js$/),
  require.context('../consumables/js/polyfills', true, /\.js$/),
].forEach((context) => {
  context.keys().forEach(context);
});
