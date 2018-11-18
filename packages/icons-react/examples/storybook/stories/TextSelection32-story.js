import React from 'react';
import { storiesOf } from '@storybook/react';
import TextSelection32 from '../../../es/text-selection/32.js';

storiesOf('TextSelection32', module)
  .add('default', () => <TextSelection32 />)
  .add('with accessibility label', () => (
    <TextSelection32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextSelection32 aria-label="Icon label">
      <title>Icon title</title>
    </TextSelection32>
  ));
