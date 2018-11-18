import React from 'react';
import { storiesOf } from '@storybook/react';
import QCY20 from '../../../es/Q/cY/20.js';

storiesOf('QCY20', module)
  .add('default', () => <QCY20 />)
  .add('with accessibility label', () => (
    <QCY20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QCY20 aria-label="Icon label">
      <title>Icon title</title>
    </QCY20>
  ));
