import React from 'react';
import { storiesOf } from '@storybook/react';
import BackToTop16 from '../../../es/back-to-top/16.js';

storiesOf('BackToTop16', module)
  .add('default', () => <BackToTop16 />)
  .add('with accessibility label', () => (
    <BackToTop16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <BackToTop16 aria-label="Icon label">
      <title>Icon title</title>
    </BackToTop16>
  ));
