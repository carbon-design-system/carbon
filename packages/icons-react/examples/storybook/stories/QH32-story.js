import React from 'react';
import { storiesOf } from '@storybook/react';
import QH32 from '../../../es/Q/H/32.js';

storiesOf('QH32', module)
  .add('default', () => <QH32 />)
  .add('with accessibility label', () => (
    <QH32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QH32 aria-label="Icon label">
      <title>Icon title</title>
    </QH32>
  ));
