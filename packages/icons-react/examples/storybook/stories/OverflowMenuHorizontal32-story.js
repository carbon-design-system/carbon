import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuHorizontal32 from '../../../es/overflow-menu--horizontal/32.js';

storiesOf('OverflowMenuHorizontal32', module)
  .add('default', () => <OverflowMenuHorizontal32 />)
  .add('with accessibility label', () => (
    <OverflowMenuHorizontal32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuHorizontal32 aria-label="Icon label">
      <title>Icon title</title>
    </OverflowMenuHorizontal32>
  ));
