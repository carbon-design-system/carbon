import React from 'react';
import { storiesOf } from '@storybook/react';
import Link32 from '../../../lib/Link/32';

storiesOf('Link32', module)
  .add('default', () => <Link32 />)
  .add('with accessibility label', () => (
    <Link32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Link32 focusable>
      <title>Icon title</title>
    </Link32>
  ));
