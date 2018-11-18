import React from 'react';
import { storiesOf } from '@storybook/react';
import TextSelection20 from '../../../es/text-selection/20.js';

storiesOf('TextSelection20', module)
  .add('default', () => <TextSelection20 />)
  .add('with accessibility label', () => (
    <TextSelection20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextSelection20 aria-label="Icon label">
      <title>Icon title</title>
    </TextSelection20>
  ));
