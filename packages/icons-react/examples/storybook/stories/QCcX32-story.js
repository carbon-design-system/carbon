import React from 'react';
import { storiesOf } from '@storybook/react';
import QCcX32 from '../../../es/Q/ccX/32.js';

storiesOf('QCcX32', module)
  .add('default', () => <QCcX32 />)
  .add('with accessibility label', () => (
    <QCcX32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCcX32 aria-label="Icon label">
      <title>Icon title</title>
    </QCcX32>
  ));
