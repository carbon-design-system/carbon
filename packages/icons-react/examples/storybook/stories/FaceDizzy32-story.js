import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceDizzy32 from '../../../lib/FaceDizzy/32';

storiesOf('FaceDizzy32', module)
  .add('default', () => <FaceDizzy32 />)
  .add('with accessibility label', () => (
    <FaceDizzy32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceDizzy32 focusable>
      <title>Icon title</title>
    </FaceDizzy32>
  ));
