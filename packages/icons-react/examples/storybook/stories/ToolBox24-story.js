import React from 'react';
import { storiesOf } from '@storybook/react';
import ToolBox24 from '../../../es/tool-box/24.js';

storiesOf('ToolBox24', module)
  .add('default', () => <ToolBox24 />)
  .add('with accessibility label', () => (
    <ToolBox24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ToolBox24 aria-label="Icon label">
      <title>Icon title</title>
    </ToolBox24>
  ));
