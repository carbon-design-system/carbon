import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningFilled16 from '../../../lib/WarningFilled/16';

storiesOf('WarningFilled16', module)
  .add('default', () => <WarningFilled16 />)
  .add('with accessibility label', () => (
    <WarningFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningFilled16 focusable>
      <title>Icon title</title>
    </WarningFilled16>
  ));
