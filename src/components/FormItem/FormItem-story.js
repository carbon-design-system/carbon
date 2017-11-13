import React from 'react';
import { storiesOf } from '@storybook/react';
import FormItem from './FormItem';
import NumberInput from '../NumberInput';

storiesOf('FormItem', module).addWithInfo(
  'Default',
  `
    Form item.

  `,
  () => (
    <FormItem>
      <NumberInput id="number-input-1" />
    </FormItem>
  )
);
