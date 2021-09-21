import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/vue';
// import { withInfo } from '@storybook/addon-info';

addDecorator(
  withOptions({
    name: '@carbon/icons-vue',
    url:
      'https://github.com/carbon-design-system/carbon/tree/master/packages/icons-vue',
  })
);

// addDecorator(withInfo);

function loadStories() {
  const req = require.context('../stories', true, /\-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
