import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAltFilled16 from '../../../es/warning--alt--filled/16.js';

storiesOf('WarningAltFilled16', module)
  .add('default', () => <WarningAltFilled16 />)
  .add('with accessibility label', () => (
    <WarningAltFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAltFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </WarningAltFilled16>
  ));
