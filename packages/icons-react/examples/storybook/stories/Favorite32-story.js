import React from 'react';
import { storiesOf } from '@storybook/react';
import Favorite32 from '../../../es/favorite/32.js';

storiesOf('Favorite32', module)
  .add('default', () => <Favorite32 />)
  .add('with accessibility label', () => (
    <Favorite32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Favorite32 aria-label="Icon label">
      <title>Icon title</title>
    </Favorite32>
  ));
