import React from 'react';
import { storiesOf } from '@storybook/react';
import ParentChild20 from '../../../es/parent-child/20.js';

storiesOf('ParentChild20', module)
  .add('default', () => <ParentChild20 />)
  .add('with accessibility label', () => (
    <ParentChild20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ParentChild20 aria-label="Icon label">
      <title>Icon title</title>
    </ParentChild20>
  ));
