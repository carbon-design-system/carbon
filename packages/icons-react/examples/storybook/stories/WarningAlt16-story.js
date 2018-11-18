import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAlt16 from '../../../es/warning--alt/16.js';

storiesOf('WarningAlt16', module)
  .add('default', () => <WarningAlt16 />)
  .add('with accessibility label', () => (
    <WarningAlt16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAlt16 aria-label="Icon label">
      <title>Icon title</title>
    </WarningAlt16>
  ));
