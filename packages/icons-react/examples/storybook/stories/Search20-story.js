import React from 'react';
import { storiesOf } from '@storybook/react';
import Search20 from '../../../es/search/20.js';

storiesOf('Search20', module)
  .add('default', () => <Search20 />)
  .add('with accessibility label', () => (
    <Search20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Search20 aria-label="Icon label">
      <title>Icon title</title>
    </Search20>
  ));
