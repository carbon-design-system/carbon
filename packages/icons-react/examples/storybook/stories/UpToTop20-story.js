import React from 'react';
import { storiesOf } from '@storybook/react';
import UpToTop20 from '../../../es/up-to-top/20.js';

storiesOf('UpToTop20', module)
  .add('default', () => <UpToTop20 />)
  .add('with accessibility label', () => (
    <UpToTop20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UpToTop20 aria-label="Icon label">
      <title>Icon title</title>
    </UpToTop20>
  ));
