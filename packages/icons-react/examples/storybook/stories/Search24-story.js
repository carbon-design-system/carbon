import React from 'react';
import { storiesOf } from '@storybook/react';
import Search24 from '../../../es/search/24.js';

storiesOf('Search24', module)
  .add('default', () => <Search24 />)
  .add('with accessibility label', () => (
    <Search24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Search24 aria-label="Icon label">
      <title>Icon title</title>
    </Search24>
  ));
