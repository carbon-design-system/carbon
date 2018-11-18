import React from 'react';
import { storiesOf } from '@storybook/react';
import StopSolidFilled16 from '../../../es/stop--solid--filled/16.js';

storiesOf('StopSolidFilled16', module)
  .add('default', () => <StopSolidFilled16 />)
  .add('with accessibility label', () => (
    <StopSolidFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopSolidFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </StopSolidFilled16>
  ));
