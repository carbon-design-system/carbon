import React from 'react';
import { storiesOf } from '@storybook/react';
import Rss20 from '../../../es/rss/20.js';

storiesOf('Rss20', module)
  .add('default', () => <Rss20 />)
  .add('with accessibility label', () => (
    <Rss20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rss20 aria-label="Icon label">
      <title>Icon title</title>
    </Rss20>
  ));
