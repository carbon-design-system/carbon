import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceSatisfiedFilled20 from '../../../es/face--satisfied--filled/20.js';

storiesOf('FaceSatisfiedFilled20', module)
  .add('default', () => <FaceSatisfiedFilled20 />)
  .add('with accessibility label', () => (
    <FaceSatisfiedFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceSatisfiedFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceSatisfiedFilled20>
  ));
