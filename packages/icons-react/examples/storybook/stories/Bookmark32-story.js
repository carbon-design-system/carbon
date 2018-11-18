import React from 'react';
import { storiesOf } from '@storybook/react';
import Bookmark32 from '../../../es/bookmark/32.js';

storiesOf('Bookmark32', module)
  .add('default', () => <Bookmark32 />)
  .add('with accessibility label', () => (
    <Bookmark32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bookmark32 aria-label="Icon label">
      <title>Icon title</title>
    </Bookmark32>
  ));
