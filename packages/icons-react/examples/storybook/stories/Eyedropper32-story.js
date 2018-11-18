import React from 'react';
import { storiesOf } from '@storybook/react';
import Eyedropper32 from '../../../es/eyedropper/32.js';

storiesOf('Eyedropper32', module)
  .add('default', () => <Eyedropper32 />)
  .add('with accessibility label', () => (
    <Eyedropper32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Eyedropper32 aria-label="Icon label">
      <title>Icon title</title>
    </Eyedropper32>
  ));
