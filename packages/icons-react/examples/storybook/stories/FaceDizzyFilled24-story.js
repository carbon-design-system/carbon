import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDizzyFilled24 from '../../../es/face--dizzy--filled/24.js';

storiesOf('FaceDizzyFilled24', module)
  .add('default', () => <FaceDizzyFilled24 />)
  .add('with accessibility label', () => (
    <FaceDizzyFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDizzyFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDizzyFilled24>
  ));
