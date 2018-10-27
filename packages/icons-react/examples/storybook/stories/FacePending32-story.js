import React from 'react';
import { storiesOf } from '@storybook/react';
import FacePending32 from '../../../lib/face--pending/32';

storiesOf('FacePending32', module)
  .add('default', () => <FacePending32 />)
  .add('with accessibility label', () => (
    <FacePending32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FacePending32 focusable>
      <title>Icon title</title>
    </FacePending32>
  ));
