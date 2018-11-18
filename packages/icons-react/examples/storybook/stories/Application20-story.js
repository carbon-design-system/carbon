import React from 'react';
import { storiesOf } from '@storybook/react';
import Application20 from '../../../es/application/20.js';

storiesOf('Application20', module)
  .add('default', () => <Application20 />)
  .add('with accessibility label', () => (
    <Application20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Application20 aria-label="Icon label">
      <title>Icon title</title>
    </Application20>
  ));
