import React from 'react';
import { storiesOf } from '@storybook/react';
import UpToTop16 from '../../../lib/UpToTop/16';

storiesOf('UpToTop16', module)
  .add('default', () => <UpToTop16 />)
  .add('with accessibility label', () => (
    <UpToTop16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UpToTop16 focusable>
      <title>Icon title</title>
    </UpToTop16>
  ));
