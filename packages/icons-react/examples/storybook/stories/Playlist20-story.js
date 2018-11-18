import React from 'react';
import { storiesOf } from '@storybook/react';
import Playlist20 from '../../../es/playlist/20.js';

storiesOf('Playlist20', module)
  .add('default', () => <Playlist20 />)
  .add('with accessibility label', () => (
    <Playlist20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Playlist20 aria-label="Icon label">
      <title>Icon title</title>
    </Playlist20>
  ));
