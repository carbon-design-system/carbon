import React from 'react';
import { storiesOf } from '@storybook/react';
import TextCreation32 from '../../../lib/text-creation/32';

storiesOf('TextCreation32', module)
  .add('default', () => <TextCreation32 />)
  .add('with accessibility label', () => (
    <TextCreation32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextCreation32 focusable>
      <title>Icon title</title>
    </TextCreation32>
  ));
