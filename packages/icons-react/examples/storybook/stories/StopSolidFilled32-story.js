import React from 'react';
import { storiesOf } from '@storybook/react';
import StopSolidFilled32 from '../../../lib/StopSolidFilled/32';

storiesOf('StopSolidFilled32', module)
  .add('default', () => <StopSolidFilled32 />)
  .add('with accessibility label', () => (
    <StopSolidFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopSolidFilled32 focusable>
      <title>Icon title</title>
    </StopSolidFilled32>
  ));
