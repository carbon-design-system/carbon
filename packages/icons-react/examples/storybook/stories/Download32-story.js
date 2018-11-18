import React from 'react';
import { storiesOf } from '@storybook/react';
import Download32 from '../../../es/download/32.js';

storiesOf('Download32', module)
  .add('default', () => <Download32 />)
  .add('with accessibility label', () => (
    <Download32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Download32 aria-label="Icon label">
      <title>Icon title</title>
    </Download32>
  ));
