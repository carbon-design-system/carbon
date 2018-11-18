import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuHorizontal20 from '../../../es/overflow-menu--horizontal/20.js';

storiesOf('OverflowMenuHorizontal20', module)
  .add('default', () => <OverflowMenuHorizontal20 />)
  .add('with accessibility label', () => (
    <OverflowMenuHorizontal20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuHorizontal20 aria-label="Icon label">
      <title>Icon title</title>
    </OverflowMenuHorizontal20>
  ));
