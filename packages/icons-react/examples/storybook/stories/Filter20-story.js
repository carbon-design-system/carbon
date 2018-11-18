import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter20 from '../../../es/filter/20.js';

storiesOf('Filter20', module)
  .add('default', () => <Filter20 />)
  .add('with accessibility label', () => (
    <Filter20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Filter20 aria-label="Icon label">
      <title>Icon title</title>
    </Filter20>
  ));
