import React from 'react';
import { storiesOf } from '@storybook/react';
import Code32 from '../../../es/code/32.js';

storiesOf('Code32', module)
  .add('default', () => <Code32 />)
  .add('with accessibility label', () => (
    <Code32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Code32 aria-label="Icon label">
      <title>Icon title</title>
    </Code32>
  ));
