import React from 'react';
import { storiesOf } from '@storybook/react';
import QCZ24 from '../../../es/Q/cZ/24.js';

storiesOf('QCZ24', module)
  .add('default', () => <QCZ24 />)
  .add('with accessibility label', () => (
    <QCZ24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCZ24 aria-label="Icon label">
      <title>Icon title</title>
    </QCZ24>
  ));
