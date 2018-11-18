import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperationIf20 from '../../../es/Q/operation--if/20.js';

storiesOf('QOperationIf20', module)
  .add('default', () => <QOperationIf20 />)
  .add('with accessibility label', () => (
    <QOperationIf20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperationIf20 aria-label="Icon label">
      <title>Icon title</title>
    </QOperationIf20>
  ));
