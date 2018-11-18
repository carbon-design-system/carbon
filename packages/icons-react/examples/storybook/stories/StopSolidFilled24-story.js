import React from 'react';
import { storiesOf } from '@storybook/react';
import StopSolidFilled24 from '../../../es/stop--solid--filled/24.js';

storiesOf('StopSolidFilled24', module)
  .add('default', () => <StopSolidFilled24 />)
  .add('with accessibility label', () => (
    <StopSolidFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopSolidFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </StopSolidFilled24>
  ));
