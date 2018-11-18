import React from 'react';
import { storiesOf } from '@storybook/react';
import QTAlt32 from '../../../es/Q/T--alt/32.js';

storiesOf('QTAlt32', module)
  .add('default', () => <QTAlt32 />)
  .add('with accessibility label', () => (
    <QTAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QTAlt32 aria-label="Icon label">
      <title>Icon title</title>
    </QTAlt32>
  ));
