import React from 'react';
import { storiesOf } from '@storybook/react';
import Code32 from '../../../lib/code/32';

storiesOf('Code32', module)
  .add('default', () => <Code32 />)
  .add('with accessibility label', () => (
    <Code32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Code32 focusable>
      <title>Icon title</title>
    </Code32>
  ));
