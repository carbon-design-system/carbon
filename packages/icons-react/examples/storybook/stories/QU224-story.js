import React from 'react';
import { storiesOf } from '@storybook/react';
import QU224 from '../../../es/Q/U2/24.js';

storiesOf('QU224', module)
  .add('default', () => <QU224 />)
  .add('with accessibility label', () => (
    <QU224 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU224 aria-label="Icon label">
      <title>Icon title</title>
    </QU224>
  ));
