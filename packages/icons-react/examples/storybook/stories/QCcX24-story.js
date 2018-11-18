import React from 'react';
import { storiesOf } from '@storybook/react';
import QCcX24 from '../../../es/Q/ccX/24.js';

storiesOf('QCcX24', module)
  .add('default', () => <QCcX24 />)
  .add('with accessibility label', () => (
    <QCcX24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCcX24 aria-label="Icon label">
      <title>Icon title</title>
    </QCcX24>
  ));
