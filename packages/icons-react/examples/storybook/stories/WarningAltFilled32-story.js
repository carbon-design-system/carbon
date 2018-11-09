import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAltFilled32 from '../../../lib/WarningAltFilled/32';

storiesOf('WarningAltFilled32', module)
  .add('default', () => <WarningAltFilled32 />)
  .add('with accessibility label', () => (
    <WarningAltFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAltFilled32 focusable>
      <title>Icon title</title>
    </WarningAltFilled32>
  ));
