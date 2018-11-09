import React from 'react';
import { storiesOf } from '@storybook/react';
import Help32 from '../../../lib/Help/32';

storiesOf('Help32', module)
  .add('default', () => <Help32 />)
  .add('with accessibility label', () => (
    <Help32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Help32 focusable>
      <title>Icon title</title>
    </Help32>
  ));
