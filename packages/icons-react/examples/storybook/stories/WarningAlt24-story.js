import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAlt24 from '../../../es/warning--alt/24.js';

storiesOf('WarningAlt24', module)
  .add('default', () => <WarningAlt24 />)
  .add('with accessibility label', () => (
    <WarningAlt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAlt24 aria-label="Icon label">
      <title>Icon title</title>
    </WarningAlt24>
  ));
