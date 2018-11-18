import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningFilled24 from '../../../es/warning--filled/24.js';

storiesOf('WarningFilled24', module)
  .add('default', () => <WarningFilled24 />)
  .add('with accessibility label', () => (
    <WarningFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </WarningFilled24>
  ));
