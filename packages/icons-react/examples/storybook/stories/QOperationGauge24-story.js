import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperationGauge24 from '../../../es/Q/operation--gauge/24.js';

storiesOf('QOperationGauge24', module)
  .add('default', () => <QOperationGauge24 />)
  .add('with accessibility label', () => (
    <QOperationGauge24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperationGauge24 aria-label="Icon label">
      <title>Icon title</title>
    </QOperationGauge24>
  ));
