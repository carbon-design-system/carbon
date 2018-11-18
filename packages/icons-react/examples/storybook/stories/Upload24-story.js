import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload24 from '../../../es/upload/24.js';

storiesOf('Upload24', module)
  .add('default', () => <Upload24 />)
  .add('with accessibility label', () => (
    <Upload24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Upload24 aria-label="Icon label">
      <title>Icon title</title>
    </Upload24>
  ));
