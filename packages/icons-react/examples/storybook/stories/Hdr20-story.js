import React from 'react';
import { storiesOf } from '@storybook/react';
import Hdr20 from '../../../es/HDR/20.js';

storiesOf('Hdr20', module)
  .add('default', () => <Hdr20 />)
  .add('with accessibility label', () => (
    <Hdr20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hdr20 aria-label="Icon label">
      <title>Icon title</title>
    </Hdr20>
  ));
