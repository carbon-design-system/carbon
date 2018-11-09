import React from 'react';
import { storiesOf } from '@storybook/react';
import Purchase32 from '../../../lib/Purchase/32';

storiesOf('Purchase32', module)
  .add('default', () => <Purchase32 />)
  .add('with accessibility label', () => (
    <Purchase32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Purchase32 focusable>
      <title>Icon title</title>
    </Purchase32>
  ));
