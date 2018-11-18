import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuHorizontal24 from '../../../es/overflow-menu--horizontal/24.js';

storiesOf('OverflowMenuHorizontal24', module)
  .add('default', () => <OverflowMenuHorizontal24 />)
  .add('with accessibility label', () => (
    <OverflowMenuHorizontal24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuHorizontal24 aria-label="Icon label">
      <title>Icon title</title>
    </OverflowMenuHorizontal24>
  ));
