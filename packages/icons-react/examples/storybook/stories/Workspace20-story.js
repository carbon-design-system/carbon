import React from 'react';
import { storiesOf } from '@storybook/react';
import Workspace20 from '../../../es/workspace/20.js';

storiesOf('Workspace20', module)
  .add('default', () => <Workspace20 />)
  .add('with accessibility label', () => (
    <Workspace20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Workspace20 aria-label="Icon label">
      <title>Icon title</title>
    </Workspace20>
  ));
