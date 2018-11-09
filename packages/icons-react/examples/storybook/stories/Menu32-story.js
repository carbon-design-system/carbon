import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu32 from '../../../lib/Menu/32';

storiesOf('Menu32', module)
  .add('default', () => <Menu32 />)
  .add('with accessibility label', () => (
    <Menu32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Menu32 focusable>
      <title>Icon title</title>
    </Menu32>
  ));
