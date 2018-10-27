import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceSatisfiedFilled32 from '../../../lib/face--satisfied--filled/32';

storiesOf('FaceSatisfiedFilled32', module)
  .add('default', () => <FaceSatisfiedFilled32 />)
  .add('with accessibility label', () => (
    <FaceSatisfiedFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceSatisfiedFilled32 focusable>
      <title>Icon title</title>
    </FaceSatisfiedFilled32>
  ));
