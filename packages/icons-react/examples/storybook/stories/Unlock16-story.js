import React from 'react';
import { storiesOf } from '@storybook/react';
import Unlock16 from '../../../lib/unlock/16';

storiesOf('Unlock16', module)
  .add('default', () => <Unlock16 />)
  .add('with accessibility label', () => (
    <Unlock16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Unlock16 focusable>
      <title>Icon title</title>
    </Unlock16>
  ));
