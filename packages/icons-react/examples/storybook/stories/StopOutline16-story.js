import React from 'react';
import { storiesOf } from '@storybook/react';
import StopOutline16 from '../../../lib/stop--outline/16';

storiesOf('StopOutline16', module)
  .add('default', () => <StopOutline16 />)
  .add('with accessibility label', () => (
    <StopOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopOutline16 focusable>
      <title>Icon title</title>
    </StopOutline16>
  ));
