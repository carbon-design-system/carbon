import React from 'react';
import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import ThemeContainer from './ThemeContainer';

const appContainerDecorator = (story) => (
  <ThemeContainer story={story} />
);
addDecorator(appContainerDecorator);

setAddon(infoAddon);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('./', true, /Story\.js$/));
}

configure(loadStories, module);
