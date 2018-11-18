import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuVertical20 from '../../../es/overflow-menu--vertical/20.js';

storiesOf('OverflowMenuVertical20', module)
  .add('default', () => <OverflowMenuVertical20 />)
  .add('with accessibility label', () => (
    <OverflowMenuVertical20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuVertical20 aria-label="Icon label">
      <title>Icon title</title>
    </OverflowMenuVertical20>
  ));
