import React from 'react';
import { storiesOf } from '@storybook/react';
import QS20 from '../../../es/Q/S/20.js';

storiesOf('QS20', module)
  .add('default', () => <QS20 />)
  .add('with accessibility label', () => (
    <QS20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QS20 aria-label="Icon label">
      <title>Icon title</title>
    </QS20>
  ));
