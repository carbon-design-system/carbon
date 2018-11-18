import React from 'react';
import { storiesOf } from '@storybook/react';
import QTAlt20 from '../../../es/Q/T--alt/20.js';

storiesOf('QTAlt20', module)
  .add('default', () => <QTAlt20 />)
  .add('with accessibility label', () => (
    <QTAlt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QTAlt20 aria-label="Icon label">
      <title>Icon title</title>
    </QTAlt20>
  ));
