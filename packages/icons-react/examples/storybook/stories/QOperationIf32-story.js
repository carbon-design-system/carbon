import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperationIf32 from '../../../es/Q/operation--if/32.js';

storiesOf('QOperationIf32', module)
  .add('default', () => <QOperationIf32 />)
  .add('with accessibility label', () => (
    <QOperationIf32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperationIf32 aria-label="Icon label">
      <title>Icon title</title>
    </QOperationIf32>
  ));
