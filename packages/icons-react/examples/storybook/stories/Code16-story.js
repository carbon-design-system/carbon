import React from 'react';
import { storiesOf } from '@storybook/react';
import Code16 from '../../../lib/Code/16';

storiesOf('Code16', module)
  .add('default', () => <Code16 />)
  .add('with accessibility label', () => (
    <Code16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Code16 focusable>
      <title>Icon title</title>
    </Code16>
  ));
