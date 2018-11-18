import React from 'react';
import { storiesOf } from '@storybook/react';
import QCU320 from '../../../es/Q/cU3/20.js';

storiesOf('QCU320', module)
  .add('default', () => <QCU320 />)
  .add('with accessibility label', () => (
    <QCU320 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCU320 aria-label="Icon label">
      <title>Icon title</title>
    </QCU320>
  ));
