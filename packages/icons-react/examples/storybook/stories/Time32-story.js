import React from 'react';
import { storiesOf } from '@storybook/react';
import Time32 from '../../../es/time/32.js';

storiesOf('Time32', module)
  .add('default', () => <Time32 />)
  .add('with accessibility label', () => (
    <Time32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Time32 aria-label="Icon label">
      <title>Icon title</title>
    </Time32>
  ));
