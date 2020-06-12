/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';

import FormLabel from './FormLabel';
import Tooltip from '../Tooltip';

const additionalProps = {
  className: 'some-class',
};

storiesOf('FormLabel', module)
  .add('Default', () => <FormLabel {...additionalProps}>Label</FormLabel>, {
    info: {
      text: 'Form label.',
    },
  })
  .add(
    'With tooltip',
    () => (
      <FormLabel {...additionalProps}>
        <Tooltip triggerText="Label">
          This is the content of the tooltip.
        </Tooltip>
      </FormLabel>
    ),
    {
      info: {
        text: 'Form label with tooltip.',
      },
    }
  );
