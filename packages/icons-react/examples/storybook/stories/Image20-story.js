import React from 'react';
import { storiesOf } from '@storybook/react';
import Image20 from '../../../es/image/20.js';

storiesOf('Image20', module)
  .add('default', () => <Image20 />)
  .add('with accessibility label', () => (
    <Image20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Image20 aria-label="Icon label">
      <title>Icon title</title>
    </Image20>
  ));
