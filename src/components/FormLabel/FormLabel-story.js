import React from 'react';
import { storiesOf } from '@storybook/react';
import FormLabel from './FormLabel';
import Tooltip from '../Tooltip';

const additionalProps = {
  className: 'some-class',
};

storiesOf('FormLabel', module)
  .addWithInfo(
    'Default',
    `
    Form label.

  `,
    () => <FormLabel {...additionalProps}>Label</FormLabel>
  )
  .addWithInfo(
    'With tooltip',
    `
    Form label with tooltip.
  `,
    () => (
      <FormLabel {...additionalProps}>
        <Tooltip triggerText="Label">
          This is the content of the tooltip.
        </Tooltip>
      </FormLabel>
    )
  );
