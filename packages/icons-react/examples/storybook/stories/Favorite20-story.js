import React from 'react';
import { storiesOf } from '@storybook/react';
import Favorite20 from '../../../es/favorite/20.js';

storiesOf('Favorite20', module)
  .add('default', () => <Favorite20 />)
  .add('with accessibility label', () => (
    <Favorite20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Favorite20 aria-label="Icon label">
      <title>Icon title</title>
    </Favorite20>
  ));
