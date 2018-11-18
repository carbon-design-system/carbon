import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDizzyFilled20 from '../../../es/face--dizzy--filled/20.js';

storiesOf('FaceDizzyFilled20', module)
  .add('default', () => <FaceDizzyFilled20 />)
  .add('with accessibility label', () => (
    <FaceDizzyFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDizzyFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDizzyFilled20>
  ));
