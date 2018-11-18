import React from 'react';
import { storiesOf } from '@storybook/react';
import Hdr24 from '../../../es/HDR/24.js';

storiesOf('Hdr24', module)
  .add('default', () => <Hdr24 />)
  .add('with accessibility label', () => (
    <Hdr24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hdr24 aria-label="Icon label">
      <title>Icon title</title>
    </Hdr24>
  ));
