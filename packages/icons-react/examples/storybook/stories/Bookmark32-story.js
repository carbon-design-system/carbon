import React from 'react';
import { storiesOf } from '@storybook/react';
import Bookmark32 from '../../../lib/Bookmark/32';

storiesOf('Bookmark32', module)
  .add('default', () => <Bookmark32 />)
  .add('with accessibility label', () => (
    <Bookmark32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bookmark32 focusable>
      <title>Icon title</title>
    </Bookmark32>
  ));
