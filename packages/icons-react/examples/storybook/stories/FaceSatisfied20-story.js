import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceSatisfied20 from '../../../es/face--satisfied/20.js';

storiesOf('FaceSatisfied20', module)
  .add('default', () => <FaceSatisfied20 />)
  .add('with accessibility label', () => (
    <FaceSatisfied20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceSatisfied20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceSatisfied20>
  ));
