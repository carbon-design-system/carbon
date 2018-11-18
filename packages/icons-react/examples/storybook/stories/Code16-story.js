import React from 'react';
import { storiesOf } from '@storybook/react';
import Code16 from '../../../es/code/16.js';

storiesOf('Code16', module)
  .add('default', () => <Code16 />)
  .add('with accessibility label', () => (
    <Code16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Code16 aria-label="Icon label">
      <title>Icon title</title>
    </Code16>
  ));
