import React from 'react';
import { storiesOf } from '@storybook/react';
import DeliveryTruck32 from '../../../lib/delivery-truck/32';

storiesOf('DeliveryTruck32', module)
  .add('default', () => <DeliveryTruck32 />)
  .add('with accessibility label', () => (
    <DeliveryTruck32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DeliveryTruck32 focusable>
      <title>Icon title</title>
    </DeliveryTruck32>
  ));
