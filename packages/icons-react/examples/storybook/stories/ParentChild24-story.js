import React from 'react';
import { storiesOf } from '@storybook/react';
import ParentChild24 from '../../../es/parent-child/24.js';

storiesOf('ParentChild24', module)
  .add('default', () => <ParentChild24 />)
  .add('with accessibility label', () => (
    <ParentChild24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ParentChild24 aria-label="Icon label">
      <title>Icon title</title>
    </ParentChild24>
  ));
