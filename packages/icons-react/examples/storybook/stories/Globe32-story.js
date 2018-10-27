import React from 'react';
import { storiesOf } from '@storybook/react';
import Globe32 from '../../../lib/globe/32';

storiesOf('Globe32', module)
  .add('default', () => <Globe32 />)
  .add('with accessibility label', () => (
    <Globe32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Globe32 focusable>
      <title>Icon title</title>
    </Globe32>
  ));
