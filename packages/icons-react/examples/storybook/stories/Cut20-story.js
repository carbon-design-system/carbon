import React from 'react';
import { storiesOf } from '@storybook/react';
import Cut20 from '../../../es/cut/20.js';

storiesOf('Cut20', module)
  .add('default', () => <Cut20 />)
  .add('with accessibility label', () => (
    <Cut20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cut20 aria-label="Icon label">
      <title>Icon title</title>
    </Cut20>
  ));
