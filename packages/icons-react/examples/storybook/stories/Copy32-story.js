import React from 'react';
import { storiesOf } from '@storybook/react';
import Copy32 from '../../../es/copy/32.js';

storiesOf('Copy32', module)
  .add('default', () => <Copy32 />)
  .add('with accessibility label', () => (
    <Copy32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Copy32 aria-label="Icon label">
      <title>Icon title</title>
    </Copy32>
  ));
