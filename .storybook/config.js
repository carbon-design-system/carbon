import React from 'react';
import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';

const style = {
  padding: '3em',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const CenterDecorator = (story) => (
  <div style={style}>
    {story()}
  </div>
);
addDecorator(CenterDecorator);

setAddon(infoAddon);

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  requireAll(require.context('./', true, /Story\.js$/));
}

configure(loadStories, module);
