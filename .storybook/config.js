import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/elements/PrimaryButton');
  require('../stories/containers/AppContainer');
}

configure(loadStories, module);
