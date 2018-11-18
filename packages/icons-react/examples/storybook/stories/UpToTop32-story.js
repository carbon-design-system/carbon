import React from 'react';
import { storiesOf } from '@storybook/react';
import UpToTop32 from '../../../es/up-to-top/32.js';

storiesOf('UpToTop32', module)
  .add('default', () => <UpToTop32 />)
  .add('with accessibility label', () => (
    <UpToTop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UpToTop32 aria-label="Icon label">
      <title>Icon title</title>
    </UpToTop32>
  ));
