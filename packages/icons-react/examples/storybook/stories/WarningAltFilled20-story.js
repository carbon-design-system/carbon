import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAltFilled20 from '../../../es/warning--alt--filled/20.js';

storiesOf('WarningAltFilled20', module)
  .add('default', () => <WarningAltFilled20 />)
  .add('with accessibility label', () => (
    <WarningAltFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAltFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </WarningAltFilled20>
  ));
