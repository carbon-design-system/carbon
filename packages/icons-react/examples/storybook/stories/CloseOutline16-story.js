import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseOutline16 from '../../../lib/CloseOutline/16';

storiesOf('CloseOutline16', module)
  .add('default', () => <CloseOutline16 />)
  .add('with accessibility label', () => (
    <CloseOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloseOutline16 focusable>
      <title>Icon title</title>
    </CloseOutline16>
  ));
