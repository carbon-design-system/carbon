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
