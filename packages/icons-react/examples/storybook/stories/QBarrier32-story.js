import React from 'react';
import { storiesOf } from '@storybook/react';
import QBarrier32 from '../../../es/Q/barrier/32.js';

storiesOf('QBarrier32', module)
  .add('default', () => <QBarrier32 />)
  .add('with accessibility label', () => (
    <QBarrier32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QBarrier32 aria-label="Icon label">
      <title>Icon title</title>
    </QBarrier32>
  ));
