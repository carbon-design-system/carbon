import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDizzyFilled32 from '../../../es/face--dizzy--filled/32.js';

storiesOf('FaceDizzyFilled32', module)
  .add('default', () => <FaceDizzyFilled32 />)
  .add('with accessibility label', () => (
    <FaceDizzyFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDizzyFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDizzyFilled32>
  ));
