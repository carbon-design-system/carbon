import React from 'react';
import { storiesOf } from '@storybook/react';
import FacePendingFilled32 from '../../../lib/face--pending--filled/32';

storiesOf('FacePendingFilled32', module)
  .add('default', () => <FacePendingFilled32 />)
  .add('with accessibility label', () => (
    <FacePendingFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FacePendingFilled32 focusable>
      <title>Icon title</title>
    </FacePendingFilled32>
  ));
