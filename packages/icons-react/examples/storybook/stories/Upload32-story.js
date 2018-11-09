import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload32 from '../../../lib/Upload/32';

storiesOf('Upload32', module)
  .add('default', () => <Upload32 />)
  .add('with accessibility label', () => (
    <Upload32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Upload32 focusable>
      <title>Icon title</title>
    </Upload32>
  ));
