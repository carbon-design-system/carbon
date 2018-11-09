import React from 'react';
import { storiesOf } from '@storybook/react';
import Error32 from '../../../lib/Error/32';

storiesOf('Error32', module)
  .add('default', () => <Error32 />)
  .add('with accessibility label', () => (
    <Error32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Error32 focusable>
      <title>Icon title</title>
    </Error32>
  ));
