import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperation20 from '../../../es/Q/operation/20.js';

storiesOf('QOperation20', module)
  .add('default', () => <QOperation20 />)
  .add('with accessibility label', () => (
    <QOperation20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperation20 aria-label="Icon label">
      <title>Icon title</title>
    </QOperation20>
  ));
