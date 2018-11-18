import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDizzy24 from '../../../es/face--dizzy/24.js';

storiesOf('FaceDizzy24', module)
  .add('default', () => <FaceDizzy24 />)
  .add('with accessibility label', () => (
    <FaceDizzy24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDizzy24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDizzy24>
  ));
