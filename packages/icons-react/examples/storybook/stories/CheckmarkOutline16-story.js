import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkOutline16 from '../../../lib/checkmark--outline/16';

storiesOf('CheckmarkOutline16', module)
  .add('default', () => <CheckmarkOutline16 />)
  .add('with accessibility label', () => (
    <CheckmarkOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkOutline16 focusable>
      <title>Icon title</title>
    </CheckmarkOutline16>
  ));
