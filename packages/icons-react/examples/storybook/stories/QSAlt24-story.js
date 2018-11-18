import React from 'react';
import { storiesOf } from '@storybook/react';
import QSAlt24 from '../../../es/Q/S--alt/24.js';

storiesOf('QSAlt24', module)
  .add('default', () => <QSAlt24 />)
  .add('with accessibility label', () => (
    <QSAlt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QSAlt24 aria-label="Icon label">
      <title>Icon title</title>
    </QSAlt24>
  ));
