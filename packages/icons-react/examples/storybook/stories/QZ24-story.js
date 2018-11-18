import React from 'react';
import { storiesOf } from '@storybook/react';
import QZ24 from '../../../es/Q/Z/24.js';

storiesOf('QZ24', module)
  .add('default', () => <QZ24 />)
  .add('with accessibility label', () => (
    <QZ24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QZ24 aria-label="Icon label">
      <title>Icon title</title>
    </QZ24>
  ));
