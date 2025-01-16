// __tests__/enable-v12-overflowmenu-test.js
const { defineTest } = require('jscodeshift/dist/testUtils');

// Test with wrapping (default)
defineTest(
  __dirname,
  'enable-v12-overflowmenu',
  { wrap: 'true' },
  'enable-v12-overflowmenu'
);

// Test without wrapping
defineTest(
  __dirname,
  'enable-v12-overflowmenu',
  { wrap: 'false' },
  'enable-v12-overflowmenu-nowrap'
);
