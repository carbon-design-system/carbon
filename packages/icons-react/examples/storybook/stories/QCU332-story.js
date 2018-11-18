import React from 'react';
import { storiesOf } from '@storybook/react';
import QCU332 from '../../../es/Q/cU3/32.js';

storiesOf('QCU332', module)
  .add('default', () => <QCU332 />)
  .add('with accessibility label', () => (
    <QCU332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCU332 aria-label="Icon label">
      <title>Icon title</title>
    </QCU332>
  ));
