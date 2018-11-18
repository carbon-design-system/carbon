import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDissatisfied20 from '../../../es/face--dissatisfied/20.js';

storiesOf('FaceDissatisfied20', module)
  .add('default', () => <FaceDissatisfied20 />)
  .add('with accessibility label', () => (
    <FaceDissatisfied20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDissatisfied20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDissatisfied20>
  ));
