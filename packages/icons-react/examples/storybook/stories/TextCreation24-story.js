import React from 'react';
import { storiesOf } from '@storybook/react';
import TextCreation24 from '../../../es/text-creation/24.js';

storiesOf('TextCreation24', module)
  .add('default', () => <TextCreation24 />)
  .add('with accessibility label', () => (
    <TextCreation24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextCreation24 aria-label="Icon label">
      <title>Icon title</title>
    </TextCreation24>
  ));
