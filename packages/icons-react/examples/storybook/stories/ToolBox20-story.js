import React from 'react';
import { storiesOf } from '@storybook/react';
import ToolBox20 from '../../../es/tool-box/20.js';

storiesOf('ToolBox20', module)
  .add('default', () => <ToolBox20 />)
  .add('with accessibility label', () => (
    <ToolBox20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ToolBox20 aria-label="Icon label">
      <title>Icon title</title>
    </ToolBox20>
  ));
