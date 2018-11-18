import React from 'react';
import { storiesOf } from '@storybook/react';
import QCZ20 from '../../../es/Q/cZ/20.js';

storiesOf('QCZ20', module)
  .add('default', () => <QCZ20 />)
  .add('with accessibility label', () => (
    <QCZ20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCZ20 aria-label="Icon label">
      <title>Icon title</title>
    </QCZ20>
  ));
