import React from 'react';
import { storiesOf } from '@storybook/react';
import UpToTop16 from '../../../es/up-to-top/16.js';

storiesOf('UpToTop16', module)
  .add('default', () => <UpToTop16 />)
  .add('with accessibility label', () => (
    <UpToTop16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UpToTop16 aria-label="Icon label">
      <title>Icon title</title>
    </UpToTop16>
  ));
