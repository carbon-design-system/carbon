import React from 'react';
import { storiesOf } from '@storybook/react';
import SkipBack20 from '../../../es/skip--back/20.js';

storiesOf('SkipBack20', module)
  .add('default', () => <SkipBack20 />)
  .add('with accessibility label', () => (
    <SkipBack20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SkipBack20 aria-label="Icon label">
      <title>Icon title</title>
    </SkipBack20>
  ));
