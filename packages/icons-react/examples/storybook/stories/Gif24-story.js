import React from 'react';
import { storiesOf } from '@storybook/react';
import Gif24 from '../../../es/GIF/24.js';

storiesOf('Gif24', module)
  .add('default', () => <Gif24 />)
  .add('with accessibility label', () => (
    <Gif24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Gif24 aria-label="Icon label">
      <title>Icon title</title>
    </Gif24>
  ));
