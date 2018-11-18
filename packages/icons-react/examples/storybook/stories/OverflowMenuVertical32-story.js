import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuVertical32 from '../../../es/overflow-menu--vertical/32.js';

storiesOf('OverflowMenuVertical32', module)
  .add('default', () => <OverflowMenuVertical32 />)
  .add('with accessibility label', () => (
    <OverflowMenuVertical32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuVertical32 aria-label="Icon label">
      <title>Icon title</title>
    </OverflowMenuVertical32>
  ));
