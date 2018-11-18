import React from 'react';
import { storiesOf } from '@storybook/react';
import _4K24 from '../../../es/4K/24.js';

storiesOf('_4K24', module)
  .add('default', () => <_4K24 />)
  .add('with accessibility label', () => (
    <_4K24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <_4K24 aria-label="Icon label">
      <title>Icon title</title>
    </_4K24>
  ));
