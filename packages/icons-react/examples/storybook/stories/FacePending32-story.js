import React from 'react';
import { storiesOf } from '@storybook/react';
import FacePending32 from '../../../es/face--pending/32.js';

storiesOf('FacePending32', module)
  .add('default', () => <FacePending32 />)
  .add('with accessibility label', () => (
    <FacePending32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FacePending32 aria-label="Icon label">
      <title>Icon title</title>
    </FacePending32>
  ));
