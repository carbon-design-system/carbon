import React from 'react';
import { storiesOf } from '@storybook/react';
import DeliveryTruck32 from '../../../es/delivery-truck/32.js';

storiesOf('DeliveryTruck32', module)
  .add('default', () => <DeliveryTruck32 />)
  .add('with accessibility label', () => (
    <DeliveryTruck32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DeliveryTruck32 aria-label="Icon label">
      <title>Icon title</title>
    </DeliveryTruck32>
  ));
