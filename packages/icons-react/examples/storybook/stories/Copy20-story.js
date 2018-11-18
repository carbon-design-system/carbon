import React from 'react';
import { storiesOf } from '@storybook/react';
import Copy20 from '../../../es/copy/20.js';

storiesOf('Copy20', module)
  .add('default', () => <Copy20 />)
  .add('with accessibility label', () => (
    <Copy20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Copy20 aria-label="Icon label">
      <title>Icon title</title>
    </Copy20>
  ));
