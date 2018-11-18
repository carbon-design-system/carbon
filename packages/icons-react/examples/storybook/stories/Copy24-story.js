import React from 'react';
import { storiesOf } from '@storybook/react';
import Copy24 from '../../../es/copy/24.js';

storiesOf('Copy24', module)
  .add('default', () => <Copy24 />)
  .add('with accessibility label', () => (
    <Copy24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Copy24 aria-label="Icon label">
      <title>Icon title</title>
    </Copy24>
  ));
