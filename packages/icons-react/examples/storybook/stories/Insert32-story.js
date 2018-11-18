import React from 'react';
import { storiesOf } from '@storybook/react';
import Insert32 from '../../../es/insert/32.js';

storiesOf('Insert32', module)
  .add('default', () => <Insert32 />)
  .add('with accessibility label', () => (
    <Insert32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Insert32 aria-label="Icon label">
      <title>Icon title</title>
    </Insert32>
  ));
