import React from 'react';
import { storiesOf } from '@storybook/react';
import QY20 from '../../../es/Q/Y/20.js';

storiesOf('QY20', module)
  .add('default', () => <QY20 />)
  .add('with accessibility label', () => (
    <QY20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <QY20 aria-label="Icon label">
      <title>Icon title</title>
    </QY20>
  ));
