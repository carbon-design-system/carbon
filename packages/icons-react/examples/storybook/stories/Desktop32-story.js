import React from 'react';
import { storiesOf } from '@storybook/react';
import Desktop32 from '../../../es/desktop/32.js';

storiesOf('Desktop32', module)
  .add('default', () => <Desktop32 />)
  .add('with accessibility label', () => (
    <Desktop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Desktop32 aria-label="Icon label">
      <title>Icon title</title>
    </Desktop32>
  ));
