import React from 'react';
import { storiesOf } from '@storybook/react';
import Download20 from '../../../es/download/20.js';

storiesOf('Download20', module)
  .add('default', () => <Download20 />)
  .add('with accessibility label', () => (
    <Download20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Download20 aria-label="Icon label">
      <title>Icon title</title>
    </Download20>
  ));
