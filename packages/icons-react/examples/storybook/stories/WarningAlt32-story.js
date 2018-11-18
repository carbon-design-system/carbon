import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAlt32 from '../../../es/warning--alt/32.js';

storiesOf('WarningAlt32', module)
  .add('default', () => <WarningAlt32 />)
  .add('with accessibility label', () => (
    <WarningAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAlt32 aria-label="Icon label">
      <title>Icon title</title>
    </WarningAlt32>
  ));
