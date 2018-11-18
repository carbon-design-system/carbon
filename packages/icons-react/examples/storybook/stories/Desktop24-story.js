import React from 'react';
import { storiesOf } from '@storybook/react';
import Desktop24 from '../../../es/desktop/24.js';

storiesOf('Desktop24', module)
  .add('default', () => <Desktop24 />)
  .add('with accessibility label', () => (
    <Desktop24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Desktop24 aria-label="Icon label">
      <title>Icon title</title>
    </Desktop24>
  ));
