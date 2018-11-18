import React from 'react';
import { storiesOf } from '@storybook/react';
import Favorite16 from '../../../es/favorite/16.js';

storiesOf('Favorite16', module)
  .add('default', () => <Favorite16 />)
  .add('with accessibility label', () => (
    <Favorite16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Favorite16 aria-label="Icon label">
      <title>Icon title</title>
    </Favorite16>
  ));
