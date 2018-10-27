import React from 'react';
import { storiesOf } from '@storybook/react';
import Eyedropper32 from '../../../lib/eyedropper/32';

storiesOf('Eyedropper32', module)
  .add('default', () => <Eyedropper32 />)
  .add('with accessibility label', () => (
    <Eyedropper32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Eyedropper32 focusable>
      <title>Icon title</title>
    </Eyedropper32>
  ));
