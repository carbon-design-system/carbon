import React from 'react';
import { storiesOf } from '@storybook/react';
import Search16 from '../../../lib/search/16';

storiesOf('Search16', module)
  .add('default', () => <Search16 />)
  .add('with accessibility label', () => (
    <Search16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Search16 focusable>
      <title>Icon title</title>
    </Search16>
  ));
