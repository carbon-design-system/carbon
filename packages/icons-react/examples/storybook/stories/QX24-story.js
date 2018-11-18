import React from 'react';
import { storiesOf } from '@storybook/react';
import QX24 from '../../../es/Q/X/24.js';

storiesOf('QX24', module)
  .add('default', () => <QX24 />)
  .add('with accessibility label', () => (
    <QX24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QX24 aria-label="Icon label">
      <title>Icon title</title>
    </QX24>
  ));
