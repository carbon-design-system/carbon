import React from 'react';
import { storiesOf } from '@storybook/react';
import QBarrier20 from '../../../es/Q/barrier/20.js';

storiesOf('QBarrier20', module)
  .add('default', () => <QBarrier20 />)
  .add('with accessibility label', () => (
    <QBarrier20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QBarrier20 aria-label="Icon label">
      <title>Icon title</title>
    </QBarrier20>
  ));
