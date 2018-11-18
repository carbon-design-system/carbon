import React from 'react';
import { storiesOf } from '@storybook/react';
import Bookmark20 from '../../../es/bookmark/20.js';

storiesOf('Bookmark20', module)
  .add('default', () => <Bookmark20 />)
  .add('with accessibility label', () => (
    <Bookmark20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bookmark20 aria-label="Icon label">
      <title>Icon title</title>
    </Bookmark20>
  ));
