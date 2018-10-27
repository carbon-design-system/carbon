import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningFilled32 from '../../../lib/warning--filled/32';

storiesOf('WarningFilled32', module)
  .add('default', () => <WarningFilled32 />)
  .add('with accessibility label', () => (
    <WarningFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningFilled32 focusable>
      <title>Icon title</title>
    </WarningFilled32>
  ));
