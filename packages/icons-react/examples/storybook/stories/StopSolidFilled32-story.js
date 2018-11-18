import React from 'react';
import { storiesOf } from '@storybook/react';
import StopSolidFilled32 from '../../../es/stop--solid--filled/32.js';

storiesOf('StopSolidFilled32', module)
  .add('default', () => <StopSolidFilled32 />)
  .add('with accessibility label', () => (
    <StopSolidFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopSolidFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </StopSolidFilled32>
  ));
