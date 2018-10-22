import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  name: `@carbon/icons-react`,
  url:
    'https://github.com/IBM/carbon-elements/tree/master/packages/icons-react',
});

function loadStories() {
  const req = require.context('../stories', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
