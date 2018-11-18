import React from 'react';
import { storiesOf } from '@storybook/react';
import TextCreation20 from '../../../es/text-creation/20.js';

storiesOf('TextCreation20', module)
  .add('default', () => <TextCreation20 />)
  .add('with accessibility label', () => (
    <TextCreation20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextCreation20 aria-label="Icon label">
      <title>Icon title</title>
    </TextCreation20>
  ));
