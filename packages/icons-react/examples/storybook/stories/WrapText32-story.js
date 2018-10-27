import React from 'react';
import { storiesOf } from '@storybook/react';
import WrapText32 from '../../../lib/wrap-text/32';

storiesOf('WrapText32', module)
  .add('default', () => <WrapText32 />)
  .add('with accessibility label', () => (
    <WrapText32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WrapText32 focusable>
      <title>Icon title</title>
    </WrapText32>
  ));
