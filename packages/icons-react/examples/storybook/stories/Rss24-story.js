import React from 'react';
import { storiesOf } from '@storybook/react';
import Rss24 from '../../../es/rss/24.js';

storiesOf('Rss24', module)
  .add('default', () => <Rss24 />)
  .add('with accessibility label', () => (
    <Rss24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rss24 aria-label="Icon label">
      <title>Icon title</title>
    </Rss24>
  ));
