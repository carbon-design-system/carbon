import React from 'react';
import { storiesOf } from '@storybook/react';
import FacePending24 from '../../../es/face--pending/24.js';

storiesOf('FacePending24', module)
  .add('default', () => <FacePending24 />)
  .add('with accessibility label', () => (
    <FacePending24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FacePending24 aria-label="Icon label">
      <title>Icon title</title>
    </FacePending24>
  ));
