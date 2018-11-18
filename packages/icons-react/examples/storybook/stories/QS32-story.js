import React from 'react';
import { storiesOf } from '@storybook/react';
import QS32 from '../../../es/Q/S/32.js';

storiesOf('QS32', module)
  .add('default', () => <QS32 />)
  .add('with accessibility label', () => (
    <QS32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QS32 aria-label="Icon label">
      <title>Icon title</title>
    </QS32>
  ));
