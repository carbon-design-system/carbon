import React from 'react';
import { storiesOf } from '@storybook/react';
import ShoppingBag24 from '../../../es/shopping--bag/24.js';

storiesOf('ShoppingBag24', module)
  .add('default', () => <ShoppingBag24 />)
  .add('with accessibility label', () => (
    <ShoppingBag24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ShoppingBag24 aria-label="Icon label">
      <title>Icon title</title>
    </ShoppingBag24>
  ));
