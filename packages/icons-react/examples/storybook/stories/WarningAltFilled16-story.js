import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAltFilled16 from '../../../lib/WarningAltFilled/16';

storiesOf('WarningAltFilled16', module)
  .add('default', () => <WarningAltFilled16 />)
  .add('with accessibility label', () => (
    <WarningAltFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAltFilled16 focusable>
      <title>Icon title</title>
    </WarningAltFilled16>
  ));
