import React from 'react';
import { storiesOf } from '@storybook/react';
import QH24 from '../../../es/Q/H/24.js';

storiesOf('QH24', module)
  .add('default', () => <QH24 />)
  .add('with accessibility label', () => (
    <QH24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QH24 aria-label="Icon label">
      <title>Icon title</title>
    </QH24>
  ));
