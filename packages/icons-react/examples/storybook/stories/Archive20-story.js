import React from 'react';
import { storiesOf } from '@storybook/react';
import Archive20 from '../../../es/archive/20.js';

storiesOf('Archive20', module)
  .add('default', () => <Archive20 />)
  .add('with accessibility label', () => (
    <Archive20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Archive20 aria-label="Icon label">
      <title>Icon title</title>
    </Archive20>
  ));
