import React from 'react';
import { storiesOf } from '@storybook/react';
import Copy32 from '../../../lib/Copy/32';

storiesOf('Copy32', module)
  .add('default', () => <Copy32 />)
  .add('with accessibility label', () => (
    <Copy32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Copy32 focusable>
      <title>Icon title</title>
    </Copy32>
  ));
