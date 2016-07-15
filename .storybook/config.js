import { configure } from '@kadira/storybook';

function loadStories() {
  require('./elements/PrimaryButton');
  require('./containers/AppContainer');
}

configure(loadStories, module);
