import React from 'react';
import { storiesOf } from '@storybook/react';
import Hdr32 from '../../../lib/Hdr/32';

storiesOf('Hdr32', module)
  .add('default', () => <Hdr32 />)
  .add('with accessibility label', () => (
    <Hdr32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hdr32 focusable>
      <title>Icon title</title>
    </Hdr32>
  ));
