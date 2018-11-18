import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningFilled16 from '../../../es/warning--filled/16.js';

storiesOf('WarningFilled16', module)
  .add('default', () => <WarningFilled16 />)
  .add('with accessibility label', () => (
    <WarningFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </WarningFilled16>
  ));
