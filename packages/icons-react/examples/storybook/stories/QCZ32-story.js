import React from 'react';
import { storiesOf } from '@storybook/react';
import QCZ32 from '../../../es/Q/cZ/32.js';

storiesOf('QCZ32', module)
  .add('default', () => <QCZ32 />)
  .add('with accessibility label', () => (
    <QCZ32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCZ32 aria-label="Icon label">
      <title>Icon title</title>
    </QCZ32>
  ));
