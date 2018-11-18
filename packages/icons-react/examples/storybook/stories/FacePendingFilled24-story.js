import React from 'react';
import { storiesOf } from '@storybook/react';
import FacePendingFilled24 from '../../../es/face--pending--filled/24.js';

storiesOf('FacePendingFilled24', module)
  .add('default', () => <FacePendingFilled24 />)
  .add('with accessibility label', () => (
    <FacePendingFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FacePendingFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </FacePendingFilled24>
  ));
