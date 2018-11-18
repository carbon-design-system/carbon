import React from 'react';
import { storiesOf } from '@storybook/react';
import Link24 from '../../../es/link/24.js';

storiesOf('Link24', module)
  .add('default', () => <Link24 />)
  .add('with accessibility label', () => (
    <Link24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Link24 aria-label="Icon label">
      <title>Icon title</title>
    </Link24>
  ));
