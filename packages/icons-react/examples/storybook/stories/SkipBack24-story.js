import React from 'react';
import { storiesOf } from '@storybook/react';
import SkipBack24 from '../../../es/skip--back/24.js';

storiesOf('SkipBack24', module)
  .add('default', () => <SkipBack24 />)
  .add('with accessibility label', () => (
    <SkipBack24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SkipBack24 aria-label="Icon label">
      <title>Icon title</title>
    </SkipBack24>
  ));
