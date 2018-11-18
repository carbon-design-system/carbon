import React from 'react';
import { storiesOf } from '@storybook/react';
import QCcX20 from '../../../es/Q/ccX/20.js';

storiesOf('QCcX20', module)
  .add('default', () => <QCcX20 />)
  .add('with accessibility label', () => (
    <QCcX20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCcX20 aria-label="Icon label">
      <title>Icon title</title>
    </QCcX20>
  ));
