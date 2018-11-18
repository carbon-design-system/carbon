import React from 'react';
import { storiesOf } from '@storybook/react';
import QT32 from '../../../es/Q/T/32.js';

storiesOf('QT32', module)
  .add('default', () => <QT32 />)
  .add('with accessibility label', () => (
    <QT32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QT32 aria-label="Icon label">
      <title>Icon title</title>
    </QT32>
  ));
