import React from 'react';
import { storiesOf } from '@storybook/react';
import QX20 from '../../../es/Q/X/20.js';

storiesOf('QX20', module)
  .add('default', () => <QX20 />)
  .add('with accessibility label', () => (
    <QX20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QX20 aria-label="Icon label">
      <title>Icon title</title>
    </QX20>
  ));
