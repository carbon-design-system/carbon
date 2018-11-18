import React from 'react';
import { storiesOf } from '@storybook/react';
import QCU124 from '../../../es/Q/cU1/24.js';

storiesOf('QCU124', module)
  .add('default', () => <QCU124 />)
  .add('with accessibility label', () => (
    <QCU124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCU124 aria-label="Icon label">
      <title>Icon title</title>
    </QCU124>
  ));
