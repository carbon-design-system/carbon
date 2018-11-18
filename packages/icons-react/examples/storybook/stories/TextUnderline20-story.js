import React from 'react';
import { storiesOf } from '@storybook/react';
import TextUnderline20 from '../../../es/text-underline/20.js';

storiesOf('TextUnderline20', module)
  .add('default', () => <TextUnderline20 />)
  .add('with accessibility label', () => (
    <TextUnderline20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextUnderline20 aria-label="Icon label">
      <title>Icon title</title>
    </TextUnderline20>
  ));
