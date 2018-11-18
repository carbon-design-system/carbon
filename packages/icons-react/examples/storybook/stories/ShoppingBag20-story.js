import React from 'react';
import { storiesOf } from '@storybook/react';
import ShoppingBag20 from '../../../es/shopping--bag/20.js';

storiesOf('ShoppingBag20', module)
  .add('default', () => <ShoppingBag20 />)
  .add('with accessibility label', () => (
    <ShoppingBag20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ShoppingBag20 aria-label="Icon label">
      <title>Icon title</title>
    </ShoppingBag20>
  ));
