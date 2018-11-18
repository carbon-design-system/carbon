import React from 'react';
import { storiesOf } from '@storybook/react';
import Gif20 from '../../../es/GIF/20.js';

storiesOf('Gif20', module)
  .add('default', () => <Gif20 />)
  .add('with accessibility label', () => (
    <Gif20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Gif20 aria-label="Icon label">
      <title>Icon title</title>
    </Gif20>
  ));
