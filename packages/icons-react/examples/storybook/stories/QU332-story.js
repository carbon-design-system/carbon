import React from 'react';
import { storiesOf } from '@storybook/react';
import QU332 from '../../../es/Q/U3/32.js';

storiesOf('QU332', module)
  .add('default', () => <QU332 />)
  .add('with accessibility label', () => (
    <QU332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU332 aria-label="Icon label">
      <title>Icon title</title>
    </QU332>
  ));
