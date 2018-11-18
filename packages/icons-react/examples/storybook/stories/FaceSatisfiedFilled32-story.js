import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceSatisfiedFilled32 from '../../../es/face--satisfied--filled/32.js';

storiesOf('FaceSatisfiedFilled32', module)
  .add('default', () => <FaceSatisfiedFilled32 />)
  .add('with accessibility label', () => (
    <FaceSatisfiedFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceSatisfiedFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceSatisfiedFilled32>
  ));
