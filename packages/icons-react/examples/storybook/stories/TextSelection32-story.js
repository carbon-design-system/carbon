import React from 'react';
import { storiesOf } from '@storybook/react';
import TextSelection32 from '../../../lib/TextSelection/32';

storiesOf('TextSelection32', module)
  .add('default', () => <TextSelection32 />)
  .add('with accessibility label', () => (
    <TextSelection32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextSelection32 focusable>
      <title>Icon title</title>
    </TextSelection32>
  ));
