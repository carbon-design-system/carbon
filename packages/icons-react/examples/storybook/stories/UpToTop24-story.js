import React from 'react';
import { storiesOf } from '@storybook/react';
import UpToTop24 from '../../../es/up-to-top/24.js';

storiesOf('UpToTop24', module)
  .add('default', () => <UpToTop24 />)
  .add('with accessibility label', () => (
    <UpToTop24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UpToTop24 aria-label="Icon label">
      <title>Icon title</title>
    </UpToTop24>
  ));
