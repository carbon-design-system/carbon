import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperation32 from '../../../es/Q/operation/32.js';

storiesOf('QOperation32', module)
  .add('default', () => <QOperation32 />)
  .add('with accessibility label', () => (
    <QOperation32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperation32 aria-label="Icon label">
      <title>Icon title</title>
    </QOperation32>
  ));
