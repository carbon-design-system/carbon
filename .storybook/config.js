import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories/elements/PrimaryButton');
}

configure(loadStories, module);
