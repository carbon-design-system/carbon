import React from 'react';
import { storiesOf } from '@storybook/react';
import TextUnderline24 from '../../../es/text-underline/24.js';

storiesOf('TextUnderline24', module)
  .add('default', () => <TextUnderline24 />)
  .add('with accessibility label', () => (
    <TextUnderline24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextUnderline24 aria-label="Icon label">
      <title>Icon title</title>
    </TextUnderline24>
  ));
