import React from 'react';
import { storiesOf } from '@storybook/react';
import Warning32 from '../../../lib/Warning/32';

storiesOf('Warning32', module)
  .add('default', () => <Warning32 />)
  .add('with accessibility label', () => (
    <Warning32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Warning32 focusable>
      <title>Icon title</title>
    </Warning32>
  ));
