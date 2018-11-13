import React from 'react';
import { storiesOf } from '@storybook/react';
import StopSolidFilled16 from '../../../lib/StopSolidFilled/16';

storiesOf('StopSolidFilled16', module)
  .add('default', () => <StopSolidFilled16 />)
  .add('with accessibility label', () => (
    <StopSolidFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopSolidFilled16 focusable>
      <title>Icon title</title>
    </StopSolidFilled16>
  ));
