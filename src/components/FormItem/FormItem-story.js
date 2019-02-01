/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import FormItem from './FormItem';
import NumberInput from '../NumberInput';

storiesOf('FormItem', module).add(
  'Default',
  () => (
    <FormItem>
      <NumberInput id="number-input-1" hideLabel />
    </FormItem>
  ),
  {
    info: {
      text: 'Form item.',
    },
  }
);
