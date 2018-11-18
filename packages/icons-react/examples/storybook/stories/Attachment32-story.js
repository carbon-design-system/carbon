import React from 'react';
import { storiesOf } from '@storybook/react';
import Attachment32 from '../../../es/attachment/32.js';

storiesOf('Attachment32', module)
  .add('default', () => <Attachment32 />)
  .add('with accessibility label', () => (
    <Attachment32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Attachment32 aria-label="Icon label">
      <title>Icon title</title>
    </Attachment32>
  ));
