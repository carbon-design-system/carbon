import React from 'react';
import { storiesOf } from '@storybook/react';
import Playlist32 from '../../../lib/playlist/32';

storiesOf('Playlist32', module)
  .add('default', () => <Playlist32 />)
  .add('with accessibility label', () => (
    <Playlist32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Playlist32 focusable>
      <title>Icon title</title>
    </Playlist32>
  ));
