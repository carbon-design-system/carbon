import React from 'react';
import { storiesOf } from '@storybook/react';
import QSAlt32 from '../../../es/Q/S--alt/32.js';

storiesOf('QSAlt32', module)
  .add('default', () => <QSAlt32 />)
  .add('with accessibility label', () => (
    <QSAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QSAlt32 aria-label="Icon label">
      <title>Icon title</title>
    </QSAlt32>
  ));
