import React from 'react';
import { storiesOf } from '@storybook/react';
import QCU120 from '../../../es/Q/cU1/20.js';

storiesOf('QCU120', module)
  .add('default', () => <QCU120 />)
  .add('with accessibility label', () => (
    <QCU120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCU120 aria-label="Icon label">
      <title>Icon title</title>
    </QCU120>
  ));
