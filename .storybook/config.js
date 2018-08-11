import { configure } from '@storybook/html';

const req = require.context('../src', true, /-story.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
