import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDizzyFilled32 from '../../../lib/face--dizzy--filled/32';

storiesOf('FaceDizzyFilled32', module)
  .add('default', () => <FaceDizzyFilled32 />)
  .add('with accessibility label', () => (
    <FaceDizzyFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDizzyFilled32 focusable>
      <title>Icon title</title>
    </FaceDizzyFilled32>
  ));
