import React from 'react';
import { storiesOf } from '@storybook/react';
import FacePendingFilled32 from '../../../es/face--pending--filled/32.js';

storiesOf('FacePendingFilled32', module)
  .add('default', () => <FacePendingFilled32 />)
  .add('with accessibility label', () => (
    <FacePendingFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FacePendingFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </FacePendingFilled32>
  ));
