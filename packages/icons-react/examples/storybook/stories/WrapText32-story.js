import React from 'react';
import { storiesOf } from '@storybook/react';
import WrapText32 from '../../../es/wrap-text/32.js';

storiesOf('WrapText32', module)
  .add('default', () => <WrapText32 />)
  .add('with accessibility label', () => (
    <WrapText32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WrapText32 aria-label="Icon label">
      <title>Icon title</title>
    </WrapText32>
  ));
