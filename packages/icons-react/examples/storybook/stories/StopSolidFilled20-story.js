import React from 'react';
import { storiesOf } from '@storybook/react';
import StopSolidFilled20 from '../../../es/stop--solid--filled/20.js';

storiesOf('StopSolidFilled20', module)
  .add('default', () => <StopSolidFilled20 />)
  .add('with accessibility label', () => (
    <StopSolidFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopSolidFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </StopSolidFilled20>
  ));
