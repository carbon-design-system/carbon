import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDissatisfied24 from '../../../es/face--dissatisfied/24.js';

storiesOf('FaceDissatisfied24', module)
  .add('default', () => <FaceDissatisfied24 />)
  .add('with accessibility label', () => (
    <FaceDissatisfied24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDissatisfied24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDissatisfied24>
  ));
