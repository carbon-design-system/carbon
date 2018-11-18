import React from 'react';
import { storiesOf } from '@storybook/react';
import Copy16 from '../../../es/copy/16.js';

storiesOf('Copy16', module)
  .add('default', () => <Copy16 />)
  .add('with accessibility label', () => (
    <Copy16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Copy16 aria-label="Icon label">
      <title>Icon title</title>
    </Copy16>
  ));
