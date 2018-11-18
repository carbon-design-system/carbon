import React from 'react';
import { storiesOf } from '@storybook/react';
import Settings32 from '../../../es/settings/32.js';

storiesOf('Settings32', module)
  .add('default', () => <Settings32 />)
  .add('with accessibility label', () => (
    <Settings32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Settings32 aria-label="Icon label">
      <title>Icon title</title>
    </Settings32>
  ));
