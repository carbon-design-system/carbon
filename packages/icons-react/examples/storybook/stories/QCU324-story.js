import React from 'react';
import { storiesOf } from '@storybook/react';
import QCU324 from '../../../es/Q/cU3/24.js';

storiesOf('QCU324', module)
  .add('default', () => <QCU324 />)
  .add('with accessibility label', () => (
    <QCU324 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCU324 aria-label="Icon label">
      <title>Icon title</title>
    </QCU324>
  ));
