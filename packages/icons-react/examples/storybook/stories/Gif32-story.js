import React from 'react';
import { storiesOf } from '@storybook/react';
import Gif32 from '../../../lib/GIF/32';

storiesOf('Gif32', module)
  .add('default', () => <Gif32 />)
  .add('with accessibility label', () => (
    <Gif32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Gif32 focusable>
      <title>Icon title</title>
    </Gif32>
  ));
