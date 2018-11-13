import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAlt16 from '../../../lib/WarningAlt/16';

storiesOf('WarningAlt16', module)
  .add('default', () => <WarningAlt16 />)
  .add('with accessibility label', () => (
    <WarningAlt16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAlt16 focusable>
      <title>Icon title</title>
    </WarningAlt16>
  ));
