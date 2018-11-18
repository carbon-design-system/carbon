import React from 'react';
import { storiesOf } from '@storybook/react';
import QY24 from '../../../es/Q/Y/24.js';

storiesOf('QY24', module)
  .add('default', () => <QY24 />)
  .add('with accessibility label', () => (
    <QY24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QY24 aria-label="Icon label">
      <title>Icon title</title>
    </QY24>
  ));
