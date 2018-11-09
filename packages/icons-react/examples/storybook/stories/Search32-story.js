import React from 'react';
import { storiesOf } from '@storybook/react';
import Search32 from '../../../lib/Search/32';

storiesOf('Search32', module)
  .add('default', () => <Search32 />)
  .add('with accessibility label', () => (
    <Search32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Search32 focusable>
      <title>Icon title</title>
    </Search32>
  ));
