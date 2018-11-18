import React from 'react';
import { storiesOf } from '@storybook/react';
import Settings16 from '../../../es/settings/16.js';

storiesOf('Settings16', module)
  .add('default', () => <Settings16 />)
  .add('with accessibility label', () => (
    <Settings16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Settings16 aria-label="Icon label">
      <title>Icon title</title>
    </Settings16>
  ));
