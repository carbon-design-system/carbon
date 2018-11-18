import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperationIf24 from '../../../es/Q/operation--if/24.js';

storiesOf('QOperationIf24', module)
  .add('default', () => <QOperationIf24 />)
  .add('with accessibility label', () => (
    <QOperationIf24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperationIf24 aria-label="Icon label">
      <title>Icon title</title>
    </QOperationIf24>
  ));
