import React from 'react';
import { storiesOf } from '@storybook/react';
import Download24 from '../../../es/download/24.js';

storiesOf('Download24', module)
  .add('default', () => <Download24 />)
  .add('with accessibility label', () => (
    <Download24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Download24 aria-label="Icon label">
      <title>Icon title</title>
    </Download24>
  ));
