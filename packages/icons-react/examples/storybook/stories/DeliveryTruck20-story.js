import React from 'react';
import { storiesOf } from '@storybook/react';
import DeliveryTruck20 from '../../../es/delivery-truck/20.js';

storiesOf('DeliveryTruck20', module)
  .add('default', () => <DeliveryTruck20 />)
  .add('with accessibility label', () => (
    <DeliveryTruck20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DeliveryTruck20 aria-label="Icon label">
      <title>Icon title</title>
    </DeliveryTruck20>
  ));
