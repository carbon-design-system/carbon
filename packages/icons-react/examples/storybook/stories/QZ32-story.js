import React from 'react';
import { storiesOf } from '@storybook/react';
import QZ32 from '../../../es/Q/Z/32.js';

storiesOf('QZ32', module)
  .add('default', () => <QZ32 />)
  .add('with accessibility label', () => (
    <QZ32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QZ32 aria-label="Icon label">
      <title>Icon title</title>
    </QZ32>
  ));
