import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDissatisfiedFilled24 from '../../../es/face--dissatisfied--filled/24.js';

storiesOf('FaceDissatisfiedFilled24', module)
  .add('default', () => <FaceDissatisfiedFilled24 />)
  .add('with accessibility label', () => (
    <FaceDissatisfiedFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDissatisfiedFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDissatisfiedFilled24>
  ));
