import React from 'react';
import { storiesOf } from '@storybook/react';
import Image32 from '../../../lib/Image/32';

storiesOf('Image32', module)
  .add('default', () => <Image32 />)
  .add('with accessibility label', () => (
    <Image32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Image32 focusable>
      <title>Icon title</title>
    </Image32>
  ));
