import React from 'react';
import { storiesOf } from '@storybook/react';
import QU220 from '../../../es/Q/U2/20.js';

storiesOf('QU220', module)
  .add('default', () => <QU220 />)
  .add('with accessibility label', () => (
    <QU220 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU220 aria-label="Icon label">
      <title>Icon title</title>
    </QU220>
  ));
