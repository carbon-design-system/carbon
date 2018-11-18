import React from 'react';
import { storiesOf } from '@storybook/react';
import Link20 from '../../../es/link/20.js';

storiesOf('Link20', module)
  .add('default', () => <Link20 />)
  .add('with accessibility label', () => (
    <Link20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Link20 aria-label="Icon label">
      <title>Icon title</title>
    </Link20>
  ));
