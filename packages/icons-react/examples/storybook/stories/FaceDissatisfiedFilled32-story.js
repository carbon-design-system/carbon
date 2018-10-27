import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDissatisfiedFilled32 from '../../../lib/face--dissatisfied--filled/32';

storiesOf('FaceDissatisfiedFilled32', module)
  .add('default', () => <FaceDissatisfiedFilled32 />)
  .add('with accessibility label', () => (
    <FaceDissatisfiedFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDissatisfiedFilled32 focusable>
      <title>Icon title</title>
    </FaceDissatisfiedFilled32>
  ));
