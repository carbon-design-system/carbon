import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDizzy20 from '../../../es/face--dizzy/20.js';

storiesOf('FaceDizzy20', module)
  .add('default', () => <FaceDizzy20 />)
  .add('with accessibility label', () => (
    <FaceDizzy20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDizzy20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDizzy20>
  ));
