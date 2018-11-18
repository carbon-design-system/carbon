import React from 'react';
import { storiesOf } from '@storybook/react';
import Download16 from '../../../es/download/16.js';

storiesOf('Download16', module)
  .add('default', () => <Download16 />)
  .add('with accessibility label', () => (
    <Download16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Download16 aria-label="Icon label">
      <title>Icon title</title>
    </Download16>
  ));
