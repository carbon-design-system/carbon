import React from 'react';
import { storiesOf } from '@storybook/react';
import Download16 from '../../../lib/download/16';

storiesOf('Download16', module)
  .add('default', () => <Download16 />)
  .add('with accessibility label', () => (
    <Download16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Download16 focusable>
      <title>Icon title</title>
    </Download16>
  ));
