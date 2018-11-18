import React from 'react';
import { storiesOf } from '@storybook/react';
import Code24 from '../../../es/code/24.js';

storiesOf('Code24', module)
  .add('default', () => <Code24 />)
  .add('with accessibility label', () => (
    <Code24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Code24 aria-label="Icon label">
      <title>Icon title</title>
    </Code24>
  ));
