import React from 'react';
import { storiesOf } from '@storybook/react';
import ShoppingBag32 from '../../../es/shopping--bag/32.js';

storiesOf('ShoppingBag32', module)
  .add('default', () => <ShoppingBag32 />)
  .add('with accessibility label', () => (
    <ShoppingBag32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ShoppingBag32 aria-label="Icon label">
      <title>Icon title</title>
    </ShoppingBag32>
  ));
