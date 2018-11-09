import React from 'react';
import { storiesOf } from '@storybook/react';
import TextColor32 from '../../../lib/TextColor/32';

storiesOf('TextColor32', module)
  .add('default', () => <TextColor32 />)
  .add('with accessibility label', () => (
    <TextColor32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextColor32 focusable>
      <title>Icon title</title>
    </TextColor32>
  ));
