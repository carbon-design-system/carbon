import React from 'react';
import { storiesOf } from '@storybook/react';
import Hdr32 from '../../../es/HDR/32.js';

storiesOf('Hdr32', module)
  .add('default', () => <Hdr32 />)
  .add('with accessibility label', () => (
    <Hdr32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hdr32 aria-label="Icon label">
      <title>Icon title</title>
    </Hdr32>
  ));
