import React from 'react';
import { storiesOf } from '@storybook/react';
import Attachment20 from '../../../es/attachment/20.js';

storiesOf('Attachment20', module)
  .add('default', () => <Attachment20 />)
  .add('with accessibility label', () => (
    <Attachment20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Attachment20 aria-label="Icon label">
      <title>Icon title</title>
    </Attachment20>
  ));
