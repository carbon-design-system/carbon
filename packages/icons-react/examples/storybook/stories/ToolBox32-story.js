import React from 'react';
import { storiesOf } from '@storybook/react';
import ToolBox32 from '../../../es/tool-box/32.js';

storiesOf('ToolBox32', module)
  .add('default', () => <ToolBox32 />)
  .add('with accessibility label', () => (
    <ToolBox32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ToolBox32 aria-label="Icon label">
      <title>Icon title</title>
    </ToolBox32>
  ));
