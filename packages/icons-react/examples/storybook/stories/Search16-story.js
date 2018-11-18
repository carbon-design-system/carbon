import React from 'react';
import { storiesOf } from '@storybook/react';
import Search16 from '../../../es/search/16.js';

storiesOf('Search16', module)
  .add('default', () => <Search16 />)
  .add('with accessibility label', () => (
    <Search16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Search16 aria-label="Icon label">
      <title>Icon title</title>
    </Search16>
  ));
