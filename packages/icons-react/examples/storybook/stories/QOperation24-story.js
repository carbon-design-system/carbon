import React from 'react';
import { storiesOf } from '@storybook/react';
import QOperation24 from '../../../es/Q/operation/24.js';

storiesOf('QOperation24', module)
  .add('default', () => <QOperation24 />)
  .add('with accessibility label', () => (
    <QOperation24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QOperation24 aria-label="Icon label">
      <title>Icon title</title>
    </QOperation24>
  ));
