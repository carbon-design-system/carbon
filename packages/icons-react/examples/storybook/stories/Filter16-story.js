import React from 'react';
import { storiesOf } from '@storybook/react';
import Filter16 from '../../../es/filter/16.js';

storiesOf('Filter16', module)
  .add('default', () => <Filter16 />)
  .add('with accessibility label', () => (
    <Filter16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Filter16 aria-label="Icon label">
      <title>Icon title</title>
    </Filter16>
  ));
