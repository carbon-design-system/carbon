'use strict';

require('./utils/es6-weak-map-global'); // For PhantomJS

// Ref: https://github.com/karma-runner/karma-coverage/issues/125#issuecomment-241229152
[
  require.context('../src', true, /^.(?![\\/]index).*\.js$/),
].forEach((context) => {
  context.keys().forEach(context);
});
