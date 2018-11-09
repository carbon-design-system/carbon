import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAlt32 from '../../../lib/WarningAlt/32';

storiesOf('WarningAlt32', module)
  .add('default', () => <WarningAlt32 />)
  .add('with accessibility label', () => (
    <WarningAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAlt32 focusable>
      <title>Icon title</title>
    </WarningAlt32>
  ));
