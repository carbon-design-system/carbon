import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningFilled20 from '../../../es/warning--filled/20.js';

storiesOf('WarningFilled20', module)
  .add('default', () => <WarningFilled20 />)
  .add('with accessibility label', () => (
    <WarningFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </WarningFilled20>
  ));
