import React from 'react';
import { storiesOf } from '@storybook/react';
import QU120 from '../../../es/Q/U1/20.js';

storiesOf('QU120', module)
  .add('default', () => <QU120 />)
  .add('with accessibility label', () => (
    <QU120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU120 aria-label="Icon label">
      <title>Icon title</title>
    </QU120>
  ));
