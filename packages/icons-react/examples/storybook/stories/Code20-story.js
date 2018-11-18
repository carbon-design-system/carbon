import React from 'react';
import { storiesOf } from '@storybook/react';
import Code20 from '../../../es/code/20.js';

storiesOf('Code20', module)
  .add('default', () => <Code20 />)
  .add('with accessibility label', () => (
    <Code20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Code20 aria-label="Icon label">
      <title>Icon title</title>
    </Code20>
  ));
