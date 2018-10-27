import React from 'react';
import { storiesOf } from '@storybook/react';
import Workspace32 from '../../../lib/workspace/32';

storiesOf('Workspace32', module)
  .add('default', () => <Workspace32 />)
  .add('with accessibility label', () => (
    <Workspace32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Workspace32 focusable>
      <title>Icon title</title>
    </Workspace32>
  ));
