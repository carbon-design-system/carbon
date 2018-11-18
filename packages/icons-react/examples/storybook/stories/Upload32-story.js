import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload32 from '../../../es/upload/32.js';

storiesOf('Upload32', module)
  .add('default', () => <Upload32 />)
  .add('with accessibility label', () => (
    <Upload32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Upload32 aria-label="Icon label">
      <title>Icon title</title>
    </Upload32>
  ));
