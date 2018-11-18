import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDizzy32 from '../../../es/face--dizzy/32.js';

storiesOf('FaceDizzy32', module)
  .add('default', () => <FaceDizzy32 />)
  .add('with accessibility label', () => (
    <FaceDizzy32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDizzy32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceDizzy32>
  ));
