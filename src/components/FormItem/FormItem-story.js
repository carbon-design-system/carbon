import React from 'react';
import { storiesOf } from '@storybook/react';

import FormItem from './FormItem';
import NumberInput from '../NumberInput';

storiesOf('FormItem', module).add(
  'Default',
  () => (
    <FormItem>
      <NumberInput id="number-input-1" />
    </FormItem>
  ),
  {
    info: {
      text: 'Form item.',
    },
  }
);
