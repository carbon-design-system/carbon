import React from 'react';
import { storiesOf } from '@storybook/react';
import Image24 from '../../../es/image/24.js';

storiesOf('Image24', module)
  .add('default', () => <Image24 />)
  .add('with accessibility label', () => (
    <Image24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Image24 aria-label="Icon label">
      <title>Icon title</title>
    </Image24>
  ));
