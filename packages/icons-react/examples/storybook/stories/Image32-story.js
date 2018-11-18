import React from 'react';
import { storiesOf } from '@storybook/react';
import Image32 from '../../../es/image/32.js';

storiesOf('Image32', module)
  .add('default', () => <Image32 />)
  .add('with accessibility label', () => (
    <Image32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Image32 aria-label="Icon label">
      <title>Icon title</title>
    </Image32>
  ));
