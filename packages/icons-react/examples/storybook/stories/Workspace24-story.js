import React from 'react';
import { storiesOf } from '@storybook/react';
import Workspace24 from '../../../es/workspace/24.js';

storiesOf('Workspace24', module)
  .add('default', () => <Workspace24 />)
  .add('with accessibility label', () => (
    <Workspace24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Workspace24 aria-label="Icon label">
      <title>Icon title</title>
    </Workspace24>
  ));
