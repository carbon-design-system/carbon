import React from 'react';
import { storiesOf } from '@storybook/react';
import StopFilled16 from '../../../lib/StopFilled/16';

storiesOf('StopFilled16', module)
  .add('default', () => <StopFilled16 />)
  .add('with accessibility label', () => (
    <StopFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopFilled16 focusable>
      <title>Icon title</title>
    </StopFilled16>
  ));
