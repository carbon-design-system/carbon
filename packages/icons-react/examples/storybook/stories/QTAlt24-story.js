import React from 'react';
import { storiesOf } from '@storybook/react';
import QTAlt24 from '../../../es/Q/T--alt/24.js';

storiesOf('QTAlt24', module)
  .add('default', () => <QTAlt24 />)
  .add('with accessibility label', () => (
    <QTAlt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QTAlt24 aria-label="Icon label">
      <title>Icon title</title>
    </QTAlt24>
  ));
