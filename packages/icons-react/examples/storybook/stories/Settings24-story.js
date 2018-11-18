import React from 'react';
import { storiesOf } from '@storybook/react';
import Settings24 from '../../../es/settings/24.js';

storiesOf('Settings24', module)
  .add('default', () => <Settings24 />)
  .add('with accessibility label', () => (
    <Settings24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Settings24 aria-label="Icon label">
      <title>Icon title</title>
    </Settings24>
  ));
