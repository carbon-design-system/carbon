import React from 'react';
import { storiesOf } from '@storybook/react';
import QX32 from '../../../es/Q/X/32.js';

storiesOf('QX32', module)
  .add('default', () => <QX32 />)
  .add('with accessibility label', () => (
    <QX32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QX32 aria-label="Icon label">
      <title>Icon title</title>
    </QX32>
  ));
