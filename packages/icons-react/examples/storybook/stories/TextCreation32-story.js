import React from 'react';
import { storiesOf } from '@storybook/react';
import TextCreation32 from '../../../es/text-creation/32.js';

storiesOf('TextCreation32', module)
  .add('default', () => <TextCreation32 />)
  .add('with accessibility label', () => (
    <TextCreation32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextCreation32 aria-label="Icon label">
      <title>Icon title</title>
    </TextCreation32>
  ));
