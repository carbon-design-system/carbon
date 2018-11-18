import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceSatisfied32 from '../../../es/face--satisfied/32.js';

storiesOf('FaceSatisfied32', module)
  .add('default', () => <FaceSatisfied32 />)
  .add('with accessibility label', () => (
    <FaceSatisfied32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceSatisfied32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceSatisfied32>
  ));
