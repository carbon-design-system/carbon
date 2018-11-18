import React from 'react';
import { storiesOf } from '@storybook/react';
import QU232 from '../../../es/Q/U2/32.js';

storiesOf('QU232', module)
  .add('default', () => <QU232 />)
  .add('with accessibility label', () => (
    <QU232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU232 aria-label="Icon label">
      <title>Icon title</title>
    </QU232>
  ));
