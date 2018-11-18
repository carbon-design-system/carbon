import React from 'react';
import { storiesOf } from '@storybook/react';
import QID32 from '../../../es/Q/iD/32.js';

storiesOf('QID32', module)
  .add('default', () => <QID32 />)
  .add('with accessibility label', () => (
    <QID32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QID32 aria-label="Icon label">
      <title>Icon title</title>
    </QID32>
  ));
