import React from 'react';
import { storiesOf } from '@storybook/react';
import QCY32 from '../../../es/Q/cY/32.js';

storiesOf('QCY32', module)
  .add('default', () => <QCY32 />)
  .add('with accessibility label', () => (
    <QCY32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCY32 aria-label="Icon label">
      <title>Icon title</title>
    </QCY32>
  ));
