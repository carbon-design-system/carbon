import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import FormLabel from './FormLabel';
import Tooltip from '../Tooltip';

const additionalProps = {
  className: 'some-class',
};

storiesOf('FormLabel', module)
  .add(
    'Default',
    withInfo({
      text: 'Form label.',
    })(() => <FormLabel {...additionalProps}>Label</FormLabel>)
  )
  .add(
    'With tooltip',
    withInfo({
      text: 'Form label with tooltip.',
    })(() => (
      <FormLabel {...additionalProps}>
        <Tooltip triggerText="Label">
          This is the content of the tooltip.
        </Tooltip>
      </FormLabel>
    ))
  );
