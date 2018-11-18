import React from 'react';
import { storiesOf } from '@storybook/react';
import Attachment16 from '../../../es/attachment/16.js';

storiesOf('Attachment16', module)
  .add('default', () => <Attachment16 />)
  .add('with accessibility label', () => (
    <Attachment16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Attachment16 aria-label="Icon label">
      <title>Icon title</title>
    </Attachment16>
  ));
