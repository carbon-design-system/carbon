import React from 'react';
import { storiesOf } from '@storybook/react';
import ShoppingCart24 from '../../../es/shopping--cart/24.js';

storiesOf('ShoppingCart24', module)
  .add('default', () => <ShoppingCart24 />)
  .add('with accessibility label', () => (
    <ShoppingCart24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ShoppingCart24 aria-label="Icon label">
      <title>Icon title</title>
    </ShoppingCart24>
  ));
