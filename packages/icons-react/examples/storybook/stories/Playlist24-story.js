import React from 'react';
import { storiesOf } from '@storybook/react';
import Playlist24 from '../../../es/playlist/24.js';

storiesOf('Playlist24', module)
  .add('default', () => <Playlist24 />)
  .add('with accessibility label', () => (
    <Playlist24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Playlist24 aria-label="Icon label">
      <title>Icon title</title>
    </Playlist24>
  ));
