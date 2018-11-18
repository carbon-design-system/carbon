import React from 'react';
import { storiesOf } from '@storybook/react';
import QY32 from '../../../es/Q/Y/32.js';

storiesOf('QY32', module)
  .add('default', () => <QY32 />)
  .add('with accessibility label', () => (
    <QY32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QY32 aria-label="Icon label">
      <title>Icon title</title>
    </QY32>
  ));
