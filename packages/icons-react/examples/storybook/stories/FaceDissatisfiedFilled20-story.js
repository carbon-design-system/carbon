import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDissatisfiedFilled20 from '../../../es/face--dissatisfied--filled/20.js';

storiesOf('FaceDissatisfiedFilled20', module)
  .add('default', () => <FaceDissatisfiedFilled20 />)
  .add('with accessibility label', () => (
    <FaceDissatisfiedFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDissatisfiedFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDissatisfiedFilled20>
  ));
