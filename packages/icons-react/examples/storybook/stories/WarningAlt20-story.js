import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningAlt20 from '../../../es/warning--alt/20.js';

storiesOf('WarningAlt20', module)
  .add('default', () => <WarningAlt20 />)
  .add('with accessibility label', () => (
    <WarningAlt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningAlt20 aria-label="Icon label">
      <title>Icon title</title>
    </WarningAlt20>
  ));
