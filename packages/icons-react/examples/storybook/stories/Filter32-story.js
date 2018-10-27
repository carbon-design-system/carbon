import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter32 from '../../../lib/filter/32';

storiesOf('Filter32', module)
  .add('default', () => <Filter32 />)
  .add('with accessibility label', () => (
    <Filter32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Filter32 focusable>
      <title>Icon title</title>
    </Filter32>
  ));
