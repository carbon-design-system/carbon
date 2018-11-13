import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload16 from '../../../lib/Upload/16';

storiesOf('Upload16', module)
  .add('default', () => <Upload16 />)
  .add('with accessibility label', () => (
    <Upload16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Upload16 focusable>
      <title>Icon title</title>
    </Upload16>
  ));
