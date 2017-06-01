import React from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import infoAddon from '@storybook/addon-info';

setAddon(infoAddon);

const req = require.context('./components', true, /\.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <div
    style={{
      padding: '3em',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {story()}
  </div>
));

configure(loadStories, module);
