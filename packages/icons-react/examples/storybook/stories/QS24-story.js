import React from 'react';
import { storiesOf } from '@storybook/react';
import QS24 from '../../../es/Q/S/24.js';

storiesOf('QS24', module)
  .add('default', () => <QS24 />)
  .add('with accessibility label', () => (
    <QS24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QS24 aria-label="Icon label">
      <title>Icon title</title>
    </QS24>
  ));
