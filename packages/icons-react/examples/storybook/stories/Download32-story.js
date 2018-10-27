import React from 'react';
import { storiesOf } from '@storybook/react';
import Download32 from '../../../lib/download/32';

storiesOf('Download32', module)
  .add('default', () => <Download32 />)
  .add('with accessibility label', () => (
    <Download32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Download32 focusable>
      <title>Icon title</title>
    </Download32>
  ));
