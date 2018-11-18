import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperationGauge32 from '../../../es/Q/operation--gauge/32.js';

storiesOf('QOperationGauge32', module)
  .add('default', () => <QOperationGauge32 />)
  .add('with accessibility label', () => (
    <QOperationGauge32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperationGauge32 aria-label="Icon label">
      <title>Icon title</title>
    </QOperationGauge32>
  ));
