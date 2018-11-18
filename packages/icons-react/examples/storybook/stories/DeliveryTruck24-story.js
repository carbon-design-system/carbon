import React from 'react';
import { storiesOf } from '@storybook/react';
import DeliveryTruck24 from '../../../es/delivery-truck/24.js';

storiesOf('DeliveryTruck24', module)
  .add('default', () => <DeliveryTruck24 />)
  .add('with accessibility label', () => (
    <DeliveryTruck24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DeliveryTruck24 aria-label="Icon label">
      <title>Icon title</title>
    </DeliveryTruck24>
  ));
