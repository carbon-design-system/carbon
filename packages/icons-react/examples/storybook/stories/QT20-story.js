import React from 'react';
import { storiesOf } from '@storybook/react';
import QT20 from '../../../es/Q/T/20.js';

storiesOf('QT20', module)
  .add('default', () => <QT20 />)
  .add('with accessibility label', () => (
    <QT20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QT20 aria-label="Icon label">
      <title>Icon title</title>
    </QT20>
  ));
