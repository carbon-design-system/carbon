import { configure, addDecorator } from '@kadira/storybook';
import centered from '@kadira/react-storybook-decorator-centered';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('./', true, /Story\.js$/));
}

// addDecorator(centered);

configure(loadStories, module);
