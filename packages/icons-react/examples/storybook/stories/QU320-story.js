import React from 'react';
import { storiesOf } from '@storybook/react';
import QU320 from '../../../es/Q/U3/20.js';

storiesOf('QU320', module)
  .add('default', () => <QU320 />)
  .add('with accessibility label', () => (
    <QU320 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU320 aria-label="Icon label">
      <title>Icon title</title>
    </QU320>
  ));
