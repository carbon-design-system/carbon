import React from 'react';
import { storiesOf } from '@storybook/react';
import QU124 from '../../../es/Q/U1/24.js';

storiesOf('QU124', module)
  .add('default', () => <QU124 />)
  .add('with accessibility label', () => (
    <QU124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QU124 aria-label="Icon label">
      <title>Icon title</title>
    </QU124>
  ));
