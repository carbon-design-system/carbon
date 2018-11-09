import React from 'react';
import { storiesOf } from '@storybook/react';
import ToolBox32 from '../../../lib/ToolBox/32';

storiesOf('ToolBox32', module)
  .add('default', () => <ToolBox32 />)
  .add('with accessibility label', () => (
    <ToolBox32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ToolBox32 focusable>
      <title>Icon title</title>
    </ToolBox32>
  ));
