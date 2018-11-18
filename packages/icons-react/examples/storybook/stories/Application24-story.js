import React from 'react';
import { storiesOf } from '@storybook/react';
import Application24 from '../../../es/application/24.js';

storiesOf('Application24', module)
  .add('default', () => <Application24 />)
  .add('with accessibility label', () => (
    <Application24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Application24 aria-label="Icon label">
      <title>Icon title</title>
    </Application24>
  ));
