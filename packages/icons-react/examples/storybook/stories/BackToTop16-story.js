import React from 'react';
import { storiesOf } from '@storybook/react';
import BackToTop16 from '../../../lib/BackToTop/16';

storiesOf('BackToTop16', module)
  .add('default', () => <BackToTop16 />)
  .add('with accessibility label', () => (
    <BackToTop16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <BackToTop16 focusable>
      <title>Icon title</title>
    </BackToTop16>
  ));
