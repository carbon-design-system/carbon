import React from 'react';
import { storiesOf } from '@storybook/react';
import Attachment24 from '../../../es/attachment/24.js';

storiesOf('Attachment24', module)
  .add('default', () => <Attachment24 />)
  .add('with accessibility label', () => (
    <Attachment24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Attachment24 aria-label="Icon label">
      <title>Icon title</title>
    </Attachment24>
  ));
