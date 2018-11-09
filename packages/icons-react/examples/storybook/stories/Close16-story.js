import React from 'react';
import { storiesOf } from '@storybook/react';
import Close16 from '../../../lib/Close/16';

storiesOf('Close16', module)
  .add('default', () => <Close16 />)
  .add('with accessibility label', () => (
    <Close16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Close16 focusable>
      <title>Icon title</title>
    </Close16>
  ));
