import React from 'react';
import { storiesOf } from '@storybook/react';
import QU324 from '../../../es/Q/U3/24.js';

storiesOf('QU324', module)
  .add('default', () => <QU324 />)
  .add('with accessibility label', () => (
    <QU324 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU324 aria-label="Icon label">
      <title>Icon title</title>
    </QU324>
  ));
