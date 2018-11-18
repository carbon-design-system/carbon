import React from 'react';
import { storiesOf } from '@storybook/react';
import ParentChild32 from '../../../es/parent-child/32.js';

storiesOf('ParentChild32', module)
  .add('default', () => <ParentChild32 />)
  .add('with accessibility label', () => (
    <ParentChild32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ParentChild32 aria-label="Icon label">
      <title>Icon title</title>
    </ParentChild32>
  ));
