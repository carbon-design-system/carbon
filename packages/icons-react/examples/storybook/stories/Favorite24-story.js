import React from 'react';
import { storiesOf } from '@storybook/react';
import Favorite24 from '../../../es/favorite/24.js';

storiesOf('Favorite24', module)
  .add('default', () => <Favorite24 />)
  .add('with accessibility label', () => (
    <Favorite24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Favorite24 aria-label="Icon label">
      <title>Icon title</title>
    </Favorite24>
  ));
