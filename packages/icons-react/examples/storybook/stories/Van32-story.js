import React from 'react';
import { storiesOf } from '@storybook/react';
import Van32 from '../../../lib/Van/32';

storiesOf('Van32', module)
  .add('default', () => <Van32 />)
  .add('with accessibility label', () => (
    <Van32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Van32 focusable>
      <title>Icon title</title>
    </Van32>
  ));
