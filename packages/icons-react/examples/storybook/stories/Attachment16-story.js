import React from 'react';
import { storiesOf } from '@storybook/react';
import Attachment16 from '../../../lib/attachment/16';

storiesOf('Attachment16', module)
  .add('default', () => <Attachment16 />)
  .add('with accessibility label', () => (
    <Attachment16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Attachment16 focusable>
      <title>Icon title</title>
    </Attachment16>
  ));
