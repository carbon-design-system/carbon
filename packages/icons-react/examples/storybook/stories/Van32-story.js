import React from 'react';
import { storiesOf } from '@storybook/react';
import Van32 from '../../../es/van/32.js';

storiesOf('Van32', module)
  .add('default', () => <Van32 />)
  .add('with accessibility label', () => (
    <Van32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Van32 aria-label="Icon label">
      <title>Icon title</title>
    </Van32>
  ));
