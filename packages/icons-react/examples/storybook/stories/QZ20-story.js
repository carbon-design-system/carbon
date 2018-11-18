import React from 'react';
import { storiesOf } from '@storybook/react';
import QZ20 from '../../../es/Q/Z/20.js';

storiesOf('QZ20', module)
  .add('default', () => <QZ20 />)
  .add('with accessibility label', () => (
    <QZ20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QZ20 aria-label="Icon label">
      <title>Icon title</title>
    </QZ20>
  ));
