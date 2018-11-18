import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter32 from '../../../es/filter/32.js';

storiesOf('Filter32', module)
  .add('default', () => <Filter32 />)
  .add('with accessibility label', () => (
    <Filter32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Filter32 aria-label="Icon label">
      <title>Icon title</title>
    </Filter32>
  ));
