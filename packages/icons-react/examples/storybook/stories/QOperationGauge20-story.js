import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperationGauge20 from '../../../es/Q/operation--gauge/20.js';

storiesOf('QOperationGauge20', module)
  .add('default', () => <QOperationGauge20 />)
  .add('with accessibility label', () => (
    <QOperationGauge20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperationGauge20 aria-label="Icon label">
      <title>Icon title</title>
    </QOperationGauge20>
  ));
