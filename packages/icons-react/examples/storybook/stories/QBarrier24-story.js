import React from 'react';
import { storiesOf } from '@storybook/react';
import QBarrier24 from '../../../es/Q/barrier/24.js';

storiesOf('QBarrier24', module)
  .add('default', () => <QBarrier24 />)
  .add('with accessibility label', () => (
    <QBarrier24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QBarrier24 aria-label="Icon label">
      <title>Icon title</title>
    </QBarrier24>
  ));
