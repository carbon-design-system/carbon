import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuVertical24 from '../../../es/overflow-menu--vertical/24.js';

storiesOf('OverflowMenuVertical24', module)
  .add('default', () => <OverflowMenuVertical24 />)
  .add('with accessibility label', () => (
    <OverflowMenuVertical24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuVertical24 aria-label="Icon label">
      <title>Icon title</title>
    </OverflowMenuVertical24>
  ));
