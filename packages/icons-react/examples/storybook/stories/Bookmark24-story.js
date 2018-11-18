import React from 'react';
import { storiesOf } from '@storybook/react';
import Bookmark24 from '../../../es/bookmark/24.js';

storiesOf('Bookmark24', module)
  .add('default', () => <Bookmark24 />)
  .add('with accessibility label', () => (
    <Bookmark24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bookmark24 aria-label="Icon label">
      <title>Icon title</title>
    </Bookmark24>
  ));
