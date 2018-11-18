import React from 'react';
import { storiesOf } from '@storybook/react';
import FacePending20 from '../../../es/face--pending/20.js';

storiesOf('FacePending20', module)
  .add('default', () => <FacePending20 />)
  .add('with accessibility label', () => (
    <FacePending20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FacePending20 aria-label="Icon label">
      <title>Icon title</title>
    </FacePending20>
  ));
