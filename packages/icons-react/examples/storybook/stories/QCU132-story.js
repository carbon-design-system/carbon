import React from 'react';
import { storiesOf } from '@storybook/react';
import QCU132 from '../../../es/Q/cU1/32.js';

storiesOf('QCU132', module)
  .add('default', () => <QCU132 />)
  .add('with accessibility label', () => (
    <QCU132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCU132 aria-label="Icon label">
      <title>Icon title</title>
    </QCU132>
  ));
