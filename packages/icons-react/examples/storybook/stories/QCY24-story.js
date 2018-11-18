import React from 'react';
import { storiesOf } from '@storybook/react';
import QCY24 from '../../../es/Q/cY/24.js';

storiesOf('QCY24', module)
  .add('default', () => <QCY24 />)
  .add('with accessibility label', () => (
    <QCY24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCY24 aria-label="Icon label">
      <title>Icon title</title>
    </QCY24>
  ));
