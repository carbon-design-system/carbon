import React from 'react';
import { storiesOf } from '@storybook/react';
import ShoppingCart32 from '../../../lib/ShoppingCart/32';

storiesOf('ShoppingCart32', module)
  .add('default', () => <ShoppingCart32 />)
  .add('with accessibility label', () => (
    <ShoppingCart32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ShoppingCart32 focusable>
      <title>Icon title</title>
    </ShoppingCart32>
  ));
