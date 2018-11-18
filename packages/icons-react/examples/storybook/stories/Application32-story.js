import React from 'react';
import { storiesOf } from '@storybook/react';
import Application32 from '../../../es/application/32.js';

storiesOf('Application32', module)
  .add('default', () => <Application32 />)
  .add('with accessibility label', () => (
    <Application32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Application32 aria-label="Icon label">
      <title>Icon title</title>
    </Application32>
  ));
