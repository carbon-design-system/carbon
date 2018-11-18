import React from 'react';
import { storiesOf } from '@storybook/react';
import SplitScreen20 from '../../../es/split-screen/20.js';

storiesOf('SplitScreen20', module)
  .add('default', () => <SplitScreen20 />)
  .add('with accessibility label', () => (
    <SplitScreen20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SplitScreen20 aria-label="Icon label">
      <title>Icon title</title>
    </SplitScreen20>
  ));
