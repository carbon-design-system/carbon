import React from 'react';
import { storiesOf } from '@storybook/react';
import QSAlt20 from '../../../es/Q/S--alt/20.js';

storiesOf('QSAlt20', module)
  .add('default', () => <QSAlt20 />)
  .add('with accessibility label', () => (
    <QSAlt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QSAlt20 aria-label="Icon label">
      <title>Icon title</title>
    </QSAlt20>
  ));
