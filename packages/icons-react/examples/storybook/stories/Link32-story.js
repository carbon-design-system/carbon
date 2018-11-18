import React from 'react';
import { storiesOf } from '@storybook/react';
import Link32 from '../../../es/link/32.js';

storiesOf('Link32', module)
  .add('default', () => <Link32 />)
  .add('with accessibility label', () => (
    <Link32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Link32 aria-label="Icon label">
      <title>Icon title</title>
    </Link32>
  ));
