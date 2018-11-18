import React from 'react';
import { storiesOf } from '@storybook/react';
import QT24 from '../../../es/Q/T/24.js';

storiesOf('QT24', module)
  .add('default', () => <QT24 />)
  .add('with accessibility label', () => (
    <QT24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QT24 aria-label="Icon label">
      <title>Icon title</title>
    </QT24>
  ));
