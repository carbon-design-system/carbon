import React from 'react';
import { storiesOf } from '@storybook/react';
import Search32 from '../../../es/search/32.js';

storiesOf('Search32', module)
  .add('default', () => <Search32 />)
  .add('with accessibility label', () => (
    <Search32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Search32 aria-label="Icon label">
      <title>Icon title</title>
    </Search32>
  ));
