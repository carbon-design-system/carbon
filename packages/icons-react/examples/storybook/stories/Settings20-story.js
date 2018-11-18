import React from 'react';
import { storiesOf } from '@storybook/react';
import Settings20 from '../../../es/settings/20.js';

storiesOf('Settings20', module)
  .add('default', () => <Settings20 />)
  .add('with accessibility label', () => (
    <Settings20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Settings20 aria-label="Icon label">
      <title>Icon title</title>
    </Settings20>
  ));
