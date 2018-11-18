import React from 'react';
import { storiesOf } from '@storybook/react';
import ShoppingCart20 from '../../../es/shopping--cart/20.js';

storiesOf('ShoppingCart20', module)
  .add('default', () => <ShoppingCart20 />)
  .add('with accessibility label', () => (
    <ShoppingCart20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ShoppingCart20 aria-label="Icon label">
      <title>Icon title</title>
    </ShoppingCart20>
  ));
