import React from 'react';
import { storiesOf } from '@storybook/react';
import Gif32 from '../../../es/GIF/32.js';

storiesOf('Gif32', module)
  .add('default', () => <Gif32 />)
  .add('with accessibility label', () => (
    <Gif32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Gif32 aria-label="Icon label">
      <title>Icon title</title>
    </Gif32>
  ));
