import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import ThemeContainer from './ThemeContainer';

setAddon(infoAddon);

const appContainerDecorator = story => <ThemeContainer story={story} />;
addDecorator(appContainerDecorator);

const req = require.context('./components', true, /\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
