import React from 'react';
import { storiesOf } from '@storybook/react';
import Van20 from '../../../es/van/20.js';

storiesOf('Van20', module)
  .add('default', () => <Van20 />)
  .add('with accessibility label', () => (
    <Van20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Van20 aria-label="Icon label">
      <title>Icon title</title>
    </Van20>
  ));
