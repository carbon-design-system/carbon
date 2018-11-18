import React from 'react';
import { storiesOf } from '@storybook/react';
import FacePendingFilled20 from '../../../es/face--pending--filled/20.js';

storiesOf('FacePendingFilled20', module)
  .add('default', () => <FacePendingFilled20 />)
  .add('with accessibility label', () => (
    <FacePendingFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FacePendingFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </FacePendingFilled20>
  ));
