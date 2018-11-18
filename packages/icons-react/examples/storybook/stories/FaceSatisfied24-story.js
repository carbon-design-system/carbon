import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceSatisfied24 from '../../../es/face--satisfied/24.js';

storiesOf('FaceSatisfied24', module)
  .add('default', () => <FaceSatisfied24 />)
  .add('with accessibility label', () => (
    <FaceSatisfied24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceSatisfied24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceSatisfied24>
  ));
