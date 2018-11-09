import React from 'react';
import { storiesOf } from '@storybook/react';
import Settings32 from '../../../lib/Settings/32';

storiesOf('Settings32', module)
  .add('default', () => <Settings32 />)
  .add('with accessibility label', () => (
    <Settings32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Settings32 focusable>
      <title>Icon title</title>
    </Settings32>
  ));
