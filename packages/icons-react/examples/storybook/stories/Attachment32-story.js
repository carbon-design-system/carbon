import React from 'react';
import { storiesOf } from '@storybook/react';
import Attachment32 from '../../../lib/attachment/32';

storiesOf('Attachment32', module)
  .add('default', () => <Attachment32 />)
  .add('with accessibility label', () => (
    <Attachment32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Attachment32 focusable>
      <title>Icon title</title>
    </Attachment32>
  ));
