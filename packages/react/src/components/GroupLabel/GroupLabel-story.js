import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import GroupLabel from './GroupLabel';
import { Tooltip } from 'carbon-components-react';

const additionalProps = {
  className: 'some-class',
};

storiesOf('GroupLabel', module)
  .add(
    'Default',
    withInfo({
      text: 'Group label.',
    })(() => <GroupLabel {...additionalProps}>Label</GroupLabel>)
  )
  .add(
    'With tooltip',
    withInfo({
      text: 'Form label with tooltip.',
    })(() => (
      <GroupLabel {...additionalProps}>
        <Tooltip triggerText="Label">
          This is the content of the tooltip.
        </Tooltip>
      </GroupLabel>
    ))
  );
