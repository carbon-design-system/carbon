import React from 'react';
import { storiesOf } from '@storybook/react';
import Save32 from '../../../lib/save/32';

storiesOf('Save32', module)
  .add('default', () => <Save32 />)
  .add('with accessibility label', () => (
    <Save32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Save32 focusable>
      <title>Icon title</title>
    </Save32>
  ));
