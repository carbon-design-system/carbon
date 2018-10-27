import { addDecorator, configure } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';

withOptions({
  name: `@carbon/icons-react`,
  url:
    'https://github.com/IBM/carbon-elements/tree/master/packages/icons-react',
});

addDecorator(withInfo);

function loadStories() {
  const req = require.context('../stories', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
