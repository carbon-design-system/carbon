import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAltFilled24 from '../../../es/warning--alt--filled/24.js';

storiesOf('WarningAltFilled24', module)
  .add('default', () => <WarningAltFilled24 />)
  .add('with accessibility label', () => (
    <WarningAltFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAltFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </WarningAltFilled24>
  ));
